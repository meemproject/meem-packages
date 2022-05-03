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
import { getMeemContract } from '../src/lib/contract'
import { zeroAddress } from '../src/lib/utils'
import { deployDiamond } from '../tasks'
import { Meem } from '../types'
import meemABI from '../types/Meem.json'

use(chaiAsPromised)

describe('Purchase Original', function Test() {
	let contract: Meem
	let signers: SignerWithAddress[]
	let contractAddress: string
	const ipfsURL = 'ipfs://QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/1'
	const token0 = 100000

	before(async () => {
		signers = await ethers.getSigners()
		const { DiamondProxy } = await deployDiamond({
			args: {
				deployProxy: true
			},
			ethers
		})

		contractAddress = DiamondProxy

		contract = getMeemContract({ contractAddress, signer: signers[0] })
	})

	it('Can purchase', async () => {
		await contract.setMintPermissions([
			{
				permission: Permission.Addresses,
				addresses: [signers[1].address],
				lockedBy: zeroAddress,
				costWei: 1000,
				numTokens: 0
			}
		])

		const props = await contract.getBaseProperties()
		assert.equal(props.mintPermissions[0].permission, Permission.Addresses)
		assert.equal(props.mintPermissions[0].addresses[0], signers[1].address)
		assert.equal(props.mintPermissions[0].lockedBy, zeroAddress)
		assert.equal(props.mintPermissions[0].costWei.toNumber(), 1000)
		assert.equal(props.mintPermissions[0].numTokens.toNumber(), 0)

		const signer1 = getMeemContract({ contractAddress, signer: signers[1] })
		const tx = await signer1.mint(
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
			defaultOpenProperties,
			{
				value: 1000
			}
		)

		console.log({ tx })

		const meem = await signer1.getMeem(token0)
		assert.equal(meem.owner, signers[1].address)
	})
})
