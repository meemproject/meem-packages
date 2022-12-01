import { ApolloError, useSubscription } from '@apollo/client'
import React, { createContext, useMemo, useContext, ReactNode } from 'react'
import { MeemIdSubscriptionSubscription } from '../../generated/graphql'
import { MEEM_ID_SUBSCRIPTION } from '../gql/auth'
import { useMeemApollo } from './apolloContext'
import { useAuth } from './authContext'

export type User = MeemIdSubscriptionSubscription['Users'][0]
export type Wallet = MeemIdSubscriptionSubscription['Users'][0]['DefaultWallet']
export type UserIdentity =
	MeemIdSubscriptionSubscription['Users'][0]['UserIdentities'][0]

interface IMeemUserContextState {
	/** The currently logged in user. Uses a gql subscription so information is refreshed in real-time.  */
	user?: User

	isLoading: boolean

	error?: ApolloError
}

const MeemUserContext = createContext({} as IMeemUserContextState)
MeemUserContext.displayName = 'MeemUserContext'

export interface IMeemUserContextProps {
	children?: ReactNode
}

export const MeemUserProvider: React.FC<IMeemUserContextProps> = ({
	...props
}: IMeemUserContextProps) => {
	const { accounts } = useAuth()
	const { userClient } = useMeemApollo()

	const {
		loading: isLoading,
		error,
		data: identityData
	} = useSubscription<MeemIdSubscriptionSubscription>(MEEM_ID_SUBSCRIPTION, {
		variables: { walletAddress: accounts[0] ?? '' },
		client: userClient,
		skip: !accounts || !accounts[0] || accounts[0].length === 0
	})

	const user = identityData?.Users[0]

	const value = useMemo(
		() => ({
			user,
			isLoading,
			error
		}),
		[user, isLoading, error]
	)

	return <MeemUserContext.Provider value={value} {...props} />
}

export function useMeemUser() {
	const context = useContext(MeemUserContext)

	if (typeof context === 'undefined') {
		throw new Error(`useMeemUser must be used within a MeemUser Provider`)
	}

	return context
}
