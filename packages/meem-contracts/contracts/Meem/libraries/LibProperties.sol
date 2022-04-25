// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {LibAppStorage} from '../storage/LibAppStorage.sol';
import {PropertyType, MeemProperties, URISource} from '../interfaces/MeemStandard.sol';
import {LibERC721} from './LibERC721.sol';
import {LibPermissions} from './LibPermissions.sol';
import {LibSplits} from './LibSplits.sol';
import {Strings} from '../utils/Strings.sol';
import {Error} from './Errors.sol';

library LibProperties {
	event PropertiesSet(
		uint256 tokenId,
		PropertyType propertyType,
		MeemProperties props
	);

	event TotalCopiesSet(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalCopies
	);
	event TotalCopiesLocked(
		uint256 tokenId,
		PropertyType propertyType,
		address lockedBy
	);
	event CopiesPerWalletSet(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalRemixes
	);
	event TotalRemixesSet(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalRemixes
	);
	event TotalRemixesLocked(
		uint256 tokenId,
		PropertyType propertyType,
		address lockedBy
	);
	event RemixesPerWalletSet(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalRemixes
	);
	event CopiesPerWalletLocked(
		uint256 tokenId,
		PropertyType propertyType,
		address lockedBy
	);
	event RemixesPerWalletLocked(
		uint256 tokenId,
		PropertyType propertyType,
		address lockedBy
	);

	event URISourceSet(uint256 tokenId, URISource uriSource);

	event URISet(uint256 tokenId, string uri);

	event URILockedBySet(uint256 tokenId, address lockedBy);

	event DataSet(uint256 tokenId, string data);

	function getProperties(uint256 tokenId, PropertyType propertyType)
		internal
		view
		returns (MeemProperties storage)
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();

		if (propertyType == PropertyType.Meem) {
			return s.meemProperties[tokenId];
		} else if (propertyType == PropertyType.Child) {
			return s.meemChildProperties[tokenId];
		} else if (propertyType == PropertyType.DefaultMeem) {
			return s.defaultProperties;
		} else if (propertyType == PropertyType.DefaultChild) {
			return s.defaultChildProperties;
		}

		revert(Error.InvalidPropertyType);
	}

	function setProperties(
		uint256 tokenId,
		PropertyType propertyType,
		MeemProperties memory mProperties
	) internal {
		setProperties(tokenId, propertyType, mProperties, 0, false);
	}

	function setProperties(
		uint256 tokenId,
		PropertyType propertyType,
		MeemProperties memory mProperties,
		uint256 parentTokenId,
		bool shouldMergeParent
	) internal {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		setProperties(
			tokenId,
			propertyType,
			mProperties,
			s.meemChildProperties[parentTokenId],
			shouldMergeParent
		);
	}

	function setProperties(
		uint256 tokenId,
		PropertyType propertyType,
		MeemProperties memory mProperties,
		MeemProperties memory parentProperties,
		bool shouldMergeParent
	) internal {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);
		MeemProperties memory newProps = mProperties;
		if (shouldMergeParent) {
			newProps = mergeProperties(mProperties, parentProperties);
		}

		for (uint256 i = 0; i < newProps.copyPermissions.length; i++) {
			props.copyPermissions.push(newProps.copyPermissions[i]);
		}

		for (uint256 i = 0; i < newProps.remixPermissions.length; i++) {
			props.remixPermissions.push(newProps.remixPermissions[i]);
		}

		for (uint256 i = 0; i < newProps.readPermissions.length; i++) {
			props.readPermissions.push(newProps.readPermissions[i]);
		}

		for (uint256 i = 0; i < newProps.splits.length; i++) {
			props.splits.push(newProps.splits[i]);
		}

		props.totalCopies = newProps.totalCopies;
		props.totalCopiesLockedBy = newProps.totalCopiesLockedBy;
		props.totalRemixes = newProps.totalRemixes;
		props.totalRemixesLockedBy = newProps.totalRemixesLockedBy;
		props.copiesPerWallet = newProps.copiesPerWallet;
		props.copiesPerWalletLockedBy = newProps.copiesPerWalletLockedBy;
		props.remixesPerWallet = newProps.remixesPerWallet;
		props.remixesPerWalletLockedBy = newProps.remixesPerWalletLockedBy;
		props.copyPermissionsLockedBy = newProps.copyPermissionsLockedBy;
		props.remixPermissionsLockedBy = newProps.remixPermissionsLockedBy;
		props.readPermissionsLockedBy = newProps.readPermissionsLockedBy;
		props.splitsLockedBy = newProps.splitsLockedBy;

		if (
			propertyType == PropertyType.Meem ||
			propertyType == PropertyType.Child
		) {
			LibSplits.validateSplits(
				props,
				LibERC721.ownerOf(tokenId),
				s.nonOwnerSplitAllocationAmount
			);
		}

		emit PropertiesSet(tokenId, propertyType, props);
	}

	// Merges the base properties with any overrides
	function mergeProperties(
		MeemProperties memory baseProperties,
		MeemProperties memory overrideProps
	) internal pure returns (MeemProperties memory) {
		MeemProperties memory mergedProps = baseProperties;

		if (overrideProps.totalCopiesLockedBy != address(0)) {
			mergedProps.totalCopiesLockedBy = overrideProps.totalCopiesLockedBy;
			mergedProps.totalCopies = overrideProps.totalCopies;
		}

		if (overrideProps.copiesPerWalletLockedBy != address(0)) {
			mergedProps.copiesPerWalletLockedBy = overrideProps
				.copiesPerWalletLockedBy;
			mergedProps.copiesPerWallet = overrideProps.copiesPerWallet;
		}

		if (overrideProps.totalRemixesLockedBy != address(0)) {
			mergedProps.totalRemixesLockedBy = overrideProps
				.totalRemixesLockedBy;
			mergedProps.totalRemixes = overrideProps.totalRemixes;
		}

		if (overrideProps.remixesPerWalletLockedBy != address(0)) {
			mergedProps.remixesPerWalletLockedBy = overrideProps
				.remixesPerWalletLockedBy;
			mergedProps.remixesPerWallet = overrideProps.remixesPerWallet;
		}

		// Merge / validate properties
		if (overrideProps.copyPermissionsLockedBy != address(0)) {
			mergedProps.copyPermissionsLockedBy = overrideProps
				.copyPermissionsLockedBy;
			mergedProps.copyPermissions = overrideProps.copyPermissions;
		} else {
			LibPermissions.validatePermissions(
				mergedProps.copyPermissions,
				overrideProps.copyPermissions
			);
		}

		if (overrideProps.remixPermissionsLockedBy != address(0)) {
			mergedProps.remixPermissionsLockedBy = overrideProps
				.remixPermissionsLockedBy;
			mergedProps.remixPermissions = overrideProps.remixPermissions;
		} else {
			LibPermissions.validatePermissions(
				mergedProps.remixPermissions,
				overrideProps.remixPermissions
			);
		}

		if (overrideProps.readPermissionsLockedBy != address(0)) {
			mergedProps.readPermissionsLockedBy = overrideProps
				.readPermissionsLockedBy;
			mergedProps.readPermissions = overrideProps.readPermissions;
		} else {
			LibPermissions.validatePermissions(
				mergedProps.readPermissions,
				overrideProps.readPermissions
			);
		}

		// Validate splits
		if (overrideProps.splitsLockedBy != address(0)) {
			mergedProps.splitsLockedBy = overrideProps.splitsLockedBy;
			mergedProps.splits = overrideProps.splits;
		} else {
			LibSplits.validateOverrideSplits(
				mergedProps.splits,
				overrideProps.splits
			);
		}

		return mergedProps;
	}

	function setTotalCopies(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalCopies
	) internal {
		LibERC721.requireOwnsToken(tokenId);
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);

		if (newTotalCopies > -1) {
			if (
				propertyType == PropertyType.Meem &&
				uint256(newTotalCopies) < s.copies[tokenId].length
			) {
				revert(Error.InvalidTotalCopies);
			}
		}

		if (props.totalCopiesLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}

		props.totalCopies = newTotalCopies;
		emit TotalCopiesSet(tokenId, propertyType, newTotalCopies);
	}

	function lockTotalCopies(uint256 tokenId, PropertyType propertyType)
		internal
	{
		LibERC721.requireOwnsToken(tokenId);
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);

		if (props.totalCopiesLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}

		props.totalCopiesLockedBy = msg.sender;
		emit TotalCopiesLocked(tokenId, propertyType, msg.sender);
	}

	function setCopiesPerWallet(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalCopies
	) internal {
		LibERC721.requireOwnsToken(tokenId);
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);

		if (props.copiesPerWalletLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}

		props.copiesPerWallet = newTotalCopies;
		emit CopiesPerWalletSet(tokenId, propertyType, newTotalCopies);
	}

	function lockCopiesPerWallet(uint256 tokenId, PropertyType propertyType)
		internal
	{
		LibERC721.requireOwnsToken(tokenId);
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);

		if (props.copiesPerWalletLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}

		props.copiesPerWalletLockedBy = msg.sender;
		emit CopiesPerWalletLocked(tokenId, propertyType, msg.sender);
	}

	function setTotalRemixes(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalRemixes
	) internal {
		LibERC721.requireOwnsToken(tokenId);
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);

		if (newTotalRemixes > -1) {
			if (
				propertyType == PropertyType.Meem &&
				uint256(newTotalRemixes) < s.remixes[tokenId].length
			) {
				revert(Error.InvalidTotalRemixes);
			}
		}

		if (props.totalRemixesLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}

		props.totalRemixes = newTotalRemixes;
		emit TotalRemixesSet(tokenId, propertyType, newTotalRemixes);
	}

	function lockTotalRemixes(uint256 tokenId, PropertyType propertyType)
		internal
	{
		LibERC721.requireOwnsToken(tokenId);
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);

		if (props.totalRemixesLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}

		props.totalRemixesLockedBy = msg.sender;
		emit TotalRemixesLocked(tokenId, propertyType, msg.sender);
	}

	function setRemixesPerWallet(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalRemixes
	) internal {
		LibERC721.requireOwnsToken(tokenId);
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);

		if (props.remixesPerWalletLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}

		props.remixesPerWallet = newTotalRemixes;
		emit RemixesPerWalletSet(tokenId, propertyType, newTotalRemixes);
	}

	function lockRemixesPerWallet(uint256 tokenId, PropertyType propertyType)
		internal
	{
		LibERC721.requireOwnsToken(tokenId);
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);

		if (props.remixesPerWalletLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}

		props.remixesPerWalletLockedBy = msg.sender;
		emit RemixesPerWalletLocked(tokenId, propertyType, msg.sender);
	}

	function setData(uint256 tokenId, string memory data) internal {
		LibERC721.requireOwnsToken(tokenId);
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		if (s.meems[tokenId].uriLockedBy != address(0)) {
			revert(Error.URILocked);
		}

		s.meems[tokenId].data = data;
		emit DataSet(tokenId, s.meems[tokenId].data);
	}

	function lockUri(uint256 tokenId) internal {
		LibERC721.requireOwnsToken(tokenId);
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		if (s.meems[tokenId].uriLockedBy != address(0)) {
			revert(Error.URILocked);
		}

		// Require IPFS uri or URI type to be data
		if (
			s.meems[tokenId].uriSource != URISource.Data &&
			!Strings.compareStrings(
				'ipfs://',
				Strings.substring(s.tokenURIs[tokenId], 0, 7)
			)
		) {
			revert(Error.InvalidURI);
		}

		s.meems[tokenId].uriLockedBy = msg.sender;

		emit URILockedBySet(tokenId, s.meems[tokenId].uriLockedBy);
	}

	function setURISource(uint256 tokenId, URISource uriSource) internal {
		LibERC721.requireOwnsToken(tokenId);
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		if (s.meems[tokenId].uriLockedBy != address(0)) {
			revert(Error.URILocked);
		}

		s.meems[tokenId].uriSource = uriSource;
		emit URISourceSet(tokenId, uriSource);
	}

	function setTokenUri(uint256 tokenId, string memory uri) internal {
		LibERC721.requireOwnsToken(tokenId);
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		if (s.meems[tokenId].uriLockedBy != address(0)) {
			revert(Error.URILocked);
		}

		s.tokenURIs[tokenId] = uri;

		emit URISet(tokenId, uri);
	}

	// function requirePropertiesAccess(uint256 tokenId, PropertyType propertyType)
	// 	internal
	// 	view
	// {
	// 	LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();

	// 	if (
	// 		propertyType == PropertyType.Meem ||
	// 		propertyType == PropertyType.Child
	// 	) {
	// 		LibERC721.requireOwnsToken(tokenId);
	// 	} else if (
	// 		propertyType == PropertyType.Meem ||
	// 		propertyType == PropertyType.Child
	// 	) {
	// 		LibAccessControl.requireRole(s.ADMIN_ROLE);
	// 	} else {
	// 		revert(Error.InvalidPropertyType);
	// 	}
	// }
}