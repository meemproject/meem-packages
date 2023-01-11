import {
	getCuts,
	getMerkleInfo,
	IFacetVersion
} from '@meemproject/meem-contracts'
import { IDiamondCut__factory } from '@meemproject/meem-contracts/dist/typechain'
import { ethers } from 'ethers'
import type { PayableOverrides } from 'ethers'
import makeSlug from 'slug'
import {
	Agreement__factory,
	Agreement as AgreementContract,
	InitParamsStruct,
	SetRoleItemStruct,
	PromiseOrValue
} from '../generated/agreement.generated'
import { MeemAPI } from '../generated/api.generated'
import { GetBundleByIdQuery, GetContractQuery } from '../generated/graphql'
import { GET_BUNDLE_BY_ID, GET_CONTRACT_QUERY } from '../gql/agreement.gql'
import { makeRequest } from '../lib/fetcher'
import { apolloClient } from '../lib/GQLClient'
import log from '../lib/log'

export interface ICreateAgreementBaseOptions {
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

export const getAgreementContract = (options: {
	/** The contract address */
	address: string

	/** The abi to use. If omitted will use the latest version Agreement abi. */
	abi?: Record<string, any>[]

	/** The signer to use. If omitted will use the default signer. */
	signer: ethers.Signer
}) => {
	const { address, abi, signer } = options

	const agreement = abi
		? new ethers.Contract(address, abi, signer)
		: Agreement__factory.connect(address, signer)

	return agreement as AgreementContract
}

export class Agreement {
	private jwt?: string

	public constructor(options: { jwt?: string }) {
		this.jwt = options.jwt
	}

	/** Sets the JWT used in api calls */
	public setJwt(jwt?: string) {
		this.jwt = jwt
	}

