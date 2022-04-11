import { useCallback, useEffect, useRef, useState } from 'react'

export function useStateCallback<T = unknown>(initialState: T) {
	const [state, setState] = useState<T>(initialState)
	const cbRef = useRef(null) // init mutable ref container for callbacks

	const setStateCallback = useCallback((s, cb) => {
		cbRef.current = cb // store current, passed callback in ref
		setState(s)
	}, []) // keep object reference stable, exactly like `useState`

	useEffect(() => {
		// cb.current is `null` on initial render,
		// so we only invoke callback on state *updates*
		if (cbRef.current) {
			// @ts-ignore
			cbRef.current(state)
			cbRef.current = null // reset callback after execution
		}
	}, [state])

	return [state, setStateCallback] as const
}
