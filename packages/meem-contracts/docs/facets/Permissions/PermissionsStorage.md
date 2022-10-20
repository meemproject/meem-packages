# Solidity API

## PermissionsStorage

### STORAGE_SLOT

```solidity
bytes32 STORAGE_SLOT
```

### DataStore

```solidity
struct DataStore {
  uint256 maxSupply;
  struct MeemPermission[] mintPermissions;
  bool isTransferLocked;
}
```

### dataStore

```solidity
function dataStore() internal pure returns (struct PermissionsStorage.DataStore l)
```

