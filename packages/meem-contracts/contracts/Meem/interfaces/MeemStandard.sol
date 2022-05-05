// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

enum Chain {
	Ethereum,
	Polygon,
	Cardano,
	Solana,
	Rinkeby
}

enum PermissionType {
	Copy,
	Remix,
	Read
}

enum Permission {
	Owner,
	Anyone,
	Addresses,
	Holders
}

enum PropertyType {
	Meem,
	Child,
	DefaultMeem,
	DefaultChild
}

enum MeemType {
	Original,
	Copy,
	Remix,
	Wrapped
}

enum URISource {
	TokenURI,
	Data
}

struct Split {
	address toAddress;
	uint256 amount;
	address lockedBy;
}

struct MeemPermission {
	Permission permission;
	address[] addresses;
	uint256 numTokens;
	address lockedBy;
	uint256 costWei;
}

struct MeemProperties {
	int256 totalRemixes;
	address totalRemixesLockedBy;
	int256 remixesPerWallet;
	address remixesPerWalletLockedBy;
	MeemPermission[] copyPermissions;
	MeemPermission[] remixPermissions;
	MeemPermission[] readPermissions;
	address copyPermissionsLockedBy;
	address remixPermissionsLockedBy;
	address readPermissionsLockedBy;
	Split[] splits;
	address splitsLockedBy;
	int256 totalCopies;
	address totalCopiesLockedBy;
	int256 copiesPerWallet;
	address copiesPerWalletLockedBy;
	bool isTransferrable;
	address isTransferrableLockedBy;
	int256 mintStartTimestamp;
	int256 mintEndTimestamp;
	address mintDatesLockedBy;
	uint256 transferLockupUntil;
	address transferLockupUntilLockedBy;
}

struct BaseProperties {
	int256 totalOriginalsSupply;
	address totalOriginalsSupplyLockedBy;
	MeemPermission[] mintPermissions;
	address mintPermissionsLockedBy;
	Split[] splits;
	address splitsLockedBy;
	int256 originalsPerWallet;
	address originalsPerWalletLockedBy;
	bool isTransferrable;
	address isTransferrableLockedBy;
	int256 mintStartTimestamp;
	int256 mintEndTimestamp;
	address mintDatesLockedBy;
	uint256 transferLockupUntil;
	address transferLockupUntilLockedBy;
}

// struct BasePropertiesInit {
// 	int256 totalOriginalsSupply;
// 	bool isTotalOriginalsSupplyLocked;
// 	MeemPermission[] mintPermissions;
// 	bool isMintPermissionsLocked;
// 	Split[] splits;
// 	bool isSplitsLocked;
// 	int256 originalsPerWallet;
// 	bool isOriginalsPerWalletLocked;
// 	bool isTransferrable;
// 	bool isIsTransferrableLocked;
// 	int256 mintStartTimestamp;
// 	int256 mintEndTimestamp;
// 	bool isMintDatesLocked;
// }

struct MeemBase {
	address owner;
	Chain parentChain;
	address parent;
	uint256 parentTokenId;
	Chain rootChain;
	address root;
	uint256 rootTokenId;
	uint256 generation;
	uint256 mintedAt;
	string data;
	address uriLockedBy;
	MeemType meemType;
	address mintedBy;
	URISource uriSource;
	string[] reactionTypes;
}

struct Meem {
	address owner;
	Chain parentChain;
	address parent;
	uint256 parentTokenId;
	Chain rootChain;
	address root;
	uint256 rootTokenId;
	uint256 generation;
	MeemProperties properties;
	MeemProperties childProperties;
	uint256 mintedAt;
	string data;
	address uriLockedBy;
	MeemType meemType;
	address mintedBy;
	URISource uriSource;
	string[] reactionTypes;
}

struct WrappedItem {
	Chain chain;
	address contractAddress;
	uint256 tokenId;
}

struct MeemMintParameters {
	address to;
	string tokenURI;
	Chain parentChain;
	address parent;
	uint256 parentTokenId;
	MeemType meemType;
	string data;
	bool isURILocked;
	address mintedBy;
	URISource uriSource;
	string[] reactionTypes;
}

