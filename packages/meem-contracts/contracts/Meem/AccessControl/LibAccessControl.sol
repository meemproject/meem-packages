// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Array} from '../utils/Array.sol';
import {Error} from '../libraries/Errors.sol';
import {AccessControlEvents} from '../libraries/Events.sol';
import {AccessControlStorage} from './AccessControlStorage.sol';

library LibAccessControl {
	/**
	 * @dev See {IERC165-supportsInterface}.
	 */
	// function supportsInterface(bytes4 interfaceId)
	// 	internal
	// 	view
	// 	virtual
	// 	returns (bool)
	// {
	// 	return
	// 		interfaceId == type(IAccessControlUpgradeable).interfaceId ||
	// 		super.supportsInterface(interfaceId);
	// }

	function requireRole(bytes32 role) internal view {
		if (!hasRole(role, msg.sender)) {
			revert(Error.MissingRequiredRole);
		}
	}

	/**
	 * @dev Returns `true` if `account` has been granted `role`.
	 */
	function hasRole(bytes32 role, address account)
		internal
		view
		returns (bool)
	{
		return AccessControlStorage.dataStore().roles[role].members[account];
	}

	/**
	 * @dev Grants `role` to `account`.
	 *
	 * If `account` had not been already granted `role`, emits a {RoleGranted}
	 * event.
	 *
	 * Requirements:
	 *
	 * - the caller must have ``role``'s admin role.
	 */
	function grantRole(bytes32 role, address account) internal {
		requireRole(AccessControlStorage.ADMIN_ROLE);
		_grantRole(role, account);
	}

	/**
	 * @dev Revokes `role` from `account`.
	 *
	 * If `account` had been granted `role`, emits a {RoleRevoked} event.
	 *
	 * Requirements:
	 *
	 * - the caller must have ``role``'s admin role.
	 */
	function revokeRole(bytes32 role, address account) internal {
		requireRole(AccessControlStorage.ADMIN_ROLE);
		_revokeRole(role, account);
	}

	/**
	 * @dev Revokes `role` from the calling account.
	 *
	 * Roles are often managed via {grantRole} and {revokeRole}: this function's
	 * purpose is to provide a mechanism for accounts to lose their privileges
	 * if they are compromised (such as when a trusted device is misplaced).
	 *
	 * If the calling account had been granted `role`, emits a {RoleRevoked}
	 * event.
	 *
	 * Requirements:
	 *
	 * - the caller must be `account`.
	 */
	function renounceRole(bytes32 role, address account) internal {
		if (account != msg.sender) {
			revert(Error.NoRenounceOthers);
		}

		_revokeRole(role, account);
	}

	/**
	 * @dev Grants `role` to `account`.
	 *
	 * If `account` had not been already granted `role`, emits a {RoleGranted}
	 * event. Note that unlike {grantRole}, this function doesn't perform any
	 * checks on the calling account.
	 *
	 * [WARNING]
	 * ====
	 * This function should only be called from the constructor when setting
	 * up the initial roles for the system.
	 *
	 * Using this function in any other way is effectively circumventing the admin
	 * system imposed by {AccessControl}.
	 * ====
	 */
	function _setupRole(bytes32 role, address account) internal {
		_grantRole(role, account);
	}

	/**
	 * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation.
	 */
	function toHexString(uint256 value) internal pure returns (string memory) {
		if (value == 0) {
			return '0x00';
		}
		uint256 temp = value;
		uint256 length = 0;
		while (temp != 0) {
			length++;
			temp >>= 8;
		}
		return toHexString(value, length);
	}

	/**
	 * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length.
	 */
	function toHexString(uint256 value, uint256 length)
		internal
		pure
		returns (string memory)
	{
		bytes16 _HEX_SYMBOLS = '0123456789abcdef';
		bytes memory buffer = new bytes(2 * length + 2);
		buffer[0] = '0';
		buffer[1] = 'x';
		for (uint256 i = 2 * length + 1; i > 1; --i) {
			buffer[i] = _HEX_SYMBOLS[value & 0xf];
			value >>= 4;
		}
		require(value == 0, 'Strings: hex length insufficient');
		return string(buffer);
	}

	function _grantRole(bytes32 role, address account) internal {
		AccessControlStorage.DataStore storage s = AccessControlStorage
			.dataStore();
		if (!hasRole(role, account)) {
			s.roles[role].members[account] = true;
			s.rolesList[role].push(account);
			s.rolesListIndex[role][account] = s.rolesList[role].length - 1;
			emit AccessControlEvents.MeemRoleGranted(role, account, msg.sender);
		}
	}

	function _revokeRole(bytes32 role, address account) internal {
		AccessControlStorage.DataStore storage s = AccessControlStorage
			.dataStore();
		if (hasRole(role, account)) {
			s.roles[role].members[account] = false;
			uint256 idx = s.rolesListIndex[role][account];
			Array.removeAt(s.rolesList[role], idx);

			emit AccessControlEvents.MeemRoleRevoked(role, account, msg.sender);
		}
	}

	function _setRole(bytes32 role, address[] memory accounts) internal {
		AccessControlStorage.DataStore storage s = AccessControlStorage
			.dataStore();
		requireRole(AccessControlStorage.ADMIN_ROLE);
		for (uint256 i = 0; i < s.rolesList[role].length; i++) {
			address addy = s.rolesList[role][i];
			delete s.rolesListIndex[role][addy];
			s.roles[role].members[addy] = false;
		}
		delete s.rolesList[role];

		for (uint256 i = 0; i < accounts.length; i++) {
			address addy = accounts[i];
			if (!hasRole(role, addy)) {
				s.rolesList[role].push(addy);
				s.rolesListIndex[role][addy] = i;
				s.roles[role].members[addy] = true;
			}
		}

		emit AccessControlEvents.MeemRoleSet(role, accounts, msg.sender);
	}
}
