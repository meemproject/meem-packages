# Solidity API

## IERC173

### owner

```solidity
function owner() external view returns (address owner_)
```

Get the address of the owner

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner_ | address | The address of the owner. |

### transferOwnership

```solidity
function transferOwnership(address _newOwner) external
```

Set the address of the new owner of the contract

_Set _newOwner to address(0) to renounce any ownership._

| Name | Type | Description |
| ---- | ---- | ----------- |
| _newOwner | address | The address of the new owner of the contract |

