import path from 'path'
import { HardhatEthersHelpers } from '@nomiclabs/hardhat-ethers/types'
import { ethers as Ethers } from 'ethers'
import fs from 'fs-extra'
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

export interface IFacets {
	AccessControlFacet: Ethers.Contract | null
	AdminFacet: Ethers.Contract | null
	ClippingFacet: Ethers.Contract | null
	MeemBaseERC721Facet: Ethers.Contract | null
	PermissionsFacet: Ethers.Contract | null
	SplitsFacet: Ethers.Contract | null
	ReactionFacet: Ethers.Contract | null
	[key: string]: Ethers.Contract | null
}

export interface IDeployHistory {
	[proxyAddress: string]: {
		[facetName: string]: IDeployHistoryFacet & {
			previousDeploys: IDeployHistoryFacet[]
		}
	}
}

export async function deployDiamond(options: {
	args?: {
		gwei?: number
		proxy?: boolean
		noInit?: boolean
	}
	ethers: HardhatEthersHelpers
	hardhatArguments?: HardhatArguments
}) {
	const { args, ethers, hardhatArguments } = options

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
		log.crit(e)
	}

	const wei = args?.gwei ? args.gwei * 1000000000 : undefined
	const shouldDeployProxy = !!args?.proxy

	const accounts = await ethers.getSigners()
	const contractOwner = accounts[0]
	log.info('Deploying contracts with the account:', contractOwner.address)

	log.info('Account balance:', (await contractOwner.getBalance()).toString())

	let diamondAddress = zeroAddress
	let diamond: Ethers.Contract | undefined

	if (shouldDeployProxy) {
		// deploy Diamond
		const Diamond = await ethers.getContractFactory('MeemDiamondV1')

		diamond = await Diamond.deploy(contractOwner.address, {
			gasPrice: wei
		})

		await diamond.deployed()
		diamondAddress = diamond.address
		log.info(`Deployed proxy at: ${diamondAddress}`)
	}
	deployedContracts.DiamondProxy = diamondAddress

	history[diamondAddress] = {}

	// deploy facets
	log.info('Deploying facets...')

	const facets: IFacets = {
		AccessControlFacet: null,
		AdminFacet: null,
		ClippingFacet: null,
		PermissionsFacet: null,
		SplitsFacet: null,
		ReactionFacet: null,
		MeemBaseERC721Facet: null
	}

	const usedSelectors: Record<string, string> = {}
	if (diamond) {
		const functionSelectors = getSelectors(diamond)
		functionSelectors.forEach(selector => {
			usedSelectors[selector] = diamond?.address ?? ''
		})
	}
	const cuts = []
	const facetNames = Object.keys(facets)
	for (const facetName of facetNames) {
		const Facet = await ethers.getContractFactory(facetName, {
			...facets[facetName]
		})
		const facet = await Facet.deploy({
			gasPrice: wei
		})
		log.info(`${facetName} deploying w/ tx: ${facet.deployTransaction.hash}`)
		await facet.deployed()
		facets[facetName] = facet
		log.info(
			`${facetName} deployed: ${facet.address} w/ tx: ${facet.deployTransaction.hash}`
		)
		deployedContracts[facetName] = facet.address
		const functionSelectors = getSelectors(facet)
		const activeFunctionSelectors: string[] = []

		functionSelectors.forEach(selector => {
			if (!usedSelectors[selector]) {
				activeFunctionSelectors.push(selector)
				usedSelectors[selector] = facet.address
			}
		})

		if (activeFunctionSelectors.length > 0) {
			cuts.push({
				facetAddress: facet.address,
				action: FacetCutAction.Add,
				functionSelectors: activeFunctionSelectors
			})
		}

		const previousDeploys = history[diamondAddress][facetName]
			? [
					...history[diamondAddress][facetName].previousDeploys,
					{
						version: history[diamondAddress][facetName].version ?? 'unknown',
						address: history[diamondAddress][facetName].address,
						functionSelectors:
							history[diamondAddress][facetName].functionSelectors
					}
			  ]
			: []

		history[diamondAddress][facetName] = {
			version: packageJson.version,
			address: facet.address,
			functionSelectors,
			previousDeploys
		}
	}

	if (shouldDeployProxy) {
		// upgrade diamond with facets
		log.debug('Diamond Cuts:', cuts)
		const diamondCut = await ethers.getContractAt('IDiamondCut', diamondAddress)

		// let proxyRegistryAddress = ''
		let walletAddress = ''
		const basisPoints = 100

		switch (hardhatArguments?.network) {
			case 'matic':
			case 'polygon':
				walletAddress = '0x9C5ceC7a99D19a9f1754C202aBA01BBFEDECC561'
				// proxyRegistryAddress = '0x58807baD0B376efc12F5AD86aAc70E78ed67deaE'
				break

			case 'rinkeby':
				// proxyRegistryAddress = '0xf57b2c51ded3a29e6891aba85459d600256cf317'
				walletAddress = '0xde19C037a85A609ec33Fc747bE9Db8809175C3a5'
				break

			case 'mainnet':
				// proxyRegistryAddress = '0xa5409ec958c83c3f309868babaca7c86dcb077c1'
				walletAddress = '0xde19C037a85A609ec33Fc747bE9Db8809175C3a5'
				break

			case 'local':
			default:
				// proxyRegistryAddress = '0x0000000000000000000000000000000000000000'
				walletAddress = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
				break
		}

		const params: InitParamsStruct = {
			name: 'Meem',
			symbol: 'MEEM',
			contractURI: `{"name": "Meem","description": "Meems are pieces of digital content wrapped in more advanced dynamic property rights. They are ideas, stories, images -- existing independently from any social platform -- whose creators have set the terms by which others can access, remix, and share in their value. Join us at https://discord.gg/VTsnW6jUgE","image": "https://meem-assets.s3.amazonaws.com/meem.jpg","external_link": "https://meem.wtf","seller_fee_basis_points": ${basisPoints}, "fee_recipient": "${walletAddress}"}`,
			admins: [],
			minters: [],
			mintPermissions: [
				{
					permission: Permission.Anyone,
					numTokens: 0,
					addresses: [],
					costWei: 0,
					mintStartTimestamp: 0,
					mintEndTimestamp: 0
				}
			],
			maxSupply: '1000000000000000000000000',
			isMaxSupplyLocked: false,
			splits: [],
			isTransferLocked: false
		}

		// call to init function
		const functionCall = facets.AdminFacet?.interface.encodeFunctionData(
			'initialize',
			[params]
		)

		const tx = await diamondCut.diamondCut(
			cuts,
			args.noInit ? zeroAddress : diamondAddress,
			args.noInit ? '0x' : functionCall,
			{
				gasPrice: wei
			}
		)
		log.info('Diamond cut tx: ', tx.hash)
		const receipt = await tx.wait()
		if (!receipt.status) {
			throw Error(`Diamond upgrade failed: ${tx.hash}`)
		}
	}

	await fs.ensureDir(diamondHistoryPath)
	await fs.writeJSON(diamondHistoryFile, history, {
		flag: 'w'
	})

	log.info({
		deployedContracts
	})

	return deployedContracts
}

task('deployDiamond', 'Deploys Meem')
	.addParam('gwei', 'The gwei price', 31, types.int, true)
	.addParam(
		'proxy',
		'Deploy a proxy contract with the facets',
		false,
		types.boolean,
		true
	)
	.setAction(async (args, { ethers, hardhatArguments }) => {
		const result = await deployDiamond({ args, ethers, hardhatArguments })
		return result
	})
