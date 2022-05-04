import { Contract, Signer } from 'ethers'
import { Meem } from '../../types'
import meemABI from '../../types/Meem.json'

export function getMeemContract(options: {
	contractAddress: string
	signer?: Signer
}) {
	const { contractAddress, signer } = options
	const contract = new Contract(
		contractAddress,
		meemABI,
		signer
	) as unknown as Meem

	return contract
}
