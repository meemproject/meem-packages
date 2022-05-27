import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { assert, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Contract } from 'ethers'
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
import { zeroAddress } from '../src/lib/utils'
import { deployDiamond } from '../tasks'
import { Meem } from '../types'
import meemABI from '../types/Meem.json'
import { getMeemContracts, MeemContracts } from './helpers'

use(chaiAsPromised)

describe('BaseProperties', function Test() {
	let contracts: MeemContracts
	let signers: SignerWithAddress[]
	let contractAddress: string
	const token0 = 100000
	const ipfsURL = 'ipfs://QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/1'

	before(async () => {
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

	it('Can not set base splits as non-admin', async () => {
		await assert.isRejected(
			contracts.meemAdminFacet.connect(signers[1]).setBaseSplits([
				{
					toAddress: signers[1].address,
					amount: 100,
					lockedBy: zeroAddress
				}
			])
		)
	})

	it('Can set base splits', async () => {
		await contracts.meemAdminFacet.setBaseSplits([
			{
				toAddress: signers[0].address,
				amount: 100,
				lockedBy: zeroAddress
			}
		])

		const props = await contracts.meemQueryFacet.getBaseProperties()
		assert.equal(props.splits[0].toAddress, signers[0].address)
		assert.equal(props.splits[0].amount.toNumber(), 100)
		assert.equal(props.splits[0].lockedBy, zeroAddress)
	})

	it('Can not set default splits as non-admin', async () => {
		await assert.isRejected(
			contracts.meemSplitsFacet
				.connect(signers[1])
				.setSplits(0, PropertyType.DefaultMeem, [
					{
						toAddress: signers[1].address,
						amount: 100,
						lockedBy: zeroAddress
					}
				])
		)
	})

	it('Can set default splits', async () => {
		await contracts.meemSplitsFacet.setSplits(0, PropertyType.DefaultMeem, [
			{
				toAddress: signers[0].address,
				amount: 100,
				lockedBy: zeroAddress
			}
		])

		const props = await contracts.meemQueryFacet.getDefaultProperties(
			PropertyType.DefaultMeem
		)
		assert.equal(props.splits[0].toAddress, signers[0].address)
		assert.equal(props.splits[0].amount.toNumber(), 100)
		assert.equal(props.splits[0].lockedBy, zeroAddress)
	})

	it('Can setTotalOriginalsSupply', async () => {
		await contracts.meemAdminFacet.setTotalOriginalsSupply(100)
		const props = await contracts.meemQueryFacet.getBaseProperties()
		assert.equal(props.totalOriginalsSupply.toNumber(), 100)
	})

	it('Can not setTotalOriginalsSupply as non-admin', async () => {
		await assert.isRejected(
			contracts.meemAdminFacet.connect(signers[1]).setTotalOriginalsSupply(100)
		)
	})

	it('Can setOriginalsPerWallet', async () => {
		await contracts.meemAdminFacet.setOriginalsPerWallet(100)
		const props = await contracts.meemQueryFacet.getBaseProperties()
		assert.equal(props.originalsPerWallet.toNumber(), 100)
	})

	it('Can not setOriginalsPerWallet as non-admin', async () => {
		await assert.isRejected(
			contracts.meemAdminFacet.connect(signers[1]).setOriginalsPerWallet(100)
		)
	})

	it('Can setIsTransferrable', async () => {
		await contracts.meemAdminFacet.setIsTransferrable(false)
		const props = await contracts.meemQueryFacet.getBaseProperties()
		assert.isFalse(props.isTransferrable)
	})

	it('Can not setIsTransferrable as non-admin', async () => {
		await assert.isRejected(
			contracts.meemAdminFacet.connect(signers[1]).setIsTransferrable(false)
		)
	})

	it('Can setMintDates', async () => {
		const start = Math.floor(DateTime.now().toSeconds())
		const end = Math.floor(
			DateTime.now()
				.plus({
					days: 30
				})
				.toSeconds()
		)
		await contracts.meemAdminFacet.setMintDates(start, end)
		const props = await contracts.meemQueryFacet.getBaseProperties()
		assert.equal(props.mintStartTimestamp.toNumber(), start)
		assert.equal(props.mintEndTimestamp.toNumber(), end)
	})

	it('Can not setMintDates as non-admin', async () => {
		const start = Math.floor(DateTime.now().toSeconds())
		const end = Math.floor(
			DateTime.now()
				.plus({
					days: 30
				})
				.toSeconds()
		)
		await assert.isRejected(
			contracts.meemAdminFacet.connect(signers[1]).setMintDates(start, end)
		)
	})

	it('Can not set default properties as non-admin', async () => {
		await assert.isRejected(
			contracts.meemAdminFacet
				.connect(signers[2])
				.setProperties(PropertyType.DefaultMeem, {
					...defaultOpenProperties
				})
		)
	})

	it('Merges default properties', async () => {
		await (
			await contracts.meemAdminFacet.setProperties(PropertyType.DefaultMeem, {
				...defaultOpenProperties
			})
		).wait()

		const { status } = await (
			await contracts.meemBaseFacet.connect(signers[1]).mint(
				{
					to: signers[1].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: token0,
					meemType: MeemType.Original,
					isURILocked: false,
					reactionTypes: [],
					uriSource: UriSource.TokenUri,
					mintedBy: signers[0].address
				},
				{
					...defaultOpenProperties,
					remixPermissions: [
						{
							permission: Permission.Anyone,
							numTokens: 0,
							lockedBy: signers[1].address,
							addresses: [],
							costWei: ethers.utils.parseEther('0.1')
						}
					]
				},
				defaultOpenProperties
			)
		).wait()
	})
})
