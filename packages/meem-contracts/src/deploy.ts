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

function findFacet(options: {
	facet: {
		address: string
		functionSelectors: string[]
	}
	searchVersion: IVersion
}) {
	const { facet, searchVersion } = options
	const facetVersions = Object.values(searchVersion)

	for (let i = 0; i < facetVersions.length; i += 1) {
		const facetVersion = facetVersions[i]
		const matches = facetVersion.functionSelectors.filter(v =>
			facet.functionSelectors.includes(v)
		)

		if (matches.length > 0) {
			return facetVersion
		}
	}
}

export async function upgrade(options: {
	signer: ethers.Signer
	proxyContractAddress: string
	chain: Chain.Rinkeby | Chain.Polygon
	fromVersion: string | IVersion
	toVersion: string | IVersion
}): Promise<Transaction | undefined> {
	const { signer, proxyContractAddress, chain, fromVersion, toVersion } =
		options

	const cuts: ICut[] = []
	const tags = ['latest', 'beta', 'alpha']
	let from: IVersion
	let to: IVersion
	if (typeof fromVersion === 'string') {
		from = tags.includes(fromVersion)
			? // @ts-ignore
			  facets[chain][versions[chain][fromVersion]]
			: facets[chain][fromVersion]
	} else {
		from = fromVersion
	}
	if (typeof toVersion === 'string') {
		to = tags.includes(toVersion)
			? // @ts-ignore
			  facets[chain][versions[chain][toVersion]]
			: facets[chain][toVersion]
	} else {
		to = toVersion
	}

	if (!from) {
		log.crit(`Invalid from version specified: ${fromVersion}`)
		throw new Error('INVALID_FROM_VERSION')
	}
	if (!to) {
		log.crit(`Invalid to version specified: ${toVersion}`)
		throw new Error('INVALID_TO_VERSION')
	}

	const diffFacets: {
		from: {
			address: string
			functionSelectors: string[]
		}
		to: {
			address: string
			functionSelectors: string[]
		}
	}[] = []

	const toFacets = Object.values(to)
	const fromFacets = Object.values(from)

	// Find new facets and add them
	toFacets.forEach(toFacet => {
		const fromFacet = findFacet({
			facet: toFacet,
			searchVersion: from
		})

		if (!fromFacet) {
			cuts.push({
				facetAddress: toFacet.address,
				action: FacetCutAction.Add,
				functionSelectors: toFacet.functionSelectors
			})
		} else {
			diffFacets.push({
				from: fromFacet,
				to: toFacet
			})
		}
	})

	// Find removed facets and remove them
	fromFacets.forEach(fromFacet => {
		if (
			fromFacet.address.toLowerCase() !== proxyContractAddress.toLowerCase()
		) {
			const toFacet = findFacet({
				facet: fromFacet,
				searchVersion: to
			})
			if (!toFacet) {
				cuts.push({
					facetAddress: zeroAddress,
					action: FacetCutAction.Remove,
					functionSelectors: fromFacet.functionSelectors
				})
			}
		}
	})

	// Perform diff of remaining facets
	diffFacets.forEach(diffFacet => {
		const facetSelectors = diffFacet.to.functionSelectors
		const previousSelectors = diffFacet.from.functionSelectors
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
				facetAddress: diffFacet.to.address,
				action: FacetCutAction.Replace,
				functionSelectors: replaceSelectors
			})
		}

		if (addSelectors.length > 0) {
			cuts.push({
				facetAddress: diffFacet.to.address,
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
