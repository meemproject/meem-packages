// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

library AdminStorage {
	bytes32 internal constant STORAGE_SLOT =
		keccak256('meem.contracts.storage.Admin');

	struct DataStore {
		// /** Keeps track of assigned roles */
		bool hasInitialized;
		string contractURI;
	}

	function dataStore() internal pure returns (DataStore storage l) {
		bytes32 slot = STORAGE_SLOT;
		assembly {
			l.slot := slot
		}
	}
}
