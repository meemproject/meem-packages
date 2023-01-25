import {
	ApolloClient,
	InMemoryCache,
	HttpLink,
	split
} from '@apollo/client/core'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import fetch from 'cross-fetch'
import { createClient } from 'graphql-ws'

// export const apolloClient = new ApolloClient({
// 	link: new HttpLink({
// 		uri:
// 			process.env.NEXT_PUBLIC_GRAPHQL_API_URL ??
// 			'https://gql.meem.wtf/v1/graphql',
// 		fetch
// 	}),
// 	cache: new InMemoryCache()
// })

export enum QueryRole {
	User = 'user',
	MutualClubMember = 'mutualClubMember',
	Anonymous = 'anonymous'
}

export function createApolloClient(options: {
	/** The jwt token */
	jwt?: string

	/** The GQL endpoint for http requests */
	httpUrl?: string

	/** The GQL endpoint for subscriptions */
	wsUri?: string

	/** The role to use for the query. Default anonymous */
	role?: QueryRole

	/** Additional headers to send */
	headers?: Record<string, string>
}) {
	const { jwt, headers, httpUrl, wsUri, role } = options

	const builtHeaders = headers ?? {}

	builtHeaders['x-hasura-role'] = role ?? QueryRole.Anonymous

	if (jwt) {
		builtHeaders.authorization = `Bearer ${jwt}`
	}

	const httpLink = new HttpLink({
		uri: httpUrl ?? 'https://gql.meem.wtf/v1/graphql',
		fetch,
		headers: builtHeaders
	})

	const wsLink =
		typeof window !== 'undefined'
			? new GraphQLWsLink(
					createClient({
						url: wsUri ?? 'wss://gql.meem.wtf/v1/graphql',
						connectionParams: () => {
							return jwt
								? {
										headers: builtHeaders
								  }
								: {}
						}
					})
			  )
			: null

	// The split function takes three parameters:
	//
	// * A function that's called for each operation to execute
	// * The Link to use for an operation if the function returns a "truthy" value
	// * The Link to use for an operation if the function returns a "falsy" value
	const splitLink =
		typeof window !== 'undefined' && wsLink != null
			? split(
					({ query }) => {
						const definition = getMainDefinition(query)
						return (
							definition.kind === 'OperationDefinition' &&
							definition.operation === 'subscription'
						)
					},
					wsLink,
					httpLink
			  )
			: httpLink

	const c = new ApolloClient({
		link: splitLink,
		cache: new InMemoryCache()
	})

	return c
}
