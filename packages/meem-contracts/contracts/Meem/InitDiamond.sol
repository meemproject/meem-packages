// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

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
import {OwnableStorage} from '@solidstate/contracts/access/OwnableStorage.sol';

contract InitDiamond is IInitDiamondStandard {
	using ERC165Storage for ERC165Storage.Layout;

	function init(InitParams memory params) external override {
		OwnableStorage.Layout storage o = OwnableStorage.layout();
		if (o.owner != msg.sender) {
			revert(Error.NotOwner);
		}

		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();

		if (s.isInitialized) {
			revert(Error.AlreadyInitialized);
		}

		s.ADMIN_ROLE = keccak256('ADMIN_ROLE');
		s.MINTER_ROLE = keccak256('MINTER_ROLE');

		LibAccessControl._grantRole(s.ADMIN_ROLE, msg.sender);
		LibAccessControl._grantRole(s.MINTER_ROLE, msg.sender);

		address[] memory admins = new address[](params.admins.length + 1);
		for (uint256 i = 0; i < params.admins.length; i++) {
			admins[i] = params.admins[i];
		}

		admins[params.admins.length] = msg.sender;

		InitParams memory newParams = InitParams({
			symbol: params.symbol,
			name: params.name,
			contractURI: params.contractURI,
			baseProperties: params.baseProperties,
			defaultProperties: params.defaultProperties,
			defaultChildProperties: params.defaultChildProperties,
			admins: admins,
			tokenCounterStart: params.tokenCounterStart,
			childDepth: params.childDepth,
			nonOwnerSplitAllocationAmount: params.nonOwnerSplitAllocationAmount
		});
		LibContract.initialize(newParams, false);

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

		s.isInitialized = true;
	}
}
