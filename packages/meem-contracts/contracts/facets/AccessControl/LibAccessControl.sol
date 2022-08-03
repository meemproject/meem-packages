// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Array} from '../utils/Array.sol';
import {AccessControlStorage} from './AccessControlStorage.sol';
import {AccessControlFacet} from './AccessControlFacet.sol';

library LibAccessControl {
	function _grantRole(bytes32 role, address account) internal {
		AccessControlFacet ac = AccessControlFacet(address(this));
		AccessControlStorage.DataStore storage s = AccessControlStorage
			.dataStore();
		if (!ac.hasRole(role, account)) {
			s.roles[role].members[account] = true;
			s.rolesList[role].push(account);
			s.rolesListIndex[role][account] = s.rolesList[role].length - 1;
		}
	}

	function _revokeRole(bytes32 role, address account) internal {
		AccessControlFacet ac = AccessControlFacet(address(this));
		AccessControlStorage.DataStore storage s = AccessControlStorage
			.dataStore();
		if (ac.hasRole(role, account)) {
			s.roles[role].members[account] = false;
			uint256 idx = s.rolesListIndex[role][account];
			Array.removeAt(s.rolesList[role], idx);
		}
	}
}
