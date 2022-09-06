// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

struct RequireCanMintParams {
	address minter;
	address to;
	bytes32[] proof;
}

contract MyCustomFacet {
	function requireCanMint(RequireCanMintParams memory params) public payable {
		if (block.timestamp % 2 == 0) {
			revert('Minting only allowed for odd-numbered timestamps');
		}
	}
}
