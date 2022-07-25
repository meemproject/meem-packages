// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

library AccessControlStorage {
	bytes32 internal constant STORAGE_SLOT =
		keccak256('meem.contracts.storage.AccessControl');

	bytes32 constant ADMIN_ROLE = keccak256('ADMIN_ROLE');

	struct RoleData {
		mapping(address => bool) members;
	}

	struct DataStore {
		// /** Keeps track of assigned roles */
		mapping(bytes32 => RoleData) roles;
		mapping(bytes32 => address[]) rolesList;
		mapping(bytes32 => mapping(address => uint256)) rolesListIndex;
	}

	function dataStore() internal pure returns (DataStore storage l) {
		bytes32 slot = STORAGE_SLOT;
		assembly {
			l.slot := slot
		}
	}
}
