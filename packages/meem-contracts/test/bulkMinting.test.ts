import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { assert, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { ethers } from 'hardhat'
import _ from 'lodash'
import { Permission, TokenType, UriSource } from '../src/lib/meemStandard'
import { zeroAddress } from '../src/lib/utils'
import { deployDiamond } from '../tasks'
import { getMeemContracts, MeemContracts } from './helpers'

use(chaiAsPromised)

describe('Bulk Minting', function Test() {
	let contracts: MeemContracts
	let signers: SignerWithAddress[]
	let contractAddress: string
	// const ipfsURL = 'ipfs://QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/1'
	// const owner = '0xde19C037a85A609ec33Fc747bE9Db8809175C3a5'
	// const nftAddress = '0xaF7Cc059196a09f50632372893617376dAfADFF2'
	// const token0 = 100000

	const contractURI = `{"name": "Meem","description": "Meems are pieces of digital content wrapped in more advanced dynamic property rights.","image": "https://meem-assets.s3.amazonaws.com/meem.jpg","external_link": "https://meem.wtf","seller_fee_basis_points": 0, "fee_recipient": ""}`
	const minterRole =
		'0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'

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

	it('Can not bulk mint with cost', async () => {
		await contracts.adminFacet.connect(signers[0]).reinitialize({
			name: 'test',
			symbol: 'TEST',
			contractURI,
			roles: [
				{
					user: signers[0].address,
					role: '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6',
					hasRole: true
				}
			],
			maxSupply: 0,
			mintPermissions: [
				{
					permission: Permission.Anyone,
					addresses: [],
					numTokens: 0,
					costWei: ethers.utils.parseEther('0.1'),
					mintStartTimestamp: 0,
					mintEndTimestamp: 0,
					merkleRoot: ethers.utils.formatBytes32String('')
				}
			],
			splits: [
				{
					toAddress: signers[0].address,
					amount: 10000,
					lockedBy: zeroAddress
				}
			],
			isTransferLocked: false
		})

		await assert.isRejected(
			contracts.meemBaseERC721Facet.connect(signers[0]).bulkMint(
				[
					{
						to: signers[3].address,
						tokenType: TokenType.Original,
						tokenURI: JSON.stringify({
							name: 'Testing'
						})
					},
					{
						to: signers[3].address,
						tokenType: TokenType.Original,
						tokenURI: JSON.stringify({
							name: 'Testing'
						})
					}
				],
				{
					value: ethers.utils.parseEther('0.1')
				}
			)
		)

		await assert.isRejected(
			contracts.meemBaseERC721Facet.connect(signers[3]).bulkMint(
				[
					{
						to: signers[3].address,
						tokenType: TokenType.Original,
						tokenURI: JSON.stringify({
							name: 'Testing'
						})
					},
					{
						to: signers[3].address,
						tokenType: TokenType.Original,
						tokenURI: JSON.stringify({
							name: 'Testing'
						})
					}
				],
				{
					value: ethers.utils.parseEther('0.1')
				}
			)
		)
	})

	it('Can bulk mint', async () => {
		await contracts.adminFacet.connect(signers[0]).reinitialize({
			name: 'test',
			symbol: 'TEST',
			contractURI,
			roles: [
				{
					user: signers[0].address,
					role: '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6',
					hasRole: true
				}
			],
			maxSupply: 0,
			mintPermissions: [],
			splits: [
				{
					toAddress: signers[0].address,
					amount: 10000,
					lockedBy: zeroAddress
				}
			],
			isTransferLocked: false
		})

		await (
			await contracts.meemBaseERC721Facet.connect(signers[0]).bulkMint([
				{
					to: signers[3].address,
					tokenType: TokenType.Original,
					tokenURI: JSON.stringify({
						name: 'Testing'
					})
				},
				{
					to: signers[4].address,
					tokenType: TokenType.Original,
					tokenURI: JSON.stringify({
						name: 'Testing'
					})
				}
			])
		).wait()

		const amt1 = await contracts.meemBaseERC721Facet.balanceOf(
			signers[3].address
		)
		const amt2 = await contracts.meemBaseERC721Facet.balanceOf(
			signers[4].address
		)

		assert.equal(amt1.toNumber(), 1)
		assert.equal(amt2.toNumber(), 1)
	})
})
