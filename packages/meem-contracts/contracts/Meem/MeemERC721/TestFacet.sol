// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {MintParameters} from '../interfaces/MeemStandard.sol';
import {MeemBaseStorage} from './MeemBaseStorage.sol';
// import {IRoyaltiesProvider} from '../../royalties/IRoyaltiesProvider.sol';
// import {LibPart} from '../../royalties/LibPart.sol';
import {Error} from '../libraries/Errors.sol';
import {ERC721BaseInternal} from '@solidstate/contracts/token/ERC721/base/ERC721Base.sol';
import {SolidStateERC721} from '@solidstate/contracts/token/ERC721/SolidStateERC721.sol';
import {ERC721MetadataStorage} from '@solidstate/contracts/token/ERC721/metadata/ERC721MetadataStorage.sol';
import {MeemBaseERC721Facet} from './MeemBaseERC721Facet.sol';

contract TestFacet {
	/**
	 * @notice Require that an address can mint a token
	 * @param minter The address that is minting
	 * @return bool Whether the address can mint a token
	 */
	function requireCanMint(address minter) public returns (bool) {
		revert('Minting disabled');
	}
}
