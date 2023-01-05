// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {MeemDiamond} from '../../proxies/MeemDiamond.sol';
import {IERC721} from '@solidstate/contracts/token/ERC721/IERC721.sol';
import {AccessControlStorage} from './AccessControlStorage.sol';
import {LibAccessControl} from './LibAccessControl.sol';
import {Array} from '../utils/Array.sol';

struct SetRoleItem {
	address user;
	bytes32 role;
	bool hasRole;
}

/// @title Errors that can be emitted by AccessControlFacet functions
library AccessControlError {
	/// @notice If the user is missing the role required to perform the action
	string public constant MissingRequiredRole = 'MISSING_REQUIRED_ROLE';
}

/// @title Role-based access control for limiting access to some functions of the contract
/// @notice Assign roles to grant access to otherwise limited functions of the contract
contract AccessControlFacet {
	/// @notice Emitted when a role is granted to a user
	/// @param role The role that was granted
	/// @param user The user that was granted a role
	event MeemRoleGranted(bytes32 indexed role, address indexed user);

	/// @notice Emitted when a role is revoked from a user
	/// @param role The role that was revoked
	/// @param user The user that was revoked
	event MeemRoleRevoked(bytes32 indexed role, address indexed user);

	/// @notice Emitted when the admin contract address is set
	/// @param adminContract The address of the new admin contract
	event MeemAdminContractSet(address indexed adminContract);

	/// @notice An admin of the contract.
	/// @return Hashed value that represents this role.
	function ADMIN_ROLE() public pure returns (bytes32) {
		return AccessControlStorage.ADMIN_ROLE;
	}

	/// @notice A contract upgrader
	/// @return Hashed value that represents this role.
	function UPGRADER_ROLE() public pure returns (bytes32) {
		return AccessControlStorage.UPGRADER_ROLE;
	}

	/// @notice Check if a user has access to upgrade the contract
	/// @param upgrader The wallet address of the upgrader
	/// @return bool of whether the user can upgrade the contract
	function canUpgradeContract(address upgrader) public view returns (bool) {
		AccessControlFacet ac = AccessControlFacet(address(this));
		if (ac.hasRole(ac.UPGRADER_ROLE(), upgrader)) {
			return true;
		}

		return false;
	}

	/// @notice Bulk assign roles
	/// @param items The roles to assign / remove
	function bulkSetRoles(SetRoleItem[] memory items) public {
		AccessControlFacet ac = AccessControlFacet(address(this));
		ac.requireRole(AccessControlStorage.ADMIN_ROLE, msg.sender);

		for (uint256 i = 0; i < items.length; i++) {
			SetRoleItem memory item = items[i];
			if (item.hasRole) {
				LibAccessControl._grantRole(item.role, item.user);
			} else {
				LibAccessControl._revokeRole(item.role, item.user);
			}
		}
	}

	/// @notice Grant a role to a user. The granting user must have the ADMIN_ROLE
	/// @param user The wallet address of the user to grant the role to
	/// @param role The role to grant
	function grantRole(bytes32 role, address user) public {
		AccessControlFacet ac = AccessControlFacet(address(this));
		ac.requireRole(AccessControlStorage.ADMIN_ROLE, msg.sender);
		LibAccessControl._grantRole(role, user);
		emit MeemRoleGranted(role, user);
	}

	/// @notice Grant a role to a user. The granting user must have the ADMIN_ROLE
	/// @param user The wallet address of the user to revoke the role from
	/// @param role The role to revoke
	function revokeRole(bytes32 role, address user) public {
		AccessControlFacet ac = AccessControlFacet(address(this));
		ac.requireRole(AccessControlStorage.ADMIN_ROLE, msg.sender);
		LibAccessControl._revokeRole(role, user);
		emit MeemRoleRevoked(role, user);
	}

	/// @notice Check if a user has a role
	/// @param user The wallet address of the user
	/// @param role The role
	function hasAssignedRole(bytes32 role, address user)
		public
		view
		returns (bool)
	{
		return AccessControlStorage.dataStore().roles[role].members[user];
	}

	/// @notice Check if a user has a role
	/// @param user The wallet address of the user
	/// @param role The role
	function hasRole(bytes32 role, address user) public view returns (bool) {
		MeemDiamond diamond = MeemDiamond(payable(address(this)));

		AccessControlStorage.DataStore storage s = AccessControlStorage
			.dataStore();

		// Check explicitly assigned roles
		if (s.roles[role].members[user]) {
			return true;
		}

		// Owner always has permission / all roles
		if (diamond.owner() == user) {
			return true;
		}

		// Check if the user has the role via a token
		if (
			s.adminContract != address(0) &&
			role == AccessControlStorage.ADMIN_ROLE
		) {
			uint256 balance = IERC721(s.adminContract).balanceOf(user);

			if (balance > 0) {
				return true;
			}
		}

		return false;
	}

	/// @notice Get the list of users with a role
	/// @param role The role to fetch
	/// @return address[] of the users with the role
	function getRoles(bytes32 role) public view returns (address[] memory) {
		return AccessControlStorage.dataStore().rolesList[role];
	}

	/// @notice Requires that a user has a role
	/// @param role The role to check
	/// @param user The user to check
	function requireRole(bytes32 role, address user) public view {
		AccessControlFacet ac = AccessControlFacet(address(this));
		if (!ac.hasRole(role, user)) {
			revert(AccessControlError.MissingRequiredRole);
		}
	}

	/// @notice Gets the admin contract address
	/// @return The admin contract address (or address(0) if not set)
	function adminContract() public view returns (address) {
		return AccessControlStorage.dataStore().adminContract;
	}

	/// @notice Set the admin contract address
	function setAdminContract(address newAdminContract) public {
		AccessControlFacet ac = AccessControlFacet(address(this));
		ac.requireRole(AccessControlStorage.ADMIN_ROLE, msg.sender);

		AccessControlStorage.dataStore().adminContract = newAdminContract;

		emit MeemAdminContractSet(newAdminContract);
	}
}
