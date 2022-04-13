// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {IAuctionHouse} from '../interfaces/IAuctionHouse.sol';

library LibAppStorage {
	bytes32 constant DIAMOND_STORAGE_POSITION =
		keccak256('meem.market.storage');

	struct RoleData {
		mapping(address => bool) members;
		bytes32 adminRole;
	}

	struct AppStorage {
		/** AccessControl Role: Admin */
		bytes32 ADMIN_ROLE;
		mapping(bytes32 => RoleData) roles;
		/** Mapping of contract/tokenId to an auction */
		mapping(address => mapping(uint256 => IAuctionHouse.Auction)) auctions;
		// The minimum amount of time left in an auction after a new bid is created
		uint256 timeBuffer;
		// The minimum percentage difference between the last bid amount and the current bid.
		uint8 minBidIncrementPercentage;
		// / The address of the WETH contract, so that any ETH transferred can be handled as an ERC-20
		address wethContract;
		address meemContract;
	}

	function diamondStorage() internal pure returns (AppStorage storage ds) {
		bytes32 position = DIAMOND_STORAGE_POSITION;
		assembly {
			ds.slot := position
		}
	}
}
