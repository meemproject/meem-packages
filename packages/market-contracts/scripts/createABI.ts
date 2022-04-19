import path from 'path'
import fs from 'fs-extra'
import accessControlABI from '../abi/contracts/facets/AccessControlFacet.sol/AccessControlFacet.json'
import auctionHouseABI from '../abi/contracts/facets/AuctionHouseFacet.sol/AuctionHouseFacet.json'

const combinedABI = [...accessControlABI, ...auctionHouseABI]

const basePath = path.join(process.cwd(), 'types')

fs.ensureDirSync(basePath)

fs.writeFileSync(
	path.join(basePath, 'MeemMarket.json'),
	JSON.stringify(combinedABI)
)
