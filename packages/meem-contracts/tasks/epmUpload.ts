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
		env: string
	}
	ethers: HardhatEthersHelpers
	hardhatArguments?: HardhatArguments
}) {
	const { args } = options

	let apiKey: string
	let apiHost: string

	switch (args.env) {
		case 'alpha':
			apiKey = process.env.ALPHA_API_KEY as string
			apiHost = process.env.ALPHA_API_HOST as string
			break
		case 'dev':
			apiKey = process.env.DEV_API_KEY as string
			apiHost = process.env.DEV_API_HOST as string
			break
		case 'stage':
			apiKey = process.env.STAGE_API_KEY as string
			apiHost = process.env.STAGE_API_HOST as string
			break
		case 'prod':
			apiKey = process.env.PROD_API_KEY as string
			apiHost = process.env.PROD_API_HOST as string
			break

		default:
			throw new Error(`Invalid environment ${args.env}`)
	}

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
						.post(`${apiHost}/api/1.0/contracts`)
						.set('Authorization', `JWT ${apiKey}`)
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
	.addParam(
		'env',
		'The name of the environment to upload to. "alpha", "dev", "stage", or "prod"',
		undefined,
		types.string,
		false
	)
	.setAction(async (args, { ethers, hardhatArguments }) => {
		const result = await epmUpload({ args, ethers, hardhatArguments })
		return result
	})
