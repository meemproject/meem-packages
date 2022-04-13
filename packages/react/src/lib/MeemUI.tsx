import { Button, CircularProgress, TextField } from '@mui/material'
import { alpha, createTheme, styled } from '@mui/material/styles'
// import * as Icons from 'iconoir-react'
import React, { useState } from 'react'
import styles from '../styles/UI.module.scss'

export enum CrossAxisAlignment {
	Center,
	Start,
	End,
	SpaceBetween
}

export enum MainAxisAlignment {
	Center,
	Start,
	End,
	SpaceBetween
}

export const ColorPrimary = '#15111B'
export const ColorSecondary = '#4A4159'
export const ColorTertiary = '#211D28'
export const ColorAccent = '#B4F2DF'
export const ColorAltAccent = '#E3FFA8'
export const ColorVerify = '#3EA2FF'
export const ColorLight = '#F8FAF4'
export const ColorWhite = '#fff'
export const ColorBlack = '#000'

export const MeemUITheme = createTheme({
	typography: {
		allVariants: {
			fontFamily: 'Agrandir',
			textTransform: 'none',
			fontSize: 16
		}
	},
	palette: {
		primary: {
			main: ColorPrimary
		},
		secondary: {
			main: ColorSecondary
		}
	}
})

// #region Text Components

interface ITextOverrides {
	textColor?: string
}

export const THeaderXL: React.FC<ITextOverrides> = ({
	textColor,
	// @ts-ignore
	children
}) => {
	return (
		<p className={styles.header_xl} style={{ color: textColor ?? undefined }}>
			{children}
		</p>
	)
}

// @ts-ignore
export const THeaderL: React.FC<ITextOverrides> = ({ textColor, children }) => {
	return (
		<p className={styles.header_l} style={{ color: textColor ?? undefined }}>
			{children}
		</p>
	)
}

// @ts-ignore
export const THeaderM: React.FC<ITextOverrides> = ({ textColor, children }) => {
	return (
		<p className={styles.header_m} style={{ color: textColor ?? undefined }}>
			{children}
		</p>
	)
}

export const THeaderSBold: React.FC<ITextOverrides> = ({
	textColor,
	// @ts-ignore
	children
}) => {
	return (
		<p
			className={styles.header_s_bold}
			style={{ color: textColor ?? undefined }}
		>
			{children}
		</p>
	)
}

// @ts-ignore
export const THeaderS: React.FC<ITextOverrides> = ({ textColor, children }) => {
	return (
		<p className={styles.header_s} style={{ color: textColor ?? undefined }}>
			{children}
		</p>
	)
}

export const THeaderXS: React.FC<ITextOverrides> = ({
	textColor,
	// @ts-ignore
	children
}) => {
	return (
		<p className={styles.header_xs} style={{ color: textColor ?? undefined }}>
			{children}
		</p>
	)
}

// @ts-ignore
export const TParaL: React.FC<ITextOverrides> = ({ textColor, children }) => {
	return (
		<p className={styles.para_l} style={{ color: textColor ?? undefined }}>
			{children}
		</p>
	)
}

// @ts-ignore
export const TPara: React.FC<ITextOverrides> = ({ textColor, children }) => {
	return (
		<p className={styles.para_m} style={{ color: textColor ?? undefined }}>
			{children}
		</p>
	)
}

export const TParaLink: React.FC<ITextOverrides> = ({
	textColor,
	// @ts-ignore
	children
}) => {
	return (
		<p className={styles.para_m_link} style={{ color: textColor ?? undefined }}>
			{children}
		</p>
	)
}

// @ts-ignore
export const TParaS: React.FC<ITextOverrides> = ({ textColor, children }) => {
	return (
		<p className={styles.para_s} style={{ color: textColor ?? undefined }}>
			{children}
		</p>
	)
}

export const TMetadata: React.FC<ITextOverrides> = ({
	textColor,
	// @ts-ignore
	children
}) => {
	return (
		<p className={styles.metadata} style={{ color: textColor ?? undefined }}>
			{children}
		</p>
	)
}

// @ts-ignore
export const TLabel: React.FC<ITextOverrides> = ({ textColor, children }) => {
	return (
		<p className={styles.label} style={{ color: textColor ?? undefined }}>
			{children}
		</p>
	)
}

