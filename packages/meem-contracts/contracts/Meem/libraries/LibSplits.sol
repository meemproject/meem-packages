// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {LibAppStorage} from '../storage/LibAppStorage.sol';
import {PropertyType, Split, MeemProperties, MeemType} from '../interfaces/MeemStandard.sol';
import {LibERC721} from './LibERC721.sol';
import {PropertyLocked, InvalidNonOwnerSplitAllocationAmount, MissingRequiredSplits, IndexOutOfRange} from './Errors.sol';
import {LibProperties} from './LibProperties.sol';
import {LibPart} from '../../royalties/LibPart.sol';

library LibSplits {
	event SplitsSet(uint256 tokenId, PropertyType propertyType, Split[] splits);
	// Rarible royalties event
	event RoyaltiesSet(uint256 tokenId, LibPart.Part[] royalties);

	function lockSplits(uint256 tokenId, PropertyType propertyType) internal {
		LibERC721.requireOwnsToken(tokenId);
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);

		if (props.splitsLockedBy != address(0)) {
			revert PropertyLocked(props.splitsLockedBy);
		}

		props.splitsLockedBy = msg.sender;
	}

	function setSplits(
		uint256 tokenId,
		PropertyType propertyType,
		Split[] memory splits
	) internal {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibERC721.requireOwnsToken(tokenId);
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);

		if (props.splitsLockedBy != address(0)) {
			revert PropertyLocked(props.splitsLockedBy);
		}

		validateOverrideSplits(splits, props.splits);

		delete props.splits;

		for (uint256 i = 0; i < splits.length; i++) {
			props.splits.push(splits[i]);
		}

		validateSplits(
			props,
			LibERC721.ownerOf(tokenId),
			s.nonOwnerSplitAllocationAmount
		);

		emit SplitsSet(tokenId, propertyType, props.splits);
		emit RoyaltiesSet(tokenId, getRaribleV2Royalties(tokenId));
	}

	function addSplit(
		uint256 tokenId,
		PropertyType propertyType,
		Split memory split
	) internal {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibERC721.requireOwnsToken(tokenId);
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);

		if (props.splitsLockedBy != address(0)) {
			revert PropertyLocked(props.splitsLockedBy);
		}
		props.splits.push(split);
		validateSplits(
			props,
			LibERC721.ownerOf(tokenId),
			s.nonOwnerSplitAllocationAmount
		);
		emit SplitsSet(tokenId, propertyType, props.splits);
		emit RoyaltiesSet(tokenId, getRaribleV2Royalties(tokenId));
	}

	function removeSplitAt(
		uint256 tokenId,
		PropertyType propertyType,
		uint256 idx
	) internal {
		LibERC721.requireOwnsToken(tokenId);
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);
		if (props.splitsLockedBy != address(0)) {
			revert PropertyLocked(props.splitsLockedBy);
		}

		if (props.splits[idx].lockedBy != address(0)) {
			revert PropertyLocked(props.splits[idx].lockedBy);
		}

		if (idx >= props.splits.length) {
			revert IndexOutOfRange(idx, props.splits.length - 1);
		}

		for (uint256 i = idx; i < props.splits.length - 1; i++) {
			props.splits[i] = props.splits[i + 1];
		}

		props.splits.pop();
		emit SplitsSet(tokenId, propertyType, props.splits);
		emit RoyaltiesSet(tokenId, getRaribleV2Royalties(tokenId));
	}

	function updateSplitAt(
		uint256 tokenId,
		PropertyType propertyType,
		uint256 idx,
		Split memory split
	) internal {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibERC721.requireOwnsToken(tokenId);
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);
		if (props.splitsLockedBy != address(0)) {
			revert PropertyLocked(props.splitsLockedBy);
		}

		if (props.splits[idx].lockedBy != address(0)) {
			revert PropertyLocked(props.splits[idx].lockedBy);
		}

		props.splits[idx] = split;
		validateSplits(
			props,
			LibERC721.ownerOf(tokenId),
			s.nonOwnerSplitAllocationAmount
		);
		emit SplitsSet(tokenId, propertyType, props.splits);
		emit RoyaltiesSet(tokenId, getRaribleV2Royalties(tokenId));
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
			revert InvalidNonOwnerSplitAllocationAmount(
				nonOwnerSplitAllocationAmount,
				10000
			);
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
					revert MissingRequiredSplits();
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
