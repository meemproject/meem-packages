// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;

import {WrappedItem, PropertyType, PermissionType, MeemPermission, MeemProperties, URISource, MeemMintParameters, Meem, Chain, MeemType, MeemBase, Permission, BaseProperties, Split} from '../interfaces/MeemStandard.sol';
import {IERC721} from '../interfaces/IERC721.sol';
import {LibAppStorage} from '../storage/LibAppStorage.sol';
import {LibERC721} from './LibERC721.sol';
import {LibAccessControl} from './LibAccessControl.sol';
import {Array} from '../utils/Array.sol';
import {LibProperties} from './LibProperties.sol';
import {LibPermissions} from './LibPermissions.sol';
import {Strings} from '../utils/Strings.sol';
import {Error} from '../libraries/Errors.sol';
import {MeemEvents} from '../libraries/Events.sol';

library LibMeem {
	function mint(
		MeemMintParameters memory params,
		MeemProperties memory mProperties,
		MeemProperties memory mChildProperties
	) internal returns (uint256 tokenId_) {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibMeem.requireValidMeem(
			params.parentChain,
			params.parent,
			params.parentTokenId
		);

		uint256 tokenId = s.tokenCounter;
		LibERC721._safeMint(params.to, tokenId);

		// Initializes mapping w/ default values
		delete s.meems[tokenId];

		if (params.isURILocked) {
			s.meems[tokenId].uriLockedBy = msg.sender;
		}

		s.meems[tokenId].parentChain = params.parentChain;
		s.meems[tokenId].parent = params.parent;
		s.meems[tokenId].parentTokenId = params.parentTokenId;
		s.meems[tokenId].owner = params.to;
		s.meems[tokenId].mintedAt = block.timestamp;
		s.meems[tokenId].reactionTypes = params.reactionTypes;
		s.meems[tokenId].uriSource = params.uriSource;

		if (
			params.mintedBy != address(0) &&
			LibAccessControl.hasRole(s.MINTER_ROLE, msg.sender)
		) {
			s.meems[tokenId].mintedBy = params.mintedBy;
		} else {
			s.meems[tokenId].mintedBy = msg.sender;
		}

		// Handle creating child meem
		if (params.parent == address(this)) {
			// Verify token exists
			if (s.meems[params.parentTokenId].owner == address(0)) {
				revert(Error.TokenNotFound);
			}
			// Verify we can mint based on permissions
			requireCanMintChildOf(
				params.to,
				params.meemType,
				params.parentTokenId
			);
			handleSaleDistribution(params.parentTokenId);

			if (params.meemType == MeemType.Copy) {
				s.tokenURIs[tokenId] = s.tokenURIs[params.parentTokenId];
				s.meems[tokenId].meemType = MeemType.Copy;
			} else {
				s.tokenURIs[tokenId] = params.tokenURI;
				s.meems[tokenId].meemType = MeemType.Remix;
			}

			if (s.meems[params.parentTokenId].root != address(0)) {
				s.meems[tokenId].root = s.meems[params.parentTokenId].root;
				s.meems[tokenId].rootTokenId = s
					.meems[params.parentTokenId]
					.rootTokenId;
				s.meems[tokenId].rootChain = s
					.meems[params.parentTokenId]
					.rootChain;
			} else {
				s.meems[tokenId].root = params.parent;
				s.meems[tokenId].rootTokenId = params.parentTokenId;
				s.meems[tokenId].rootChain = params.parentChain;
			}

			s.meems[tokenId].generation =
				s.meems[params.parentTokenId].generation +
				1;

			// Merge parent childProperties into this child
			LibProperties.setProperties(
				tokenId,
				PropertyType.Meem,
				mProperties,
				params.parentTokenId,
				true
			);
			LibProperties.setProperties(
				tokenId,
				PropertyType.Child,
				mChildProperties,
				params.parentTokenId,
				true
			);
		} else {
			requireCanMintOriginal(params.to);
			handleSaleDistribution(0);
			s.meems[tokenId].generation = 0;
			s.meems[tokenId].root = params.parent;
			s.meems[tokenId].rootTokenId = params.parentTokenId;
			s.meems[tokenId].rootChain = params.parentChain;
			s.tokenURIs[tokenId] = params.tokenURI;
			if (params.parent == address(0)) {
				if (params.meemType != MeemType.Original) {
					revert(Error.InvalidMeemType);
				}
				s.meems[tokenId].meemType = MeemType.Original;
			} else {
				// Only trusted minter can mint a wNFT
				LibAccessControl.requireRole(s.MINTER_ROLE);
				if (params.meemType != MeemType.Wrapped) {
					revert(Error.InvalidMeemType);
				}
				s.meems[tokenId].meemType = MeemType.Wrapped;
			}
			LibProperties.setProperties(
				tokenId,
				PropertyType.Meem,
				mProperties,
				s.defaultProperties,
				true
			);
			LibProperties.setProperties(
				tokenId,
				PropertyType.Child,
				mChildProperties,
				s.defaultChildProperties,
				true
			);
		}

		if (
			s.childDepth > -1 &&
			s.meems[tokenId].generation > uint256(s.childDepth)
		) {
			revert(Error.ChildDepthExceeded);
		}

		// Keep track of children Meems
		if (params.parent == address(this)) {
			if (s.meems[tokenId].meemType == MeemType.Copy) {
				s.copies[params.parentTokenId].push(tokenId);
				s.copiesOwnerTokens[params.parentTokenId][params.to].push(
					tokenId
				);
				s.copiesOwnerTokenIndexes[params.to][tokenId] =
					s
					.copiesOwnerTokens[params.parentTokenId][params.to].length -
					1;
			} else if (s.meems[tokenId].meemType == MeemType.Remix) {
				s.remixes[params.parentTokenId].push(tokenId);
				s.remixesOwnerTokens[params.parentTokenId][params.to].push(
					tokenId
				);
				s.remixesOwnerTokenIndexes[params.to][tokenId] =
					s
					.remixesOwnerTokens[params.parentTokenId][params.to]
						.length -
					1;
			}
		} else if (params.parent != address(0)) {
			// Keep track of wrapped NFTs
			s.chainWrappedNFTs[params.parentChain][params.parent][
				params.parentTokenId
			] = tokenId;
		} else if (params.parent == address(0)) {
			s.originalMeemTokensIndex[tokenId] = s.originalMeemTokens.length;
			s.originalMeemTokens.push(tokenId);
			s.originalOwnerTokens[params.to][tokenId] = true;
			s.originalOwnerCount[params.to]++;
		}

		if (s.meems[tokenId].root == address(this)) {
			s.decendants[s.meems[tokenId].rootTokenId].push(tokenId);
		}

		s.tokenCounter += 1;

		if (
			!LibERC721._checkOnERC721Received(
				address(0),
				params.to,
				tokenId,
				''
			)
		) {
			revert(Error.ERC721ReceiverNotImplemented);
		}

		return tokenId;
	}

	function getMeem(uint256 tokenId) internal view returns (Meem memory) {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		bool isCopy = s.meems[tokenId].meemType == MeemType.Copy;

		Meem memory meem = Meem(
			s.meems[tokenId].owner,
			s.meems[tokenId].parentChain,
			s.meems[tokenId].parent,
			s.meems[tokenId].parentTokenId,
			s.meems[tokenId].rootChain,
			s.meems[tokenId].root,
			s.meems[tokenId].rootTokenId,
			s.meems[tokenId].generation,
			isCopy
				? s.meemProperties[s.meems[tokenId].parentTokenId]
				: s.meemProperties[tokenId],
			isCopy
				? s.meemChildProperties[s.meems[tokenId].parentTokenId]
				: s.meemChildProperties[tokenId],
			s.meems[tokenId].mintedAt,
			s.meems[tokenId].uriLockedBy,
			s.meems[tokenId].meemType,
			s.meems[tokenId].mintedBy,
			s.meems[tokenId].uriSource,
			s.meems[tokenId].reactionTypes
		);

		return meem;
	}

	function handleSaleDistribution(uint256 tokenId) internal {
		if (msg.value == 0) {
			return;
		}

		uint256 leftover = msg.value;
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();

		Split[] storage splits = tokenId == 0
			? s.baseProperties.splits
			: s.meemProperties[tokenId].splits;

		for (uint256 i = 0; i < splits.length; i++) {
			uint256 amt = (msg.value * splits[i].amount) / 10000;

			address payable receiver = payable(splits[i].toAddress);

			receiver.transfer(amt);
			leftover = leftover - amt;
		}

		if (leftover > 0) {
			if (tokenId == 0) {
				// Original being minted. Refund difference back to the sender
				payable(msg.sender).transfer(leftover);
			} else {
				// Existing token transfer. Pay the current owner before transferring to new owner
				payable(s.meems[tokenId].owner).transfer(leftover);
			}
		}
	}

	function requireValidMeem(
		Chain chain,
		address parent,
		uint256 tokenId
	) internal view {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		// Meem must be unique address(0) or not have a corresponding parent / tokenId already minted
		if (parent != address(0) && parent != address(this)) {
			if (s.chainWrappedNFTs[chain][parent][tokenId] != 0) {
				revert(Error.NFTAlreadyWrapped);
			}
		}
	}

	function isNFTWrapped(
		Chain chainId,
		address contractAddress,
		uint256 tokenId
	) internal view returns (bool) {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		if (s.chainWrappedNFTs[chainId][contractAddress][tokenId] != 0) {
			return true;
		}

		return false;
	}

	function wrappedTokens(WrappedItem[] memory items)
		internal
		view
		returns (uint256[] memory)
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		uint256[] memory result = new uint256[](items.length);

		for (uint256 i = 0; i < items.length; i++) {
			result[i] = s.chainWrappedNFTs[items[i].chain][
				items[i].contractAddress
			][items[i].tokenId];
		}

		return result;
	}

	// Checks if "to" can mint a child of tokenId
	function requireCanMintChildOf(
		address to,
		MeemType meemType,
		uint256 tokenId
	) internal view {
		if (meemType != MeemType.Copy && meemType != MeemType.Remix) {
			revert(Error.NoPermission);
		}

		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		MeemBase storage parent = s.meems[tokenId];

		// Only allow copies if the parent is an original or remix (i.e. no copies of a copy)
		if (parent.meemType == MeemType.Copy) {
			revert(Error.NoChildOfCopy);
		}

		MeemProperties storage parentProperties = s.meemProperties[tokenId];

		if (
			parentProperties.mintStartTimestamp > 0 &&
			block.timestamp < uint256(parentProperties.mintStartTimestamp)
		) {
			revert(Error.MintingNotStarted);
		}

		if (
			parentProperties.mintEndTimestamp > 0 &&
			block.timestamp > uint256(parentProperties.mintEndTimestamp)
		) {
			revert(Error.MintingFinished);
		}

		// Check total children
		if (
			meemType == MeemType.Copy &&
			parentProperties.totalCopies >= 0 &&
			s.copies[tokenId].length + 1 > uint256(parentProperties.totalCopies)
		) {
			revert(Error.TotalCopiesExceeded);
		} else if (
			meemType == MeemType.Remix &&
			parentProperties.totalRemixes >= 0 &&
			s.remixes[tokenId].length + 1 >
			uint256(parentProperties.totalRemixes)
		) {
			revert(Error.TotalRemixesExceeded);
		}

		if (
			meemType == MeemType.Copy &&
			parentProperties.copiesPerWallet >= 0 &&
			s.copiesOwnerTokens[tokenId][to].length + 1 >
			uint256(parentProperties.copiesPerWallet)
		) {
			revert(Error.CopiesPerWalletExceeded);
		} else if (
			meemType == MeemType.Remix &&
			parentProperties.remixesPerWallet >= 0 &&
			s.remixesOwnerTokens[tokenId][to].length + 1 >
			uint256(parentProperties.remixesPerWallet)
		) {
			revert(Error.RemixesPerWalletExceeded);
		}

		// Check permissions
		MeemPermission[] storage perms = LibPermissions.getPermissions(
			parentProperties,
			meemTypeToPermissionType(meemType)
		);

		requireProperPermissions(perms, parent.owner);
	}

	// Checks if "to" can mint a child of tokenId
	function requireCanMintOriginal(address to) internal view {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();

		BaseProperties storage baseProperties = s.baseProperties;

		// Allow admins to bypass mint start / end checks
		bool isAdmin = LibAccessControl.hasRole(s.ADMIN_ROLE, msg.sender);
		if (
			!isAdmin &&
			baseProperties.mintStartTimestamp > 0 &&
			block.timestamp < uint256(baseProperties.mintStartTimestamp)
		) {
			revert(Error.MintingNotStarted);
		}

		if (
			!isAdmin &&
			baseProperties.mintEndTimestamp > 0 &&
			block.timestamp > uint256(baseProperties.mintEndTimestamp)
		) {
			revert(Error.MintingFinished);
		}

		// Check total supply
		if (
			baseProperties.totalOriginalsSupply >= 0 &&
			s.originalMeemTokens.length + 1 >
			uint256(baseProperties.totalOriginalsSupply)
		) {
			revert(Error.TotalOriginalsSupplyExceeded);
		}

		if (
			baseProperties.originalsPerWallet >= 0 &&
			s.originalOwnerCount[to] + 1 >
			uint256(baseProperties.originalsPerWallet)
		) {
			revert(Error.OriginalsPerWalletExceeded);
		}

		requireProperPermissions(baseProperties.mintPermissions, address(0));
	}

	function requireProperPermissions(
		MeemPermission[] storage permissions,
		address tokenOwner
	) internal view {
		bool hasPermission = false;
		bool hasCostBeenSet = false;
		uint256 costWei = 0;

		for (uint256 i = 0; i < permissions.length; i++) {
			MeemPermission storage perm = permissions[i];
			if (
				// Allowed if permission is anyone
				perm.permission == Permission.Anyone
			) {
				hasPermission = true;
			}

			if (perm.permission == Permission.Addresses) {
				// Allowed if to is in the list of approved addresses
				for (uint256 j = 0; j < perm.addresses.length; j++) {
					if (perm.addresses[j] == msg.sender) {
						hasPermission = true;
						break;
					}
				}
			}

			if (perm.permission == Permission.Owner) {
				// Allowed if to is in the list of approved addresses
				if (tokenOwner == msg.sender) {
					hasPermission = true;
					break;
				}
			}

			if (perm.permission == Permission.Holders) {
				// Check each address
				for (uint256 j = 0; j < perm.addresses.length; j++) {
					uint256 balance = IERC721(perm.addresses[j]).balanceOf(
						msg.sender
					);

					if (balance >= perm.numTokens) {
						hasPermission = true;
						break;
					}
				}
			}

			if (
				hasPermission &&
				(!hasCostBeenSet || (hasCostBeenSet && costWei > perm.costWei))
			) {
				costWei = perm.costWei;
				hasCostBeenSet = true;
			}
			// TODO: Check external token holders on same network
		}

		if (!hasPermission) {
			revert(Error.NoPermission);
		}

		if (costWei != msg.value) {
			revert(Error.IncorrectMsgValue);
		}
	}

	function permissionTypeToMeemType(PermissionType perm)
		internal
		pure
		returns (MeemType)
	{
		if (perm == PermissionType.Copy) {
			return MeemType.Copy;
		} else if (perm == PermissionType.Remix) {
			return MeemType.Remix;
		}

		revert(Error.NoPermission);
	}

	function meemTypeToPermissionType(MeemType meemType)
		internal
		pure
		returns (PermissionType)
	{
		if (meemType == MeemType.Copy) {
			return PermissionType.Copy;
		} else if (meemType == MeemType.Remix) {
			return PermissionType.Remix;
		}

		revert(Error.NoPermission);
	}

	function clip(uint256 tokenId) internal {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();

		if (s.hasAddressClipped[msg.sender][tokenId]) {
			revert(Error.AlreadyClipped);
		}

		s.clippings[tokenId].push(msg.sender);
		s.addressClippings[msg.sender].push(tokenId);
		s.clippingsIndex[msg.sender][tokenId] = s.clippings[tokenId].length - 1;
		s.addressClippingsIndex[msg.sender][tokenId] =
			s.addressClippings[msg.sender].length -
			1;
		s.hasAddressClipped[msg.sender][tokenId] = true;

		emit MeemEvents.MeemClipped(tokenId, msg.sender);
	}

	function unClip(uint256 tokenId) internal {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();

		if (!s.hasAddressClipped[msg.sender][tokenId]) {
			revert(Error.NotClipped);
		}

		Array.removeAt(
			s.clippings[tokenId],
			s.clippingsIndex[msg.sender][tokenId]
		);
		Array.removeAt(
			s.addressClippings[msg.sender],
			s.addressClippingsIndex[msg.sender][tokenId]
		);
		s.clippingsIndex[msg.sender][tokenId] = 0;
		s.addressClippingsIndex[msg.sender][tokenId] = 0;
		s.hasAddressClipped[msg.sender][tokenId] = false;

		emit MeemEvents.MeemUnClipped(tokenId, msg.sender);
	}

	function tokenClippings(uint256 tokenId)
		internal
		view
		returns (address[] memory)
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		return s.clippings[tokenId];
	}

	function addressClippings(address addy)
		internal
		view
		returns (uint256[] memory)
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		return s.addressClippings[addy];
	}

	function hasAddressClipped(uint256 tokenId, address addy)
		internal
		view
		returns (bool)
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		return s.clippingsIndex[addy][tokenId] != 0;
	}

	function clippings(uint256 tokenId)
		internal
		view
		returns (address[] memory)
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		return s.clippings[tokenId];
	}

	function numClippings(uint256 tokenId) internal view returns (uint256) {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		return s.clippings[tokenId].length;
	}
}
