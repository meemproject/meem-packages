# Solidity API

## ERC721Facet

### balanceOf

```solidity
function balanceOf(address account) public view virtual returns (uint256)
```

query the balance of given address

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 |  |

### ownerOf

```solidity
function ownerOf(uint256 tokenId) public view virtual returns (address)
```

query the owner of given token

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | token to query |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address |  |

### getApproved

```solidity
function getApproved(uint256 tokenId) public view virtual returns (address)
```

get approval status for given token

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | token to query |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address |  |

### isApprovedForAll

```solidity
function isApprovedForAll(address account, address operator) public view virtual returns (bool)
```

query approval status of given operator with respect to given address

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | address | address to query for approval granted |
| operator | address | address to query for approval received |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool |  |

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 tokenId) public payable virtual
```

transfer token between given addresses, without checking for ERC721Receiver implementation if applicable

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | sender of token |
| to | address | receiver of token |
| tokenId | uint256 | token id |

### safeTransferFrom

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId) public payable virtual
```

transfer token between given addresses, checking for ERC721Receiver implementation if applicable

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | sender of token |
| to | address | receiver of token |
| tokenId | uint256 | token id |

### safeTransferFrom

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId, bytes data) public payable virtual
```

transfer token between given addresses, checking for ERC721Receiver implementation if applicable

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | sender of token |
| to | address | receiver of token |
| tokenId | uint256 | token id |
| data | bytes | data payload |

### approve

```solidity
function approve(address operator, uint256 tokenId) public payable virtual
```

grant approval to given account to spend token

| Name | Type | Description |
| ---- | ---- | ----------- |
| operator | address | address to be approved |
| tokenId | uint256 | token to approve |

### setApprovalForAll

```solidity
function setApprovalForAll(address operator, bool status) public virtual
```

grant approval to or revoke approval from given account to spend all tokens held by sender

| Name | Type | Description |
| ---- | ---- | ----------- |
| operator | address | address to be approved |
| status | bool | approval status |

