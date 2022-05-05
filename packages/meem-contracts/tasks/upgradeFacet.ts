import path from 'path'
import fs from 'fs-extra'
import { task, types } from 'hardhat/config'
import packageJson from '../package.json'
import log from '../src/lib/log'
import { zeroAddress } from '../src/lib/utils'
import { IDeployHistory } from './deployDiamond'
import { FacetCutAction, getSelectors } from './lib/diamond'

// interface Contract {
// 	args?: (string | number | (() => string | undefined))[]
// 	address?: string
// 	libraries?: (() => Record<string, string>) | Record<string, string>
// 	waitForConfirmation?: boolean
// }

export interface ICut {
	facetAddress: string
	action: FacetCutAction
	functionSelectors: string[]
}

task('upgradeFacet', 'Upgrade MeemFacet')
	.addParam('proxy', 'The proxy address', undefined, types.string, false)
	.addParam('facet', 'The facet name', undefined, types.string, false)
	.addParam('gwei', 'The gwei price', 31, types.int, true)
	.setAction(async (args, { ethers }) => {
		const facetName = args.facet
		const proxyAddress = args.proxy
		const network = await ethers.provider.getNetwork()
		const { chainId } = network
		const diamondHistoryFile = path.join(
			process.cwd(),
			'.diamond',
			`${chainId}.json`
		)

		let history: IDeployHistory = {}
		try {
			history = await fs.readJSON(diamondHistoryFile)
		} catch (e) {
			log.crit(e)
		}

		const wei = args.gwei ? args.gwei * 1000000000 : undefined

		const [deployer] = await ethers.getSigners()
		log.info('Deploying contracts with the account:', deployer.address)

		log.info('Account balance:', (await deployer.getBalance()).toString())

		const Facet = await ethers.getContractFactory(facetName)
		const facet = await Facet.deploy({
			gasPrice: wei
		})
		log.info(`Deploying new facet w/ tx hash: ${facet.deployTransaction.hash}`)
		await facet.deployed()

		log.info(`Deployed new ${facetName}: ${facet.address}`)

		const facetSelectors = getSelectors(facet)

		const previousSelectors =
			(history[proxyAddress] &&
				history[proxyAddress][facetName] &&
				history[proxyAddress][facetName].functionSelectors) ??
			[]
		const replaceSelectors: string[] = []
		const addSelectors: string[] = []
		const removeSelectors: string[] = []

		facetSelectors.forEach(f => {
			const prev = previousSelectors.find(ps => ps === f)
			if (prev) {
				replaceSelectors.push(f)
			} else {
				addSelectors.push(f)
			}
		})

		previousSelectors.forEach(ps => {
			const curr = facetSelectors.find(f => f === ps)
			if (!curr) {
				removeSelectors.push(ps)
			}
		})

		const cuts: ICut[] = []

		if (removeSelectors.length > 0) {
			cuts.push({
				facetAddress: zeroAddress,
				action: FacetCutAction.Remove,
				functionSelectors: removeSelectors
			})
		}

		if (replaceSelectors.length > 0) {
			cuts.push({
				facetAddress: facet.address,
				action: FacetCutAction.Replace,
				functionSelectors: replaceSelectors
			})
		}

		if (addSelectors.length > 0) {
			cuts.push({
				facetAddress: facet.address,
				action: FacetCutAction.Add,
				functionSelectors: addSelectors
			})
		}

		const diamondCut = await ethers.getContractAt('IDiamondCut', args.proxy)
		const tx = await diamondCut.diamondCut(
			cuts,
			ethers.constants.AddressZero,
			'0x',
			{ gasLimit: 5000000, gasPrice: wei }
		)

		log.info(`Initiated diamond cut transaction: ${tx.hash}`)

		const receipt = await tx.wait()
		if (!receipt.status) {
			throw Error(`Diamond upgrade failed: ${tx.hash}`)
		}
		log.info('Completed diamond cut w/ tx: ', tx.hash)

		const previousDeploys =
			history[proxyAddress] && history[proxyAddress][facetName]
				? [
						...history[proxyAddress][facetName].previousDeploys,
						{
							version: packageJson.version,
							address: history[proxyAddress][facetName].address,
							functionSelectors:
								history[proxyAddress][facetName].functionSelectors
						}
				  ]
				: []

		if (!history[proxyAddress]) {
			history[proxyAddress] = {}
		}

		history[proxyAddress][facetName] = {
			version: packageJson.version,
			address: facet.address,
			functionSelectors: [...replaceSelectors, ...addSelectors],
			previousDeploys
		}

		await fs.writeJSON(diamondHistoryFile, history, {
			flag: 'w'
		})

		log.info(`Upgrade history written to ${diamondHistoryFile}`)
	})
