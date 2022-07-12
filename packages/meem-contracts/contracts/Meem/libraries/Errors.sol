// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import {LibMeta} from '../libraries/LibMeta.sol';
import {MeemBase, MeemProperties, Chain, BaseProperties} from '../interfaces/MeemStandard.sol';

library Error {
	string public constant MissingRequiredRole = 'MISSING_REQUIRED_ROLE';
	string public constant NotTokenOwner = 'NOT_TOKEN_OWNER';
	string public constant NotTokenAdmin = 'NOT_TOKEN_ADMIN';
	string public constant InvalidNonOwnerSplitAllocationAmount =
		'INVALID_NON_OWNER_SPLIT_ALLOCATION_AMOUNT';
	string public constant NoRenounceOthers = 'NO_RENOUNCE_OTHERS';
	string public constant InvalidZeroAddressQuery =
		'INVALID_ZERO_ADDRESS_QUERY';
	string public constant IndexOutOfRange = 'INDEX_OUT_OF_RANGE';
	string public constant TokenNotFound = 'TOKEN_NOT_FOUND';
	string public constant TokenAlreadyExists = 'TOKEN_ALREADY_EXISTS';
	string public constant NoApproveSelf = 'NO_APPROVE_SELF';
	string public constant NotApproved = 'NOT_APPROVED';
	string public constant ERC721ReceiverNotImplemented =
		'ERC721_RECEIVER_NOT_IMPLEMENTED';
	string public constant ToAddressInvalid = 'TO_ADDRESS_INVALID';
	string public constant TransfersLocked = 'TRANSFERS_LOCKED';
	string public constant NoTransferWrappedNFT = 'NO_TRANSFER_WRAPPED_NFT';
	string public constant NFTAlreadyWrapped = 'NFT_ALREADY_WRAPPED';
	string public constant PropertyLocked = 'PROPERTY_LOCKED';
	string public constant InvalidPropertyType = 'INVALID_PROPERTY_TYPE';
	string public constant InvalidPermissionType = 'INVALID_PERMISSION_TYPE';
	string public constant InvalidTotalCopies = 'INVALID_TOTAL_COPIES';
	string public constant TotalSupplyExceeded = 'TOTAL_SUPPLY_EXCEEDED';
	string public constant TotalCopiesExceeded = 'TOTAL_COPIES_EXCEEDED';
	string public constant InvalidTotalRemixes = 'INVALID_TOTAL_REMIXES';
	string public constant TotalRemixesExceeded = 'TOTAL_REMIXES_EXCEEDED';
	string public constant CopiesPerWalletExceeded =
		'COPIES_PER_WALLET_EXCEEDED';
	string public constant RemixesPerWalletExceeded =
		'REMIXES_PER_WALLET_EXCEEDED';
	string public constant NoPermission = 'NO_PERMISSION';
	string public constant InvalidChildGeneration = 'INVALID_CHILD_GENERATION';
	string public constant InvalidParent = 'INVALID_PARENT';
	string public constant ChildDepthExceeded = 'CHILD_DEPTH_EXCEEDED';
	string public constant MissingRequiredPermissions =
		'MISSING_REQUIRED_PERMISSIONS';
	string public constant MissingRequiredSplits = 'MISSING_REQUIRED_SPLITS';
	string public constant NoChildOfCopy = 'NO_CHILD_OF_COPY';
	string public constant NoCopyUnverified = 'NO_COPY_UNVERIFIED';
	string public constant MeemNotVerified = 'MEEM_NOT_VERIFIED';
	string public constant InvalidURI = 'INVALID_URI';
	string public constant InvalidMeemType = 'INVALID_MEEM_TYPE';
	string public constant InvalidToken = 'INVALID_TOKEN';
	string public constant AlreadyClipped = 'ALREADY_CLIPPED';
	string public constant NotClipped = 'NOT_CLIPPED';
	string public constant URILocked = 'URI_LOCKED';
	string public constant AlreadyReacted = 'ALREADY_REACTED';
	string public constant ReactionNotFound = 'REACTION_NOT_FOUND';
	string public constant IncorrectMsgValue = 'INCORRECT_MSG_VALUE';
	string public constant TotalOriginalsSupplyExceeded =
		'TOTAL_ORIGINALS_SUPPLY_EXCEEDED';
	string public constant OriginalsPerWalletExceeded =
		'ORIGINALS_PER_WALLET_EXCEEDED';
	string public constant MintingNotStarted = 'MINTING_NOT_STARTED';
	string public constant MintingFinished = 'MINTING_FINISHED';
	string public constant InvalidTokenCounter = 'INVALID_TOKEN_COUNTER';
	string public constant NotOwner = 'NOT_OWNER';
	string public constant AlreadyInitialized = 'ALREADY_INITIALIZED';
}

// TODO: Use custom errors when more widely supported

// error MissingRequiredRole(bytes32 requiredRole);

// error NotTokenOwner(uint256 tokenId);

// error NotTokenAdmin(uint256 tokenId);

// error InvalidNonOwnerSplitAllocationAmount(
// 	uint256 minAmount,
// 	uint256 maxAmount
// );

// error NoRenounceOthers();

// error InvalidZeroAddressQuery();

// error IndexOutOfRange(uint256 idx, uint256 max);

// error TokenNotFound(uint256 tokenId);

// error TokenAlreadyExists(uint256 tokenId);

// error NoApproveSelf();

// error NotApproved();

// error ERC721ReceiverNotImplemented();

// error ToAddressInvalid(address to);

// error NoTransferWrappedNFT(address parentAddress, uint256 parentTokenId);

// error NFTAlreadyWrapped(address parentAddress, uint256 parentTokenId);

// error PropertyLocked(address lockedBy);

// error InvalidPropertyType();

// error InvalidPermissionType();

// error InvalidTotalCopies(uint256 currentTotalCopies);

// error TotalCopiesExceeded();

// error InvalidTotalRemixes(uint256 currentTotalRemixes);

// error TotalRemixesExceeded();

// error CopiesPerWalletExceeded();

// error RemixesPerWalletExceeded();

// error NoPermission();

// error InvalidChildGeneration();

// error InvalidParent();

// error ChildDepthExceeded();

// error MissingRequiredPermissions();

// error MissingRequiredSplits();

// error NoChildOfCopy();

// error NoCopyUnverified();

// error MeemNotVerified();

// error InvalidURI();

// error InvalidMeemType();

// error InvalidToken();

// error AlreadyClipped();

// error NotClipped();

// error URILocked();

// error AlreadyReacted();

// error ReactionNotFound();

// error IncorrectMsgValue();
