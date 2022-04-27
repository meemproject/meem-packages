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
		latest: '1',
		beta: '2',
		alpha: '2',
		history: {
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
