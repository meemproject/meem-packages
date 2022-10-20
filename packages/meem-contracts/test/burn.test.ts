import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { assert, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { ethers } from 'hardhat'
import _ from 'lodash'
import { TokenType, UriSource } from '../src/lib/meemStandard'
import { zeroAddress } from '../src/lib/utils'
import { deployDiamond } from '../tasks'
import { getMeemContracts, MeemContracts } from './helpers'

use(chaiAsPromised)

describe('Burn', function Test() {
	let contracts: MeemContracts
	let signers: SignerWithAddress[]
	let contractAddress: string
	// const ipfsURL = 'ipfs://QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/1'
	// const owner = '0xde19C037a85A609ec33Fc747bE9Db8809175C3a5'
	// const nftAddress = '0xaF7Cc059196a09f50632372893617376dAfADFF2'
	// const token0 = 100000

	const contractURI = `{"name": "Meem","description": "Meems are pieces of digital content wrapped in more advanced dynamic property rights.","image": "https://meem-assets.s3.amazonaws.com/meem.jpg","external_link": "https://meem.wtf","seller_fee_basis_points": 0, "fee_recipient": ""}`

	beforeEach(async () => {
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

	it('Token owner can burn token', async () => {
		const tokenId = 1
		await contracts.meemBaseERC721Facet.mint({
			to: signers[1].address,
			tokenType: TokenType.Original,
			tokenURI: 'https://example.com'
		})

		const tokenOwner = await contracts.meemBaseERC721Facet.ownerOf(tokenId)

		assert.equal(tokenOwner, signers[1].address)

		await contracts.meemBaseERC721Facet.connect(signers[1]).burn(tokenId)

		await assert.isRejected(contracts.meemBaseERC721Facet.ownerOf(tokenId))
	})

	it('Contract admin can burn token', async () => {
		const tokenId = 1
		await contracts.meemBaseERC721Facet.mint({
			to: signers[1].address,
			tokenType: TokenType.Original,
			tokenURI: 'https://example.com'
		})

		const tokenOwner = await contracts.meemBaseERC721Facet.ownerOf(tokenId)

		assert.equal(tokenOwner, signers[1].address)

		await contracts.meemBaseERC721Facet.connect(signers[0]).burn(tokenId)

		await assert.isRejected(contracts.meemBaseERC721Facet.ownerOf(tokenId))
	})

	it('Non-contract admin can not burn token', async () => {
		const tokenId = 1
		await contracts.meemBaseERC721Facet.mint({
			to: signers[1].address,
			tokenType: TokenType.Original,
			tokenURI: 'https://example.com'
		})

		const tokenOwner = await contracts.meemBaseERC721Facet.ownerOf(tokenId)

		assert.equal(tokenOwner, signers[1].address)

		await assert.isRejected(
			contracts.meemBaseERC721Facet.connect(signers[2]).burn(tokenId)
		)
	})

	it('Contract admin can bulk burn tokens', async () => {
		const tokenId1 = 1
		const tokenId2 = 2
		await contracts.meemBaseERC721Facet.mint({
			to: signers[1].address,
			tokenType: TokenType.Original,
			tokenURI: 'https://example.com'
		})
		await contracts.meemBaseERC721Facet.mint({
			to: signers[1].address,
			tokenType: TokenType.Original,
			tokenURI: 'https://example.com'
		})

		let tokenOwner = await contracts.meemBaseERC721Facet.ownerOf(tokenId1)

		assert.equal(tokenOwner, signers[1].address)

		tokenOwner = await contracts.meemBaseERC721Facet.ownerOf(tokenId2)

		assert.equal(tokenOwner, signers[1].address)

		await contracts.meemBaseERC721Facet
			.connect(signers[0])
			.bulkBurn([tokenId1, tokenId2])

		await assert.isRejected(contracts.meemBaseERC721Facet.ownerOf(tokenId1))
		await assert.isRejected(contracts.meemBaseERC721Facet.ownerOf(tokenId2))
	})

	it('Non-contract admin can not bulk burn tokens', async () => {
		const tokenId = 1
		await contracts.meemBaseERC721Facet.mint({
			to: signers[1].address,
			tokenType: TokenType.Original,
			tokenURI: 'https://example.com'
		})

		const tokenOwner = await contracts.meemBaseERC721Facet.ownerOf(tokenId)

		assert.equal(tokenOwner, signers[1].address)

		await assert.isRejected(
			contracts.meemBaseERC721Facet.connect(signers[2]).bulkBurn([tokenId])
		)
	})

	it('Token contract admin can bulk burn tokens', async () => {
		const { DiamondProxy } = await deployDiamond({
			args: {
				proxy: true
			},
			ethers
		})

		const adminContracts = await getMeemContracts(DiamondProxy)

		const tokenId = 1
		await contracts.meemBaseERC721Facet.mint({
			to: signers[2].address,
			tokenType: TokenType.Original,
			tokenURI: 'https://example.com'
		})

		await assert.isRejected(
			contracts.meemBaseERC721Facet.connect(signers[1]).bulkBurn([tokenId])
		)

		await adminContracts.meemBaseERC721Facet.mint({
			to: signers[1].address,
			tokenType: TokenType.Original,
			tokenURI: 'https://example.com'
		})

		await contracts.accessControlFacet.setAdminContract(DiamondProxy)

		const tokenOwner = await contracts.meemBaseERC721Facet.ownerOf(tokenId)
		assert.equal(tokenOwner, signers[2].address)

		await contracts.meemBaseERC721Facet.connect(signers[0]).bulkBurn([tokenId])

		await assert.isRejected(contracts.meemBaseERC721Facet.ownerOf(tokenId))
	})
})
