import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { assert, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { ethers } from 'hardhat'
import { DateTime } from 'luxon'
import { defaultMeemProperties, Permission } from '../src'
import { defaultOpenProperties } from '../src/lib/meemProperties'
import { Chain, MeemType, UriSource } from '../src/lib/meemStandard'
import { zeroAddress } from '../src/lib/utils'
import { deployDiamond } from '../tasks'
import {
	AccessControlFacet,
	InitDiamond,
	MeemAdminFacet,
	MeemBaseFacet,
	MeemQueryFacet,
	MeemSplitsFacet,
	Ownable
} from '../typechain'
import { BasePropertiesStruct } from '../types/Meem'

use(chaiAsPromised)

describe('Contract Admin', function Test() {
	let meemFacet: MeemBaseFacet
	let initFacet: InitDiamond
	let adminFacet: MeemAdminFacet
	let meemSplitsFacet: MeemSplitsFacet
	let ownershipFacet: Ownable
	let accessControlFacet: AccessControlFacet
	let queryFacet: MeemQueryFacet
	let signers: SignerWithAddress[]
	const someUser = '0xde19C037a85A609ec33Fc747bE9Db8809175C3a5'
	const ipfsURL = 'ipfs://QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/1'
	const owner = '0xde19C037a85A609ec33Fc747bE9Db8809175C3a5'
	const parent = '0xc4A383d1Fd38EDe98F032759CE7Ed8f3F10c82B0'
	const token0 = 100000

	before(async () => {
		signers = await ethers.getSigners()
		const { DiamondProxy: DiamondAddress } = await deployDiamond({
			args: {
				proxy: true
			},
			ethers
		})

		meemFacet = (await ethers.getContractAt(
			'MeemBaseFacet',
			DiamondAddress
		)) as MeemBaseFacet

		meemSplitsFacet = (await ethers.getContractAt(
			'MeemSplitsFacet',
			DiamondAddress
		)) as MeemSplitsFacet

		adminFacet = (await ethers.getContractAt(
			'MeemAdminFacet',
			DiamondAddress
		)) as MeemAdminFacet

		ownershipFacet = (await ethers.getContractAt(
			'@solidstate/contracts/access/Ownable.sol:Ownable',
			DiamondAddress
		)) as Ownable

		accessControlFacet = (await ethers.getContractAt(
			'AccessControlFacet',
			DiamondAddress
		)) as AccessControlFacet

		queryFacet = (await ethers.getContractAt(
			'MeemQueryFacet',
			DiamondAddress
		)) as MeemQueryFacet

		initFacet = (await ethers.getContractAt(
			'InitDiamond',
			DiamondAddress
		)) as InitDiamond
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
		const minterRole = await accessControlFacet.MINTER_ROLE()
		const hasMinterRole = await accessControlFacet.hasRole(
			signers[0].address,
			minterRole
		)
		assert.isTrue(hasMinterRole)
	})

	it('Can set split amount as admin', async () => {
		const { status } = await (
			await adminFacet.connect(signers[0]).setNonOwnerSplitAllocationAmount(100)
		).wait()
		assert.equal(status, 1)

		const splitAmount = await meemSplitsFacet
			.connect(signers[0])
			.nonOwnerSplitAllocationAmount()
		assert.equal(splitAmount.toNumber(), 100)

		await (
			await adminFacet.connect(signers[0]).setNonOwnerSplitAllocationAmount(0)
		).wait()
	})

	it('Can not set split amount as non-admin', async () => {
		await assert.isRejected(
			adminFacet.connect(signers[1]).setNonOwnerSplitAllocationAmount(100)
		)
	})

	it('Can grant role as admin', async () => {
		const minterRole = await accessControlFacet.MINTER_ROLE()
		await accessControlFacet.connect(signers[0]).grantRole(someUser, minterRole)

		const hasRole = await accessControlFacet
			.connect(signers[0])
			.hasRole(someUser, minterRole)
		assert.isTrue(hasRole)
	})

	it('Can revoke role as admin', async () => {
		const minterRole = await accessControlFacet.MINTER_ROLE()
		await accessControlFacet
			.connect(signers[0])
			.revokeRole(someUser, minterRole)

		const hasRole = await accessControlFacet
			.connect(signers[0])
			.hasRole(someUser, minterRole)
		assert.isFalse(hasRole)
	})

	it('Can not grant role as non-admin', async () => {
		const minterRole = await accessControlFacet.MINTER_ROLE()
		await assert.isRejected(
			accessControlFacet.connect(signers[1]).grantRole(someUser, minterRole)
		)
	})

	it('Can not revoke role as non-admin', async () => {
		const minterRole = await accessControlFacet.MINTER_ROLE()
		await assert.isRejected(
			accessControlFacet.connect(signers[1]).revokeRole(someUser, minterRole)
		)
	})

	it('Can not set root as non-admin', async () => {
		const { status } = await (
			await meemFacet.connect(signers[1]).mint(
				{
					to: signers[4].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					isURILocked: false,
					mintedBy: signers[0].address,
					reactionTypes: [],
					uriSource: UriSource.TokenUri
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()
		assert.equal(status, 1)

		const token = await queryFacet.getMeem(token0)
		assert.equal(token.root, zeroAddress)
		assert.equal(token.rootTokenId.toNumber(), 0)

		await assert.isRejected(
			adminFacet
				.connect(signers[1])
				.setTokenRoot(token0, Chain.Ethereum, parent, 23)
		)
	})

	it('Can set root as admin', async () => {
		const { status } = await (
			await meemFacet.connect(signers[1]).mint(
				{
					to: signers[4].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					isURILocked: false,
					mintedBy: signers[0].address,
					reactionTypes: [],
					uriSource: UriSource.TokenUri
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()
		assert.equal(status, 1)

		let token = await queryFacet.getMeem(token0)
		assert.equal(token.root, zeroAddress)
		assert.equal(token.rootTokenId.toNumber(), 0)

		await adminFacet
			.connect(signers[0])
			.setTokenRoot(token0, Chain.Ethereum, parent, 23)

		token = await queryFacet.getMeem(token0)
		assert.equal(token.root, parent)
		assert.equal(token.rootChain, Chain.Ethereum)
		assert.equal(token.rootTokenId.toNumber(), 23)
	})

	it('Can re-initialize as admin', async () => {
		const bp: BasePropertiesStruct = {
			totalOriginalsSupply: 100,
			totalOriginalsSupplyLockedBy: signers[1].address,
			mintPermissions: [
				{
					permission: Permission.Addresses,
					addresses: [signers[2].address, signers[2].address],
					numTokens: 0,
					lockedBy: signers[2].address,
					costWei: 1000
				}
			],
			mintPermissionsLockedBy: signers[2].address,
			splits: [
				{
					toAddress: signers[2].address,
					amount: 100,
					// lockedBy: signers[2].address
					lockedBy: zeroAddress
				}
			],
			// splitsLockedBy: signers[2].address,
			splitsLockedBy: zeroAddress,
			originalsPerWallet: 1,
			originalsPerWalletLockedBy: signers[2].address,
			isTransferrable: false,
			isTransferrableLockedBy: signers[2].address,
			mintStartTimestamp: Math.floor(DateTime.now().toSeconds()),
			mintEndTimestamp: Math.floor(
				DateTime.now()
					.plus({
						days: 30
					})
					.toSeconds()
			),
			mintDatesLockedBy: signers[2].address,
			transferLockupUntil: Math.floor(
				DateTime.now()
					.plus({
						days: 30
					})
					.toSeconds()
			),
			transferLockupUntilLockedBy: signers[2].address
		}

		const params: Parameters<typeof adminFacet.reInitialize> = [
			{
				symbol: 'REINIT',
				name: 'Re init test',
				contractURI: JSON.stringify({ test: 'https://test.example.com' }),
				baseProperties: bp,
				defaultProperties: defaultMeemProperties,
				defaultChildProperties: defaultMeemProperties,
				admins: [signers[0].address, signers[2].address],
				tokenCounterStart: 10,
				childDepth: 23,
				nonOwnerSplitAllocationAmount: 10
			}
		]

		// Can't call init() again
		await assert.isRejected(initFacet.connect(signers[0]).init(...params))

		// Can call reinitialize
		const { status } = await (
			await adminFacet.connect(signers[0]).reInitialize(...params)
		).wait()

		const adminRole = await accessControlFacet.ADMIN_ROLE()
		const admins = await queryFacet.getRoles(adminRole)

		assert.equal(admins[0], signers[0].address)
		assert.equal(admins[1], signers[2].address)

		const baseProperties = await queryFacet.getBaseProperties()
		assert.equal(baseProperties.totalOriginalsSupply, bp.totalOriginalsSupply)
		assert.equal(
			baseProperties.totalOriginalsSupplyLockedBy,
			bp.totalOriginalsSupplyLockedBy
		)
		assert.equal(
			baseProperties.mintPermissions[0].addresses[0],
			bp.mintPermissions[0].addresses[0]
		)
		assert.equal(
			baseProperties.mintPermissions[0].costWei,
			bp.mintPermissions[0].costWei
		)
		assert.equal(
			baseProperties.mintPermissions[0].lockedBy,
			bp.mintPermissions[0].lockedBy
		)
		assert.equal(
			baseProperties.mintPermissionsLockedBy,
			bp.mintPermissionsLockedBy
		)
		assert.equal(baseProperties.splits[0].toAddress, bp.splits[0].toAddress)
		assert.equal(baseProperties.splits[0].amount, bp.splits[0].amount)
		assert.equal(baseProperties.splits[0].lockedBy, bp.splits[0].lockedBy)
		assert.equal(baseProperties.splitsLockedBy, bp.splitsLockedBy)
		assert.equal(baseProperties.originalsPerWallet, bp.originalsPerWallet)
		assert.equal(
			baseProperties.originalsPerWalletLockedBy,
			bp.originalsPerWalletLockedBy
		)
		assert.equal(baseProperties.isTransferrable, bp.isTransferrable)
		assert.equal(
			baseProperties.isTransferrableLockedBy,
			bp.isTransferrableLockedBy
		)
		assert.equal(baseProperties.mintStartTimestamp, bp.mintStartTimestamp)
		assert.equal(baseProperties.mintEndTimestamp, bp.mintEndTimestamp)
		assert.equal(baseProperties.mintDatesLockedBy, bp.mintDatesLockedBy)
		assert.equal(baseProperties.transferLockupUntil, bp.transferLockupUntil)
		assert.equal(
			baseProperties.transferLockupUntilLockedBy,
			bp.transferLockupUntilLockedBy
		)

		const contractInfo = await queryFacet.getContractInfo()
		assert.equal(contractInfo.symbol, params[0].symbol)
		assert.equal(contractInfo.symbol, params[0].symbol)
		assert.equal(contractInfo.name, params[0].name)
		const contractURI = Buffer.from(
			contractInfo.contractURI.substring(29),
			'base64'
		).toString()
		assert.equal(contractURI, params[0].contractURI)
		assert.equal(contractInfo.childDepth, params[0].childDepth)
		assert.equal(
			contractInfo.nonOwnerSplitAllocationAmount,
			params[0].nonOwnerSplitAllocationAmount
		)
	})
})
