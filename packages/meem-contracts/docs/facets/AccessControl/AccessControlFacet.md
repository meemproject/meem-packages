# Solidity API

## SetRoleItem

```solidity
struct SetRoleItem {
  address user;
  bytes32 role;
  bool hasRole;
}
```

## AccessControlError

### MissingRequiredRole

```solidity
string MissingRequiredRole
```

If the user is missing the role required to perform the action

## AccessControlFacet

Assign roles to grant access to otherwise limited functions of the contract

### MeemRoleGranted

```solidity
event MeemRoleGranted(bytes32 role, address user)
```

Emitted when a role is granted to a user

| Name | Type | Description |
| ---- | ---- | ----------- |
| role | bytes32 | The role that was granted |
| user | address | The user that was granted a role |

### MeemRoleRevoked

```solidity
event MeemRoleRevoked(bytes32 role, address user)
```

Emitted when a role is revoked from a user

| Name | Type | Description |
| ---- | ---- | ----------- |
| role | bytes32 | The role that was revoked |
| user | address | The user that was revoked |

### ADMIN_ROLE

```solidity
function ADMIN_ROLE() public pure returns (bytes32)
```

An admin of the contract.

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | Hashed value that represents this role. |

### UPGRADER_ROLE

```solidity
function UPGRADER_ROLE() public pure returns (bytes32)
```

A contract upgrader

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | Hashed value that represents this role. |

### canUpgradeContract

```solidity
function canUpgradeContract(address upgrader) public view returns (bool)
```

Check if a user has access to upgrade the contract

| Name | Type | Description |
| ---- | ---- | ----------- |
| upgrader | address | The wallet address of the upgrader |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool of whether the user can upgrade the contract |

### bulkSetRoles

```solidity
function bulkSetRoles(struct SetRoleItem[] items) public
```

Bulk assign roles

| Name | Type | Description |
| ---- | ---- | ----------- |
| items | struct SetRoleItem[] | The roles to assign / remove |

### grantRole

```solidity
function grantRole(bytes32 role, address user) public
```

Grant a role to a user. The granting user must have the ADMIN_ROLE

| Name | Type | Description |
| ---- | ---- | ----------- |
| role | bytes32 | The role to grant |
| user | address | The wallet address of the user to grant the role to |

### revokeRole

```solidity
function revokeRole(bytes32 role, address user) public
```

Grant a role to a user. The granting user must have the ADMIN_ROLE

| Name | Type | Description |
| ---- | ---- | ----------- |
| role | bytes32 | The role to revoke |
| user | address | The wallet address of the user to revoke the role from |

### hasRole

```solidity
function hasRole(bytes32 role, address user) public view returns (bool)
```

Grant a role to a user. The granting user must have the ADMIN_ROLE

| Name | Type | Description |
| ---- | ---- | ----------- |
| role | bytes32 | The role to revoke |
| user | address | The wallet address of the user to revoke the role from |

### getRoles

```solidity
function getRoles(bytes32 role) public view returns (address[])
```

Get the list of users with a role

| Name | Type | Description |
| ---- | ---- | ----------- |
| role | bytes32 | The role to fetch |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address[] | address[] of the users with the role |

### requireRole

```solidity
function requireRole(bytes32 role, address user) public view
```

Requires that a user has a role

| Name | Type | Description |
| ---- | ---- | ----------- |
| role | bytes32 | The role to check |
| user | address | The user to check |

