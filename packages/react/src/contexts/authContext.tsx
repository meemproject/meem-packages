import { ApolloError } from '@apollo/client'
import { MeemAPI, makeFetcher } from '@meemproject/sdk'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { providers, ethers } from 'ethers'
import Cookies from 'js-cookie'
import JWT from 'jsonwebtoken'
import { DateTime } from 'luxon'
import React, {
	createContext,
	useMemo,
	useState,
	useCallback,
	useEffect,
	useContext,
	ReactNode
} from 'react'
import useSWR from 'swr'
import Web3Modal from 'web3modal'
import { chains } from '../lib/chains'
import log from '../lib/log'

// Suppress warnings
ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR)

// const networkChainIds: Record<string, number> = {
// 	mainnet: 1,
// 	ropsten: 3,
// 	rinkeby: 4,
// 	goerli: 5,
// 	kovan: 42,
// 	matic: 137,
// 	mumbai: 80001,
// 	local: 31337
// }

export enum LoginState {
	LoggedIn = 'loggedIn',
	NotLoggedIn = 'notLoggedIn',
	Unknown = 'unknown'
}

export interface IChain {
	name: string
	chain: string
	rpc: string[]
	faucets: string[]
	nativeCurrency: {
		name: string
		symbol: string
		decimals: number
	}
	infoUrl: string
	shortName: string
	chainId?: number
	ens?: {
		registry?: string
	}
	explorers: {
		name: string
		url: string
		standard: string
	}[]
}

interface IAuthContextState {
	/** Ethers.js Web3 provider */
	web3Provider?: providers.Web3Provider

	/** Array of connected wallet addresses */
	accounts: string[]

	/** The network we're connected to */
	network?: providers.Network

	/** Ethers.js signer */
	signer?: providers.JsonRpcSigner

	/** Trigger connection to the user's web3 wallet */
	connectWallet: (to?: string) => Promise<void>

	/** Disconnect the user's web3 wallet */
	disconnectWallet: () => Promise<void>

	/** Convenience to check whether a wallet is connected */
	isConnected: boolean

	/** The current login state. Used to check if the user has authenticated w/ the Meem API */
	loginState?: LoginState

	/** The error fetching user details from the GQL api */
	isGetMeError?: ApolloError

	/** Whether user details are being fetched */
	isMeLoading: boolean

	/** Set the JWT token returned from the Meem API */
	setJwt: (jwt: string) => void

	/** The JWT token returned from the Meem API */
	jwt?: string

	/** Set the current chain. Will trigger a "Switch Network" event in the user's wallet (if possible) */
	setChain: (chainId: number) => Promise<void>

	/** The current chain id */
	chainId?: number

	/** The current user */
	me?: MeemAPI.v1.GetMe.IResponseBody
}

const AuthContext = createContext({} as IAuthContextState)
AuthContext.displayName = 'AuthContext'

export interface IAuthContextProps {
	children?: ReactNode

	/** Use custom RPC endpoints for a chain */
	rpcs?: {
		[chainId: number]: string[]
	}
	explorers?: {
		[chainId: number]: {
			name: string
			url: string
			standard: string
		}[]
	}
}

