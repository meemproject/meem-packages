# Solidity API

## SetRoleItem

```solidity
struct SetRoleItem {
  address user;
  bytes32 role;
  bool hasRole;
}
```

## AccessControlError

### MissingRequiredRole

```solidity
string MissingRequiredRole
```

### NoRenounceOthers

```solidity
string NoRenounceOthers
```

## AccessControlFacet

Assign roles to grant access to otherwise limited functions of the contract

### MeemRoleGranted

```solidity
event MeemRoleGranted(bytes32 role, address user)
```

### MeemRoleRevoked

```solidity
event MeemRoleRevoked(bytes32 role, address user)
```

### RoleGranted

```solidity
event RoleGranted(bytes32 role, address account, address sender)
```

_Emitted when `account` is granted `role`.

`sender` is the account that originated the contract call, an admin role
bearer except when using {AccessControl-_setupRole}._

### RoleRevoked

```solidity
event RoleRevoked(bytes32 role, address account, address sender)
```

_Emitted when `account` is revoked `role`.

`sender` is the account that originated the contract call:
  - if using `revokeRole`, it is the admin role bearer
  - if using `renounceRole`, it is the role bearer (i.e. `account`)_

### RoleSet

```solidity
event RoleSet(bytes32 role, address[] account, address sender)
```

### ADMIN_ROLE

```solidity
function ADMIN_ROLE() public pure returns (bytes32)
```

An admin of the contract.

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | Hashed value that represents this role. |

### UPGRADER_ROLE

```solidity
function UPGRADER_ROLE() public pure returns (bytes32)
```

A contract upgrader

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | Hashed value that represents this role. |

### canUpgradeContract

```solidity
function canUpgradeContract(address upgrader) public view returns (bool)
```

Check if a user has access to upgrade the contract

| Name | Type | Description |
| ---- | ---- | ----------- |
| upgrader | address | The wallet address of the upgrader |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool of whether the user can upgrade the contract |

### bulkSetRoles

```solidity
function bulkSetRoles(struct SetRoleItem[] items) public
```

Bulk assign roles

| Name | Type | Description |
| ---- | ---- | ----------- |
| items | struct SetRoleItem[] | The roles to assign / remove |

### grantRole

```solidity
function grantRole(bytes32 role, address user) public
```

Grant a role to a user. The granting user must have the ADMIN_ROLE

| Name | Type | Description |
| ---- | ---- | ----------- |
| role | bytes32 | The role to grant |
| user | address | The wallet address of the user to grant the role to |

### revokeRole

```solidity
function revokeRole(bytes32 role, address user) public
```

Grant a role to a user. The granting user must have the ADMIN_ROLE

| Name | Type | Description |
| ---- | ---- | ----------- |
| role | bytes32 | The role to revoke |
| user | address | The wallet address of the user to revoke the role from |

### hasRole

```solidity
function hasRole(bytes32 role, address user) public view returns (bool)
```

Grant a role to a user. The granting user must have the ADMIN_ROLE

| Name | Type | Description |
| ---- | ---- | ----------- |
| role | bytes32 | The role to revoke |
| user | address | The wallet address of the user to revoke the role from |

### getRoles

```solidity
function getRoles(bytes32 role) public view returns (address[])
```

Get the list of users with a role

| Name | Type | Description |
| ---- | ---- | ----------- |
| role | bytes32 | The role to fetch |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address[] | address[] of the users with the role |

### requireRole

```solidity
function requireRole(bytes32 role, address user) public view
```

Requires that a user has a role

| Name | Type | Description |
| ---- | ---- | ----------- |
| role | bytes32 | The role to check |
| user | address | The user to check |

## AccessControlStorage

### STORAGE_SLOT

```solidity
bytes32 STORAGE_SLOT
```

### ADMIN_ROLE

```solidity
bytes32 ADMIN_ROLE
```

### UPGRADER_ROLE

```solidity
bytes32 UPGRADER_ROLE
```

### RoleData

```solidity
struct RoleData {
  mapping(address => bool) members;
}
```

### DataStore

