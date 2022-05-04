// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {LibAppStorage} from './storage/LibAppStorage.sol';
import {LibAccessControl} from './libraries/LibAccessControl.sol';
import {LibContract} from './libraries/LibContract.sol';
import {LibProperties} from './libraries/LibProperties.sol';
import {IDiamondCut} from './interfaces/IDiamondCut.sol';
import {IDiamondLoupe} from './interfaces/IDiamondLoupe.sol';
import {IRoyaltiesProvider} from '../royalties/IRoyaltiesProvider.sol';
import {IMeemBaseStandard, IMeemSplitsStandard, IMeemPermissionsStandard, IInitDiamondStandard, InitParams, PropertyType} from './interfaces/MeemStandard.sol';
import {Error} from './libraries/Errors.sol';
import {InitEvents} from './libraries/Events.sol';
import '@solidstate/contracts/introspection/ERC165.sol';
import '@solidstate/contracts/token/ERC721/IERC721.sol';
import '@solidstate/contracts/token/ERC721/enumerable/IERC721Enumerable.sol';
import '@solidstate/contracts/token/ERC721/metadata/IERC721Metadata.sol';
import '@solidstate/contracts/token/ERC721/metadata/ERC721MetadataStorage.sol';

// import 'hardhat/console.sol';

contract InitDiamond is IInitDiamondStandard {
	using ERC165Storage for ERC165Storage.Layout;

	function init(InitParams memory params) external override {
		ERC721MetadataStorage.Layout storage erc721 = ERC721MetadataStorage
			.layout();
		erc721.name = params.name;
		erc721.symbol = params.symbol;

		ERC165Storage.Layout storage erc165 = ERC165Storage.layout();
		erc165.setSupportedInterface(type(IERC721).interfaceId, true);
		erc165.setSupportedInterface(type(IDiamondCut).interfaceId, true);
		erc165.setSupportedInterface(type(IDiamondLoupe).interfaceId, true);
		erc165.setSupportedInterface(type(IERC721Metadata).interfaceId, true);
		erc165.setSupportedInterface(type(IERC721Enumerable).interfaceId, true);
		erc165.setSupportedInterface(type(IERC721Enumerable).interfaceId, true);
		erc165.setSupportedInterface(
			type(IRoyaltiesProvider).interfaceId,
			true
		);
		erc165.setSupportedInterface(type(IMeemBaseStandard).interfaceId, true);
		erc165.setSupportedInterface(
			type(IMeemSplitsStandard).interfaceId,
			true
		);
		erc165.setSupportedInterface(
			type(IMeemPermissionsStandard).interfaceId,
			true
		);

		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		s.name = params.name;
		s.symbol = params.symbol;
		s.childDepth = params.childDepth;
		s.nonOwnerSplitAllocationAmount = params.nonOwnerSplitAllocationAmount;
		s.tokenCounter = params.tokenCounterStart;
		s.ADMIN_ROLE = keccak256('ADMIN_ROLE');
		s.MINTER_ROLE = keccak256('MINTER_ROLE');
		s.contractURI = params.contractURI;
		if (params.tokenCounterStart < 1) {
			revert(Error.InvalidTokenCounter);
		}
		s.tokenCounter = params.tokenCounterStart;

		LibAccessControl._grantRole(s.ADMIN_ROLE, msg.sender);
		LibAccessControl._grantRole(s.MINTER_ROLE, msg.sender);

		for (uint256 i = 0; i < params.admins.length; i++) {
			LibAccessControl._grantRole(s.ADMIN_ROLE, params.admins[i]);
			LibAccessControl._grantRole(s.MINTER_ROLE, params.admins[i]);
		}

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
}
