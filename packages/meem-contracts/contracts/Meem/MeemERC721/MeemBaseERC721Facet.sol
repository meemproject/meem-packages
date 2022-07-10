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
	/** Mint a Meem */
	function mint(MintParameters memory params) public payable virtual {
		uint256 tokenId = MeemBaseStorage.dataStore().tokenCounter++;

		_requireCanMint(msg.sender);
		_requireCanMintTo(params.to);

		_safeMint(params.to, tokenId);
		ERC721MetadataStorage.Layout storage l = ERC721MetadataStorage.layout();
		l.tokenURIs[tokenId] = params.tokenURI;
		MeemBaseStorage.dataStore().tokenTypes[tokenId] = params.tokenType;
		MeemBaseStorage.dataStore().uriSources[tokenId] = params.uriSource;

		_handleSaleDistribution(0);
	}

	function test1() public view virtual returns (string memory) {
		return 'test1';
	}

	function test2() public view virtual returns (string memory) {
		return test1();
	}

	function _handleSaleDistribution(uint256 tokenId) internal virtual {
		if (msg.value == 0) {
			return;
		}

		payable(msg.sender).transfer(msg.value);
	}

	function _requireCanMint(address minter) internal virtual returns (bool) {
		return true;
	}

	function _requireCanMintTo(address to) internal virtual returns (bool) {
		return true;
	}

	function _requireOwnsToken(uint256 tokenId) internal view virtual {
		if (ownerOf(tokenId) != msg.sender) {
			revert(Error.NotTokenOwner);
		}
	}
}