```solidity
struct DataStore {
  mapping(bytes32 => struct AccessControlStorage.RoleData) roles;
  mapping(bytes32 => address[]) rolesList;
  mapping(bytes32 => mapping(address => uint256)) rolesListIndex;
}
```

### dataStore

```solidity
function dataStore() internal pure returns (struct AccessControlStorage.DataStore l)
```

## LibAccessControl

### _grantRole

```solidity
function _grantRole(bytes32 role, address account) internal
```

### _revokeRole

```solidity
function _revokeRole(bytes32 role, address account) internal
```

## InitParams

```solidity
struct InitParams {
  string symbol;
  string name;
  string contractURI;
  struct SetRoleItem[] roles;
  uint256 maxSupply;
  struct MeemPermission[] mintPermissions;
  struct Split[] splits;
  bool isTransferLocked;
}
```

## AdminError

### AlreadyInitialized

```solidity
string AlreadyInitialized
```

## ContractInfo

```solidity
struct ContractInfo {
  string symbol;
  string name;
  string contractURI;
  uint256 maxSupply;
  struct MeemPermission[] mintPermissions;
  struct Split[] splits;
  bool isTransferLocked;
}
```

## AdminFacet

### MeemContractInitialized

```solidity
event MeemContractInitialized(address contractAddress)
```

### MeemContractInfoSet

```solidity
event MeemContractInfoSet(address contractAddress)
```

### MeemContractURISet

```solidity
event MeemContractURISet(address contractAddress)
```

### setContractInfo

```solidity
function setContractInfo(string name, string symbol) public
```

### setContractInfo

```solidity
function setContractInfo(string name, string symbol, string newContractURI) public
```

### setContractInfo

```solidity
function setContractInfo(string name, string symbol, string newContractURI, uint256 maxSupply) public
```

### setContractURI

```solidity
function setContractURI(string newContractURI) public
```

### getContractInfo

```solidity
function getContractInfo() public view returns (struct ContractInfo)
```

### contractURI

```solidity
function contractURI() public view returns (string)
```

### initialize

```solidity
function initialize(struct InitParams params) public
```

### reinitialize

```solidity
function reinitialize(struct InitParams params) public
```

### requireAdmin

```solidity
function requireAdmin() internal view
```

## AdminStorage

### STORAGE_SLOT

```solidity
bytes32 STORAGE_SLOT
```

### DataStore

```solidity
struct DataStore {
  bool hasInitialized;
  string contractURI;
}
```

### dataStore

```solidity
function dataStore() internal pure returns (struct AdminStorage.DataStore l)
```

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

## ClippingStorage

### STORAGE_SLOT

```solidity
bytes32 STORAGE_SLOT
```

### DataStore

```solidity
struct DataStore {
  mapping(uint256 => address[]) clippings;
  mapping(address => uint256[]) addressClippings;
  mapping(address => mapping(uint256 => uint256)) clippingsIndex;
  mapping(address => mapping(uint256 => uint256)) addressClippingsIndex;
  mapping(address => mapping(uint256 => bool)) hasAddressClipped;
}
```

### dataStore

```solidity
function dataStore() internal pure returns (struct ClippingStorage.DataStore l)
```

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

### bulkMint

```solidity
function bulkMint(struct MintParameters[] bulkParams) public payable virtual
```

Bulk Mint Meems

| Name | Type | Description |
| ---- | ---- | ----------- |
| bulkParams | struct MintParameters[] | Array of minting parameters |

### mint

```solidity
function mint(struct MintParameters params) public payable virtual
```

Mint a Meem

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct MintParameters | The minting parameters |

### mintWithProof

```solidity
function mintWithProof(struct MintWithProofParameters params) public payable virtual
```

Mint a Meem

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct MintWithProofParameters | The minting parameters |

### tokenURI

```solidity
function tokenURI(uint256 tokenId) public view virtual returns (string)
```

### handleSaleDistribution

```solidity
function handleSaleDistribution(uint256 tokenId, address msgSender) public payable
```

