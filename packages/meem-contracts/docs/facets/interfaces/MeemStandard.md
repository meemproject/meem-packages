# Solidity API

## Permission

```solidity
enum Permission {
  Anyone,
  Addresses,
  Holders
}
```

## TokenType

```solidity
enum TokenType {
  Original,
  Copy,
  Remix,
  Wrapped
}
```

## URISource

```solidity
enum URISource {
  Url,
  JSON
}
```

## Split

```solidity
struct Split {
  address toAddress;
  uint256 amount;
  address lockedBy;
}
```

## MeemPermission

```solidity
struct MeemPermission {
  enum Permission permission;
  address[] addresses;
  uint256 numTokens;
  uint256 costWei;
  uint256 mintStartTimestamp;
  uint256 mintEndTimestamp;
  bytes32 merkleRoot;
}
```

## MintParameters

```solidity
struct MintParameters {
  address to;
  string tokenURI;
  enum TokenType tokenType;
}
```

## MintWithProofParameters

```solidity
struct MintWithProofParameters {
  address to;
  string tokenURI;
  enum TokenType tokenType;
  bytes32[] proof;
}
```

## Reaction

```solidity
struct Reaction {
  string reaction;
  uint256 count;
}
```

