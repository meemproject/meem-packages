import { Button } from '@material-ui/core'
import React, { useState } from 'react'

export interface IExampleComponentProps {}

export const ExampleComponent: React.FC<IExampleComponentProps> = () => {
	const [count, setCount] = useState(0)
	return (
		<Button
			onClick={() => {
				setCount(count + 1)
			}}
		>{`Counter: ${count}`}</Button>
	)
}