When a token is sold, distribute the royalties

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | The token that is being sold. This function will also be called when a token is minted with tokenId=0. |
| msgSender | address |  |

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
| from | address |  |
| to | address |  |
| tokenId | uint256 | The token id to check |

### getMeem

```solidity
function getMeem(uint256 tokenId) public view returns (struct Meem)
```

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 tokenId) public payable
```

Override

### safeTransferFrom

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId) public payable
```

Override

### safeTransferFrom

```solidity
function safeTransferFrom(address from, address to, uint256 tokenId, bytes data) public payable
```

Override

### burn

```solidity
function burn(uint256 tokenId) public
```

### _beforeTokenTransfer

```solidity
function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual
```

### requireAdmin

```solidity
function requireAdmin() internal view
```

## MeemBaseStorage

### STORAGE_SLOT

```solidity
bytes32 STORAGE_SLOT
```

### DataStore

```solidity
struct DataStore {
  uint256 tokenCounter;
  string contractURI;
  mapping(uint256 => enum TokenType) tokenTypes;
  mapping(uint256 => address) minters;
  mapping(uint256 => uint256) mintedTimestamps;
}
```

### dataStore

```solidity
function dataStore() internal pure returns (struct MeemBaseStorage.DataStore l)
```

## PermissionsError

### MaxSupplyExceeded

```solidity
string MaxSupplyExceeded
```

### NoPermission

```solidity
string NoPermission
```

### IncorrectMsgValue

```solidity
string IncorrectMsgValue
```

### PropertyLocked

```solidity
string PropertyLocked
```

### TransfersLocked

```solidity
string TransfersLocked
```

## PermissionsFacet

### MeemMintPermissionsSet

```solidity
event MeemMintPermissionsSet(struct MeemPermission[] mintPermissions)
```

### MeemMaxSupplySet

```solidity
event MeemMaxSupplySet(uint256 maxSupply)
```

### MeemMaxSupplyLocked

```solidity
event MeemMaxSupplyLocked()
```

### MeemIsTransferrableLocked

```solidity
event MeemIsTransferrableLocked()
```

### MINTER_ROLE

```solidity
function MINTER_ROLE() public pure returns (bytes32)
```

### requireCanMint

```solidity
function requireCanMint(struct RequireCanMintParams params) public payable
```

### setMaxSupply

```solidity
function setMaxSupply(uint256 newMaxSupply) public
```

### maxSupply

```solidity
function maxSupply() public view returns (uint256)
```

### setMintingPermissions

```solidity
function setMintingPermissions(struct MeemPermission[] newPermissions) public
```

### validatePermissions

```solidity
function validatePermissions(struct MeemPermission[] basePermissions, struct MeemPermission[] overridePermissions) public pure
```

### setIsTransferrable

```solidity
function setIsTransferrable(bool isTransferrable) public
```

### requireCanTransfer

```solidity
function requireCanTransfer(address from, address to, uint256 tokenId) public
```

### isBetweenTimestamps

```solidity
function isBetweenTimestamps(uint256 start, uint256 end) internal view returns (bool)
```

### requireAdmin

```solidity
function requireAdmin() internal view
```

## PermissionsStorage

### STORAGE_SLOT

```solidity
bytes32 STORAGE_SLOT
```

### DataStore

```solidity
struct DataStore {
  uint256 maxSupply;
  struct MeemPermission[] mintPermissions;
  bool isTransferLocked;
}
```

### dataStore

```solidity
function dataStore() internal pure returns (struct PermissionsStorage.DataStore l)
```

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

## IRoyaltiesProvider

### getRoyalties

```solidity
function getRoyalties(address token, uint256 tokenId) external returns (struct Part[])
```

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

## RoyaltiesV2

### getRaribleV2Royalties

```solidity
function getRaribleV2Royalties(uint256 id) external view returns (struct Part[])
```

## SplitsFacet

### MeemSplitsSet

```solidity
event MeemSplitsSet(uint256 tokenId, struct Split[] splits)
```

### RoyaltiesSet

```solidity
event RoyaltiesSet(uint256 tokenId, struct Part[] royalties)
```

