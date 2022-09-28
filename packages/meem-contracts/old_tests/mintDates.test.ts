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

describe('Mint Dates', function Test() {
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

	it('Can mint inside mint dates', async () => {
		const start = Math.floor(DateTime.now().toSeconds())
		const end = Math.floor(
			DateTime.now()
				.plus({
					days: 10
				})
				.toSeconds()
		)

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
					uriSource: UriSource.Url
				},
				{
					...defaultOpenProperties,
					mintStartTimestamp: start,
					mintEndTimestamp: end
				},
				defaultOpenProperties
			)
		).wait()

		await (
			await contracts.meemBaseFacet.connect(signers[2]).mint(
				{
					to: signers[1].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					isURILocked: true,
					mintedBy: signers[2].address,
					reactionTypes: [],
					uriSource: UriSource.Url
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()
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
					uriSource: UriSource.Url
				},
				{
					...defaultOpenProperties,
					mintStartTimestamp: start,
					mintEndTimestamp: end
				},
				defaultOpenProperties
			)
		).wait()

		await assert.isRejected(
			contracts.meemBaseFacet.connect(signers[2]).mint(
				{
					to: signers[1].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					isURILocked: true,
					mintedBy: signers[2].address,
					reactionTypes: [],
					uriSource: UriSource.Url
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		)
	})
})