export const AuthProvider: React.FC<IAuthContextProps> = ({
	rpcs,
	...props
}: IAuthContextProps) => {
	const [accounts, setAccounts] = useState<string[]>([])
	const [jwt, setJwt] = useState<string>()
	const [chainId, setChainId] = useState<number>()
	const [loginState, setLoginState] = useState<LoginState>(LoginState.Unknown)
	const [isConnected, setIsConnected] = useState<boolean>(false)
	const [web3Modal, setWeb3Modal] = useState<Web3Modal | undefined>(undefined)
	const [provider, setProvider] = useState<any | undefined>(undefined)
	const [web3Provider, setWeb3Provider] = useState<
		providers.Web3Provider | undefined
	>()
	const [network, setNetwork] = useState<providers.Network | undefined>()
	const [signer, setSigner] = useState<providers.JsonRpcSigner | undefined>()
	const initialRpcUrls: {
		[chainId: number]: string[]
	} = {}
	chains.forEach(chain => {
		const c = (rpcs && rpcs[chain.chainId]) ?? chain.rpc
		initialRpcUrls[chain.chainId] = c
	})
	const [rpcUrls] = useState(initialRpcUrls)

	const getMeFetcher = makeFetcher<
		MeemAPI.v1.GetMe.IQueryParams,
		MeemAPI.v1.GetMe.IRequestBody,
		MeemAPI.v1.GetMe.IResponseBody
	>({
		method: MeemAPI.v1.GetMe.method,
		headers: () => ({
			Authorization: `JWT ${jwt}`
		})
	})

	const {
		data: meData,
		error: isGetMeError,
		isValidating: isMeLoading,
		mutate: meMutate
	} = useSWR(jwt ? MeemAPI.v1.GetMe.path() : null, getMeFetcher, {
		shouldRetryOnError: !!jwt
		// if the user is logged out, they don't have a JWT. dont retry.
		// docs here => https://github.com/vercel/swr
	})

	useEffect(() => {
		if (meData) {
			// setAccounts([meData?.meemIdentity?.DefaultWallet.address])
			setAccounts([meData.address])
			setLoginState(LoginState.LoggedIn)
		}
	}, [meData])

	useEffect(() => {
		if (jwt) {
			meMutate()
		}
	}, [jwt, meMutate])

	useEffect(() => {
		if (isGetMeError && jwt) {
			log.debug('Error fetching "me". Removing jwt')
			Cookies.remove('meemJwtToken')
			setLoginState(LoginState.NotLoggedIn)
		}
	}, [isGetMeError, jwt])

	useEffect(() => {
		const meemJwtToken = Cookies.get('meemJwtToken')

		if (meemJwtToken) {
			const result = JWT.decode(meemJwtToken) as Record<string, any>
			if (result && result.exp && +result.exp > DateTime.now().toSeconds()) {
				setLoginState(LoginState.Unknown)
				setJwt(meemJwtToken)
				return
			} else {
				log.debug('JWT expired')
			}
		}

		setLoginState(LoginState.NotLoggedIn)
		setJwt(undefined)
	}, [])

	const connectWallet = useCallback(
		async (to?: string) => {
			let p: any

			try {
				// This is the initial `provider` that is returned when
				// using web3Modal to connect. Can be MetaMask or WalletConnect.
				p = to ? await web3Modal?.connectTo(to) : await web3Modal?.connect()
				log.debug('Connected')
			} catch (e) {
				log.warn(e)
				log.warn(
					'Error: unable to connect with web3modal. Did the user close the modal?'
				)
				return
			}

			// We plug the initial `provider` into ethers.js and get back
			// a Web3Provider. This will add on methods from ethers.js and
			// event listeners such as `.on()` will be different.
			const w3p = new providers.Web3Provider(p, 'any')

			const s = w3p.getSigner()

			const address = await s.getAddress()

			const n = await w3p.getNetwork()

			setNetwork(n)
			setChainId(n.chainId)
			setProvider(p)

			setSigner(s)
			setAccounts([address])
			setWeb3Provider(w3p)
			setIsConnected(true)
		},
		[web3Modal]
	)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const w3m = new Web3Modal({
				// network: 'mainnet', // optional
				cacheProvider: true,
				providerOptions: {
					walletconnect: {
						package: WalletConnectProvider, // required
						options: {
							rpc: rpcUrls
						}
					}
				}
			})
			setWeb3Modal(w3m)
		}
	}, [])

	// Auto connect to the cached provider
	useEffect(() => {
		if (web3Modal?.cachedProvider) {
			connectWallet()
		}
	}, [connectWallet, web3Modal])

	const handleAccountsChanged = useCallback((acc: string[]) => {
		setAccounts(acc)
		Cookies.remove('meemJwtToken')
		setLoginState(LoginState.NotLoggedIn)
	}, [])

	const setMeemJwt = useCallback((newMeemJwt?: string) => {
		setLoginState(LoginState.Unknown)
		setJwt(newMeemJwt)
		if (newMeemJwt) {
			log.debug('Setting Meem JWT')
			Cookies.set('meemJwtToken', newMeemJwt, {
				sameSite: 'strict',
				secure:
					typeof window !== 'undefined' && window.location.protocol === 'https:'
			})
		} else {
			log.debug('Removing Meem JWT')
			Cookies.remove('meemJwtToken')
			setLoginState(LoginState.NotLoggedIn)
		}
	}, [])

	const disconnectWallet = useCallback(async () => {
		setMeemJwt(undefined)
		web3Modal?.clearCachedProvider()
		if (provider?.disconnect && typeof provider.disconnect === 'function') {
			await provider.disconnect()
		}

		setWeb3Provider(undefined)
		setAccounts([])
		meMutate()
	}, [provider, web3Modal])

	const handleChainChanged = useCallback(
		(chainHex: string) => {
			const newChainId = ethers.BigNumber.from(chainHex)
			setChainId(newChainId.toNumber())
		},
		[connectWallet, disconnectWallet]
	)

	const setChain = useCallback(async (newChainId: number) => {
		if (network?.chainId === newChainId) {
			return
		}
		const { ethereum } = window

		const chain = chains.find(c => +c.chainId === +newChainId)

		if (!chain) {
			throw new Error(`Unsupported chain with id: ${newChainId}`)
		}

		// Must be 0x prefixed, non 0-padded
		const formattedChainId = ethers.BigNumber.from(chain.chainId)
			.toHexString()
			.replace(/0x0+/, '0x')

		const data = [
			{
				chainId: formattedChainId,
				chainName: chain.name,
				nativeCurrency: {
					name: chain.nativeCurrency.name,
					symbol: chain.nativeCurrency.symbol,
					decimals: chain.nativeCurrency.decimals
				},
				rpcUrls: chain.rpc
			}
		]
		if (ethereum !== undefined) {
			try {
				await ethereum.request({
					method: 'wallet_addEthereumChain',
					params: data
				})
			} catch (e) {
				log.warn(e)
			}

			try {
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: formattedChainId }]
				})
				setChainId(chain.chainId)
			} catch (e) {
				log.warn(e)
			}
		}
	}, [])

	// A `provider` should come with EIP-1193 events. We'll listen for those events
	// here so that when a user switches accounts or networks, we can update the
	// local React state with that new information.
	useEffect(() => {
		if (provider?.on) {
			provider.on('accountsChanged', handleAccountsChanged)
			provider.on('chainChanged', handleChainChanged)
			provider.on('disconnect', disconnectWallet)

			// Subscription Cleanup
			return () => {
				if (provider.removeListener) {
					provider.removeListener('accountsChanged', handleAccountsChanged)
					provider.removeListener('chainChanged', handleChainChanged)
					provider.removeListener('disconnect', disconnectWallet)
				}
			}
		}

		return () => {}
	}, [provider, handleAccountsChanged, disconnectWallet, handleChainChanged])

	useEffect(() => {
		log.info('Accounts changed', { accounts })
		if (accounts.length > 0) {
			setIsConnected(true)
		} else {
			setIsConnected(false)
		}
	}, [accounts])

	const value = useMemo(
		() => ({
			web3Provider,
			accounts,
			network,
			signer,
			connectWallet,
			disconnectWallet,
			isConnected,
			setJwt: setMeemJwt,
			isMeLoading,
			isGetMeError,
			loginState,
			jwt,
			setChain,
			chainId,
			me: meData
		}),
		[
			web3Provider,
			accounts,
			network,
			signer,
			connectWallet,
			disconnectWallet,
			isConnected,
			setMeemJwt,
			isMeLoading,
			isGetMeError,
			loginState,
			jwt,
			setChain,
			chainId,
			meData
		]
	)

	return <AuthContext.Provider value={value} {...props} />
}

export function useAuth() {
	const context = useContext(AuthContext)

	if (typeof context === 'undefined') {
		throw new Error(`useMeem must be used within a AuthProvider`)
	}

	return context
}

export function useWallet() {
	const context = useContext(AuthContext)

	if (typeof context === 'undefined') {
		throw new Error(`useMeem must be used within a AuthProvider`)
	}

	return context
}
