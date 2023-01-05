export const chainIdToTablelandChainName = (chainId: number) => {
	switch (chainId) {
		case 1:
			return 'ethereum'
			break

		case 10:
			return 'optimism'
			break

		case 137:
			return 'polygon'
			break

		case 42161:
			return 'arbitrum'
			break

		case 5:
			return 'ethereum-goerli'
			break

		case 420:
			return 'optimism-goerli'
			break

		case 421613:
			return 'arbitrum-goerli'
			break

		case 80001:
			return 'polygon-mumbai'
			break

		// case 1:
		// 	return 'optimism-goerli-staging'
		// 	break

		// case 1:
		// 	return 'local-tableland'
		// 	break

		// case 1:
		// 	return 'custom'
		// 	break

		default:
			throw new Error('CHAIN_NOT_SUPPORTED')
	}
}
