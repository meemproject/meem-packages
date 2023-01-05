import { useQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import { Text, Space, Modal, Image, Divider, Grid, Center } from '@mantine/core'
import React from 'react'
import { GetIdentityProvidersQuery } from '../../generated/graphql'
import { useMeemApollo } from '../contexts/apolloContext'
import { useAuth } from '../contexts/authContext'
import { IDENTITY_PROVIDERS_QUERY } from '../gql/auth'
import { useMeemTheme } from '../themes/MeemTheme'

export interface ILoginModalProps {
	/** Whether the modal is open */
	isOpen: boolean

	/** Called when the modal is requesting that it be closed */
	onRequestClose: () => any

	/** Will connect the currently logged in user with a new identity */
	isLoginForced?: boolean
}

export const LoginModal: React.FC<ILoginModalProps> = ({
	isOpen,
	onRequestClose,
	isLoginForced
}) => {
	const { classes: meemTheme } = useMeemTheme()

	const { loginWithRedirect } = useAuth0()

	const { anonClient } = useMeemApollo()

	const { connectWallet } = useAuth()

	const { data: identityProvidersData } = useQuery<GetIdentityProvidersQuery>(
		IDENTITY_PROVIDERS_QUERY,
		{
			client: anonClient
		}
	)

	return (
		<>
			<Modal
				centered
				radius={16}
				overlayBlur={8}
				withCloseButton={!isLoginForced}
				closeOnClickOutside={!isLoginForced}
				padding={'lg'}
				size={'47%'}
				opened={isOpen}
				title={
					<Text className={meemTheme.tMediumBold}>{'Connect to Meem'}</Text>
				}
				onClose={async () => {
					onRequestClose()
				}}
			>
				<div>
					<Divider />
					<Space h={24} />

					<Grid>
						<Grid.Col md={6} lg={6} xl={4} key={'wallet'}>
							<div
								className={meemTheme.connectMethodGridItem}
								style={{
									position: 'relative'
								}}
								onClick={() => {
									connectWallet('injected')
									onRequestClose()
								}}
							>
								<Center>
									<div className={meemTheme.connectMethodGridItemContent}>
										<Image
											src={`/connect-metamask.svg`}
											height={24}
											fit={'contain'}
										/>
										<Space h={16} />
										<Text className={meemTheme.tSmallBold}>Metamask</Text>
									</div>
								</Center>
							</div>
						</Grid.Col>
						<Grid.Col md={6} lg={6} xl={4} key={'wallet'}>
							<div
								className={meemTheme.connectMethodGridItem}
								style={{
									position: 'relative'
								}}
								onClick={() => {
									connectWallet('walletconnect')
									onRequestClose()
								}}
							>
								<Center>
									<div className={meemTheme.connectMethodGridItemContent}>
										<Image
											src={`/connect-walletconnect.png`}
											height={24}
											fit={'contain'}
										/>
										<Space h={16} />
										<Text className={meemTheme.tSmallBold}>WalletConnect</Text>
									</div>
								</Center>
							</div>
						</Grid.Col>
						{identityProvidersData?.IdentityProviders.map(identityProvider => (
							<Grid.Col md={6} lg={6} xl={4} key={identityProvider.id}>
								<div
									className={meemTheme.connectMethodGridItem}
									style={{
										position: 'relative'
									}}
									onClick={() => {
										loginWithRedirect({
											connection: identityProvider.connectionName
										})
									}}
								>
									<Center>
										<div className={meemTheme.connectMethodGridItemContent}>
											<Image
												src={identityProvider.icon}
												height={24}
												fit={'contain'}
											/>
											<Space h={16} />
											<Text className={meemTheme.tSmallBold}>
												{identityProvider.name}
											</Text>
										</div>
									</Center>
								</div>
							</Grid.Col>
						))}
					</Grid>

					<Space h={24} />
				</div>
			</Modal>
		</>
	)
}
