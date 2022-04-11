import log from '@kengoldfarb/log'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { providers, Contract, BigNumber, ethers } from 'ethers'
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie'
import React, {
	createContext,
	useMemo,
	useState,
	useCallback,
	useEffect,
	useContext
} from 'react'
import useSWR from 'swr'
import Web3Modal from 'web3modal'
import auctionABI from '@meemproject/meem-api-ts/src/abis/AuctionHouse.json'
import erc20ABI from '@meemproject/meem-api-ts/src/abis/ERC20.json'
import meemABI from '@meemproject/meem-api-ts/src/abis/Meem.json'
import meemIdABI from '@meemproject/meem-api-ts/src/abis/MeemID.json'
import meemViteABI from '@meemproject/meem-api-ts/src/abis/MeemVite.json'
import { makeFetcher } from '../lib/fetcher'
import { MeemTypes } from '@meemproject/meem-api-ts' 
import { MeemAPI } from '@meemproject/meem-api-ts'

// Suppress warnings
ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR)

const networkChainIds: Record<string, number> = {
	mainnet: 1,
	ropsten: 3,
	rinkeby: 4,
	goerli: 5,
	kovan: 42,
	matic: 137,
	mumbai: 80001,
	local: 31337
}

export enum LoginState {
	LoggedIn = 'loggedIn',
	NotLoggedIn = 'notLoggedIn',
	Unknown = 'unknown'
}

interface IWalletContextState {
	/** The Web3 provider */
	web3Provider?: providers.Web3Provider

	/** Array of connected wallet addresses */
	accounts: string[]

	/** The network we're connected to */
	network?: providers.Network

	signer?: providers.JsonRpcSigner

	connectWallet: () => Promise<void>

	disconnectWallet: () => Promise<void>

	/** Convenience to check whether a wallet is connected */
	isConnected: boolean

	/** Whether the wallet is connected to the wrong network */
	isConnectedToWrongNetwork: boolean

	meemViteContract?: MeemTypes.MeemVite

	meemContract?: MeemTypes.Meem

	auctionContract?: MeemTypes.AuctionHouse

	erc20Contract?: MeemTypes.ERC20

	meemIdContract?: MeemTypes.MeemID

	meemId?: MeemAPI.IMeemId

	loginState?: LoginState

	isMeemIdError: boolean

	isMeemIdLoading: boolean

	isAdmin: boolean

	updateMeemId: (meemId: MeemAPI.IMeemId) => void

	signature: string

	updateSignature: (walletSignature: string) => void

	setJwt: (jwt: string) => void

	jwt?: string
}

const WalletContext = createContext({} as IWalletContextState)
WalletContext.displayName = 'WalletContext'

