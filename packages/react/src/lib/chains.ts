export const chains = [
	{
		name: 'Ethereum Mainnet',
		chain: 'ETH',
		icon: 'ethereum',
		rpc: ['https://cloudflare-eth.com/'],
		faucets: [],
		nativeCurrency: {
			name: 'Ether',
			symbol: 'ETH',
			decimals: 18
		},
		infoURL: 'https://ethereum.org',
		shortName: 'eth',
		chainId: 1,
		networkId: 1,
		slip44: 60,
		ens: {
			registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
		},
		explorers: [
			{
				name: 'etherscan',
				url: 'https://etherscan.io',
				standard: 'EIP3091'
			}
		]
	},
	{
		name: 'Polygon Mainnet',
		chain: 'Polygon',
		rpc: [
			'https://polygon-rpc.com/',
			'https://rpc-mainnet.matic.network',
			'https://matic-mainnet.chainstacklabs.com',
			'https://rpc-mainnet.maticvigil.com',
			'https://rpc-mainnet.matic.quiknode.pro',
			'https://matic-mainnet-full-rpc.bwarelabs.com'
		],
		faucets: [],
		nativeCurrency: {
			name: 'MATIC',
			symbol: 'MATIC',
			decimals: 18
		},
		infoURL: 'https://polygon.technology/',
		shortName: 'MATIC',
		chainId: 137,
		networkId: 137,
		slip44: 966,
		explorers: [
			{
				name: 'polygonscan',
				url: 'https://polygonscan.com',
				standard: 'EIP3091'
			}
		]
	},
	{
		name: 'Optimism',
		chain: 'ETH',
		rpc: ['https://mainnet.optimism.io/'],
		faucets: [],
		nativeCurrency: {
			name: 'Ether',
			symbol: 'ETH',
			decimals: 18
		},
		infoURL: 'https://optimism.io',
		shortName: 'oeth',
		chainId: 10,
		networkId: 10,
		explorers: [
			{
				name: 'etherscan',
				url: 'https://optimistic.etherscan.io',
				standard: 'none'
			}
		]
	},
	{
		name: 'Arbitrum One',
		chainId: 42161,
		shortName: 'arb1',
		chain: 'ETH',
		networkId: 42161,
		nativeCurrency: {
			name: 'Ether',
			symbol: 'ETH',
			decimals: 18
		},
		rpc: [
			'https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}',
			'https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}',
			'https://arb1.arbitrum.io/rpc'
		],
		faucets: [],
		explorers: [
			{
				name: 'Arbiscan',
				url: 'https://arbiscan.io',
				standard: 'EIP3091'
			},
			{
				name: 'Arbitrum Explorer',
				url: 'https://explorer.arbitrum.io',
				standard: 'EIP3091'
			}
		],
		infoURL: 'https://arbitrum.io',
		parent: {
			type: 'L2',
			chain: 'eip155-1',
			bridges: [
				{
					url: 'https://bridge.arbitrum.io'
				}
			]
		}
	},
	{
		name: 'Binance Smart Chain Mainnet',
		chain: 'BSC',
		rpc: [
			'https://bsc-dataseed1.binance.org',
			'https://bsc-dataseed2.binance.org',
			'https://bsc-dataseed3.binance.org',
			'https://bsc-dataseed4.binance.org',
			'https://bsc-dataseed1.defibit.io',
			'https://bsc-dataseed2.defibit.io',
			'https://bsc-dataseed3.defibit.io',
			'https://bsc-dataseed4.defibit.io',
			'https://bsc-dataseed1.ninicoin.io',
			'https://bsc-dataseed2.ninicoin.io',
			'https://bsc-dataseed3.ninicoin.io',
			'https://bsc-dataseed4.ninicoin.io',
			'wss://bsc-ws-node.nariox.org'
		],
		faucets: ['https://free-online-app.com/faucet-for-eth-evm-chains/'],
		nativeCurrency: {
			name: 'Binance Chain Native Token',
			symbol: 'BNB',
			decimals: 18
		},
		infoURL: 'https://www.binance.org',
		shortName: 'bnb',
		chainId: 56,
		networkId: 56,
		slip44: 714,
		explorers: [
			{
				name: 'bscscan',
				url: 'https://bscscan.com',
				standard: 'EIP3091'
			}
		]
	},
	{
		name: 'Göerli',
		title: 'Ethereum Testnet Göerli',
		chain: 'ETH',
		network: 'testnet',
		rpc: ['https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
		faucets: [
			'http://fauceth.komputing.org?chain=5&address=${ADDRESS}',
			'https://goerli-faucet.slock.it?address=${ADDRESS}',
			'https://faucet.goerli.mudit.blog'
		],
		nativeCurrency: {
			name: 'Göerli Ether',
			symbol: 'gorETH',
			decimals: 18
		},
		infoURL: 'https://goerli.net/#about',
		shortName: 'gor',
		chainId: 5,
		networkId: 5,
		ens: {
			registry: '0x112234455c3a32fd11230c42e7bccd4a84e02010'
		},
		explorers: [
			{
				name: 'etherscan-goerli',
				url: 'https://goerli.etherscan.io',
				standard: 'EIP3091'
			}
		]
	},
	{
		name: 'Mumbai',
		title: 'Polygon Testnet Mumbai',
		chain: 'Polygon',
		rpc: [
			'https://matic-mumbai.chainstacklabs.com',
			'https://rpc-mumbai.maticvigil.com',
			'https://matic-testnet-archive-rpc.bwarelabs.com'
		],
		faucets: ['https://faucet.polygon.technology/'],
		nativeCurrency: {
			name: 'MATIC',
			symbol: 'mumbaiMATIC',
			decimals: 18
		},
		infoURL: 'https://polygon.technology/',
		shortName: 'maticmum',
		chainId: 80001,
		networkId: 80001,
		explorers: [
			{
				name: 'polygonscan',
				url: 'https://mumbai.polygonscan.com',
				standard: 'EIP3091'
			}
		]
	},
	{
		name: 'Arbitrum Göerli',
		title: 'Arbitrum Testnet Göerli',
		chain: 'ETH',
		network: 'testnet',
		rpc: ['https://goerli-rollup.arbitrum.io/rpc'],
		faucets: [],
		nativeCurrency: {
			name: 'Göerli Ether',
			symbol: 'gorETH',
			decimals: 18
		},
		infoURL: '',
		shortName: 'gor',
		chainId: 421613,
		networkId: 421613,
		ens: {},
		explorers: [
			{
				name: 'arbiscan-goerli',
				url: 'https://goerli-rollup-explorer.arbitrum.io/',
				standard: 'EIP3091'
			}
		],
		parent: {
			type: 'L2',
			chain: 'eip155-1',
			bridges: [
				{
					url: 'https://bridge.arbitrum.io'
				}
			]
		}
	},
	{
		name: 'Optimism Goerli',
		title: 'Optimism Testnet Goerli',
		chain: 'ETH',
		rpc: ['https://goerli.optimism.io/'],
		faucets: [],
		nativeCurrency: {
			name: 'Göerli Ether',
			symbol: 'gorETH',
			decimals: 18
		},
		infoURL: 'https://optimism.io',
		shortName: 'ogor',
		chainId: 420,
		networkId: 420
	},
	{
		name: 'Binance Smart Chain Testnet',
		chain: 'BSC',
		rpc: [
			'https://data-seed-prebsc-1-s1.binance.org:8545',
			'https://data-seed-prebsc-2-s1.binance.org:8545',
			'https://data-seed-prebsc-1-s2.binance.org:8545',
			'https://data-seed-prebsc-2-s2.binance.org:8545',
			'https://data-seed-prebsc-1-s3.binance.org:8545',
			'https://data-seed-prebsc-2-s3.binance.org:8545'
		],
		faucets: ['https://testnet.binance.org/faucet-smart'],
		nativeCurrency: {
			name: 'Binance Chain Native Token',
			symbol: 'tBNB',
			decimals: 18
		},
		infoURL: 'https://testnet.binance.org/',
		shortName: 'bnbt',
		chainId: 97,
		networkId: 97,
		explorers: [
			{
				name: 'bscscan-testnet',
				url: 'https://testnet.bscscan.com',
				standard: 'EIP3091'
			}
		]
	},
	{
		name: 'Ropsten',
		title: 'Ethereum Testnet Ropsten',
		chain: 'ETH',
		network: 'testnet',
		rpc: ['https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
		faucets: [
			'http://fauceth.komputing.org?chain=3&address=${ADDRESS}',
			'https://faucet.ropsten.be?${ADDRESS}'
		],
		nativeCurrency: {
			name: 'Ropsten Ether',
			symbol: 'ropETH',
			decimals: 18
		},
		infoURL: 'https://github.com/ethereum/ropsten',
		shortName: 'rop',
		chainId: 3,
		networkId: 3,
		ens: {
			registry: '0x112234455c3a32fd11230c42e7bccd4a84e02010'
		},
		explorers: [
			{
				name: 'etherscan',
				url: 'https://ropsten.etherscan.io',
				standard: 'EIP3091'
			}
		]
	},
	{
		name: 'Rinkeby',
		title: 'Ethereum Testnet Rinkeby',
		chain: 'ETH',
		network: 'testnet',
		rpc: ['https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
		faucets: [
			'http://fauceth.komputing.org?chain=4&address=${ADDRESS}',
			'https://faucet.rinkeby.io'
		],
		nativeCurrency: {
			name: 'Rinkeby Ether',
			symbol: 'rinkETH',
			decimals: 18
		},
		infoURL: 'https://www.rinkeby.io',
		shortName: 'rin',
		chainId: 4,
		networkId: 4,
		ens: {
			registry: '0xe7410170f87102df0055eb195163a03b7f2bff4a'
		},
		explorers: [
			{
				name: 'etherscan-rinkeby',
				url: 'https://rinkeby.etherscan.io',
				standard: 'EIP3091'
			}
		]
	}
]
