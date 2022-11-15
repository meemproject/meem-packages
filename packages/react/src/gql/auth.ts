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
				metadata
				visibility
				IdentityIntegrationId
				IdentityIntegration {
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

export const IDENTITY_INTEGRATIONS_QUERY = gql`
	query GetIdentityIntegrations {
		IdentityIntegrations {
			id
			description
			icon
			name
			connectionName
			connectionId
		}
	}
`
