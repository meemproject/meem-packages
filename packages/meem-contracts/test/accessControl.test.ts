import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { assert, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { ethers } from 'hardhat'
import _ from 'lodash'
import { TokenType, UriSource } from '../src/lib/meemStandard'
import { deployDiamond } from '../tasks'
import { getMeemContracts, MeemContracts } from './helpers'

use(chaiAsPromised)

describe('Access Control', function Test() {
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

	it('Grants admin role to contract deployer', async () => {
		const adminRole = await contracts.accessControlFacet.ADMIN_ROLE()

		const hasAdminRole = await contracts.accessControlFacet.hasRole(
			adminRole,
			signers[0].address
		)
		assert.isTrue(hasAdminRole)
	})

	it('Can grant minter role', async () => {
		const minterRole = await contracts.permissionsFacet.MINTER_ROLE()
		await contracts.accessControlFacet.grantRole(minterRole, signers[1].address)

		const hasMinterRole = await contracts.accessControlFacet.hasRole(
			minterRole,
			signers[1].address
		)
		assert.isTrue(hasMinterRole)
	})

	it('Can not grant roles as non-admin', async () => {
		const minterRole = await contracts.permissionsFacet.MINTER_ROLE()
		await assert.isRejected(
			contracts.accessControlFacet
				.connect(signers[1])
				.grantRole(minterRole, signers[2].address)
		)
	})
})
