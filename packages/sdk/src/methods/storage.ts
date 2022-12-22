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
import { MeemAPI } from '../generated/api.generated'
import { makeRequest } from '../lib/fetcher'
import log from '../lib/log'
import 'gun/sea'

export interface IPartialAccessControlCondition
	extends Partial<AccsDefaultParams> {
	returnValueTest?: {
		key?: string
		comparator: string
		value: string
	}
}

export type EmitterEvents = {
	data: (data: any, key: string) => void
}

export class Storage {
	private jwt?: string

	/** Mapping of chainId:Tableland instance */
	private tablelands: Record<number, Connection> = {}

	/** The LIT protocol client */
	private lit?: Lit.LitNodeClient

	private gun: ReturnType<typeof Gun>

	private emitter: TypedEmitter<EmitterEvents>

	public constructor(options: { jwt?: string }) {
		this.jwt = options.jwt
		this.gun = Gun({
			peers: ['http://localhost:3005/gun']
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
	public async getLitInstance() {
		if (this.lit) {
			return this.lit
		}

		const client = new Lit.LitNodeClient()
		await client.connect()

		this.lit = client

		return client
	}

	/** Encrypt data using LIT protocol */
	public async encrypt(options: {
		/** The LIT protocol authSig. Can be obtained after login from sdk.id.getLitAuthSig() */
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

	public async fetchFromIPFSAndDecrypt(options: {
		/** The LIT protocol authSig. Can be obtained after login from sdk.id.getLitAuthSig() */
		authSig: JsonAuthSig

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

		return this.decrypt({
			...rest,
			strToDecrypt: this.base64URIToBlob(response.text)
		})
	}

	/** Decrypt data using LIT protocol */
	public async decrypt(options: {
		/** The LIT protocol authSig. Can be obtained after login from sdk.id.getLitAuthSig() */
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

	public async on(options: {
		path: string
		cb: (data: any) => void
		chainId: number
		authSig: JsonAuthSig
	}) {
		const { path, cb, chainId, authSig } = options

		this.emitter.addListener('data', cb)

		this.gun
			.get(path)
			.map()
			.on(async (data: any, key: string) => {
				try {
					console.log({ data, key })
					const parsedData = JSON.parse(data)
					if (parsedData.accessControlConditions) {
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

						const { data: decryptedData } = await this.decrypt(params)

						this.emitter.emit('data', {
							key,
							chainId,
							accessControlConditions,
							data: decryptedData
						})
					}
				} catch (e) {
					log.warn('Unable to parse data as JSON')
					log.warn(e)
				}
			})
	}

	public async off(path: string, cb: (data: any) => void) {
		this.emitter.removeListener('data', cb)
	}

	/** Encrypt the "data" field and then write to GunDB */
	public async encryptAndWrite(options: {
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

		/**
		 * The LIT protocol authSig. Can be obtained after login from sdk.id.getLitAuthSig()
		 *
		 * If set will encrypt the "data" column before writing to tableland
		 */
		authSig: JsonAuthSig
	}) {
		const {
			chainId,
			path,
			accessControlConditions: partialAccessControlConditions,
			writeColumns,
			data,
			authSig
		} = options

		const { accessControlConditions, encryptedStr, encryptedSymmetricKey } =
			await this.encrypt({
				accessControlConditions: partialAccessControlConditions,
				authSig,
				chainId,
				data
			})

		const base64EncryptedStr = await this.blobToBase64(encryptedStr)

		// const { ipfsHash } = await this.saveToIPFS({
		// 	data: base64EncryptedStr
		// })

		const newWriteColumns = {
			...writeColumns,
			accessControlConditions: JSON.stringify(accessControlConditions),
			// data: `ipfs://${ipfsHash}`,
			data: base64EncryptedStr,
			encryptedSymmetricKey
		}

		// const result = await this.write({
		// 	tableName,
		// 	chainId,
		// 	writeColumns: newWriteColumns
		// })

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

		const item = this.gun
			// .get('meem')
			.get(path)
			.get(`#${hash}`)
			.put(JSON.stringify(newWriteColumns))

		// const result = this.gun.get(path).set(item)

		return item
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

		/**
		 * The LIT protocol authSig. Can be obtained after login from sdk.id.getLitAuthSig()
		 *
		 * If set will encrypt the "data" column before writing to tableland
		 */
		authSig: JsonAuthSig
	}) {
		const {
			chainId,
			tableName,
			accessControlConditions: partialAccessControlConditions,
			writeColumns,
			data,
			authSig
		} = options

		const { accessControlConditions, encryptedStr, encryptedSymmetricKey } =
			await this.encrypt({
				accessControlConditions: partialAccessControlConditions,
				authSig,
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

	/** Subscribe to data at the "path" */
	// public async on(options: {
	// 	/** The data path */
	// 	path: string

	// 	/**
	// 	 * If set will attempt to decrypt the rows "data" column using LIT protocol and
	// 	 * filter out any rows that fail decryption
	// 	 */
	// 	authSig?: JsonAuthSig
	// }) {
	// 	const { path, authSig } = options

	// 	const gun = await this.getGunInstance()

	// 	gun.get(path).map(async (item: Record<string, any>) => {
	// 		console.log({ item })
	// 	})

	// 	// const rows = data.rows.map((row: any[]) => {
	// 	// 	const builtRow: Record<string, any> = {}
	// 	// 	row.forEach((val, i) => {
	// 	// 		const columnName = data.columns[i].name
	// 	// 		if (
	// 	// 			columnName === 'data' &&
	// 	// 			authSig &&
	// 	// 			accColumnIdx > -1 &&
	// 	// 			escColumnIdx > -1
	// 	// 		) {
	// 	// 			if (/^ipfs:\/\//.test(val)) {
	// 	// 				promises.push(
	// 	// 					this.fetchFromIPFSAndDecrypt({
	// 	// 						authSig,
	// 	// 						chainId,
	// 	// 						ipfsURI: val,
	// 	// 						accessControlConditions: row[accColumnIdx],
	// 	// 						encryptedSymmetricKey: row[escColumnIdx]
	// 	// 					})
	// 	// 				)
	// 	// 			} else {
	// 	// 				promises.push(
	// 	// 					this.decrypt({
	// 	// 						authSig,
	// 	// 						chainId,
	// 	// 						strToDecrypt: this.base64URIToBlob(val),
	// 	// 						accessControlConditions: row[accColumnIdx],
	// 	// 						encryptedSymmetricKey: row[escColumnIdx]
	// 	// 					})
	// 	// 				)
	// 	// 			}
	// 	// 		}
	// 	// 		builtRow[data.columns[i].name] = val
	// 	// 	})

	// 	// 	return builtRow
	// 	// })

	// 	// if (promises.length > 0) {
	// 	// 	const results = await Promise.allSettled(promises)
	// 	// 	results.forEach((result, i) => {
	// 	// 		if (result.status === 'fulfilled') {
	// 	// 			rows[i].data = result.value.data
	// 	// 		} else {
	// 	// 			log.debug(result.status, result.reason)
	// 	// 		}
	// 	// 	})
	// 	// }

	// 	// log.debug('Retrieved Tableland Rows', { rows })

	// 	// if (authSig) {
	// 	// 	log.debug('Found "authSig". Filtering out rows that failed decryption')
	// 	// 	return rows.filter(r => typeof r.data === 'object')
	// 	// }

	// 	// return rows
	// }

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
								authSig,
								chainId,
								ipfsURI: val,
								accessControlConditions: row[accColumnIdx],
								encryptedSymmetricKey: row[escColumnIdx]
							})
						)
					} else {
						promises.push(
							this.decrypt({
								authSig,
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
