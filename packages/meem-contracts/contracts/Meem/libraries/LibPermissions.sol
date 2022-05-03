// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {LibAppStorage} from '../storage/LibAppStorage.sol';
import {PropertyType, MeemProperties, MeemPermission, PermissionType} from '../interfaces/MeemStandard.sol';
import {LibERC721} from './LibERC721.sol';
import {LibProperties} from './LibProperties.sol';
import {LibSplits} from './LibSplits.sol';
import {Array} from '../utils/Array.sol';
import {Error} from './Errors.sol';
import {MeemBaseEvents, MeemEvents} from './Events.sol';

library LibPermissions {
	function lockPermissions(
		uint256 tokenId,
		PropertyType propertyType,
		PermissionType permissionType
	) internal {
		LibERC721.requireOwnsToken(tokenId);
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);
		permissionNotLocked(props, permissionType);

		if (permissionType == PermissionType.Copy) {
			props.copyPermissionsLockedBy = msg.sender;
		} else if (permissionType == PermissionType.Remix) {
			props.remixPermissionsLockedBy = msg.sender;
		} else if (permissionType == PermissionType.Read) {
			props.readPermissionsLockedBy = msg.sender;
		} else {
			revert(Error.InvalidPermissionType);
		}
	}

	function setPermissions(
		uint256 tokenId,
		PropertyType propertyType,
		PermissionType permissionType,
		MeemPermission[] memory permissions
	) internal {
		LibERC721.requireOwnsToken(tokenId);
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);
		permissionNotLocked(props, permissionType);

		MeemPermission[] storage perms = getPermissions(props, permissionType);

		// Check if there are any existing locked permissions and if so, verify they're the same as the new permissions
		validatePermissions(permissions, perms);

		if (permissionType == PermissionType.Copy) {
			delete props.copyPermissions;
		} else if (permissionType == PermissionType.Remix) {
			delete props.remixPermissions;
		} else if (permissionType == PermissionType.Read) {
			delete props.readPermissions;
		} else {
			revert(Error.InvalidPermissionType);
		}

		for (uint256 i = 0; i < permissions.length; i++) {
			perms.push(permissions[i]);
		}

		emit MeemEvents.MeemPermissionsSet(
			tokenId,
			propertyType,
			permissionType,
			perms
		);
	}

	function lockMintPermissions() internal {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();

		if (s.baseProperties.mintPermissionsLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}

		s.baseProperties.mintPermissionsLockedBy = msg.sender;
	}

	function setMintPermissions(MeemPermission[] memory permissions) internal {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();

		if (s.baseProperties.mintPermissionsLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}

		// Check if there are any existing locked permissions and if so, verify they're the same as the new permissions
		validatePermissions(permissions, s.baseProperties.mintPermissions);

		delete s.baseProperties.mintPermissions;

		for (uint256 i = 0; i < permissions.length; i++) {
			s.baseProperties.mintPermissions.push(permissions[i]);
		}

		emit MeemBaseEvents.MeemMintPermissionsSet(
			s.baseProperties.mintPermissions
		);
	}

	function addPermission(
		uint256 tokenId,
		PropertyType propertyType,
		PermissionType permissionType,
		MeemPermission memory permission
	) internal {
		LibERC721.requireOwnsToken(tokenId);
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);
		permissionNotLocked(props, permissionType);

		MeemPermission[] storage perms = getPermissions(props, permissionType);
		perms.push(permission);

		emit MeemEvents.MeemPermissionsSet(
			tokenId,
			propertyType,
			permissionType,
			perms
		);
	}

	function removePermissionAt(
		uint256 tokenId,
		PropertyType propertyType,
		PermissionType permissionType,
		uint256 idx
	) internal {
		LibERC721.requireOwnsToken(tokenId);
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);

		permissionNotLocked(props, permissionType);

		MeemPermission[] storage perms = getPermissions(props, permissionType);
		if (perms[idx].lockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}

		if (idx >= perms.length) {
			revert(Error.IndexOutOfRange);
		}

		for (uint256 i = idx; i < perms.length - 1; i++) {
			perms[i] = perms[i + 1];
		}

		perms.pop();
		emit MeemEvents.MeemPermissionsSet(
			tokenId,
			propertyType,
			permissionType,
			perms
		);
	}

	function updatePermissionAt(
		uint256 tokenId,
		PropertyType propertyType,
		PermissionType permissionType,
		uint256 idx,
		MeemPermission memory permission
	) internal {
		LibERC721.requireOwnsToken(tokenId);
		MeemProperties storage props = LibProperties.getProperties(
			tokenId,
			propertyType
		);
		permissionNotLocked(props, permissionType);

		MeemPermission[] storage perms = getPermissions(props, permissionType);

		if (perms[idx].lockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}

		perms[idx] = permission;
		emit MeemEvents.MeemPermissionsSet(
			tokenId,
			propertyType,
			permissionType,
			perms
		);
	}

	function validatePermissions(
		MeemPermission[] memory basePermissions,
		MeemPermission[] memory overridePermissions
	) internal pure {
		for (uint256 i = 0; i < overridePermissions.length; i++) {
			if (overridePermissions[i].lockedBy != address(0)) {
				// Find the permission in basePermissions
				bool wasFound = false;
				for (uint256 j = 0; j < basePermissions.length; j++) {
					if (
						basePermissions[j].lockedBy ==
						overridePermissions[i].lockedBy &&
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

	function permissionNotLocked(
		MeemProperties storage self,
		PermissionType permissionType
	) internal view {
		if (permissionType == PermissionType.Copy) {
			if (self.copyPermissionsLockedBy != address(0)) {
				revert(Error.PropertyLocked);
			}
		} else if (permissionType == PermissionType.Remix) {
			if (self.remixPermissionsLockedBy != address(0)) {
				revert(Error.PropertyLocked);
			}
		} else if (permissionType == PermissionType.Read) {
			if (self.readPermissionsLockedBy != address(0)) {
				revert(Error.PropertyLocked);
			}
		}
	}

	function getPermissions(
		MeemProperties storage self,
		PermissionType permissionType
	) internal view returns (MeemPermission[] storage) {
		if (permissionType == PermissionType.Copy) {
			return self.copyPermissions;
		} else if (permissionType == PermissionType.Remix) {
			return self.remixPermissions;
		} else if (permissionType == PermissionType.Read) {
			return self.readPermissions;
		}

		revert(Error.InvalidPermissionType);
	}
}
