import { MeemSDK } from '@meemproject/sdk'
import React, {
	createContext,
	useMemo,
	useContext,
	ReactNode,
	useEffect
} from 'react'
import { useAuth } from './authContext'

interface ISDKContextState {
	sdk: MeemSDK
}

const MeemSDKContext = createContext({} as ISDKContextState)
MeemSDKContext.displayName = 'MeemSDKContext'

export interface ISDKProps {
	children?: ReactNode
}

export const SDKProvider: React.FC<ISDKProps> = ({ ...props }: ISDKProps) => {
	const { jwt } = useAuth()

	const sdk = new MeemSDK({ jwt })

	useEffect(() => {
		sdk.setJwt(jwt)
	}, [jwt])

	const value = useMemo(
		() => ({
			sdk
		}),
		[sdk]
	)

	return <MeemSDKContext.Provider value={value} {...props} />
}

export function useMeemSDK() {
	const context = useContext(MeemSDKContext)

	if (typeof context === 'undefined') {
		throw new Error(`useMeemUser must be used within a MeemUser Provider`)
	}

	return context
}
