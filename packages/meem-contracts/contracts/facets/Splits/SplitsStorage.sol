// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import {Split} from '../interfaces/MeemStandard.sol';

// struct Split {
// 	address toAddress;
// 	uint256 amount;
// 	address lockedBy;
// }

struct TokenSplit {
	Split[] splits;
	address lockedBy;
}

library SplitsStorage {
	bytes32 internal constant STORAGE_SLOT =
		keccak256('meem.contracts.storage.Splits');

	struct DataStore {
		address splitsLockedBy;
		mapping(uint256 => TokenSplit) tokenSplits;
		uint256 nonOwnerSplitAllocationAmount;
	}

	function dataStore() internal pure returns (DataStore storage l) {
		bytes32 slot = STORAGE_SLOT;
		assembly {
			l.slot := slot
		}
	}
}
