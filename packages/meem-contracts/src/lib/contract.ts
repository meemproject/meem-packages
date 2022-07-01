import { Contract, Signer } from 'ethers'
import {
	ERC165,
	IERC721,
	IERC721Enumerable,
	IERC721Metadata
} from '../../typechain'
import erc165ABI from '../abi/ERC165.json'
import erc721ABI from '../abi/ERC721.json'

/**
 * Get an instance of the Meem contract
 *
 * If you're using an older version you'll need to cast it by importing the types
 * from @meemproject/meem-contracts/versions/<chainName>/<version>/Meem.ts
 * */
// export async function getMeemContract(options: {
// 	contractAddress: string
// 	meemABI?: ethers.ContractInterface
// 	signer?: Signer
// }) {
// 	const { contractAddress, signer } = options

// 	const abi = options.meemABI ?? meemABI

// 	const contract = new Contract(contractAddress, abi, signer) as unknown as Meem

// 	return contract
// }

/**
 * Get an instance of an ERC721 contract
 * */
export async function getERC721Contract(options: {
	contractAddress: string
	signer?: Signer
}) {
	const { contractAddress, signer } = options

	const contract = new Contract(
		contractAddress,
		erc721ABI,
		signer
	) as unknown as IERC721 & IERC721Metadata & IERC721Enumerable

	return contract
}

/**
 * Get an instance of an ERC165 contract
 * */
export async function getERC165Contract(options: {
	contractAddress: string
	signer?: Signer
}) {
	const { contractAddress, signer } = options

	const contract = new Contract(
		contractAddress,
		erc165ABI,
		signer
	) as unknown as ERC165

	return contract
}
