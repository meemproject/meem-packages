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

describe('Admin', function Test() {
	let contracts: MeemContracts
	let signers: SignerWithAddress[]
	let contractAddress: string
	const adminRole =
		'0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775'
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

	it('Can not set contract info as non-admin', async () => {
		await assert.isRejected(
			contracts.adminFacet
				.connect(signers[1])
				['setContractInfo(string,string)']('test', 'test')
		)
		await assert.isRejected(
			contracts.adminFacet
				.connect(signers[1])
				['setContractInfo(string,string,string)']('test', 'test', 'test')
		)
		await assert.isRejected(
			contracts.adminFacet
				.connect(signers[1])
				['setContractInfo(string,string,string,uint256)'](
					'test',
					'test',
					'test',
					0
				)
		)
		await assert.isRejected(
			contracts.adminFacet.connect(signers[1]).setContractURI('alsdkfjasdlkfj')
		)
	})

	it('Can set contract info as admin', async () => {
		await contracts.adminFacet
			.connect(signers[0])
			['setContractInfo(string,string)']('testname', 'testsymbol')

		let ci = await contracts.adminFacet.getContractInfo()
		assert.equal(ci.name, 'testname')
		assert.equal(ci.symbol, 'testsymbol')

		await contracts.adminFacet
			.connect(signers[0])
			['setContractInfo(string,string,string)'](
				'testname2',
				'testsymbol2',
				'contractURI2'
			)

		ci = await contracts.adminFacet.getContractInfo()
		assert.equal(ci.name, 'testname2')
		assert.equal(ci.symbol, 'testsymbol2')
		assert.equal(ci.contractURI, 'contractURI2')

		await contracts.adminFacet
			.connect(signers[0])
			['setContractInfo(string,string,string,uint256)'](
				'testname3',
				'testsymbol3',
				'contractURI3',
				1000
			)

		ci = await contracts.adminFacet.getContractInfo()
		assert.equal(ci.name, 'testname3')
		assert.equal(ci.symbol, 'testsymbol3')
		assert.equal(ci.contractURI, 'contractURI3')
		assert.equal(ci.maxSupply.toNumber(), 1000)
	})

	it('Can not initialize again', async () => {
		await assert.isRejected(
			contracts.adminFacet.connect(signers[0]).initialize({
				symbol: 'asd',
				name: 'alskdfj',
				contractURI,
				maxSupply: 2000,
				roles: [
					{
						role: adminRole,
						user: signers[0].address,
						hasRole: true
					}
				],
				mintPermissions: [],
				splits: [],
				isTransferLocked: false
			})
		)
	})

	it('Can not re-initialize as non-admin', async () => {
		await assert.isRejected(
			contracts.adminFacet.connect(signers[1]).reinitialize({
				symbol: 'asd',
				name: 'alskdfj',
				contractURI,
				maxSupply: 2000,
				roles: [
					{
						role: adminRole,
						user: signers[0].address,
						hasRole: true
					}
				],
				mintPermissions: [],
				splits: [
					{
						toAddress: signers[0].address,
						amount: 1000,
						lockedBy: zeroAddress
					}
				],
				isTransferLocked: false
			})
		)
	})

	it('Can re-initialize', async () => {
		await contracts.adminFacet.connect(signers[0]).reinitialize({
			symbol: 'asd',
			name: 'alskdfj',
			contractURI,
			maxSupply: 2000,
			roles: [
				{
					role: adminRole,
					user: signers[0].address,
					hasRole: true
				}
			],
			mintPermissions: [],
			splits: [
				{
					toAddress: signers[0].address,
					amount: 1000,
					lockedBy: zeroAddress
				}
			],
			isTransferLocked: false
		})

		const ci = await contracts.adminFacet.getContractInfo()
		assert.equal(ci.name, 'alskdfj')
		assert.equal(ci.symbol, 'asd')
		assert.equal(ci.contractURI, contractURI)
	})
})
