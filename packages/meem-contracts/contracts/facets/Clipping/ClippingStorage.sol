// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

library ClippingStorage {
	bytes32 internal constant STORAGE_SLOT =
		keccak256('meem.contracts.storage.Clipping');

	struct DataStore {
		/** tokenId => array of addresses that have clipped */
		mapping(uint256 => address[]) clippings;
		/** address => tokenIds */
		mapping(address => uint256[]) addressClippings;
		/** address => tokenId => index */
		mapping(address => mapping(uint256 => uint256)) clippingsIndex;
		/** address => tokenId => index */
		mapping(address => mapping(uint256 => uint256)) addressClippingsIndex;
		/** address => tokenId => index */
		mapping(address => mapping(uint256 => bool)) hasAddressClipped;
	}

	function dataStore() internal pure returns (DataStore storage l) {
		bytes32 slot = STORAGE_SLOT;
		assembly {
			l.slot := slot
		}
	}
}
