// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {AccessControlStorage} from '../AccessControl/AccessControlStorage.sol';
import {LibAccessControl} from '../AccessControl/LibAccessControl.sol';
import {MeemBaseEvents, InitEvents} from './Events.sol';
import {Error} from './Errors.sol';
import {LibAppStorage} from '../storage/LibAppStorage.sol';
import {LibContract} from './LibContract.sol';
import {LibProperties} from './LibProperties.sol';
import {BaseProperties, PropertyType, MeemProperties, InitParams} from '../interfaces/MeemStandard.sol';
import '@solidstate/contracts/token/ERC721/metadata/ERC721MetadataStorage.sol';

library LibContract {
	function initialize(InitParams memory params, bool isReinitialize)
		internal
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		ERC721MetadataStorage.Layout storage erc721 = ERC721MetadataStorage
			.layout();
		erc721.name = params.name;
		erc721.symbol = params.symbol;

		s.name = params.name;
		s.symbol = params.symbol;
		s.childDepth = params.childDepth;
		s.nonOwnerSplitAllocationAmount = params.nonOwnerSplitAllocationAmount;
		if (!isReinitialize) {
			s.tokenCounter = params.tokenCounterStart;
			if (params.tokenCounterStart < 1) {
				revert(Error.InvalidTokenCounter);
			}
			// LibAccessControl._setRole(s.ADMIN_ROLE, params.admins);
		}
		// else {
		// 	LibAccessControl._deleteAllWithRole(s.ADMIN_ROLE);
		// 	LibAccessControl._grantRole(s.ADMIN_ROLE, msg.sender);
		// 	for (uint256 i = 0; i < params.admins.length; i++) {
		// 		LibAccessControl._grantRole(s.ADMIN_ROLE, params.admins[i]);
		// 	}
		// }
		LibAccessControl._setRole(
			AccessControlStorage.ADMIN_ROLE,
			params.admins
		);
		s.contractURI = params.contractURI;

		LibContract.setBaseProperties(params.baseProperties);
		LibProperties.setProperties(
			0,
			PropertyType.DefaultMeem,
			params.defaultProperties
		);
		LibProperties.setProperties(
			0,
			PropertyType.DefaultChild,
			params.defaultChildProperties
		);

		emit InitEvents.MeemContractInitialized(address(this));
	}

	function setBaseProperties(BaseProperties memory props) internal {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl.requireRole(AccessControlStorage.ADMIN_ROLE);

		if (s.baseProperties.totalOriginalsSupplyLockedBy == address(0)) {
			s.baseProperties.totalOriginalsSupply = props.totalOriginalsSupply;
			if (props.totalOriginalsSupplyLockedBy != address(0)) {
				s.baseProperties.totalOriginalsSupplyLockedBy = props
					.totalOriginalsSupplyLockedBy;
			}
		}

		if (s.baseProperties.mintPermissionsLockedBy == address(0)) {
			delete s.baseProperties.mintPermissions;
			for (uint256 i = 0; i < props.mintPermissions.length; i++) {
				s.baseProperties.mintPermissions.push(props.mintPermissions[i]);
			}
			if (props.mintPermissionsLockedBy != address(0)) {
				s.baseProperties.mintPermissionsLockedBy = props
					.mintPermissionsLockedBy;
			}
		}

		if (s.baseProperties.splitsLockedBy == address(0)) {
			delete s.baseProperties.splits;
			for (uint256 i = 0; i < props.splits.length; i++) {
				s.baseProperties.splits.push(props.splits[i]);
			}
			if (props.splitsLockedBy != address(0)) {
				s.baseProperties.splitsLockedBy = props.splitsLockedBy;
			}
		}

		if (s.baseProperties.originalsPerWalletLockedBy == address(0)) {
			s.baseProperties.originalsPerWallet = props.originalsPerWallet;
			if (props.originalsPerWalletLockedBy != address(0)) {
				s.baseProperties.originalsPerWalletLockedBy = props
					.originalsPerWalletLockedBy;
			}
		}

		if (s.baseProperties.isTransferrableLockedBy == address(0)) {
			s.baseProperties.isTransferrable = props.isTransferrable;
			if (props.isTransferrableLockedBy != address(0)) {
				s.baseProperties.isTransferrableLockedBy = props
					.isTransferrableLockedBy;
			}
		}

		if (s.baseProperties.mintDatesLockedBy == address(0)) {
			s.baseProperties.mintStartTimestamp = props.mintStartTimestamp;
			s.baseProperties.mintEndTimestamp = props.mintEndTimestamp;
			if (props.mintDatesLockedBy != address(0)) {
				s.baseProperties.mintDatesLockedBy = props.mintDatesLockedBy;
			}
		}

		if (s.baseProperties.transferLockupUntilLockedBy == address(0)) {
			s.baseProperties.transferLockupUntil = props.transferLockupUntil;
			if (props.transferLockupUntilLockedBy != address(0)) {
				s.baseProperties.transferLockupUntilLockedBy = props
					.transferLockupUntilLockedBy;
			}
		}
	}
}