	/** Create a new agreement */
	public async createAgreement(
		options: ICreateAgreementBaseOptions &
			MeemAPI.v1.CreateAgreement.IRequestBody
	) {
		const {
			proxyContractId,
			signer,
			bundleId,
			symbol,
			name,
			maxSupply,
			members,
			mintPermissions,
			shouldMintTokens,
			contractURI,
			roles,
			splits,
			isTransferLocked,
			metadata,
			minters,
			chainId,
			isMaxSupplyLocked,
			admins,
			tokenMetadata,
			shouldCreateAdminRole
		} = options
		const useMeemAPI = options.useMeemAPI !== false

		if (useMeemAPI) {
			const result = await makeRequest<MeemAPI.v1.CreateAgreement.IDefinition>(
				MeemAPI.v1.CreateAgreement.path(),
				{
					jwt: this.jwt,
					method: MeemAPI.v1.CreateAgreement.method,
					body: {
						name,
						metadata,
						chainId,
						maxSupply,
						isMaxSupplyLocked,
						symbol,
						admins,
						minters,
						mintPermissions,
						splits,
						isTransferLocked,
						shouldMintTokens,
						members,
						tokenMetadata,
						shouldCreateAdminRole
					}
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
				symbol: symbol ?? makeSlug(name, { lower: true }),
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
		}
	}

	/** Re-initialize the contract and change the contract settings. */
	public async reInitialize(options: {
		/** The agreement to update */
		agreementId: string

		/** The name of the contract */
		name?: string

		/** The max number of tokens */
		maxSupply?: string

		/** Agreement contract metadata */
		metadata?: MeemAPI.IMeemMetadataLike

		/** The contract symbol. If omitted, will use slug generated from name */
		symbol?: string

		/** Contract admin addresses */
		admins?: string[]

		/** Special minter permissions */
		minters?: string[]

		/** Minting permissions */
		mintPermissions?: Omit<MeemAPI.IMeemPermission, 'merkleRoot'>[]

		/** Splits for minting / transfers */
		splits?: MeemAPI.IMeemSplit[]

		/** Whether tokens can be transferred */
		isTransferLocked?: boolean
	}) {
		const {
			agreementId,
			name,
			maxSupply,
			metadata,
			symbol,
			admins,
			minters,
			mintPermissions,
			splits,
			isTransferLocked
		} = options
		const result =
			await makeRequest<MeemAPI.v1.ReInitializeAgreement.IDefinition>(
				MeemAPI.v1.ReInitializeAgreement.path({ agreementId }),
				{
					jwt: this.jwt,
					method: MeemAPI.v1.ReInitializeAgreement.method,
					body: {
						name,
						maxSupply,
						metadata,
						symbol,
						admins,
						minters,
						mintPermissions,
						splits,
						isTransferLocked
					}
				}
			)

		return result
	}

	/** Bulk mint tokens */
	public async bulkMint(options: {
		agreementId: string
		tokens: {
			/** The token metadata */
			metadata?: MeemAPI.IMeemMetadataLike

			/** The address where the token will be minted */
			to: string
		}[]
	}) {
		const { agreementId, tokens } = options

		const result =
			await makeRequest<MeemAPI.v1.BulkMintAgreementTokens.IDefinition>(
				MeemAPI.v1.BulkMintAgreementTokens.path({ agreementId }),
				{
					jwt: this.jwt,
					method: MeemAPI.v1.BulkMintAgreementTokens.method,
					body: {
						tokens
					}
				}
			)

		return result
	}

	/** Mint a token directly on the contract. */
	public async mint(options: {
		/** The wallet used to mint the token */
		signer: ethers.Signer

		/** The agreement contract address */
		address: string

		/**
		 * The token metadata.
		 * Will save the metadata on-chain.
		 *
		 * If you're saving large metadata, it's recommended you save to IPFS first
		 * and then pass tokenURI instead
		 *
		 * Required if tokenURI is not specified. */
		metadata?: MeemAPI.IMeemMetadataLike

		/** The token URI. Required if metadata is not specified. */
		tokenURI?: string

		/** The address where the token will be minted */
		to: string

		/** The token type */
		tokenType?: MeemAPI.MeemType

		/** Wait for the transaction to complete before returning. Default true. */
		shouldWait?: boolean

		/** Transaction overrides */
		overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
	}) {
		const { signer, address, metadata, to, tokenType, shouldWait } = options
		let { tokenURI } = options

		if (!tokenURI && metadata) {
			const buf = Buffer.from(JSON.stringify(metadata))
			tokenURI = `data:application/json;base64,${buf.toString('base64')}`
		}

		if (!tokenURI) {
			throw new Error('MISSING_PARAMETERS')
		}

		const agreement = getAgreementContract({
			address,
			signer
		})

		const tx = await agreement.mint({
			to,
			tokenType: tokenType ?? MeemAPI.MeemType.Original,
			tokenURI
		})

		if (shouldWait !== false) {
			await tx.wait()
		}

		return tx
	}

	/** Update off-chain agreement data */
	public async updateAgreement(options: MeemAPI.v1.UpdateAgreement.IRequestBody & {
		/** The agreement */
		agreementId: string
	}) {
		const { agreementId, ...updateProperties } = options
		const result =
			await makeRequest<MeemAPI.v1.UpdateAgreement.IDefinition>(
				MeemAPI.v1.UpdateAgreement.path({ agreementId }),
				{
					jwt: this.jwt,
					method: MeemAPI.v1.UpdateAgreement.method,
					body: {
						...updateProperties
					}
				}
			)

		return result
	}

	/** Fetch the merkle proof required for this user to mint. */
	public async getMintingProof(options: {
		/** The agreement */
		agreementId: string

		/** The address where the token will be minted */
		to: string
	}) {
		const { agreementId } = options

		const result = await makeRequest<MeemAPI.v1.GetMintingProof.IDefinition>(
			MeemAPI.v1.GetMintingProof.path({ agreementId }),
			{
				jwt: this.jwt,
				method: MeemAPI.v1.GetMintingProof.method
			}
		)

		return result
	}

	/** Upgrade an agreement */
	public async upgradeAgreement(options: {
		/** The agreement to upgrade */
		agreementId: string

		/** Specify the bundle id to upgrade to. Defaults to latest Agreements bundle */
		bundleId?: string
	}) {
		const { agreementId, bundleId } = options

		const result = await makeRequest<MeemAPI.v1.UpgradeAgreement.IDefinition>(
			MeemAPI.v1.UpgradeAgreement.path({ agreementId }),
			{
				jwt: this.jwt,
				method: MeemAPI.v1.UpgradeAgreement.method,
				body: {
					bundleId
				}
			}
		)

		return result
	}

	/** Create a new agreement */
	public async createSafe(options: {
		/** The agreement to create the club safe for */
		agreementId: string

		/** Addresses of the safe owners */
		safeOwners: string[]

		/** Set the chain where the safe should be created. Defaults to the chain where the agreement lives. */
		chainId?: number

		/** The number of signatures required */
		threshold?: number
	}) {
		const { agreementId, safeOwners, chainId, threshold } = options
		const result =
			await makeRequest<MeemAPI.v1.CreateAgreementSafe.IDefinition>(
				MeemAPI.v1.CreateAgreementSafe.path({ agreementId }),
				{
					jwt: this.jwt,
					method: MeemAPI.v1.CreateAgreementSafe.method,
					body: {
						safeOwners,
						chainId,
						threshold
					}
				}
			)

		return result
	}

	/** Sets the address of the Agreement safe */
	public async setSafeAddress(options: {
		/** The agreement */
		agreementId: string

		/** The safe address */
		address: string
	}) {
		const { agreementId, address } = options
		const result =
			await makeRequest<MeemAPI.v1.SetAgreementSafeAddress.IDefinition>(
				MeemAPI.v1.SetAgreementSafeAddress.path({ agreementId }),
				{
					jwt: this.jwt,
					method: MeemAPI.v1.SetAgreementSafeAddress.method,
					body: {
						address
					}
				}
			)

		return result
	}

	/** Set the agreement admin role */
	public async setAgreementAdminRole(options: {
		/** The agreement */
		agreementId: string

		/** The id of the agreement role to set as agreement admin role */
		adminAgreementRoleId: string
	}) {
		const { agreementId, adminAgreementRoleId } = options
		const result =
			await makeRequest<MeemAPI.v1.SetAgreementAdminRole.IDefinition>(
				MeemAPI.v1.SetAgreementAdminRole.path({ agreementId }),
				{
					jwt: this.jwt,
					method: MeemAPI.v1.SetAgreementAdminRole.method,
					body: {
						adminAgreementRoleId
					}
				}
			)

		return result
	}

	/** Create a new agreement */
	public async createAgreementRole(
		options: ICreateAgreementBaseOptions &
			MeemAPI.v1.CreateAgreementRole.IRequestBody & {
				/** The id of the agreement */
				agreementId: string
			}
	) {
		const {
			agreementId,
			// proxyContractId,
			// signer,
			// bundleId,
			symbol,
			name,
			maxSupply,
			members,
			shouldMintTokens,
			// contractURI,
			// roles,
			splits,
			isTransferLocked,
			metadata,
			isMaxSupplyLocked,
			tokenMetadata
		} = options
		const useMeemAPI = options.useMeemAPI !== false

		if (useMeemAPI) {
			const result =
				await makeRequest<MeemAPI.v1.CreateAgreementRole.IDefinition>(
					MeemAPI.v1.CreateAgreementRole.path({
						agreementId
					}),
					{
						jwt: this.jwt,
						method: MeemAPI.v1.CreateAgreementRole.method,
						body: {
							name,
							metadata,
							maxSupply,
							isMaxSupplyLocked,
							symbol,
							splits,
							isTransferLocked,
							shouldMintTokens,
							members,
							tokenMetadata
						}
					}
				)

			return result
		} else {
			// TODO: Non API create agreement role
			// if (!proxyContractId || !signer || !bundleId || !contractURI) {
			// 	throw new Error('MISSING_PARAMETERS')
			// }
			// const result = await apolloClient.query<GetContractQuery>({
			// 	query: GET_CONTRACT_QUERY,
			// 	variables: { contractId: proxyContractId }
			// })
			// const bundleResult = await apolloClient.query<GetBundleByIdQuery>({
			// 	query: GET_BUNDLE_BY_ID,
			// 	variables: { id: bundleId }
			// })
			// if (!result.data.Contracts[0].bytecode) {
			// 	throw new Error('CONTRACT_NOT_FOUND')
			// }
			// // Build mint permissions
			// const builtMintPermissions: MeemAPI.IMeemPermission[] = []
			// if (mintPermissions) {
			// 	mintPermissions.forEach(m => {
			// 		if (m.permission === MeemAPI.Permission.Addresses) {
			// 			const { rootHash } = getMerkleInfo({ addresses: m.addresses })
			// 			const perm = {
			// 				...m,
			// 				merkleRoot: rootHash
			// 			}
			// 			builtMintPermissions.push({ ...perm, addresses: [] })
			// 		} else {
			// 			const perm = {
			// 				...m,
			// 				merkleRoot: ethers.utils.formatBytes32String('')
			// 			}
			// 			builtMintPermissions.push(perm)
			// 		}
			// 	})
			// }
			// const contractInitParams: InitParamsStruct = {
			// 	symbol: symbol ?? slug(name, { lower: true }),
			// 	name,
			// 	contractURI,
			// 	roles: roles ?? [],
			// 	maxSupply,
			// 	mintPermissions: builtMintPermissions,
			// 	splits: splits ?? [],
			// 	isTransferLocked: isTransferLocked ?? false
			// }
			// const proxyContractFactory = new ethers.ContractFactory(
			// 	result.data.Contracts[0].abi,
			// 	{
			// 		object: result.data.Contracts[0].bytecode
			// 	},
			// 	signer
			// )
			// const deployerAddress = await signer.getAddress()
			// const proxyContract = await proxyContractFactory.deploy(
			// 	deployerAddress,
			// 	[],
			// 	{
			// 		gasLimit: 6000000
			// 	}
			// )
			// log.info(`Deployed proxy contract w/ tx: ${proxyContract.hash}`)
			// await proxyContract.deployed()
			// log.info(`Deployed proxy contract at ${proxyContract.address}`)
			// const diamondCutContract = IDiamondCut__factory.connect(
			// 	proxyContract.address,
			// 	signer
			// )
			// const toVersion: IFacetVersion[] = []
			// const bundle = bundleResult.data.Bundles[0]
			// bundle.BundleContracts?.forEach(bc => {
			// 	const contractInstance =
			// 		bc.Contract?.ContractInstances && bc.Contract?.ContractInstances[0]
			// 	if (!contractInstance) {
			// 		throw new Error('FACET_NOT_DEPLOYED')
			// 	}
			// 	toVersion.push({
			// 		address: contractInstance.address,
			// 		functionSelectors: bc.functionSelectors
			// 	})
			// })
			// const cuts = getCuts({
			// 	proxyContractAddress: proxyContract.address,
			// 	fromVersion: [],
			// 	toVersion
			// })
			// const iFace = new ethers.utils.Interface(bundle.abi)
			// const functionCall = iFace.encodeFunctionData('initialize', [
			// 	contractInitParams
			// ])
			// log.debug(contractInitParams)
			// const tx = await diamondCutContract.diamondCut(
			// 	cuts,
			// 	proxyContract.address,
			// 	functionCall
			// )
			// await tx.wait()
		}
	}

	/** Re-initialize the contract and change the contract settings. */
	public async reInitializeAgreementRole(options: {
		/** The id of the agreement */
		agreementId: string

		/** The id of the agreement role */
		agreementRoleId: string

		/** The name of the contract */
		name?: string

		/** The max number of tokens */
		maxSupply?: string

		/** Agreement role contract metadata */
		metadata?: MeemAPI.IMeemMetadataLike

		/** The contract symbol. If omitted, will use slug generated from name */
		symbol?: string

		/** Splits for minting / transfers */
		splits?: MeemAPI.IMeemSplit[]

		/** Whether tokens can be transferred */
		isTransferLocked?: boolean
	}) {
		const {
			agreementId,
			agreementRoleId,
			name,
			maxSupply,
			metadata,
			symbol,
			splits,
			isTransferLocked
		} = options
		const result =
			await makeRequest<MeemAPI.v1.ReInitializeAgreement.IDefinition>(
				MeemAPI.v1.ReInitializeAgreementRole.path({
					agreementId,
					agreementRoleId
				}),
				{
					jwt: this.jwt,
					method: MeemAPI.v1.ReInitializeAgreement.method,
					body: {
						name,
						maxSupply,
						metadata,
						symbol,
						splits,
						isTransferLocked
					}
				}
			)

		return result
	}

	/** Upgrade an agreement role */
	public async upgradeAgreementRole(options: {
		/** The id of the agreement */
		agreementId: string

		/** The agreement role to upgrade */
		agreementRoleId: string

		/** Specify the bundle id to upgrade to. Defaults to latest Agreements bundle */
		bundleId?: string
	}) {
		const { agreementId, agreementRoleId, bundleId } = options

		const result =
			await makeRequest<MeemAPI.v1.UpgradeAgreementRole.IDefinition>(
				MeemAPI.v1.UpgradeAgreementRole.path({ agreementId, agreementRoleId }),
				{
					jwt: this.jwt,
					method: MeemAPI.v1.UpgradeAgreement.method,
					body: {
						bundleId
					}
				}
			)

		return result
	}

	/** Bulk mint agreement role tokens */
	public async bulkMintAgreementRoleTokens(options: {
		/** The id of the agreement */
		agreementId: string
		/** The id of the agreement role */
		agreementRoleId: string
		tokens: {
			/** The token metadata */
			metadata?: MeemAPI.IMeemMetadataLike

			/** The address where the token will be minted */
			to: string
		}[]
	}) {
		const { agreementId, agreementRoleId, tokens } = options

		const result =
			await makeRequest<MeemAPI.v1.BulkMintAgreementRoleTokens.IDefinition>(
				MeemAPI.v1.BulkMintAgreementRoleTokens.path({
					agreementId,
					agreementRoleId
				}),
				{
					jwt: this.jwt,
					method: MeemAPI.v1.BulkMintAgreementRoleTokens.method,
					body: {
						tokens
					}
				}
			)

		return result
	}

	/** Create an agreement extension */
	public async createAgreementExtension(options: {
		/** The id of the agreement */
		agreementId: string
		/** The id of the extension to enable */
		extensionId: string
		/** Optional metadata associated with this extension */
		metadata?: MeemAPI.IMeemMetadataLike
		/** Optional external link associated with this extension */
		externalLink?: {
			/** Url for the link */
			url: string
			/** The link label */
			label?: string
			/** Visibility of the link extension */
			visibility?: MeemAPI.AgreementExtensionVisibility
		}
		/** Optional widget data associated with this extension */
		widget?: {
			/** Metadata associated with the extension widget */
			metadata?: MeemAPI.IMeemMetadataLike
			/** Visibility of the extension widget */
			visibility?: MeemAPI.AgreementExtensionVisibility
		}
	}) {
		const { agreementId, extensionId, metadata, externalLink, widget } = options

		const result =
			await makeRequest<MeemAPI.v1.CreateAgreementExtension.IDefinition>(
				MeemAPI.v1.CreateAgreementExtension.path({ agreementId }),
				{
					jwt: this.jwt,
					method: MeemAPI.v1.CreateAgreementExtension.method,
					body: {
						extensionId,
						metadata,
						externalLink,
						widget
					}
				}
			)

		return result
	}

	/** Update an agreement extension */
	public async updateAgreementExtension(options: {
		/** The id of the agreement */
		agreementId: string
		/** The agreement extension id */
		agreementExtensionId: string
		/** Optional metadata associated with this extension */
		metadata?: MeemAPI.IMeemMetadataLike
		/** Optional external link associated with this extension */
		externalLink?: {
			/** Url for the link */
			url: string
			/** The link label */
			label?: string
			/** Visibility of the link extension */
			visibility?: MeemAPI.AgreementExtensionVisibility
		}
		/** Optional widget data associated with this extension */
		widget?: {
			/** Whether widget should be enabled */
			isEnabled: boolean
			/** Metadata associated with the extension widget */
			metadata?: MeemAPI.IMeemMetadataLike
		}
	}) {
		const {
			agreementId,
			agreementExtensionId,
			metadata,
			externalLink,
			widget
		} = options

		const result =
			await makeRequest<MeemAPI.v1.UpdateAgreementExtension.IDefinition>(
				MeemAPI.v1.UpdateAgreementExtension.path({
					agreementId,
					agreementExtensionId
				}),
				{
					jwt: this.jwt,
					method: MeemAPI.v1.UpdateAgreementExtension.method,
					body: {
						metadata,
						externalLink,
						widget
					}
				}
			)

		return result
	}
}
