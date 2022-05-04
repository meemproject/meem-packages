// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {LibAppStorage} from '../storage/LibAppStorage.sol';
import {PropertyType, Split, MeemProperties, MeemType} from '../interfaces/MeemStandard.sol';
import {LibERC721} from './LibERC721.sol';
import {Error} from './Errors.sol';
import {MeemEvents, MeemBaseEvents} from './Events.sol';
import {LibProperties} from './LibProperties.sol';
import {LibPart} from '../../royalties/LibPart.sol';

library LibSplits {
	function lockSplits(uint256 tokenId, PropertyType propertyType) internal {
		LibERC721.requireOwnsToken(tokenId);
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);

		if (props.splitsLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}

		props.splitsLockedBy = msg.sender;
	}

	function setSplits(
		uint256 tokenId,
		PropertyType propertyType,
		Split[] memory splits
	) internal {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibProperties.requireAccess(tokenId, propertyType);
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);

		if (props.splitsLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}

		validateOverrideSplits(splits, props.splits);

		delete props.splits;

		for (uint256 i = 0; i < splits.length; i++) {
			props.splits.push(splits[i]);
		}
		address tokenOwner = propertyType == PropertyType.Meem ||
			propertyType == PropertyType.Child
			? LibERC721.ownerOf(tokenId)
			: address(0);

		validateSplits(props, tokenOwner, s.nonOwnerSplitAllocationAmount);

		emit MeemEvents.MeemSplitsSet(tokenId, propertyType, props.splits);
		emit MeemEvents.RoyaltiesSet(tokenId, getRaribleV2Royalties(tokenId));
	}

	function setBaseSplits(Split[] memory newSplits) internal {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		validateOverrideSplits(newSplits, s.baseProperties.splits);

		delete s.baseProperties.splits;

		for (uint256 i = 0; i < newSplits.length; i++) {
			s.baseProperties.splits.push(newSplits[i]);
		}

		validateSplits(
			s.baseProperties.splits,
			address(0),
			s.nonOwnerSplitAllocationAmount
		);

		emit MeemBaseEvents.MeemSplitsSet(s.baseProperties.splits);
	}

	function addSplit(
		uint256 tokenId,
		PropertyType propertyType,
		Split memory split
	) internal {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibProperties.requireAccess(tokenId, propertyType);
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);

		if (props.splitsLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}
		props.splits.push(split);

		address tokenOwner = propertyType == PropertyType.Meem ||
			propertyType == PropertyType.Child
			? LibERC721.ownerOf(tokenId)
			: address(0);

		validateSplits(props, tokenOwner, s.nonOwnerSplitAllocationAmount);
		emit MeemEvents.MeemSplitsSet(tokenId, propertyType, props.splits);
		emit MeemEvents.RoyaltiesSet(tokenId, getRaribleV2Royalties(tokenId));
	}

	function removeSplitAt(
		uint256 tokenId,
		PropertyType propertyType,
		uint256 idx
	) internal {
		LibProperties.requireAccess(tokenId, propertyType);
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);
		if (props.splitsLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}

		if (props.splits[idx].lockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}

		if (idx >= props.splits.length) {
			revert(Error.IndexOutOfRange);
		}

		for (uint256 i = idx; i < props.splits.length - 1; i++) {
			props.splits[i] = props.splits[i + 1];
		}

		props.splits.pop();
		emit MeemEvents.MeemSplitsSet(tokenId, propertyType, props.splits);
		emit MeemEvents.RoyaltiesSet(tokenId, getRaribleV2Royalties(tokenId));
	}

	function updateSplitAt(
		uint256 tokenId,
		PropertyType propertyType,
		uint256 idx,
		Split memory split
	) internal {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibProperties.requireAccess(tokenId, propertyType);
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);
		if (props.splitsLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}

		if (props.splits[idx].lockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}

		props.splits[idx] = split;

		address tokenOwner = propertyType == PropertyType.Meem ||
			propertyType == PropertyType.Child
			? LibERC721.ownerOf(tokenId)
			: address(0);

		validateSplits(props, tokenOwner, s.nonOwnerSplitAllocationAmount);
		emit MeemEvents.MeemSplitsSet(tokenId, propertyType, props.splits);
		emit MeemEvents.RoyaltiesSet(tokenId, getRaribleV2Royalties(tokenId));
	}

	function validateSplits(
		Split[] storage currentSplits,
		address tokenOwner,
		uint256 nonOwnerSplitAllocationAmount
	) internal view {
		// Ensure addresses are unique
		for (uint256 i = 0; i < currentSplits.length; i++) {
			address split1 = currentSplits[i].toAddress;

			for (uint256 j = 0; j < currentSplits.length; j++) {
				address split2 = currentSplits[j].toAddress;
				if (i != j && split1 == split2) {
					revert('Split addresses must be unique');
				}
			}
		}

		uint256 totalAmount = 0;
		uint256 totalAmountOfNonOwner = 0;
		// Require that split amounts
		for (uint256 i = 0; i < currentSplits.length; i++) {
			totalAmount += currentSplits[i].amount;
			if (currentSplits[i].toAddress != tokenOwner) {
				totalAmountOfNonOwner += currentSplits[i].amount;
			}
		}

		if (
			totalAmount > 10000 ||
			totalAmountOfNonOwner < nonOwnerSplitAllocationAmount
		) {
			revert(Error.InvalidNonOwnerSplitAllocationAmount);
		}
	}

	function validateSplits(
		MeemProperties storage self,
		address tokenOwner,
		uint256 nonOwnerSplitAllocationAmount
	) internal view {
		// Ensure addresses are unique
		for (uint256 i = 0; i < self.splits.length; i++) {
			address split1 = self.splits[i].toAddress;

			for (uint256 j = 0; j < self.splits.length; j++) {
				address split2 = self.splits[j].toAddress;
				if (i != j && split1 == split2) {
					revert('Split addresses must be unique');
				}
			}
		}

		uint256 totalAmount = 0;
		uint256 totalAmountOfNonOwner = 0;
		// Require that split amounts
		for (uint256 i = 0; i < self.splits.length; i++) {
			totalAmount += self.splits[i].amount;
			if (self.splits[i].toAddress != tokenOwner) {
				totalAmountOfNonOwner += self.splits[i].amount;
			}
		}

		if (
			totalAmount > 10000 ||
			totalAmountOfNonOwner < nonOwnerSplitAllocationAmount
		) {
			revert(Error.InvalidNonOwnerSplitAllocationAmount);
		}
	}

	function validateOverrideSplits(
		Split[] memory baseSplits,
		Split[] memory overrideSplits
	) internal pure {
		for (uint256 i = 0; i < overrideSplits.length; i++) {
			if (overrideSplits[i].lockedBy != address(0)) {
				// Find the permission in basePermissions
				bool wasFound = false;
				for (uint256 j = 0; j < baseSplits.length; j++) {
					if (
						baseSplits[j].lockedBy == overrideSplits[i].lockedBy &&
						baseSplits[j].amount == overrideSplits[i].amount &&
						baseSplits[j].toAddress == overrideSplits[i].toAddress
					) {
						wasFound = true;
						break;
					}
				}
				if (!wasFound) {
					revert(Error.MissingRequiredSplits);
				}
			}
		}
	}

	function getRaribleV2Royalties(uint256 tokenId)
		internal
		view
		returns (LibPart.Part[] memory)
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();

		uint256 tokenIdToUse = s.meems[tokenId].meemType == MeemType.Copy
			? s.meems[tokenId].parentTokenId
			: tokenId;

		uint256 numSplits = s.meemProperties[tokenIdToUse].splits.length;
		LibPart.Part[] memory parts = new LibPart.Part[](numSplits);
		for (
			uint256 i = 0;
			i < s.meemProperties[tokenIdToUse].splits.length;
			i++
		) {
			parts[i] = LibPart.Part({
				account: payable(
					s.meemProperties[tokenIdToUse].splits[i].toAddress
				),
				value: uint96(s.meemProperties[tokenIdToUse].splits[i].amount)
			});
		}

		return parts;
	}
}
