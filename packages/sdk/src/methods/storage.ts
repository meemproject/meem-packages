import EventEmitter from 'events'
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
import Gun from 'gun/gun'
import request from 'superagent'
import type TypedEmitter from 'typed-emitter'
import { v4 as uuidv4 } from 'uuid'
import { MeemAPI } from '../generated/api.generated'
import { makeRequest } from '../lib/fetcher'
import log from '../lib/log'
import 'gun/sea'
import 'gun/lib/open'
import { Id } from './id'

export interface IPartialAccessControlCondition
	extends Partial<AccsDefaultParams> {
	returnValueTest?: {
		key?: string
		comparator: string
		value: string
	}
}

export type EmitterEvents = {
	[path: string]: (items: { [id: string]: any }) => void
}

export class Storage {
	private id: Id

	private jwt?: string

	/** Mapping of chainId:Tableland instance */
	private tablelands: Record<number, Connection> = {}

	/** The LIT protocol client */
	private lit?: Lit.LitNodeClient

	private gun: ReturnType<typeof Gun>

	private emitter: TypedEmitter<EmitterEvents>

	public constructor(options: { id: Id; jwt?: string; peers?: string[] }) {
		let peers = options.peers

		if (!peers && process.env.NEXT_PUBLIC_GUN_DB_PEERS) {
			peers = process.env.NEXT_PUBLIC_GUN_DB_PEERS.split(',').map(p => p.trim())
		}

		if (!peers) {
			peers = ['https://api-indexer.meem.wtf/gun']
		}

		this.id = options.id
		this.jwt = options.jwt
		this.gun = Gun({
			peers
		})
		this.emitter = new EventEmitter() as TypedEmitter<EmitterEvents>
	}

	/** Sets the JWT used in api calls */
	public setJwt(jwt?: string) {
		this.jwt = jwt
	}

	public getGunInstance() {
		return this.gun
	}

	/** Get an instance of the Tableland SDK */
	public async getTablelandInstance(options: { chainId: number }) {
		const { chainId } = options
		if (this.tablelands[chainId]) {
			return this.tablelands[chainId]
		}
		const chainName = chainIdToTablelandChainName(chainId)
		const tableland = await connect({
			network: 'testnet',
			chain: chainName
			// rpcRelay: false
		})

		this.tablelands[chainId] = tableland

		return tableland
	}

	/** Get a LIT protocol client */
	public async getLitInstance(options: {
		alertWhenUnauthorized: boolean
		debug: boolean
	}) {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const { debug, alertWhenUnauthorized } = options

		if (this.lit) {
			return this.lit
		}

		const client = new Lit.LitNodeClient()
		client.config.debug = debug ?? false
		client.config.alertWhenUnauthorized = alertWhenUnauthorized ?? false
		await client.connect()

		this.lit = client

		return client
	}

	/** Generate an RSA public/private keypair */
	public async generateKeyPair() {
		const keyPair = await crypto.subtle.generateKey(
			{
				name: 'RSA-OAEP',
				modulusLength: 4096,
				publicExponent: new Uint8Array([1, 0, 1]),
				hash: 'SHA-256'
			},
			true,
			['encrypt', 'decrypt']
		)

		const [publicKey, privateKey] = await Promise.all([
			crypto.subtle.exportKey('jwk', keyPair.publicKey),
			crypto.subtle.exportKey('jwk', keyPair.privateKey)
		])

		return { publicKey, privateKey }
	}

	public async generateAESKey() {
		const key = await crypto.subtle.generateKey(
			{
				name: 'AES-CTR',
				length: 256 //can be  128, 192, or 256
			},
			true, //whether the key is extractable (i.e. can be used in exportKey)
			['encrypt', 'decrypt'] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
		)

		const privateKey = await crypto.subtle.exportKey('jwk', key)

		return privateKey
	}

