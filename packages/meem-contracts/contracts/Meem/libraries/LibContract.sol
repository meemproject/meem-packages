// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {LibAccessControl} from './LibAccessControl.sol';
import {Error} from './Errors.sol';
import {LibAppStorage} from '../storage/LibAppStorage.sol';
import {BaseProperties, PropertyType, MeemProperties} from '../interfaces/MeemStandard.sol';

library LibContract {
	function setBaseProperties(BaseProperties memory props) internal {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl.requireRole(s.ADMIN_ROLE);

		if (s.baseProperties.totalOriginalsSupplyLockedBy == address(0)) {
			s.baseProperties.totalOriginalsSupply = props.totalOriginalsSupply;
			if (props.totalOriginalsSupplyLockedBy != address(0)) {
				s.baseProperties.totalOriginalsSupplyLockedBy = props
					.totalOriginalsSupplyLockedBy;
			}
		}

		if (s.baseProperties.mintPermissionsLockedBy == address(0)) {
			for (uint256 i = 0; i < props.mintPermissions.length; i++) {
				s.baseProperties.mintPermissions.push(props.mintPermissions[i]);
			}
			if (props.mintPermissionsLockedBy != address(0)) {
				s.baseProperties.mintPermissionsLockedBy = props
					.mintPermissionsLockedBy;
			}
		}

		if (s.baseProperties.splitsLockedBy == address(0)) {
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
	}
}
