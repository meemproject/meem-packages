# Solidity API

## SplitsFacet

### MeemSplitsSet

```solidity
event MeemSplitsSet(uint256 tokenId, struct Split[] splits)
```

Emitted when token splits are set

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | The token |
| splits | struct Split[] | The new splits for the token |

### RoyaltiesSet

```solidity
event RoyaltiesSet(uint256 tokenId, struct Part[] royalties)
```

Rarible v2 compatible event when royalties (splits) are set

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | The token |
| royalties | struct Part[] | The royalties assigned to the token |

### getRaribleV2Royalties

```solidity
function getRaribleV2Royalties(uint256 tokenId) public view returns (struct Part[])
```

### handleSaleDistribution

```solidity
function handleSaleDistribution(uint256 tokenId, address msgSender) public payable
```

Overrides the MeemBaseERC721Facet function to distrubute royalties

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | The token being transferred |
| msgSender | address | The address that is purchasing the token |

### lockSplits

```solidity
function lockSplits(uint256 tokenId) external
```

Locks the token splits

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | The token to lock (0 for minted tokens) |

### setSplits

```solidity
function setSplits(uint256 tokenId, struct Split[] splits) external
```

Sets the token splits (royalties)

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | The token to lock (0 for minted tokens) |
| splits | struct Split[] | The new splits |

