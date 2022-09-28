# Solidity API

## InitParams

```solidity
struct InitParams {
  string symbol;
  string name;
  string contractURI;
  struct SetRoleItem[] roles;
  uint256 maxSupply;
  struct MeemPermission[] mintPermissions;
  struct Split[] splits;
  bool isTransferLocked;
}
```

## AdminError

### AlreadyInitialized

```solidity
string AlreadyInitialized
```

## ContractInfo

```solidity
struct ContractInfo {
  string symbol;
  string name;
  string contractURI;
  uint256 maxSupply;
  struct MeemPermission[] mintPermissions;
  struct Split[] splits;
  bool isTransferLocked;
}
```

## AdminFacet

### MeemContractInitialized

```solidity
event MeemContractInitialized(address contractAddress)
```

Emitted when the contract is initialized (or re-initialized)

| Name | Type | Description |
| ---- | ---- | ----------- |
| contractAddress | address | The address of the contract |

### MeemContractInfoSet

```solidity
event MeemContractInfoSet(address contractAddress)
```

Emitted when contract info is set

| Name | Type | Description |
| ---- | ---- | ----------- |
| contractAddress | address | The address of the contract |

### MeemContractURISet

```solidity
event MeemContractURISet(address contractAddress)
```

Emitted when the contract URI is set

| Name | Type | Description |
| ---- | ---- | ----------- |
| contractAddress | address | The address of the contract |

### setContractInfo

```solidity
function setContractInfo(string name, string symbol) public
```

Set the contract info

| Name | Type | Description |
| ---- | ---- | ----------- |
| name | string | The name of the contract |
| symbol | string | The symbol of the token |

### setContractInfo

```solidity
function setContractInfo(string name, string symbol, string newContractURI) public
```

Set the contract info

| Name | Type | Description |
| ---- | ---- | ----------- |
| name | string | The name of the contract |
| symbol | string | The symbol of the token |
| newContractURI | string | The new contract URI |

### setContractInfo

```solidity
function setContractInfo(string name, string symbol, string newContractURI, uint256 maxSupply) public
```

Set the contract info

| Name | Type | Description |
| ---- | ---- | ----------- |
| name | string | The name of the contract |
| symbol | string | The symbol of the token |
| newContractURI | string | The new contract URI |
| maxSupply | uint256 | The new max supply. Must be greater than the current supply |

### setContractURI

```solidity
function setContractURI(string newContractURI) public
```

Set the contract info

| Name | Type | Description |
| ---- | ---- | ----------- |
| newContractURI | string | The new contract URI |

### getContractInfo

```solidity
function getContractInfo() public view returns (struct ContractInfo)
```

Gets the contract info

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct ContractInfo | The contract info |

### contractURI

```solidity
function contractURI() public view returns (string)
```

Gets the contract URI

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | string | The contract URI |

### initialize

```solidity
function initialize(struct InitParams params) public
```

Initialize the contract

_May only be called once_

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct InitParams | The initialization parameters |

### reinitialize

```solidity
function reinitialize(struct InitParams params) public
```

Re-initialize the contract

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct InitParams | The initialization parameters |

### requireAdmin

```solidity
function requireAdmin() internal view
```

Convenience function to require the caller to be an admin