export const WalletProvider: React.FC = props => {
	const [accounts, setAccounts] = useState<string[]>([])
	const [meemViteContract, setMeemViteContract] = useState<
	MeemTypes.MeemVite | undefined
	>()
	const [meemContract, setMeemContract] = useState<MeemTypes.Meem | undefined>()
	const [meemIdContract, setMeemIdContract] = useState<MeemTypes.MeemID | undefined>()
	const [signature, setSignature] = useState('')
	const [jwt, setJwt] = useState<string>()
	const [loginState, setLoginState] = useState<LoginState>(LoginState.Unknown)
	const [isAdmin, setIsAdmin] = useState(false)
	const [meemId, setMeemId] = useState<MeemAPI.IMeemId | undefined>()
	const [erc20Contract, setERC20Contract] = useState<MeemTypes.ERC20 | undefined>()
	const [auctionContract, setAuctionContract] = useState<
	MeemTypes.AuctionHouse | undefined
	>()
	const [isConnected, setIsConnected] = useState<boolean>(false)
	const [isConnectedToWrongNetwork, setIsConnectedToWrongNetwork] =
		useState(false)
	const [web3Modal, setWeb3Modal] = useState<Web3Modal | undefined>(undefined)
	const [provider, setProvider] = useState<any | undefined>(undefined)
	const [web3Provider, setWeb3Provider] = useState<
		providers.Web3Provider | undefined
	>()
	const [network, setNetwork] = useState<providers.Network | undefined>()
	const [signer, setSigner] = useState<providers.JsonRpcSigner | undefined>()

	const getMeFetcher = makeFetcher<
		MeemAPI.v1.GetMe.IQueryParams,
		MeemAPI.v1.GetMe.IRequestBody,
		MeemAPI.v1.GetMe.IResponseBody
	>({
		method: MeemAPI.v1.GetMe.method
	})

	const {
		data: meData,
		error: isMeemIdError,
		isValidating: isMeemIdLoading,
		mutate: meMutate
	} = useSWR(jwt ? MeemAPI.v1.GetMe.path() : null, getMeFetcher, {
		shouldRetryOnError: !!jwt
		// if the user is logged out, they don't have a JWT. dont retry.
		// docs here => https://github.com/vercel/swr
	})

	useEffect(() => {
		setMeemId(meData?.meemId)
		setIsAdmin(meData?.isAdmin ?? false)
		if (meData) {
			setLoginState(LoginState.LoggedIn)
		}
	}, [meData])

	useEffect(() => {
		if (isMeemIdLoading) {
			setLoginState(LoginState.Unknown)
		}
	}, [isMeemIdLoading])

	useEffect(() => {
		if (jwt) {
			meMutate()
		}
	}, [jwt, meMutate])

	useEffect(() => {
		if (isMeemIdError) {
			Cookies.remove('meemJwtToken')
			setMeemId(undefined)
			setLoginState(LoginState.NotLoggedIn)
		}
	}, [isMeemIdError])

	useEffect(() => {
		const meemJwtToken = Cookies.get('meemJwtToken')
		setJwt(meemJwtToken)
		if (!meemJwtToken) {
			setLoginState(LoginState.NotLoggedIn)
		}
	}, [])

	const connectWallet = useCallback(async () => {
		let p: any

		try {
			// This is the initial `provider` that is returned when
			// using web3Modal to connect. Can be MetaMask or WalletConnect.
			p = await web3Modal?.connect()
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
		const w3p = new providers.Web3Provider(p)

		const s = w3p.getSigner()

		const address = await s.getAddress()

		const n = await w3p.getNetwork()
		setNetwork(n)
		setProvider(p)

		const requiredNetworkName = process.env.NEXT_PUBLIC_NETWORK
		const currentNetworkName = n.name

		if (requiredNetworkName !== currentNetworkName) {
			log.debug('Not using correct network. Switching...')
			const { ethereum } = window

			if (requiredNetworkName === 'rinkeby') {
				// If network should be rinkeby, switch to rinkeby

				if (ethereum !== undefined) {
					const tx = await window.ethereum.request({
						method: 'wallet_switchEthereumChain',
						params: [{ chainId: '0x4' }]
					})
					log.warn(tx)
				}
			} else if (requiredNetworkName === 'matic') {
				// If network should be matic, switch to matic

				const data = [
					{
						chainId: '0x89',
						chainName: 'Polygon Mainnet',
						nativeCurrency: {
							name: 'Matic',
							symbol: 'MATIC',
							decimals: 18
						},
						rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
						blockExplorerUrls: ['https://explorer.matic.network/']
					}
				]
				if (ethereum !== undefined) {
					const tx = await ethereum.request({
						method: 'wallet_addEthereumChain',
						params: data
					})
					log.warn(tx)
				}
			}
		} else {
			log.debug(`required network name = ${requiredNetworkName}`)
			log.debug(`current network name = ${currentNetworkName}`)
		}

		setSigner(s)
		setAccounts([address])
		Cookies.set('walletAddress', address)
		setWeb3Provider(w3p)
		setIsConnected(true)
		setIsConnectedToWrongNetwork(false)
	}, [web3Modal])

	const disconnectWallet = useCallback(async () => {
		web3Modal?.clearCachedProvider()
		if (provider?.disconnect && typeof provider.disconnect === 'function') {
			await provider.disconnect()
		}

		setWeb3Provider(undefined)
		Cookies.remove('walletAddress')
		setAccounts([])
	}, [provider, web3Modal])

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const w3m = new Web3Modal({
				// network: 'mainnet', // optional
				cacheProvider: true,
				providerOptions: {
					walletconnect: {
						package: WalletConnectProvider, // required
						options: {
							infuraId: process.env.NEXT_PUBLIC_INFURA_ID, // required
							rpc: {
								[networkChainIds.matic]: 'https://rpc-mainnet.maticvigil.com',
								[networkChainIds.mumbai]: 'https://rpc-mumbai.matic.today'
							}
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

	const updateMeemId = useCallback((id: MeemAPI.IMeemId) => {
		log.debug('setMeemId', id)
		setMeemId(id)
	}, [])

	const updateSignature = useCallback((sig: string) => {
		log.debug('setSignature', sig)
		setSignature(sig)
	}, [])

	const handleAccountsChanged = useCallback((acc: string[]) => {
		log.debug('handleAccountsChanged', { acc })
		setAccounts(acc)
	}, [])

	const setMeemJwt = useCallback((meemJwt: string) => {
		Cookies.set('meemJwtToken', meemJwt)
		setJwt(meemJwt)
	}, [])

	const handleChainChanged = useCallback(
		(chainId: string) => {
			const expectedChainId =
				process.env.NEXT_PUBLIC_NETWORK &&
				networkChainIds[process.env.NEXT_PUBLIC_NETWORK]

			if (!expectedChainId) {
				log.fatal('Invalid chain set in env')
				return
			}

			const bigExpectedChainId = BigNumber.from(expectedChainId)
			const bigChainId = BigNumber.from(chainId)

			if (bigChainId.toHexString() === bigExpectedChainId.toHexString()) {
				log.debug('Connecting wallet')
				connectWallet()
				setIsConnectedToWrongNetwork(true)
			} else {
				log.debug('Disconnecting wallet')
				disconnectWallet()
				setIsConnectedToWrongNetwork(false)
			}
		},
		[connectWallet, disconnectWallet]
	)

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

	useEffect(() => {
		if (!process.env.NEXT_PUBLIC_MEEMVITE_CONTRACT_ADDRESS) {
			log.crit('Invalid MeemVite contract address. Check env vars.')
			return
		}
		const contract = new Contract(
			process.env.NEXT_PUBLIC_MEEMVITE_CONTRACT_ADDRESS,
			meemViteABI,
			signer
		) as MeemTypes.MeemVite
		setMeemViteContract(contract)
	}, [signer])

	useEffect(() => {
		if (!process.env.NEXT_PUBLIC_MEEM_CONTRACT_ADDRESS) {
			log.crit('Invalid Meem contract address. Check env vars.')
			return
		}
		const contract = new Contract(
			process.env.NEXT_PUBLIC_MEEM_CONTRACT_ADDRESS,
			meemABI,
			signer
		) as MeemTypes.Meem
		setMeemContract(contract)
	}, [signer])

	useEffect(() => {
		if (!process.env.NEXT_PUBLIC_MEEM_ID_CONTRACT_ADDRESS) {
			log.crit('Invalid Meem id contract address. Check env vars.')
			return
		}
		const contract = new Contract(
			process.env.NEXT_PUBLIC_MEEM_ID_CONTRACT_ADDRESS,
			meemIdABI,
			signer
		) as MeemTypes.MeemID
		setMeemIdContract(contract)
	}, [signer])

	useEffect(() => {
		if (!process.env.NEXT_PUBLIC_AUCTION_CONTRACT_ADDRESS) {
			log.debug('Invalid Auction contract address. Check env vars.')
			return
		}
		const contract = new Contract(
			process.env.NEXT_PUBLIC_AUCTION_CONTRACT_ADDRESS,
			auctionABI,
			signer
		) as MeemTypes.AuctionHouse
		setAuctionContract(contract)
	}, [signer])

	useEffect(() => {
		if (!process.env.NEXT_PUBLIC_AUCTION_CURRENCY_ADDRESS) {
			log.debug('Invalid Auction contract address. Check env vars.')
			return
		}
		const contract = new Contract(
			process.env.NEXT_PUBLIC_AUCTION_CURRENCY_ADDRESS,
			erc20ABI,
			signer
		) as MeemTypes.ERC20
		setERC20Contract(contract)
	}, [signer])

	useEffect(() => {
		if (!process.env.NEXT_PUBLIC_AUCTION_CURRENCY_ADDRESS) {
			log.crit('Invalid Auction contract address. Check env vars.')
			return
		}
		const contract = new Contract(
			process.env.NEXT_PUBLIC_AUCTION_CURRENCY_ADDRESS,
			erc20ABI,
			signer
		) as MeemTypes.ERC20
		setERC20Contract(contract)
	}, [signer])

	const value = useMemo(
		() => ({
			web3Provider,
			accounts,
			network,
			signer,
			connectWallet,
			disconnectWallet,
			isConnected,
			meemViteContract,
			auctionContract,
			erc20Contract,
			meemContract,
			meemIdContract,
			meemId,
			setJwt: setMeemJwt,
			isMeemIdLoading,
			isMeemIdError,
			loginState,
			isAdmin,
			updateMeemId,
			signature,
			updateSignature,
			isConnectedToWrongNetwork,
			jwt
		}),
		[
			web3Provider,
			accounts,
			network,
			signer,
			connectWallet,
			disconnectWallet,
			isConnected,
			meemViteContract,
			auctionContract,
			erc20Contract,
			meemContract,
			meemIdContract,
			meemId,
			setMeemJwt,
			isMeemIdLoading,
			isMeemIdError,
			loginState,
			isAdmin,
			updateMeemId,
			signature,
			updateSignature,
			isConnectedToWrongNetwork,
			jwt
		]
	)

	return <WalletContext.Provider value={value} {...props} />
}

export function useWallet() {
	const context = useContext(WalletContext)

	if (typeof context === 'undefined') {
		throw new Error(`useWallet must be used within a WalletProvider`)
	}

	return context
}
