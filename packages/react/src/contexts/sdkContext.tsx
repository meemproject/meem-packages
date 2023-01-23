import { MeemSDK } from '@meemproject/sdk'
import { ethers } from 'ethers'
import Cookies from 'js-cookie'
import React, {
	createContext,
	useMemo,
	useContext,
	ReactNode,
	useEffect,
	useCallback,
	useState
} from 'react'
import { useAuth } from './authContext'

export interface ISDKContextState {
	/** And instance of the @meemproject/sdk package with automatic JWT management */
	sdk: MeemSDK

	/** Login method that calls sdk.id.login(...) and automatically manages signatures */
	login: (options: {
		/** The message that will appear in the user's wallet to sign */
		message: string

		/** The signer */
		signer: ethers.providers.JsonRpcSigner

		/** The chainId */
		chainId: number

		/** The URI where the login is taking place */
		uri: string
	}) => Promise<{
		/** The signature */
		signature: string

		/** The full built SIWE message */
		messageToSign: string

		/** The LIT authSig that can be used to encrypt/decrypt data */
		authSig: {
			sig: string
			derivedVia: string
			signedMessage: string
			address: string
		}

		/** The JWT token */
		jwt: string
	}>
}

const MeemSDKContext = createContext({} as ISDKContextState)
MeemSDKContext.displayName = 'MeemSDKContext'

export interface ISDKProps {
	children?: ReactNode
}

export const SDKProvider: React.FC<ISDKProps> = ({ ...props }: ISDKProps) => {
	const { jwt, setJwt } = useAuth()

	const [hasSetJWT, setHasSetJWT] = useState(false)

	const sdk = new MeemSDK({ jwt, isGunEnabled: typeof window !== 'undefined' })

	const login = useCallback(
		async (options: {
			/** The message that will appear in the user's wallet to sign */
			message: string

			/** The signer */
			signer: ethers.providers.JsonRpcSigner

			/** The chainId */
			chainId: number

			/** The URI where the login is taking place */
			uri: string
		}) => {
			const result = await sdk.id.login(options)

			sdk.setJwt(result.jwt)
			setJwt(result.jwt)

			Cookies.set('meemMessageToSign', result.messageToSign, {
				sameSite: 'strict',
				secure:
					typeof window !== 'undefined' && window.location.protocol === 'https:'
			})

			Cookies.set('meemSignature', result.signature, {
				sameSite: 'strict',
				secure:
					typeof window !== 'undefined' && window.location.protocol === 'https:'
			})

			return result
		},
		[sdk]
	)

	useEffect(() => {
		sdk.setJwt(jwt)
		if (jwt) {
			setHasSetJWT(true)
		} else if (hasSetJWT) {
			Cookies.remove('meemMessageToSign')
			Cookies.remove('meemSignature')
		}
	}, [jwt])

	useEffect(() => {
		const meemMessageToSign = Cookies.get('meemMessageToSign')
		const meemSignature = Cookies.get('meemSignature')

		sdk.id.lastSignedMessage = meemMessageToSign
		sdk.id.lastSignature = meemSignature
		sdk.id.hasInitialized = true
	}, [sdk])

	const value = useMemo(
		() => ({
			sdk,
			login
		}),
		[sdk, login]
	)

	return <MeemSDKContext.Provider value={value} {...props} />
}

export function useSDK() {
	const context = useContext(MeemSDKContext)

	if (typeof context === 'undefined') {
		throw new Error(`useMeemUser must be used within a MeemUser Provider`)
	}

	return context
}
