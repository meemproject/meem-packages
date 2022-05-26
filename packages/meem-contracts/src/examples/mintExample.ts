import { ethers } from 'ethers'
import { UriSource } from '../lib/meemStandard'
import { mint } from '../mint'

export async function mintExample() {
	const provider = new ethers.providers.JsonRpcProvider('<RPC_URL>')
	const signer = new ethers.Wallet('<PRIVATE_KEY>', provider)

	const tx = await mint({
		shouldWaitforTransaction: true,
		contractAddress: '<CONTRACT_ADDRESS>',
		signer,
		to: '0x...',
		tokenURI: 'ipfs://example',
		uriSource: UriSource.TokenUri
	})

	console.log(`Minted meem with tx: ${tx.hash}`)
}
