import path from 'path'
import { HardhatEthersHelpers } from '@nomiclabs/hardhat-ethers/types'
import { ethers as Ethers } from 'ethers'
import fs from 'fs-extra'
import { task } from 'hardhat/config'
import { HardhatArguments } from 'hardhat/types'
import {
	FacetCutAction,
	getSelectors,
	IDeployHistoryFacet
} from './lib/diamond'

export interface IDeployHistory {
	[proxyAddress: string]: {
		[facetName: string]: IDeployHistoryFacet & {
			previousDeploys: IDeployHistoryFacet[]
		}
	}
}

export async function deployDiamond(options: {
	ethers: HardhatEthersHelpers
	hardhatArguments?: HardhatArguments
}) {
	const { ethers, hardhatArguments } = options
	const deployedContracts: Record<string, string> = {}
	const network = await ethers.provider.getNetwork()
	const { chainId } = network
	const diamondHistoryPath = path.join(process.cwd(), '.diamond')
	const diamondHistoryFile = path.join(
		process.cwd(),
		'.diamond',
		`${chainId}.json`
	)
	let history: IDeployHistory = {}
	try {
		history = await fs.readJSON(diamondHistoryFile)
	} catch (e) {
		console.log(e)
	}

	const accounts = await ethers.getSigners()
	const contractOwner = accounts[0]
	console.log('Deploying contracts with the account:', contractOwner.address)

	console.log('Account balance:', (await contractOwner.getBalance()).toString())

	// deploy Diamond
	const Diamond = await ethers.getContractFactory('MeemMarketDiamond')

	const diamond = await Diamond.deploy()

	console.log(`Diamond deploying w/ tx: ${diamond.deployTransaction.hash}`)

	await diamond.deployed()

	console.log(`Diamond deployed at ${diamond.address}`)

	deployedContracts.DiamondProxy = diamond.address

	history[diamond.address] = {}

	// deploy facets
	console.log('')
	console.log('Deploying facets')

	const facets: Record<string, Ethers.Contract | null> = {
		AccessControlFacet: null,
		AuctionHouseFacet: null,
		InitDiamond: null
	}

	const cuts = []
	const facetNames = Object.keys(facets)
	for (const facetName of facetNames) {
		const Facet = await ethers.getContractFactory(facetName, {
			...facets[facetName]
		})
		const facet = await Facet.deploy()
		await facet.deployed()
		facets[facetName] = facet
		console.log(`${facetName} deployed: ${facet.address}`)
		deployedContracts[facetName] = facet.address
		const functionSelectors = getSelectors(facet)
		cuts.push({
			facetAddress: facet.address,
			action: FacetCutAction.Add,
			functionSelectors
		})

		const previousDeploys = history[diamond.address][facetName]
			? [
					...history[diamond.address][facetName].previousDeploys,
					{
						address: history[diamond.address][facetName].address,
						functionSelectors:
							history[diamond.address][facetName].functionSelectors
					}
			  ]
			: []

		history[diamond.address][facetName] = {
			address: facet.address,
			functionSelectors,
			previousDeploys
		}
	}

	// upgrade diamond with facets
	console.log('')
	console.log('Diamond Cut:', cuts)
	const diamondCut = await ethers.getContractAt('IDiamondCut', diamond.address)

	let meemContract = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
	let wethContract = '0xc778417e063141139fce010982780140aa0cd5ab'

	switch (hardhatArguments?.network) {
		case 'matic':
		case 'polygon':
			meemContract = '0xfEED3502Ec230122ac5c7C78C21E9C644e1067eD'
			wethContract = '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619'
			break

		case 'rinkeby':
			meemContract = '0x87e5882fa0ea7e391b7e31E8b23a8a38F35C84Ac'
			wethContract = '0xc778417e063141139fce010982780140aa0cd5ab'
			break

		case 'mainnet':
			meemContract = ''
			wethContract = ''
			break

		case 'local':
		default:
			meemContract = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
			wethContract = '0xc778417e063141139fce010982780140aa0cd5ab'
			break
	}

	// call to init function
	const functionCall = facets.InitDiamond?.interface.encodeFunctionData(
		'init',
		[
			{
				meemContract,
				wethContract
			}
		]
	)

	const tx = await diamondCut.diamondCut(cuts, diamond.address, functionCall)
	console.log('Diamond cut tx: ', tx.hash)
	const receipt = await tx.wait()
	if (!receipt.status) {
		throw Error(`Diamond upgrade failed: ${tx.hash}`)
	}

	await fs.ensureDir(diamondHistoryPath)
	await fs.writeJSON(diamondHistoryFile, history, {
		flag: 'w'
	})

	console.log({
		deployedContracts
	})

	return deployedContracts
}

task('deploy', 'Deploys Auction House').setAction(
	async (args, { ethers, hardhatArguments }) => {
		const result = await deployDiamond({ ethers, hardhatArguments })
		return result
	}
)
