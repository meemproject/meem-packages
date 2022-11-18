import { useQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import log from '@kengoldfarb/log'
import {
	Text,
	Space,
	Modal,
	Image,
	Divider,
	Grid,
	Center,
	MediaQuery
} from '@mantine/core'
import { login } from '@meemproject/sdk'
import React, { useState, useEffect } from 'react'
import { GetIdentityIntegrationsQuery } from '../../generated/graphql'
import { useCustomApollo } from '../contexts/apolloContext'
import { LoginState, useAuth } from '../contexts/authContext'
import { IDENTITY_INTEGRATIONS_QUERY } from '../gql/auth'
import { colorWhite, useClubsTheme } from '../themes/ClubsTheme'

interface IProps {
	/** Whether the modal is open */
	isOpen: boolean

	/** Called when the modal is requesting that it be closed */
	onRequestClose: () => any

	/** Will connect the currently logged in user with a new identity */
	isLoginForced?: boolean
}

export const LoginModal: React.FC<IProps> = ({
	isOpen,
	onRequestClose,
	isLoginForced
}) => {
	const { classes: clubsTheme } = useClubsTheme()

	const { loginWithRedirect, isAuthenticated, getAccessTokenSilently } =
		useAuth0()

	const [hasTriedLogin, setHasTriedLogin] = useState(false)

	const { anonClient } = useCustomApollo()

	const { connectWallet, setJwt, loginState } = useAuth()

	const { data: integrationsData } = useQuery<GetIdentityIntegrationsQuery>(
		IDENTITY_INTEGRATIONS_QUERY,
		{
			client: anonClient
		}
	)
	useEffect(() => {
		const fetchToken = async () => {
			if (
				loginState !== LoginState.LoggedIn &&
				isAuthenticated &&
				!hasTriedLogin
			) {
				setHasTriedLogin(true)
				try {
					const accessToken = await getAccessTokenSilently()

					const { jwt } = await login({ accessToken })

					setJwt(jwt)
				} catch (e) {
					log.crit(e)
				}
			}
		}

		fetchToken()
	}, [
		isAuthenticated,
		getAccessTokenSilently,
		setJwt,
		hasTriedLogin,
		setHasTriedLogin
	])

	return (
		<>
			<MediaQuery largerThan="md" styles={{ display: 'none' }}>
				<Modal
					centered
					radius={16}
					overlayBlur={8}
					padding={'sm'}
					fullScreen
					withCloseButton={!isLoginForced}
					closeOnClickOutside={!isLoginForced}
					opened={isOpen}
					title={
						<Text className={clubsTheme.tMediumBold}>{'Connect to Clubs'}</Text>
					}
					onClose={async () => {
						onRequestClose()
					}}
				>
					<div>
						{integrationsData?.IdentityIntegrations.map(identityIntegration => (
							<div key={`ii-${identityIntegration.id}`}>
								<div
									style={{
										position: 'relative'
									}}
									className={clubsTheme.connectMethodGridItemMobile}
									onClick={() => {
										loginWithRedirect({
											connection: identityIntegration.connectionName
										})
									}}
								>
									<Image
										src={identityIntegration.icon}
										width={50}
										height={50}
									/>
									<Space w={16} />
									<Text className={clubsTheme.tSmallBold}>
										{identityIntegration.name}
									</Text>
									<div
										style={{
											position: 'absolute',
											top: 0,
											left: 0,
											borderRadius: 32,
											width: '100%',
											height: '100%',
											backgroundColor: colorWhite,
											opacity: '0.7'
										}}
									/>
								</div>
								<Space h={16} />
							</div>
						))}

						<Space h={24} />
					</div>
				</Modal>
			</MediaQuery>
			<MediaQuery smallerThan="md" styles={{ display: 'none' }}>
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
						<Text className={clubsTheme.tMediumBold}>{'Connect to Clubs'}</Text>
					}
					onClose={async () => {
						onRequestClose()
					}}
				>
					{/* {isEmailState && emailState()} */}
					{/* {!isEmailState && ( */}
					<div>
						<Divider />
						<Space h={24} />

						<Grid>
							<Grid.Col md={6} lg={6} xl={4} key={'wallet'}>
								<div
									className={clubsTheme.connectMethodGridItem}
									style={{
										position: 'relative'
									}}
									onClick={() => {
										connectWallet('injected')
										onRequestClose()
									}}
								>
									<Center>
										<div className={clubsTheme.connectMethodGridItemContent}>
											<Image
												// src={`/connect-walletconnect.png`}
												height={50}
												fit={'contain'}
											/>
											<Space h={16} />
											<Text className={clubsTheme.tSmallBold}>
												Metamask / Browser
											</Text>
										</div>
									</Center>
								</div>
							</Grid.Col>
							<Grid.Col md={6} lg={6} xl={4} key={'wallet'}>
								<div
									className={clubsTheme.connectMethodGridItem}
									style={{
										position: 'relative'
									}}
									onClick={() => {
										connectWallet('walletconnect')
										onRequestClose()
									}}
								>
									<Center>
										<div className={clubsTheme.connectMethodGridItemContent}>
											<Image
												src={`/connect-walletconnect.png`}
												height={50}
												fit={'contain'}
											/>
											<Space h={16} />
											<Text className={clubsTheme.tSmallBold}>
												WalletConnect
											</Text>
										</div>
									</Center>
								</div>
							</Grid.Col>
							{integrationsData?.IdentityIntegrations.map(
								identityIntegration => (
									<Grid.Col md={6} lg={6} xl={4} key={identityIntegration.id}>
										<div
											className={clubsTheme.connectMethodGridItem}
											style={{
												position: 'relative'
											}}
											onClick={() => {
												loginWithRedirect({
													connection: identityIntegration.connectionName
												})
											}}
										>
											<Center>
												<div
													className={clubsTheme.connectMethodGridItemContent}
												>
													<Image
														src={identityIntegration.icon}
														height={50}
														fit={'contain'}
													/>
													<Space h={16} />
													<Text className={clubsTheme.tSmallBold}>
														{identityIntegration.name}
													</Text>
												</div>
											</Center>
										</div>
									</Grid.Col>
								)
							)}
						</Grid>

						<Space h={24} />
					</div>
				</Modal>
			</MediaQuery>
		</>
	)
}
