import { Contract, ethers } from 'ethers'
import type { Transaction } from 'ethers'
import IDiamondCutABI from '../artifacts/contracts/Meem/interfaces/IDiamondCut.sol/IDiamondCut.json'
import aft from '../artifacts/contracts/MeemDiamond.sol/MeemDiamond.json'
import { IDiamondCut } from '../typechain'
import { FacetCutAction } from './lib/diamond'
import { zeroAddress } from './lib/utils'

export interface ICut {
	facetAddress: string
	action: FacetCutAction
	functionSelectors: string[]
}

export async function deployProxy(options: { signer: ethers.Signer }) {
	const { signer } = options
	const proxy = new ethers.ContractFactory(aft.abi, aft.bytecode, signer)
	const deployedProxy = await proxy.deploy()
	await deployedProxy.deployed()

	return deployedProxy
}

export interface IFacetVersion {
	address: string
	functionSelectors: string[]
}

export function findFacet(options: {
	facet: {
		address: string
		functionSelectors: string[]
	}
	searchVersions: IFacetVersion[]
}) {
	const { facet, searchVersions } = options

	for (let i = 0; i < searchVersions.length; i += 1) {
		const facetVersion = searchVersions[i]
		const matches = facetVersion.functionSelectors.filter(v =>
			facet.functionSelectors.includes(v)
		)

		if (matches.length > 0) {
			return facetVersion
		}
	}
}

export function getCuts(options: {
	proxyContractAddress: string
	fromVersion: IFacetVersion[]
	toVersion: IFacetVersion[]
}) {
	const { proxyContractAddress, fromVersion, toVersion } = options

	const cuts: ICut[] = []

	const usedFunctionSelectors: { [address: string]: string } = {}

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

	// Find the proxy base selectors since they are immutable
	const filteredFrom = fromVersion.filter(
		f => f.address.toLowerCase() !== proxyContractAddress.toLowerCase()
	)
	const filteredTo = toVersion.filter(
		t => t.address.toLowerCase() !== proxyContractAddress.toLowerCase()
	)

	const proxyVersion = fromVersion.find(
		f => f.address.toLowerCase() === proxyContractAddress.toLowerCase()
	)
	proxyVersion?.functionSelectors.forEach(
		s => (usedFunctionSelectors[s] = proxyContractAddress)
	)

	// Find new facets and add them
	filteredTo.forEach(toFacet => {
		const fromFacet = findFacet({
			facet: toFacet,
			searchVersions: filteredFrom
		})

		if (!fromFacet) {
			const filteredFunctionSelectors: string[] = []
			toFacet.functionSelectors.forEach(functionSelector => {
				if (typeof usedFunctionSelectors[functionSelector] === 'undefined') {
					filteredFunctionSelectors.push(functionSelector)
				}
			})
			cuts.push({
				facetAddress: toFacet.address,
				action: FacetCutAction.Add,
				functionSelectors: filteredFunctionSelectors
			})
		} else {
			diffFacets.push({
				from: fromFacet,
				to: toFacet
			})
		}
	})

	// Find removed facets and remove them
	filteredFrom.forEach(fromFacet => {
		if (
			fromFacet.address.toLowerCase() !== proxyContractAddress.toLowerCase()
		) {
			const toFacet = findFacet({
				facet: fromFacet,
				searchVersions: filteredTo
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
			if (diffFacet.to.address === diffFacet.from.address) {
				// Do nothing
			} else if (prev) {
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

	return cuts
}

export async function upgrade(options: {
	signer: ethers.Signer
	proxyContractAddress: string
	fromVersion: IFacetVersion[]
	toVersion: IFacetVersion[]
}): Promise<Transaction | undefined> {
	const { signer, proxyContractAddress, fromVersion, toVersion } = options

	const cuts = getCuts({ proxyContractAddress, fromVersion, toVersion })

	if (cuts.length === 0) {
		throw new Error('NO_CHANGES')
	}

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