struct Reaction {
	string reaction;
	uint256 count;
}

struct InitParams {
	string symbol;
	string name;
	string contractURI;
	BaseProperties baseProperties;
	MeemProperties defaultProperties;
	MeemProperties defaultChildProperties;
	address[] admins;
	uint256 tokenCounterStart;
	int256 childDepth;
	uint256 nonOwnerSplitAllocationAmount;
}

struct ContractInfo {
	string symbol;
	string name;
	string contractURI;
	BaseProperties baseProperties;
	MeemProperties defaultProperties;
	MeemProperties defaultChildProperties;
	int256 childDepth;
	uint256 nonOwnerSplitAllocationAmount;
}

interface IInitDiamondStandard {
	function init(InitParams memory params) external;
}

interface IMeemBaseStandard {
	function mint(
		MeemMintParameters memory params,
		MeemProperties memory properties,
		MeemProperties memory childProperties
	) external payable;

	function mintAndCopy(
		MeemMintParameters memory params,
		MeemProperties memory properties,
		MeemProperties memory childProperties,
		address toCopyAddress
	) external payable;

	function mintAndRemix(
		MeemMintParameters memory params,
		MeemProperties memory properties,
		MeemProperties memory childProperties,
		MeemMintParameters memory remixParams,
		MeemProperties memory remixProperties,
		MeemProperties memory remixChildProperties
	) external payable;

	// TODO: Implement child minting
	// function mintChild(
	// 	address to,
	// 	string memory mTokenURI,
	// 	Chain chain,
	// 	uint256 parentTokenId,
	// 	MeemProperties memory properties,
	// 	MeemProperties memory childProperties
	// ) external;
}

interface IMeemQueryStandard {
	// Get children meems
	function copiesOf(uint256 tokenId) external view returns (uint256[] memory);

	function ownedCopiesOf(uint256 tokenId, address owner)
		external
		view
		returns (uint256[] memory);

	function numCopiesOf(uint256 tokenId) external view returns (uint256);

	function remixesOf(uint256 tokenId)
		external
		view
		returns (uint256[] memory);

	function ownedRemixesOf(uint256 tokenId, address owner)
		external
		view
		returns (uint256[] memory);

	function numRemixesOf(uint256 tokenId) external view returns (uint256);

	function childDepth() external returns (int256);

	function tokenIdsOfOwner(address _owner)
		external
		view
		returns (uint256[] memory tokenIds_);

	function isNFTWrapped(
		Chain chain,
		address contractAddress,
		uint256 tokenId
	) external view returns (bool);

	function wrappedTokens(WrappedItem[] memory items)
		external
		view
		returns (uint256[] memory);

	function getMeem(uint256 tokenId) external view returns (Meem memory);

	function getBaseProperties() external view returns (BaseProperties memory);

	function getDefaultProperties(PropertyType propertyType)
		external
		view
		returns (MeemProperties memory);
}

interface IMeemAdminStandard {
	function setNonOwnerSplitAllocationAmount(uint256 amount) external;

	function setChildDepth(int256 newChildDepth) external;

	function setTokenCounter(uint256 tokenCounter) external;

	function setContractURI(string memory newContractURI) external;

	function setMeemIDAddress(address meemID) external;

	function setTokenRoot(
		uint256 tokenId,
		Chain rootChain,
		address root,
		uint256 rootTokenId
	) external;

	function setBaseSplits(Split[] memory splits) external;

	function setTotalOriginalsSupply(int256 totalSupply) external;

	function setOriginalsPerWallet(int256 originalsPerWallet) external;

	function setIsTransferrable(bool isTransferrable) external;

	function lockBaseSplits() external;

	function lockTotalOriginalsSupply() external;

	function lockOriginalsPerWallet() external;

	function lockIsTransferrable() external;

	function lockMintDates() external;

	function setMintDates(int256 startTimestamp, int256 endTimestamp) external;

