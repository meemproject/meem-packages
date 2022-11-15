import { MeemAPI } from '../api.generated'
import { makeRequest } from '../lib/fetcher'

export const login = async (options: {
	/** Login w/ access token provided by Auth0 magic link */
	accessToken?: string

	/** Login w/ wallet. Both address and signature must be provided */
	address?: string

	/** Login w/ wallet. Both address and signature must be provided */
	signature?: string

	/** Whether to connect the login method with the currently authenticated user */
	shouldConnectUser?: boolean
}) => {
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

export const updateUserIdentity = async (options: {
	/** The visibility of the integration */
	visibility?: MeemAPI.IntegrationVisibility

	/** Arbitrary metadata */
	metadata?: Record<string, any>

	/** The id of the IdentityIntegration to remove */
	identityIntegrationId: string
}) => {
	const { visibility, metadata, identityIntegrationId } = options

	const result = await makeRequest<MeemAPI.v1.UpdateUserIdentity.IDefinition>(
		MeemAPI.v1.UpdateUserIdentity.path({
			integrationId: identityIntegrationId
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

export const detachUserIdentity = async (options: {
	/** The id of the IdentityIntegration to remove */
	identityIntegrationId: string
}) => {
	const { identityIntegrationId } = options

	const result = await makeRequest<MeemAPI.v1.DetachUserIdentity.IDefinition>(
		MeemAPI.v1.DetachUserIdentity.path({
			integrationId: identityIntegrationId
		}),
		{
			method: MeemAPI.v1.DetachUserIdentity.method
		}
	)

	return result
}

export const updateUser = async (options: {
	/** Profile picture base64 string */
	profilePicBase64?: string

	/** Display name of identity */
	displayName?: string
}) => {
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
