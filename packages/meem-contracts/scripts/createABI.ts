import path from 'path'
import fs from 'fs-extra'
import accessControlABI from '../artifacts/contracts/Meem/AccessControl/AccessControlFacet.sol/AccessControlFacet.json'
import erc721ABI from '../artifacts/contracts/Meem/ERC721/ERC721Facet.sol/ERC721Facet.json'
import clippingABI from '../artifacts/contracts/Meem/facets/ClippingFacet.sol/ClippingFacet.json'
import meemAdminABI from '../artifacts/contracts/Meem/facets/MeemAdminFacet.sol/MeemAdminFacet.json'
import meemBaseABI from '../artifacts/contracts/Meem/facets/MeemBaseFacet.sol/MeemBaseFacet.json'
import meemPermissionsABI from '../artifacts/contracts/Meem/facets/MeemPermissionsFacet.sol/MeemPermissionsFacet.json'
import meemQueryABI from '../artifacts/contracts/Meem/facets/MeemQueryFacet.sol/MeemQueryFacet.json'
import meemSplitsABI from '../artifacts/contracts/Meem/facets/MeemSplitsFacet.sol/MeemSplitsFacet.json'
import reactionsABI from '../artifacts/contracts/Meem/facets/ReactionFacet.sol/ReactionFacet.json'
import initFacet from '../artifacts/contracts/Meem/InitDiamond.sol/InitDiamond.json'
import accessControlEventsABI from '../artifacts/contracts/Meem/libraries/Events.sol/AccessControlEvents.json'
import initEventsABI from '../artifacts/contracts/Meem/libraries/Events.sol/InitEvents.json'
import meemBaseEventsABI from '../artifacts/contracts/Meem/libraries/Events.sol/MeemBaseEvents.json'
import meemERC721EventsABI from '../artifacts/contracts/Meem/libraries/Events.sol/MeemERC721Events.json'
import meemEventsABI from '../artifacts/contracts/Meem/libraries/Events.sol/MeemEvents.json'
import meemDiamondABI from '../artifacts/contracts/MeemDiamond.sol/MeemDiamond.json'

const combinedABI = [
	...accessControlABI.abi,
	...clippingABI.abi,
	...erc721ABI.abi,
	...meemAdminABI.abi,
	...meemBaseABI.abi,
	...meemPermissionsABI.abi,
	...meemQueryABI.abi,
	...meemSplitsABI.abi,
	...meemDiamondABI.abi,
	...reactionsABI.abi,
	...initFacet.abi,
	...accessControlEventsABI.abi,
	...initEventsABI.abi,
	...meemBaseEventsABI.abi,
	...meemERC721EventsABI.abi,
	...meemEventsABI.abi
]

const basePath = path.join(process.cwd(), 'types')

fs.ensureDirSync(basePath)

fs.writeFileSync(path.join(basePath, 'Meem.json'), JSON.stringify(combinedABI))
