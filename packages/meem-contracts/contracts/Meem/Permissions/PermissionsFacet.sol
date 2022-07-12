// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;

import {LibERC721} from '../libraries/LibERC721.sol';
import {Array} from '../utils/Array.sol';
import {LibAppStorage} from '../storage/LibAppStorage.sol';
import {LibAccessControl} from '../AccessControl/LibAccessControl.sol';
import {LibPermissions} from '../libraries/LibPermissions.sol';
import {LibProperties} from '../libraries/LibProperties.sol';
import {Meem, Chain, MeemProperties, PropertyType, PermissionType, MeemPermission, Split, IMeemPermissionsStandard, URISource} from '../interfaces/MeemStandard.sol';
import {IRoyaltiesProvider} from '../../royalties/IRoyaltiesProvider.sol';
import {LibPart} from '../../royalties/LibPart.sol';
import {Error} from '../libraries/Errors.sol';
import {PermissionsStorage} from './PermissionsStorage.sol';
import {AccessControlFacet} from '../AccessControl/AccessControlFacet.sol';
import {MeemBaseERC721Facet} from '../MeemERC721/MeemBaseERC721Facet.sol';

library PermissionsError {
	string public constant TotalSupplyExceeded = 'TOTAL_SUPPLY_EXCEEDED';
}

