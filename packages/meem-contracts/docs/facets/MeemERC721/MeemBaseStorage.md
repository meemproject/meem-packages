# Solidity API

## MeemBaseStorage

### STORAGE_SLOT

```solidity
bytes32 STORAGE_SLOT
```

### DataStore

```solidity
struct DataStore {
  uint256 tokenCounter;
  string contractURI;
  mapping(uint256 => enum TokenType) tokenTypes;
  mapping(uint256 => address) minters;
  mapping(uint256 => uint256) mintedTimestamps;
}
```

### dataStore

```solidity
function dataStore() internal pure returns (struct MeemBaseStorage.DataStore l)
```

