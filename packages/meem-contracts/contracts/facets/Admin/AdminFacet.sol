// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {LibAccessControl} from '../AccessControl/LibAccessControl.sol';
import {AccessControlStorage} from '../AccessControl/AccessControlStorage.sol';
import {AccessControlFacet, SetRoleItem, AccessControlError} from '../AccessControl/AccessControlFacet.sol';
import {MeemDiamond} from '../../proxies/MeemDiamond.sol';
import {ERC721MetadataStorage} from '@solidstate/contracts/token/ERC721/metadata/ERC721MetadataStorage.sol';
import {IERC721Metadata} from '@solidstate/contracts/token/ERC721/metadata/IERC721Metadata.sol';
import {IERC721Enumerable} from '@solidstate/contracts/token/ERC721/enumerable/IERC721Enumerable.sol';
import {IERC721} from '@solidstate/contracts/token/ERC721/IERC721.sol';
import {AdminStorage} from './AdminStorage.sol';
import {PermissionsFacet} from '../Permissions/PermissionsFacet.sol';
import {PermissionsStorage} from '../Permissions/PermissionsStorage.sol';
import {AccessControlStorage} from '../AccessControl/AccessControlStorage.sol';
import {SplitsStorage, TokenSplit} from '../Splits/SplitsStorage.sol';
import {LibSplits} from '../Splits/LibSplits.sol';
import {MeemPermission, Split} from '../interfaces/MeemStandard.sol';
import {ERC165Storage, IERC165} from '@solidstate/contracts/introspection/ERC165.sol';

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

/// @title Errors that can be emitted by AdminFacet functions
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

/// @title Admin functions for the Meem contract
contract AdminFacet {
	using ERC165Storage for ERC165Storage.Layout;

	/// @notice Emitted when the contract is initialized (or re-initialized)
	/// @param contractAddress The address of the contract
	event MeemContractInitialized(address indexed contractAddress);

	/// @notice Emitted when contract info is set
	/// @param contractAddress The address of the contract
	event MeemContractInfoSet(address indexed contractAddress);

	/// @notice Emitted when the contract URI is set
	/// @param contractAddress The address of the contract
	event MeemContractURISet(address indexed contractAddress);

	/// @notice Set the contract info
	/// @param name The name of the contract
	/// @param symbol The symbol of the token
	function setContractInfo(string memory name, string memory symbol) public {
		requireAdmin();
		ERC721MetadataStorage.Layout storage s = ERC721MetadataStorage.layout();

		s.name = name;
		s.symbol = symbol;

		emit MeemContractInfoSet(address(this));
	}

	/// @notice Set the contract info
	/// @param name The name of the contract
	/// @param symbol The symbol of the token
	/// @param newContractURI The new contract URI
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

	/// @notice Set the contract info
	/// @param name The name of the contract
	/// @param symbol The symbol of the token
	/// @param newContractURI The new contract URI
	/// @param maxSupply The new max supply. Must be greater than the current supply
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

	/// @notice Set the contract info
	/// @param newContractURI The new contract URI
	function setContractURI(string memory newContractURI) public {
		requireAdmin();
		AdminStorage.DataStore storage s = AdminStorage.dataStore();

		s.contractURI = newContractURI;

		emit MeemContractInfoSet(address(this));
	}

	/// @notice Gets the contract info
	/// @return The contract info
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

	/// @notice Gets the contract URI
	/// @return The contract URI
	function contractURI() public view returns (string memory) {
		AdminStorage.DataStore storage s = AdminStorage.dataStore();

		return s.contractURI;
	}

	/// @notice Initialize the contract
	/// @dev May only be called once
	/// @param params The initialization parameters
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

		ERC165Storage.Layout storage erc165 = ERC165Storage.layout();
		erc165.setSupportedInterface(type(IERC721Metadata).interfaceId, true);
		erc165.setSupportedInterface(type(IERC721Enumerable).interfaceId, true);
		erc165.setSupportedInterface(type(IERC721).interfaceId, true);

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

	/// @notice Re-initialize the contract
	/// @param params The initialization parameters
	function reinitialize(InitParams memory params) public {
		requireAdmin();

		ERC165Storage.Layout storage erc165 = ERC165Storage.layout();
		erc165.setSupportedInterface(type(IERC721Metadata).interfaceId, true);
		erc165.setSupportedInterface(type(IERC721Enumerable).interfaceId, true);
		erc165.setSupportedInterface(type(IERC721).interfaceId, true);

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

	/// @notice Convenience function to require the caller to be an admin
	function requireAdmin() internal view {
		AccessControlFacet ac = AccessControlFacet(address(this));
		if (!ac.hasRole(ac.ADMIN_ROLE(), msg.sender)) {
			revert(AccessControlError.MissingRequiredRole);
		}
	}
}
