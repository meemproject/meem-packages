import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
// import { combineComponents } from '../lib/combineComponents'
import { CustomApolloProvider } from './apolloContext'
import { AuthProvider } from './authContext'
import { MeemUserProvider } from './meemUserContext'
import { SocketProvider } from './socketContext'

// export const MeemProvider = combineComponents(
// 	SocketProvider,
// 	AuthProvider({
// 		domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN ?? '',
// 		clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ?? '',
// 		redirectUri: typeof window !== 'undefined' ? window.location.origin : ''
// 	}),
// 	AuthProvider,
// 	CustomApolloProvider
// )

export const MeemProvider: React.FC<{
	children?: React.ReactNode
}> = ({ children }) => {
	return (
		<SocketProvider wsUrl={process.env.NEXT_PUBLIC_WS_URL ?? ''}>
			<Auth0Provider
				domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN ?? ''}
				clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ?? ''}
				redirectUri={
					typeof window !== 'undefined' ? window.location.origin : ''
				}
			>
				<AuthProvider>
					<CustomApolloProvider>
						<MeemUserProvider>{children}</MeemUserProvider>
					</CustomApolloProvider>
				</AuthProvider>
			</Auth0Provider>
		</SocketProvider>
	)
}