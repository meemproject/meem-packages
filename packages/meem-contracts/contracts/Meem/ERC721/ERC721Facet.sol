// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// import {LibAppStorage} from '../storage/LibAppStorage.sol';
// import {LibMeem} from '../libraries/LibMeem.sol';
// import {LibMeta} from '../libraries/LibMeta.sol';
// import {LibERC721} from '../libraries/LibERC721.sol';
// import {LibAccessControl} from '../AccessControl/LibAccessControl.sol';
// import {Base64} from '../utils/Base64.sol';
// import {IERC721} from '../interfaces/IERC721.sol';
// import {IERC721Enumerable} from '@solidstate/contracts/token/ERC721/enumerable/IERC721Enumerable.sol';
// import {IERC721Metadata} from '@solidstate/contracts/token/ERC721/metadata/IERC721Metadata.sol';
import {SolidStateERC721} from '@solidstate/contracts/token/ERC721/SolidStateERC721.sol';
import {ERC721BaseStorage} from '@solidstate/contracts/token/ERC721/base/ERC721BaseStorage.sol';
import {EnumerableMap} from '@solidstate/contracts/utils/EnumerableMap.sol';
import {EnumerableSet} from '@solidstate/contracts/utils/EnumerableSet.sol';

// import {Error} from '../libraries/Errors.sol';

contract ERC721Facet is SolidStateERC721 {
	using EnumerableMap for EnumerableMap.UintToAddressMap;
	using EnumerableSet for EnumerableSet.UintSet;

	// function _mint(address to, uint256 tokenId) internal virtual override {
	// 	require(to != address(0), 'ERC721: mint to the zero address');
	// 	require(
	// 		!ERC721BaseStorage.exists(ERC721BaseStorage.layout(), tokenId),
	// 		'ERC721: token already minted'
	// 	);

	// 	_beforeTokenTransfer(address(0), to, tokenId);

	// 	ERC721BaseStorage.Layout storage l = ERC721BaseStorage.layout();
	// 	l.holderTokens[to].add(tokenId);
	// 	l.tokenOwners.set(tokenId, to);

	// 	emit Transfer(address(0), to, tokenId);
	// }
	// function contractURI() external view returns (string memory) {
	// 	return LibERC721.contractURI();
	// }
	// function contractAddress() external view returns (address) {
	// 	return address(this);
	// }
	// ///@notice Query the universal totalSupply of all NFTs ever minted
	// ///@return totalSupply_ the number of all NFTs that have been minted
	// function totalSupply()
	// 	external
	// 	view
	// 	override
	// 	returns (uint256 totalSupply_)
	// {
	// 	return LibERC721.totalSupply();
	// }
	// /// @notice Enumerate valid NFTs
	// /// @dev Throws if `_index` >= `totalSupply()`.
	// /// @param _index A counter less than `totalSupply()`
	// /// @return tokenId_ The token identifier for the `_index`th NFT,
	// ///  (sort order not specified)
	// function tokenByIndex(uint256 _index)
	// 	external
	// 	view
	// 	override
	// 	returns (uint256 tokenId_)
	// {
	// 	return LibERC721.tokenByIndex(_index);
	// }
	// function ownerOf(uint256 tokenId) external view override returns (address) {
	// 	return LibERC721.ownerOf(tokenId);
	// }
	// function balanceOf(address _owner)
	// 	external
	// 	view
	// 	override
	// 	returns (uint256 balance)
	// {
	// 	return LibERC721.balanceOf(_owner);
	// }
	// /// @notice Enumerate NFTs assigned to an owner
	// /// @dev Throws if `_index` >= `balanceOf(_owner)` or if
	// ///  `_owner` is the zero address, representing invalid NFTs.
	// /// @param _owner An address where we are interested in NFTs owned by them
	// /// @param _index A counter less than `balanceOf(_owner)`
	// /// @return tokenId_ The token identifier for the `_index`th NFT assigned to `_owner`,
	// ///   (sort order not specified)
	// function tokenOfOwnerByIndex(address _owner, uint256 _index)
	// 	external
	// 	view
	// 	override
	// 	returns (uint256 tokenId_)
	// {
	// 	return LibERC721.tokenOfOwnerByIndex(_owner, _index);
	// }
	// ///@notice Return the universal name of the NFT
	// function name() external view override returns (string memory) {
	// 	return LibERC721.name();
	// }
	// /// @notice An abbreviated name for NFTs in this contract
	// function symbol() external view override returns (string memory) {
	// 	return LibERC721.symbol();
	// }
	// function baseTokenURI() external pure returns (string memory) {
	// 	return LibERC721.baseTokenURI();
	// }
	// /// @notice A distinct Uniform Resource Identifier (URI) for a given asset.
	// /// @dev Throws if `_tokenId` is not a valid NFT. URIs are defined in RFC
	// ///  3986. The URI may point to a JSON file that conforms to the "ERC721
	// ///  Metadata JSON Schema".
	// function tokenURI(uint256 tokenId)
	// 	external
	// 	view
	// 	override
	// 	returns (string memory)
	// {
	// 	return LibERC721.tokenURI(tokenId);
	// }
	// /**
	//  * @inheritdoc IERC721
	//  */
	// function getApproved(uint256 tokenId)
	// 	external
	// 	view
	// 	override
	// 	returns (address)
	// {
	// 	return LibERC721.getApproved(tokenId);
	// }
	// /**
	//  * @inheritdoc IERC721
	//  */
	// function isApprovedForAll(address account, address operator)
	// 	external
	// 	view
	// 	override
	// 	returns (bool)
	// {
	// 	return LibERC721.isApprovedForAll(account, operator);
	// }
	// /**
	//  * @inheritdoc IERC721
	//  */
	// function transferFrom(
	// 	address from,
	// 	address to,
	// 	uint256 tokenId
	// ) external payable override {
	// 	return LibERC721.transfer(from, to, tokenId);
	// }
	// /**
	//  * @inheritdoc IERC721
	//  */
	// function safeTransferFrom(
	// 	address from,
	// 	address to,
	// 	uint256 tokenId
	// ) external payable override {
	// 	return LibERC721.safeTransfer(from, to, tokenId);
	// }
	// /**
	//  * @inheritdoc IERC721
	//  */
	// function safeTransferFrom(
	// 	address from,
	// 	address to,
	// 	uint256 tokenId,
	// 	bytes memory data
	// ) external payable override {
	// 	return LibERC721.safeTransfer(from, to, tokenId, data);
	// }
	// /**
	//  * @inheritdoc IERC721
	//  */
	// function approve(address operator, uint256 tokenId)
	// 	external
	// 	payable
	// 	override
	// {
	// 	return LibERC721.approve(operator, tokenId);
	// }
	// /**
	//  * @inheritdoc IERC721
	//  */
	// function setApprovalForAll(address operator, bool status)
	// 	external
	// 	override
	// {
	// 	return LibERC721.setApprovalForAll(operator, status);
	// }
	// function burn(uint256 tokenId) external {
	// 	return LibERC721.burn(tokenId);
	// }
	// function ownerTokens(address owner)
	// 	external
	// 	view
	// 	returns (uint256[] memory)
	// {
	// 	LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
	// 	return s.ownerTokenIds[owner];
	// }
	// function onERC721Received(
	// 	address,
	// 	address,
	// 	uint256,
	// 	bytes calldata
	// ) external view returns (bytes4) {
	// 	if (msg.sender != address(this)) {
	// 		revert(Error.InvalidToken);
	// 	}
	// 	return
	// 		bytes4(
	// 			keccak256('onERC721Received(address,address,uint256,bytes)')
	// 		);
	// }
}
