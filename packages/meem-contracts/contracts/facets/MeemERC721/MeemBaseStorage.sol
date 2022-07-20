// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {TokenType, URISource} from '../interfaces/MeemStandard.sol';

library MeemBaseStorage {
	bytes32 internal constant STORAGE_SLOT =
		keccak256('meem.contracts.storage.Minting');

	struct DataStore {
		uint256 tokenCounter;
		string contractURI;
		mapping(uint256 => TokenType) tokenTypes;
		mapping(uint256 => URISource) uriSources;
	}

	function dataStore() internal pure returns (DataStore storage l) {
		bytes32 slot = STORAGE_SLOT;
		assembly {
			l.slot := slot
		}
	}
}
