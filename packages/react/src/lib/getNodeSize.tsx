/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from 'react'

export function getNodeSize(arrayOfTriggers: any[] = []) {
	const [width, setWidth] = useState<number>(0)
	const [height, setHeight] = useState<number>(0)

	const nodeRef = useCallback(node => {
		if (node !== null) {
			setWidth(node.getBoundingClientRect().width)
			setHeight(node.getBoundingClientRect().height)
		}
	}, arrayOfTriggers)

	return { height, width, nodeRef }
}
