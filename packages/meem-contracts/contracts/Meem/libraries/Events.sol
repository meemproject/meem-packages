// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {PropertyType, MeemProperties, URISource, MeemPermission, Split, PermissionType} from '../interfaces/MeemStandard.sol';
import {LibPart} from '../../royalties/LibPart.sol';

library InitEvents {
	event MeemContractInitialized(address contractAddress);
}

library AccessControlEvents {
	/**
	 * @dev Emitted when `newAdminRole` is set as ``role``'s admin role, replacing `previousAdminRole`
	 *
	 * `ADMIN_ROLE` is the starting admin for all roles, despite
	 * {RoleAdminChanged} not being emitted signaling this.
	 *
	 * _Available since v3.1._
	 */
	event MeemRoleAdminChanged(
		bytes32 indexed role,
		bytes32 indexed previousAdminRole,
		bytes32 indexed newAdminRole
	);

	/**
	 * @dev Emitted when `account` is granted `role`.
	 *
	 * `sender` is the account that originated the contract call, an admin role
	 * bearer except when using {AccessControl-_setupRole}.
	 */
	event MeemRoleGranted(
		bytes32 indexed role,
		address indexed account,
		address indexed sender
	);

	/**
	 * @dev Emitted when `account` is revoked `role`.
	 *
	 * `sender` is the account that originated the contract call:
	 *   - if using `revokeRole`, it is the admin role bearer
	 *   - if using `renounceRole`, it is the role bearer (i.e. `account`)
	 */
	event MeemRoleRevoked(
		bytes32 indexed role,
		address indexed account,
		address indexed sender
	);
}

library MeemERC721Events {
	/**
	 * @dev Emitted when `tokenId` token is transferred from `from` to `to`.
	 */
	event MeemTransfer(
		address indexed from,
		address indexed to,
		uint256 indexed tokenId
	);

	/**
	 * @dev Emitted when `owner` enables `approved` to manage the `tokenId` token.
	 */
	event MeemApproval(
		address indexed owner,
		address indexed approved,
		uint256 indexed tokenId
	);

	/**
	 * @dev Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.
	 */
	event MeemApprovalForAll(
		address indexed owner,
		address indexed operator,
		bool approved
	);
}

library MeemBaseEvents {
	event MeemTotalOriginalsSupplySet(int256 totalOriginalsSupply);
	event MeemTotalOriginalsSupplyLocked(address lockedBy);

	event MeemMintPermissionsSet(MeemPermission[] mintPermissions);
	event MeemMintPermissionsLocked(address lockedBy);

	event MeemSplitsSet(Split[] splits);
	event MeemSplitsLocked(address lockedBy);

	event MeemOriginalsPerWalletSet(int256 originalsPerWallet);
	event MeemOriginalsPerWalletLocked(address lockedBy);

	event MeemIsTransferrableSet(bool isTransferrable);
	event MeemIsTransferrableLocked(address lockedBy);

	event MeemBaseMintDatesSet(
		int256 mintStartTimestamp,
		int256 mintEndTimestamp
	);
	event MeemBaseMintDatesLocked(address lockedBy);
}

library MeemEvents {
	event MeemPropertiesSet(
		uint256 tokenId,
		PropertyType propertyType,
		MeemProperties props
	);
	event MeemTotalCopiesSet(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalCopies
	);
	event MeemTotalCopiesLocked(
		uint256 tokenId,
		PropertyType propertyType,
		address lockedBy
	);
	event MeemCopiesPerWalletSet(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalRemixes
	);
	event MeemTotalRemixesSet(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalRemixes
	);
	event MeemTotalRemixesLocked(
		uint256 tokenId,
		PropertyType propertyType,
		address lockedBy
	);
	event MeemRemixesPerWalletSet(
		uint256 tokenId,
		PropertyType propertyType,
		int256 newTotalRemixes
	);
	event MeemCopiesPerWalletLocked(
		uint256 tokenId,
		PropertyType propertyType,
		address lockedBy
	);
	event MeemRemixesPerWalletLocked(
		uint256 tokenId,
		PropertyType propertyType,
		address lockedBy
	);

	event MeemURISourceSet(uint256 tokenId, URISource uriSource);

	event MeemURISet(uint256 tokenId, string uri);

	event MeemURILockedBySet(uint256 tokenId, address lockedBy);

	event MeemDataSet(uint256 tokenId, string data);

	event MeemMintDatesSet(
		uint256 tokenId,
		int256 mintStartTimestamp,
		int256 mintEndTimestamp
	);

	event MeemMintDatesLocked(uint256 tokenId, address lockedBy);

	event MeemClipped(uint256 tokenId, address addy);

	event MeemUnClipped(uint256 tokenId, address addy);

	event MeemPermissionsSet(
		uint256 tokenId,
		PropertyType propertyType,
		PermissionType permissionType,
		MeemPermission[] permission
	);

	event MeemTokenReactionAdded(
		uint256 tokenId,
		address addy,
		string reaction,
		uint256 newTotalReactions
	);

	event MeemTokenReactionRemoved(
		uint256 tokenId,
		address addy,
		string reaction,
		uint256 newTotalReactions
	);

	event MeemTokenReactionTypesSet(uint256 tokenId, string[] reactionTypes);

	event MeemSplitsSet(
		uint256 tokenId,
		PropertyType propertyType,
		Split[] splits
	);
	// Rarible royalties event
	event RoyaltiesSet(uint256 tokenId, LibPart.Part[] royalties);
}
