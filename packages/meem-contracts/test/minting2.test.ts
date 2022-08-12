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

describe('Minting #2', function Test() {
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

	it('Can require minting cost', async () => {
		await contracts.adminFacet.connect(signers[0]).reinitialize({
			name: 'test',
			symbol: 'TEST',
			contractURI,
			roles: [],
			maxSupply: 0,
			mintPermissions: [
				{
					permission: Permission.Anyone,
					addresses: [],
					numTokens: 0,
					costWei: ethers.utils.parseEther('0.1'),
					mintStartTimestamp: 0,
					mintEndTimestamp: 0
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

		await (
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
		).wait()
	})

	it('Can not mint for wrong cost', async () => {
		await contracts.adminFacet.connect(signers[0]).reinitialize({
			name: 'test',
			symbol: 'TEST',
			contractURI,
			roles: [],
			maxSupply: 0,
			mintPermissions: [
				{
					permission: Permission.Anyone,
					addresses: [],
					numTokens: 0,
					costWei: ethers.utils.parseEther('0.1'),
					mintStartTimestamp: 0,
					mintEndTimestamp: 0
				},
				{
					permission: Permission.Addresses,
					addresses: [signers[1].address],
					numTokens: 0,
					costWei: 0,
					mintStartTimestamp: 0,
					mintEndTimestamp: 0
				},
				{
					permission: Permission.Addresses,
					addresses: [signers[2].address],
					numTokens: 0,
					costWei: 0,
					mintStartTimestamp: 0,
					mintEndTimestamp: 0
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
			contracts.meemBaseERC721Facet.connect(signers[3]).mint(
				{
					to: signers[3].address,
					tokenType: TokenType.Original,
					tokenURI: JSON.stringify({
						name: 'Testing'
					})
				},
				{
					value: ethers.utils.parseEther('0.12')
				}
			)
		)
	})
})
