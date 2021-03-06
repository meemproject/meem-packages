import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { assert, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { ethers } from 'hardhat'
import { defaultOpenProperties } from '../src/lib/meemProperties'
import { Chain, MeemType, Permission, UriSource } from '../src/lib/meemStandard'
import { zeroAddress } from '../src/lib/utils'
import { deployDiamond } from '../tasks'
import { MeemAdminFacet, MeemBaseFacet, MeemQueryFacet } from '../typechain'

use(chaiAsPromised)

describe('Minting Permissions', function Test() {
	let meemFacet: MeemBaseFacet
	let meemAdminFacet: MeemAdminFacet
	let queryFacet: MeemQueryFacet
	let signers: SignerWithAddress[]
	let contractAddress: string
	const ipfsURL = 'ipfs://QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/1'
	const owner = '0xde19C037a85A609ec33Fc747bE9Db8809175C3a5'
	const token0 = 100000
	const token1 = 100001
	const token2 = 100002
	// const token3 = 100003

	beforeEach(async () => {
		signers = await ethers.getSigners()

		const { DiamondProxy: DiamondAddress } = await deployDiamond({
			args: {
				proxy: true
			},
			ethers
		})

		contractAddress = DiamondAddress

		meemFacet = (await ethers.getContractAt(
			'MeemBaseFacet',
			contractAddress
		)) as MeemBaseFacet

		meemAdminFacet = (await ethers.getContractAt(
			'MeemAdminFacet',
			contractAddress
		)) as MeemAdminFacet
		queryFacet = (await ethers.getContractAt(
			'MeemQueryFacet',
			contractAddress
		)) as MeemQueryFacet
	})

	async function mintZeroMeem() {
		const { status } = await (
			await meemFacet.connect(signers[0]).mint(
				{
					to: owner,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					isURILocked: true,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()
		assert.equal(status, 1)
	}

	it('Mints can not exceed childDepth', async () => {
		await mintZeroMeem()

		await (await meemAdminFacet.setChildDepth(1)).wait()

		const { status } = await (
			await meemFacet.connect(signers[0]).mint(
				{
					to: owner,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					isURILocked: true,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()
		assert.equal(status, 1)

		const m1 = await queryFacet.getMeem(token1)
		assert.equal(m1.generation.toNumber(), 1)

		await assert.isRejected(
			meemFacet.connect(signers[0]).mint(
				{
					to: owner,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token1,
					meemType: MeemType.Remix,
					isURILocked: false,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		)
	})

	it('Increases child depth and generation is updated properly', async () => {
		await mintZeroMeem()
		await (await meemAdminFacet.setChildDepth(2)).wait()

		// First gen
		await (
			await meemFacet.connect(signers[0]).mint(
				{
					to: owner,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					isURILocked: false,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()

		// Second gen
		await (
			await meemFacet.connect(signers[0]).mint(
				{
					to: owner,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token1,
					meemType: MeemType.Remix,
					isURILocked: false,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()

		const m2 = await queryFacet.getMeem(token2)
		assert.equal(m2.generation.toNumber(), 2)

		await assert.isRejected(
			meemFacet.connect(signers[0]).mint(
				{
					to: owner,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token2,
					meemType: MeemType.Remix,
					isURILocked: false,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		)
	})

	it('Respects total remixes', async () => {
		await (
			await meemFacet.connect(signers[0]).mint(
				{
					to: owner,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					isURILocked: true,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				{ ...defaultOpenProperties, totalRemixes: 1 },
				defaultOpenProperties
			)
		).wait()

		// Succeeds as first child
		await (
			await meemFacet.connect(signers[0]).mint(
				{
					to: owner,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					isURILocked: false,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				{ ...defaultOpenProperties, totalRemixes: 1 },
				defaultOpenProperties
			)
		).wait()

		// Fails as second child
		await assert.isRejected(
			meemFacet.connect(signers[0]).mint(
				{
					to: owner,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					isURILocked: false,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				{ ...defaultOpenProperties, totalRemixes: 1 },
				defaultOpenProperties
			)
		)
	})

	it('Respects children per wallet', async () => {
		await (
			await meemFacet.connect(signers[0]).mint(
				{
					to: owner,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					isURILocked: true,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				{ ...defaultOpenProperties, remixesPerWallet: 1 },
				defaultOpenProperties
			)
		).wait()

		// Succeeds as first child
		await (
			await meemFacet.connect(signers[0]).mint(
				{
					to: signers[1].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					isURILocked: false,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()

		// Fails as second child per wallet
		await assert.isRejected(
			meemFacet.connect(signers[0]).mint(
				{
					to: signers[1].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					isURILocked: false,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		)

		// Succeeds as different owner
		await (
			await meemFacet.connect(signers[0]).mint(
				{
					to: signers[2].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					isURILocked: false,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()
	})

	it('Respects owner only minting', async () => {
		await (
			await meemFacet.connect(signers[0]).mint(
				{
					to: signers[0].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					isURILocked: true,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				{
					...defaultOpenProperties,
					remixPermissions: [
						{
							permission: Permission.Owner,
							numTokens: 0,
							lockedBy: zeroAddress,
							addresses: [],
							costWei: 0
						}
					]
				},
				defaultOpenProperties
			)
		).wait()

		// Succeeds as owner
		await (
			await meemFacet.connect(signers[0]).mint(
				{
					to: owner,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					isURILocked: true,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()

		// Fails as non-owner
		await assert.isRejected(
			meemFacet.connect(signers[1]).mint(
				{
					to: signers[1].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					isURILocked: true,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		)
	})

	it('Respects address only minting', async () => {
		await (
			await meemFacet.connect(signers[0]).mint(
				{
					to: signers[0].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					isURILocked: true,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				{
					...defaultOpenProperties,
					remixPermissions: [
						{
							permission: Permission.Addresses,
							numTokens: 0,
							lockedBy: zeroAddress,
							addresses: [signers[1].address],
							costWei: 0
						}
					]
				},
				defaultOpenProperties
			)
		).wait()

		// Succeeds as approved address
		await (
			await meemFacet.connect(signers[1]).mint(
				{
					to: signers[1].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					isURILocked: false,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()

		// Fails as owner
		await assert.isRejected(
			meemFacet.connect(signers[0]).mint(
				{
					to: owner,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					isURILocked: false,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		)

		// Fails as other address
		await assert.isRejected(
			meemFacet.connect(signers[3]).mint(
				{
					to: signers[3].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					isURILocked: false,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		)
	})

	it('Allows multiple permissions', async () => {
		await (
			await meemFacet.connect(signers[0]).mint(
				{
					to: signers[2].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					isURILocked: true,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				{
					...defaultOpenProperties,
					remixPermissions: [
						{
							permission: Permission.Addresses,
							numTokens: 0,
							lockedBy: zeroAddress,
							addresses: [signers[1].address],
							costWei: 0
						},
						{
							permission: Permission.Owner,
							numTokens: 0,
							lockedBy: zeroAddress,
							addresses: [],
							costWei: 0
						}
					]
				},
				defaultOpenProperties
			)
		).wait()

		// Succeeds as approved address
		await (
			await meemFacet.connect(signers[1]).mint(
				{
					to: signers[1].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					isURILocked: false,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()

		// Succeeds as owner
		await (
			await meemFacet.connect(signers[2]).mint(
				{
					to: signers[2].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					isURILocked: false,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()

		// Fails as other address
		await assert.isRejected(
			meemFacet.connect(signers[3]).mint(
				{
					to: signers[3].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					isURILocked: false,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		)
	})

	it('Can lock permissions', async () => {
		await (
			await meemFacet.connect(signers[0]).mint(
				{
					to: signers[2].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					isURILocked: true,
					uriSource: UriSource.Url,
					reactionTypes: [],
					mintedBy: signers[0].address
				},
				{
					...defaultOpenProperties,
					copyPermissions: [
						{
							permission: Permission.Addresses,
							numTokens: 0,
							lockedBy: signers[2].address,
							addresses: [signers[1].address],
							costWei: 0
						},
						{
							permission: Permission.Owner,
							numTokens: 0,
							lockedBy: signers[2].address,
							addresses: [],
							costWei: 0
						}
					],
					remixPermissions: [
						{
							permission: Permission.Addresses,
							numTokens: 0,
							lockedBy: signers[2].address,
							addresses: [signers[1].address],
							costWei: 0
						},
						{
							permission: Permission.Owner,
							numTokens: 0,
							lockedBy: signers[2].address,
							addresses: [],
							costWei: 0
						}
					],
					readPermissions: [
						{
							permission: Permission.Addresses,
							numTokens: 0,
							lockedBy: signers[2].address,
							addresses: [signers[1].address],
							costWei: 0
						},
						{
							permission: Permission.Owner,
							numTokens: 0,
							lockedBy: signers[2].address,
							addresses: [],
							costWei: 0
						}
					],
					copyPermissionsLockedBy: signers[2].address,
					remixPermissionsLockedBy: signers[2].address,
					readPermissionsLockedBy: signers[2].address
				},
				{
					...defaultOpenProperties,
					copyPermissions: [
						{
							permission: Permission.Addresses,
							numTokens: 0,
							lockedBy: signers[2].address,
							addresses: [signers[1].address],
							costWei: 0
						},
						{
							permission: Permission.Owner,
							numTokens: 0,
							lockedBy: signers[2].address,
							addresses: [],
							costWei: 0
						}
					],
					remixPermissions: [
						{
							permission: Permission.Addresses,
							numTokens: 0,
							lockedBy: signers[2].address,
							addresses: [signers[1].address],
							costWei: 0
						},
						{
							permission: Permission.Owner,
							numTokens: 0,
							lockedBy: signers[2].address,
							addresses: [],
							costWei: 0
						}
					],
					readPermissions: [
						{
							permission: Permission.Addresses,
							numTokens: 0,
							lockedBy: signers[2].address,
							addresses: [signers[1].address],
							costWei: 0
						},
						{
							permission: Permission.Owner,
							numTokens: 0,
							lockedBy: signers[2].address,
							addresses: [],
							costWei: 0
						}
					],
					copyPermissionsLockedBy: signers[2].address,
					remixPermissionsLockedBy: signers[2].address,
					readPermissionsLockedBy: signers[2].address
				}
				// {
				// 	value: ethers.utils.parseEther('0.01')
				// }
			)
		).wait()
		const m0 = await queryFacet.getMeem(token0)

		assert.equal(m0.properties.copyPermissionsLockedBy, signers[2].address)
		assert.equal(m0.properties.remixPermissionsLockedBy, signers[2].address)
		assert.equal(m0.properties.readPermissionsLockedBy, signers[2].address)
	})
})
