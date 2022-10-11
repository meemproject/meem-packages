// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Array} from '../utils/Array.sol';
import {MeemPermission, Permission} from '../interfaces/MeemStandard.sol';
import {PermissionsStorage} from './PermissionsStorage.sol';
import {AccessControlFacet, AccessControlError} from '../AccessControl/AccessControlFacet.sol';
import {AccessControlStorage} from '../AccessControl/AccessControlStorage.sol';
import {MeemBaseERC721Facet, RequireCanMintParams} from '../MeemERC721/MeemBaseERC721Facet.sol';
import {IERC721} from '@solidstate/contracts/token/ERC721/IERC721.sol';
import {MerkleProof} from '@openzeppelin/contracts/utils/cryptography/MerkleProof.sol';

library PermissionsError {
	string public constant MaxSupplyExceeded = 'MAX_SUPPLY_EXCEEDED';
	string public constant NoPermission = 'NO_PERMISSION';
	string public constant IncorrectMsgValue = 'INCORRECT_MSG_VALUE';
	string public constant PropertyLocked = 'PROPERTY_LOCKED';
	string public constant TransfersLocked = 'TRANSFERS_LOCKED';
}

contract PermissionsFacet {
	/// @notice Emitted when mint permissions are set
	/// @param mintPermissions The new permissions
	event MeemMintPermissionsSet(MeemPermission[] mintPermissions);

	/// @notice Emitted when max supply is set
	/// @param maxSupply The new max supply
	event MeemMaxSupplySet(uint256 maxSupply);

	/// @notice Emitted when max supply is locked
	event MeemMaxSupplyLocked();

	/// @notice The minter role grants permission to mint tokens without mintPermission checks
	/// @return Hashed value that represents this role.
	function MINTER_ROLE() public pure returns (bytes32) {
		return keccak256('MINTER_ROLE');
	}

	/// @notice Overrides the MeemBaseERC721Facet function to check mint permissions
	function requireCanMint(RequireCanMintParams memory params) public payable {
		MeemBaseERC721Facet baseContract = MeemBaseERC721Facet(address(this));
		PermissionsStorage.DataStore storage s = PermissionsStorage.dataStore();
		AccessControlFacet ac = AccessControlFacet(address(this));

		// Check if the max supply will be exceeded
		if (s.maxSupply > 0 && baseContract.totalSupply() + 1 > s.maxSupply) {
			revert(PermissionsError.MaxSupplyExceeded);
		}

		// Bypass checks if user has the MINTER_ROLE or ADMIN_ROLE
		if (
			ac.hasRole(MINTER_ROLE(), params.minter) ||
			ac.hasRole(AccessControlStorage.ADMIN_ROLE, params.minter)
		) {
			return;
		}

		bool hasPermission = false;
		bool hasCostBeenSet = false;
		uint256 costWei = 0;

		for (uint256 i = 0; i < s.mintPermissions.length; i++) {
			MeemPermission storage perm = s.mintPermissions[i];
			bool hasIndividualPermission = false;

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
					hasIndividualPermission = true;
				}

				if (perm.permission == Permission.Addresses) {
					bytes32 leaf = keccak256(abi.encodePacked(params.minter));
					if (
						MerkleProof.verify(params.proof, perm.merkleRoot, leaf)
					) {
						hasPermission = true;
						hasIndividualPermission = true;
					}
				}

				if (perm.permission == Permission.Holders) {
					// Check each address
					for (uint256 j = 0; j < perm.addresses.length; j++) {
						uint256 balance = IERC721(perm.addresses[j]).balanceOf(
							params.minter
						);

						if (balance >= perm.numTokens) {
							hasPermission = true;
							hasIndividualPermission = true;
							break;
						}
					}
				}

				if (
					hasIndividualPermission &&
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

	/// @notice Set the max token supply. Must be less than the current total supply.
	/// @param newMaxSupply The new max supply
	function setMaxSupply(uint256 newMaxSupply) public {
		requireAdmin();

		PermissionsStorage.DataStore storage s = PermissionsStorage.dataStore();

		MeemBaseERC721Facet baseContract = MeemBaseERC721Facet(address(this));

		if (newMaxSupply < baseContract.totalSupply()) {
			revert(PermissionsError.MaxSupplyExceeded);
		}

		s.maxSupply = newMaxSupply;

		emit MeemMaxSupplySet(newMaxSupply);
	}

	/// @notice Get the max token supply
	/// @return The max supply
	function maxSupply() public view returns (uint256) {
		PermissionsStorage.DataStore storage s = PermissionsStorage.dataStore();
		return s.maxSupply;
	}

	/// @notice Set the mint permissions
	/// @param newPermissions The new mint permissions
	function setMintingPermissions(MeemPermission[] memory newPermissions)
		public
	{
		requireAdmin();

		PermissionsStorage.DataStore storage s = PermissionsStorage.dataStore();

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

	/// @notice Function that is called to validate permissions before they are set to ensure compatibility
	/// @dev Override this function to add custom validation
	/// @param basePermissions The current permissions
	/// @param overridePermissions The new permissions
	function validatePermissions(
		MeemPermission[] memory basePermissions,
		MeemPermission[] memory overridePermissions
	) public pure {}

	function setIsTransferrable(bool isTransferrable) public {
		requireAdmin();
		if (PermissionsStorage.dataStore().isTransferLocked) {
			revert(PermissionsError.TransfersLocked);
		}
		PermissionsStorage.dataStore().isTransferLocked = !isTransferrable;
	}

	/// @notice Overrides the MeemBaseERC721Facet function to check transfer permissions
	/// @param from The address the token is being transferred from
	/// @param to The address the token is being transferred to
	/// @param tokenId The token being transferred
	function requireCanTransfer(
		address from,
		address to,
		uint256 tokenId
	) public {
		if (PermissionsStorage.dataStore().isTransferLocked) {
			revert(PermissionsError.TransfersLocked);
		}
	}

	/// @notice Checks if the current block timestamp is between the start and end timestamps
	/// @param start The start timestamp
	/// @param end The end timestamp
	/// @return bool Whether the current block timestamp is between the start and end timestamps
	function isBetweenTimestamps(uint256 start, uint256 end)
		internal
		view
		returns (bool)
	{
		return
			(start == 0 || block.timestamp >= start) &&
			(end == 0 || block.timestamp <= end);
	}

	/// @notice Convenience function to require the caller to be an admin
	function requireAdmin() internal view {
		AccessControlFacet ac = AccessControlFacet(address(this));
		if (!ac.hasRole(ac.ADMIN_ROLE(), msg.sender)) {
			revert(AccessControlError.MissingRequiredRole);
		}
	}
}
