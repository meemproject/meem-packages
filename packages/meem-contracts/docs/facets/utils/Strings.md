# Solidity API

## Strings

_String operations._

### strWithUint

```solidity
function strWithUint(string _str, uint256 value) internal pure returns (string)
```

_Converts a `uint256` to its ASCII `string` representation._

### substring

```solidity
function substring(string str, uint256 startIndex, uint256 numChars) internal pure returns (string)
```

### compareStrings

```solidity
function compareStrings(string a, string b) internal pure returns (bool)
```

### toHexString

```solidity
function toHexString(uint256 value) internal pure returns (string)
```

_Converts a `uint256` to its ASCII `string` hexadecimal representation._

### toHexString

```solidity
function toHexString(uint256 value, uint256 length) internal pure returns (string)
```

_Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length._

