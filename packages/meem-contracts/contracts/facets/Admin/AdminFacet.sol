// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {LibAccessControl, AccessControlError} from '../AccessControl/LibAccessControl.sol';
import {AccessControlStorage} from '../AccessControl/AccessControlStorage.sol';
import {AccessControlFacet} from '../AccessControl/AccessControlFacet.sol';
import {ERC721MetadataStorage} from '@solidstate/contracts/token/ERC721/metadata/ERC721MetadataStorage.sol';
import {AdminStorage} from './AdminStorage.sol';
import {PermissionsFacet} from '../Permissions/PermissionsFacet.sol';
import {PermissionsStorage} from '../Permissions/PermissionsStorage.sol';
import {MeemPermission} from '../interfaces/MeemStandard.sol';

struct InitParams {
	string symbol;
	string name;
	string contractURI;
	address[] admins;
	address[] minters;
	MeemPermission[] mintPermissions;
}

library AdminError {
	string public constant AlreadyInitialized = 'ALREADY_INITIALIZED';
}

contract AdminFacet {
	function setContractInfo(string memory name, string memory symbol) public {
		requireAdmin();
		ERC721MetadataStorage.Layout storage s = ERC721MetadataStorage.layout();

		s.name = name;
		s.symbol = symbol;
	}

	function setContractURI(string memory newContractURI) public {
		requireAdmin();
		AdminStorage.DataStore storage s = AdminStorage.dataStore();

		s.contractURI = newContractURI;
	}

	function contractURI() public view returns (string memory) {
		AdminStorage.DataStore storage s = AdminStorage.dataStore();

		return s.contractURI;
	}

	function initialize(InitParams memory params) public {
		if (AdminStorage.dataStore().hasInitialized) {
			revert(AdminError.AlreadyInitialized);
		}

		ERC721MetadataStorage.Layout storage s = ERC721MetadataStorage.layout();

		AdminStorage.DataStore storage adminStore = AdminStorage.dataStore();

		s.name = params.name;
		s.symbol = params.symbol;
		adminStore.contractURI = params.contractURI;

		LibAccessControl._grantRole(
			AccessControlStorage.ADMIN_ROLE,
			msg.sender
		);

		for (uint256 i = 0; i < params.admins.length; i++) {
			LibAccessControl._grantRole(
				AccessControlStorage.ADMIN_ROLE,
				params.admins[i]
			);
		}

		bytes32 minterRole = PermissionsFacet(address(this)).MINTER_ROLE();

		for (uint256 i = 0; i < params.minters.length; i++) {
			LibAccessControl._grantRole(minterRole, params.admins[i]);
		}

		PermissionsStorage.DataStore storage permStorage = PermissionsStorage
			.dataStore();

		for (uint256 i = 0; i < params.mintPermissions.length; i++) {
			permStorage.mintPermissions.push(params.mintPermissions[i]);
		}

		AdminStorage.dataStore().hasInitialized = true;
	}

	function requireAdmin() internal view {
		AccessControlFacet ac = AccessControlFacet(address(this));
		if (!ac.hasRole(ac.ADMIN_ROLE(), msg.sender)) {
			revert(AccessControlError.MissingRequiredRole);
		}
	}
}
