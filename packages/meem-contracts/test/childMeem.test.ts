import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { assert, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { ethers } from 'hardhat'
import { defaultOpenProperties } from '../src/lib/meemProperties'
import { Chain, MeemType, UriSource } from '../src/lib/meemStandard'
import { deployDiamond } from '../tasks'
import { MeemBaseFacet, MeemQueryFacet } from '../typechain'

use(chaiAsPromised)

describe('Child Meem Minting', function Test() {
	let meemFacet: MeemBaseFacet
	let queryFacet: MeemQueryFacet
	let signers: SignerWithAddress[]
	let contractAddress: string
	const parent = '0xc4A383d1Fd38EDe98F032759CE7Ed8f3F10c82B0'
	const ipfsURL = 'ipfs://QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/1'
	const token0 = 100000
	const token1 = 100001
	const token2 = 100002

	before(async () => {
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
			DiamondAddress
		)) as MeemBaseFacet
		queryFacet = (await ethers.getContractAt(
			'MeemQueryFacet',
			contractAddress
		)) as MeemQueryFacet

		const { status } = await (
			await meemFacet.connect(signers[0]).mint(
				{
					to: signers[0].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent,
					parentTokenId: 0,
					meemType: MeemType.Wrapped,
					isURILocked: false,
					reactionTypes: [],
					uriSource: UriSource.Url,
					mintedBy: signers[0].address
				},
				{
					...defaultOpenProperties
					// copyPermissions: [
					// 	{
					// 		permission: Permission.Addresses,
					// 		addresses: [signers[1].address],
					// 		numTokens: 0,
					// 		lockedBy: zeroAddress
					// 	}
					// ],
					// remixPermissions: [
					// 	{
					// 		permission: Permission.Addresses,
					// 		addresses: [signers[1].address],
					// 		numTokens: 0,
					// 		lockedBy: zeroAddress
					// 	}
					// ]
				},
				{
					...defaultOpenProperties,
					splits: [
						...defaultOpenProperties.splits,
						{
							toAddress: signers[1].address,
							amount: 100,
							lockedBy: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
						},
						{
							toAddress: signers[2].address,
							amount: 100,
							lockedBy: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
						}
					]
				}
			)
		).wait()
		assert.equal(status, 1)
	})

	it('Can not mint child without required splits', async () => {
		await assert.isRejected(
			meemFacet.connect(signers[0]).mint(
				{
					to: signers[4].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					isURILocked: false,
					reactionTypes: [],
					uriSource: UriSource.Url,
					mintedBy: signers[0].address
				},
				defaultOpenProperties,
				defaultOpenProperties
			)
		)
	})

	it('Can mint child with required splits', async () => {
		const mintData = {
			...defaultOpenProperties,
			splits: [
				...defaultOpenProperties.splits,
				{
					toAddress: signers[1].address,
					amount: 100,
					lockedBy: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
				},
				{
					toAddress: signers[2].address,
					amount: 100,
					lockedBy: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
				}
			]
		}
		const { status } = await (
			await meemFacet.connect(signers[0]).mint(
				{
					to: signers[4].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					isURILocked: false,
					reactionTypes: [],
					uriSource: UriSource.Url,
					mintedBy: signers[0].address
				},
				mintData,
				mintData
			)
		).wait()
		assert.equal(status, 1)
	})

	it('Can mint child as non-minter role', async () => {
		const mintData = {
			...defaultOpenProperties,
			splits: [
				...defaultOpenProperties.splits,
				{
					toAddress: signers[1].address,
					amount: 100,
					lockedBy: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
				},
				{
					toAddress: signers[2].address,
					amount: 100,
					lockedBy: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
				}
			]
		}

		await meemFacet.connect(signers[2]).mint(
			{
				to: signers[4].address,
				tokenURI: ipfsURL,
				parentChain: Chain.Polygon,
				parent: contractAddress,
				parentTokenId: token0,
				meemType: MeemType.Remix,
				isURILocked: false,
				reactionTypes: [],
				uriSource: UriSource.Url,
				mintedBy: signers[0].address
			},
			mintData,
			mintData
		)
	})

	it('Can mint child as approved wallet address', async () => {
		const mintData = {
			...defaultOpenProperties,
			splits: [
				...defaultOpenProperties.splits,
				{
					toAddress: signers[1].address,
					amount: 100,
					lockedBy: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
				},
				{
					toAddress: signers[2].address,
					amount: 100,
					lockedBy: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
				}
			]
		}
		const { status } = await (
			await meemFacet.connect(signers[1]).mint(
				{
					to: signers[4].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token0,
					meemType: MeemType.Remix,
					isURILocked: false,
					reactionTypes: [],
					uriSource: UriSource.Url,
					mintedBy: signers[0].address
				},
				mintData,
				mintData
			)
		).wait()
		assert.equal(status, 1)
	})

	it('Can not mint copy of copy', async () => {
		const mintData = {
			...defaultOpenProperties,
			splits: [
				...defaultOpenProperties.splits,
				{
					toAddress: signers[1].address,
					amount: 100,
					lockedBy: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
				},
				{
					toAddress: signers[2].address,
					amount: 100,
					lockedBy: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
				}
			]
		}
		await assert.isRejected(
			meemFacet.connect(signers[1]).mint(
				{
					to: signers[4].address,
					tokenURI: ipfsURL,
					parentChain: Chain.Polygon,
					parent: contractAddress,
					parentTokenId: token1,
					meemType: MeemType.Copy,
					isURILocked: false,
					reactionTypes: [],
					uriSource: UriSource.Url,
					mintedBy: signers[0].address
				},
				mintData,
				mintData
			)
		)
	})

	it('Can mint with locked URI', async () => {
		const mintData = {
			...defaultOpenProperties,
			splits: [
				...defaultOpenProperties.splits,
				{
					toAddress: signers[1].address,
					amount: 100,
					lockedBy: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
				},
				{
					toAddress: signers[2].address,
					amount: 100,
					lockedBy: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
				}
			]
		}

		await meemFacet.connect(signers[2]).mint(
			{
				to: signers[4].address,
				tokenURI: ipfsURL,
				parentChain: Chain.Polygon,
				parent: contractAddress,
				parentTokenId: token0,
				meemType: MeemType.Remix,
				isURILocked: true,
				reactionTypes: [],
				uriSource: UriSource.Url,
				mintedBy: signers[0].address
			},
			mintData,
			mintData
		)
	})
})
