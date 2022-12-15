import { MeemAPI } from '../generated/api.generated'
import { makeRequest } from '../lib/fetcher'

export class Id {
	private jwt?: string

	public constructor(options: { jwt?: string }) {
		this.jwt = options.jwt
	}

	/** Sets the JWT used in api calls */
	public setJwt(jwt?: string) {
		this.jwt = jwt
	}

	/** Login with the Meem API */
	public async login(options: {
		/** Login w/ access token provided by Auth0 magic link */
		accessToken?: string

		/** Login w/ wallet. Both address and signature must be provided */
		address?: string

		/** Login w/ wallet. Both address and signature must be provided */
		signature?: string

		/** Whether to connect the login method with the currently authenticated user */
		shouldConnectUser?: boolean
	}) {
		const { accessToken, address, signature, shouldConnectUser } = options

		const result = await makeRequest<MeemAPI.v1.Login.IDefinition>(
			MeemAPI.v1.Login.path(),
			{
				method: MeemAPI.v1.Login.method,
				body: {
					accessToken,
					address,
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
				method: MeemAPI.v1.RefreshENS.method
			}
		)

		return result
	}
}
