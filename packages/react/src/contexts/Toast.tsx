import Snackbar from '@material-ui/core/Snackbar'
import { Alert as MuiAlert } from '@material-ui/lab'
import type { AlertProps } from '@material-ui/lab'
import React from 'react'

export interface IProps {
	severity: NonNullable<AlertProps['severity']>
	message: string
	openDuration?: number
	isOpen: boolean
	onClose: () => void
}

export const Toast: React.FC<IProps> = ({
	openDuration = 6000,
	isOpen,
	onClose,
	severity,
	message
}: IProps) => {
	return (
		<>
			<Snackbar open={isOpen} autoHideDuration={openDuration} onClose={onClose}>
				<MuiAlert variant="filled" onClose={onClose} severity={severity}>
					{message}
				</MuiAlert>
			</Snackbar>
		</>
	)
}
