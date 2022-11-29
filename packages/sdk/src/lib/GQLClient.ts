import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'cross-fetch'

export const apolloClient = new ApolloClient({
	link: new HttpLink({
		uri:
			process.env.NEXT_PUBLIC_GRAPHQL_API_URL ??
			'https://gql.meem.wtf/v1/graphql',
		fetch
	}),
	cache: new InMemoryCache()
})
