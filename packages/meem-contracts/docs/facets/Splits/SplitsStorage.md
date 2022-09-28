# Solidity API

## TokenSplit

```solidity
struct TokenSplit {
  struct Split[] splits;
  address lockedBy;
}
```

## SplitsStorage

### STORAGE_SLOT

```solidity
bytes32 STORAGE_SLOT
```

### DataStore

```solidity
struct DataStore {
  address splitsLockedBy;
  mapping(uint256 => struct TokenSplit) tokenSplits;
  uint256 nonOwnerSplitAllocationAmount;
}
```

### dataStore

```solidity
function dataStore() internal pure returns (struct SplitsStorage.DataStore l)
```

