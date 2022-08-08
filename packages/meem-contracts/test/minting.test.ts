import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { assert, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { ethers } from 'hardhat'
import _ from 'lodash'
import { Permission, TokenType, UriSource } from '../src/lib/meemStandard'
import { deployDiamond } from '../tasks'
import { getMeemContracts, MeemContracts } from './helpers'

use(chaiAsPromised)

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

	it('Respects address only minting', async () => {
		await contracts.permissionsFacet.setMintingPermissions([
			{
				addresses: [signers[3].address],
				costWei: 0,
				mintEndTimestamp: 0,
				mintStartTimestamp: 0,
				numTokens: 0,
				permission: Permission.Addresses
			}
		])
		await contracts.meemBaseERC721Facet.connect(signers[3]).mint({
			to: signers[3].address,
			tokenType: TokenType.Original,
			tokenURI: JSON.stringify({
				name: 'Testing'
			})
		})

		await assert.isRejected(
			contracts.meemBaseERC721Facet.connect(signers[4]).mint({
				to: signers[3].address,
				tokenType: TokenType.Original,
				tokenURI: JSON.stringify({
					name: 'Testing'
				})
			})
		)
	})

	it('Respects address only minting', async () => {
		await contracts.permissionsFacet.connect(signers[0]).setMintingPermissions([
			{
				addresses: [signers[3].address],
				costWei: 0,
				mintEndTimestamp: 0,
				mintStartTimestamp: 0,
				numTokens: 0,
				permission: Permission.Addresses
			}
		])

		await contracts.meemBaseERC721Facet.connect(signers[3]).mint({
			to: signers[3].address,
			tokenType: TokenType.Original,
			tokenURI: JSON.stringify({
				name: 'Testing'
			})
		})

		await assert.isRejected(
			contracts.meemBaseERC721Facet.connect(signers[4]).mint({
				to: signers[3].address,
				tokenType: TokenType.Original,
				tokenURI: JSON.stringify({
					name: 'Testing'
				})
			})
		)
	})

	it('Can mint w/ cost', async () => {
		await contracts.permissionsFacet.connect(signers[0]).setMintingPermissions([
			{
				addresses: [],
				costWei: ethers.utils.parseEther('0.1'),
				mintEndTimestamp: 0,
				mintStartTimestamp: 0,
				numTokens: 0,
				permission: Permission.Anyone
			}
		])

		await assert.isRejected(
			contracts.meemBaseERC721Facet.connect(signers[4]).mint({
				to: signers[3].address,
				tokenType: TokenType.Original,
				tokenURI: JSON.stringify({
					name: 'Testing'
				})
			})
		)

		await contracts.meemBaseERC721Facet.connect(signers[3]).mint(
			{
				to: signers[3].address,
				tokenType: TokenType.Original,
				tokenURI: JSON.stringify({
					name: 'Testing'
				})
			},
			{
				value: ethers.utils.parseEther('0.1')
			}
		)
	})
})
