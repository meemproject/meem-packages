# Solidity API

## AccessControlStorage

### STORAGE_SLOT

```solidity
bytes32 STORAGE_SLOT
```

### ADMIN_ROLE

```solidity
bytes32 ADMIN_ROLE
```

### UPGRADER_ROLE

```solidity
bytes32 UPGRADER_ROLE
```

### RoleData

```solidity
struct RoleData {
  mapping(address => bool) members;
}
```

### DataStore

```solidity
struct DataStore {
  mapping(bytes32 => struct AccessControlStorage.RoleData) roles;
  mapping(bytes32 => address[]) rolesList;
  mapping(bytes32 => mapping(address => uint256)) rolesListIndex;
}
```

### dataStore

```solidity
function dataStore() internal pure returns (struct AccessControlStorage.DataStore l)
```

