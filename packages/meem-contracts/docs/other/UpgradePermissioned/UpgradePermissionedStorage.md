# Solidity API

## UpgradePermissionedStorage

### STORAGE_SLOT

```solidity
bytes32 STORAGE_SLOT
```

### DataStore

```solidity
struct DataStore {
  mapping(address => bool) upgraders;
}
```

### dataStore

```solidity
function dataStore() internal pure returns (struct UpgradePermissionedStorage.DataStore l)
```

