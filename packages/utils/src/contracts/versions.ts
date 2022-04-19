export interface IVersion {
	[facetName: string]: {
		address: string
		functionSelectors: string[]
	}
}

export const versions = {
	v1: {
		AccessControlFacet: {
			address: '0x586B26DF0C9a6F2C1e7661E8E189d37E2D977b8d',
			functionSelectors: [
				'0x75b238fc',
				'0xd5391393',
				'0xab2742dc',
				'0xac4ab3fb',
				'0x208dd1ff'
			]
		},
		ClippingFacet: {
			address: '0xDBf9d0854Ea196484F214FB426aAF8d6691bf334',
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
			address: '0x2315fFA39e4c1f210395a61E45BF90D83b94732B',
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
			address: '0x022Ee7Ebd34e571f1d8977c3f4d5645d4470c3f3',
			functionSelectors: ['0xc6a8cfec']
		},
		MeemAdminFacet: {
			address: '0x11f174CDD050007C69f0d355766ac428DB95EC35',
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
			address: '0x5aAF0853F319860eD0d81ca1eb4788917E492eD3',
			functionSelectors: ['0x3fd53d2a', '0x9ae82538', '0x2e57a69e']
		},
		MeemPermissionsFacet: {
			address: '0xA901A3D4909480F5f4ACD8CB88Dfe721460b53Bd',
			functionSelectors: [
				'0x0e7da4d0',
				'0xbf40b299',
				'0xd3e2ceb5',
				'0x4b34614d',
				'0x4da4c4e4',
				'0xf74bee28',
				'0x6475975b',
				'0xab575fad',
				'0x18562dae',
				'0x2783cf34',
				'0x57f7789e',
				'0xec9cae30',
				'0xb985ee83',
				'0x8e4ffab3',
				'0xb9e117b7',
				'0x30711ba0',
				'0x271c0ebf'
			]
		},
		MeemQueryFacet: {
			address: '0x10f9DcB4Eb548AC0039CAf37fDD66a63811557fb',
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
			address: '0x048DCbF361f65e3335a734a7513b1457b6d336dD',
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
			address: '0x5f829b65606Eff567e3DaE640f99e2fE8eBac29a',
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
