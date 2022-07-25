// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ClippingStorage} from './ClippingStorage.sol';
import {Array} from '../utils/Array.sol';

library ClippingError {
	string public constant AlreadyClipped = 'ALREADY_CLIPPED';
	string public constant NotClipped = 'NOT_CLIPPED';
}

contract ClippingFacet {
	event MeemTokenClipped(uint256 indexed tokenId, address indexed addy);
	event MeemTokenUnClipped(uint256 indexed tokenId, address indexed addy);

	function clip(uint256 tokenId) public {
		ClippingStorage.DataStore storage s = ClippingStorage.dataStore();

		if (s.hasAddressClipped[msg.sender][tokenId]) {
			revert(ClippingError.AlreadyClipped);
		}

		s.clippings[tokenId].push(msg.sender);
		s.addressClippings[msg.sender].push(tokenId);
		s.clippingsIndex[msg.sender][tokenId] = s.clippings[tokenId].length - 1;
		s.addressClippingsIndex[msg.sender][tokenId] =
			s.addressClippings[msg.sender].length -
			1;
		s.hasAddressClipped[msg.sender][tokenId] = true;

		emit MeemTokenClipped(tokenId, msg.sender);
	}

	function unClip(uint256 tokenId) public {
		ClippingStorage.DataStore storage s = ClippingStorage.dataStore();

		if (!s.hasAddressClipped[msg.sender][tokenId]) {
			revert(ClippingError.NotClipped);
		}

		Array.removeAt(
			s.clippings[tokenId],
			s.clippingsIndex[msg.sender][tokenId]
		);
		Array.removeAt(
			s.addressClippings[msg.sender],
			s.addressClippingsIndex[msg.sender][tokenId]
		);
		s.clippingsIndex[msg.sender][tokenId] = 0;
		s.addressClippingsIndex[msg.sender][tokenId] = 0;
		s.hasAddressClipped[msg.sender][tokenId] = false;

		emit MeemTokenUnClipped(tokenId, msg.sender);
	}

	function tokenClippings(uint256 tokenId)
		public
		view
		returns (address[] memory)
	{
		ClippingStorage.DataStore storage s = ClippingStorage.dataStore();
		return s.clippings[tokenId];
	}

	function addressClippings(address addy)
		public
		view
		returns (uint256[] memory)
	{
		ClippingStorage.DataStore storage s = ClippingStorage.dataStore();
		return s.addressClippings[addy];
	}

	function hasAddressClipped(uint256 tokenId, address addy)
		public
		view
		returns (bool)
	{
		ClippingStorage.DataStore storage s = ClippingStorage.dataStore();
		return s.clippingsIndex[addy][tokenId] != 0;
	}

	function clippings(uint256 tokenId) public view returns (address[] memory) {
		ClippingStorage.DataStore storage s = ClippingStorage.dataStore();
		return s.clippings[tokenId];
	}

	function numClippings(uint256 tokenId) public view returns (uint256) {
		ClippingStorage.DataStore storage s = ClippingStorage.dataStore();
		return s.clippings[tokenId].length;
	}
}
