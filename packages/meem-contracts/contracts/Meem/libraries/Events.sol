// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {PropertyType, MeemProperties, URISource} from '../interfaces/MeemStandard.sol';

library Events {
	event PropertiesSet(
		uint256 tokenId,
		PropertyType propertyType,
		MeemProperties props
	);
}
