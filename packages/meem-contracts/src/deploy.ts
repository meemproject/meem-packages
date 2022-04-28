import { Contract, ethers, providers } from 'ethers'
import type { Transaction } from 'ethers'
import InitDiamondABI from '../artifacts/contracts/Meem/InitDiamond.sol/InitDiamond.json'
import IDiamondCutABI from '../artifacts/contracts/Meem/interfaces/IDiamondCut.sol/IDiamondCut.json'
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
import { zeroAddress } from './lib/utils'
import { IVersion, versions } from './versions'

export interface ICut {
	facetAddress: string
	action: FacetCutAction
	functionSelectors: string[]
}

export async function getCuts() {}

export async function deployProxy(options: {
	provider: providers.JsonRpcProvider | providers.Web3Provider
}) {
	const { provider } = options
	const signer = await provider.getSigner()
	const proxy = new ethers.ContractFactory(aft.abi, aft.bytecode, signer)
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
	version?: string
	customVersion?: IVersion
	cuts?: IFacetCut[]
}): Promise<Transaction> {
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

	let version = versions[chain].history[versions[chain].latest]
	if (options.customVersion) {
		version = options.customVersion
	} else if (options.version) {
		// @ts-ignore
		version = versions[chain][options.version]
			? // @ts-ignore
			  versions[chain].history[versions[chain][options.version]]
			: versions[chain].history[options.version]
	}

	console.log({ versions, chain, opt: options.version, version })

	const cuts =
		options.cuts ??
		Object.values(version).map(f => ({
			facetAddress: f.address,
			action: FacetCutAction.Add,
			functionSelectors: f.functionSelectors
		}))

	const signer = await provider.getSigner()

	const diamondCut = new Contract(
		proxyContractAddress,
		IDiamondCutABI.abi,
		signer
	)
	const initDiamond = new Contract(
		proxyContractAddress,
		InitDiamondABI.abi,
		signer
	)

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

	const tx = await diamondCut.diamondCut(
		cuts,
		proxyContractAddress,
		functionCall
	)
	log.debug(`Initiating diamond cut tx: ${tx.hash}`)
	await tx.wait()
	return tx
}

export async function upgrade(options: {
	provider: providers.JsonRpcProvider | providers.Web3Provider
	proxyContractAddress: string
	chain: Chain.Rinkeby | Chain.Polygon
	fromVersion: string
	toVersion: string
}): Promise<Transaction | undefined> {
	const { provider, proxyContractAddress, chain, fromVersion, toVersion } =
		options

	const cuts: ICut[] = []
	const tags = ['latest', 'beta', 'alpha']
	const from = tags.includes(fromVersion)
		? // @ts-ignore
		  versions[chain].history[versions[chain][fromVersion]]
		: versions[chain].history[fromVersion]
	const to = tags.includes(toVersion)
		? // @ts-ignore
		  versions[chain].history[versions[chain][toVersion]]
		: versions[chain].history[toVersion]

	console.log({
		from,
		to
	})

	// const to = versions[chain].history[toVersion]

	if (!from) {
		log.crit(`Invalid from version specified: ${fromVersion}`)
		throw new Error('INVALID_FROM_VERSION')
	}
	if (!to) {
		log.crit(`Invalid to version specified: ${toVersion}`)
		throw new Error('INVALID_TO_VERSION')
	}

	const toFacetNames = Object.keys(to)
	const fromFacetNames = Object.keys(from)
	const diffFacetNames: string[] = []

	// Find new facets and add them
	toFacetNames.forEach(facetName => {
		const fromFacetName = fromFacetNames.find(f => f === facetName)
		if (!fromFacetName) {
			cuts.push({
				facetAddress: to[facetName].address,
				action: FacetCutAction.Add,
				functionSelectors: to[facetName].functionSelectors
			})
		} else {
			diffFacetNames.push(facetName)
		}
	})

	// Find removed facets and remove them
	fromFacetNames.forEach(facetName => {
		const toFacetName = toFacetNames.find(f => f === facetName)
		if (!toFacetName) {
			cuts.push({
				facetAddress: to[facetName].address,
				action: FacetCutAction.Remove,
				functionSelectors: to[facetName].functionSelectors
			})
		}
	})

	// Perform diff of remaining facets
	diffFacetNames.forEach(facetName => {
		const facetSelectors = to[facetName].functionSelectors
		const previousSelectors = from[facetName].functionSelectors
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

		if (removeSelectors.length > 0) {
			cuts.push({
				facetAddress: zeroAddress,
				action: FacetCutAction.Remove,
				functionSelectors: removeSelectors
			})
		}

		if (replaceSelectors.length > 0) {
			cuts.push({
				facetAddress: to[facetName].address,
				action: FacetCutAction.Replace,
				functionSelectors: replaceSelectors
			})
		}

		if (addSelectors.length > 0) {
			cuts.push({
				facetAddress: to[facetName].address,
				action: FacetCutAction.Add,
				functionSelectors: addSelectors
			})
		}
	})

	const signer = await provider.getSigner()
	const diamondCut = new Contract(
		proxyContractAddress,
		IDiamondCutABI.abi,
		signer
	)
	const tx = await diamondCut.diamondCut(
		cuts,
		ethers.constants.AddressZero,
		'0x'
	)

	await tx.wait()

	return tx
}