// #endregion

// #region UI Components

// Margins
export const MarginXS = 4
export const MarginS = 8
export const MarginM = 16
export const MarginL = 24
export const MarginXL = 32
export const MarginPageBottomSpace = 64

// Input

const ThemedTextField = styled(TextField)(({ theme }) => ({
	'& .MuiInputBase-input': {
		borderRadius: 4,
		backgroundColor: '#fff',
		position: 'relative',
		border: '1px solid #15111B',
		fontSize: 16,
		padding: '16px 12px',
		transition: theme.transitions.create([
			'border-color',
			'background-color',
			'box-shadow'
		]),
		fontFamily: ['Agrandir'].join(','),
		'&:focus': {
			boxShadow: `${alpha(ColorBlack, 0.25)} 0 0 0 0.2rem`
		}
	}
}))

export interface TextChangeCallback<T1, T2 = void> {
	(param1: T1): T2
}

export enum MeemInputType {
	Standard,
	SearchInput
}

interface MeemInputProps {
	id?: string
	defaultValue?: string
	isFullWidth?: boolean
	label?: string
	// type: MeemInputType
	onTextChange?: TextChangeCallback<string>
	onSubmitted?(): React.FormEventHandler<HTMLDivElement>
}

export const MeemInput: React.FC<MeemInputProps> = ({
	id,
	defaultValue,
	isFullWidth,
	label,
	onTextChange,
	onSubmitted
}) => {
	const [fieldLabel, setFieldLabel] = useState(label)
	const handleTextChangeInternal = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (onTextChange) {
			onTextChange(event.target.value)
		}
		if (event.target.value.length > 0) {
			setFieldLabel('')
		} else {
			setFieldLabel(label)
		}
	}

	return (
		<ThemedTextField
			variant="outlined"
			defaultValue={defaultValue}
			id={id}
			label={fieldLabel}
			// NOTE: This puts the adornment outside of the textfield???
			// InputProps={
			// 	type === MeemInputType.SearchInput
			// 		? {
			// 				startAdornment: (
			// 					<InputAdornment position="start" variant="outlined">
			// 						<Search />
			// 					</InputAdornment>
			// 				)
			// 		  }
			// 		: undefined
			// }
			InputLabelProps={{
				shrink: false,
				style: { color: ColorSecondary }
			}}
			fullWidth={isFullWidth}
			onChange={handleTextChangeInternal}
			onSubmit={onSubmitted}
		/>
	)
}

// Buttons
const ButtonTheme: any = (
	fillColor: string,
	textColor: string,
	hoverColor: string,
	bordered?: boolean
) => {
	return {
		color: textColor,
		'&:hover': {
			color: textColor,
			backgroundColor: hoverColor
		},
		backgroundColor: fillColor,
		letterSpacing: 0.5,
		border: bordered ? `1px solid ${textColor}` : 0,
		borderRadius: 24,
		height: 42,
		lineHeight: 0.5,
		paddingTop: '2px',
		fontFamily: 'AgrandirMedium',
		fontSize: '16px',
		padding: '0 22px'
	}
}

interface ButtonProps {
	theme: any
	onClick?(): any
	href?: string
	text: string
	icon?: string
	iconInverted?: boolean
	loading?: boolean
	disabled?: boolean
	iconTopPadding?: number
	iconBottomPadding?: number
	iconLeftPadding?: number
	iconRightPadding?: number
}

export const ButtonPrimaryTheme = ButtonTheme(
	ColorBlack,
	ColorWhite,
	ColorSecondary
)

export const ButtonWhiteTheme = ButtonTheme(
	ColorWhite,
	ColorBlack,
	'#EEFFCA',
	true
)

export const ButtonGreyTheme = ButtonTheme(
	'rgba(21, 17, 27, 0.1)',
	ColorBlack,
	'#EEFFCA',
	true
)

export const ButtonSecondaryTheme = ButtonTheme(
	'transparent',
	ColorBlack,
	ColorWhite,
	true
)

export const ButtonAccentTheme = ButtonTheme(
	ColorSecondary,
	ColorWhite,
	'#554E61'
)