	function setContractInfo(string memory name, string memory symbol) external;

	function setMintPermissions(MeemPermission[] memory permissions) external;

	function lockMintPermissions() external;

	function setTransferLockup(uint256 lockupUntil) external;

	function lockTransferLockup() external;
}

interface IMeemSplitsStandard {
	function nonOwnerSplitAllocationAmount() external view returns (uint256);

	function lockSplits(uint256 tokenId, PropertyType propertyType) external;

	function setSplits(
		uint256 tokenId,
		PropertyType propertyType,
		Split[] memory splits
	) external;

	function addSplit(
		uint256 tokenId,
		PropertyType propertyType,
		Split memory split
	) external;

	function removeSplitAt(
		uint256 tokenId,
		PropertyType propertyType,
		uint256 idx
	) external;

	function updateSplitAt(
		uint256 tokenId,
		PropertyType propertyType,
		uint256 idx,
		Split memory split
	) external;
}

interface IMeemPermissionsStandard {
	function lockPermissions(
		uint256 tokenId,
		PropertyType propertyType,
		PermissionType permissionType
	) external;

	function setPermissions(
		uint256 tokenId,
		PropertyType propertyType,
		PermissionType permissionType,
		MeemPermission[] memory permissions
	) external;

	function addPermission(
		uint256 tokenId,
		PropertyType propertyType,
		PermissionType permissionType,
		MeemPermission memory permission
	) external;

	function removePermissionAt(
		uint256 tokenId,
		PropertyType propertyType,
		PermissionType permissionType,
		uint256 idx
	) external;

	function updatePermissionAt(
		uint256 tokenId,
		PropertyType propertyType,
		PermissionType permissionType,
		uint256 idx,
		MeemPermission memory permission
	) external;

	function setTotalCopies(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalCopies
	) external;

	function lockTotalCopies(uint256 tokenId, PropertyType propertyType)
		external;

	function setCopiesPerWallet(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newChildrenPerWallet
	) external;

	function lockCopiesPerWallet(uint256 tokenId, PropertyType propertyType)
		external;

	function setTotalRemixes(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalRemixes
	) external;

	function lockTotalRemixes(uint256 tokenId, PropertyType propertyType)
		external;

	function setRemixesPerWallet(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newChildrenPerWallet
	) external;

	function lockRemixesPerWallet(uint256 tokenId, PropertyType propertyType)
		external;

	function setData(uint256 tokenId, string memory data) external;

	function lockUri(uint256 tokenId) external;

	function setURISource(uint256 tokenId, URISource uriSource) external;

	function setTokenUri(uint256 tokenId, string memory uri) external;

	function setIsTransferrable(uint256 tokenId, bool isTransferrable) external;

	function lockIsTransferrable(uint256 tokenId) external;

	function lockMintDates(uint256 tokenId) external;

	function setMintDates(
		uint256 tokenId,
		int256 startTimestamp,
		int256 endTimestamp
	) external;

	function setTransferLockup(uint256 tokenId, uint256 lockupUntil) external;

	function lockTransferLockup(uint256 tokenId) external;
}

interface IClippingStandard {
	function clip(uint256 tokenId) external;

	function unClip(uint256 tokenId) external;

	function addressClippings(address addy)
		external
		view
		returns (uint256[] memory);

	function hasAddressClipped(uint256 tokenId, address addy)
		external
		view
		returns (bool);

	function clippings(uint256 tokenId)
		external
		view
		returns (address[] memory);

	function numClippings(uint256 tokenId) external view returns (uint256);
}

interface IReactionStandard {
	function addReaction(uint256 tokenId, string memory reaction) external;

	function removeReaction(uint256 tokenId, string memory reaction) external;

	function getReactedAt(
		uint256 tokenId,
		address addy,
		string memory reaction
	) external view returns (uint256);

	function setReactionTypes(uint256 tokenId, string[] memory reactionTypes)
		external;

	function getReactions(uint256 tokenId)
		external
		view
		returns (Reaction[] memory);
}
