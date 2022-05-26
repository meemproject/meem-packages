import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { assert, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
// import { Contract } from 'ethers'
import { ethers } from 'hardhat'
import _ from 'lodash'
import { DateTime } from 'luxon'
import { defaultBaseProperties, defaultMeemProperties } from '../src'
import { getMeemContract } from '../src/lib/contract'
import { zeroAddress } from '../src/lib/utils'
import { mint } from '../src/mint'
import { deployDiamond } from '../tasks'
import { MeemAdminFacet, MeemBaseFacet } from '../typechain'
import { Meem } from '../types'
import meemABI from '../types/Meem.json'
import { getMeemContracts, MeemContracts } from './helpers'

use(chaiAsPromised)

describe('Reinitialization', function Test() {
	let contracts: MeemContracts
	let signers: SignerWithAddress[]
	let contractAddress: string
	const ipfsURL = 'ipfs://QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/1'
	const token0 = 100000
	const token1 = 100001
	const token2 = 100002

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

	it('Can reinitialize', async () => {
		await mint({
			proxyContractAddress: contractAddress,
			signer: signers[0],
			shouldWaitforTransaction: true
		})

		await mint({
			proxyContractAddress: contractAddress,
			signer: signers[0],
			shouldWaitforTransaction: true
		})

		const o1 = await contracts.eRC721Facet.ownerOf(token1)
		assert.equal(o1, signers[0].address)

		await (
			await contracts.meemAdminFacet.reInitialize({
				name: 'test',
				symbol: 'TEST',
				childDepth: -1,
				nonOwnerSplitAllocationAmount: 0,
				contractURI: ipfsURL,
				admins: [],
				baseProperties: defaultBaseProperties,
				defaultProperties: defaultMeemProperties,
				defaultChildProperties: defaultMeemProperties,
				tokenCounterStart: 1
			})
		).wait()

		const balance = await contracts.eRC721Facet.balanceOf(signers[0].address)
		assert.equal(balance.toNumber(), 2)

		await mint({
			proxyContractAddress: contractAddress,
			signer: signers[0],
			shouldWaitforTransaction: true
		})

		const o2 = await contracts.eRC721Facet.ownerOf(token2)
		assert.equal(o2, signers[0].address)
	})
})
