import { gql } from '@apollo/client'

export const MEEM_ID_SUBSCRIPTION = gql`
	subscription MeemIdSubscription($walletAddress: String) {
		Users(where: { Wallets: { address: { _ilike: $walletAddress } } }) {
			id
			profilePicUrl
			displayName
			DefaultWallet {
				address
				ens
			}
			UserIdentities {
				id
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
