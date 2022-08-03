// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// From Open Zeppelin contracts: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Strings.sol

/**
 * @dev String operations.
 */
library Strings {
	/**
	 * @dev Converts a `uint256` to its ASCII `string` representation.
	 */
	function strWithUint(string memory _str, uint256 value)
		internal
		pure
		returns (string memory)
	{
		// Inspired by OraclizeAPI's implementation - MIT licence
		// https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol
		bytes memory buffer;
		unchecked {
			if (value == 0) {
				return string(abi.encodePacked(_str, '0'));
			}
			uint256 temp = value;
			uint256 digits;
			while (temp != 0) {
				digits++;
				temp /= 10;
			}
			buffer = new bytes(digits);
			uint256 index = digits - 1;
			temp = value;
			while (temp != 0) {
				buffer[index--] = bytes1(uint8(48 + (temp % 10)));
				temp /= 10;
			}
		}
		return string(abi.encodePacked(_str, buffer));
	}

	function substring(
		string memory str,
		uint256 startIndex,
		uint256 numChars
	) internal pure returns (string memory) {
		bytes memory strBytes = bytes(str);
		bytes memory result = new bytes(numChars - startIndex);
		for (uint256 i = startIndex; i < numChars; i++) {
			result[i - startIndex] = strBytes[i];
		}
		return string(result);
	}

	function compareStrings(string memory a, string memory b)
		internal
		pure
		returns (bool)
	{
		return (keccak256(abi.encodePacked((a))) ==
			keccak256(abi.encodePacked((b))));
	}

	/**
	 * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation.
	 */
	function toHexString(uint256 value) internal pure returns (string memory) {
		if (value == 0) {
			return '0x00';
		}
		uint256 temp = value;
		uint256 length = 0;
		while (temp != 0) {
			length++;
			temp >>= 8;
		}
		return toHexString(value, length);
	}

	/**
	 * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length.
	 */
	function toHexString(uint256 value, uint256 length)
		internal
		pure
		returns (string memory)
	{
		bytes16 _HEX_SYMBOLS = '0123456789abcdef';
		bytes memory buffer = new bytes(2 * length + 2);
		buffer[0] = '0';
		buffer[1] = 'x';
		for (uint256 i = 2 * length + 1; i > 1; --i) {
			buffer[i] = _HEX_SYMBOLS[value & 0xf];
			value >>= 4;
		}
		require(value == 0, 'Strings: hex length insufficient');
		return string(buffer);
	}
}
