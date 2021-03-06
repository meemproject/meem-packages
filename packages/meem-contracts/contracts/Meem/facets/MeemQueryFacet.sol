// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
pragma experimental ABIEncoderV2;

import {LibERC721} from '../libraries/LibERC721.sol';
import {LibAppStorage} from '../storage/LibAppStorage.sol';
import {LibProperties} from '../libraries/LibProperties.sol';
import {LibMeem, WrappedItem} from '../libraries/LibMeem.sol';
import {LibAccessControl} from '../libraries/LibAccessControl.sol';
import {Meem, Chain, MeemProperties, PropertyType, PermissionType, MeemPermission, Split, IMeemQueryStandard, BaseProperties, ContractInfo} from '../interfaces/MeemStandard.sol';
import {IRoyaltiesProvider} from '../../royalties/IRoyaltiesProvider.sol';
import {LibPart} from '../../royalties/LibPart.sol';

contract MeemQueryFacet is IMeemQueryStandard {
	function copiesOf(uint256 tokenId)
		external
		view
		override
		returns (uint256[] memory)
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		return s.copies[tokenId];
	}

	function ownedCopiesOf(uint256 tokenId, address owner)
		external
		view
		override
		returns (uint256[] memory)
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		return s.copiesOwnerTokens[tokenId][owner];
	}

	function numCopiesOf(uint256 tokenId)
		external
		view
		override
		returns (uint256)
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		return s.copies[tokenId].length;
	}

	function remixesOf(uint256 tokenId)
		external
		view
		override
		returns (uint256[] memory)
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		return s.copies[tokenId];
	}

	function ownedRemixesOf(uint256 tokenId, address owner)
		external
		view
		override
		returns (uint256[] memory)
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		return s.remixesOwnerTokens[tokenId][owner];
	}

	function numRemixesOf(uint256 tokenId)
		external
		view
		override
		returns (uint256)
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		return s.remixes[tokenId].length;
	}

	function getMeem(uint256 tokenId)
		external
		view
		override
		returns (Meem memory)
	{
		return LibMeem.getMeem(tokenId);
	}

	function childDepth() external view override returns (int256) {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		return s.childDepth;
	}

	function tokenIdsOfOwner(address _owner)
		external
		view
		override
		returns (uint256[] memory tokenIds_)
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		return s.ownerTokenIds[_owner];
	}

	function tokenIdOfOwnerIndex(address _owner, uint256 tokenId)
		external
		view
		returns (uint256)
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		return s.ownerTokenIdIndexes[_owner][tokenId];
	}

	function isNFTWrapped(
		Chain chain,
		address contractAddress,
		uint256 tokenId
	) external view override returns (bool) {
		return LibMeem.isNFTWrapped(chain, contractAddress, tokenId);
	}

	function wrappedTokens(WrappedItem[] memory items)
		external
		view
		override
		returns (uint256[] memory)
	{
		return LibMeem.wrappedTokens(items);
	}

	function getBaseProperties()
		external
		view
		override
		returns (BaseProperties memory)
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		return s.baseProperties;
	}

	function getDefaultProperties(PropertyType propertyType)
		external
		view
		override
		returns (MeemProperties memory)
	{
		return LibProperties.getProperties(0, propertyType);
	}

	function getContractInfo()
		external
		view
		override
		returns (ContractInfo memory)
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		return
			ContractInfo({
				symbol: s.symbol,
				name: s.name,
				contractURI: LibERC721.contractURI(),
				baseProperties: s.baseProperties,
				defaultProperties: LibProperties.getProperties(
					0,
					PropertyType.DefaultMeem
				),
				defaultChildProperties: LibProperties.getProperties(
					0,
					PropertyType.DefaultChild
				),
				childDepth: s.childDepth,
				nonOwnerSplitAllocationAmount: s.nonOwnerSplitAllocationAmount
			});
	}

	function getRoles(bytes32 role)
		external
		view
		override
		returns (address[] memory)
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		return s.rolesList[role];
	}
}
