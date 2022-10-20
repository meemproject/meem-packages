# Solidity API

## Part

```solidity
struct Part {
  address payable account;
  uint96 value;
}
```

## Error

### InvalidNonOwnerSplitAllocationAmount

```solidity
string InvalidNonOwnerSplitAllocationAmount
```

## LibSplits

### MeemSplitsSet

```solidity
event MeemSplitsSet(uint256 tokenId, struct Split[] splits)
```

### RoyaltiesSet

```solidity
event RoyaltiesSet(uint256 tokenId, struct Part[] royalties)
```

### _getRaribleV2Royalties

```solidity
function _getRaribleV2Royalties(uint256 tokenId) internal view returns (struct Part[])
```

### _setSplits

```solidity
function _setSplits(uint256 tokenId, struct Split[] splits) internal
```

### _validateSplits

```solidity
function _validateSplits(struct Split[] currentSplits, address tokenOwner, uint256 nonOwnerSplitAllocationAmount) internal view
```

