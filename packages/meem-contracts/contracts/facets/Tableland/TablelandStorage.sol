// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

library TablelandStorage {
	bytes32 internal constant STORAGE_SLOT =
		keccak256('meem.contracts.storage.Tableland');

	struct DataStore {
		bool canInsert;
		bool canUpdate;
		bool canDelete;
		address adminRoleContract;
		address insertRoleContract;
		address updateRoleContract;
		address deleteRoleContract;
		string[] updateableColumns;
		bool hasInitialized;
	}

	function dataStore() internal pure returns (DataStore storage l) {
		bytes32 slot = STORAGE_SLOT;
		assembly {
			l.slot := slot
		}
	}
}
