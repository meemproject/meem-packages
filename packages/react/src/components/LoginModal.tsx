import { useQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import { Text, Space, Modal, Image, Grid, Center } from '@mantine/core'
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

export interface ILoginFormProps {
	/** Called when the modal is requesting that it be closed */
	onRequestClose?: () => any
}

export const LoginForm: React.FC<ILoginFormProps> = ({ onRequestClose }) => {
	const { connectWallet } = useAuth()
	const { classes: meemTheme } = useMeemTheme()

	return (
		<>
			<div>
				<Space h={24} />

				<Center>
					<Grid>
						<Grid.Col xs={4} sm={3} md={4} lg={3} xl={3} key={'injected'}>
							<div
								className={meemTheme.connectMethodGridItem}
								style={{
									position: 'relative'
								}}
								onClick={() => {
									connectWallet('injected')
									if (onRequestClose) {
										onRequestClose()
									}
								}}
							>
								<div className={meemTheme.connectMethodGridItemContent}>
									<Center>
										<Image
											src={`/connect-metamask.svg`}
											height={24}
											fit={'contain'}
										/>
									</Center>

									<Space h={16} />
									<Center>
										<Text className={meemTheme.tSmallBold}>Metamask</Text>
									</Center>
								</div>
							</div>
						</Grid.Col>
						<Grid.Col xs={4} sm={3} md={4} lg={3} xl={3} key={'wallet'}>
							<div
								className={meemTheme.connectMethodGridItem}
								style={{
									position: 'relative'
								}}
								onClick={() => {
									connectWallet('walletconnect')
									if (onRequestClose) {
										onRequestClose()
									}
								}}
							>
								<div className={meemTheme.connectMethodGridItemContent}>
									<Center>
										<Image
											src={`/connect-walletconnect.png`}
											height={24}
											width={24}
											fit={'contain'}
										/>
									</Center>

									<Space h={16} />
									<Center>
										<Text className={meemTheme.tSmallBold}>WalletConnect</Text>
									</Center>
								</div>
							</div>
						</Grid.Col>
						<Grid.Col xs={4} sm={3} md={4} lg={3} xl={3} key={'magic'}>
							<div
								className={meemTheme.connectMethodGridItem}
								style={{
									position: 'relative'
								}}
								onClick={() => {
									connectWallet('magic')
									if (onRequestClose) {
										onRequestClose()
									}
								}}
							>
								<div className={meemTheme.connectMethodGridItemContent}>
									<Center>
										<Image
											src={`/connect-email.png`}
											height={24}
											width={24}
											fit={'contain'}
										/>
									</Center>

									<Space h={16} />
									<Center>
										<Text className={meemTheme.tSmallBold}>Email / Google</Text>
									</Center>
								</div>
							</div>
						</Grid.Col>
						{/* {identityProvidersData?.IdentityProviders.map(identityProvider => (
							<Grid.Col
								xs={4}
								sm={3}
								md={4}
								lg={3}
								xl={3}
								key={identityProvider.id}
							>
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
									<div className={meemTheme.connectMethodGridItemContent}>
										<Center>
											<Image
												src={identityProvider.icon}
												height={24}
												width={24}
												fit={'contain'}
											/>
										</Center>

										<Space h={16} />
										<Center>
											<Text className={meemTheme.tSmallBold}>
												{identityProvider.name}
											</Text>
										</Center>
									</div>
								</div>
							</Grid.Col>
						))} */}
					</Grid>
				</Center>
			</div>
		</>
	)
}

export const LoginModal: React.FC<ILoginModalProps> = ({
	isOpen,
	onRequestClose,
	isLoginForced
}) => {
	const { classes: meemTheme } = useMeemTheme()

	return (
		<>
			<Modal
				centered
				radius={16}
				overlayBlur={8}
				withCloseButton={!isLoginForced}
				closeOnClickOutside={!isLoginForced}
				padding={'lg'}
				size={'60%'}
				opened={isOpen}
				className={meemTheme.visibleDesktopOnly}
				title={
					<Text className={meemTheme.tMediumBold}>{'Connect to Meem'}</Text>
				}
				onClose={async () => {
					onRequestClose()
				}}
			>
				<LoginForm />
			</Modal>
			<Modal
				centered
				radius={16}
				overlayBlur={8}
				withCloseButton={!isLoginForced}
				closeOnClickOutside={!isLoginForced}
				padding={'lg'}
				fullScreen={true}
				opened={isOpen}
				className={meemTheme.visibleMobileOnly}
				title={
					<Text className={meemTheme.tMediumBold}>{'Connect to Meem'}</Text>
				}
				onClose={async () => {
					onRequestClose()
				}}
			>
				<LoginForm />
			</Modal>
		</>
	)
}
