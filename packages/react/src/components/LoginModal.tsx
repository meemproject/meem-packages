import { useQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import { Text, Space, Modal, Image, Divider, Grid, Center } from '@mantine/core'
import React from 'react'
import { GetIdentityIntegrationsQuery } from '../../generated/graphql'
import { useCustomApollo } from '../contexts/apolloContext'
import { useAuth } from '../contexts/authContext'
import { IDENTITY_INTEGRATIONS_QUERY } from '../gql/auth'
import { useClubsTheme } from '../themes/ClubsTheme'

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

	const { loginWithRedirect } = useAuth0()

	const { anonClient } = useCustomApollo()

	const { connectWallet } = useAuth()

	const { data: integrationsData } = useQuery<GetIdentityIntegrationsQuery>(
		IDENTITY_INTEGRATIONS_QUERY,
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
					<Text className={clubsTheme.tMediumBold}>{'Connect to Clubs'}</Text>
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
										<Text className={clubsTheme.tSmallBold}>WalletConnect</Text>
									</div>
								</Center>
							</div>
						</Grid.Col>
						{integrationsData?.IdentityIntegrations.map(identityIntegration => (
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
										<div className={clubsTheme.connectMethodGridItemContent}>
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
						))}
					</Grid>

					<Space h={24} />
				</div>
			</Modal>
		</>
	)
}
