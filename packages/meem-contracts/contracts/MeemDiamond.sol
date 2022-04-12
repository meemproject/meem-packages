// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@solidstate/contracts/proxy/diamond/Diamond.sol';
import '@solidstate/contracts/token/ERC721/metadata/ERC721MetadataStorage.sol';
import '@solidstate/contracts/token/ERC721/IERC721.sol';
import '@solidstate/contracts/introspection/ERC165.sol';

contract MeemDiamond is Diamond {
	using ERC165Storage for ERC165Storage.Layout;

	constructor() {}
}
