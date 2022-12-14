import type {
	AccessControlConditions,
	AccsDefaultParams,
	JsonAuthSig
} from '@lit-protocol/constants'
import * as Lit from '@lit-protocol/lit-node-client'
import {
	chainIdToTablelandChainName,
	chainIdToLitChainName
} from '@meemproject/utils'
import { connect } from '@tableland/sdk'
import type { Connection } from '@tableland/sdk'
import log from '../lib/log'

export interface IPartialAccessControlCondition
	extends Partial<AccsDefaultParams> {
	returnValueTest?: {
		key?: string
		comparator: string
		value: string
	}
}

export class Storage {
	private jwt?: string

	private tablelands: Record<number, Connection> = {}

	private lit?: Lit.LitNodeClient

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
		/** The lit protocol authSig. Can be obtained after login from sdk.id.getLitAuthSig() */
		authSig: JsonAuthSig

		/** The chainId to encrypt on */
		chainId: number

		/** The data to encrypt */
		data: Record<string, any>

		/**
		 * The token(s) that may be held in order to decrypt the string
		 *
		 * For advanced customization options see: https://developer.litprotocol.com/SDK/Explanation/encryption
		 */
		accessControlConditions: IPartialAccessControlCondition[]
	}) {
		const { authSig, data, accessControlConditions, chainId } = options

		const strToEncrypt = JSON.stringify(data)

		const defaultLitChain = chainIdToLitChainName(chainId)

		const builtAccessControlConditions: AccessControlConditions =
			accessControlConditions.map(accessControlCondition => {
				return {
					standardContractType:
						accessControlCondition.standardContractType ?? 'ERC721',
					chain: chainId ? chainIdToLitChainName(chainId) : defaultLitChain,
					method: accessControlCondition.method ?? 'balanceOf',
					parameters: accessControlCondition.parameters ?? [':userAddress'],
					returnValueTest: accessControlCondition.returnValueTest ?? {
						comparator: '>',
						value: '0'
					},
					...accessControlCondition
				}
			})

		const litClient = await this.getLitInstance()
		const result = await Lit.encryptString(strToEncrypt)
		const symmetricKey = result?.symmetricKey
		const encryptedStr = result?.encryptedString

		if (!symmetricKey || !encryptedStr) {
			throw new Error('LIT_ENCRYPTION_FAILURE')
		}

		const encryptedSymmetricKey = await litClient.saveEncryptionKey({
			// unifiedAccessControlConditions: builtAccessControlConditions,
			accessControlConditions: builtAccessControlConditions,
			symmetricKey,
			authSig,
			chain: defaultLitChain
		})

		return {
			accessControlConditions: builtAccessControlConditions,
			encryptedSymmetricKey: Lit.uint8arrayToString(
				encryptedSymmetricKey,
				'base16'
			) as string,
			encryptedStr
		}
	}

	public async decrypt(options: {
		/** The lit protocol authSig. Can be obtained after login from sdk.id.getLitAuthSig() */
		authSig: JsonAuthSig

		/** The chainId to decrypt on */
		chainId: number

		/** The string to decrypt */
		strToDecrypt: Blob

		/** The access control conditions */
		accessControlConditions: AccessControlConditions

		/** The lit encrypted symmetric key obtained from the saveEncryptionKey method */
		encryptedSymmetricKey: string
	}) {
		const {
			strToDecrypt,
			accessControlConditions,
			chainId,
			authSig,
			encryptedSymmetricKey
		} = options

		const chain = chainIdToLitChainName(chainId)

		const litClient = await this.getLitInstance()

		const symmetricKey = await litClient.getEncryptionKey({
			accessControlConditions,
			toDecrypt: encryptedSymmetricKey,
			chain,
			authSig
		})

		if (!symmetricKey) {
			throw new Error('LIT_DECRYPTION_FAILED')
		}

		const decryptedString = await Lit.decryptString(strToDecrypt, symmetricKey)

		let data: Record<string, any> = {}
		if (decryptedString) {
			try {
				data = JSON.parse(decryptedString)
			} catch (e) {
				log.warn('Error parsing decrypted string as JSON')
				log.warn(e)
			}
		}

		return { decryptedString, data }
	}

	/** Fetch data from a Tableland table */
	public async read(options: {
		/** The chain */
		chainId: number

		/** The Tableland table name */
		tableName: string

		/** Column names to fetch */
		columns?: string[]

		/** Limit the number of items returned */
		limit?: number

		/** The column name to order by */
		orderBy?: string

		/** The sort direction */
		order?: 'ASC' | 'DESC'
	}) {
		const { chainId, tableName, columns } = options

		const limit = options.limit ?? 50
		const orderBy = options.orderBy ?? 'createdAt'
		const order = options.order ?? 'DESC'

		const tableland = await this.getTablelandInstance({
			chainId
		})

		let selector = '*'

		if (columns) {
			selector = columns.map(c => `"${c}"`).join(', ')
		}

		const query = `SELECT ${selector} FROM ${tableName} ORDER BY "${orderBy}" ${order} LIMIT ${limit}`

		const data = await tableland.read(query)

		return data
	}
}
