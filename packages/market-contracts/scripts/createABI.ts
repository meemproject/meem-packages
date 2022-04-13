import path from 'path'
import fs from 'fs-extra'
import accessControlABI from '../abi/contracts/facets/AccessControlFacet.sol/AccessControlFacet.json'
import auctionHouseABI from '../abi/contracts/facets/AuctionHouseFacet.sol/AuctionHouseFacet.json'

const combinedABI = [...accessControlABI, ...auctionHouseABI]

fs.writeFileSync(
	path.join(process.cwd(), 'types', 'MeemMarket.json'),
	JSON.stringify(combinedABI)
)
