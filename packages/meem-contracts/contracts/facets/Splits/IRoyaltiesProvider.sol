// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;
pragma abicoder v2;

import {Part} from './SplitsFacet.sol';

interface IRoyaltiesProvider {
	function getRoyalties(address token, uint256 tokenId)
		external
		returns (Part[] memory);
}
