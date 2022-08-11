// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {LibAccessControl} from '../AccessControl/LibAccessControl.sol';
import {AccessControlStorage} from '../AccessControl/AccessControlStorage.sol';
import {AccessControlFacet, SetRoleItem, AccessControlError} from '../AccessControl/AccessControlFacet.sol';
import {MeemDiamond} from '../../proxies/MeemDiamond.sol';
import {ERC721MetadataStorage} from '@solidstate/contracts/token/ERC721/metadata/ERC721MetadataStorage.sol';
import {AdminStorage} from './AdminStorage.sol';
import {PermissionsFacet} from '../Permissions/PermissionsFacet.sol';
import {PermissionsStorage} from '../Permissions/PermissionsStorage.sol';
import {AccessControlStorage} from '../AccessControl/AccessControlStorage.sol';
import {SplitsStorage, TokenSplit} from '../Splits/SplitsStorage.sol';
import {LibSplits} from '../Splits/LibSplits.sol';
import {MeemPermission, Split} from '../interfaces/MeemStandard.sol';

struct InitParams {
	string symbol;
	string name;
	string contractURI;
	SetRoleItem[] roles;
	uint256 maxSupply;
	MeemPermission[] mintPermissions;
	Split[] splits;
	bool isTransferLocked;
}

library AdminError {
	string public constant AlreadyInitialized = 'ALREADY_INITIALIZED';
}

struct ContractInfo {
	string symbol;
	string name;
	string contractURI;
	uint256 maxSupply;
	MeemPermission[] mintPermissions;
	Split[] splits;
	bool isTransferLocked;
}

contract AdminFacet {
	event MeemContractInitialized(address indexed contractAddress);
	event MeemContractInfoSet(address indexed contractAddress);
	event MeemContractURISet(address indexed contractAddress);

	function setContractInfo(string memory name, string memory symbol) public {
		requireAdmin();
		ERC721MetadataStorage.Layout storage s = ERC721MetadataStorage.layout();

		s.name = name;
		s.symbol = symbol;

		emit MeemContractInfoSet(address(this));
	}

	function setContractInfo(
		string memory name,
		string memory symbol,
		string memory newContractURI
	) public {
		requireAdmin();
		ERC721MetadataStorage.Layout storage s = ERC721MetadataStorage.layout();
		AdminStorage.DataStore storage adminStorage = AdminStorage.dataStore();

		s.name = name;
		s.symbol = symbol;
		adminStorage.contractURI = newContractURI;

		emit MeemContractInfoSet(address(this));
	}

	function setContractInfo(
		string memory name,
		string memory symbol,
		string memory newContractURI,
		uint256 maxSupply
	) public {
		requireAdmin();
		ERC721MetadataStorage.Layout storage s = ERC721MetadataStorage.layout();
		AdminStorage.DataStore storage adminStorage = AdminStorage.dataStore();

		s.name = name;
		s.symbol = symbol;
		adminStorage.contractURI = newContractURI;

		PermissionsStorage.DataStore storage permStorage = PermissionsStorage
			.dataStore();

		permStorage.maxSupply = maxSupply;

		emit MeemContractInfoSet(address(this));
	}

	function setContractURI(string memory newContractURI) public {
		requireAdmin();
		AdminStorage.DataStore storage s = AdminStorage.dataStore();

		s.contractURI = newContractURI;

		emit MeemContractInfoSet(address(this));
	}

	function getContractInfo() public view returns (ContractInfo memory) {
		ERC721MetadataStorage.Layout storage s = ERC721MetadataStorage.layout();
		AdminStorage.DataStore storage adminStorage = AdminStorage.dataStore();
		SplitsStorage.DataStore storage splitsStorage = SplitsStorage
			.dataStore();
		PermissionsStorage.DataStore storage permStorage = PermissionsStorage
			.dataStore();

		Split[] memory splits = new Split[](
			splitsStorage.tokenSplits[0].splits.length
		);

		for (
			uint256 i = 0;
			i < splitsStorage.tokenSplits[0].splits.length;
			i++
		) {
			splits[i] = splitsStorage.tokenSplits[0].splits[i];
		}

		return
			ContractInfo({
				name: s.name,
				symbol: s.symbol,
				contractURI: adminStorage.contractURI,
				maxSupply: permStorage.maxSupply,
				mintPermissions: permStorage.mintPermissions,
				splits: splits,
				isTransferLocked: permStorage.isTransferLocked
			});
	}

	function contractURI() public view returns (string memory) {
		AdminStorage.DataStore storage s = AdminStorage.dataStore();

		return s.contractURI;
	}

	function initialize(InitParams memory params) public {
		MeemDiamond diamond = MeemDiamond(payable(address(this)));

		if (
			diamond.owner() != msg.sender &&
			!AccessControlStorage
				.dataStore()
				.roles[AccessControlStorage.UPGRADER_ROLE]
				.members[msg.sender]
		) {
			revert(AccessControlError.MissingRequiredRole);
		}

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

		for (uint256 i = 0; i < params.roles.length; i++) {
			if (params.roles[i].hasRole) {
				LibAccessControl._grantRole(
					params.roles[i].role,
					params.roles[i].user
				);
			} else {
				LibAccessControl._revokeRole(
					params.roles[i].role,
					params.roles[i].user
				);
			}
		}

		PermissionsStorage.DataStore storage permStorage = PermissionsStorage
			.dataStore();

		permStorage.maxSupply = params.maxSupply;
		permStorage.isTransferLocked = params.isTransferLocked;

		for (uint256 i = 0; i < params.mintPermissions.length; i++) {
			permStorage.mintPermissions.push(params.mintPermissions[i]);
		}

		LibSplits._setSplits(0, params.splits);

		AdminStorage.dataStore().hasInitialized = true;

		emit MeemContractInitialized(address(this));
	}

	function reinitialize(InitParams memory params) public {
		requireAdmin();

		ERC721MetadataStorage.Layout storage s = ERC721MetadataStorage.layout();

		AdminStorage.DataStore storage adminStore = AdminStorage.dataStore();

		s.name = params.name;
		s.symbol = params.symbol;
		adminStore.contractURI = params.contractURI;

		for (uint256 i = 0; i < params.roles.length; i++) {
			if (params.roles[i].hasRole) {
				LibAccessControl._grantRole(
					params.roles[i].role,
					params.roles[i].user
				);
			} else {
				LibAccessControl._revokeRole(
					params.roles[i].role,
					params.roles[i].user
				);
			}
		}

		PermissionsStorage.DataStore storage permStorage = PermissionsStorage
			.dataStore();

		permStorage.maxSupply = params.maxSupply;

		permStorage.isTransferLocked = params.isTransferLocked;

		delete permStorage.mintPermissions;

		for (uint256 i = 0; i < params.mintPermissions.length; i++) {
			permStorage.mintPermissions.push(params.mintPermissions[i]);
		}

		LibSplits._setSplits(0, params.splits);

		emit MeemContractInitialized(address(this));
	}

	function requireAdmin() internal view {
		AccessControlFacet ac = AccessControlFacet(address(this));
		if (!ac.hasRole(ac.ADMIN_ROLE(), msg.sender)) {
			revert(AccessControlError.MissingRequiredRole);
		}
	}
}
