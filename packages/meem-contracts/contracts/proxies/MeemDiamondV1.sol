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
import {OwnableStorage} from '@solidstate/contracts/access/ownable/SafeOwnable.sol';

contract MeemDiamondV1 is SolidStateDiamond {
	using OwnableStorage for OwnableStorage.Layout;

	event MeemDiamondCreated();

	constructor(address owner) {
		OwnableStorage.layout().setOwner(owner);
		emit MeemDiamondCreated();
	}
}
