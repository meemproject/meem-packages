// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {SplitsStorage} from './SplitsStorage.sol';
import {Split} from '../interfaces/MeemStandard.sol';
import {MeemBaseERC721Facet} from '../MeemERC721/MeemBaseERC721Facet.sol';
import {PermissionsError} from '../Permissions/PermissionsFacet.sol';

struct Part {
	address payable account;
	uint96 value;
}

library Error {
	string public constant InvalidNonOwnerSplitAllocationAmount =
		'INVALID_NON_OWNER_SPLIT_ALLOCATION_AMOUNT';
}

library LibSplits {
	event MeemSplitsSet(uint256 tokenId, Split[] splits);
	event RoyaltiesSet(uint256 tokenId, Part[] royalties);

	function _getRaribleV2Royalties(uint256 tokenId)
		internal
		view
		returns (Part[] memory)
	{
		SplitsStorage.DataStore storage s = SplitsStorage.dataStore();

		uint256 numSplits = s.tokenSplits[tokenId].splits.length;
		Part[] memory parts = new Part[](numSplits);
		for (uint256 i = 0; i < s.tokenSplits[tokenId].splits.length; i++) {
			parts[i] = Part({
				account: payable(s.tokenSplits[tokenId].splits[i].toAddress),
				value: uint96(s.tokenSplits[tokenId].splits[i].amount)
			});
		}

		return parts;
	}

	function _setSplits(uint256 tokenId, Split[] memory splits) internal {
		MeemBaseERC721Facet baseContract = MeemBaseERC721Facet(address(this));
		SplitsStorage.DataStore storage s = SplitsStorage.dataStore();

		if (s.tokenSplits[tokenId].lockedBy != address(0)) {
			revert(PermissionsError.PropertyLocked);
		}

		// s.tokenSplits[tokenId].splits = splits;
		delete s.tokenSplits[tokenId].splits;

		for (uint256 i = 0; i < splits.length; i++) {
			s.tokenSplits[tokenId].splits.push(splits[i]);
		}

		address tokenOwner = tokenId == 0
			? address(0)
			: baseContract.ownerOf(tokenId);

		_validateSplits(
			s.tokenSplits[tokenId].splits,
			tokenOwner,
			s.nonOwnerSplitAllocationAmount
		);

		emit MeemSplitsSet(tokenId, splits);
		emit RoyaltiesSet(tokenId, _getRaribleV2Royalties(tokenId));
	}

	function _validateSplits(
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
}