### getRaribleV2Royalties

```solidity
function getRaribleV2Royalties(uint256 tokenId) public view returns (struct Part[])
```

### handleSaleDistribution

```solidity
function handleSaleDistribution(uint256 tokenId, address msgSender) public payable
```

### lockSplits

```solidity
function lockSplits(uint256 tokenId) external
```

### setSplits

```solidity
function setSplits(uint256 tokenId, struct Split[] splits) external
```

## TokenSplit

```solidity
struct TokenSplit {
  struct Split[] splits;
  address lockedBy;
}
```

## SplitsStorage

### STORAGE_SLOT

```solidity
bytes32 STORAGE_SLOT
```

### DataStore

```solidity
struct DataStore {
  address splitsLockedBy;
  mapping(uint256 => struct TokenSplit) tokenSplits;
  uint256 nonOwnerSplitAllocationAmount;
}
```

### dataStore

```solidity
function dataStore() internal pure returns (struct SplitsStorage.DataStore l)
```

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

## Array

### removeAt

```solidity
function removeAt(uint256[] array, uint256 index) internal returns (uint256[])
```

### removeAt

```solidity
function removeAt(address[] array, uint256 index) internal returns (address[])
```

### removeAt

```solidity
function removeAt(string[] array, uint256 index) internal returns (string[])
```

### isEqual

```solidity
function isEqual(address[] arr1, address[] arr2) internal pure returns (bool)
```

## Base64

Provides a function for encoding some bytes in base64

### TABLE

```solidity
bytes TABLE
```

### encode

```solidity
function encode(bytes data) internal pure returns (string)
```

Encodes some bytes to the base64 representation

## Strings

_String operations._

### strWithUint

```solidity
function strWithUint(string _str, uint256 value) internal pure returns (string)
```

_Converts a `uint256` to its ASCII `string` representation._

### substring

```solidity
function substring(string str, uint256 startIndex, uint256 numChars) internal pure returns (string)
```

### compareStrings

```solidity
function compareStrings(string a, string b) internal pure returns (bool)
```

### toHexString

```solidity
function toHexString(uint256 value) internal pure returns (string)
```

_Converts a `uint256` to its ASCII `string` hexadecimal representation._

### toHexString

```solidity
function toHexString(uint256 value, uint256 length) internal pure returns (string)
```

_Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length._

## MeemDiamondError

### NoPermission

```solidity
string NoPermission
```

## MeemDiamond

### MeemDiamondCreated

```solidity
event MeemDiamondCreated()
```

### constructor

```solidity
constructor(address owner, address[] upgraders) public
```

### diamondCut

```solidity
function diamondCut(struct IDiamondWritable.FacetCut[] facetCuts, address target, bytes data) external
```

update diamond facets and optionally execute arbitrary initialization function

| Name | Type | Description |
| ---- | ---- | ----------- |
| facetCuts | struct IDiamondWritable.FacetCut[] | array of structured Diamond facet update data |
| target | address | optional target of initialization delegatecall |
| data | bytes | optional initialization function call data |

### receive

```solidity
receive() external payable
```

### getFallbackAddress

```solidity
function getFallbackAddress() external view returns (address)
```

get the address of the fallback contract

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | fallback address |

### setFallbackAddress

```solidity
function setFallbackAddress(address fallbackAddress) external
```

set the address of the fallback contract

| Name | Type | Description |
| ---- | ---- | ----------- |
| fallbackAddress | address | fallback address |

### _transferOwnership

```solidity
function _transferOwnership(address account) internal virtual
```

## IDiamondCut

### FacetCutAction

```solidity
enum FacetCutAction {
  Add,
  Replace,
  Remove
}
```

### FacetCut

```solidity
struct FacetCut {
  address facetAddress;
  enum IDiamondCut.FacetCutAction action;
  bytes4[] functionSelectors;
}
```

### diamondCut

```solidity
function diamondCut(struct IDiamondCut.FacetCut[] _diamondCut, address _init, bytes _calldata) external
```

