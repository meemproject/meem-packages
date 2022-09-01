import { ethers } from 'ethers'
import keccak256 from 'keccak256'
import { MerkleTree } from 'merkletreejs'

/** Constructs a merkle tree out of the given addresses and optionally checks the validity of addressToCheck */
export function getMerkleInfo(options: {
	addresses: string[]
	addressToCheck?: string
}) {
	const { addresses, addressToCheck } = options
	const hashedAddress = addressToCheck && keccak256(addressToCheck)
	const leaves = addresses.map(a => keccak256(a))
	const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true })
	const rootHash = merkleTree.getRoot().toString('hex')
	const proof = addressToCheck ? merkleTree.getHexProof(addressToCheck) : null

	const isVerified =
		proof && hashedAddress
			? merkleTree.verify(proof, hashedAddress, rootHash)
			: false

	return {
		leaves,
		merkleTree,
		rootHash:
			rootHash && rootHash.length > 0
				? `0x${rootHash}`
				: ethers.utils.formatBytes32String(''),
		proof,
		isVerified
	}
}
