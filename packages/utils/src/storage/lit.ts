export const chainIdToLitChainName = (chainId: number) => {
	/*
		Supported LIT chains:
		"ethereum" | "optimism" | "polygon" | "arbitrum" | "ethereum-goerli" | "optimism-goerli" | "arbitrum-goerli" | "polygon-mumbai" | "optimism-goerli-staging" | "local-tableland" | "custom"
	*/
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
			return 'goerli'
			break

		case 80001:
			return 'mumbai'
			break

		default:
			throw new Error('LIT_UNSUPPORTED_CHAIN')

		// case 421613:
		// 	return 'arbitrum-goerli'
		// 	break

		// case 1:
		// 	return 'optimism-goerli-staging'
		// 	break

		// case 1:
		// 	return 'local-tableland'
		// 	break

		// case 1:
		// 	return 'custom'
		// 	break

		// default:
		// 	throw new Error('CHAIN_NOT_SUPPORTED')
	}
}
