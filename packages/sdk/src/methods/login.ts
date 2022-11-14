// import {} from '@meemproject/meem-contracts'
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
