// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {LibAccessControl} from './LibAccessControl.sol';
import {Error} from './Errors.sol';
import {LibAppStorage} from '../storage/LibAppStorage.sol';
import {BasePropertiesInit, PropertyType, MeemProperties} from '../interfaces/MeemStandard.sol';

library LibContract {
	function setBaseProperties(BasePropertiesInit memory props) internal {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl.requireRole(s.ADMIN_ROLE);

		if (s.baseProperties.totalSupplyLockedBy == address(0)) {
			s.baseProperties.totalSupply = props.totalSupply;
			if (props.isTotalSupplyLocked) {
				s.baseProperties.totalSupplyLockedBy = msg.sender;
			}
		}

		if (s.baseProperties.mintPermissionsLockedBy == address(0)) {
			for (uint256 i = 0; i < props.mintPermissions.length; i++) {
				s.baseProperties.mintPermissions.push(props.mintPermissions[i]);
			}
			if (props.isMintPermissionsLocked) {
				s.baseProperties.mintPermissionsLockedBy = msg.sender;
			}
		}

		if (s.baseProperties.splitsLockedBy == address(0)) {
			for (uint256 i = 0; i < props.splits.length; i++) {
				s.baseProperties.splits.push(props.splits[i]);
			}
			if (props.isSplitsLocked) {
				s.baseProperties.splitsLockedBy = msg.sender;
			}
		}

		if (s.baseProperties.tokensPerWalletLockedBy == address(0)) {
			s.baseProperties.tokensPerWallet = props.tokensPerWallet;
			if (props.isTokensPerWalletLocked) {
				s.baseProperties.tokensPerWalletLockedBy = msg.sender;
			}
		}

		if (s.baseProperties.isTransferrableLockedBy == address(0)) {
			s.baseProperties.isTransferrable = props.isTransferrable;
			if (props.isIsTransferrableLocked) {
				s.baseProperties.isTransferrableLockedBy = msg.sender;
			}
		}

		if (s.baseProperties.mintDatesLockedBy == address(0)) {
			s.baseProperties.mintStartTimestamp = props.mintStartTimestamp;
			s.baseProperties.mintEndTimestamp = props.mintEndTimestamp;
			if (props.isMintDatesLocked) {
				s.baseProperties.mintDatesLockedBy = msg.sender;
			}
		}
	}
}