	/** Encrypt data using a public key */
	public async encrypt(options: {
		data: Record<string, any>
		key: JsonWebKey

		algorithm?:
			| AlgorithmIdentifier
			| RsaHashedImportParams
			| EcKeyImportParams
			| HmacImportParams
			| AesKeyAlgorithm

		/** The algorithm params to pass to crypto.subtle.decrypt(...). Default AES-CTR length 128 */
		algorithmParams?:
			| AlgorithmIdentifier
			| RsaOaepParams
			| AesCtrParams
			| AesCbcParams
			| AesGcmParams
	}) {
		const { data, key, algorithm, algorithmParams } = options

		const cryptoKey = await crypto.subtle.importKey(
			'jwk',
			key,
			algorithm ?? { name: 'AES-CTR' },
			false,
			['encrypt']
		)

		const encrypted = await crypto.subtle.encrypt(
			algorithmParams ?? {
				name: 'AES-CTR',
				counter: new Uint8Array(16),
				length: 128
			},
			cryptoKey,
			Buffer.from(JSON.stringify(data))
		)

		return Buffer.from(encrypted).toString('base64')
	}

	/** Encrypt data using LIT protocol */
	public async encryptWithLit(options: {
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
		const { data, accessControlConditions, chainId } = options
		const authSig = this.id.getLitAuthSig()

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

	/** Fetches a file from IPFS and decrypts it using LIT */
	public async fetchFromIPFSAndDecrypt(options: {
		/** The chainId to decrypt on */
		chainId: number

		/** The IPFS URI to decrypt */
		ipfsURI: string

		/** The access control conditions */
		accessControlConditions: AccessControlConditions

		/** The lit encrypted symmetric key obtained from the saveEncryptionKey method */
		encryptedSymmetricKey: string

		/** Fetch using a custom IPFS gateway. Defaults to the Meem IPFS gateway */
		ipfsGateway?: string
	}) {
		const { ipfsURI, ipfsGateway, ...rest } = options

		const gateway = ipfsGateway ?? 'https://meem.mypinata.cloud/ipfs/'

		const ipfsHash = ipfsURI.replace('ipfs://', '')

		const response = await request.get(`${gateway}${ipfsHash}`)

		return this.decryptWithLit({
			...rest,
			strToDecrypt: this.base64URIToBlob(response.text)
		})
	}

	/** Decrypt data using a private key */
	public async decrypt(options: {
		/** The string to decrypt */
		strToDecrypt: string

		privateKey: JsonWebKey

		/** The algorithm used to generate the privateKey. Default AES-CTR */
		algorithm?:
			| AlgorithmIdentifier
			| RsaHashedImportParams
			| EcKeyImportParams
			| HmacImportParams
			| AesKeyAlgorithm

		/** The algorithm params to pass to crypto.subtle.decrypt(...). Default AES-CTR length 128 */
		algorithmParams?:
			| AlgorithmIdentifier
			| RsaOaepParams
			| AesCtrParams
			| AesCbcParams
			| AesGcmParams
	}) {
		const { strToDecrypt, privateKey, algorithm, algorithmParams } = options

		const cryptoKey = await crypto.subtle.importKey(
			'jwk',
			privateKey,
			algorithm ?? { name: 'AES-CTR', hash: { name: 'SHA-256' } },
			false,
			['decrypt']
		)

		const decryptedString = await crypto.subtle.decrypt(
			algorithmParams ?? {
				name: 'AES-CTR',
				counter: new Uint8Array(16),
				length: 128
			},
			cryptoKey,
			Buffer.from(strToDecrypt, 'base64')
		)

		let data: Record<string, any> = {}
		if (decryptedString) {
			try {
				data = JSON.parse(Buffer.from(decryptedString).toString())
			} catch (e) {
				log.warn('Error parsing decrypted string as JSON')
				log.warn(e)
			}
		}

		return { decryptedString, data }
	}

	/** Decrypt data using LIT protocol */
	public async decryptWithLit(options: {
		/** The chainId to decrypt on */
		chainId: number

		/** The string to decrypt */
		strToDecrypt: Blob | string

		/** The access control conditions */
		accessControlConditions: AccessControlConditions

		/** The lit encrypted symmetric key obtained from the saveEncryptionKey method */
		encryptedSymmetricKey: string
	}) {
		const { accessControlConditions, chainId, encryptedSymmetricKey } = options

		const authSig = this.id.getLitAuthSig()

		let { strToDecrypt } = options

		if (typeof strToDecrypt === 'string') {
			strToDecrypt = this.base64URIToBlob(strToDecrypt)
		}

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

	/** Decrypt an item stored in GunDB using a private key */
	public async decryptItem(options: {
		item: Record<string, any>
		privateKey: JsonWebKey
	}) {
		const { item, privateKey } = options

		try {
			const itemKeys = Object.keys(item)

			let decryptedItem: Record<string, any> = {}

			for (let i = 0; i < itemKeys.length; i++) {
				const itemKey = itemKeys[i]
				const itemVal = item[itemKey]

				if (/^#/.test(itemKey)) {
					const parsedData = JSON.parse(itemVal)
					// decrypt
					const { data: decryptedData } = await this.decrypt({
						strToDecrypt: parsedData.data,
						privateKey
					})
					decryptedItem = { ...parsedData }
					decryptedItem.data = decryptedData
					decryptedItem.id = itemKey
					decryptedItem.encryptedSymmetricKey = parsedData.encryptedSymmetricKey
				} else if (typeof itemVal === 'object') {
					// Recursively decrypt
					decryptedItem[itemKey] = await this.decryptItem({
						item: itemVal,
						privateKey
					})
				} else {
					// Leave it
					decryptedItem[itemKey] = itemVal
				}
			}

			return decryptedItem
		} catch (e) {
			log.debug('Unable to decrypt item', { item })
			log.debug(e)
		}

		return item
	}

	/** Decrypt an item stored in GunDB using LIT */
	public async decryptItemWithLit(options: {
		item: Record<string, any>
		chainId: number
	}) {
		const { item, chainId } = options

		try {
			const authSig = this.id.getLitAuthSig()
			const itemKeys = Object.keys(item)

			let decryptedItem: Record<string, any> = {}

			for (let i = 0; i < itemKeys.length; i++) {
				const itemKey = itemKeys[i]
				const itemVal = item[itemKey]

				if (/^#/.test(itemKey)) {
					const parsedData = JSON.parse(itemVal)
					// decrypt
					const accessControlConditions = JSON.parse(
						parsedData.accessControlConditions
					)
					const params = {
						authSig,
						chainId,
						strToDecrypt: this.base64URIToBlob(parsedData.data),
						accessControlConditions,
						encryptedSymmetricKey: parsedData.encryptedSymmetricKey
					}

					const { data: decryptedData } = await this.decryptWithLit(params)
					decryptedItem = { ...parsedData }
					decryptedItem.data = decryptedData
					decryptedItem.accessControlConditions = accessControlConditions
					decryptedItem.id = itemKey
					decryptedItem.encryptedSymmetricKey = parsedData.encryptedSymmetricKey
				} else if (typeof itemVal === 'object') {
					// Recursively decrypt
					decryptedItem[itemKey] = await this.decryptItemWithLit({
						chainId,
						item: decryptedItem[itemKey]
					})
				} else {
					// Leave it
					decryptedItem[itemKey] = itemVal
				}
			}

			return decryptedItem
		} catch (e) {
			log.debug('Unable to decrypt item', { item })
			log.debug(e)
		}

		return item
	}

	/** Subscribe to data changes on a path */
	public async on(options: {
		/** The path to listen for */
		path: string

		/** The callback invoked when data changes */
		cb: (data: any) => void

		/** The chain id */
		chainId?: number

		/** Will decrypt the data using the JSON web key. If omitted, will decrypt using LIT */
		privateKey?: JsonWebKey
	}) {
		const { path, cb, chainId, privateKey } = options

		this.emitter.addListener(path, cb)

		this.gun.get(path).open(async (data: any /*, key: string */) => {
			try {
				const keys = Object.keys(data)
				const items: Record<string, any> = {}
				const promises: Promise<any>[] = []
				for (let i = 0; i < keys.length; i++) {
					const key = keys[i]
					let item = data[key]
					if (/^#/.test(key)) {
						item = {
							[key]: item
						}
					}

					if (privateKey) {
						promises.push(
							this.decryptItem({
								item,
								privateKey
							})
						)
					} else if (chainId) {
						promises.push(
							this.decryptItemWithLit({
								item,
								chainId
							})
						)
					}
				}

				const result = await Promise.allSettled(promises)
				keys.forEach((k, i) => {
					const r = result[i]
					if (r.status === 'fulfilled') {
						items[k] = r.value
					} else {
						log.warn(`Unable to parse data for key ${k}`)
					}
				})

				this.emitter.emit(path, items)
			} catch (e) {
				log.warn('Unable to parse data as JSON')
				log.warn(e)
			}
		})
	}

	/** Unsubscribe to events */
	public async off(path: string, cb: (data: any) => void) {
		this.emitter.removeListener(path, cb)
	}

	/** Encrypt the "data" field and then write to GunDB */
	public async encryptAndWrite(options: {
		/** The path to write the data */
		path: string

		/** The values to be written to the db in the form of columnName:value */
		writeColumns?: {
			[columnName: string]: any
		}

		/** The values to be encrypted and written to the db "data" column in the form of columnName:value */
		data: {
			[columnName: string]: any
		}

		/**
		 * The key that will be used to encrypt the data
		 */
		key: JsonWebKey
	}) {
		const { path, key, writeColumns, data } = options

		const encryptedStr = await this.encrypt({
			data,
			key
		})

		const newWriteColumns = {
			...writeColumns,
			data: encryptedStr
		}

		const hash = await Gun.SEA.work(
			JSON.stringify(newWriteColumns),
			null,
			null,
			{
				name: 'SHA-256'
			}
		)

		if (!hash) {
			throw new Error('SEA_WORK_FAILED')
		}

		const id = uuidv4()

		const item = this.gun
			.get(path)
			// @ts-ignore
			.get(id)
			// @ts-ignore
			.get(`#${hash}`)
			.put(JSON.stringify(newWriteColumns), (ack: any) => log.debug({ ack }))

		return { id, hash, item }
	}

	/** Encrypt the "data" field and then write to GunDB */
	public async encryptWithLitAndWrite(options: {
		/** The chain */
		chainId: number

		/** The path to write the data */
		path: string

		/** The values to be written to the db in the form of columnName:value */
		writeColumns?: {
			[columnName: string]: any
		}

		/** The values to be encrypted and written to the db "data" column in the form of columnName:value */
		data: {
			[columnName: string]: any
		}

		/**
		 * The token(s) that may be held in order to decrypt the string
		 *
		 * For advanced customization options see: https://developer.litprotocol.com/SDK/Explanation/encryption
		 */
		accessControlConditions: IPartialAccessControlCondition[]
	}) {
		const {
			chainId,
			path,
			accessControlConditions: partialAccessControlConditions,
			writeColumns,
			data
		} = options

		const { accessControlConditions, encryptedStr, encryptedSymmetricKey } =
			await this.encryptWithLit({
				accessControlConditions: partialAccessControlConditions,
				chainId,
				data
			})

		const base64EncryptedStr = await this.blobToBase64(encryptedStr)

		const newWriteColumns = {
			...writeColumns,
			accessControlConditions: JSON.stringify(accessControlConditions),
			data: base64EncryptedStr,
			encryptedSymmetricKey
		}

		const hash = await Gun.SEA.work(
			JSON.stringify(newWriteColumns),
			null,
			null,
			{
				name: 'SHA-256'
			}
		)

		if (!hash) {
			throw new Error('SEA_WORK_FAILED')
		}

		const id = uuidv4()

		this.gun
			.get(path)
			// @ts-ignore
			.get(id)
			// @ts-ignore
			.get(`#${hash}`)
			.put(JSON.stringify(newWriteColumns), (ack: any) => log.debug({ ack }))

		return { id, hash }
	}

	/** Encrypt the "data" field and then write to tableland */
	public async encryptAndWriteToTableland(options: {
		/** The chain */
		chainId: number

		/** The Tableland table name */
		tableName: string

		/** The values to be written to the db in the form of columnName:value */
		writeColumns?: {
			[columnName: string]: any
		}

		/** The values to be encrypted and written to the db "data" column in the form of columnName:value */
		data: {
			[columnName: string]: any
		}

		/**
		 * The token(s) that may be held in order to decrypt the string
		 *
		 * For advanced customization options see: https://developer.litprotocol.com/SDK/Explanation/encryption
		 */
		accessControlConditions: IPartialAccessControlCondition[]
	}) {
		const {
			chainId,
			tableName,
			accessControlConditions: partialAccessControlConditions,
			writeColumns,
			data
		} = options

		const { accessControlConditions, encryptedStr, encryptedSymmetricKey } =
			await this.encryptWithLit({
				accessControlConditions: partialAccessControlConditions,
				chainId,
				data
			})

		const base64EncryptedStr = await this.blobToBase64(encryptedStr)

		const { ipfsHash } = await this.saveToIPFS({
			data: base64EncryptedStr
		})

		const newWriteColumns = {
			...writeColumns,
			accessControlConditions: JSON.stringify(accessControlConditions),
			data: `ipfs://${ipfsHash}`,
			encryptedSymmetricKey
		}

		const result = await this.write({
			tableName,
			chainId,
			writeColumns: newWriteColumns
		})

		return result
	}

	/** Insert data in a Tableland table */
	public async write(options: {
		/** The chain */
		chainId: number

		/** The Tableland table name */
		tableName: string

		/** The values to be written to the db in the form of columnName:value */
		writeColumns: {
			[columnName: string]: any
		}
	}) {
		const { chainId, tableName, writeColumns } = options

		const tl = await this.getTablelandInstance({ chainId })

		if (!tl.signer && typeof window !== 'undefined') {
			await tl.siwe()
		} else {
			throw new Error('NO_TABLELAND_SIGNER')
		}

		const now = Math.floor(new Date().getTime() / 1000)

		const columnNames: string[] = ['createdAt', 'updatedAt']
		const columnValues: (string | number)[] = [now, now]

		Object.keys(writeColumns).forEach(columnName => {
			columnNames.push(`"${columnName}"`)
			columnValues.push(`'${writeColumns[columnName]}'`)
		})

		const result = await tl.write(
			`INSERT INTO ${tableName} (${columnNames.join(
				','
			)}) VALUES (${columnValues.join(',')})`
		)

		return result
	}

	/** Count records in a Tableland table */
	public async count(options: {
		/** The chain */
		chainId: number

		/** The Tableland table name */
		tableName: string

		/**
		 * Add a WHERE clause. Only exact matches are supported
		 *
		 * Example: { id: 1 }
		 *
		 * */
		where?: Record<string, any>
	}): Promise<number> {
		const { chainId, tableName, where } = options
		const tableland = await this.getTablelandInstance({
			chainId
		})

		let whereClause = ''

		if (where) {
			Object.keys(where).forEach((key, i) => {
				if (i > 0) {
					whereClause += ' AND '
				}
				whereClause += `"${key}"='${where[key]}'`
			})
		}

		const query = `SELECT count(1) FROM ${tableName} ${
			whereClause.length > 0 ? `WHERE ${whereClause}` : ''
		}`

		const data = await tableland.read(query)

		const count = (data.rows[0] && data.rows[0][0]) ?? 0

		return count
	}

	/** Fetch data from a Tableland table */
	public async read(options: {
		/** The chain */
		chainId: number

		/** The Tableland table name */
		tableName: string

		/** Column names to fetch. Default all columns */
		columns?: string[]

		/** Limit the number of items returned. Default 100 */
		limit?: number

		/** The column name to order by. Default "createdAt" */
		orderBy?: string

		/** The sort direction. Default DESC */
		order?: 'ASC' | 'DESC'

		/**
		 * Add a WHERE clause. Only exact matches are supported
		 *
		 * Example: { id: 1 }
		 *
		 * */
		where?: Record<string, any>

		/**
		 * If set will attempt to decrypt the rows "data" column using LIT protocol and
		 * filter out any rows that fail decryption
		 */
		authSig?: JsonAuthSig
	}): Promise<
		{
			[columnName: string]: any
		}[]
	> {
		const { chainId, tableName, columns, authSig, where } = options

		const limit = options.limit ?? 100
		const orderBy = options.orderBy ?? 'createdAt'
		const order = options.order ?? 'DESC'

		const tableland = await this.getTablelandInstance({
			chainId
		})

		let selector = '*'

		if (columns) {
			selector = columns.map(c => `"${c}"`).join(', ')
		}

		let whereClause = ''

		if (where) {
			Object.keys(where).forEach((key, i) => {
				if (i > 0) {
					whereClause += ' AND '
				}
				if (typeof where[key] === 'string') {
					whereClause += `"${key}"='${where[key]}'`
				} else if (Array.isArray(where[key])) {
					const values = where[key].map((v: string) => `'${v}'`).join(', ')
					whereClause += `"${key}" in (${values})`
				}
			})
		}

		const query = `SELECT ${selector} FROM ${tableName} ${
			whereClause.length > 0 ? `WHERE ${whereClause}` : ''
		} ORDER BY "${orderBy}" ${order} LIMIT ${limit}`

		const data = await tableland.read(query)

		const accColumnIdx = data.columns.findIndex(
			c => c.name === 'accessControlConditions'
		)
		const escColumnIdx = data.columns.findIndex(
			c => c.name === 'encryptedSymmetricKey'
		)

		const promises: Promise<{
			decryptedString?: string
			data: Record<string, any>
		}>[] = []

		const rows = data.rows.map((row: any[]) => {
			const builtRow: Record<string, any> = {}
			row.forEach((val, i) => {
				const columnName = data.columns[i].name
				if (
					columnName === 'data' &&
					authSig &&
					accColumnIdx > -1 &&
					escColumnIdx > -1
				) {
					if (/^ipfs:\/\//.test(val)) {
						promises.push(
							this.fetchFromIPFSAndDecrypt({
								chainId,
								ipfsURI: val,
								accessControlConditions: row[accColumnIdx],
								encryptedSymmetricKey: row[escColumnIdx]
							})
						)
					} else {
						promises.push(
							this.decryptWithLit({
								chainId,
								strToDecrypt: this.base64URIToBlob(val),
								accessControlConditions: row[accColumnIdx],
								encryptedSymmetricKey: row[escColumnIdx]
							})
						)
					}
				}
				builtRow[data.columns[i].name] = val
			})

			return builtRow
		})

		if (promises.length > 0) {
			const results = await Promise.allSettled(promises)
			results.forEach((result, i) => {
				if (result.status === 'fulfilled') {
					rows[i].data = result.value.data
				} else {
					log.debug(result.status, result.reason)
				}
			})
		}

		log.debug('Retrieved Tableland Rows', { rows })

		if (authSig) {
			log.debug('Found "authSig". Filtering out rows that failed decryption')
			return rows.filter(r => typeof r.data === 'object')
		}

		return rows
	}

	/** Save data or JSON to IPFS */
	public async saveToIPFS(options: {
		data?: string
		json?: Record<string, any>
	}) {
		const { data, json } = options

		const result = await makeRequest<MeemAPI.v1.SaveToIPFS.IDefinition>(
			MeemAPI.v1.SaveToIPFS.path(),
			{
				method: MeemAPI.v1.SaveToIPFS.method,
				body: {
					data,
					json
				}
			}
		)

		return result
	}

	/** Converts a Blob to a base64 string */
	public blobToBase64(blob: Blob): Promise<string> {
		return new Promise((resolve, _) => {
			const reader = new FileReader()
			reader.onloadend = () => resolve(reader.result as string)
			reader.readAsDataURL(blob)
		})
	}

	/** Converts a base64 URI into a Blob */
	public base64URIToBlob(dataURI: string): Blob {
		try {
			const byteString = atob(dataURI.split(',')[1])
			const ab = new ArrayBuffer(byteString.length)
			const ia = new Uint8Array(ab)

			for (let i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i)
			}
			return new Blob([ab], { type: 'image/jpeg' })
		} catch (e) {
			return new Blob()
		}
	}
}
