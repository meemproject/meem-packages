// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {MeemPermission} from '../interfaces/MeemStandard.sol';

library PermissionsStorage {
	bytes32 internal constant STORAGE_SLOT =
		keccak256('meem.contracts.storage.Permissions');

	struct DataStore {
		uint256 maxSupply;
		MeemPermission[] mintPermissions;
		bool isTransferLocked;
	}

	function dataStore() internal pure returns (DataStore storage l) {
		bytes32 slot = STORAGE_SLOT;
		assembly {
			l.slot := slot
		}
	}
}
