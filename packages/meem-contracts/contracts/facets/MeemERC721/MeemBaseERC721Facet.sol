// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {MintParameters, MintWithProofParameters} from '../interfaces/MeemStandard.sol';
import {MeemBaseStorage} from './MeemBaseStorage.sol';
import {ERC721BaseInternal} from '@solidstate/contracts/token/ERC721/base/ERC721Base.sol';
import {SolidStateERC721} from '@solidstate/contracts/token/ERC721/SolidStateERC721.sol';
import {ERC721Metadata} from '@solidstate/contracts/token/ERC721/metadata/ERC721Metadata.sol';
import {IERC721Metadata} from '@solidstate/contracts/token/ERC721/metadata/IERC721Metadata.sol';
import {ERC721MetadataStorage} from '@solidstate/contracts/token/ERC721/metadata/ERC721MetadataStorage.sol';
import {ERC721BaseStorage} from '@solidstate/contracts/token/ERC721/base/ERC721BaseStorage.sol';
import {ERC721Base} from '@solidstate/contracts/token/ERC721/base/ERC721Base.sol';
import {IERC721} from '@solidstate/contracts/token/ERC721/IERC721.sol';
import {EnumerableSet} from '@solidstate/contracts/utils/EnumerableSet.sol';
import {EnumerableMap} from '@solidstate/contracts/utils/EnumerableMap.sol';
import {UintUtils} from '@solidstate/contracts/utils/UintUtils.sol';
import {Base64} from '../utils/Base64.sol';
import {Strings} from '../utils/Strings.sol';
import {TokenType} from '../interfaces/MeemStandard.sol';
import {ERC165} from '@solidstate/contracts/introspection/ERC165.sol';
import {ERC721BaseInternal} from '@solidstate/contracts/token/ERC721/base/ERC721Base.sol';
import {ERC721Facet} from '../ERC721/ERC721Facet.sol';
import {AccessControlFacet, AccessControlError} from '../AccessControl/AccessControlFacet.sol';
import {ERC721Enumerable} from '@solidstate/contracts/token/ERC721/enumerable/ERC721Enumerable.sol';
import {ERC721Metadata} from '@solidstate/contracts/token/ERC721/metadata/ERC721Metadata.sol';
import {ISolidStateERC721} from '@solidstate/contracts/token/ERC721/ISolidStateERC721.sol';

library Error {
	string public constant NotTokenAdmin = 'NOT_TOKEN_ADMIN';
	string public constant NotPayable = 'NOT_PAYABLE';
}

struct Meem {
	address owner;
	TokenType tokenType;
	address mintedBy;
	uint256 mintedAt;
}

struct RequireCanMintParams {
	address minter;
	address to;
	bytes32[] proof;
}

