# Solidity API

## RequireCanMintParams

```solidity
struct RequireCanMintParams {
  address minter;
  address to;
  bytes32[] proof;
}
```

## MyCustomFacet

### requireCanMint

```solidity
function requireCanMint(struct RequireCanMintParams params) public payable
```

