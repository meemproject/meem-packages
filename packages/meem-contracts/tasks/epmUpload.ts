import path from 'path'
import { HardhatEthersHelpers } from '@nomiclabs/hardhat-ethers/types'
import fs from 'fs-extra'
import globby from 'globby'
import { task, types } from 'hardhat/config'
import { HardhatArguments } from 'hardhat/types'
import request from 'superagent'
import log from '../src/lib/log'

enum ContractType {
	Regular = 'regular',
	DiamondProxy = 'diamondProxy',
	DiamondFacet = 'diamondFacet'
}

export async function epmUpload(options: {
	args: {
		name: string
		contract: string
	}
	ethers: HardhatEthersHelpers
	hardhatArguments?: HardhatArguments
}) {
	const { args } = options

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
			let contractType = ContractType.Regular

			if (file.includes('facets')) {
				contractType = ContractType.DiamondFacet
			} else if (file.includes('proxies')) {
				contractType = ContractType.DiamondProxy
			}

			if (!args.contract || args.contract === filename) {
				log.superInfo(`Uploading contract for: ${filename}`)
				try {
					await request
						.post(`${process.env.API_HOST}/api/1.0/contracts`)
						.set('Authorization', `JWT ${process.env.API_KEY}`)
						.send({
							name: `${filename} ${args.name}`,
							description: args.name,
							contractType,
							abi: contents.abi,
							bytecode: contents.bytecode
						})
				} catch (e: any) {
					if (
						e &&
						e.response &&
						e.response.body &&
						e.response.body.code === 'CONTRACT_ALREADY_EXISTS'
					) {
						log.warn(`Contract already exists for: ${filename}`)
					} else {
						log.warn(e)
						log.warn(e.response?.body)
					}
				}
			}
		}
	}
}

task('epmUpload', 'Deploys contracts to EPM')
	.addParam(
		'contract',
		'The name of the contract to upload',
		undefined,
		types.string,
		true
	)
	.addParam(
		'name',
		'The name of the contract group',
		undefined,
		types.string,
		false
	)
	.setAction(async (args, { ethers, hardhatArguments }) => {
		const result = await epmUpload({ args, ethers, hardhatArguments })
		return result
	})
