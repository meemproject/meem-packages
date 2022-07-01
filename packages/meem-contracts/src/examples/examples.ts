// /* eslint-disable no-console */
// import { ethers } from 'ethers'
// import { deployProxy, initProxy } from '../deploy'
// import { getMeemContract } from '../lib/contract'
// import { defaultBaseProperties } from '../lib/meemProperties'
// import { Chain, Permission, UriSource } from '../lib/meemStandard'
// import { zeroAddress } from '../lib/utils'
// import { mint } from '../mint'

// export async function mintExample() {
// 	const provider = new ethers.providers.JsonRpcProvider('<RPC_URL>')
// 	const signer = new ethers.Wallet('<PRIVATE_KEY>', provider)

// 	const tx = await mint({
// 		shouldWaitforTransaction: true,
// 		contractAddress: '<CONTRACT_ADDRESS>',
// 		signer,
// 		to: '0x...',
// 		tokenURI: 'ipfs://example',
// 		uriSource: UriSource.Url
// 	})

// 	console.log(`Minted meem with tx: ${tx.hash}`)
// }

// export async function createContract() {
// 	const provider = new ethers.providers.JsonRpcProvider('<RPC_URL>')
// 	const signer = new ethers.Wallet('<PRIVATE_KEY>', provider)

// 	/** Step 1: Deploy the contract */
// 	const contract = await deployProxy({
// 		signer
// 	})

// 	/** Step 2: Initialize the contract */
// 	const tx = await initProxy({
// 		signer,
// 		proxyContractAddress: contract.address,
// 		chain: Chain.Rinkeby,
// 		name: 'Test Meem',
// 		symbol: 'TME',
// 		contractURI:
// 			'{"name": "Test","description": "testing","image": "","external_link": ""}'
// 	})

// 	console.log(`Initialized contract with tx: ${tx.hash}`)
// }

// export async function callContractMethods(options: {
// 	contractAddress: string
// 	signer: ethers.Wallet
// }) {
// 	const { contractAddress, signer } = options
// 	const contract = await getMeemContract({
// 		contractAddress,
// 		signer
// 	})

// 	const meem = await contract.getMeem(1)

// 	console.log({ meem })
// }

// export async function variedMinting(options: {
// 	contractAddress: string
// 	signer: ethers.Wallet
// }) {
// 	const { contractAddress, signer } = options

// 	const tx = await initProxy({
// 		signer,
// 		proxyContractAddress: contractAddress,
// 		chain: Chain.Polygon,
// 		name: 'Test Meem',
// 		symbol: 'TME',
// 		contractURI:
// 			'{"name": "Test","description": "testing","image": "","external_link": ""}',
// 		baseProperties: {
// 			...defaultBaseProperties,
// 			mintPermissions: [
// 				// Holders of WETH can mint for a price of 0.1 MATIC
// 				{
// 					permission: Permission.Holders,
// 					addresses: ['0x7ceb23fd6bc0add59e62ac25578270cff1b9f619'],
// 					costWei: ethers.utils.parseEther('0.1'),
// 					numTokens: 1,
// 					lockedBy: zeroAddress
// 				},
// 				// Everyone else can mint for 2 MATIC
// 				{
// 					permission: Permission.Anyone,
// 					addresses: [],
// 					costWei: ethers.utils.parseEther('2'),
// 					numTokens: 0,
// 					lockedBy: zeroAddress
// 				}
// 			],
// 			// Split proceeds between 2 wallets. 25% and 75%
// 			splits: [
// 				{
// 					toAddress: '0x...',
// 					amount: 2500,
// 					lockedBy: zeroAddress
// 				},
// 				{
// 					toAddress: '0x...',
// 					amount: 7500,
// 					lockedBy: zeroAddress
// 				}
// 			]
// 		}
// 	})

// 	console.log(`Initialized contract with tx: ${tx.hash}`)
// }
