import type { JsonAuthSig } from '@lit-protocol/constants'
import { ethers } from 'ethers'
import jwtDecode from 'jwt-decode'
import { SiweMessage } from 'siwe'
import { MeemAPI } from '../generated/api.generated'
import { GetMeQuery } from '../generated/graphql'
import { GET_ME_QUERY } from '../gql/getMe.gql'
import { makeRequest } from '../lib/fetcher'
import { createApolloClient, QueryRole } from '../lib/GQLClient'

export class Id {
	/** The last message the was signed */
	public lastSignedMessage?: string

	/** The last signature of the lastMessageSigned */
	public lastSignature?: string

	/** Whether the SDK id has initialized */
	public hasInitialized = false

	private jwt?: string

	private gqlHttpUrl?: string

	private gqlWsUri?: string

	private apiUrl?: string

	public constructor(options: {
		jwt?: string
		gqlHttpUrl?: string
		gqlWsUri?: string
		apiUrl?: string
	}) {
		const { jwt, gqlHttpUrl, gqlWsUri, apiUrl } = options
		this.jwt = jwt
		this.gqlHttpUrl = gqlHttpUrl
		this.gqlWsUri = gqlWsUri
		this.apiUrl = apiUrl
	}

	/** Sets the JWT used in api calls */
	public setJwt(jwt?: string) {
		this.jwt = jwt
	}

	public async getMe() {
		if (!this.jwt) {
			throw new Error('NOT_LOGGED_IN')
		}

		const apolloClient = createApolloClient({
			jwt: this.jwt,
			role: QueryRole.User,
			httpUrl: this.gqlHttpUrl,
			wsUri: this.gqlWsUri
		})

		const decoded = jwtDecode(this.jwt) as Record<string, any>

		const result = await apolloClient.query<GetMeQuery>({
			query: GET_ME_QUERY,
			variables: { walletAddress: decoded.walletAddress }
		})

		return result
	}

	public getLitAuthSig(): JsonAuthSig {
		if (!this.lastSignedMessage || !this.lastSignature) {
			throw new Error('NOT_LOGGED_IN')
		}

		const recoveredAddress = ethers.utils.verifyMessage(
			this.lastSignedMessage,
			this.lastSignature as string
		)

		const authSig = {
			sig: this.lastSignature,
			derivedVia: 'web3.eth.personal.sign',
			signedMessage: this.lastSignedMessage,
			address: recoveredAddress
		}

		return authSig as JsonAuthSig
	}

	public async login(options: {
		/** The message that will appear in the user's wallet to sign */
		message: string

		/** The signer */
		signer: ethers.providers.JsonRpcSigner

		/** The chainId */
		chainId: number

		/** The URI where the login is taking place */
		uri: string
	}) {
		const { signer, chainId, uri, message } = options

		const address = await signer.getAddress()

		const matches = uri.match(/\/\/([^/]+)/)

		if (!matches || !matches[1]) {
			throw new Error('INVALID_URI')
		}

		const siweMessage = new SiweMessage({
			domain: matches[1],
			address,
			statement: message,
			uri: origin,
			version: '1',
			chainId
		})

		const messageToSign = siweMessage.prepareMessage()

		const signature = await signer.signMessage(messageToSign)

		const recoveredAddress = ethers.utils.verifyMessage(
			messageToSign,
			signature
		)

		const authSig = {
			sig: signature,
			derivedVia: 'web3.eth.personal.sign',
			signedMessage: messageToSign,
			address: recoveredAddress
		}

		const { jwt } = await this.loginWithAPI({
			message: messageToSign,
			signature
		})

		this.lastSignedMessage = messageToSign
		this.lastSignature = signature

		return { signature, authSig, jwt, messageToSign }
	}

	/** Login with the Meem API */
	public async loginWithAPI(options: {
		/** Login w/ access token provided by Auth0 magic link */
		accessToken?: string

		/** Login w/ wallet. Both message and signature must be provided */
		message?: string

		/** Login w/ wallet. Both address and signature must be provided */
		signature?: string

		/** Whether to connect the login method with the currently authenticated user */
		shouldConnectUser?: boolean
	}) {
		const { accessToken, message, signature, shouldConnectUser } = options

		const result = await makeRequest<MeemAPI.v1.Login.IDefinition>(
			MeemAPI.v1.Login.path(),
			{
				jwt: this.jwt,
				baseUrl: this.apiUrl,
				method: MeemAPI.v1.Login.method,
				body: {
					accessToken,
					message,
					signature,
					shouldConnectUser
				}
			}
		)

		return result
	}

	/** Update info about a user identity belonging to a user */
	public async updateUserIdentity(options: {
		/** The id of the user identity to update */
		userIdentityId: string

		/** The visibility of the integration */
		visibility?: MeemAPI.IUserIdentityVisibility

		/** Arbitrary metadata */
		metadata?: Record<string, any>
	}) {
		const { visibility, metadata, userIdentityId } = options

		const result = await makeRequest<MeemAPI.v1.UpdateUserIdentity.IDefinition>(
			MeemAPI.v1.UpdateUserIdentity.path({
				userIdentityId
			}),
			{
				jwt: this.jwt,
				baseUrl: this.apiUrl,
				method: MeemAPI.v1.UpdateUserIdentity.method,
				body: {
					visibility,
					metadata
				}
			}
		)

		return result
	}

	/** Remove a user identity from the current user */
	public async removeUserIdentity(options: {
		/** The id of the user identity to remove */
		userIdentityId: string
	}) {
		const { userIdentityId } = options

		const result = await makeRequest<MeemAPI.v1.RemoveUserIdentity.IDefinition>(
			MeemAPI.v1.RemoveUserIdentity.path({
				userIdentityId
			}),
			{
				jwt: this.jwt,
				baseUrl: this.apiUrl,
				method: MeemAPI.v1.RemoveUserIdentity.method
			}
		)

		return result
	}

	/** Update user info */
	public async updateUser(options: {
		/** Profile picture base64 string */
		profilePicBase64?: string

		/** Display name of identity */
		displayName?: string
	}) {
		const { profilePicBase64, displayName } = options
		const result = await makeRequest<MeemAPI.v1.CreateOrUpdateUser.IDefinition>(
			MeemAPI.v1.CreateOrUpdateUser.path(),
			{
				jwt: this.jwt,
				baseUrl: this.apiUrl,
				method: MeemAPI.v1.CreateOrUpdateUser.method,
				body: {
					profilePicBase64,
					displayName
				}
			}
		)

		return result
	}

	/** Get a login nonce from the Meem API */
	public async getNonce(options: {
		/** The address to get a nonce for */
		address: string
	}) {
		const { address } = options
		const result = await makeRequest<MeemAPI.v1.GetNonce.IDefinition>(
			MeemAPI.v1.GetNonce.path(),
			{
				jwt: this.jwt,
				baseUrl: this.apiUrl,
				method: MeemAPI.v1.GetNonce.method,
				query: {
					address
				}
			}
		)

		return result
	}

	/** Refresh the ENS name for the current user's wallet address */
	public async refreshENS() {
		const result = await makeRequest<MeemAPI.v1.RefreshENS.IDefinition>(
			MeemAPI.v1.RefreshENS.path(),
			{
				jwt: this.jwt,
				baseUrl: this.apiUrl,
				method: MeemAPI.v1.RefreshENS.method
			}
		)

		return result
	}
}
