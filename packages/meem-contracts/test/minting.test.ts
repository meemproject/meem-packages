import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { assert, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { ethers } from 'hardhat'
import _ from 'lodash'
import { TokenType, UriSource } from '../src/lib/meemStandard'
import { deployDiamond } from '../tasks'
import { getMeemContracts, MeemContracts } from './helpers'

use(chaiAsPromised)

// !! These deploy tests are VERY slow to execute (call the diamondCut function) if run using vscode launch with debugger. why?!?
describe('Minting', function Test() {
	let contracts: MeemContracts
	let signers: SignerWithAddress[]
	let contractAddress: string
	// const ipfsURL = 'ipfs://QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/1'
	// const owner = '0xde19C037a85A609ec33Fc747bE9Db8809175C3a5'
	// const nftAddress = '0xaF7Cc059196a09f50632372893617376dAfADFF2'
	// const token0 = 100000

	const contractURI = `{"name": "Meem","description": "Meems are pieces of digital content wrapped in more advanced dynamic property rights.","image": "https://meem-assets.s3.amazonaws.com/meem.jpg","external_link": "https://meem.wtf","seller_fee_basis_points": 0, "fee_recipient": ""}`

	before(async () => {
		signers = await ethers.getSigners()
		const { DiamondProxy } = await deployDiamond({
			args: {
				proxy: true
			},
			ethers
		})

		contractAddress = DiamondProxy

		contracts = await getMeemContracts(DiamondProxy)
	})

	it('Can mint with http uri', async () => {
		await contracts.meemBaseERC721Facet.connect(signers[3]).mint({
			to: signers[3].address,
			tokenType: TokenType.Original,
			tokenURI: 'https://example.com'
		})

		const tokenUri = await contracts.meemBaseERC721Facet.tokenURI(1)
		assert.equal(tokenUri, 'https://example.com')
		const owner = await contracts.meemBaseERC721Facet.ownerOf(1)
		assert.equal(owner, signers[3].address)
	})

	it('Can mint with json encoded uri', async () => {
		await contracts.meemBaseERC721Facet.connect(signers[3]).mint({
			to: signers[3].address,
			tokenType: TokenType.Original,
			tokenURI: JSON.stringify({
				name: 'Testing'
			})
		})

		const tokenUri = await contracts.meemBaseERC721Facet.tokenURI(2)
		assert.equal(
			tokenUri,
			'data:application/json;base64,eyJuYW1lIjoiVGVzdGluZyJ9'
		)
		const owner = await contracts.meemBaseERC721Facet.ownerOf(2)
		assert.equal(owner, signers[3].address)
	})
})