contract PermissionsFacet {
	function requireCanMint(address minter) public {
		MeemBaseERC721Facet baseContract = MeemBaseERC721Facet(address(this));
		PermissionsStorage.DataStore storage s = PermissionsStorage.dataStore();
		AccessControlFacet ac = AccessControlFacet(address(this));

		bool isAdmin = ac.hasRole(ac.ADMIN_ROLE(), msg.sender);

		// Check if the max supply will be exceeded
		if (baseContract.totalSupply() + 1 > s.maxSupply) {
			revert(PermissionsError.TotalSupplyExceeded);
		}
	}

	function setMaxSupply(uint256 newMaxSupply) public {
		AccessControlFacet ac = AccessControlFacet(address(this));
		if (!ac.hasRole(ac.ADMIN_ROLE(), msg.sender)) {
			revert(Error.MissingRequiredRole);
		}
		PermissionsStorage.DataStore storage s = PermissionsStorage.dataStore();
		if (s.isMaxSupplyLocked) {
			revert(Error.PropertyLocked);
		}

		s.maxSupply = newMaxSupply;
	}

	function maxSupply() public view returns (uint256) {
		PermissionsStorage.DataStore storage s = PermissionsStorage.dataStore();
		return s.maxSupply;
	}

	function lockMaxSupply() public {
		AccessControlFacet ac = AccessControlFacet(address(this));
		if (!ac.hasRole(ac.ADMIN_ROLE(), msg.sender)) {
			revert(Error.MissingRequiredRole);
		}
		PermissionsStorage.DataStore storage s = PermissionsStorage.dataStore();
		if (s.isMaxSupplyLocked) {
			revert(Error.PropertyLocked);
		}
		s.isMaxSupplyLocked = true;
	}

	function setMintingPermissions(MeemPermission[] memory newPermissions)
		public
	{
		AccessControlFacet ac = AccessControlFacet(address(this));
		if (!ac.hasRole(ac.ADMIN_ROLE(), msg.sender)) {
			revert(Error.MissingRequiredRole);
		}
		PermissionsStorage.DataStore storage s = PermissionsStorage.dataStore();
		if (s.isMaxSupplyLocked) {
			revert(Error.PropertyLocked);
		}

		PermissionsFacet(address(this)).validatePermissions(
			s.mintPermissions,
			newPermissions
		);

		delete s.mintPermissions;

		for (uint256 i = 0; i < newPermissions.length; i++) {
			s.mintPermissions.push(newPermissions[i]);
		}

		// emit MeemEvents.MintingPermissionsSet(
		// 	tokenId,
		// 	propertyType,
		// 	permissionType,
		// 	perms
		// );
	}

	function validatePermissions(
		MeemPermission[] memory basePermissions,
		MeemPermission[] memory overridePermissions
	) public pure {
		for (uint256 i = 0; i < overridePermissions.length; i++) {
			if (overridePermissions[i].isLocked) {
				// Find the permission in basePermissions
				bool wasFound = false;
				for (uint256 j = 0; j < basePermissions.length; j++) {
					if (
						basePermissions[j].isLocked ==
						overridePermissions[i].isLocked &&
						basePermissions[j].permission ==
						overridePermissions[i].permission &&
						basePermissions[j].numTokens ==
						overridePermissions[i].numTokens &&
						Array.isEqual(
							basePermissions[j].addresses,
							overridePermissions[i].addresses
						)
					) {
						wasFound = true;
						break;
					}
				}
				if (!wasFound) {
					revert(Error.MissingRequiredPermissions);
				}
			}
		}
	}

	function setTotalCopies(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalCopies
	) public {
		LibProperties.setTotalCopies(tokenId, propertyType, newTotalCopies);
	}

	function lockTotalCopies(uint256 tokenId, PropertyType propertyType)
		external
	{
		LibProperties.lockTotalCopies(tokenId, propertyType);
	}

	function setCopiesPerWallet(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalCopies
	) external {
		LibProperties.setCopiesPerWallet(tokenId, propertyType, newTotalCopies);
	}

	function lockCopiesPerWallet(uint256 tokenId, PropertyType propertyType)
		external
	{
		LibProperties.lockCopiesPerWallet(tokenId, propertyType);
	}

	function setTotalRemixes(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalRemixes
	) external {
		LibProperties.setTotalRemixes(tokenId, propertyType, newTotalRemixes);
	}

	function lockTotalRemixes(uint256 tokenId, PropertyType propertyType)
		external
	{
		LibProperties.lockTotalRemixes(tokenId, propertyType);
	}

	function setRemixesPerWallet(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalRemixes
	) external {
		LibProperties.setRemixesPerWallet(
			tokenId,
			propertyType,
			newTotalRemixes
		);
	}

	function lockRemixesPerWallet(uint256 tokenId, PropertyType propertyType)
		external
	{
		LibProperties.lockRemixesPerWallet(tokenId, propertyType);
	}

	function lockPermissions(
		uint256 tokenId,
		PropertyType propertyType,
		PermissionType permissionType
	) external {
		LibPermissions.lockPermissions(tokenId, propertyType, permissionType);
	}

	function setPermissions(
		uint256 tokenId,
		PropertyType propertyType,
		PermissionType permissionType,
		MeemPermission[] memory permissions
	) external {
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
	) external {
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
	) external {
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
	) external {
		LibPermissions.updatePermissionAt(
			tokenId,
			propertyType,
			permissionType,
			idx,
			permission
		);
	}

	function setData(uint256 tokenId, string memory data) external {
		LibProperties.setData(tokenId, data);
	}

	function lockUri(uint256 tokenId) external {
		LibProperties.lockUri(tokenId);
	}

	function setURISource(uint256 tokenId, URISource uriSource) external {
		LibProperties.setURISource(tokenId, uriSource);
	}

	function setTokenUri(uint256 tokenId, string memory uri) external {
		LibProperties.setTokenUri(tokenId, uri);
	}

	function setIsTransferrable(uint256 tokenId, bool isTransferrable)
		external
	{
		LibProperties.setIsTransferrable(tokenId, isTransferrable);
	}

	function lockIsTransferrable(uint256 tokenId) external {
		LibProperties.lockIsTransferrable(tokenId);
	}

	function lockMintDates(uint256 tokenId) external {
		LibProperties.lockMintDates(tokenId);
	}

	function setMintDates(
		uint256 tokenId,
		int256 startTimestamp,
		int256 endTimestamp
	) external {
		LibProperties.setMintDates(tokenId, startTimestamp, endTimestamp);
	}

	function setTransferLockup(uint256 tokenId, uint256 lockupUntil) external {
		LibProperties.setTransferLockup(tokenId, lockupUntil);
	}

	function lockTransferLockup(uint256 tokenId) external {
		LibProperties.lockTransferLockup(tokenId);
	}
}
