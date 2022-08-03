import path from 'path'
import { HardhatEthersHelpers } from '@nomiclabs/hardhat-ethers/types'
import { ethers as Ethers } from 'ethers'
import fs from 'fs-extra'
import globby from 'globby'
import { task, types } from 'hardhat/config'
import { HardhatArguments } from 'hardhat/types'
import packageJson from '../package.json'
import log from '../src/lib/log'
import { Permission } from '../src/lib/meemStandard'
import { zeroAddress } from '../src/lib/utils'
import { InitParamsStruct } from '../typechain/contracts/facets/Admin/AdminFacet.sol/AdminFacet'
import {
	FacetCutAction,
	// getSelector,
	getSelectors,
	IDeployHistoryFacet
} from './lib/diamond'

export async function parseContracts(options: {
	ethers: HardhatEthersHelpers
	hardhatArguments?: HardhatArguments
}) {
	const { ethers, hardhatArguments } = options

	const contractsPath = path.join(
		process.cwd(),
		'artifacts/contracts/**/*.json'
	)
	const files = await globby(contractsPath)

	for (let i = 0; i < files.length; i += 1) {
		const file = files[i]
		const contents = await fs.readJSON(file)
		const filename = file
			.replace(/.*\//, '')
			.replace('.json', '')
			.replace('.sol', '')
		const fromFilename = contents.sourceName
			?.replace(/.*\//, '')
			.replace('.json', '')
			.replace('.sol', '')
		if (
			contents.abi &&
			contents.abi.length > 0 &&
			contents.bytecode &&
			contents.bytecode.length > 0 &&
			contents.bytecode !== '0x' &&
			filename === fromFilename
		) {
			console.log({
				filename,
				fromFilename
			})
		}
	}

	// console.log(files)
}

task('parseContracts', 'Deploys Meem').setAction(
	async (args, { ethers, hardhatArguments }) => {
		const result = await parseContracts({ ethers, hardhatArguments })
		return result
	}
)
