import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { assert, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Contract } from 'ethers'
import { ethers } from 'hardhat'
import _ from 'lodash'
import { DateTime } from 'luxon'
import { PropertyType } from '../src'
import { zeroAddress } from '../src/lib/utils'
import { deployDiamond } from '../tasks'
import { Meem } from '../types'
import meemABI from '../types/Meem.json'

use(chaiAsPromised)

describe('BaseProperties', function Test() {
	let contract: Meem
	let nonAdminContract: Meem
	let signers: SignerWithAddress[]
	let contractAddress: string
	const ipfsURL = 'ipfs://QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/1'

	before(async () => {
		signers = await ethers.getSigners()
		const { DiamondProxy } = await deployDiamond({
			args: {
				deployProxy: true
			},
			ethers
		})

		contractAddress = DiamondProxy

		contract = new Contract(
			contractAddress,
			meemABI,
			signers[0]
		) as unknown as Meem

		nonAdminContract = new Contract(
			contractAddress,
			meemABI,
			signers[1]
		) as unknown as Meem
	})

	it('Can not set base splits as non-admin', async () => {
		await assert.isRejected(
			nonAdminContract.setBaseSplits([
				{
					toAddress: signers[1].address,
					amount: 100,
					lockedBy: zeroAddress
				}
			])
		)
	})

	it('Can set base splits', async () => {
		await contract.setBaseSplits([
			{
				toAddress: signers[0].address,
				amount: 100,
				lockedBy: zeroAddress
			}
		])

		const props = await contract.getBaseProperties()
		assert.equal(props.splits[0].toAddress, signers[0].address)
		assert.equal(props.splits[0].amount.toNumber(), 100)
		assert.equal(props.splits[0].lockedBy, zeroAddress)
	})

	it('Can not set default splits as non-admin', async () => {
		await assert.isRejected(
			nonAdminContract.setSplits(0, PropertyType.DefaultMeem, [
				{
					toAddress: signers[1].address,
					amount: 100,
					lockedBy: zeroAddress
				}
			])
		)
	})

	it('Can set default splits', async () => {
		await contract.setSplits(0, PropertyType.DefaultMeem, [
			{
				toAddress: signers[0].address,
				amount: 100,
				lockedBy: zeroAddress
			}
		])

		const props = await contract.getDefaultProperties(PropertyType.DefaultMeem)
		assert.equal(props.splits[0].toAddress, signers[0].address)
		assert.equal(props.splits[0].amount.toNumber(), 100)
		assert.equal(props.splits[0].lockedBy, zeroAddress)
	})

	it('Can setTotalOriginalsSupply', async () => {
		await contract.setTotalOriginalsSupply(100)
		const props = await contract.getBaseProperties()
		assert.equal(props.totalOriginalsSupply.toNumber(), 100)
	})

	it('Can not setTotalOriginalsSupply as non-admin', async () => {
		await assert.isRejected(nonAdminContract.setTotalOriginalsSupply(100))
	})

	it('Can setOriginalsPerWallet', async () => {
		await contract.setOriginalsPerWallet(100)
		const props = await contract.getBaseProperties()
		assert.equal(props.originalsPerWallet.toNumber(), 100)
	})

	it('Can not setOriginalsPerWallet as non-admin', async () => {
		await assert.isRejected(nonAdminContract.setOriginalsPerWallet(100))
	})

	it('Can setIsTransferrable', async () => {
		await contract.setIsTransferrable(false)
		const props = await contract.getBaseProperties()
		assert.isFalse(props.isTransferrable)
	})

	it('Can not setIsTransferrable as non-admin', async () => {
		await assert.isRejected(nonAdminContract.setIsTransferrable(false))
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
		await contract.setMintDates(start, end)
		const props = await contract.getBaseProperties()
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
		await assert.isRejected(nonAdminContract.setMintDates(start, end))
	})
})
