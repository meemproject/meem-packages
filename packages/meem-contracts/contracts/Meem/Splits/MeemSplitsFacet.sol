// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;

import {SplitsStorage} from './SplitsStorage.sol';
import {Split} from '../interfaces/MeemStandard.sol';
import {RoyaltiesV2} from './RoyaltiesV2.sol';
import {LibPart} from './LibPart.sol';
import {MeemBaseERC721Facet} from '../MeemERC721/MeemBaseERC721Facet.sol';
import {PermissionsError} from '../Permissions/PermissionsFacet.sol';

library Error {
	string public constant InvalidNonOwnerSplitAllocationAmount =
		'INVALID_NON_OWNER_SPLIT_ALLOCATION_AMOUNT';
}

contract MeemSplitsFacet is RoyaltiesV2 {
	event SplitsSet(uint256 tokenId, Split[] splits);
	event RoyaltiesSet(uint256 tokenId, LibPart.Part[] royalties);

	function getRaribleV2Royalties(uint256 tokenId)
		public
		view
		override
		returns (LibPart.Part[] memory)
	{
		SplitsStorage.DataStore storage s = SplitsStorage.dataStore();

		uint256 numSplits = s.tokenSplits[tokenId].splits.length;
		LibPart.Part[] memory parts = new LibPart.Part[](numSplits);
		for (uint256 i = 0; i < s.tokenSplits[tokenId].splits.length; i++) {
			parts[i] = LibPart.Part({
				account: payable(s.tokenSplits[tokenId].splits[i].toAddress),
				value: uint96(s.tokenSplits[tokenId].splits[i].amount)
			});
		}

		return parts;
	}

	function handleSaleDistribution(uint256 tokenId) public payable {
		if (msg.value == 0) {
			return;
		}

		MeemBaseERC721Facet baseContract = MeemBaseERC721Facet(address(this));

		uint256 leftover = msg.value;
		SplitsStorage.DataStore storage s = SplitsStorage.dataStore();

		for (uint256 i = 0; i < s.tokenSplits[tokenId].splits.length; i++) {
			uint256 amt = (msg.value *
				s.tokenSplits[tokenId].splits[i].amount) / 10000;

			address payable receiver = payable(
				s.tokenSplits[tokenId].splits[i].toAddress
			);

			receiver.transfer(amt);
			leftover = leftover - amt;
		}

		if (leftover > 0) {
			if (tokenId == 0) {
				// Original being minted. Refund difference back to the sender
				payable(msg.sender).transfer(leftover);
			} else {
				address tokenOwner = baseContract.ownerOf(tokenId);
				// Existing token transfer. Pay the current owner before transferring to new owner
				payable(tokenOwner).transfer(leftover);
			}
		}
	}

	function lockSplits(uint256 tokenId) external {
		MeemBaseERC721Facet baseContract = MeemBaseERC721Facet(address(this));
		baseContract.requireTokenAdmin(tokenId, msg.sender);

		SplitsStorage.DataStore storage s = SplitsStorage.dataStore();

		if (s.tokenSplits[tokenId].lockedBy != address(0)) {
			revert(PermissionsError.PropertyLocked);
		}

		s.tokenSplits[tokenId].lockedBy = msg.sender;
	}

	function setSplits(uint256 tokenId, Split[] memory splits) external {
		MeemBaseERC721Facet baseContract = MeemBaseERC721Facet(address(this));
		baseContract.requireTokenAdmin(tokenId, msg.sender);

		SplitsStorage.DataStore storage s = SplitsStorage.dataStore();

		if (s.tokenSplits[tokenId].lockedBy != address(0)) {
			revert(PermissionsError.PropertyLocked);
		}

		// s.tokenSplits[tokenId].splits = splits;
		delete s.tokenSplits[tokenId].splits;

		for (uint256 i = 0; i < splits.length; i++) {
			s.tokenSplits[tokenId].splits.push(splits[i]);
		}

		address tokenOwner = baseContract.ownerOf(tokenId);

		_validateSplits(
			s.tokenSplits[tokenId].splits,
			tokenOwner,
			s.nonOwnerSplitAllocationAmount
		);

		emit SplitsSet(tokenId, splits);
		emit RoyaltiesSet(tokenId, getRaribleV2Royalties(tokenId));
	}

	function _validateSplits(
		Split[] storage currentSplits,
		address tokenOwner,
		uint256 nonOwnerSplitAllocationAmount
	) internal view virtual {
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
