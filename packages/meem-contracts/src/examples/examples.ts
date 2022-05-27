import { ethers } from 'ethers'
import { deployProxy, initProxy } from '../deploy'
import { getMeemContract } from '../lib/contract'
import { Chain, UriSource } from '../lib/meemStandard'
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
		uriSource: UriSource.Url
	})

	console.log(`Minted meem with tx: ${tx.hash}`)
}

export async function createContract() {
	const provider = new ethers.providers.JsonRpcProvider('<RPC_URL>')
	const signer = new ethers.Wallet('<PRIVATE_KEY>', provider)

	/** Step 1: Deploy the contract */
	const contract = await deployProxy({
		signer
	})

	/** Step 2: Initialize the contract */
	const tx = await initProxy({
		signer,
		proxyContractAddress: contract.address,
		chain: Chain.Rinkeby,
		name: 'Test Meem',
		symbol: 'TME',
		contractURI:
			'{"name": "Test","description": "testing","image": "","external_link": ""}'
	})

	console.log(`Initialized contract with tx: ${tx.hash}`)
}

export async function callContractMethods(options: {
	contractAddress: string
	signer: ethers.Wallet
}) {
	const { contractAddress, signer } = options
	const contract = await getMeemContract({
		contractAddress,
		signer
	})

	const meem = await contract.getMeem(1)

	console.log({ meem })
}
