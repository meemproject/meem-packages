import type { AccessControlConditions } from '@lit-protocol/constants'
import Lit, { LitNodeClient } from '@lit-protocol/lit-node-client'
import {
	chainIdToTablelandChainName,
	chainIdToLitChainName
} from '@meemproject/utils'
import { connect } from '@tableland/sdk'
import type { Connection } from '@tableland/sdk'
import { MeemAPI } from '../generated/api.generated'
import { makeRequest } from '../lib/fetcher'
import log from '../lib/log'

export interface IPartialAccessControlConditions
	extends Partial<AccessControlConditions> {}

export class Storage {
	private jwt?: string

	private tablelands: Record<number, Connection> = {}

	private lit?: LitNodeClient

	public constructor(options: { jwt?: string }) {
		this.jwt = options.jwt
	}

	/** Sets the JWT used in api calls */
	public setJwt(jwt?: string) {
		this.jwt = jwt
	}

	public async getTablelandInstance(options: { chainId: number }) {
		const { chainId } = options
		if (this.tablelands[chainId]) {
			return this.tablelands[chainId]
		}
		const chainName = chainIdToTablelandChainName(chainId)
		const tableland = await connect({
			network: 'testnet',
			chain: chainName
		})

		this.tablelands[chainId] = tableland

		return tableland
	}

	public async getLitInstance() {
		if (this.lit) {
			return this.lit
		}

		const client = new Lit.LitNodeClient()
		await client.connect()

		this.lit = client

		return client
	}

	public async encryptAndSave(options: {
		/** The chainId to encrypt on */
		chainId: number

		/** The string to encrypt */
		strToEncrypt: string

		/**
		 * The token(s) that may be held in order to decrypt the string
		 *
		 * For advanced customization options see: https://developer.litprotocol.com/SDK/Explanation/encryption
		 */
		accessControlConditions: {
			/** The token contract address */
			contractAddress: string

			/** The chain id to check. Default is the top level chainId */
			chainId?: number

			/** Default is balanceOf */
			method?: 'balanceOf' | 'eth_getBalance'

			/** Default is ERC721 */
			standardContractType?: 'ERC721' | 'ERC1155'

			/** Default is [:userAddress] */
			parameters?: string[]

			/** The test to check if the user hold the correct amount. Default is > 0 */
			returnValueTest?: number
		}[]
	}) {
		const { strToEncrypt, accessControlConditions, chainId } = options

		const defaultLitChain = chainIdToLitChainName(chainId)

		const authSig = await Lit.checkAndSignAuthMessage({
			chain: defaultLitChain
		})

		const builtAccessControlConditions: AccessControlConditions =
			accessControlConditions.map(accessControlCondition => {
				return {
					standardContractType:
						accessControlCondition.standardContractType ?? 'ERC721',
					chain: accessControlCondition.chainId
						? chainIdToLitChainName(accessControlCondition.chainId)
						: defaultLitChain,
					method: accessControlCondition.method ?? 'balanceOf',
					parameters: accessControlCondition.parameters ?? [':userAddress'],
					returnValueTest: accessControlCondition.returnValueTest ?? {
						comparator: '>',
						value: '0'
					},
					...accessControlCondition
				}
			})

		const { encryptedString: encryptedStr, symmetricKey } =
			await Lit.encryptString(strToEncrypt)

		const litClient = await this.getLitInstance()

		const encryptedSymmetricKey = await litClient.saveEncryptionKey({
			accessControlConditions: builtAccessControlConditions,
			symmetricKey,
			authSig,
			chain: defaultLitChain
		})

		return {
			accessControlConditions: builtAccessControlConditions,
			encryptedSymmetricKey,
			encryptedStr
		}
	}

	public async decrypt(options: {
		/** The chainId to decrypt on */
		chainId: number

		/** The string to decrypt */
		strToDecrypt: string

		/** The access control conditions */
		accessControlConditions: LitAccessControlConditions

		/** The lit encrypted symmetric key obtained from the saveEncryptionKey method */
		encryptedSymmetricKey: string
	}) {
		const {
			strToDecrypt,
			accessControlConditions,
			chainId,
			encryptedSymmetricKey
		} = options

		const chain = chainIdToLitChainName(chainId)

		const authSig = await Lit.checkAndSignAuthMessage({
			chain
		})

		const litClient = await this.getLitInstance({ chainId })

		const symmetricKey = await litClient.getEncryptionKey({
			accessControlConditions,
			toDecrypt: encryptedSymmetricKey,
			chain,
			authSig
		})

		const decryptedString = await Lit.decryptString(strToDecrypt, symmetricKey)

		return { decryptedString }
	}
}
