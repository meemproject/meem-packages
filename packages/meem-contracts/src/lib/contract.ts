import { ethers, Contract, Signer } from 'ethers'
import { Meem } from '../../types'
import meemABI from '../../types/Meem.json'

/**
 * Get an instance of the Meem contract
 *
 * If you're using an older version you'll need to cast it by importing the types
 * from @meemproject/meem-contracts/versions/<chainName>/<version>/Meem.ts
 * */
export async function getMeemContract(options: {
	contractAddress: string
	meemABI?: ethers.ContractInterface
	signer?: Signer
}) {
	const { contractAddress, signer } = options

	const abi = options.meemABI ?? meemABI

	const contract = new Contract(contractAddress, abi, signer) as unknown as Meem

	return contract
}
