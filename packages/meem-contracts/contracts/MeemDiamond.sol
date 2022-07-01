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

import '@solidstate/contracts/proxy/diamond/SolidStateDiamond.sol';
import '@solidstate/contracts/token/ERC721/metadata/ERC721MetadataStorage.sol';
import '@solidstate/contracts/token/ERC721/IERC721.sol';
import '@solidstate/contracts/introspection/ERC165.sol';

contract MeemDiamond is SolidStateDiamond {
	using ERC165Storage for ERC165Storage.Layout;

	constructor() {}
}
