/* eslint-disable import/no-duplicates */
import { Contract, ethers } from 'ethers'
import type { Transaction } from 'ethers'
import { Meem } from '../types'
import { MeemMintParametersStruct, MeemPropertiesStruct } from '../types/Meem'
import meemABI from '../types/Meem.json'
import log from './lib/log'
import { defaultMeemProperties } from './lib/meemProperties'
import { Chain, MeemType, UriSource } from './lib/meemStandard'
import { zeroAddress } from './lib/utils'
import { NetworkChainId } from './utils'

export type IMintOptions = Partial<MeemMintParametersStruct> & {
	signer: ethers.Signer
	contractAddress: string
	shouldWaitforTransaction?: boolean
	properties?: Partial<MeemPropertiesStruct>
	childProperties?: Partial<MeemPropertiesStruct>
}

export async function mint(options: IMintOptions): Promise<Transaction> {
	const { signer, contractAddress, shouldWaitforTransaction } = options

	const [minterAddress, chainId] = await Promise.all([
		signer.getAddress(),
		signer.getChainId()
	])

	const parentChain =
		options.parentChain ?? chainId === NetworkChainId.Polygon
			? Chain.Polygon
			: Chain.Rinkeby

	const mintParams: MeemMintParametersStruct = {
		to: minterAddress,
		tokenURI: options.tokenURI ?? '',
		parentChain,
		parent: options.parent ?? zeroAddress,
		parentTokenId: options.parentTokenId ?? 0,
		meemType: options.meemType ?? MeemType.Original,
		data: options.data ?? '',
		isURILocked: options.isURILocked ?? false,
		mintedBy: minterAddress,
		uriSource: options.uriSource ?? UriSource.Data,
		reactionTypes: []
	}
	const properties = { ...defaultMeemProperties, ...options.properties }
	const childProperties = {
		...defaultMeemProperties,
		...options.childProperties
	}

	const contract = new Contract(contractAddress, meemABI, signer) as Meem

	const tx = await contract.mint(mintParams, properties, childProperties)

	log.debug(`Minted meem with tx: ${tx.hash}`)

	if (shouldWaitforTransaction) {
		await tx.wait()
	}

	return tx
}
