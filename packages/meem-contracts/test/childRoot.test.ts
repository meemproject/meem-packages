import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { assert, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { ethers } from 'hardhat'
import { defaultOpenProperties } from '../src/lib/meemProperties'
import {
	Chain,
	MeemType,
	Permission,
	PermissionType,
	PropertyType,
	UriSource
} from '../src/lib/meemStandard'
import { zeroAddress } from '../src/lib/utils'
import { deployDiamond } from '../tasks'
import {
	ERC721Facet,
	MeemAdminFacet,
	MeemBaseFacet,
	MeemPermissionsFacet,
	MeemQueryFacet
} from '../typechain'

use(chaiAsPromised)

describe('Child root properties', function Test() {
	let meemFacet: MeemBaseFacet
	let meemAdminFacet: MeemAdminFacet
	let erc721Facet: ERC721Facet
	let meemPermissionsFacet: MeemPermissionsFacet
	let queryFacet: MeemQueryFacet
	let signers: SignerWithAddress[]
	let contractAddress: string
	const ipfsURL = 'ipfs://QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/1'
	const owner = '0xde19C037a85A609ec33Fc747bE9Db8809175C3a5'
	const nftAddress = '0xaF7Cc059196a09f50632372893617376dAfADFF2'
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

		erc721Facet = (await ethers.getContractAt(
			'ERC721Facet',
			contractAddress
		)) as ERC721Facet

		meemPermissionsFacet = (await ethers.getContractAt(
			'MeemPermissionsFacet',
			contractAddress
		)) as MeemPermissionsFacet

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

	it('Can properly sets root info for children of original', async () => {
		await mintZeroMeem()
		const { status } = await (
			await meemFacet.connect(signers[1]).mint(
				{
					to: signers[4].address,
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

		const meem = await queryFacet.getMeem(token1)
		assert.equal(meem.root, contractAddress)
		assert.equal(meem.rootTokenId.toNumber(), token0)
	})

	it('Can properly sets root info for children where parent has root set', async () => {
		await mintZeroMeem()
		const { status } = await (
			await meemFacet.connect(signers[0]).mint(
				{
					to: signers[4].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Ethereum,
					parent: nftAddress,
					parentTokenId: 2000,
					meemType: MeemType.Wrapped,
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

		await (
			await meemFacet.connect(signers[1]).mint(
				{
					to: signers[4].address,
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

		const meem = await queryFacet.getMeem(token1)
		assert.equal(meem.root, nftAddress)
		assert.equal(meem.rootChain, Chain.Ethereum)
		assert.equal(meem.rootTokenId.toNumber(), 2000)
	})
})
