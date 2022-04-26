import { Contract, ethers, providers } from 'ethers'
import InitDiamondABI from '../abi/contracts/Meem/InitDiamond.sol/InitDiamond.json'
import IDiamondCutABI from '../abi/contracts/Meem/interfaces/IDiamondCut.sol/IDiamondCut.json'
import MeemDiamondABI from '../abi/contracts/MeemDiamond.sol/MeemDiamond.json'
import aft from '../artifacts/contracts/MeemDiamond.sol/MeemDiamond.json'
import type {
	InitParamsStruct,
	BasePropertiesStruct
} from '../typechain/contracts/Meem/interfaces/MeemStandard.sol/IInitDiamondStandard'
import type { MeemPropertiesStruct } from '../typechain/contracts/Meem/interfaces/MeemStandard.sol/IMeemBaseStandard'
import { FacetCutAction, IFacetCut } from './lib/diamond'
import log from './lib/log'
import {
	defaultBaseProperties,
	defaultMeemProperties
} from './lib/meemProperties'
import { Chain } from './lib/meemStandard'
import { IVersion, versions } from './versions'

export async function getCuts() {}

export async function deployProxy(options: {
	provider: providers.JsonRpcProvider | providers.Web3Provider
}) {
	const { provider } = options
	const signer = await provider.getSigner()
	const proxy = new ethers.ContractFactory(MeemDiamondABI, aft.bytecode, signer)
	const deployedProxy = await proxy.deploy()
	await deployedProxy.deployed()

	return deployedProxy
}

export async function initProxy(options: {
	provider: providers.JsonRpcProvider | providers.Web3Provider
	proxyContractAddress: string
	chain: Chain.Rinkeby | Chain.Polygon
	name: string
	symbol: string
	contractURI: string
	baseProperties?: BasePropertiesStruct
	defaultProperties?: MeemPropertiesStruct
	defaultChildProperties?: MeemPropertiesStruct
	admins?: string[]
	childDepth?: number
	nonOwnerSplitAllocationAmount?: number
	tokenCounterStart?: number
	version?: number
	customVersion?: IVersion
	cuts?: IFacetCut[]
}) {
	const {
		provider,
		proxyContractAddress,
		name,
		symbol,
		contractURI,
		childDepth,
		chain,
		admins,
		tokenCounterStart
	} = options

	const baseProperties = options.baseProperties ?? defaultBaseProperties
	const defaultProperties = options.defaultProperties ?? defaultMeemProperties
	const defaultChildProperties =
		options.defaultChildProperties ?? defaultMeemProperties

	const version = options.version
		? versions[chain][options.version]
		: versions[chain][versions[chain].latest]

	const cuts =
		options.cuts ??
		Object.values(version).map(f => ({
			facetAddress: f.address,
			action: FacetCutAction.Add,
			functionSelectors: f.functionSelectors
		}))

	const signer = await provider.getSigner()

	const diamondCut = new Contract(proxyContractAddress, IDiamondCutABI, signer)
	const initDiamond = new Contract(proxyContractAddress, InitDiamondABI, signer)

	console.log({
		diamondCut,
		name,
		symbol,
		contractURI,
		initDiamond,
		interface: initDiamond.interface
	})

	const initParams: InitParamsStruct = {
		name,
		symbol,
		childDepth: ethers.BigNumber.from(childDepth ?? 0),
		nonOwnerSplitAllocationAmount: 0,
		contractURI,
		admins: admins ?? [],
		baseProperties,
		defaultProperties,
		defaultChildProperties,
		tokenCounterStart: tokenCounterStart ?? 1
	}

	const functionCall = initDiamond.interface.encodeFunctionData('init', [
		initParams
	])

	console.log({
		cuts,
		proxyContractAddress,
		functionCall
	})

	const tx = await diamondCut.diamondCut(
		cuts,
		proxyContractAddress,
		functionCall
	)
	log.debug(`Initiating diamond cut tx: ${tx.hash}`)
	await tx.wait()
	return tx
}
