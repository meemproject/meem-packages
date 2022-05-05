// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;

import {LibERC721} from '../libraries/LibERC721.sol';
import {LibAppStorage} from '../storage/LibAppStorage.sol';
import {LibAccessControl} from '../libraries/LibAccessControl.sol';
import {LibPermissions} from '../libraries/LibPermissions.sol';
import {LibProperties} from '../libraries/LibProperties.sol';
import {Meem, Chain, MeemProperties, PropertyType, PermissionType, MeemPermission, Split, IMeemPermissionsStandard, URISource} from '../interfaces/MeemStandard.sol';
import {IRoyaltiesProvider} from '../../royalties/IRoyaltiesProvider.sol';
import {LibPart} from '../../royalties/LibPart.sol';
import {Error} from '../libraries/Errors.sol';

contract MeemPermissionsFacet is IMeemPermissionsStandard {
	function setTotalCopies(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalCopies
	) external override {
		LibProperties.setTotalCopies(tokenId, propertyType, newTotalCopies);
	}

	function lockTotalCopies(uint256 tokenId, PropertyType propertyType)
		external
		override
	{
		LibProperties.lockTotalCopies(tokenId, propertyType);
	}

	function setCopiesPerWallet(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalCopies
	) external override {
		LibProperties.setCopiesPerWallet(tokenId, propertyType, newTotalCopies);
	}

	function lockCopiesPerWallet(uint256 tokenId, PropertyType propertyType)
		external
		override
	{
		LibProperties.lockCopiesPerWallet(tokenId, propertyType);
	}

	function setTotalRemixes(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalRemixes
	) external override {
		LibProperties.setTotalRemixes(tokenId, propertyType, newTotalRemixes);
	}

	function lockTotalRemixes(uint256 tokenId, PropertyType propertyType)
		external
		override
	{
		LibProperties.lockTotalRemixes(tokenId, propertyType);
	}

	function setRemixesPerWallet(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalRemixes
	) external override {
		LibProperties.setRemixesPerWallet(
			tokenId,
			propertyType,
			newTotalRemixes
		);
	}

	function lockRemixesPerWallet(uint256 tokenId, PropertyType propertyType)
		external
		override
	{
		LibProperties.lockRemixesPerWallet(tokenId, propertyType);
	}

	function lockPermissions(
		uint256 tokenId,
		PropertyType propertyType,
		PermissionType permissionType
	) external override {
		LibPermissions.lockPermissions(tokenId, propertyType, permissionType);
	}

	function setPermissions(
		uint256 tokenId,
		PropertyType propertyType,
		PermissionType permissionType,
		MeemPermission[] memory permissions
	) external override {
		LibPermissions.setPermissions(
			tokenId,
			propertyType,
			permissionType,
			permissions
		);
	}

	function addPermission(
		uint256 tokenId,
		PropertyType propertyType,
		PermissionType permissionType,
		MeemPermission memory permission
	) external override {
		LibPermissions.addPermission(
			tokenId,
			propertyType,
			permissionType,
			permission
		);
	}

	function removePermissionAt(
		uint256 tokenId,
		PropertyType propertyType,
		PermissionType permissionType,
		uint256 idx
	) external override {
		LibPermissions.removePermissionAt(
			tokenId,
			propertyType,
			permissionType,
			idx
		);
	}

	function updatePermissionAt(
		uint256 tokenId,
		PropertyType propertyType,
		PermissionType permissionType,
		uint256 idx,
		MeemPermission memory permission
	) external override {
		LibPermissions.updatePermissionAt(
			tokenId,
			propertyType,
			permissionType,
			idx,
			permission
		);
	}

	function setData(uint256 tokenId, string memory data) external override {
		LibProperties.setData(tokenId, data);
	}

	function lockUri(uint256 tokenId) external override {
		LibProperties.lockUri(tokenId);
	}

	function setURISource(uint256 tokenId, URISource uriSource)
		external
		override
	{
		LibProperties.setURISource(tokenId, uriSource);
	}

	function setTokenUri(uint256 tokenId, string memory uri) external override {
		LibProperties.setTokenUri(tokenId, uri);
	}

	function setIsTransferrable(uint256 tokenId, bool isTransferrable)
		external
		override
	{
		LibProperties.setIsTransferrable(tokenId, isTransferrable);
	}

	function lockIsTransferrable(uint256 tokenId) external override {
		LibProperties.lockIsTransferrable(tokenId);
	}

	function lockMintDates(uint256 tokenId) external override {
		LibProperties.lockMintDates(tokenId);
	}

	function setMintDates(
		uint256 tokenId,
		int256 startTimestamp,
		int256 endTimestamp
	) external override {
		LibProperties.setMintDates(tokenId, startTimestamp, endTimestamp);
	}

	function setTransferLockup(uint256 tokenId, uint256 lockupUntil)
		external
		override
	{
		LibProperties.setTransferLockup(tokenId, lockupUntil);
	}

	function lockTransferLockup(uint256 tokenId) external override {
		LibProperties.lockTransferLockup(tokenId);
	}
}
