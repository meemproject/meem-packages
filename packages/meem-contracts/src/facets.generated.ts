/* eslint-disable */
// !! GENERATED FILE !! DO NOT EDIT MANUALLY

import { Chain } from './lib/meemStandard'

export interface IVersion {
	[facetName: string]: {
		address: string
		functionSelectors: string[]
		version?: string
		previousDeploys?: string[]
	}
}

export const facets: {
	[Chain.Polygon]: {
		[version: string]: IVersion
	}
	[Chain.Rinkeby]: {
		[version: string]: IVersion
	}
} = {"1":{"1":{"AccessControlFacet":{"version":"0.4.3","address":"0xC508cDcc24761d6aAc73C6A0C16bb7ECbde2BD42","functionSelectors":["0x75b238fc","0xd5391393","0xab2742dc","0xac4ab3fb","0x208dd1ff"],"previousDeploys":[]},"ClippingFacet":{"version":"0.4.3","address":"0x501a5C92d278dF1003d9a5096f2935b42ac5E95d","functionSelectors":["0xe6817363","0x3f590980","0x27d6682a","0xfa5afe76","0xb5e8ed09","0xd1c31b84"],"previousDeploys":[]},"ERC721Facet":{"version":"0.4.3","address":"0xA74999ddDfC9b16f647157130a054BB28439E63B","functionSelectors":["0x095ea7b3","0x70a08231","0xd547cfb7","0x42966c68","0xf6b4dfb4","0xe8a3d485","0x081812fc","0xe985e9c5","0x06fdde03","0x150b7a02","0x6352211e","0xbba7723e","0x42842e0e","0xb88d4fde","0xa22cb465","0x95d89b41","0x4f6ccce7","0x2f745c59","0xc87b56dd","0x18160ddd","0x23b872dd"],"previousDeploys":[]},"InitDiamond":{"version":"0.4.3","address":"0xC35798e4324657d06c708d38E17FcCD52e8a7D4A","functionSelectors":["0xc5181017"],"previousDeploys":[]},"MeemAdminFacet":{"version":"0.4.3","address":"0x7aA56375c7ff50B67344Ada96a977B62eE79881c","functionSelectors":["0x1d38bcde","0x23b0a122","0xff129b7b","0x7a3961a7","0x2f7dfc36","0xfd542635","0x5946d8c6","0xdcd673e7","0xf76255af","0x452cc947","0x4c9fa6a2","0x938e3d7b","0x00f2b9c2","0xdd86d706","0xd82dcdf0","0x3e189936","0x62c2596a","0xa3a6c076","0xdcb114ec","0x139fed17","0xdae095ec","0x413da405"],"previousDeploys":[]},"MeemBaseFacet":{"version":"0.4.3","address":"0xc4A383d1Fd38EDe98F032759CE7Ed8f3F10c82B0","functionSelectors":["0xe3ad90cf","0x692dfc44","0xb84a24d6"],"previousDeploys":[]},"MeemPermissionsFacet":{"version":"0.4.3","address":"0x4149Fcb0A1A6A5ECcB313bF76211f895BB4FA8Df","functionSelectors":["0xb9e117b7","0x0e7da4d0","0x3180ecba","0x00c42c55","0xbf40b299","0xd3e2ceb5","0x4b34614d","0x4da4c4e4","0x5fbf2bba","0xf74bee28","0x6475975b","0xab575fad","0x18562dae","0xd94e9a97","0xf8cc379a","0x30711ba0","0x2783cf34","0x57f7789e","0xec9cae30","0xb985ee83","0x183b8a6c","0x8e4ffab3","0x271c0ebf"],"previousDeploys":[]},"MeemQueryFacet":{"version":"0.4.3","address":"0x745b4d28d17072C20034e8AeF06F1A3FAf9B8ba4","functionSelectors":["0x9aa1125b","0xa46d57f8","0xec16d65c","0x7cc1f867","0x49e6aa94","0xd152a499","0x116aa52f","0xb77c2071","0x662d5d6f","0xb2afc516","0x3b7c4712","0x483a81d0","0x04d84dd3","0xb758c90d","0x9e59e598","0x47a8f6f3"],"previousDeploys":[]},"MeemSplitsFacet":{"version":"0.4.3","address":"0x0A6353536B808D0843361AA7B905DD3303c89d26","functionSelectors":["0x81d4180a","0xcad96cca","0x3a708af9","0x42b6c774","0x0651862a","0xc3f15277","0x9f95c4f9"],"previousDeploys":[]},"ReactionFacet":{"version":"0.4.3","address":"0xE853a0cA334907081DAF31c48A62bD7a769aeC6B","functionSelectors":["0x25b75159","0x10f4af12","0x6219ad0b","0x96973b2a","0xe107c137"],"previousDeploys":[]}}},"4":{"1":{"AccessControlFacet":{"version":"0.1.9","address":"0x11714BB4996C78e9F10f129Af9bA66A865AA7Bc9","functionSelectors":["0x75b238fc","0xd5391393","0xab2742dc","0xac4ab3fb","0x208dd1ff"],"previousDeploys":[]},"ClippingFacet":{"version":"0.1.9","address":"0xb9a04B53f09aD785A7C2c20c1c61656b3c5fB482","functionSelectors":["0xe6817363","0x3f590980","0x27d6682a","0xfa5afe76","0xb5e8ed09","0xd1c31b84"],"previousDeploys":[]},"ERC721Facet":{"version":"0.1.9","address":"0x3dc17b14aD3FE344A72E25555656A1b7D117bE76","functionSelectors":["0x095ea7b3","0x70a08231","0xd547cfb7","0x42966c68","0xf6b4dfb4","0xe8a3d485","0x081812fc","0xe985e9c5","0x06fdde03","0x150b7a02","0x6352211e","0xbba7723e","0x42842e0e","0xb88d4fde","0xa22cb465","0x95d89b41","0x4f6ccce7","0x2f745c59","0xc87b56dd","0x18160ddd","0x23b872dd"],"previousDeploys":[]},"InitDiamond":{"version":"0.1.9","address":"0xa94F306517DBe156Ef23419f0DFDCB01A855deDB","functionSelectors":["0xc5181017"],"previousDeploys":[]},"MeemAdminFacet":{"version":"0.1.9","address":"0x850F36B28327309019f7ace6Bed2cbF3866BBf17","functionSelectors":["0x1d38bcde","0x23b0a122","0xff129b7b","0x7a3961a7","0x2f7dfc36","0xfd542635","0x5946d8c6","0xf76255af","0x452cc947","0x4c9fa6a2","0x938e3d7b","0x00f2b9c2","0xa3b06e08","0xdd86d706","0xd82dcdf0","0x3e189936","0x62c2596a","0xa3a6c076","0xdcb114ec","0x139fed17","0xdae095ec","0x413da405"],"previousDeploys":[]},"MeemBaseFacet":{"version":"0.1.9","address":"0xAbc6cdB8b06FD0B0D446c6f9b319db04D4779219","functionSelectors":["0x87864915","0x2f44af5c","0xa6da9d93"],"previousDeploys":[]},"MeemPermissionsFacet":{"version":"0.1.9","address":"0x0a4859462e4356B89826104812E8c0d5482F22AC","functionSelectors":["0xb9e117b7","0x0e7da4d0","0x3180ecba","0x00c42c55","0xbf40b299","0xd3e2ceb5","0x4b34614d","0x4da4c4e4","0x5fbf2bba","0xf74bee28","0x6475975b","0xab575fad","0x18562dae","0xd94e9a97","0xf8cc379a","0x30711ba0","0x2783cf34","0x57f7789e","0xec9cae30","0xb985ee83","0x183b8a6c","0x8e4ffab3","0x271c0ebf"],"previousDeploys":[]},"MeemQueryFacet":{"version":"0.1.9","address":"0xcCf0d3d873fdF3fb45dA6454691ee41619445EeA","functionSelectors":["0x9aa1125b","0xa46d57f8","0xec16d65c","0x7cc1f867","0x49e6aa94","0xd152a499","0xb77c2071","0x662d5d6f","0xb2afc516","0x3b7c4712","0x483a81d0","0x04d84dd3","0xb758c90d","0x9e59e598","0x47a8f6f3"],"previousDeploys":[]},"MeemSplitsFacet":{"version":"0.1.9","address":"0xA93bB861A15fB06a72EE2Abc79dD46d497D7948c","functionSelectors":["0x81d4180a","0xcad96cca","0x3a708af9","0x42b6c774","0x0651862a","0xc3f15277","0x9f95c4f9"],"previousDeploys":[]},"ReactionFacet":{"version":"0.1.9","address":"0x6507d40b17386a749EAfd1450234eA63156b2139","functionSelectors":["0x25b75159","0x10f4af12","0x6219ad0b","0x96973b2a","0xe107c137"],"previousDeploys":[]}},"2":{"AccessControlFacet":{"version":"0.3.0","address":"0x7E7bF8e92218925fa90671b09B28D790431F2bac","functionSelectors":["0x75b238fc","0xd5391393","0xab2742dc","0xac4ab3fb","0x208dd1ff"],"previousDeploys":[]},"ClippingFacet":{"version":"0.3.0","address":"0xe0161dC65529bACeDc770e1C4f7920dA7625ea0F","functionSelectors":["0xe6817363","0x3f590980","0x27d6682a","0xfa5afe76","0xb5e8ed09","0xd1c31b84"],"previousDeploys":[]},"ERC721Facet":{"version":"0.3.0","address":"0x2209C67472187C5137D58830195073F319b36cDd","functionSelectors":["0x095ea7b3","0x70a08231","0xd547cfb7","0x42966c68","0xf6b4dfb4","0xe8a3d485","0x081812fc","0xe985e9c5","0x06fdde03","0x150b7a02","0x6352211e","0xbba7723e","0x42842e0e","0xb88d4fde","0xa22cb465","0x95d89b41","0x4f6ccce7","0x2f745c59","0xc87b56dd","0x18160ddd","0x23b872dd"],"previousDeploys":[]},"InitDiamond":{"version":"0.3.0","address":"0x0C19138707D1E621aE76eAeAB3e2D0eF1CBFA865","functionSelectors":["0xc5181017"],"previousDeploys":[]},"MeemAdminFacet":{"version":"0.3.0","address":"0x2fBD0Dad1281a542B092be518d76726c773056b8","functionSelectors":["0x1d38bcde","0x23b0a122","0xff129b7b","0x7a3961a7","0x2f7dfc36","0xfd542635","0x5946d8c6","0xdcd673e7","0xf76255af","0x452cc947","0x4c9fa6a2","0x938e3d7b","0x00f2b9c2","0xa3b06e08","0xdd86d706","0xd82dcdf0","0x3e189936","0x62c2596a","0xa3a6c076","0xdcb114ec","0x139fed17","0xdae095ec","0x413da405"],"previousDeploys":[]},"MeemBaseFacet":{"version":"0.3.0","address":"0xa76784a82a0191b10E0d6Ea73564Bd8022d5751F","functionSelectors":["0x87864915","0x2f44af5c","0xa6da9d93"],"previousDeploys":[]},"MeemPermissionsFacet":{"version":"0.3.0","address":"0xFA01D8e49d9624560B79b40FF42e16821db87E88","functionSelectors":["0xb9e117b7","0x0e7da4d0","0x3180ecba","0x00c42c55","0xbf40b299","0xd3e2ceb5","0x4b34614d","0x4da4c4e4","0x5fbf2bba","0xf74bee28","0x6475975b","0xab575fad","0x18562dae","0xd94e9a97","0xf8cc379a","0x30711ba0","0x2783cf34","0x57f7789e","0xec9cae30","0xb985ee83","0x183b8a6c","0x8e4ffab3","0x271c0ebf"],"previousDeploys":[]},"MeemQueryFacet":{"version":"0.3.0","address":"0x3e7f2E46F1c554dF3E3287b68E5Ef0AA31027107","functionSelectors":["0x9aa1125b","0xa46d57f8","0xec16d65c","0x7cc1f867","0x49e6aa94","0xd152a499","0x116aa52f","0xb77c2071","0x662d5d6f","0xb2afc516","0x3b7c4712","0x483a81d0","0x04d84dd3","0xb758c90d","0x9e59e598","0x47a8f6f3"],"previousDeploys":[]},"MeemSplitsFacet":{"version":"0.3.0","address":"0xa5597E2939A9a414DfbEAEBf9B26aDD10817ae3C","functionSelectors":["0x81d4180a","0xcad96cca","0x3a708af9","0x42b6c774","0x0651862a","0xc3f15277","0x9f95c4f9"],"previousDeploys":[]},"ReactionFacet":{"version":"0.3.0","address":"0xa09Ca1D4eA5fAcC7467fe1795F666A5eDbC06b99","functionSelectors":["0x25b75159","0x10f4af12","0x6219ad0b","0x96973b2a","0xe107c137"],"previousDeploys":[]}},"3":{"AccessControlFacet":{"version":"0.4.1","address":"0x8D5e6f772679cF7A39fB22EF8b52B6B43e16A11a","functionSelectors":["0x75b238fc","0xd5391393","0xab2742dc","0xac4ab3fb","0x208dd1ff"],"previousDeploys":[]},"ClippingFacet":{"version":"0.4.1","address":"0xa82c6B637720A84920E91E1D9aEEA480E5C7E48C","functionSelectors":["0xe6817363","0x3f590980","0x27d6682a","0xfa5afe76","0xb5e8ed09","0xd1c31b84"],"previousDeploys":[]},"ERC721Facet":{"version":"0.4.1","address":"0xE7eFDebBB80a0459867e09e481B0126E3Da9Bf69","functionSelectors":["0x095ea7b3","0x70a08231","0xd547cfb7","0x42966c68","0xf6b4dfb4","0xe8a3d485","0x081812fc","0xe985e9c5","0x06fdde03","0x150b7a02","0x6352211e","0xbba7723e","0x42842e0e","0xb88d4fde","0xa22cb465","0x95d89b41","0x4f6ccce7","0x2f745c59","0xc87b56dd","0x18160ddd","0x23b872dd"],"previousDeploys":[]},"InitDiamond":{"version":"0.4.1","address":"0x07EbdF77a252BC47e0216B3bFa5281Ba688B6b58","functionSelectors":["0xc5181017"],"previousDeploys":[]},"MeemAdminFacet":{"version":"0.4.1","address":"0xe7716733788559037426E27ffe7F2e457f3b8353","functionSelectors":["0x1d38bcde","0x23b0a122","0xff129b7b","0x7a3961a7","0x2f7dfc36","0xfd542635","0x5946d8c6","0xdcd673e7","0xf76255af","0x452cc947","0x4c9fa6a2","0x938e3d7b","0x00f2b9c2","0xdd86d706","0xd82dcdf0","0x3e189936","0x62c2596a","0xa3a6c076","0xdcb114ec","0x139fed17","0xdae095ec","0x413da405"],"previousDeploys":[]},"MeemBaseFacet":{"version":"0.4.1","address":"0x4959234130DcE803fd1177810193138266844933","functionSelectors":["0xe3ad90cf","0x692dfc44","0xb84a24d6"],"previousDeploys":[]},"MeemPermissionsFacet":{"version":"0.4.1","address":"0xF4ac24C6F0F148Cd923C716A6647da0851AFa5Ca","functionSelectors":["0xb9e117b7","0x0e7da4d0","0x3180ecba","0x00c42c55","0xbf40b299","0xd3e2ceb5","0x4b34614d","0x4da4c4e4","0x5fbf2bba","0xf74bee28","0x6475975b","0xab575fad","0x18562dae","0xd94e9a97","0xf8cc379a","0x30711ba0","0x2783cf34","0x57f7789e","0xec9cae30","0xb985ee83","0x183b8a6c","0x8e4ffab3","0x271c0ebf"],"previousDeploys":[]},"MeemQueryFacet":{"version":"0.4.1","address":"0xaa8791931C4C2c514D21E29ee5BE855d93E52405","functionSelectors":["0x9aa1125b","0xa46d57f8","0xec16d65c","0x7cc1f867","0x49e6aa94","0xd152a499","0x116aa52f","0xb77c2071","0x662d5d6f","0xb2afc516","0x3b7c4712","0x483a81d0","0x04d84dd3","0xb758c90d","0x9e59e598","0x47a8f6f3"],"previousDeploys":[]},"MeemSplitsFacet":{"version":"0.4.1","address":"0x9762F494b3925D515F55d61f2502ba2308DDDeE2","functionSelectors":["0x81d4180a","0xcad96cca","0x3a708af9","0x42b6c774","0x0651862a","0xc3f15277","0x9f95c4f9"],"previousDeploys":[]},"ReactionFacet":{"version":"0.4.1","address":"0x0501A983207cbD7641C6ea9A469c5346B8078785","functionSelectors":["0x25b75159","0x10f4af12","0x6219ad0b","0x96973b2a","0xe107c137"],"previousDeploys":[]}},"4":{"AccessControlFacet":{"version":"0.4.3","address":"0xAB98CB0107C144aB73222bEfDcfA126ce8b1b66C","functionSelectors":["0x75b238fc","0xd5391393","0xab2742dc","0xac4ab3fb","0x208dd1ff"],"previousDeploys":[]},"ClippingFacet":{"version":"0.4.3","address":"0x0239B963C86a79dEaCBEdA7B3AccE2721dA5e639","functionSelectors":["0xe6817363","0x3f590980","0x27d6682a","0xfa5afe76","0xb5e8ed09","0xd1c31b84"],"previousDeploys":[]},"ERC721Facet":{"version":"0.4.3","address":"0xC7B384a2F85894E0850Fa7705CB9E5e60afaae7F","functionSelectors":["0x095ea7b3","0x70a08231","0xd547cfb7","0x42966c68","0xf6b4dfb4","0xe8a3d485","0x081812fc","0xe985e9c5","0x06fdde03","0x150b7a02","0x6352211e","0xbba7723e","0x42842e0e","0xb88d4fde","0xa22cb465","0x95d89b41","0x4f6ccce7","0x2f745c59","0xc87b56dd","0x18160ddd","0x23b872dd"],"previousDeploys":[]},"InitDiamond":{"version":"0.4.3","address":"0x83Ac9cb100976357848a4655EDE87C5A86129e4B","functionSelectors":["0xc5181017"],"previousDeploys":[]},"MeemAdminFacet":{"version":"0.4.3","address":"0xa3848f8FCD9964da846427B44c83E582bdd25b0c","functionSelectors":["0x1d38bcde","0x23b0a122","0xff129b7b","0x7a3961a7","0x2f7dfc36","0xfd542635","0x5946d8c6","0xdcd673e7","0xf76255af","0x452cc947","0x4c9fa6a2","0x938e3d7b","0x00f2b9c2","0xdd86d706","0xd82dcdf0","0x3e189936","0x62c2596a","0xa3a6c076","0xdcb114ec","0x139fed17","0xdae095ec","0x413da405"],"previousDeploys":[]},"MeemBaseFacet":{"version":"0.4.3","address":"0x299898205e582E6F4F07aE90F5C1a3ba8415e5FB","functionSelectors":["0xe3ad90cf","0x692dfc44","0xb84a24d6"],"previousDeploys":[]},"MeemPermissionsFacet":{"version":"0.4.3","address":"0xF3f33868B5c64f2C74a885D28B6066e72045f234","functionSelectors":["0xb9e117b7","0x0e7da4d0","0x3180ecba","0x00c42c55","0xbf40b299","0xd3e2ceb5","0x4b34614d","0x4da4c4e4","0x5fbf2bba","0xf74bee28","0x6475975b","0xab575fad","0x18562dae","0xd94e9a97","0xf8cc379a","0x30711ba0","0x2783cf34","0x57f7789e","0xec9cae30","0xb985ee83","0x183b8a6c","0x8e4ffab3","0x271c0ebf"],"previousDeploys":[]},"MeemQueryFacet":{"version":"0.4.3","address":"0x1a26a4c936B53Cb6cCfA0ff56D8250c29a48d3bA","functionSelectors":["0x9aa1125b","0xa46d57f8","0xec16d65c","0x7cc1f867","0x49e6aa94","0xd152a499","0x116aa52f","0xb77c2071","0x662d5d6f","0xb2afc516","0x3b7c4712","0x483a81d0","0x04d84dd3","0xb758c90d","0x9e59e598","0x47a8f6f3"],"previousDeploys":[]},"MeemSplitsFacet":{"version":"0.4.3","address":"0x0CfABEe2C2A50fe47571D6C7d2981d86e4D34B6d","functionSelectors":["0x81d4180a","0xcad96cca","0x3a708af9","0x42b6c774","0x0651862a","0xc3f15277","0x9f95c4f9"],"previousDeploys":[]},"ReactionFacet":{"version":"0.4.3","address":"0x2FD0dE5276d95Ff875Fb575a689A17cD5E2d7334","functionSelectors":["0x25b75159","0x10f4af12","0x6219ad0b","0x96973b2a","0xe107c137"],"previousDeploys":[]}},"5":{"AccessControlFacet":{"version":"0.4.3","address":"0xAB98CB0107C144aB73222bEfDcfA126ce8b1b66C","functionSelectors":["0x75b238fc","0xd5391393","0xab2742dc","0xac4ab3fb","0x208dd1ff"],"previousDeploys":[]},"ClippingFacet":{"version":"0.4.3","address":"0x0239B963C86a79dEaCBEdA7B3AccE2721dA5e639","functionSelectors":["0xe6817363","0x3f590980","0x27d6682a","0xfa5afe76","0xb5e8ed09","0xd1c31b84"],"previousDeploys":[]},"ERC721Facet":{"version":"0.4.3","address":"0xC7B384a2F85894E0850Fa7705CB9E5e60afaae7F","functionSelectors":["0x095ea7b3","0x70a08231","0xd547cfb7","0x42966c68","0xf6b4dfb4","0xe8a3d485","0x081812fc","0xe985e9c5","0x06fdde03","0x150b7a02","0x6352211e","0xbba7723e","0x42842e0e","0xb88d4fde","0xa22cb465","0x95d89b41","0x4f6ccce7","0x2f745c59","0xc87b56dd","0x18160ddd","0x23b872dd"],"previousDeploys":[]},"InitDiamond":{"version":"0.4.3","address":"0x83Ac9cb100976357848a4655EDE87C5A86129e4B","functionSelectors":["0xc5181017"],"previousDeploys":[]},"MeemAdminFacet":{"version":"0.4.3","address":"0xa3848f8FCD9964da846427B44c83E582bdd25b0c","functionSelectors":["0x1d38bcde","0x23b0a122","0xff129b7b","0x7a3961a7","0x2f7dfc36","0xfd542635","0x5946d8c6","0xdcd673e7","0xf76255af","0x452cc947","0x4c9fa6a2","0x938e3d7b","0x00f2b9c2","0xdd86d706","0xd82dcdf0","0x3e189936","0x62c2596a","0xa3a6c076","0xdcb114ec","0x139fed17","0xdae095ec","0x413da405"],"previousDeploys":[]},"MeemBaseFacet":{"version":"0.4.3","address":"0x299898205e582E6F4F07aE90F5C1a3ba8415e5FB","functionSelectors":["0xe3ad90cf","0x692dfc44","0xb84a24d6"],"previousDeploys":[]},"MeemPermissionsFacet":{"version":"0.4.3","address":"0xF3f33868B5c64f2C74a885D28B6066e72045f234","functionSelectors":["0xb9e117b7","0x0e7da4d0","0x3180ecba","0x00c42c55","0xbf40b299","0xd3e2ceb5","0x4b34614d","0x4da4c4e4","0x5fbf2bba","0xf74bee28","0x6475975b","0xab575fad","0x18562dae","0xd94e9a97","0xf8cc379a","0x30711ba0","0x2783cf34","0x57f7789e","0xec9cae30","0xb985ee83","0x183b8a6c","0x8e4ffab3","0x271c0ebf"],"previousDeploys":[]},"MeemQueryFacet":{"version":"0.4.3","address":"0x1a26a4c936B53Cb6cCfA0ff56D8250c29a48d3bA","functionSelectors":["0x9aa1125b","0xa46d57f8","0xec16d65c","0x7cc1f867","0x49e6aa94","0xd152a499","0x116aa52f","0xb77c2071","0x662d5d6f","0xb2afc516","0x3b7c4712","0x483a81d0","0x04d84dd3","0xb758c90d","0x9e59e598","0x47a8f6f3"],"previousDeploys":[]},"MeemSplitsFacet":{"version":"0.4.3","address":"0x0CfABEe2C2A50fe47571D6C7d2981d86e4D34B6d","functionSelectors":["0x81d4180a","0xcad96cca","0x3a708af9","0x42b6c774","0x0651862a","0xc3f15277","0x9f95c4f9"],"previousDeploys":[]},"ReactionFacet":{"version":"0.4.3","address":"0x2FD0dE5276d95Ff875Fb575a689A17cD5E2d7334","functionSelectors":["0x25b75159","0x10f4af12","0x6219ad0b","0x96973b2a","0xe107c137"],"previousDeploys":[]}}}}