export const ButtonVerifyTheme = ButtonTheme(
	ColorVerify,
	ColorWhite,
	'rgba(62, 162, 255, 0.7)'
)

export const ButtonHomePageTheme = ButtonTheme(
	ColorAltAccent,
	ColorBlack,
	'#EEFFCA'
)

export const MeemButton: React.FC<ButtonProps> = ({
	theme,
	onClick,
	href,
	text,
	icon,
	iconInverted,
	loading,
	disabled,
	iconBottomPadding,
	iconTopPadding,
	iconLeftPadding,
	iconRightPadding
}) => {
	const StyledButton = styled(Button)(theme)

	let loadingColor = '#fff'
	if (
		theme.backgroundColor === ColorWhite ||
		theme.backgroundColor === 'transparent' ||
		theme.backgroundColor === ColorAccent ||
		theme.backgroundColor === ColorAltAccent ||
		theme.backgroundColor === ColorLight
	) {
		loadingColor = '#000'
	}
	return (
		// div needed as Button component itself doesn't like being directly positioned
		<div>
			<StyledButton onClick={onClick} href={href} disabled={disabled}>
				{loading != null && loading && (
					<CircularProgress
						// MUI does not work with scss
						style={{
							color: loadingColor,
							height: '24px',
							width: '24px'
						}}
					/>
				)}
				{(loading == null || !loading) && (
					// @ts-ignore
					<Row>
						{icon !== undefined && (
							<div
								style={{
									display: 'flex',
									flexDirection: 'row'
								}}
							>
								<img
									src={icon}
									alt="Icon"
									height={20}
									width={20}
									style={
										iconInverted
											? {
													WebkitFilter: 'invert(1)',
													filter: 'invert(1)',
													height: '20px',
													width: '20px',
													paddingTop: iconTopPadding ?? 0,
													paddingBottom: iconBottomPadding ?? 0,
													paddingLeft: iconLeftPadding ?? 0,
													paddingRight: iconRightPadding ?? 0
											  }
											: {
													height: '20px',
													width: '20px',
													paddingTop: iconTopPadding ?? 0,
													paddingBottom: iconBottomPadding ?? 0,
													paddingLeft: iconLeftPadding ?? 0,
													paddingRight: iconRightPadding ?? 0
											  }
									}
								/>
								<SizedBox width={8} />
							</div>
						)}
						<p style={{ textTransform: 'uppercase' }}>{text}</p>
					</Row>
				)}
			</StyledButton>
		</div>
	)
}

interface IconButtonProps {
	onClick?(): any
	iconPath: string
	size: number
}

export const IconButton: React.FC<IconButtonProps> = ({
	onClick,
	iconPath,
	size
}) => {
	return (
		<button
			className={styles.transparent_button}
			type="button"
			onClick={onClick}
		>
			<img
				src={iconPath}
				width={`${size}px`}
				height={`${size}px`}
				alt="Button"
			/>
		</button>
	)
}
interface ColumnProps {
	crossAxisAlignment?: CrossAxisAlignment
	mainAxisAlignment?: MainAxisAlignment
}

// @ts-ignore
export const ContentContainer: React.FC = ({ children }) => {
	return (
		<div className={styles.page_container}>
			<div className={styles.content_container}>{children}</div>
		</div>
	)
}

interface ContainerProps {
	backgroundColor?: string
}

export const Container: React.FC<ContainerProps> = ({
	backgroundColor,
	// @ts-ignore
	children
}) => {
	return (
		<div
			style={{
				backgroundColor,
				width: '100%',
				height: '100%',
				position: 'relative'
			}}
		>
			{children}
		</div>
	)
}

