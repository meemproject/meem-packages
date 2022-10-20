# Solidity API

## ClippingStorage

### STORAGE_SLOT

```solidity
bytes32 STORAGE_SLOT
```

### DataStore

```solidity
struct DataStore {
  mapping(uint256 => address[]) clippings;
  mapping(address => uint256[]) addressClippings;
  mapping(address => mapping(uint256 => uint256)) clippingsIndex;
  mapping(address => mapping(uint256 => uint256)) addressClippingsIndex;
  mapping(address => mapping(uint256 => bool)) hasAddressClipped;
}
```

### dataStore

```solidity
function dataStore() internal pure returns (struct ClippingStorage.DataStore l)
```

