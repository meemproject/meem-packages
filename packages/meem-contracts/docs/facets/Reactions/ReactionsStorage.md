# Solidity API

## ReactionsStorage

### STORAGE_SLOT

```solidity
bytes32 STORAGE_SLOT
```

### DataStore

```solidity
struct DataStore {
  mapping(uint256 => mapping(string => uint256)) tokenReactions;
  mapping(uint256 => mapping(string => mapping(address => uint256))) addressReactionsAt;
  mapping(address => mapping(uint256 => string[])) addressReactions;
  mapping(address => mapping(uint256 => mapping(string => uint256))) addressReactionsIndex;
  mapping(uint256 => string[]) tokenReactionTypes;
}
```

### dataStore

```solidity
function dataStore() internal pure returns (struct ReactionsStorage.DataStore l)
```

