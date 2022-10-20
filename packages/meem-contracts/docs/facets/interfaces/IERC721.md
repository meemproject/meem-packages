# Solidity API

## IERC721

ERC721 interface

_see https://eips.ethereum.org/EIPS/eip-721_

### balanceOf

```solidity
function balanceOf(address account) external view returns (uint256 balance)
```

query the balance of given address

| Name | Type | Description |
| ---- | ---- | ----------- |
| balance | uint256 | quantity of tokens held |

### ownerOf

```solidity
function ownerOf(uint256 tokenId) external view returns (address owner)
```

query the owner of given token

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | token to query |

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner | address | token owner |

### safeTransferFrom

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId) external payable
```

transfer token between given addresses, checking for ERC721Receiver implementation if applicable

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | sender of token |
| to | address | receiver of token |
| tokenId | uint256 | token id |

### safeTransferFrom

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId, bytes data) external payable
```

transfer token between given addresses, checking for ERC721Receiver implementation if applicable

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | sender of token |
| to | address | receiver of token |
| tokenId | uint256 | token id |
| data | bytes | data payload |

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 tokenId) external payable
```

transfer token between given addresses, without checking for ERC721Receiver implementation if applicable

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | sender of token |
| to | address | receiver of token |
| tokenId | uint256 | token id |

### approve

```solidity
function approve(address operator, uint256 tokenId) external payable
```

grant approval to given account to spend token

| Name | Type | Description |
| ---- | ---- | ----------- |
| operator | address | address to be approved |
| tokenId | uint256 | token to approve |

### getApproved

```solidity
function getApproved(uint256 tokenId) external view returns (address operator)
```

get approval status for given token

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | token to query |

| Name | Type | Description |
| ---- | ---- | ----------- |
| operator | address | address approved to spend token |

### setApprovalForAll

```solidity
function setApprovalForAll(address operator, bool status) external
```

grant approval to or revoke approval from given account to spend all tokens held by sender

| Name | Type | Description |
| ---- | ---- | ----------- |
| operator | address | address to be approved |
| status | bool | approval status |

### isApprovedForAll

```solidity
function isApprovedForAll(address account, address operator) external view returns (bool status)
```

query approval status of given operator with respect to given address

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | address | address to query for approval granted |
| operator | address | address to query for approval received |

| Name | Type | Description |
| ---- | ---- | ----------- |
| status | bool | whether operator is approved to spend tokens held by account |

