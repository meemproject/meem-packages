import path from 'path'
import { HardhatEthersHelpers } from '@nomiclabs/hardhat-ethers/types'
import fs from 'fs-extra'
import { task, types } from 'hardhat/config'
import { HardhatArguments } from 'hardhat/types'
import { facets } from '../src/facets.generated'
import log from '../src/lib/log'
import { Chain } from '../src/lib/meemStandard'
import { zeroAddress } from '../src/lib/utils'

export async function createVersion(options: {
	args?: {
		chain?: string
	}
	ethers: HardhatEthersHelpers
	hardhatArguments?: HardhatArguments
}) {
	const { args } = options
	const chainName = args?.chain ?? 'rinkeby'
	let chain = Chain.Rinkeby
	let filename = '4.json'

	switch (chainName) {
		case 'rinkeby':
			chain = Chain.Rinkeby
			filename = '4.json'
			break

		case 'polygon':
			chain = Chain.Polygon
			filename = '137.json'
			break

		default:
			throw new Error(
				'Chain must be specified (rinkeby or polygon) ex: "yarn createVersion rinkeby"'
			)
	}

	const deployHistory = await import(`../.diamond/${filename}`)

	// Grab the latest 0 address
	const latestVersion = deployHistory[zeroAddress]
	const versionNumbers = Object.keys(facets[chain])

	const nextVersionNumber =
		versionNumbers.length > 0
			? +versionNumbers.sort()[versionNumbers.length - 1] + 1
			: 1

	console.log({ latestVersion, nextVersionNumber })

	const newFacets = facets
	newFacets[chain] = {
		[nextVersionNumber]: latestVersion,
		...facets[chain]
	}

	const data = `/* eslint-disable */
// !! GENERATED FILE !! DO NOT EDIT MANUALLY

import { Chain } from './lib/meemStandard'

export interface IVersion {
	[facetName: string]: {
		address: string
		functionSelectors: string[]
		version?: string
		previousDeploys?: string[]
	}
}

export const facets: {
	[Chain.Polygon]: {
		[version: string]: IVersion
	}
	[Chain.Rinkeby]: {
		[version: string]: IVersion
	}
} = ${JSON.stringify(newFacets)}`

	await fs.writeFile(path.join(__dirname, '../src/facets.generated.ts'), data)

	await fs.ensureDir(
		path.join(__dirname, `../versions/${chainName}/${nextVersionNumber}`)
	)

	await fs.copyFile(
		path.join(__dirname, '../types/Meem.json'),
		path.join(
			__dirname,
			`../versions/${chainName}/${nextVersionNumber}`,
			`Meem.json`
		)
	)

	await fs.copyFile(
		path.join(__dirname, '../types/Meem.ts'),
		path.join(
			__dirname,
			`../versions/${chainName}/${nextVersionNumber}`,
			'Meem.ts'
		)
	)

	await fs.copyFile(
		path.join(__dirname, '../types/common.ts'),
		path.join(
			__dirname,
			`../versions/${chainName}/${nextVersionNumber}`,
			'common.ts'
		)
	)

	log.info(`Created version ${nextVersionNumber} for ${chainName}`)
}

task('createVersion', 'Tags a new version based on the latest facets')
	.addParam('chain', 'The chain to tag against', 'rinkeby', types.string, true)
	.setAction(async (args, { ethers, hardhatArguments }) => {
		const result = await createVersion({ args, ethers, hardhatArguments })
		return result
	})
