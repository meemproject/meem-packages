import { Chain } from './lib/meemStandard'

export interface IVersion {
	[facetName: string]: {
		address: string
		functionSelectors: string[]
		version?: string
	}
}

export interface IChain {
	latest: string
	beta: string
	alpha: string
	history: {
		[version: string]: IVersion
	}
}

export const versions: {
	[Chain.Polygon]: IChain
	[Chain.Rinkeby]: IChain
} = {
	[Chain.Polygon]: {
		latest: '1',
		beta: '1',
		alpha: '1',
		history: {}
	},
	[Chain.Rinkeby]: {
		latest: '4',
		beta: '4',
		alpha: '4',
		history: {
			4: {
				AccessControlFacet: {
					version: '0.1.9',
					address: '0x11714BB4996C78e9F10f129Af9bA66A865AA7Bc9',
					functionSelectors: [
						'0x75b238fc',
						'0xd5391393',
						'0xab2742dc',
						'0xac4ab3fb',
						'0x208dd1ff'
					]
				},
				ClippingFacet: {
					version: '0.1.9',
					address: '0xb9a04B53f09aD785A7C2c20c1c61656b3c5fB482',
					functionSelectors: [
						'0xe6817363',
						'0x3f590980',
						'0x27d6682a',
						'0xfa5afe76',
						'0xb5e8ed09',
						'0xd1c31b84'
					]
				},
				ERC721Facet: {
					version: '0.1.9',
					address: '0x3dc17b14aD3FE344A72E25555656A1b7D117bE76',
					functionSelectors: [
						'0x095ea7b3',
						'0x70a08231',
						'0xd547cfb7',
						'0x42966c68',
						'0xf6b4dfb4',
						'0xe8a3d485',
						'0x081812fc',
						'0xe985e9c5',
						'0x06fdde03',
						'0x150b7a02',
						'0x6352211e',
						'0xbba7723e',
						'0x42842e0e',
						'0xb88d4fde',
						'0xa22cb465',
						'0x95d89b41',
						'0x4f6ccce7',
						'0x2f745c59',
						'0xc87b56dd',
						'0x18160ddd',
						'0x23b872dd'
					]
				},
				InitDiamond: {
					version: '0.1.9',
					address: '0xa94F306517DBe156Ef23419f0DFDCB01A855deDB',
					functionSelectors: ['0xc5181017']
				},
				MeemAdminFacet: {
					version: '0.1.9',
					address: '0x850F36B28327309019f7ace6Bed2cbF3866BBf17',
					functionSelectors: [
						'0x1d38bcde',
						'0x23b0a122',
						'0xff129b7b',
						'0x7a3961a7',
						'0x2f7dfc36',
						'0xfd542635',
						'0x5946d8c6',
						'0xf76255af',
						'0x452cc947',
						'0x4c9fa6a2',
						'0x938e3d7b',
						'0x00f2b9c2',
						'0xa3b06e08',
						'0xdd86d706',
						'0xd82dcdf0',
						'0x3e189936',
						'0x62c2596a',
						'0xa3a6c076',
						'0xdcb114ec',
						'0x139fed17',
						'0xdae095ec',
						'0x413da405'
					]
				},
				MeemBaseFacet: {
					version: '0.1.9',
					address: '0xAbc6cdB8b06FD0B0D446c6f9b319db04D4779219',
					functionSelectors: ['0x87864915', '0x2f44af5c', '0xa6da9d93']
				},
				MeemPermissionsFacet: {
					version: '0.1.9',
					address: '0x0a4859462e4356B89826104812E8c0d5482F22AC',
					functionSelectors: [
						'0xb9e117b7',
						'0x0e7da4d0',
						'0x3180ecba',
						'0x00c42c55',
						'0xbf40b299',
						'0xd3e2ceb5',
						'0x4b34614d',
						'0x4da4c4e4',
						'0x5fbf2bba',
						'0xf74bee28',
						'0x6475975b',
						'0xab575fad',
						'0x18562dae',
						'0xd94e9a97',
						'0xf8cc379a',
						'0x30711ba0',
						'0x2783cf34',
						'0x57f7789e',
						'0xec9cae30',
						'0xb985ee83',
						'0x183b8a6c',
						'0x8e4ffab3',
						'0x271c0ebf'
					]
				},
				MeemQueryFacet: {
					version: '0.1.9',
					address: '0xcCf0d3d873fdF3fb45dA6454691ee41619445EeA',
					functionSelectors: [
						'0x9aa1125b',
						'0xa46d57f8',
						'0xec16d65c',
						'0x7cc1f867',
						'0x49e6aa94',
						'0xd152a499',
						'0xb77c2071',
						'0x662d5d6f',
						'0xb2afc516',
						'0x3b7c4712',
						'0x483a81d0',
						'0x04d84dd3',
						'0xb758c90d',
						'0x9e59e598',
						'0x47a8f6f3'
					]
				},
				MeemSplitsFacet: {
					version: '0.1.9',
					address: '0xA93bB861A15fB06a72EE2Abc79dD46d497D7948c',
					functionSelectors: [
						'0x81d4180a',
						'0xcad96cca',
						'0x3a708af9',
						'0x42b6c774',
						'0x0651862a',
						'0xc3f15277',
						'0x9f95c4f9'
					]
				},
				ReactionFacet: {
					version: '0.1.9',
					address: '0x6507d40b17386a749EAfd1450234eA63156b2139',
					functionSelectors: [
						'0x25b75159',
						'0x10f4af12',
						'0x6219ad0b',
						'0x96973b2a',
						'0xe107c137'
					]
				}
			},
			3: {
				AccessControlFacet: {
					version: '0.1.9',
					address: '0xD68672f16B1B28E95AEeF2BC60F359c9A67592B3',
					functionSelectors: [
						'0x75b238fc',
						'0xd5391393',
						'0xab2742dc',
						'0xac4ab3fb',
						'0x208dd1ff'
					]
				},
				ClippingFacet: {
					version: '0.1.9',
					address: '0xd97b9774d97B3f5D9c0214D1b59B7105500933bA',
					functionSelectors: [
						'0xe6817363',
						'0x3f590980',
						'0x27d6682a',
						'0xfa5afe76',
						'0xb5e8ed09',
						'0xd1c31b84'
					]
				},
				ERC721Facet: {
					version: '0.1.9',
					address: '0x272AE06243D56012c5CaCE949FFA18F351C3cD79',
					functionSelectors: [
						'0x095ea7b3',
						'0x70a08231',
						'0xd547cfb7',
						'0x42966c68',
						'0xf6b4dfb4',
						'0xe8a3d485',
						'0x081812fc',
						'0xe985e9c5',
						'0x06fdde03',
						'0x150b7a02',
						'0x6352211e',
						'0xbba7723e',
						'0x42842e0e',
						'0xb88d4fde',
						'0xa22cb465',
						'0x95d89b41',
						'0x4f6ccce7',
						'0x2f745c59',
						'0xc87b56dd',
						'0x18160ddd',
						'0x23b872dd'
					]
				},
				InitDiamond: {
					version: '0.1.9',
					address: '0x2696D4cb6875887b0A96f1E23C76814CdDBC49dc',
					functionSelectors: ['0xbd44a05e']
				},
				MeemAdminFacet: {
					version: '0.1.9',
					address: '0x4e4469cf35DbCA05063c4188D55A54158FaB41cD',
					functionSelectors: [
						'0x1d38bcde',
						'0x23b0a122',
						'0xff129b7b',
						'0x7a3961a7',
						'0x2f7dfc36',
						'0xfd542635',
						'0xf76255af',
						'0x452cc947',
						'0x4c9fa6a2',
						'0x938e3d7b',
						'0x00f2b9c2',
						'0xa3b06e08',
						'0xdd86d706',
						'0xd82dcdf0',
						'0x3e189936',
						'0x62c2596a',
						'0xdcb114ec',
						'0x139fed17',
						'0xdae095ec'
					]
				},
				MeemBaseFacet: {
					version: '0.1.9',
					address: '0xd3b9F1b2ac12563c5dE879eDc1Beb32ED79441d0',
					functionSelectors: ['0x6ad66956', '0xb49e5721', '0x6ca42009']
				},
				MeemPermissionsFacet: {
					version: '0.1.9',
					address: '0xAA4695422264863D08842c77C0f50fab0ED00d00',
					functionSelectors: [
						'0xb9e117b7',
						'0x0e7da4d0',
						'0xbf40b299',
						'0xd3e2ceb5',
						'0x4b34614d',
						'0x4da4c4e4',
						'0xf74bee28',
						'0x6475975b',
						'0xab575fad',
						'0x18562dae',
						'0x30711ba0',
						'0x2783cf34',
						'0x57f7789e',
						'0xec9cae30',
						'0xb985ee83',
						'0x8e4ffab3',
						'0x271c0ebf'
					]
				},
				MeemQueryFacet: {
					version: '0.1.9',
					address: '0x20aBa3062537391F9B722F9BFbE3d47FF49faCEf',
					functionSelectors: [
						'0x9aa1125b',
						'0xa46d57f8',
						'0xec16d65c',
						'0x49e6aa94',
						'0xd152a499',
						'0xb77c2071',
						'0x662d5d6f',
						'0xb2afc516',
						'0x3b7c4712',
						'0x483a81d0',
						'0x04d84dd3',
						'0xb758c90d',
						'0x9e59e598',
						'0x47a8f6f3'
					]
				},
				MeemSplitsFacet: {
					version: '0.1.9',
					address: '0xBA5927301A17281b945c632847a98DF5e5249Ff4',
					functionSelectors: [
						'0x81d4180a',
						'0xcad96cca',
						'0x3a708af9',
						'0x42b6c774',
						'0x0651862a',
						'0xc3f15277',
						'0x9f95c4f9'
					]
				},
				ReactionFacet: {
					version: '0.1.9',
					address: '0xA10495092158C5c9b4E7619D64B17980A87e60E7',
					functionSelectors: [
						'0x25b75159',
						'0x10f4af12',
						'0x6219ad0b',
						'0x96973b2a',
						'0xe107c137'
					]
				}
			},
			2: {
				AccessControlFacet: {
					version: '0.1.9',
					address: '0xB8DCEcbdfcFD2955bC3f9E1c88141D50f746d06A',
					functionSelectors: [
						'0x75b238fc',
						'0xd5391393',
						'0xab2742dc',
						'0xac4ab3fb',
						'0x208dd1ff'
					]
				},
				ClippingFacet: {
					version: '0.1.9',
					address: '0x3A16661FafC89d32Fe8aB27a7206b74B1B446969',
					functionSelectors: [
						'0xe6817363',
						'0x3f590980',
						'0x27d6682a',
						'0xfa5afe76',
						'0xb5e8ed09',
						'0xd1c31b84'
					]
				},
				ERC721Facet: {
					version: '0.1.9',
					address: '0x97928B73EC0f36282A86B39C749cE255b3853FBE',
					functionSelectors: [
						'0x095ea7b3',
						'0x70a08231',
						'0xd547cfb7',
						'0x42966c68',
						'0xf6b4dfb4',
						'0xe8a3d485',
						'0x081812fc',
						'0xe985e9c5',
						'0x06fdde03',
						'0x150b7a02',
						'0x6352211e',
						'0xbba7723e',
						'0x42842e0e',
						'0xb88d4fde',
						'0xa22cb465',
						'0x95d89b41',
						'0x4f6ccce7',
						'0x2f745c59',
						'0xc87b56dd',
						'0x18160ddd',
						'0x23b872dd'
					]
				},
				InitDiamond: {
					version: '0.1.9',
					address: '0xA11611702a9120c9B59ED0CF11303c9112958444',
					functionSelectors: ['0xbd44a05e']
				},
				MeemAdminFacet: {
					version: '0.1.9',
					address: '0xd252ab30e4Ccd5d2aa912067498Abb888e0f2d19',
					functionSelectors: [
						'0x452cc947',
						'0x938e3d7b',
						'0xa3b06e08',
						'0x3e189936',
						'0xdcb114ec',
						'0x139fed17'
					]
				},
				MeemBaseFacet: {
					version: '0.1.9',
					address: '0x0F3B0D17F272770868A4f2e71693fb6f1ACF29AA',
					functionSelectors: ['0x6ad66956', '0xb49e5721', '0x6ca42009']
				},
				MeemPermissionsFacet: {
					version: '0.1.9',
					address: '0x6CB4963DFdd4D6EE3B40c972b0668e060aB37fCD',
					functionSelectors: [
						'0xb9e117b7',
						'0x0e7da4d0',
						'0xbf40b299',
						'0xd3e2ceb5',
						'0x4b34614d',
						'0x4da4c4e4',
						'0xf74bee28',
						'0x6475975b',
						'0xab575fad',
						'0x18562dae',
						'0x30711ba0',
						'0x2783cf34',
						'0x57f7789e',
						'0xec9cae30',
						'0xb985ee83',
						'0x8e4ffab3',
						'0x271c0ebf'
					]
				},
				MeemQueryFacet: {
					version: '0.1.9',
					address: '0x5257534B623139Fe843e35B01F3A3d590A69bBF9',
					functionSelectors: [
						'0x9aa1125b',
						'0xa46d57f8',
						'0xd152a499',
						'0xb77c2071',
						'0x662d5d6f',
						'0xb2afc516',
						'0x3b7c4712',
						'0x483a81d0',
						'0x04d84dd3',
						'0xb758c90d',
						'0x9e59e598',
						'0x47a8f6f3'
					]
				},
				MeemSplitsFacet: {
					version: '0.1.9',
					address: '0x19efe47ef4A098ff9fd36a4EaCB4A25540Cc2C19',
					functionSelectors: [
						'0x81d4180a',
						'0xcad96cca',
						'0x3a708af9',
						'0x42b6c774',
						'0x0651862a',
						'0xc3f15277',
						'0x9f95c4f9'
					]
				},
				ReactionFacet: {
					version: '0.1.9',
					address: '0x089b59e597526f4835ed272bb3894f812C4b8613',
					functionSelectors: [
						'0x25b75159',
						'0x10f4af12',
						'0x6219ad0b',
						'0x96973b2a',
						'0xe107c137'
					]
				}
			},
			1: {
				AccessControlFacet: {
					version: '0.1.7',
					address: '0x2088F8c76DAd4E901c8D9959a70A110Ce1446ff4',
					functionSelectors: [
						'0x75b238fc',
						'0xd5391393',
						'0xab2742dc',
						'0xac4ab3fb',
						'0x208dd1ff'
					]
				},
				ClippingFacet: {
					version: '0.1.7',
					address: '0xb90bcf8F304221edD9910B334662D6F29cd60989',
					functionSelectors: [
						'0xe6817363',
						'0x3f590980',
						'0x27d6682a',
						'0xfa5afe76',
						'0xb5e8ed09',
						'0xd1c31b84'
					]
				},
				ERC721Facet: {
					version: '0.1.7',
					address: '0x9e94cD168fCf7df55cA3080a18f9f5cF09E89d2C',
					functionSelectors: [
						'0x095ea7b3',
						'0x70a08231',
						'0xd547cfb7',
						'0x42966c68',
						'0xf6b4dfb4',
						'0xe8a3d485',
						'0x081812fc',
						'0xe985e9c5',
						'0x06fdde03',
						'0x150b7a02',
						'0x6352211e',
						'0xbba7723e',
						'0x42842e0e',
						'0xb88d4fde',
						'0xa22cb465',
						'0x95d89b41',
						'0x4f6ccce7',
						'0x2f745c59',
						'0xc87b56dd',
						'0x18160ddd',
						'0x23b872dd'
					]
				},
				InitDiamond: {
					version: '0.1.7',
					address: '0x98eb89D326bC3ea6f1f4baC1CFB47ACB94d8263E',
					functionSelectors: ['0xbd44a05e']
				},
				MeemAdminFacet: {
					version: '0.1.7',
					address: '0xC9b8886a77E90A8356e152433031E5a7b6c75D95',
					functionSelectors: [
						'0x452cc947',
						'0x938e3d7b',
						'0xa3b06e08',
						'0x3e189936',
						'0xdcb114ec',
						'0x139fed17'
					]
				},
				MeemBaseFacet: {
					version: '0.1.7',
					address: '0xba1b8F2e900Cbf1bb2a1060550cBefD23F2e1DDb',
					functionSelectors: ['0x6ad66956', '0xb49e5721', '0x6ca42009']
				},
				MeemPermissionsFacet: {
					version: '0.1.7',
					address: '0x9ec285a5Ed58460c21F0C569e668b0aF880785Be',
					functionSelectors: [
						'0xb9e117b7',
						'0x0e7da4d0',
						'0xbf40b299',
						'0xd3e2ceb5',
						'0x4b34614d',
						'0x4da4c4e4',
						'0xf74bee28',
						'0x6475975b',
						'0xab575fad',
						'0x18562dae',
						'0x30711ba0',
						'0x2783cf34',
						'0x57f7789e',
						'0xec9cae30',
						'0xb985ee83',
						'0x8e4ffab3',
						'0x271c0ebf'
					]
				},
				MeemQueryFacet: {
					version: '0.1.7',
					address: '0xfa29071251b2585470Dc13b7Bd8d44464f7c5edb',
					functionSelectors: [
						'0x9aa1125b',
						'0xa46d57f8',
						'0xd152a499',
						'0xb77c2071',
						'0x662d5d6f',
						'0xb2afc516',
						'0x3b7c4712',
						'0x483a81d0',
						'0x04d84dd3',
						'0xb758c90d',
						'0x9e59e598',
						'0x47a8f6f3'
					]
				},
				MeemSplitsFacet: {
					version: '0.1.7',
					address: '0x91Bf0ff21123c2ebB8F8F605a129631559a59156',
					functionSelectors: [
						'0x81d4180a',
						'0xcad96cca',
						'0x3a708af9',
						'0x42b6c774',
						'0x0651862a',
						'0xc3f15277',
						'0x9f95c4f9'
					]
				},
				ReactionFacet: {
					version: '0.1.7',
					address: '0x6d50Ac827FB159E9B76c5FBEb93d1BD62274fAd9',
					functionSelectors: [
						'0x25b75159',
						'0x10f4af12',
						'0x6219ad0b',
						'0x96973b2a',
						'0xe107c137'
					]
				}
			}
		}
	}
}
