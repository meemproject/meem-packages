// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {MeemPermission} from '../interfaces/MeemStandard.sol';

library PermissionsStorage {
	bytes32 internal constant STORAGE_SLOT =
		keccak256('meem.contracts.storage.Permissions');

	struct DataStore {
		uint256 maxSupply;
		bool isMaxSupplyLocked;
		MeemPermission[] mintPermissions;
		bool isTransferLocked;
		mapping(uint256 => uint256) tokenLockupTimestamps;
		// bool isMintPermissionsLocked;
		// uint256 mintStartTimestamp;
		// uint256 mintEndTimestamp;
		// bool isMintTimestampsLocked;
		// uint256 maxPerWallet;
		// bool isMaxPerWalletLocked;
	}

	function dataStore() internal pure returns (DataStore storage l) {
		bytes32 slot = STORAGE_SLOT;
		assembly {
			l.slot := slot
		}
	}
}
