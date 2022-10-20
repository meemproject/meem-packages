# Solidity API

## MeemDiamondError

### NoPermission

```solidity
string NoPermission
```

## MeemDiamond

### MeemDiamondCreated

```solidity
event MeemDiamondCreated()
```

Emitted when the contract is created

### constructor

```solidity
constructor(address owner, address[] upgraders) public
```

Set some basic permissions for the contract during creation

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner | address | The address that should assigned ownership of the contract |
| upgraders | address[] | Addresses that have the ability to upgrade the contract |

### diamondCut

```solidity
function diamondCut(struct IDiamondWritable.FacetCut[] facetCuts, address target, bytes data) external
```

Perform a "diamond cut" to add, replace, or remove functions

| Name | Type | Description |
| ---- | ---- | ----------- |
| facetCuts | struct IDiamondWritable.FacetCut[] | The cuts to make |
| target | address | The target |
| data | bytes | Data for the cut function |

### receive

```solidity
receive() external payable
```

### getFallbackAddress

```solidity
function getFallbackAddress() external view returns (address)
```

get the address of the fallback contract

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | fallback address |

### setFallbackAddress

```solidity
function setFallbackAddress(address fallbackAddress) external
```

set the address of the fallback contract

| Name | Type | Description |
| ---- | ---- | ----------- |
| fallbackAddress | address | fallback address |

### _transferOwnership

```solidity
function _transferOwnership(address account) internal virtual
```

