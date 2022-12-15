import { gql } from '@apollo/client'

export const MEEM_ID_SUBSCRIPTION = gql`
	subscription MeemIdSubscription($walletAddress: String) {
		Users(where: { Wallets: { address: { _ilike: $walletAddress } } }) {
			id
			updatedAt
			profilePicUrl
			displayName
			createdAt
			DefaultWallet {
				address
				ens
			}
			UserIdentities {
				id
				metadata
				visibility
				IdentityProviderId
				IdentityProvider {
					id
					description
					icon
					name
					connectionName
					connectionId
				}
			}
		}
	}
`

export const IDENTITY_PROVIDERS_QUERY = gql`
	query GetIdentityProviders {
		IdentityProviders {
			id
			description
			icon
			name
			connectionName
			connectionId
		}
	}
`
