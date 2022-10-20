# Solidity API

## PermissionsError

### MaxSupplyExceeded

```solidity
string MaxSupplyExceeded
```

### NoPermission

```solidity
string NoPermission
```

### IncorrectMsgValue

```solidity
string IncorrectMsgValue
```

### PropertyLocked

```solidity
string PropertyLocked
```

### TransfersLocked

```solidity
string TransfersLocked
```

## PermissionsFacet

### MeemMintPermissionsSet

```solidity
event MeemMintPermissionsSet(struct MeemPermission[] mintPermissions)
```

Emitted when mint permissions are set

| Name | Type | Description |
| ---- | ---- | ----------- |
| mintPermissions | struct MeemPermission[] | The new permissions |

### MeemMaxSupplySet

```solidity
event MeemMaxSupplySet(uint256 maxSupply)
```

Emitted when max supply is set

| Name | Type | Description |
| ---- | ---- | ----------- |
| maxSupply | uint256 | The new max supply |

### MeemMaxSupplyLocked

```solidity
event MeemMaxSupplyLocked()
```

Emitted when max supply is locked

### MINTER_ROLE

```solidity
function MINTER_ROLE() public pure returns (bytes32)
```

The minter role grants permission to mint tokens without mintPermission checks

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | Hashed value that represents this role. |

### requireCanMint

```solidity
function requireCanMint(struct RequireCanMintParams params) public payable
```

Overrides the MeemBaseERC721Facet function to check mint permissions

### setMaxSupply

```solidity
function setMaxSupply(uint256 newMaxSupply) public
```

Set the max token supply. Must be less than the current total supply.

| Name | Type | Description |
| ---- | ---- | ----------- |
| newMaxSupply | uint256 | The new max supply |

### maxSupply

```solidity
function maxSupply() public view returns (uint256)
```

Get the max token supply

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The max supply |

### setMintingPermissions

```solidity
function setMintingPermissions(struct MeemPermission[] newPermissions) public
```

Set the mint permissions

| Name | Type | Description |
| ---- | ---- | ----------- |
| newPermissions | struct MeemPermission[] | The new mint permissions |

### validatePermissions

```solidity
function validatePermissions(struct MeemPermission[] basePermissions, struct MeemPermission[] overridePermissions) public pure
```

Function that is called to validate permissions before they are set to ensure compatibility

_Override this function to add custom validation_

| Name | Type | Description |
| ---- | ---- | ----------- |
| basePermissions | struct MeemPermission[] | The current permissions |
| overridePermissions | struct MeemPermission[] | The new permissions |

### setIsTransferrable

```solidity
function setIsTransferrable(bool isTransferrable) public
```

### requireCanTransfer

```solidity
function requireCanTransfer(address from, address to, uint256 tokenId) public
```

Overrides the MeemBaseERC721Facet function to check transfer permissions

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | The address the token is being transferred from |
| to | address | The address the token is being transferred to |
| tokenId | uint256 | The token being transferred |

### isBetweenTimestamps

```solidity
function isBetweenTimestamps(uint256 start, uint256 end) internal view returns (bool)
```

Checks if the current block timestamp is between the start and end timestamps

| Name | Type | Description |
| ---- | ---- | ----------- |
| start | uint256 | The start timestamp |
| end | uint256 | The end timestamp |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool Whether the current block timestamp is between the start and end timestamps |

### requireAdmin

```solidity
function requireAdmin() internal view
```

Convenience function to require the caller to be an admin

