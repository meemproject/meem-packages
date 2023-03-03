import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import { CustomApolloProvider } from './apolloContext'
import { AuthProvider } from './authContext'
import { MeemUserProvider } from './meemUserContext'
import { ISDKProps, SDKProvider } from './sdkContext'
import { SocketProvider } from './socketContext'

export const MeemProvider: React.FC<{
	chainId?: number
	magicApiKey: string
	sdk?: ISDKProps
	children?: React.ReactNode
}> = ({ chainId, magicApiKey, sdk, children }) => {
	return (
		<SocketProvider wsUrl={process.env.NEXT_PUBLIC_WS_URL ?? ''}>
			<Auth0Provider
				domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN ?? ''}
				clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ?? ''}
				redirectUri={
					typeof window !== 'undefined' ? window.location.origin : ''
				}
			>
				<AuthProvider chainId={chainId} magicApiKey={magicApiKey}>
					<CustomApolloProvider>
						<MeemUserProvider>
							<SDKProvider {...sdk}>{children}</SDKProvider>
						</MeemUserProvider>
					</CustomApolloProvider>
				</AuthProvider>
			</Auth0Provider>
		</SocketProvider>
	)
}
