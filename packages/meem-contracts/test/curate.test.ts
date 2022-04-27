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

describe('Minting Curation', function Test() {
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
		console.log({ signers })
		const { DiamondProxy: DiamondAddress } = await deployDiamond({
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
		assert.equal(status, 1)
	}

	it('Can mint and copy', async () => {
		const copyAddress = signers[1].address
		const { status } = await (
			await meemFacet.connect(signers[0]).mintAndCopy(
				{
					to: owner,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					data: '',
					isURILocked: true,
					mintedBy: copyAddress,
					reactionTypes: [],
					uriSource: UriSource.TokenUri
				},
				{ ...defaultOpenProperties, totalCopies: 1 },
				defaultOpenProperties,
				copyAddress
			)
		).wait()
		assert.equal(status, 1)

		const original = await queryFacet.getMeem(token0)
		const copy = await queryFacet.getMeem(token1)

		assert.equal(original.owner, owner)
		assert.equal(copy.owner, copyAddress)
		assert.equal(original.meemType, MeemType.Original)
		assert.equal(copy.meemType, MeemType.Copy)
		assert.equal(original.mintedBy, copyAddress)
	})

	it('Can mint and remix', async () => {
		const copyAddress = signers[1].address
		const { status } = await (
			await meemFacet.connect(signers[0]).mintAndRemix(
				{
					to: owner,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Original,
					data: '',
					isURILocked: true,
					mintedBy: copyAddress,
					reactionTypes: [],
					uriSource: UriSource.TokenUri
				},
				defaultOpenProperties,
				defaultOpenProperties,
				{
					to: signers[1].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: zeroAddress,
					parentTokenId: 0,
					meemType: MeemType.Remix,
					data: '',
					isURILocked: true,
					mintedBy: copyAddress,
					reactionTypes: [],
					uriSource: UriSource.TokenUri
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		).wait()
		assert.equal(status, 1)

		const original = await queryFacet.getMeem(token0)
		const copy = await queryFacet.getMeem(token1)

		assert.equal(original.owner, owner)
		assert.equal(copy.owner, copyAddress)
		assert.equal(original.meemType, MeemType.Original)
		assert.equal(copy.meemType, MeemType.Remix)
		assert.equal(original.mintedBy, copyAddress)
	})
})
