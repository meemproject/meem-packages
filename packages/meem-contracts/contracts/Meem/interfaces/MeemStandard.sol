// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

enum Permission {
	Anyone,
	Addresses,
	Holders
}

enum TokenType {
	Original,
	Copy,
	Remix,
	Wrapped
}

enum URISource {
	Url,
	JSON
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
	uint256 costWei;
	uint256 mintStartTimestamp;
	uint256 mintEndTimestamp;
	uint256 lockupDuration;
}

struct MintParameters {
	address to;
	string tokenURI;
	// Chain parentChain;
	// address parent;
	// uint256 parentTokenId;
	TokenType tokenType;
	URISource uriSource;
	// bool isURILocked;
	// address mintedBy;
	// string[] reactionTypes;
}

struct Reaction {
	string reaction;
	uint256 count;
}
