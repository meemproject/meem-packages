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

	before(async () => {
		signers = await ethers.getSigners()
		const { DiamondProxy } = await deployDiamond({
			args: {
				proxy: true,
				noInit: true
			},
			ethers
		})

		contractAddress = DiamondProxy

		contracts = await getMeemContracts(DiamondProxy)
	})

	it('Can deploy and init and not init again', async () => {
		const name = 'test'
		const symbol = 'TEST'

		await (
			await contracts.adminFacet.initialize({
				name,
				symbol,
				contractURI,
				roles: [
					{
						role: '0x189ab7a9244df0848122154315af71fe140f3db0fe014031783b0946b8c9d2e3',
						user: '0xde19C037a85A609ec33Fc747bE9Db8809175C3a5',
						hasRole: true
					}
				],
				mintPermissions: [],
				maxSupply: 0,
				isTransferLocked: false,
				splits: []
			})
		).wait()

		const contractName = await contracts.meemBaseERC721Facet.name()

		console.log({ contractName })

		assert.equal(await contracts.meemBaseERC721Facet.name(), name)
		assert.equal(await contracts.meemBaseERC721Facet.symbol(), symbol)
		assert.equal(await contracts.adminFacet.contractURI(), contractURI)

		await assert.isRejected(
			contracts.adminFacet.initialize({
				name,
				symbol,
				contractURI,
				roles: [
					{
						role: '0x189ab7a9244df0848122154315af71fe140f3db0fe014031783b0946b8c9d2e3',
						user: '0xde19C037a85A609ec33Fc747bE9Db8809175C3a5',
						hasRole: true
					}
				],
				mintPermissions: [],
				maxSupply: 0,
				isTransferLocked: false,
				splits: []
			})
		)
	})
})
