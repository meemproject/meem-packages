import { MeemAPI } from '@meemproject/api'
import React from 'react'
import { WalletProvider } from '../contexts/walletContext'
import log from '../lib/log'

export const ExampleComponent: React.FC = () => {
	log.debug(`Example log of GetConfig path: ${MeemAPI.v1.GetConfig.path()}`)
	return (
		<WalletProvider
			infuraId="etc"
			networkName="matic"
			auctionCurrencyAddress="etc"
			contractAddressAuction="etc"
			contractAddressMeemId="etc"
			contractAddressMeem="etc"
		>
			<h1>Hello Meem</h1>
		</WalletProvider>
	)
}
