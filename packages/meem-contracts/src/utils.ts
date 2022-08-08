// import { Chain } from './lib/meemStandard'

export enum NetworkName {
	Mainnet = 'homestead',
	Rinkeby = 'rinkeby',
	Polygon = 'matic',
	Mumbai = 'mumbai',
	Hardhat = 'hardhat'
}

export enum NetworkChainId {
	Mainnet = 1,
	Rinkeby = 4,
	Polygon = 137,
	Mumbai = 80001
}

/** Convert Chain to NetworkName */
// export const chainToNetworkName = (chain: Chain): NetworkName => {
// 	switch (+chain) {
// 		case Chain.Ethereum:
// 			return NetworkName.Mainnet

// 		case Chain.Rinkeby:
// 			return NetworkName.Rinkeby

// 		case Chain.Polygon:
// 			return NetworkName.Polygon

// 		case 99:
// 			return NetworkName.Hardhat

// 		default:
// 			throw new Error('INVALID_CHAIN')
// 	}
// }

// /** Convert NetworkName to Chain */
// export const networkNameToChain = (networkName: NetworkName): Chain => {
// 	switch (networkName) {
// 		case NetworkName.Mainnet:
// 			return Chain.Ethereum

// 		case NetworkName.Rinkeby:
// 			return Chain.Rinkeby

// 		case NetworkName.Polygon:
// 			return Chain.Polygon

// 		case NetworkName.Hardhat:
// 			return Chain.Polygon

// 		default:
// 			throw new Error('INVALID_CHAIN')
// 	}
// }

// /** Convert Chain to friendly, readable network name */
// export const chainToFriendlyNetworkName = (chain: Chain) => {
// 	switch (+chain) {
// 		case Chain.Ethereum:
// 			return 'Ethereum'

// 		case Chain.Rinkeby:
// 			return 'Rinkeby'

// 		case Chain.Polygon:
// 			return 'Polygon'

// 		default:
// 			throw new Error('INVALID_CHAIN')
// 	}
// }