export const Column: React.FC<ColumnProps> = ({
	crossAxisAlignment,
	mainAxisAlignment,
	// @ts-ignore
	children
}) => {
	let crossAlign = 'center'
	let mainAlign = 'center'

	if (crossAxisAlignment) {
		switch (crossAxisAlignment) {
			case CrossAxisAlignment.Start:
				crossAlign = 'flex-start'
				break
			case CrossAxisAlignment.End:
				crossAlign = 'flex-end'
				break
			case CrossAxisAlignment.SpaceBetween:
				crossAlign = 'space-between'
				break
			default:
				crossAlign = 'center'
		}
	}

	if (mainAxisAlignment) {
		switch (mainAxisAlignment) {
			case MainAxisAlignment.Start:
				mainAlign = 'flex-start'
				break
			case MainAxisAlignment.End:
				mainAlign = 'flex-end'
				break
			case MainAxisAlignment.SpaceBetween:
				mainAlign = 'space-between'
				break
			default:
				mainAlign = 'center'
		}
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: crossAlign,
				justifyContent: mainAlign,
				width: '100%'
			}}
		>
			{children}
		</div>
	)
}

interface RowProps {
	crossAxisAlignment?: CrossAxisAlignment
	mainAxisAlignment?: MainAxisAlignment
}

interface PaddingProps {
	all?: number
	vertical?: number
	horizontal?: number
	left?: number
	right?: number
	top?: number
	bottom?: number
}

export const Padding: React.FC<PaddingProps> = ({
	all,
	vertical,
	horizontal,
	left,
	right,
	top,
	bottom,
	// @ts-ignore
	children
}) => {
	let paddingLeft = 0
	let paddingRight = 0
	let paddingTop = 0
	let paddingBottom = 0

	if (all) {
		paddingLeft = all
		paddingRight = all
		paddingTop = all
		paddingBottom = all
	} else if (vertical || horizontal) {
		if (vertical) {
			paddingTop = vertical
			paddingBottom = vertical
		}
		if (horizontal) {
			paddingLeft = horizontal
			paddingRight = horizontal
		}
	} else {
		if (left) {
			paddingLeft = left
		}
		if (right) {
			paddingRight = right
		}
		if (top) {
			paddingTop = top
		}
		if (bottom) {
			paddingBottom = bottom
		}
	}

	return (
		<div
			style={{
				paddingLeft: `${paddingLeft}px`,
				paddingRight: `${paddingRight}px`,
				paddingTop: `${paddingTop}px`,
				paddingBottom: `${paddingBottom}px`,
				width: '100%',
				height: '100%'
			}}
		>
			{children}
		</div>
	)
}

export const Row: React.FC<RowProps> = ({
	crossAxisAlignment,
	mainAxisAlignment,
	// @ts-ignore
	children
}) => {
	let crossAlign = 'center'
	let mainAlign = 'center'

	if (crossAxisAlignment) {
		switch (crossAxisAlignment) {
			case CrossAxisAlignment.Start:
				crossAlign = 'flex-start'
				break
			case CrossAxisAlignment.End:
				crossAlign = 'flex-end'
				break
			case CrossAxisAlignment.SpaceBetween:
				crossAlign = 'space-between'
				break
			default:
				crossAlign = 'center'
		}
	}

	if (mainAxisAlignment) {
		switch (mainAxisAlignment) {
			case MainAxisAlignment.Start:
				mainAlign = 'flex-start'
				break
			case MainAxisAlignment.End:
				mainAlign = 'flex-end'
				break
			case MainAxisAlignment.SpaceBetween:
				mainAlign = 'space-between'
				break
			default:
				mainAlign = 'center'
		}
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: crossAlign,
				justifyContent: mainAlign,
				width: '100%',
				height: '100%'
			}}
		>
			{children}
		</div>
	)
}

interface SizedBoxProps {
	width?: number
	height?: number
}

export const SizedBox: React.FC<SizedBoxProps> = ({ width, height }) => {
	const w = width ?? 0
	const h = height ?? 0
	return (
		<div
			style={{
				padding: '0px',
				margin: '0px',
				width: `${w}px`,
				height: `${h}px`
			}}
		/>
	)
}

interface VisibilityProps {
	visible: boolean
	height?: string
	width?: string
}

export const Visibility: React.FC<VisibilityProps> = ({
	visible,
	height,
	width,
	// @ts-ignore
	children
}) => {
	const v = visible ? 'block' : 'none'
	const h = height ?? '100%'
	const w = width ?? '100%'

	return (
		<div
			style={{
				display: v,
				height: h,
				width: w
			}}
		>
			{children}
		</div>
	)
}

// #endregion
