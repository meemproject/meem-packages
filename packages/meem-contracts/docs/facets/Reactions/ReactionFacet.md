# Solidity API

## ReactionsError

### AlreadyReacted

```solidity
string AlreadyReacted
```

### ReactionNotFound

```solidity
string ReactionNotFound
```

## ReactionFacet

### MeemTokenReactionAdded

```solidity
event MeemTokenReactionAdded(uint256 tokenId, address addy, string reaction, uint256 newTotalReactions)
```

### MeemTokenReactionRemoved

```solidity
event MeemTokenReactionRemoved(uint256 tokenId, address addy, string reaction, uint256 newTotalReactions)
```

### TokenReactionTypesSet

```solidity
event TokenReactionTypesSet(uint256 tokenId, string[] reactionTypes)
```

### addReaction

```solidity
function addReaction(uint256 tokenId, string reaction) public
```

### removeReaction

```solidity
function removeReaction(uint256 tokenId, string reaction) public
```

### getReactedAt

```solidity
function getReactedAt(uint256 tokenId, address addy, string reaction) public view returns (uint256)
```

### setReactionTypes

```solidity
function setReactionTypes(uint256 tokenId, string[] reactionTypes) internal
```

### getReactions

```solidity
function getReactions(uint256 tokenId) public view returns (struct Reaction[])
```

