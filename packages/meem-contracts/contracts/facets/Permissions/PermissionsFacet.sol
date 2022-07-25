// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Array} from '../utils/Array.sol';
import {MeemPermission, Permission} from '../interfaces/MeemStandard.sol';
import {PermissionsStorage} from './PermissionsStorage.sol';
import {AccessControlFacet} from '../AccessControl/AccessControlFacet.sol';
import {AccessControlError} from '../AccessControl/LibAccessControl.sol';
import {MeemBaseERC721Facet} from '../MeemERC721/MeemBaseERC721Facet.sol';
import {IERC721} from '@solidstate/contracts/token/ERC721/IERC721.sol';

library PermissionsError {
	string public constant MaxSupplyExceeded = 'MAX_SUPPLY_EXCEEDED';
	string public constant NoPermission = 'NO_PERMISSION';
	string public constant IncorrectMsgValue = 'INCORRECT_MSG_VALUE';
	string public constant PropertyLocked = 'PROPERTY_LOCKED';
	string public constant TransfersLocked = 'TRANSFERS_LOCKED';
}

contract PermissionsFacet {
	event MeemMintPermissionsSet(MeemPermission[] mintPermissions);
	event MeemMaxSupplySet(uint256 maxSupply);
	event MeemMaxSupplyLocked();

	function MINTER_ROLE() public pure returns (bytes32) {
		return keccak256('MINTER_ROLE');
	}

	function requireCanMint(address minter) public payable {
		MeemBaseERC721Facet baseContract = MeemBaseERC721Facet(address(this));
		PermissionsStorage.DataStore storage s = PermissionsStorage.dataStore();
		AccessControlFacet ac = AccessControlFacet(address(this));

		// Check if the max supply will be exceeded
		if (s.maxSupply > 0 && baseContract.totalSupply() + 1 > s.maxSupply) {
			revert(PermissionsError.MaxSupplyExceeded);
		}

		// Bypass checks if user has the MINTER_ROLE
		if (ac.hasRole(MINTER_ROLE(), minter)) {
			return;
		}

		bool hasPermission = false;
		bool hasCostBeenSet = false;
		uint256 costWei = 0;

		for (uint256 i = 0; i < s.mintPermissions.length; i++) {
			MeemPermission storage perm = s.mintPermissions[i];
			if (
				isBetweenTimestamps(
					perm.mintStartTimestamp,
					perm.mintEndTimestamp
				)
			) {
				if (
					// Allowed if permission is anyone
					perm.permission == Permission.Anyone
				) {
					hasPermission = true;
				}

				if (perm.permission == Permission.Addresses) {
					// Allowed if to is in the list of approved addresses
					for (uint256 j = 0; j < perm.addresses.length; j++) {
						if (
							perm.addresses[j] == msg.sender &&
							isBetweenTimestamps(
								perm.mintStartTimestamp,
								perm.mintEndTimestamp
							)
						) {
							hasPermission = true;
							break;
						}
					}
				}

				if (perm.permission == Permission.Holders) {
					// Check each address
					for (uint256 j = 0; j < perm.addresses.length; j++) {
						uint256 balance = IERC721(perm.addresses[j]).balanceOf(
							msg.sender
						);

						if (balance >= perm.numTokens) {
							hasPermission = true;
							break;
						}
					}
				}

				if (
					hasPermission &&
					(!hasCostBeenSet ||
						(hasCostBeenSet && costWei > perm.costWei))
				) {
					costWei = perm.costWei;
					hasCostBeenSet = true;
				}
			}
		}

		if (!hasPermission) {
			revert(PermissionsError.NoPermission);
		}

		if (costWei != msg.value) {
			revert(PermissionsError.IncorrectMsgValue);
		}
	}

	function setMaxSupply(uint256 newMaxSupply) public {
		requireAdmin();
		PermissionsStorage.DataStore storage s = PermissionsStorage.dataStore();
		if (s.isMaxSupplyLocked) {
			revert(PermissionsError.PropertyLocked);
		}

		s.maxSupply = newMaxSupply;

		emit MeemMaxSupplySet(newMaxSupply);
	}

	function maxSupply() public view returns (uint256) {
		PermissionsStorage.DataStore storage s = PermissionsStorage.dataStore();
		return s.maxSupply;
	}

	function lockMaxSupply() public {
		requireAdmin();
		PermissionsStorage.DataStore storage s = PermissionsStorage.dataStore();
		if (s.isMaxSupplyLocked) {
			revert(PermissionsError.PropertyLocked);
		}
		s.isMaxSupplyLocked = true;

		emit MeemMaxSupplyLocked();
	}

	function setMintingPermissions(MeemPermission[] memory newPermissions)
		public
	{
		requireAdmin();
		PermissionsStorage.DataStore storage s = PermissionsStorage.dataStore();
		if (s.isMaxSupplyLocked) {
			revert(PermissionsError.PropertyLocked);
		}

		PermissionsFacet(address(this)).validatePermissions(
			s.mintPermissions,
			newPermissions
		);

		delete s.mintPermissions;

		for (uint256 i = 0; i < newPermissions.length; i++) {
			s.mintPermissions.push(newPermissions[i]);
		}

		emit MeemMintPermissionsSet(s.mintPermissions);
	}

	function validatePermissions(
		MeemPermission[] memory basePermissions,
		MeemPermission[] memory overridePermissions
	) public pure {}

	function setIsTransferrable(bool isTransferLocked) public {
		requireAdmin();
		PermissionsStorage.dataStore().isTransferLocked = isTransferLocked;
	}

	function requireCanTransfer(
		address from,
		address to,
		uint256 tokenId
	) public {
		if (PermissionsStorage.dataStore().isTransferLocked) {
			revert(PermissionsError.TransfersLocked);
		}
	}

	function isBetweenTimestamps(uint256 start, uint256 end)
		internal
		view
		returns (bool)
	{
		return
			(start == 0 || block.timestamp >= start) &&
			(end == 0 || block.timestamp <= end);
	}

	function requireAdmin() internal view {
		AccessControlFacet ac = AccessControlFacet(address(this));
		if (!ac.hasRole(ac.ADMIN_ROLE(), msg.sender)) {
			revert(AccessControlError.MissingRequiredRole);
		}
	}
}
