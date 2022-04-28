import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { assert, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { ethers } from 'hardhat'
import { deployDiamond } from '../tasks'
import { AccessControlFacet, Ownable } from '../typechain'

use(chaiAsPromised)

describe('Contract Admin', function Test() {
	let ownershipFacet: Ownable
	let accessControlFacet: AccessControlFacet
	let signers: SignerWithAddress[]
	const someUser = '0xde19C037a85A609ec33Fc747bE9Db8809175C3a5'

	before(async () => {
		signers = await ethers.getSigners()
		console.log({ signers })
		const { DiamondProxy: DiamondAddress } = await deployDiamond({
			args: {
				deployProxy: true
			},
			ethers
		})

		ownershipFacet = (await ethers.getContractAt(
			'@solidstate/contracts/access/Ownable.sol:Ownable',
			DiamondAddress
		)) as Ownable

		accessControlFacet = (await ethers.getContractAt(
			'AccessControlFacet',
			DiamondAddress
		)) as AccessControlFacet
	})

	it('Assigns ownership to deployer', async () => {
		const o = await ownershipFacet.owner()
		assert.equal(o, signers[0].address)
	})

	it('Assigns roles to deployer', async () => {
		const adminRole = await accessControlFacet.ADMIN_ROLE()
		const hasAdminRole = await accessControlFacet.hasRole(
			signers[0].address,
			adminRole
		)
		assert.isTrue(hasAdminRole)
		const idVerifierRole = await accessControlFacet.ID_VERIFIER_ROLE()
		const hasMinterRole = await accessControlFacet.hasRole(
			signers[0].address,
			idVerifierRole
		)
		assert.isTrue(hasMinterRole)
	})

	it('Can grant role as admin', async () => {
		const idVerifierRole = await accessControlFacet.ID_VERIFIER_ROLE()
		await accessControlFacet
			.connect(signers[0])
			.grantRole(someUser, idVerifierRole)

		const hasRole = await accessControlFacet
			.connect(signers[0])
			.hasRole(someUser, idVerifierRole)
		assert.isTrue(hasRole)
	})

	it('Can revoke role as admin', async () => {
		const idVerifierRole = await accessControlFacet.ID_VERIFIER_ROLE()
		await accessControlFacet
			.connect(signers[0])
			.revokeRole(someUser, idVerifierRole)

		const hasRole = await accessControlFacet
			.connect(signers[0])
			.hasRole(someUser, idVerifierRole)
		assert.isFalse(hasRole)
	})

	it('Can not grant role as non-admin', async () => {
		const idVerifierRole = await accessControlFacet.ID_VERIFIER_ROLE()
		await assert.isRejected(
			accessControlFacet.connect(signers[1]).grantRole(someUser, idVerifierRole)
		)
	})

	it('Can not revoke role as non-admin', async () => {
		const idVerifierRole = await accessControlFacet.ID_VERIFIER_ROLE()
		await assert.isRejected(
			accessControlFacet
				.connect(signers[1])
				.revokeRole(someUser, idVerifierRole)
		)
	})
})
