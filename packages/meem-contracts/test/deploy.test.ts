import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { assert, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Contract } from 'ethers'
import { ethers } from 'hardhat'
import _ from 'lodash'
import { DateTime } from 'luxon'
import { deployProxy, initProxy, IVersion } from '../src'
import { Chain, Permission } from '../src/lib/meemStandard'
import { zeroAddress } from '../src/lib/utils'
import { deployDiamond } from '../tasks'
import { Meem } from '../types'
import meemABI from '../types/Meem.json'
import { MeemContracts } from './helpers'

use(chaiAsPromised)

// !! These deploy tests are VERY slow to execute (call the diamondCut function) if run using vscode launch with debugger. why?!?
describe('Deploy', function Test() {
	let contracts: MeemContracts
	// let meemFacet: MeemBaseFacet
	// let queryFacet: MeemQueryFacet
	let signers: SignerWithAddress[]
	let contractAddress: string
	const ipfsURL = 'ipfs://QmWEFSMku6yGLQ9TQr66HjSd9kay8ZDYKbBEfjNi4pLtrr/1'
	const owner = '0xde19C037a85A609ec33Fc747bE9Db8809175C3a5'
	const nftAddress = '0xaF7Cc059196a09f50632372893617376dAfADFF2'
	const token0 = 100000

	const contractURI = `{"name": "Meem","description": "Meems are pieces of digital content wrapped in more advanced dynamic property rights.","image": "https://meem-assets.s3.amazonaws.com/meem.jpg","external_link": "https://meem.wtf","seller_fee_basis_points": 0, "fee_recipient": ""}`
	const facetAddresses = {
		AccessControlFacet: '',
		ClippingFacet: '',
		ERC721Facet: '',
		InitDiamond: '',
		MeemAdminFacet: '',
		MeemBaseFacet: '',
		MeemPermissionsFacet: '',
		MeemQueryFacet: '',
		MeemSplitsFacet: '',
		ReactionFacet: ''
	}

	let version: IVersion

	before(async () => {
		signers = await ethers.getSigners()
		const { DiamondProxy } = await deployDiamond({
			args: {
				deployProxy: false
			},
			ethers
		})

		// eslint-disable-next-line import/no-unresolved
		const deployHistory = await import('../.diamond/31337.json')
		// @ts-ignore
		version = deployHistory[zeroAddress] as IVersion
	})

	it('Can deploy and init', async () => {
		const provider = ethers.getDefaultProvider()
		const proxy = await deployProxy({
			signer: signers[0]
		})

		assert.isOk(proxy.address)

		const tx = await initProxy({
			signer: signers[0],
			proxyContractAddress: proxy.address,
			chain: Chain.Rinkeby,
			name: 'Test Meem',
			symbol: 'TME',
			contractURI,
			customVersion: version
		})

		assert.isOk(tx.hash)

		const contract = new Contract(
			proxy.address,
			meemABI,
			signers[0]
		) as unknown as Meem

		const uri = await contract.contractURI()

		assert.equal(
			Buffer.from(
				uri.replace('data:application/json;base64,', ''),
				'base64'
			).toString(),
			contractURI
		)
	})

	it('Can init custom baseProperties', async () => {
		const provider = ethers.getDefaultProvider()
		const proxy = await deployProxy({
			signer: signers[1]
		})

		assert.isOk(proxy.address)

		const bp = {
			totalOriginalsSupply: 100,
			totalOriginalsSupplyLockedBy: signers[1].address,
			mintPermissions: [
				{
					permission: Permission.Addresses,
					addresses: [signers[1].address, signers[1].address],
					numTokens: 0,
					lockedBy: signers[1].address,
					costWei: 1000
				}
			],
			mintPermissionsLockedBy: signers[1].address,
			splits: [
				{
					toAddress: signers[1].address,
					amount: 100,
					// lockedBy: signers[1].address
					lockedBy: zeroAddress
				}
			],
			// splitsLockedBy: signers[1].address,
			splitsLockedBy: zeroAddress,
			originalsPerWallet: 1,
			originalsPerWalletLockedBy: signers[1].address,
			isTransferrable: false,
			isTransferrableLockedBy: signers[1].address,
			mintStartTimestamp: Math.floor(DateTime.now().toSeconds()),
			mintEndTimestamp: Math.floor(
				DateTime.now()
					.plus({
						days: 30
					})
					.toSeconds()
			),
			mintDatesLockedBy: signers[1].address
		}

		const tx = await initProxy({
			signer: signers[1],
			proxyContractAddress: proxy.address,
			chain: Chain.Rinkeby,
			name: 'Test Meem',
			symbol: 'TME',
			contractURI,
			customVersion: version,
			baseProperties: bp
		})

		assert.isOk(tx.hash)

		const contract = new Contract(
			proxy.address,
			meemABI,
			signers[1]
		) as unknown as Meem

		const baseProperties = await contract.getBaseProperties()

		console.log({ baseProperties })
		// assert.isTrue(_.isEqual(baseProperties, bp))
		Object.keys(bp).forEach(key => {
			// TODO: Verify properties
			console.log(key)
		})
	})
})
