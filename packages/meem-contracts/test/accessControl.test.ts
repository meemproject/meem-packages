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

	it('Grants the contract owner any role', async () => {
		const hasMinterRole = await contracts.accessControlFacet.hasRole(
			// Not a role that's being used. The owner should always have permission though.
			'0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe2875693c21775825b09',
			signers[0].address
		)
		assert.isTrue(hasMinterRole)
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

	it('Can set the admin contract', async () => {
		const { DiamondProxy } = await deployDiamond({
			args: {
				proxy: true
			},
			ethers
		})

		const adminContracts = await getMeemContracts(DiamondProxy)

		const adminRole = await contracts.accessControlFacet.ADMIN_ROLE()

		let hasAdminRole = await contracts.accessControlFacet.hasRole(
			adminRole,
			signers[1].address
		)

		assert.isFalse(hasAdminRole)

		await contracts.accessControlFacet.setAdminContract(DiamondProxy)

		hasAdminRole = await contracts.accessControlFacet.hasRole(
			adminRole,
			signers[1].address
		)

		assert.isFalse(hasAdminRole)

		await adminContracts.meemBaseERC721Facet.mint({
			to: signers[1].address,
			tokenType: TokenType.Original,
			tokenURI: ''
		})

		hasAdminRole = await contracts.accessControlFacet.hasRole(
			adminRole,
			signers[1].address
		)

		assert.isTrue(hasAdminRole)
	})

	it('Can set multiple roles for wallets on init', async () => {
		const { DiamondProxy } = await deployDiamond({
			args: {
				proxy: true,
				noInit: true
			},
			ethers
		})

		const meemContracts = await getMeemContracts(DiamondProxy)

		await meemContracts.adminFacet.initialize({
			contractURI: '',
			roles: [
				{
					role: '0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775',
					user: '0xbA343C26ad4387345edBB3256e62f4bB73d68a04',
					hasRole: true
				},
				{
					role: '0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775',
					user: '0xde19C037a85A609ec33Fc747bE9Db8809175C3a5',
					hasRole: true
				},
				{
					role: '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6',
					user: '0xbA343C26ad4387345edBB3256e62f4bB73d68a04',
					hasRole: true
				},
				{
					role: '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6',
					user: '0xde19C037a85A609ec33Fc747bE9Db8809175C3a5',
					hasRole: true
				},
				{
					role: '0x189ab7a9244df0848122154315af71fe140f3db0fe014031783b0946b8c9d2e3',
					user: '0xde19C037a85A609ec33Fc747bE9Db8809175C3a5',
					hasRole: true
				}
			],
			isTransferLocked: false,
			maxSupply: 0,
			mintPermissions: [],
			name: 'test',
			symbol: 'test',
			splits: []
		})

		const minterRoles = await meemContracts.accessControlFacet.getRoles(
			'0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775'
		)

		const adminRoles = await meemContracts.accessControlFacet.getRoles(
			'0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'
		)

		console.log(adminRoles)
		assert.equal(adminRoles.length, 2)
		assert.equal(minterRoles.length, 2)
	})
})
