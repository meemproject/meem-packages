# Solidity API

## ClippingError

### AlreadyClipped

```solidity
string AlreadyClipped
```

### NotClipped

```solidity
string NotClipped
```

## ClippingFacet

### MeemTokenClipped

```solidity
event MeemTokenClipped(uint256 tokenId, address addy)
```

### MeemTokenUnClipped

```solidity
event MeemTokenUnClipped(uint256 tokenId, address addy)
```

### clip

```solidity
function clip(uint256 tokenId) public
```

### unClip

```solidity
function unClip(uint256 tokenId) public
```

### tokenClippings

```solidity
function tokenClippings(uint256 tokenId) public view returns (address[])
```

### addressClippings

```solidity
function addressClippings(address addy) public view returns (uint256[])
```

### hasAddressClipped

```solidity
function hasAddressClipped(uint256 tokenId, address addy) public view returns (bool)
```

### clippings

```solidity
function clippings(uint256 tokenId) public view returns (address[])
```

### numClippings

```solidity
function numClippings(uint256 tokenId) public view returns (uint256)
```

