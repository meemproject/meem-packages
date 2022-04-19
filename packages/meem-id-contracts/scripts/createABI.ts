import path from 'path'
import fs from 'fs-extra'
import accessControlABI from '../abi/contracts/Meem/facets/AccessControlFacet.sol/AccessControlFacet.json'
import meemIdFacet from '../abi/contracts/Meem/facets/MeemIdFacet.sol/MeemIdFacet.json'
import meemDiamondABI from '../abi/contracts/MeemIdDiamond.sol/MeemIdDiamond.json'

const combinedABI = [...accessControlABI, ...meemIdFacet, ...meemDiamondABI]

const basePath = path.join(process.cwd(), 'types')

fs.ensureDirSync(basePath)

fs.writeFileSync(
	path.join(basePath, 'MeemId.json'),
	JSON.stringify(combinedABI)
)
