/* eslint-disable no-restricted-syntax */
import InitDiamondABI from '@meemproject/meem-contracts/abi/contracts/Meem/InitDiamond.sol/InitDiamond.json'
import IDiamondCutABI from '@meemproject/meem-contracts/abi/contracts/Meem/interfaces/IDiamondCut.sol/IDiamondCut.json'
import MeemDiamondABI from '@meemproject/meem-contracts/abi/contracts/MeemDiamond.sol/MeemDiamond.json'
import aft from '@meemproject/meem-contracts/artifacts/contracts/MeemDiamond.sol/MeemDiamond.json'
import { Contract, ethers, providers } from 'ethers'
import { FacetCutAction, IFacetCut } from '../lib/diamond'
import log from '../lib/log'
import { IVersion, versions } from './versions'

export async function getCuts() {}

export async function deployMeemProxy(options: {
	provider: providers.JsonRpcProvider | providers.Web3Provider
	referenceContractAddress: string
}) {
	const { provider, referenceContractAddress } = options
	const code = await provider.getCode(referenceContractAddress)
	console.log({ code })
	const signer = await provider.getSigner()
	console.log({ bytecode: aft.bytecode })
	const proxy = new ethers.ContractFactory(MeemDiamondABI, aft.bytecode, signer)
	const deployedProxy = await proxy.deploy()
	await deployedProxy.deployed()

	return deployedProxy
}

export async function initProxy(options: {
	provider: providers.JsonRpcProvider | providers.Web3Provider
	proxyContractAddress: string
	name: string
	symbol: string
	contractURI: string
	version?: IVersion
	cuts?: IFacetCut[]
}) {
	const { provider, proxyContractAddress, name, symbol, contractURI } = options

	const version = options.version ?? versions.v1
	const cuts =
		options.cuts ??
		Object.values(version).map(f => ({
			facetAddress: f.address,
			action: FacetCutAction.Add,
			functionSelectors: f.functionSelectors
		}))

	const signer = await provider.getSigner()

	const diamondCut = new Contract(proxyContractAddress, IDiamondCutABI, signer)
	const initDiamond = new Contract(proxyContractAddress, InitDiamondABI, signer)

	console.log({
		diamondCut,
		name,
		symbol,
		contractURI,
		initDiamond,
		interface: initDiamond.interface
	})

	const functionCall = initDiamond.interface.encodeFunctionData('init', [
		{
			name,
			symbol,
			childDepth: -1,
			nonOwnerSplitAllocationAmount: 0,
			proxyRegistryAddress: '0xf57b2c51ded3a29e6891aba85459d600256cf317',
			contractURI
		}
	])

	console.log({
		cuts,
		proxyContractAddress,
		functionCall
	})

	const tx = await diamondCut.diamondCut(
		cuts,
		proxyContractAddress,
		functionCall
	)
	log.debug(`Initiating diamond cut tx: ${tx.hash}`)
	await tx.wait()
	return tx
}
