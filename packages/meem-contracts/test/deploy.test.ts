import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { assert, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { ethers } from 'hardhat'
import _ from 'lodash'
import { zeroAddress } from '../src/lib/utils'
import { deployDiamond } from '../tasks'
import { getMeemContracts, MeemContracts } from './helpers'

use(chaiAsPromised)

// !! These deploy tests are VERY slow to execute (call the diamondCut function) if run using vscode launch with debugger. why?!?
describe('Deploy', function Test() {
	let contracts: MeemContracts
	let signers: SignerWithAddress[]
	let contractAddress: string
	// const ipfsURL = 'ipfs://QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/1'
	// const owner = '0xde19C037a85A609ec33Fc747bE9Db8809175C3a5'
	// const nftAddress = '0xaF7Cc059196a09f50632372893617376dAfADFF2'
	// const token0 = 100000

	const contractURI = `{"name": "Meem","description": "Meems are pieces of digital content wrapped in more advanced dynamic property rights.","image": "https://meem-assets.s3.amazonaws.com/meem.jpg","external_link": "https://meem.wtf","seller_fee_basis_points": 0, "fee_recipient": ""}`

	let version: IVersion

	before(async () => {
		signers = await ethers.getSigners()
		const { DiamondProxy } = await deployDiamond({
			args: {
				proxy: false
			},
			ethers
		})

		contractAddress = DiamondProxy

		contracts = await getMeemContracts(DiamondProxy)
	})

	it('Can deploy and init and not init again', async () => {
		await (
			await contracts.adminFacet.initialize({
				name: 'test',
				symbol: 'TEST',
				contractURI,
				admins: [],
				minters: [],
				mintPermissions: []
			})
		).wait()

		await assert.isRejected(
			contracts.adminFacet.initialize({
				name: 'test',
				symbol: 'TEST',
				contractURI,
				admins: [],
				minters: [],
				mintPermissions: []
			})
		)
	})
})