/// @title The base ERC-721 Meem contract implementation
contract MeemBaseERC721Facet is
	ISolidStateERC721,
	ERC721Facet,
	ERC721Enumerable,
	ERC721Metadata,
	ERC165
{
	using EnumerableSet for EnumerableSet.UintSet;
	using EnumerableMap for EnumerableMap.UintToAddressMap;
	using UintUtils for uint256;

	/// @notice Emitted when a token is transferred
	/// @param from The address the token is being transferred from
	/// @param to The address the token is being transferred to
	/// @param tokenId The token being transferred
	event MeemTransfer(
		address indexed from,
		address indexed to,
		uint256 indexed tokenId
	);

	/// @notice Bulk Mint tokens
	/// @param bulkParams Array of minting parameters
	function bulkMint(MintParameters[] memory bulkParams)
		public
		payable
		virtual
	{
		// Only allow bulk minting if there is no fee involved
		if (msg.value > 0) {
			revert(Error.NotPayable);
		}
		MeemBaseStorage.DataStore storage s = MeemBaseStorage.dataStore();
		MeemBaseERC721Facet facet = MeemBaseERC721Facet(address(this));
		bytes32[] memory p;

		for (uint256 i = 0; i < bulkParams.length; i++) {
			s.tokenCounter++;
			uint256 tokenId = MeemBaseStorage.dataStore().tokenCounter;
			MintParameters memory params = bulkParams[i];
			facet.requireCanMint{value: msg.value}(
				RequireCanMintParams({
					minter: msg.sender,
					to: params.to,
					proof: p
				})
			);

			_safeMint(params.to, tokenId);
			ERC721MetadataStorage.Layout storage l = ERC721MetadataStorage
				.layout();
			l.tokenURIs[tokenId] = params.tokenURI;
			s.tokenTypes[tokenId] = params.tokenType;
			s.minters[tokenId] = msg.sender;
			s.mintedTimestamps[tokenId] = block.timestamp;
		}
	}

	/// @notice Mint a token
	/// @param params The minting parameters
	function mint(MintParameters memory params) public payable virtual {
		MeemBaseStorage.DataStore storage s = MeemBaseStorage.dataStore();
		s.tokenCounter++;
		uint256 tokenId = MeemBaseStorage.dataStore().tokenCounter;

		MeemBaseERC721Facet facet = MeemBaseERC721Facet(address(this));
		bytes32[] memory p;
		facet.requireCanMint{value: msg.value}(
			RequireCanMintParams({minter: msg.sender, to: params.to, proof: p})
		);

		_safeMint(params.to, tokenId);
		ERC721MetadataStorage.Layout storage l = ERC721MetadataStorage.layout();
		l.tokenURIs[tokenId] = params.tokenURI;
		s.tokenTypes[tokenId] = params.tokenType;
		s.minters[tokenId] = msg.sender;
		s.mintedTimestamps[tokenId] = block.timestamp;

		facet.handleSaleDistribution{value: msg.value}(0, msg.sender);
	}

	/// @notice Mint a token and provide a proof that the minter is in the allowlist
	/// @param params The minting parameters
	function mintWithProof(MintWithProofParameters memory params)
		public
		payable
		virtual
	{
		MeemBaseStorage.DataStore storage s = MeemBaseStorage.dataStore();
		s.tokenCounter++;
		uint256 tokenId = MeemBaseStorage.dataStore().tokenCounter;

		MeemBaseERC721Facet facet = MeemBaseERC721Facet(address(this));
		facet.requireCanMint{value: msg.value}(
			RequireCanMintParams({
				minter: msg.sender,
				to: params.to,
				proof: params.proof
			})
		);

		_safeMint(params.to, tokenId);
		ERC721MetadataStorage.Layout storage l = ERC721MetadataStorage.layout();
		l.tokenURIs[tokenId] = params.tokenURI;
		s.tokenTypes[tokenId] = params.tokenType;
		s.minters[tokenId] = msg.sender;
		s.mintedTimestamps[tokenId] = block.timestamp;

		facet.handleSaleDistribution{value: msg.value}(0, msg.sender);
	}

	/// @notice Get the token URI
	/// @param tokenId The tokenId to get the token URI for
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

	/// @notice When a token is sold, distribute the royalties
	/// @param tokenId The token that is being purchased. This function will also be called when a token is minted with tokenId=0.
	/// @param msgSender The address who is purchasing the token
	function handleSaleDistribution(uint256 tokenId, address msgSender)
		public
		payable
	{
		if (msg.value == 0) {
			return;
		}

		// By default, send the funds back
		payable(msgSender).transfer(msg.value);
	}

	/// @notice Require that an address can mint a token
	/// @param params The requirement parameters
	function requireCanMint(RequireCanMintParams memory params)
		public
		payable
	{}

	/// @notice Require that an address is a token admin. By default only the token owner is an admin
	/// @param tokenId The token id to check
	/// @param addy The address to check
	function requireTokenAdmin(uint256 tokenId, address addy) public view {
		AccessControlFacet ac = AccessControlFacet(address(this));

		if (tokenId == 0) {
			requireAdmin();
		} else if (
			ownerOf(tokenId) != addy && !ac.hasRole(ac.ADMIN_ROLE(), addy)
		) {
			revert(Error.NotTokenAdmin);
		}
	}

	/// @notice Check if a token can be transferred
	/// @param from The address the token is being transferred from
	/// @param to The address the token is being transferred to
	/// @param tokenId The token id to check
	function requireCanTransfer(
		address msgSender,
		address from,
		address to,
		uint256 tokenId
	) public {
		MeemBaseERC721Facet(address(this)).requireTokenAdmin(tokenId, from);
	}

	function getMeem(uint256 tokenId) public view returns (Meem memory) {
		MeemBaseStorage.DataStore storage s = MeemBaseStorage.dataStore();

		return
			Meem({
				owner: ownerOf(tokenId),
				tokenType: s.tokenTypes[tokenId],
				mintedBy: s.minters[tokenId],
				mintedAt: s.mintedTimestamps[tokenId]
			});
	}

	/// @notice Transfer a token
	/// @param from The address the token is being transferred from
	/// @param to The address the token is being transferred to
	/// @param tokenId The token id to transfer
	function transferFrom(
		address from,
		address to,
		uint256 tokenId
	) public payable override(ERC721Facet, IERC721) {
		_handleTransferMessageValue(from, to, tokenId, msg.value);

		MeemBaseERC721Facet facet = MeemBaseERC721Facet(address(this));
		facet.requireCanTransfer(msg.sender, from, to, tokenId);

		_transfer(from, to, tokenId);
	}

	/// @notice Safely transfer a token
	/// @param from The address the token is being transferred from
	/// @param to The address the token is being transferred to
	/// @param tokenId The token id to transfer
	function safeTransferFrom(
		address from,
		address to,
		uint256 tokenId
	) public payable override(ERC721Facet, IERC721) {
		safeTransferFrom(from, to, tokenId, '');
	}

	/// @notice Safely transfer a token
	/// @param from The address the token is being transferred from
	/// @param to The address the token is being transferred to
	/// @param tokenId The token id to transfer
	/// @param data The data
	function safeTransferFrom(
		address from,
		address to,
		uint256 tokenId,
		bytes memory data
	) public payable override(ERC721Facet, IERC721) {
		_handleTransferMessageValue(from, to, tokenId, msg.value);

		MeemBaseERC721Facet facet = MeemBaseERC721Facet(address(this));
		facet.requireCanTransfer(msg.sender, from, to, tokenId);

		_safeTransfer(from, to, tokenId, data);
	}

	/// @notice Burns a token (sends it to the 0x0 address)
	/// @param tokenId The token id to burn
	function burn(uint256 tokenId) public {
		MeemBaseERC721Facet facet = MeemBaseERC721Facet(address(this));

		_burn(tokenId);
	}

	/// @notice Bulk burns tokens (sends it to the 0x0 address)
	/// @param tokenIds The token ids to burn
	function bulkBurn(uint256[] memory tokenIds) public {
		for (uint256 i = 0; i < tokenIds.length; i++) {
			_burn(tokenIds[i]);
		}
	}

	/// @notice Runs before a token is transferred
	/// @param from The address the token is being transferred from
	/// @param to The address the token is being transferred to
	/// @param tokenId The token id to burn
	function _beforeTokenTransfer(
		address from,
		address to,
		uint256 tokenId
	) internal virtual override(ERC721BaseInternal, ERC721Metadata) {
		super._beforeTokenTransfer(from, to, tokenId);
		MeemBaseERC721Facet(address(this)).requireCanTransfer(
			msg.sender,
			from,
			to,
			tokenId
		);

		emit MeemTransfer(from, to, tokenId);
	}

	/// @notice Convenience function to require the caller to be an admin
	function requireAdmin() internal view {
		AccessControlFacet ac = AccessControlFacet(address(this));
		if (!ac.hasRole(ac.ADMIN_ROLE(), msg.sender)) {
			revert(AccessControlError.MissingRequiredRole);
		}
	}
}
