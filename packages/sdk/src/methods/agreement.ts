import {
	getCuts,
	getMerkleInfo,
	IFacetVersion
} from '@meemproject/meem-contracts'
import { IDiamondCut__factory } from '@meemproject/meem-contracts/dist/typechain'
import { ethers } from 'ethers'
import slug from 'slug'
import {
	InitParamsStruct,
	SetRoleItemStruct
} from '../generated/agreement.generated'
import { MeemAPI } from '../generated/api.generated'
import { GetBundleByIdQuery, GetContractQuery } from '../generated/graphql'
import { GET_BUNDLE_BY_ID, GET_CONTRACT_QUERY } from '../gql/agreement.gql'
import { makeRequest } from '../lib/fetcher'
import { apolloClient } from '../lib/GQLClient'
import log from '../lib/log'

export interface ICreateAgreementOptions
	extends MeemAPI.v1.CreateAgreement.IRequestBody {
	/** Default: true. When set to false will call the contract directly. Will require the user to pay gas. */
	useMeemAPI?: boolean

	/** Required when useMeemAPI===false. The proxy contract id from EPM to deploy and initialize. */
	proxyContractId?: string

	/** Required when useMeemAPI===false. The bundle contract id from EPM to use with the proxy contract. */
	bundleId?: string

	/** Required when useMeemAPI===false. The signer to use to deploy the contract. */
	signer?: ethers.Signer

	/** Required when useMeemAPI===false. The URI containing metadata for the contract. */
	contractURI?: string

	/** Optional when useMeemAPI===false. Sets roles at the contract level. */
	roles?: SetRoleItemStruct[]
}

export class Agreement {
	private jwt?: string

	public constructor(options: { jwt?: string }) {
		this.jwt = options.jwt
	}

	public setJwt(jwt?: string) {
		this.jwt = jwt
	}

	/** Create a new agreement */
	public async createAgreement(options: ICreateAgreementOptions) {
		const {
			proxyContractId,
			signer,
			bundleId,
			symbol,
			name,
			maxSupply,
			// members,
			mintPermissions,
			// shouldMintTokens,
			contractURI,
			roles,
			splits,
			isTransferLocked
			// isMaxSupplyLocked
		} = options
		const useMeemAPI = options.useMeemAPI !== false

		if (useMeemAPI) {
			const result = await makeRequest<MeemAPI.v1.CreateAgreement.IDefinition>(
				MeemAPI.v1.CreateAgreement.path(),
				{
					jwt: this.jwt,
					method: MeemAPI.v1.CreateAgreement.method,
					body: options
				}
			)

			return result
		} else {
			// TODO: deploy and init agreement
			if (!proxyContractId || !signer || !bundleId || !contractURI) {
				throw new Error('MISSING_PARAMETERS')
			}
			const result = await apolloClient.query<GetContractQuery>({
				query: GET_CONTRACT_QUERY,
				variables: { contractId: proxyContractId }
			})
			const bundleResult = await apolloClient.query<GetBundleByIdQuery>({
				query: GET_BUNDLE_BY_ID,
				variables: { id: bundleId }
			})
			if (!result.data.Contracts[0].bytecode) {
				throw new Error('CONTRACT_NOT_FOUND')
			}

			// Build mint permissions
			const builtMintPermissions: MeemAPI.IMeemPermission[] = []

			if (mintPermissions) {
				mintPermissions.forEach(m => {
					if (m.permission === MeemAPI.Permission.Addresses) {
						const { rootHash } = getMerkleInfo({ addresses: m.addresses })
						const perm = {
							...m,
							merkleRoot: rootHash
						}
						builtMintPermissions.push({ ...perm, addresses: [] })
					} else {
						const perm = {
							...m,
							merkleRoot: ethers.utils.formatBytes32String('')
						}
						builtMintPermissions.push(perm)
					}
				})
			}

			const contractInitParams: InitParamsStruct = {
				symbol: symbol ?? slug(name, { lower: true }),
				name,
				contractURI,
				roles: roles ?? [],
				maxSupply,
				mintPermissions: builtMintPermissions,
				splits: splits ?? [],
				isTransferLocked: isTransferLocked ?? false
			}
			const proxyContractFactory = new ethers.ContractFactory(
				result.data.Contracts[0].abi,
				{
					object: result.data.Contracts[0].bytecode
				},
				signer
			)

			const deployerAddress = await signer.getAddress()

			const proxyContract = await proxyContractFactory.deploy(
				deployerAddress,
				[],
				{
					gasLimit: 6000000
				}
			)
			log.info(`Deployed proxy contract w/ tx: ${proxyContract.hash}`)
			await proxyContract.deployed()
			log.info(`Deployed proxy contract at ${proxyContract.address}`)
			const diamondCutContract = IDiamondCut__factory.connect(
				proxyContract.address,
				signer
			)
			const toVersion: IFacetVersion[] = []
			const bundle = bundleResult.data.Bundles[0]
			bundle.BundleContracts?.forEach(bc => {
				const contractInstance =
					bc.Contract?.ContractInstances && bc.Contract?.ContractInstances[0]
				if (!contractInstance) {
					throw new Error('FACET_NOT_DEPLOYED')
				}
				toVersion.push({
					address: contractInstance.address,
					functionSelectors: bc.functionSelectors
				})
			})
			const cuts = getCuts({
				proxyContractAddress: proxyContract.address,
				fromVersion: [],
				toVersion
			})
			const iFace = new ethers.utils.Interface(bundle.abi)
			const functionCall = iFace.encodeFunctionData('initialize', [
				contractInitParams
			])
			log.debug(contractInitParams)

			const tx = await diamondCutContract.diamondCut(
				cuts,
				proxyContract.address,
				functionCall
			)

			await tx.wait()

			// return { status: 'success' } as MeemAPI.v1.CreateAgreement.IResponseBody
		}
	}

	public async mint() {}
}
