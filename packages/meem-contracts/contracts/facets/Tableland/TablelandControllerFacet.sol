// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC721} from '@solidstate/contracts/token/ERC721/IERC721.sol';
import {TablelandStorage} from './TablelandStorage.sol';

interface ITablelandController {
	/**
	 * @dev Object defining how a table can be accessed.
	 */
	struct Policy {
		bool allowInsert;
		bool allowUpdate;
		bool allowDelete;
		string whereClause;
		string withCheck;
		string[] updatableColumns;
	}

	/**
	 * @dev Returns a {Policy} struct defining how a table can be accessed by `caller`.
	 */
	function getPolicy(address caller) external payable returns (Policy memory);
}

struct InitParams {
	address adminRoleContract;
	bool canInsert;
	address insertRoleContract;
	bool canUpdate;
	address updateRoleContract;
	bool canDelete;
	address deleteRoleContract;
	string[] updateableColumns;
}

/// @title Controls access to a tableland table
contract MeemTablelandController is ITablelandController {
	/// @notice Initialize the tableland controller. Can only be called once without holding an admin token.
	/// @param params The init params
	function initialize(InitParams memory params) external {
		TablelandStorage.DataStore storage s = TablelandStorage.dataStore();

		if (s.hasInitialized) {
			// Only allow the holder of an admin token to change params
			if (
				s.adminRoleContract == address(0) ||
				IERC721(s.deleteRoleContract).balanceOf(msg.sender) <= 0
			) {
				revert('ADMIN_TOKEN_NOT_HELD');
			}
		} else {
			s.hasInitialized = true;
		}

		s.canInsert = params.canInsert;
		s.canUpdate = params.canUpdate;
		s.canDelete = params.canDelete;

		s.adminRoleContract = params.adminRoleContract;
		s.insertRoleContract = params.insertRoleContract;
		s.updateRoleContract = params.updateRoleContract;
		s.deleteRoleContract = params.deleteRoleContract;
		s.updateableColumns = params.updateableColumns;
	}

	/// @notice Overrides the MeemBaseERC721Facet function to distrubute royalties
	/// @param caller The address of the caller for whom the policy is requestd
	function getPolicy(address caller)
		external
		payable
		returns (ITablelandController.Policy memory)
	{
		TablelandStorage.DataStore storage s = TablelandStorage.dataStore();

		bool allowInsert = s.canInsert &&
			(s.insertRoleContract == address(0) ||
				IERC721(s.insertRoleContract).balanceOf(caller) > 0);
		bool allowUpdate = s.canUpdate &&
			(s.updateRoleContract == address(0) ||
				IERC721(s.updateRoleContract).balanceOf(caller) > 0);
		bool allowDelete = s.canDelete &&
			(s.deleteRoleContract == address(0) ||
				IERC721(s.deleteRoleContract).balanceOf(caller) > 0);

		return
			ITablelandController.Policy({
				allowInsert: allowInsert,
				allowUpdate: allowUpdate,
				allowDelete: allowDelete,
				whereClause: '',
				withCheck: '',
				updatableColumns: s.updateableColumns
			});
	}
}
