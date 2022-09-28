import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { assert, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { ethers } from 'hardhat'
import { deployDiamond } from '../tasks'
import { ERC721Facet } from '../typechain'

use(chaiAsPromised)

// const { deployContract, link } = waffle

describe('General MeemFacet Tests', function Test() {
	// let meemFacet: MeemBaseFacet
	let erc721Facet: ERC721Facet
	let signers: SignerWithAddress[]

	beforeEach(async () => {
		signers = await ethers.getSigners()

		const { DiamondProxy: DiamondAddress } = await deployDiamond({
			args: {
				proxy: true
			},
			ethers
		})

		// meemFacet = (await ethers.getContractAt(
		// 	'MeemBaseFacet',
		// 	DiamondAddress
		// )) as MeemBaseFacet
		erc721Facet = (await ethers.getContractAt(
			// 'ERC721Facet',
			process.env.ERC_721_FACET_NAME ?? 'ERC721Facet',
			DiamondAddress
		)) as ERC721Facet
	})

	it('Can get contractURI', async () => {
		const contractURI = await erc721Facet.contractURI()
		const json = JSON.parse(
			Buffer.from(
				contractURI.replace('data:application/json;base64,', ''),
				'base64'
			).toString('ascii')
		)
		assert.equal(json.name, 'Meem')
		assert.isAbove(json.description.length, 1)
		assert.isAbove(json.image.length, 1)
		assert.isAbove(json.image.length, 1)
		assert.equal(json.seller_fee_basis_points, 100)
		assert.equal(
			json.fee_recipient,
			'0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
		)
	})
})
