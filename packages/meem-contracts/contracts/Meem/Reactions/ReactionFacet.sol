// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ReactionsStorage} from './ReactionsStorage.sol';
import {Reaction} from '../interfaces/MeemStandard.sol';
import {Array} from '../utils/Array.sol';
import {MeemBaseERC721Facet} from '../MeemERC721/MeemBaseERC721Facet.sol';

library ReactionsError {
	string public constant AlreadyReacted = 'ALREADY_REACTED';
	string public constant ReactionNotFound = 'REACTION_NOT_FOUND';
}

contract ReactionFacet {
	event TokenReactionAdded(
		uint256 tokenId,
		address addy,
		string reaction,
		uint256 newTotalReactions
	);

	event TokenReactionRemoved(
		uint256 tokenId,
		address addy,
		string reaction,
		uint256 newTotalReactions
	);

	event TokenReactionTypesSet(uint256 tokenId, string[] reactionTypes);

	function addReaction(uint256 tokenId, string memory reaction) public {
		ReactionsStorage.DataStore storage s = ReactionsStorage.dataStore();

		if (s.addressReactionsAt[tokenId][reaction][msg.sender] != 0) {
			revert(ReactionsError.AlreadyReacted);
		}

		s.addressReactions[msg.sender][tokenId].push(reaction);
		s.addressReactionsIndex[msg.sender][tokenId][reaction] =
			s.addressReactions[msg.sender][tokenId].length -
			1;
		s.addressReactionsAt[tokenId][reaction][msg.sender] = block.timestamp;

		s.tokenReactions[tokenId][reaction]++;

		emit TokenReactionAdded(
			tokenId,
			msg.sender,
			reaction,
			s.tokenReactions[tokenId][reaction]
		);
	}

	function removeReaction(uint256 tokenId, string memory reaction) public {
		ReactionsStorage.DataStore storage s = ReactionsStorage.dataStore();

		if (s.addressReactionsAt[tokenId][reaction][msg.sender] == 0) {
			revert(ReactionsError.ReactionNotFound);
		}

		Array.removeAt(
			s.addressReactions[msg.sender][tokenId],
			s.addressReactionsIndex[msg.sender][tokenId][reaction]
		);

		s.addressReactionsAt[tokenId][reaction][msg.sender] = 0;

		s.tokenReactions[tokenId][reaction]--;

		emit TokenReactionRemoved(
			tokenId,
			msg.sender,
			reaction,
			s.tokenReactions[tokenId][reaction]
		);
	}

	function getReactedAt(
		uint256 tokenId,
		address addy,
		string memory reaction
	) public view returns (uint256) {
		ReactionsStorage.DataStore storage s = ReactionsStorage.dataStore();

		if (s.addressReactionsAt[tokenId][reaction][addy] == 0) {
			revert(ReactionsError.ReactionNotFound);
		}

		return s.addressReactionsAt[tokenId][reaction][addy];
	}

	function setReactionTypes(uint256 tokenId, string[] memory reactionTypes)
		internal
	{
		MeemBaseERC721Facet(address(this)).requireTokenAdmin(
			tokenId,
			msg.sender
		);

		ReactionsStorage.DataStore storage s = ReactionsStorage.dataStore();
		s.tokenReactionTypes[tokenId] = reactionTypes;

		emit TokenReactionTypesSet(tokenId, reactionTypes);
	}

	function getReactions(uint256 tokenId)
		public
		view
		returns (Reaction[] memory)
	{
		ReactionsStorage.DataStore storage s = ReactionsStorage.dataStore();
		Reaction[] memory reactions = new Reaction[](
			s.tokenReactionTypes[tokenId].length
		);

		for (uint256 i = 0; i < s.tokenReactionTypes[tokenId].length; i++) {
			reactions[i].reaction = s.tokenReactionTypes[tokenId][i];
			reactions[i].count = s.tokenReactions[tokenId][
				s.tokenReactionTypes[tokenId][i]
			];
		}

		return reactions;
	}
}
