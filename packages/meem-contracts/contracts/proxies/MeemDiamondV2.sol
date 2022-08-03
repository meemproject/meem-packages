/*MMMMMM               MMMMMMMMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEMMMMMMMM               MMMMMMMM
M:::::::M             M:::::::ME::::::::::::::::::::EE::::::::::::::::::::EM:::::::M             M:::::::M
M::::::::M           M::::::::ME::::::::::::::::::::EE::::::::::::::::::::EM::::::::M           M::::::::M
M:::::::::M         M:::::::::MEE::::::EEEEEEEEE::::EE:::::EEEEEEEE::::::EEM:::::::::M         M:::::::::M
M::::::::::M       M::::::::::M  E:::::E       EEEEEEEEEEEE       E:::::E  M::::::::::M       M::::::::::M
M:::::::::::M     M:::::::::::M  E:::::E                          E:::::E  M:::::::::::M     M:::::::::::M
M:::::::M::::M   M::::M:::::::M  E::::::EEEEEEEEEE      EEEEEEEEEE::::::E  M:::::::M::::M   M::::M:::::::M
M::::::M M::::M M::::M M::::::M  E:::::::::::::::E      E:::::::::::::::E  M::::::M M::::M M::::M M::::::M
M::::::M  M::::M::::M  M::::::M  E:::::::::::::::E      E:::::::::::::::E  M::::::M  M::::M::::M  M::::::M
M::::::M   M:::::::M   M::::::M  E::::::EEEEEEEEEE      EEEEEEEEEE::::::E  M::::::M   M:::::::M   M::::::M
M::::::M    M:::::M    M::::::M  E:::::E                          E:::::E  M::::::M    M:::::M    M::::::M
M::::::M     MMMMM     M::::::M  E:::::E       EEEEEEEEEEEE       E:::::E  M::::::M     MMMMM     M::::::M
M::::::M               M::::::MEE::::::EEEEEEEE:::::EE::::EEEEEEEEE::::::EEM::::::M               M::::::M
M::::::M               M::::::ME::::::::::::::::::::EE::::::::::::::::::::EM::::::M               M::::::M
M::::::M               M::::::ME::::::::::::::::::::EE::::::::::::::::::::EM::::::M               M::::::M
MMMMMMMM               MMMMMMMMEEEEEEEEEEEE https://meem.wtf EEEEEEEEEEEEEEMMMMMMMM               MMMMMM*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {SolidStateDiamond} from '@solidstate/contracts/proxy/diamond/SolidStateDiamond.sol';
import {DiamondWritable, IDiamondWritable} from '@solidstate/contracts/proxy/diamond/writable/DiamondWritable.sol';
import {OwnableStorage, ISafeOwnable, SafeOwnable} from '@solidstate/contracts/access/ownable/SafeOwnable.sol';
import {OwnableInternal, Ownable} from '@solidstate/contracts/access/ownable/Ownable.sol';
import {ISolidStateDiamond} from '@solidstate/contracts/proxy/diamond/ISolidStateDiamond.sol';
import {DiamondBase, DiamondBaseStorage} from '@solidstate/contracts/proxy/diamond/base/DiamondBase.sol';
import {DiamondReadable, IDiamondReadable} from '@solidstate/contracts/proxy/diamond/readable/DiamondReadable.sol';
import {ERC165, ERC165Storage, IERC165} from '@solidstate/contracts/introspection/ERC165.sol';
import {IERC173} from '@solidstate/contracts/access/IERC173.sol';
import {AccessControlFacet} from '../facets/AccessControl/AccessControlFacet.sol';
import {AccessControlStorage} from '../facets/AccessControl/AccessControlStorage.sol';

library MeemDiamondV2Error {
	string public constant NoPermission = 'NO_PERMISSION';
}

contract MeemDiamondV2 is
	ISolidStateDiamond,
	DiamondBase,
	DiamondReadable,
	SafeOwnable,
	ERC165
{
	using OwnableStorage for OwnableStorage.Layout;

	event MeemDiamondCreated();

	using DiamondBaseStorage for DiamondBaseStorage.Layout;
	using ERC165Storage for ERC165Storage.Layout;
	using OwnableStorage for OwnableStorage.Layout;

	constructor(address owner, address[] memory upgraders) {
		ERC165Storage.Layout storage erc165 = ERC165Storage.layout();
		bytes4[] memory selectors = new bytes4[](12);

		// register DiamondWritable

		selectors[0] = IDiamondWritable.diamondCut.selector;

		erc165.setSupportedInterface(type(IDiamondWritable).interfaceId, true);

		// register DiamondReadable

		selectors[1] = IDiamondReadable.facets.selector;
		selectors[2] = IDiamondReadable.facetFunctionSelectors.selector;
		selectors[3] = IDiamondReadable.facetAddresses.selector;
		selectors[4] = IDiamondReadable.facetAddress.selector;

		erc165.setSupportedInterface(type(IDiamondReadable).interfaceId, true);

		// register ERC165

		selectors[5] = IERC165.supportsInterface.selector;

		erc165.setSupportedInterface(type(IERC165).interfaceId, true);

		// register SafeOwnable

		selectors[6] = Ownable.owner.selector;
		selectors[7] = SafeOwnable.nomineeOwner.selector;
		selectors[8] = Ownable.transferOwnership.selector;
		selectors[9] = SafeOwnable.acceptOwnership.selector;

		erc165.setSupportedInterface(type(IERC173).interfaceId, true);

		// register Diamond

		selectors[10] = SolidStateDiamond.getFallbackAddress.selector;
		selectors[11] = SolidStateDiamond.setFallbackAddress.selector;

		// diamond cut

		FacetCut[] memory facetCuts = new FacetCut[](1);

		facetCuts[0] = FacetCut({
			target: address(this),
			action: IDiamondWritable.FacetCutAction.ADD,
			selectors: selectors
		});

		DiamondBaseStorage.layout().diamondCut(facetCuts, address(0), '');

		OwnableStorage.layout().setOwner(owner);

		AccessControlStorage.DataStore storage ac = AccessControlStorage
			.dataStore();

		for (uint256 i = 0; i < upgraders.length; i++) {
			ac.roles[AccessControlStorage.UPGRADER_ROLE].members[
				upgraders[i]
			] = true;
			ac.rolesList[AccessControlStorage.UPGRADER_ROLE].push(upgraders[i]);
			ac.rolesListIndex[AccessControlStorage.UPGRADER_ROLE][
				upgraders[i]
			] = ac.rolesList[AccessControlStorage.UPGRADER_ROLE].length - 1;
		}

		emit MeemDiamondCreated();
	}

	function diamondCut(
		FacetCut[] calldata facetCuts,
		address target,
		bytes calldata data
	) external {
		if (
			!AccessControlStorage
				.dataStore()
				.roles[AccessControlStorage.UPGRADER_ROLE]
				.members[msg.sender]
		) {
			revert(MeemDiamondV2Error.NoPermission);
		}

		DiamondBaseStorage.layout().diamondCut(facetCuts, target, data);
	}

	receive() external payable {}

	/**
	 * @inheritdoc ISolidStateDiamond
	 */
	function getFallbackAddress() external view returns (address) {
		return DiamondBaseStorage.layout().fallbackAddress;
	}

	/**
	 * @inheritdoc ISolidStateDiamond
	 */
	function setFallbackAddress(address fallbackAddress) external {
		AccessControlFacet ac = AccessControlFacet(address(this));
		if (!ac.canUpgradeContract(msg.sender)) {
			revert(MeemDiamondV2Error.NoPermission);
		}

		DiamondBaseStorage.layout().fallbackAddress = fallbackAddress;
	}

	function _transferOwnership(address account) internal virtual override {
		super._transferOwnership(account);
	}
}
