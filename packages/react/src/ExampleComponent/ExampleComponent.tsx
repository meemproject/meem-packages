import { MeemAPI } from '@meemproject/api'
import React from 'react'
import log from '../lib/log'

export const ExampleComponent: React.FC = () => {
	log.debug(`Example log of GetConfig path: ${MeemAPI.v1.GetConfig.path()}`)
	return <h1>Hello Meem</h1>
}
