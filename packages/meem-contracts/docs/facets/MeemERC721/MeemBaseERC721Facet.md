# Solidity API

## Error

### NotTokenAdmin

```solidity
string NotTokenAdmin
```

### NotPayable

```solidity
string NotPayable
```

## Meem

```solidity
struct Meem {
  address owner;
  enum TokenType tokenType;
  address mintedBy;
  uint256 mintedAt;
}
```

## RequireCanMintParams

```solidity
struct RequireCanMintParams {
  address minter;
  address to;
  bytes32[] proof;
}
```

## MeemBaseERC721Facet

### MeemTransfer

```solidity
event MeemTransfer(address from, address to, uint256 tokenId)
```

Emitted when a token is transferred

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | The address the token is being transferred from |
| to | address | The address the token is being transferred to |
| tokenId | uint256 | The token being transferred |

### bulkMint

```solidity
function bulkMint(struct MintParameters[] bulkParams) public payable virtual
```

Bulk Mint tokens

| Name | Type | Description |
| ---- | ---- | ----------- |
| bulkParams | struct MintParameters[] | Array of minting parameters |

### mint

```solidity
function mint(struct MintParameters params) public payable virtual
```

Mint a token

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct MintParameters | The minting parameters |

### mintWithProof

```solidity
function mintWithProof(struct MintWithProofParameters params) public payable virtual
```

Mint a token and provide a proof that the minter is in the allowlist

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct MintWithProofParameters | The minting parameters |

### tokenURI

```solidity
function tokenURI(uint256 tokenId) public view virtual returns (string)
```

Get the token URI

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | The tokenId to get the token URI for |

### handleSaleDistribution

```solidity
function handleSaleDistribution(uint256 tokenId, address msgSender) public payable
```

When a token is sold, distribute the royalties

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | The token that is being purchased. This function will also be called when a token is minted with tokenId=0. |
| msgSender | address | The address who is purchasing the token |

### requireCanMint

```solidity
function requireCanMint(struct RequireCanMintParams params) public payable
```

Require that an address can mint a token

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct RequireCanMintParams | The requirement parameters |

### requireTokenAdmin

```solidity
function requireTokenAdmin(uint256 tokenId, address addy) public view
```

Require that an address is a token admin. By default only the token owner is an admin

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | The token id to check |
| addy | address | The address to check |

### requireCanTransfer

```solidity
function requireCanTransfer(address from, address to, uint256 tokenId) public
```

Check if a token can be transferred

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | The address the token is being transferred from |
| to | address | The address the token is being transferred to |
| tokenId | uint256 | The token id to check |

### getMeem

```solidity
function getMeem(uint256 tokenId) public view returns (struct Meem)
```

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 tokenId) public payable
```

Transfer a token

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | The address the token is being transferred from |
| to | address | The address the token is being transferred to |
| tokenId | uint256 | The token id to transfer |

### safeTransferFrom

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId) public payable
```

Safely transfer a token

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | The address the token is being transferred from |
| to | address | The address the token is being transferred to |
| tokenId | uint256 | The token id to transfer |

### safeTransferFrom

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId, bytes data) public payable
```

Safely transfer a token

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | The address the token is being transferred from |
| to | address | The address the token is being transferred to |
| tokenId | uint256 | The token id to transfer |
| data | bytes | The data |

### burn

```solidity
function burn(uint256 tokenId) public
```

Burns a token (sends it to the 0x0 address)

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | The token id to burn |

### _beforeTokenTransfer

```solidity
function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual
```

Runs before a token is transferred

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | The address the token is being transferred from |
| to | address | The address the token is being transferred to |
| tokenId | uint256 | The token id to burn |

### requireAdmin

```solidity
function requireAdmin() internal view
```

Convenience function to require the caller to be an admin

