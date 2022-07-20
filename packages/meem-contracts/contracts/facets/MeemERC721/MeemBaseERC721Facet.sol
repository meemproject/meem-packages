// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {MintParameters} from '../interfaces/MeemStandard.sol';
import {MeemBaseStorage} from './MeemBaseStorage.sol';
import {ERC721BaseInternal} from '@solidstate/contracts/token/ERC721/base/ERC721Base.sol';
import {SolidStateERC721} from '@solidstate/contracts/token/ERC721/SolidStateERC721.sol';
import {ERC721Metadata} from '@solidstate/contracts/token/ERC721/metadata/ERC721Metadata.sol';
import {IERC721Metadata} from '@solidstate/contracts/token/ERC721/metadata/IERC721Metadata.sol';
import {ERC721MetadataStorage} from '@solidstate/contracts/token/ERC721/metadata/ERC721MetadataStorage.sol';
import {ERC721BaseStorage} from '@solidstate/contracts/token/ERC721/base/ERC721BaseStorage.sol';
import {EnumerableSet} from '@solidstate/contracts/utils/EnumerableSet.sol';
import {EnumerableMap} from '@solidstate/contracts/utils/EnumerableMap.sol';
import {UintUtils} from '@solidstate/contracts/utils/UintUtils.sol';
import {Base64} from '../utils/Base64.sol';
import {Strings} from '../utils/Strings.sol';

library Error {
	string public constant NotTokenAdmin = 'NOT_TOKEN_ADMIN';
}

contract MeemBaseERC721Facet is SolidStateERC721 {
	using EnumerableSet for EnumerableSet.UintSet;
	using EnumerableMap for EnumerableMap.UintToAddressMap;
	using UintUtils for uint256;

	/**
	 * @notice Mint a Meem
	 * @param params The minting parameters
	 */
	function mint(MintParameters memory params) public payable virtual {
		MeemBaseStorage.dataStore().tokenCounter++;
		uint256 tokenId = MeemBaseStorage.dataStore().tokenCounter;

		MeemBaseERC721Facet facet = MeemBaseERC721Facet(address(this));
		facet.requireCanMint(msg.sender);
		facet.requireCanMintTo(params.to);

		_safeMint(params.to, tokenId);
		ERC721MetadataStorage.Layout storage l = ERC721MetadataStorage.layout();
		l.tokenURIs[tokenId] = params.tokenURI;
		MeemBaseStorage.dataStore().tokenTypes[tokenId] = params.tokenType;
		// MeemBaseStorage.dataStore().uriSources[tokenId] = params.uriSource;

		facet.handleSaleDistribution(0);
	}

	function tokenURI(uint256 tokenId)
		public
		view
		virtual
		override(ERC721Metadata, IERC721Metadata)
		returns (string memory)
	{
		ERC721BaseStorage.Layout storage b = ERC721BaseStorage.layout();
		require(
			// ERC721BaseStorage.layout().exists(tokenId),
			b.tokenOwners.contains(tokenId),
			'ERC721Metadata: URI query for nonexistent token'
		);

		ERC721MetadataStorage.Layout storage l = ERC721MetadataStorage.layout();

		string memory tokenIdURI = l.tokenURIs[tokenId];
		string memory baseURI = l.baseURI;

		if (bytes(baseURI).length == 0) {
			if (bytes(tokenIdURI)[0] == bytes1('{')) {
				return
					string(
						abi.encodePacked(
							'data:application/json;base64,',
							Base64.encode(bytes(tokenIdURI))
						)
					);
			}

			return tokenIdURI;
		} else if (bytes(tokenIdURI).length > 0) {
			return string(abi.encodePacked(baseURI, tokenIdURI));
		} else {
			return string(abi.encodePacked(baseURI, tokenId.toString()));
		}
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
	function requireCanMint(address minter) public payable {}

	/**
	 * @notice Require that an address can mint to a different address
	 * @param to The address that is minting
	 */
	function requireCanMintTo(address to) public payable {}

	/**
	 * @notice Require that an address is a token admin. By default only the token owner is an admin
	 * @param addy The address to check
	 * @param tokenId The token id to check
	 */
	function requireTokenAdmin(uint256 tokenId, address addy) public view {
		if (ownerOf(tokenId) != addy) {
			revert(Error.NotTokenAdmin);
		}
	}

	/**
	 * @notice Check if a token can be transferred
	 * @param tokenId The token id to check
	 */
	function requireCanTransfer(
		address from,
		address to,
		uint256 tokenId
	) public {}

	function _beforeTokenTransfer(
		address from,
		address to,
		uint256 tokenId
	) internal virtual override {
		super._beforeTokenTransfer(from, to, tokenId);
		MeemBaseERC721Facet(address(this)).requireCanTransfer(
			from,
			to,
			tokenId
		);
	}
}
