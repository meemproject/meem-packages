// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

library UpgradePermissionedStorage {
	bytes32 internal constant STORAGE_SLOT =
		keccak256('meem.contracts.storage.UpgradePermissioned');

	struct DataStore {
		mapping(address => bool) upgraders;
	}

	function dataStore() internal pure returns (DataStore storage l) {
		bytes32 slot = STORAGE_SLOT;
		assembly {
			l.slot := slot
		}
	}
}
