import InitDiamondABI from '@meemproject/meem-contracts/abi/contracts/Meem/InitDiamond.sol/InitDiamond.json'
import IDiamondCutABI from '@meemproject/meem-contracts/abi/contracts/Meem/interfaces/IDiamondCut.sol/IDiamondCut.json'
import MeemDiamondABI from '@meemproject/meem-contracts/abi/contracts/MeemDiamond.sol/MeemDiamond.json'
import aft from '@meemproject/meem-contracts/artifacts/contracts/MeemDiamond.sol/MeemDiamond.json'
import type {
	InitParamsStruct,
	BasePropertiesInitStruct
} from '@meemproject/meem-contracts/typechain/contracts/Meem/interfaces/MeemStandard.sol/IInitDiamondStandard'
import type { MeemPropertiesStruct } from '@meemproject/meem-contracts/typechain/contracts/Meem/interfaces/MeemStandard.sol/IMeemBaseStandard'
import { Contract, ethers, providers } from 'ethers'
import { FacetCutAction, IFacetCut } from '../lib/diamond'
import log from '../lib/log'
import { IVersion, versions } from './versions'

export async function getCuts() {}

export async function deployMeemProxy(options: {
	provider: providers.JsonRpcProvider | providers.Web3Provider
}) {
	const { provider } = options
	const signer = await provider.getSigner()
	const proxy = new ethers.ContractFactory(MeemDiamondABI, aft.bytecode, signer)
	const deployedProxy = await proxy.deploy()
	await deployedProxy.deployed()

	return deployedProxy
}

export async function initMeemProxy(options: {
	provider: providers.JsonRpcProvider | providers.Web3Provider
	proxyContractAddress: string
	name: string
	symbol: string
	contractURI: string
	baseProperties: BasePropertiesInitStruct
	defaultProperties: MeemPropertiesStruct
	defaultChildProperties: MeemPropertiesStruct
	admins?: string[]
	childDepth?: number
	nonOwnerSplitAllocationAmount?: number

	version?: IVersion
	cuts?: IFacetCut[]
}) {
	const {
		provider,
		proxyContractAddress,
		name,
		symbol,
		contractURI,
		childDepth
	} = options

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

	const initParams: InitParamsStruct = {
		name,
		symbol,
		childDepth: ethers.BigNumber.from(childDepth),
		nonOwnerSplitAllocationAmount: 0,
		contractURI
	}

	const functionCall = initDiamond.interface.encodeFunctionData('init', [
		initParams
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
