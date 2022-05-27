import { Contract, ethers } from 'ethers'
import type { Transaction } from 'ethers'
import InitDiamondABI from '../artifacts/contracts/Meem/InitDiamond.sol/InitDiamond.json'
import IDiamondCutABI from '../artifacts/contracts/Meem/interfaces/IDiamondCut.sol/IDiamondCut.json'
import aft from '../artifacts/contracts/MeemDiamond.sol/MeemDiamond.json'
import { IDiamondCut, InitDiamond } from '../typechain'
import type {
	InitParamsStruct,
	BasePropertiesStruct
} from '../typechain/contracts/Meem/interfaces/MeemStandard.sol/IInitDiamondStandard'
import type { MeemPropertiesStruct } from '../typechain/contracts/Meem/interfaces/MeemStandard.sol/IMeemBaseStandard'
import { IVersion, facets } from './facets.generated'
import { FacetCutAction, IFacetCut } from './lib/diamond'
import log from './lib/log'
import {
	defaultBaseProperties,
	defaultMeemProperties
} from './lib/meemProperties'
import { Chain } from './lib/meemStandard'
import { zeroAddress } from './lib/utils'
import { versions } from './versions'

export interface ICut {
	facetAddress: string
	action: FacetCutAction
	functionSelectors: string[]
}

export async function getCuts() {}

export async function deployProxy(options: { signer: ethers.Signer }) {
	const { signer } = options
	const proxy = new ethers.ContractFactory(aft.abi, aft.bytecode, signer)
	const deployedProxy = await proxy.deploy()
	await deployedProxy.deployed()

	return deployedProxy
}

export async function initProxy(options: {
	signer: ethers.Signer
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
}) {
	const {
		signer,
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

	let version = facets[chain][versions[chain].latest]
	if (options.customVersion) {
		version = options.customVersion
	} else if (options.version) {
		// @ts-ignore
		version = versions[chain][options.version]
			? // @ts-ignore
			  facets[chain][versions[chain][options.version]]
			: facets[chain][options.version]
	}

	const cuts =
		options.cuts ??
		Object.values(version).map(f => ({
			facetAddress: f.address,
			action: FacetCutAction.Add,
			functionSelectors: f.functionSelectors
		}))

	const diamondCut = new Contract(
		proxyContractAddress,
		IDiamondCutABI.abi,
		signer
	) as IDiamondCut
	const initDiamond = new Contract(
		proxyContractAddress,
		InitDiamondABI.abi,
		signer
	) as InitDiamond

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
	// await tx.wait()
	return tx
}

export type IReinitializeOptions = InitParamsStruct & {
	signer: ethers.Signer
	proxyContractAddress: string
}

export async function upgrade(options: {
	signer: ethers.Signer
	proxyContractAddress: string
	chain: Chain.Rinkeby | Chain.Polygon
	fromVersion: string
	toVersion: string
}): Promise<Transaction | undefined> {
	const { signer, proxyContractAddress, chain, fromVersion, toVersion } =
		options

	const cuts: ICut[] = []
	const tags = ['latest', 'beta', 'alpha']
	const from = tags.includes(fromVersion)
		? // @ts-ignore
		  facets[chain][versions[chain][fromVersion]]
		: facets[chain][fromVersion]
	const to = tags.includes(toVersion)
		? // @ts-ignore
		  facets[chain][versions[chain][toVersion]]
		: facets[chain][toVersion]

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

	const diamondCut = new Contract(
		proxyContractAddress,
		IDiamondCutABI.abi,
		signer
	) as IDiamondCut

	const tx = await diamondCut.diamondCut(
		cuts,
		ethers.constants.AddressZero,
		'0x'
	)

	await tx.wait()

	return tx
}
