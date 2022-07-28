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

describe('Permissions', function Test() {
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

	it('Can not set as non-admin', async () => {
		await assert.isRejected(
			contracts.permissionsFacet.connect(signers[1]).setIsTransferrable(false)
		)
		await assert.isRejected(
			contracts.permissionsFacet.connect(signers[1]).setMaxSupply(200)
		)
		await assert.isRejected(
			contracts.permissionsFacet.connect(signers[1]).setMintingPermissions([])
		)
	})

	it('Can set transferrable', async () => {
		await contracts.permissionsFacet
			.connect(signers[0])
			.setIsTransferrable(true)

		let ci = await contracts.adminFacet.getContractInfo()
		assert.equal(ci.isTransferLocked, false)

		await contracts.permissionsFacet
			.connect(signers[0])
			.setIsTransferrable(false)

		ci = await contracts.adminFacet.getContractInfo()
		assert.equal(ci.isTransferLocked, true)
	})

	it('Can set max supply', async () => {
		await contracts.permissionsFacet.connect(signers[0]).setMaxSupply(2000)

		const ci = await contracts.adminFacet.getContractInfo()
		assert.equal(ci.maxSupply.toNumber(), 2000)
	})

	it('Can lock max supply', async () => {
		await contracts.permissionsFacet.lockMaxSupply()
		await assert.isRejected(
			contracts.permissionsFacet.connect(signers[0]).setMaxSupply(2000)
		)
	})
})
