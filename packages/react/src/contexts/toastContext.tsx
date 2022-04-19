import log from '@kengoldfarb/log'
import type { AlertProps } from '@material-ui/lab'
import React, {
	useContext,
	createContext,
	useMemo,
	useState,
	useCallback,
	ReactNode,
	Component
} from 'react'
import { Toast } from './Toast'

export interface IToastState {
	toastMessage: string
	toastSeverity: NonNullable<AlertProps['severity']>
	isToastOpen: boolean
}

export interface IToastAuthContextState {
	setToast: (state: Partial<IToastState>) => void
	toastState: IToastState
	setErrorToast: (msg: string) => void
	setSuccessToast: (msg: string) => void
	setInfoToast: (msg: string) => void
}

const ToastContext = createContext({} as IToastAuthContextState)
ToastContext.displayName = 'ToastContext'

export interface IToastProviderProps {
	children?: ReactNode
}

const ToastProvider: React.FC<IToastProviderProps> = props => {
	const [toastState, setToastState] = useState<IToastState>({
		toastMessage: '',
		toastSeverity: 'success',
		isToastOpen: false
	})

	const setToast = React.useCallback((newState: any) => {
		setToastState((prevState: IToastState) => {
			return {
				...prevState,
				...newState
			}
		})
	}, [])

	const setErrorToast = useCallback((msg: string) => {
		log.debug('Setting Error Toast', msg)
		return setToastState((prevState: IToastState) => {
			return {
				...prevState,
				isToastOpen: true,
				toastSeverity: 'error',
				toastMessage: msg
			}
		})
	}, [])

	const setSuccessToast = useCallback((msg: string) => {
		log.debug('Setting Success Toast', msg)
		return setToastState((prevState: IToastState) => {
			return {
				...prevState,
				isToastOpen: true,
				toastSeverity: 'success',
				toastMessage: msg
			}
		})
	}, [])

	const setInfoToast = useCallback((msg: string) => {
		log.debug('Setting Success Toast', msg)
		return setToastState((prevState: IToastState) => {
			return {
				...prevState,
				isToastOpen: true,
				toastSeverity: 'info',
				toastMessage: msg
			}
		})
	}, [])

	const value = useMemo(
		() => ({
			setToast,
			toastState,
			setErrorToast,
			setSuccessToast,
			setInfoToast
		}),
		[setToast, toastState, setErrorToast, setSuccessToast, setInfoToast]
	)

	return <ToastContext.Provider value={value} {...props} />
}

function useToast() {
	const context = useContext(ToastContext)
	if (!context) {
		throw new Error(`useToast must be used within a ToastProvider`)
	}
	return context
}

export interface IToastWrapperProps {
	children?: ReactNode
}

const ToastWrapper: React.FC<IToastWrapperProps> = children => {
	const { toastState, setToast } = useToast()
	const { isToastOpen, toastMessage, toastSeverity } = toastState
	return (
		<>
			<Component {...children} />
			<Toast
				onClose={() => setToast({ isToastOpen: false })}
				isOpen={isToastOpen}
				message={toastMessage}
				severity={toastSeverity}
			/>
		</>
	)
}

export { ToastProvider, useToast, ToastWrapper }
