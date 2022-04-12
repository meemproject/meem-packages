import { useSWRConfig } from 'swr'

export type MatchMutate = (
	matcher: RegExp,
	data?: any,
	shouldRevalidate?: boolean | undefined
) => Promise<any[]>

// https://swr.vercel.app/docs/advanced/cache#mutate-multiple-keys-from-regex
export function useMatchMutate() {
	const { cache, mutate } = useSWRConfig()
	return (
		matcher: RegExp,
		data?: any,
		shouldRevalidate?: boolean | undefined
	) => {
		if (!(cache instanceof Map)) {
			throw new Error(
				'matchMutate requires the cache provider to be a Map instance'
			)
		}

		const keys = []

		// @ts-ignore
		// eslint-disable-next-line no-restricted-syntax
		for (const key of cache.keys()) {
			if (matcher.test(key)) {
				keys.push(key)
			}
		}

		const mutations = keys.map(key => mutate(key, data, shouldRevalidate))
		return Promise.all(mutations)
	}
}
