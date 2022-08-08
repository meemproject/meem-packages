// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

library ReactionsStorage {
	bytes32 internal constant STORAGE_SLOT =
		keccak256('meem.contracts.storage.Reactions');

	struct DataStore {
		/** token => reaction name => total */
		mapping(uint256 => mapping(string => uint256)) tokenReactions;
		/** token => reaction name => address => reactedAt */
		mapping(uint256 => mapping(string => mapping(address => uint256))) addressReactionsAt;
		/** address => token => reaction names[] */
		mapping(address => mapping(uint256 => string[])) addressReactions;
		/** address => token => reaction name => index */
		mapping(address => mapping(uint256 => mapping(string => uint256))) addressReactionsIndex;
		/** Address => reaction types */
		mapping(uint256 => string[]) tokenReactionTypes;
	}

	function dataStore() internal pure returns (DataStore storage l) {
		bytes32 slot = STORAGE_SLOT;
		assembly {
			l.slot := slot
		}
	}
}
