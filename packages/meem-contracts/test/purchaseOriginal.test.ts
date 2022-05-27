import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { assert, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
// import { Contract } from 'ethers'
import { ethers } from 'hardhat'
import _ from 'lodash'
import { DateTime } from 'luxon'
import {
	Chain,
	defaultOpenProperties,
	MeemType,
	Permission,
	PropertyType,
	UriSource
} from '../src'
import { getMeemContract } from '../src/lib/contract'
import { zeroAddress } from '../src/lib/utils'
import { deployDiamond } from '../tasks'
import { MeemAdminFacet, MeemBaseFacet } from '../typechain'
import { Meem } from '../types'
import meemABI from '../types/Meem.json'
import { getMeemContracts, MeemContracts } from './helpers'

use(chaiAsPromised)

describe('Purchase Original', function Test() {
	let contracts: MeemContracts
	let signers: SignerWithAddress[]
	let contractAddress: string
	const ipfsURL = 'ipfs://QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/1'
	const token0 = 100000

	beforeEach(async () => {
		signers = await ethers.getSigners()
		const { DiamondProxy } = await deployDiamond({
			args: {
				proxy: true
			},
			ethers
		})

		contractAddress = DiamondProxy
		contracts = await getMeemContracts(contractAddress)
	})

	it('Can purchase', async () => {
		await contracts.meemAdminFacet.setMintPermissions([
			{
				permission: Permission.Addresses,
				addresses: [signers[1].address],
				lockedBy: zeroAddress,
				costWei: 1000,
				numTokens: 0
			}
		])

		const props = await contracts.meemQueryFacet.getBaseProperties()
		assert.equal(props.mintPermissions[0].permission, Permission.Addresses)
		assert.equal(props.mintPermissions[0].addresses[0], signers[1].address)
		assert.equal(props.mintPermissions[0].lockedBy, zeroAddress)
		assert.equal(props.mintPermissions[0].costWei.toNumber(), 1000)
		assert.equal(props.mintPermissions[0].numTokens.toNumber(), 0)

		await contracts.meemBaseFacet.connect(signers[1]).mint(
			{
				to: signers[1].address,
				tokenURI: ipfsURL,
				parentChain: Chain.Polygon,
				parent: zeroAddress,
				parentTokenId: 0,
				meemType: MeemType.Original,
				isURILocked: true,
				mintedBy: signers[0].address,
				reactionTypes: [],
				uriSource: UriSource.TokenUri
			},
			defaultOpenProperties,
			defaultOpenProperties,
			{
				value: 1000
			}
		)

		const meem = await contracts.meemQueryFacet
			.connect(signers[1])
			.getMeem(token0)
		assert.equal(meem.owner, signers[1].address)
	})

	it('Can not purchase with wrong amount', async () => {
		await contracts.meemAdminFacet.setMintPermissions([
			{
				permission: Permission.Addresses,
				addresses: [signers[1].address],
				lockedBy: zeroAddress,
				costWei: 1000,
				numTokens: 0
			}
		])

		const props = await contracts.meemQueryFacet.getBaseProperties()
		assert.equal(props.mintPermissions[0].permission, Permission.Addresses)
		assert.equal(props.mintPermissions[0].addresses[0], signers[1].address)
		assert.equal(props.mintPermissions[0].lockedBy, zeroAddress)
		assert.equal(props.mintPermissions[0].costWei.toNumber(), 1000)
		assert.equal(props.mintPermissions[0].numTokens.toNumber(), 0)

		const signer1 = await getMeemContract({
			contractAddress,
			signer: signers[1]
		})
		await assert.isRejected(
			signer1.mint(
				{
					to: signers[1].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					isURILocked: true,
					mintedBy: signers[0].address,
					reactionTypes: [],
					uriSource: UriSource.TokenUri
				},
				defaultOpenProperties,
				defaultOpenProperties,
				{
					value: 200
				}
			)
		)
	})

	it('Can mint inside mint dates', async () => {
		const start = Math.floor(DateTime.now().toSeconds())
		const end = Math.floor(
			DateTime.now()
				.plus({
					days: 10
				})
				.toSeconds()
		)
		await contracts.meemAdminFacet.setMintDates(start, end)

		await (
			await contracts.meemBaseFacet.connect(signers[1]).mint(
				{
					to: signers[1].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					isURILocked: true,
					mintedBy: signers[0].address,
					reactionTypes: [],
					uriSource: UriSource.TokenUri
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()

		const meem = await contracts.meemQueryFacet.getMeem(token0)
		assert.equal(meem.owner, signers[1].address)
	})

	it('Can not mint outside mint dates', async () => {
		const start = Math.floor(
			DateTime.now()
				.minus({
					days: 30
				})
				.toSeconds()
		)
		const end = Math.floor(
			DateTime.now()
				.minus({
					days: 10
				})
				.toSeconds()
		)
		await contracts.meemAdminFacet.setMintDates(start, end)

		await assert.isRejected(
			contracts.meemBaseFacet.connect(signers[1]).mint(
				{
					to: signers[1].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					isURILocked: true,
					mintedBy: signers[0].address,
					reactionTypes: [],
					uriSource: UriSource.TokenUri
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		)
	})

	it('Respects total supply', async () => {
		await contracts.meemAdminFacet.setTotalOriginalsSupply(1)

		await (
			await contracts.meemBaseFacet.connect(signers[1]).mint(
				{
					to: signers[1].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					isURILocked: true,
					mintedBy: signers[0].address,
					reactionTypes: [],
					uriSource: UriSource.TokenUri
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()
		await assert.isRejected(
			contracts.meemBaseFacet.connect(signers[1]).mint(
				{
					to: signers[1].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					isURILocked: true,
					mintedBy: signers[0].address,
					reactionTypes: [],
					uriSource: UriSource.TokenUri
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		)
	})

	it('Respects originalsPerWallet', async () => {
		await contracts.meemAdminFacet.setOriginalsPerWallet(1)

		await (
			await contracts.meemBaseFacet.connect(signers[1]).mint(
				{
					to: signers[1].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					isURILocked: true,
					mintedBy: signers[0].address,
					reactionTypes: [],
					uriSource: UriSource.TokenUri
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()
		await assert.isRejected(
			contracts.meemBaseFacet.connect(signers[1]).mint(
				{
					to: signers[1].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					isURILocked: true,
					mintedBy: signers[0].address,
					reactionTypes: [],
					uriSource: UriSource.TokenUri
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		)
		await (
			await contracts.meemBaseFacet.connect(signers[2]).mint(
				{
					to: signers[2].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					isURILocked: true,
					mintedBy: signers[0].address,
					reactionTypes: [],
					uriSource: UriSource.TokenUri
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()
	})

	it('Respects isTransferrable', async () => {
		await contracts.meemAdminFacet.setIsTransferrable(false)

		await (
			await contracts.meemBaseFacet.connect(signers[1]).mint(
				{
					to: signers[1].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					isURILocked: true,
					mintedBy: signers[0].address,
					reactionTypes: [],
					uriSource: UriSource.TokenUri
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()

		await assert.isRejected(
			contracts.eRC721Facet
				.connect(signers[1])
				.transferFrom(signers[1].address, signers[2].address, token0)
		)

		await contracts.meemAdminFacet.setIsTransferrable(true)

		await contracts.eRC721Facet
			.connect(signers[1])
			.transferFrom(signers[1].address, signers[2].address, token0)
	})

	it('Can check for token holders', async () => {
		const { DiamondProxy } = await deployDiamond({
			ethers,
			args: {
				proxy: true
			}
		})
		const otherContracts = await getMeemContracts(DiamondProxy)

		await contracts.meemAdminFacet.setMintPermissions([
			{
				permission: Permission.Holders,
				addresses: [DiamondProxy],
				lockedBy: zeroAddress,
				costWei: 0,
				numTokens: 1
			}
		])

		// Rejected without holding a token
		await assert.isRejected(
			contracts.meemBaseFacet.connect(signers[1]).mint(
				{
					to: signers[1].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					isURILocked: true,
					mintedBy: signers[0].address,
					reactionTypes: [],
					uriSource: UriSource.TokenUri
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		)

		// Mint on other contract
		await (
			await otherContracts.meemBaseFacet.connect(signers[1]).mint(
				{
					to: signers[1].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					isURILocked: true,
					mintedBy: signers[0].address,
					reactionTypes: [],
					uriSource: UriSource.TokenUri
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()

		const balance = await otherContracts.eRC721Facet.balanceOf(
			signers[1].address
		)

		// Should now succeed
		await (
			await contracts.meemBaseFacet.connect(signers[1]).mint(
				{
					to: signers[1].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					isURILocked: true,
					mintedBy: signers[0].address,
					reactionTypes: [],
					uriSource: UriSource.TokenUri
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()
	})
})
