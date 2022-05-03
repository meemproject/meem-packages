// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {LibAppStorage} from '../storage/LibAppStorage.sol';
import {LibAccessControl} from '../libraries/LibAccessControl.sol';
import {LibPermissions} from '../libraries/LibPermissions.sol';
import {LibSplits} from '../libraries/LibSplits.sol';
import {IMeemAdminStandard, Chain, Split, MeemPermission} from '../interfaces/MeemStandard.sol';
import {Error} from '../libraries/Errors.sol';

contract MeemAdminFacet is IMeemAdminStandard {
	function setTokenCounter(uint256 tokenCounter) external override {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl.requireRole(s.ADMIN_ROLE);
		s.tokenCounter = tokenCounter;
	}

	function setContractInfo(string memory name, string memory symbol)
		external
		override
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl.requireRole(s.ADMIN_ROLE);
		s.name = name;
		s.symbol = symbol;
	}

	function setContractURI(string memory newContractURI) external override {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl.requireRole(s.ADMIN_ROLE);
		s.contractURI = newContractURI;
	}

	function setChildDepth(int256 newChildDepth) external override {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl.requireRole(s.ADMIN_ROLE);
		s.childDepth = newChildDepth;
	}

	function setNonOwnerSplitAllocationAmount(uint256 amount)
		external
		override
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl.requireRole(s.ADMIN_ROLE);
		if (amount < 0 || amount > 10000) {
			revert(Error.InvalidNonOwnerSplitAllocationAmount);
		}

		s.nonOwnerSplitAllocationAmount = amount;
	}

	function setMeemIDAddress(address meemID) external override {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl.requireRole(s.ADMIN_ROLE);

		s.meemIDContractAddress = meemID;
	}

	function setTokenRoot(
		uint256 tokenId,
		Chain rootChain,
		address root,
		uint256 rootTokenId
	) external override {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl.requireRole(s.ADMIN_ROLE);

		s.meems[tokenId].rootChain = rootChain;
		s.meems[tokenId].root = root;
		s.meems[tokenId].rootTokenId = rootTokenId;
	}

	function setBaseSplits(Split[] memory splits) external override {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl.requireRole(s.ADMIN_ROLE);
		LibSplits.setBaseSplits(splits);
	}

	function setTotalOriginalsSupply(int256 totalSupply) external override {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl.requireRole(s.ADMIN_ROLE);
		if (s.baseProperties.totalOriginalsSupplyLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}
		s.baseProperties.totalOriginalsSupply = totalSupply;
	}

	function setOriginalsPerWallet(int256 originalsPerWallet)
		external
		override
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl.requireRole(s.ADMIN_ROLE);
		if (s.baseProperties.originalsPerWalletLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}
		s.baseProperties.originalsPerWallet = originalsPerWallet;
	}

	function setIsTransferrable(bool isTransferrable) external override {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl.requireRole(s.ADMIN_ROLE);
		if (s.baseProperties.isTransferrableLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}
		s.baseProperties.isTransferrable = isTransferrable;
	}

	function lockBaseSplits() external override {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl.requireRole(s.ADMIN_ROLE);
		if (s.baseProperties.splitsLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}
		s.baseProperties.splitsLockedBy = msg.sender;
	}

	function lockTotalOriginalsSupply() external override {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl.requireRole(s.ADMIN_ROLE);
		if (s.baseProperties.totalOriginalsSupplyLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}
		s.baseProperties.totalOriginalsSupplyLockedBy = msg.sender;
	}

	function lockOriginalsPerWallet() external override {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl.requireRole(s.ADMIN_ROLE);
		if (s.baseProperties.originalsPerWalletLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}
		s.baseProperties.originalsPerWalletLockedBy = msg.sender;
	}

	function lockIsTransferrable() external override {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl.requireRole(s.ADMIN_ROLE);
		if (s.baseProperties.isTransferrableLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}
		s.baseProperties.isTransferrableLockedBy = msg.sender;
	}

	function lockMintDates() external override {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl.requireRole(s.ADMIN_ROLE);
		if (s.baseProperties.mintDatesLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}
		s.baseProperties.mintDatesLockedBy = msg.sender;
	}

	function setMintDates(int256 startTimestamp, int256 endTimestamp)
		external
		override
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl.requireRole(s.ADMIN_ROLE);
		if (s.baseProperties.mintDatesLockedBy != address(0)) {
			revert(Error.PropertyLocked);
		}

		s.baseProperties.mintStartTimestamp = startTimestamp;
		s.baseProperties.mintEndTimestamp = endTimestamp;
	}

	function setMintPermissions(MeemPermission[] memory permissions)
		external
		override
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl.requireRole(s.ADMIN_ROLE);
		LibPermissions.setMintPermissions(permissions);
	}
}
