import { Contract, ethers } from 'ethers'
import type { Transaction } from 'ethers'
import IDiamondCutABI from '../artifacts/contracts/Meem/interfaces/IDiamondCut.sol/IDiamondCut.json'
import aft from '../artifacts/contracts/proxies/MeemDiamondV1.sol/MeemDiamondV1.json'
import { IDiamondCut } from '../typechain'
import { FacetCutAction } from './lib/diamond'
import { zeroAddress } from './lib/utils'

export interface ICut {
	facetAddress: string
	action: FacetCutAction
	functionSelectors: string[]
}

export async function deployProxy(options: {
	ownerAddress: string
	signer: ethers.Signer
}) {
	const { ownerAddress, signer } = options
	const proxy = new ethers.ContractFactory(aft.abi, aft.bytecode, signer)
	const deployedProxy = await proxy.deploy(ownerAddress)
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

export function findFacetBySelector(options: {
	selector: string
	searchVersions: IFacetVersion[]
}) {
	const { selector, searchVersions } = options

	for (let i = 0; i < searchVersions.length; i += 1) {
		const facetVersion = searchVersions[i]
		const selectorMatch = facetVersion.functionSelectors.find(
			v => v === selector
		)

		if (selectorMatch) {
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
		const newSelectors: string[] = []
		const replaceSelectors: string[] = []

		toFacet?.functionSelectors.forEach(selector => {
			if (!usedFunctionSelectors[selector]) {
				const oldFacet = findFacetBySelector({
					selector,
					searchVersions: fromVersion
				})

				if (!oldFacet) {
					// Add the selector
					newSelectors.push(selector)
					usedFunctionSelectors[selector] = toFacet.address
				} else if (
					oldFacet &&
					oldFacet.address !== proxyVersion?.address &&
					oldFacet.address !== toFacet.address
				) {
					replaceSelectors.push(selector)
					usedFunctionSelectors[selector] = toFacet.address
				}
			}
		})

		if (newSelectors.length > 0) {
			cuts.push({
				facetAddress: toFacet.address,
				action: FacetCutAction.Add,
				functionSelectors: newSelectors
			})
		}

		if (replaceSelectors.length > 0) {
			cuts.push({
				facetAddress: toFacet.address,
				action: FacetCutAction.Replace,
				functionSelectors: replaceSelectors
			})
		}
	})

	// Find removed facets and remove them
	filteredFrom.forEach(fromFacet => {
		if (
			fromFacet.address.toLowerCase() !== proxyContractAddress.toLowerCase()
		) {
			const removeSelectors: string[] = []

			fromFacet.functionSelectors.forEach(selector => {
				const newFacet = findFacetBySelector({
					selector,
					searchVersions: toVersion
				})

				if (!newFacet) {
					removeSelectors.push(selector)
				}
			})

			if (removeSelectors.length > 0) {
				cuts.push({
					facetAddress: zeroAddress,
					action: FacetCutAction.Remove,
					functionSelectors: removeSelectors
				})
			}
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
