// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {LibSplits, Error, Part} from './LibSplits.sol';
import {SplitsStorage} from './SplitsStorage.sol';
import {Split} from '../interfaces/MeemStandard.sol';
import {RoyaltiesV2} from './RoyaltiesV2.sol';
import {MeemBaseERC721Facet} from '../MeemERC721/MeemBaseERC721Facet.sol';
import {PermissionsError} from '../Permissions/PermissionsFacet.sol';

/// @title Handles token sales and currency distributions. Compatible with Rarible v2 royalties.
contract SplitsFacet is RoyaltiesV2 {
	/// @notice Emitted when token splits are set
	/// @param tokenId The token
	/// @param splits The new splits for the token
	event MeemSplitsSet(uint256 tokenId, Split[] splits);

	/// @notice Rarible v2 compatible event when royalties (splits) are set
	/// @param tokenId The token
	/// @param royalties The royalties assigned to the token
	event RoyaltiesSet(uint256 tokenId, Part[] royalties);

	function getRaribleV2Royalties(uint256 tokenId)
		public
		view
		override
		returns (Part[] memory)
	{
		return LibSplits._getRaribleV2Royalties(tokenId);
	}

	/// @notice Overrides the MeemBaseERC721Facet function to distrubute royalties
	/// @param msgSender The address that is purchasing the token
	/// @param tokenId The token being transferred
	function handleSaleDistribution(uint256 tokenId, address msgSender)
		public
		payable
	{
		if (msg.value == 0) {
			return;
		}

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
			// Refund difference back to the sender
			payable(msgSender).transfer(leftover);
		}
	}

	/// @notice Locks the token splits
	/// @param tokenId The token to lock (0 for minted tokens)
	function lockSplits(uint256 tokenId) external {
		MeemBaseERC721Facet baseContract = MeemBaseERC721Facet(address(this));
		baseContract.requireTokenAdmin(tokenId, msg.sender);

		SplitsStorage.DataStore storage s = SplitsStorage.dataStore();

		if (s.tokenSplits[tokenId].lockedBy != address(0)) {
			revert(PermissionsError.PropertyLocked);
		}

		s.tokenSplits[tokenId].lockedBy = msg.sender;
	}

	/// @notice Sets the token splits (royalties)
	/// @param tokenId The token to lock (0 for minted tokens)
	/// @param splits The new splits
	function setSplits(uint256 tokenId, Split[] memory splits) external {
		MeemBaseERC721Facet baseContract = MeemBaseERC721Facet(address(this));
		baseContract.requireTokenAdmin(tokenId, msg.sender);

		LibSplits._setSplits(tokenId, splits);
	}
}
