# Solidity API

## AdminStorage

### STORAGE_SLOT

```solidity
bytes32 STORAGE_SLOT
```

### DataStore

```solidity
struct DataStore {
  bool hasInitialized;
  string contractURI;
}
```

### dataStore

```solidity
function dataStore() internal pure returns (struct AdminStorage.DataStore l)
```

