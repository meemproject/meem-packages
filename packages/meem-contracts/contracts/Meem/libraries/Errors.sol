// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import {LibMeta} from '../libraries/LibMeta.sol';
import {MeemBase, MeemProperties, Chain, BaseProperties} from '../interfaces/MeemStandard.sol';

library Error {
	string constant MissingRequiredRole = 'MISSING_REQUIRED_ROLE';
	string constant NotTokenOwner = 'NOT_TOKEN_OWNER';
	string constant NotTokenAdmin = 'NOT_TOKEN_ADMIN';
	string constant InvalidNonOwnerSplitAllocationAmount =
		'INVALID_NON_OWNER_SPLIT_ALLOCATION_AMOUNT';
	string constant NoRenounceOthers = 'NO_RENOUNCE_OTHERS';
	string constant InvalidZeroAddressQuery = 'INVALID_ZERO_ADDRESS_QUERY';
	string constant IndexOutOfRange = 'INDEX_OUT_OF_RANGE';
	string constant TokenNotFound = 'TOKEN_NOT_FOUND';
	string constant TokenAlreadyExists = 'TOKEN_ALREADY_EXISTS';
	string constant NoApproveSelf = 'NO_APPROVE_SELF';
	string constant NotApproved = 'NOT_APPROVED';
	string constant ERC721ReceiverNotImplemented =
		'ERC721_RECEIVER_NOT_IMPLEMENTED';
	string constant ToAddressInvalid = 'TO_ADDRESS_INVALID';
	string constant NoTransferWrappedNFT = 'NO_TRANSFER_WRAPPED_NFT';
	string constant NFTAlreadyWrapped = 'NFT_ALREADY_WRAPPED';
	string constant PropertyLocked = 'PROPERTY_LOCKED';
	string constant InvalidPropertyType = 'INVALID_PROPERTY_TYPE';
	string constant InvalidPermissionType = 'INVALID_PERMISSION_TYPE';
	string constant InvalidTotalCopies = 'INVALID_TOTAL_COPIES';
	string constant TotalCopiesExceeded = 'TOTAL_COPIES_EXCEEDED';
	string constant InvalidTotalRemixes = 'INVALID_TOTAL_REMIXES';
	string constant TotalRemixesExceeded = 'TOTAL_REMIXES_EXCEEDED';
	string constant CopiesPerWalletExceeded = 'COPIES_PER_WALLET_EXCEEDED';
	string constant RemixesPerWalletExceeded = 'REMIXES_PER_WALLET_EXCEEDED';
	string constant NoPermission = 'NO_PERMISSION';
	string constant InvalidChildGeneration = 'INVALID_CHILD_GENERATION';
	string constant InvalidParent = 'INVALID_PARENT';
	string constant ChildDepthExceeded = 'CHILD_DEPTH_EXCEEDED';
	string constant MissingRequiredPermissions = 'MISSING_REQUIRED_PERMISSIONS';
	string constant MissingRequiredSplits = 'MISSING_REQUIRED_SPLITS';
	string constant NoChildOfCopy = 'NO_CHILD_OF_COPY';
	string constant NoCopyUnverified = 'NO_COPY_UNVERIFIED';
	string constant MeemNotVerified = 'MEEM_NOT_VERIFIED';
	string constant InvalidURI = 'INVALID_URI';
	string constant InvalidMeemType = 'INVALID_MEEM_TYPE';
	string constant InvalidToken = 'INVALID_TOKEN';
	string constant AlreadyClipped = 'ALREADY_CLIPPED';
	string constant NotClipped = 'NOT_CLIPPED';
	string constant URILocked = 'URI_LOCKED';
	string constant AlreadyReacted = 'ALREADY_REACTED';
	string constant ReactionNotFound = 'REACTION_NOT_FOUND';
	string constant IncorrectMsgValue = 'INCORRECT_MSG_VALUE';
	string constant TotalSupplyExceeded = 'TOTAL_SUPPLY_EXCEEDED';
	string constant TokensPerWalletExceeded = 'TOKENS_PER_WALLET_EXCEEDED';
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
