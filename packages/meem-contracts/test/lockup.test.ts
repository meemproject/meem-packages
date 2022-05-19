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

describe('Transfer Lockup', function Test() {
	let contracts: MeemContracts
	let signers: SignerWithAddress[]
	let contractAddress: string
	const ipfsURL = 'ipfs://QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/1'
	const token0 = 100000
	const token1 = 100001

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

	it('Can not transfer original if lockup period is in effect', async () => {
		const lockupUntil = Math.floor(DateTime.now().plus({ days: 1 }).toSeconds())
		await contracts.meemAdminFacet.setTransferLockup(lockupUntil)

		const props = await contracts.meemQueryFacet.getBaseProperties()
		assert.equal(props.transferLockupUntil.toNumber(), lockupUntil)

		await contracts.meemBaseFacet.connect(signers[1]).mint(
			{
				to: signers[1].address,
				tokenURI: ipfsURL,
				parentChain: Chain.Polygon,
				parent: zeroAddress,
				parentTokenId: 0,
				meemType: MeemType.Original,
				data: '',
				isURILocked: true,
				mintedBy: signers[0].address,
				reactionTypes: [],
				uriSource: UriSource.TokenUri
			},
			defaultOpenProperties,
			defaultOpenProperties
		)

		await assert.isRejected(
			contracts.eRC721Facet
				.connect(signers[1])
				.transferFrom(signers[1].address, signers[2].address, token0)
		)
	})

	it('Can transfer original if lockup period is past', async () => {
		const lockupUntil = Math.floor(
			DateTime.now().minus({ days: 1 }).toSeconds()
		)
		await contracts.meemAdminFacet.setTransferLockup(lockupUntil)

		const props = await contracts.meemQueryFacet.getBaseProperties()
		assert.equal(props.transferLockupUntil.toNumber(), lockupUntil)

		await contracts.meemBaseFacet.connect(signers[1]).mint(
			{
				to: signers[1].address,
				tokenURI: ipfsURL,
				parentChain: Chain.Polygon,
				parent: zeroAddress,
				parentTokenId: 0,
				meemType: MeemType.Original,
				data: '',
				isURILocked: true,
				mintedBy: signers[0].address,
				reactionTypes: [],
				uriSource: UriSource.TokenUri
			},
			defaultOpenProperties,
			defaultOpenProperties
		)

		await (
			await contracts.eRC721Facet
				.connect(signers[1])
				.transferFrom(signers[1].address, signers[2].address, token0)
		).wait()
	})

	it('Can not transfer meem if lockup period is in effect', async () => {
		const lockupUntil = Math.floor(DateTime.now().plus({ days: 1 }).toSeconds())

		await contracts.meemBaseFacet.connect(signers[1]).mint(
			{
				to: signers[1].address,
				tokenURI: ipfsURL,
				parentChain: Chain.Polygon,
				parent: zeroAddress,
				parentTokenId: 0,
				meemType: MeemType.Original,
				data: '',
				isURILocked: true,
				mintedBy: signers[0].address,
				reactionTypes: [],
				uriSource: UriSource.TokenUri
			},
			{ ...defaultOpenProperties, transferLockupUntil: lockupUntil },
			defaultOpenProperties
		)

		await (
			await contracts.meemBaseFacet.connect(signers[2]).mint(
				{
					to: signers[2].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					data: '',
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
				.connect(signers[2])
				.transferFrom(signers[2].address, signers[3].address, token1)
		)
	})

	it('Can transfer meem if lockup period is past', async () => {
		const lockupUntil = Math.floor(
			DateTime.now().minus({ days: 1 }).toSeconds()
		)
		await contracts.meemBaseFacet.connect(signers[1]).mint(
			{
				to: signers[1].address,
				tokenURI: ipfsURL,
				parentChain: Chain.Polygon,
				parent: zeroAddress,
				parentTokenId: 0,
				meemType: MeemType.Original,
				data: '',
				isURILocked: true,
				mintedBy: signers[0].address,
				reactionTypes: [],
				uriSource: UriSource.TokenUri
			},
			{ ...defaultOpenProperties, transferLockupUntil: lockupUntil },
			defaultOpenProperties
		)

		await (
			await contracts.meemBaseFacet.connect(signers[2]).mint(
				{
					to: signers[2].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					data: '',
					isURILocked: true,
					mintedBy: signers[0].address,
					reactionTypes: [],
					uriSource: UriSource.TokenUri
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()

		await (
			await contracts.eRC721Facet
				.connect(signers[2])
				.transferFrom(signers[2].address, signers[3].address, token1)
		).wait()
	})

	it('Can not transfer meem if isTransferrable=false', async () => {
		await contracts.meemBaseFacet.connect(signers[1]).mint(
			{
				to: signers[1].address,
				tokenURI: ipfsURL,
				parentChain: Chain.Polygon,
				parent: zeroAddress,
				parentTokenId: 0,
				meemType: MeemType.Original,
				data: '',
				isURILocked: true,
				mintedBy: signers[0].address,
				reactionTypes: [],
				uriSource: UriSource.TokenUri
			},
			{ ...defaultOpenProperties, isTransferrable: false },
			defaultOpenProperties
		)

		await (
			await contracts.meemBaseFacet.connect(signers[2]).mint(
				{
					to: signers[2].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					data: '',
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
				.connect(signers[2])
				.transferFrom(signers[2].address, signers[3].address, token1)
		)
	})

	it('Can transfer meem if isTransferrable=true', async () => {
		await contracts.meemBaseFacet.connect(signers[1]).mint(
			{
				to: signers[1].address,
				tokenURI: ipfsURL,
				parentChain: Chain.Polygon,
				parent: zeroAddress,
				parentTokenId: 0,
				meemType: MeemType.Original,
				data: '',
				isURILocked: true,
				mintedBy: signers[0].address,
				reactionTypes: [],
				uriSource: UriSource.TokenUri
			},
			{ ...defaultOpenProperties, isTransferrable: true },
			defaultOpenProperties
		)

		await (
			await contracts.meemBaseFacet.connect(signers[2]).mint(
				{
					to: signers[2].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					data: '',
					isURILocked: true,
					mintedBy: signers[0].address,
					reactionTypes: [],
					uriSource: UriSource.TokenUri
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()

		await (
			await contracts.eRC721Facet
				.connect(signers[2])
				.transferFrom(signers[2].address, signers[3].address, token1)
		).wait()
	})
})
