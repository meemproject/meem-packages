// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;
pragma abicoder v2;

import {Part} from './LibSplits.sol';

interface RoyaltiesV2 {
	// event RoyaltiesSet(uint256 tokenId, LibPart.Part[] royalties);

	function getRaribleV2Royalties(uint256 id)
		external
		view
		returns (Part[] memory);
}
