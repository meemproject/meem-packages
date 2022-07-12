// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;

// import {LibERC721} from '../libraries/LibERC721.sol';
// import {LibAppStorage} from '../storage/LibAppStorage.sol';
// import {LibMeem} from '../libraries/LibMeem.sol';
// import {LibAccessControl} from '../AccessControl/LibAccessControl.sol';
import {MintParameters} from '../interfaces/MeemStandard.sol';
import {MeemBaseStorage} from './MeemBaseStorage.sol';
// import {IRoyaltiesProvider} from '../../royalties/IRoyaltiesProvider.sol';
// import {LibPart} from '../../royalties/LibPart.sol';
import {Error} from '../libraries/Errors.sol';
import {ERC721BaseInternal} from '@solidstate/contracts/token/ERC721/base/ERC721Base.sol';
import {SolidStateERC721} from '@solidstate/contracts/token/ERC721/SolidStateERC721.sol';
import {ERC721MetadataStorage} from '@solidstate/contracts/token/ERC721/metadata/ERC721MetadataStorage.sol';

contract MeemBaseERC721Facet is SolidStateERC721 {
	/**
	 * @notice Mint a Meem
	 * @param params The minting parameters
	 */
	function mint(MintParameters memory params) public payable virtual {
		uint256 tokenId = MeemBaseStorage.dataStore().tokenCounter++;

		MeemBaseERC721Facet facet = MeemBaseERC721Facet(address(this));
		facet.requireCanMint(msg.sender);
		facet.requireCanMintTo(params.to);

		_safeMint(params.to, tokenId);
		ERC721MetadataStorage.Layout storage l = ERC721MetadataStorage.layout();
		l.tokenURIs[tokenId] = params.tokenURI;
		MeemBaseStorage.dataStore().tokenTypes[tokenId] = params.tokenType;
		MeemBaseStorage.dataStore().uriSources[tokenId] = params.uriSource;

		facet.handleSaleDistribution(0);
	}

	/**
	 * @notice When a token is sold, distribute the royalties
	 * @param tokenId The token that is being sold. This function will also be called when a token is minted with tokenId=0.
	 */
	function handleSaleDistribution(uint256 tokenId) public payable {
		if (msg.value == 0) {
			return;
		}

		// By default, send the funds back
		payable(msg.sender).transfer(msg.value);
	}

	/**
	 * @notice Require that an address can mint a token
	 * @param minter The address that is minting
	 */
	function requireCanMint(address minter) public {}

	/**
	 * @notice Require that an address can mint to a different address
	 * @param to The address that is minting
	 */
	function requireCanMintTo(address to) public {}

	/**
	 * @notice Require that an address is a token admin. By default only the token owner is an admin
	 * @param addy The address to check
	 * @param tokenId The token id to check
	 */
	function requireTokenAdmin(uint256 tokenId, address addy)
		public
		view
		virtual
	{
		if (ownerOf(tokenId) != addy) {
			revert(Error.NotTokenOwner);
		}
	}

	function _beforeTokenTransfer(
		address from,
		address to,
		uint256 tokenId
	) internal virtual override {
		super._beforeTokenTransfer(from, to, tokenId);
	}
}
