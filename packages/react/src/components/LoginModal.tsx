import React, { useState } from 'react'

export interface ILoginModalProps {}

export const LoginModal: React.FC<ILoginModalProps> = () => {
	const [count, setCount] = useState(0)

	return (
		<button
			onClick={() => {
				setCount(count + 1)
			}}
		>{`Counter: ${count}`}</button>
	)
}
