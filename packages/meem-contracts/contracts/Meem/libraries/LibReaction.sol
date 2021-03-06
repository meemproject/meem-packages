// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {LibAppStorage} from '../storage/LibAppStorage.sol';
import {LibERC721} from './LibERC721.sol';
import {Array} from '../utils/Array.sol';
import {Reaction} from '../interfaces/MeemStandard.sol';
import {Error} from './Errors.sol';
import {MeemEvents} from './Events.sol';

library LibReaction {
	function addReaction(uint256 tokenId, string memory reaction) internal {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();

		if (s.addressReactionsAt[tokenId][reaction][msg.sender] != 0) {
			revert(Error.AlreadyReacted);
		}

		s.addressReactions[msg.sender][tokenId].push(reaction);
		s.addressReactionsIndex[msg.sender][tokenId][reaction] =
			s.addressReactions[msg.sender][tokenId].length -
			1;
		s.addressReactionsAt[tokenId][reaction][msg.sender] = block.timestamp;

		s.tokenReactions[tokenId][reaction]++;

		emit MeemEvents.MeemTokenReactionAdded(
			tokenId,
			msg.sender,
			reaction,
			s.tokenReactions[tokenId][reaction]
		);
	}

	function removeReaction(uint256 tokenId, string memory reaction) internal {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		if (s.addressReactionsAt[tokenId][reaction][msg.sender] == 0) {
			revert(Error.ReactionNotFound);
		}

		Array.removeAt(
			s.addressReactions[msg.sender][tokenId],
			s.addressReactionsIndex[msg.sender][tokenId][reaction]
		);

		s.addressReactionsAt[tokenId][reaction][msg.sender] = 0;

		s.tokenReactions[tokenId][reaction]--;

		emit MeemEvents.MeemTokenReactionRemoved(
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
	) internal view returns (uint256) {
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();

		if (s.addressReactionsAt[tokenId][reaction][addy] == 0) {
			revert(Error.ReactionNotFound);
		}

		return s.addressReactionsAt[tokenId][reaction][addy];
	}

	function setReactionTypes(uint256 tokenId, string[] memory reactionTypes)
		internal
	{
		LibERC721.requireOwnsToken(tokenId);
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		s.meems[tokenId].reactionTypes = reactionTypes;

		emit MeemEvents.MeemTokenReactionTypesSet(tokenId, reactionTypes);
	}

	function getReactions(uint256 tokenId)
		internal
		view
		returns (Reaction[] memory)
	{
		LibAppStorage.AppStorage storage s = LibAppStorage.diamondStorage();
		Reaction[] memory reactions = new Reaction[](
			s.meems[tokenId].reactionTypes.length
		);

		for (uint256 i = 0; i < s.meems[tokenId].reactionTypes.length; i++) {
			reactions[i].reaction = s.meems[tokenId].reactionTypes[i];
			reactions[i].count = s.tokenReactions[tokenId][
				s.meems[tokenId].reactionTypes[i]
			];
		}

		return reactions;
	}
}
