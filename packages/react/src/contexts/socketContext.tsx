import log from '@kengoldfarb/log'
import { MeemAPI } from '@meemproject/sdk'
import { isEqual, remove } from 'lodash'
import React, { useContext, createContext, useState, ReactNode } from 'react'
import { MatchMutate, useMatchMutate } from '../lib/useMatchMutate'

export interface ISockets {
	on(options: MeemAPI.EventListener): void
	off(eventName: MeemAPI.MeemEvent): void
	subscribe(events: MeemAPI.IEvent[], walletAddress?: string): void
	unsubscribe(events: MeemAPI.SubscribeType[]): void
	emit<TEventPayload = Record<string, any>>(
		eventName: MeemAPI.MeemEvent,
		data: TEventPayload
	): void
}

export interface ISocketContextState {
	connect: () => void
	websocket?: WebSocket
	sockets?: ISockets
	isConnected: boolean
}

const SocketContext = createContext({} as ISocketContextState)
SocketContext.displayName = 'SocketContext'

function handleEventSWRInvalidation(options: {
	matchMutate: MatchMutate
	eventName: MeemAPI.MeemEvent
	data: Record<string, any>
}) {
	const { eventName, matchMutate } = options
	let re: string | undefined

	switch (eventName) {
		// TODO: Invalidate SWR data if necessary
		// case MeemAPI.MeemEvent.MeemMinted:
		// 	re = ''
		// 	break

		default:
			log.debug(`No SWR invalidation handle for event: ${eventName}`)
			break
	}

	if (re) {
		const regexp = new RegExp(re)

		matchMutate(regexp)
	}
}

function init(options: { matchMutate: MatchMutate; wsUrl: string }): {
	ws?: WebSocket
	sockets?: ISockets
} {
	const { matchMutate, wsUrl } = options
	if (!wsUrl) {
		log.warn('Missing websocket URL wsUrl')
		throw new Error('Missing websocket URL wsUrl')
	}

	const ws = new WebSocket(wsUrl)

	const eventHandlers: {
		[eventName: string]: ((data: any) => void)[]
	} = {}
	let pendingEmits: Record<string, any>[] = []
	let pendingSubscriptions: Record<string, any>[] = []
	const subscriptions: Record<string, any>[] = []
	let subscribeDebounceTimer: ReturnType<typeof setTimeout> | undefined

	ws.onopen = () => {
		pendingEmits.forEach(e => {
			// @ts-ignore
			ws.send(e)
		})
		pendingEmits = []

		// If ws reconnects, we'll have existing event handlers that need to be re-attached
		Object.keys(eventHandlers).forEach(eventName => {
			eventHandlers[eventName].forEach(handler => {
				ws?.addEventListener(eventName, handler)
			})
		})

		// Subscribe to events
		subscriptions.forEach(subscriptionData => {
			const dataToEmit = JSON.stringify({
				eventName: MeemAPI.MeemEvent.Subscribe,
				data: {
					...subscriptionData,
					key: MeemAPI.MeemEvent.Subscribe
				}
			})

			ws?.send(dataToEmit)
		})
	}

	ws.onmessage = event => {
		const data = JSON.parse(event.data)
		handleEventSWRInvalidation({
			eventName: data.eventName,
			data: data.data,
			matchMutate
		})
		ws?.dispatchEvent(new CustomEvent(data.eventName, { detail: data.data }))
	}

	ws.onclose = e => {
		log.trace('ws closed. Attempting to reconnect.', e.reason)
		setTimeout(() => {
			init({ matchMutate, wsUrl })
		}, 1000)
	}

	ws.onerror = err => {
		log.crit('ws error: ', err)
		ws?.close()
	}

	const sockets: ISockets = {
		on: ({ eventName, handler }) => {
			if (!eventHandlers[eventName]) {
				eventHandlers[eventName] = []
			}
			log.debug(`Added event handler for: ${eventName}`)
			eventHandlers[eventName].push(handler)
			// @ts-ignore
			ws.addEventListener(eventName, handler)
		},
		subscribe: (events, walletAddress) => {
			log.debug('Subscribing to events', { events })
			pendingSubscriptions = pendingSubscriptions.concat(events)
			if (subscribeDebounceTimer) {
				clearTimeout(subscribeDebounceTimer)
			}
			subscribeDebounceTimer = setTimeout(() => {
				if (pendingSubscriptions.length > 0) {
					sockets?.emit(MeemAPI.MeemEvent.Subscribe, {
						walletAddress,
						events: pendingSubscriptions
					})
					pendingSubscriptions = []
				}
			}, 200)
		},
		unsubscribe: events => {
			log.debug('Unsubscribing from events', { events })
			if (events.length > 0) {
				sockets?.emit(MeemAPI.MeemEvent.Unsubscribe, { events })
			}
		},
		off: eventName => {
			if (eventHandlers[eventName]) {
				eventHandlers[eventName].forEach(cb => {
					ws?.removeEventListener(eventName, cb)
				})
				eventHandlers[eventName] = []
			}
		},
		emit: (eventName, data) => {
			const dataToEmit = JSON.stringify({
				eventName,
				data: {
					...data,
					type: eventName
				}
			})

			switch (eventName) {
				case 'subscribe':
					subscriptions.push(data)
					break

				case 'unsubscribe':
					remove(subscriptions, (s: any) => isEqual(s, data))
					break

				default:
					// @ts-ignore
					pendingEmits.push(dataToEmit)
					break
			}

			if (ws?.readyState === ws?.OPEN) {
				ws?.send(dataToEmit)
			}
		}
	}

	sockets.on({
		eventName: MeemAPI.MeemEvent.SubscribeAck,
		handler: ({ detail }) => {
			if (detail.events) {
				log.debug('Event listener attached to events', {
					events: detail.events
				})
			}
		}
	})
	sockets.on({
		eventName: MeemAPI.MeemEvent.Err,
		handler: err => {
			log.error('Socket error')
			log.error(err)
		}
	})

	return { sockets, ws }
}

export interface ISocketProviderProps {
	children?: ReactNode
	wsUrl: string
}

const SocketProvider: React.FC<ISocketProviderProps> = props => {
	log.debug(React.version)
	const matchMutate = useMatchMutate()
	const [websocket, setWebsocket] = useState<WebSocket | undefined>()
	const [sockets, setSockets] = useState<ISockets | undefined>()
	const [isConnected, setIsConnected] = useState(false)

	function connect() {
		if (isConnected) {
			return
		}
		const result = init({ matchMutate, wsUrl: props.wsUrl })
		setIsConnected(true)

		setWebsocket(result?.ws)
		setSockets(result?.sockets)
	}

	return (
		<SocketContext.Provider
			value={{ connect, websocket, sockets, isConnected }}
			{...props}
		/>
	)
}

function useSockets() {
	const context = useContext(SocketContext)
	if (typeof context === 'undefined') {
		throw new Error(`useSockets must be used within a SocketProvider`)
	}

	return context
}

export { SocketProvider, useSockets }