Add/replace/remove any number of functions and optionally execute
        a function with delegatecall

| Name | Type | Description |
| ---- | ---- | ----------- |
| _diamondCut | struct IDiamondCut.FacetCut[] | Contains the facet addresses and function selectors |
| _init | address | The address of the contract or facet to execute _calldata |
| _calldata | bytes | A function call, including function selector and arguments                  _calldata is executed with delegatecall on _init |

### DiamondCut

```solidity
event DiamondCut(struct IDiamondCut.FacetCut[] _diamondCut, address _init, bytes _calldata)
```

## IDiamondLoupe

### Facet

```solidity
struct Facet {
  address facetAddress;
  bytes4[] functionSelectors;
}
```

### facets

```solidity
function facets() external view returns (struct IDiamondLoupe.Facet[] facets_)
```

Gets all facet addresses and their four byte function selectors.

| Name | Type | Description |
| ---- | ---- | ----------- |
| facets_ | struct IDiamondLoupe.Facet[] | Facet |

### facetFunctionSelectors

```solidity
function facetFunctionSelectors(address _facet) external view returns (bytes4[] facetFunctionSelectors_)
```

Gets all the function selectors supported by a specific facet.

| Name | Type | Description |
| ---- | ---- | ----------- |
| _facet | address | The facet address. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| facetFunctionSelectors_ | bytes4[] |  |

### facetAddresses

```solidity
function facetAddresses() external view returns (address[] facetAddresses_)
```

Get all the facet addresses used by a diamond.

| Name | Type | Description |
| ---- | ---- | ----------- |
| facetAddresses_ | address[] |  |

### facetAddress

```solidity
function facetAddress(bytes4 _functionSelector) external view returns (address facetAddress_)
```

Gets the facet that supports the given selector.

_If facet is not found return address(0)._

| Name | Type | Description |
| ---- | ---- | ----------- |
| _functionSelector | bytes4 | The function selector. |

| Name | Type | Description |
| ---- | ---- | ----------- |
| facetAddress_ | address | The facet address. |

## IERC165

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) external view returns (bool)
```

Query if a contract implements an interface

_Interface identification is specified in ERC-165. This function
 uses less than 30,000 gas._

| Name | Type | Description |
| ---- | ---- | ----------- |
| interfaceId | bytes4 | The interface identifier, as specified in ERC-165 |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | `true` if the contract implements `interfaceID` and  `interfaceID` is not 0xffffffff, `false` otherwise |

## IERC173

### owner

```solidity
function owner() external view returns (address owner_)
```

Get the address of the owner

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner_ | address | The address of the owner. |

### transferOwnership

```solidity
function transferOwnership(address _newOwner) external
```

Set the address of the new owner of the contract

_Set _newOwner to address(0) to renounce any ownership._

| Name | Type | Description |
| ---- | ---- | ----------- |
| _newOwner | address | The address of the new owner of the contract |

## IERC721TokenReceiver

_Note: the ERC-165 identifier for this interface is 0x150b7a02._

### onERC721Received

```solidity
function onERC721Received(address _operator, address _from, uint256 _tokenId, bytes _data) external returns (bytes4)
```

Handle the receipt of an NFT

_The ERC721 smart contract calls this function on the recipient
 after a `transfer`. This function MAY throw to revert and reject the
 transfer. Return of other than the magic value MUST result in the
 transaction being reverted.
 Note: the contract address is always the message sender._

| Name | Type | Description |
| ---- | ---- | ----------- |
| _operator | address | The address which called `safeTransferFrom` function |
| _from | address | The address which previously owned the token |
| _tokenId | uint256 | The NFT identifier which is being transferred |
| _data | bytes | Additional data with no specified format |

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes4 | `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`  unless throwing |

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

## UpgradePermissionedStorage

### STORAGE_SLOT

```solidity
bytes32 STORAGE_SLOT
```

### DataStore

```solidity
struct DataStore {
  mapping(address => bool) upgraders;
}
```

### dataStore

```solidity
function dataStore() internal pure returns (struct UpgradePermissionedStorage.DataStore l)
```

