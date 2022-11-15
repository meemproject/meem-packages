/* eslint-disable react/display-name */
import React, { ComponentProps, FC } from 'react'

//https://medium.com/front-end-weekly/how-to-combine-context-providers-for-cleaner-react-code-9ed24f20225e
export const combineComponents = (...components: FC<any>[]): FC => {
	return components.reduce(
		(AccumulatedComponents, CurrentComponent) => {
			// @ts-ignore
			return ({ children }: ComponentProps<FC>): JSX.Element => {
				return (
					<AccumulatedComponents>
						<CurrentComponent>{children}</CurrentComponent>
					</AccumulatedComponents>
				)
			}
		},
		({ children }) => <>{children}</>
	)
}
