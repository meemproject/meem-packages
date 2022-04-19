// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {LibAppStorage} from './storage/LibAppStorage.sol';
import {LibAccessControl} from './libraries/LibAccessControl.sol';
import {IDiamondCut} from './interfaces/IDiamondCut.sol';
import {IDiamondLoupe} from './interfaces/IDiamondLoupe.sol';
import {Constants} from './libraries/Constants.sol';

import {ERC165, ERC165Storage, IERC165} from '@solidstate/contracts/introspection/ERC165.sol';

contract InitDiamond {
	using ERC165Storage for ERC165Storage.Layout;

	struct Args {
		address meemContract;
		address wethContract;
	}

	function init(Args memory _args) external {
		ERC165Storage.Layout storage erc165 = ERC165Storage.layout();
		erc165.setSupportedInterface(type(IDiamondCut).interfaceId, true);
		erc165.setSupportedInterface(type(IDiamondLoupe).interfaceId, true);

		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		LibAccessControl._grantRole(s.ADMIN_ROLE, msg.sender);

		require(
			IERC165(_args.meemContract).supportsInterface(
				Constants.erc721InterfaceId
			),
			"Doesn't support NFT interface"
		);

		s.meemContract = _args.meemContract;
		s.wethContract = _args.wethContract;
		s.timeBuffer = 15 * 60; // extend 15 minutes after every bid made in last 15 minutes
		s.minBidIncrementPercentage = 5; // 5%
	}
}
