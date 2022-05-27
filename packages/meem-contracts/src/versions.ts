import { facets } from './facets.generated'
import { Chain } from './lib/meemStandard'
export interface IVersions {
	latest: string
	beta: string
	alpha: string
}

/** Tagged versions */
export const versions: {
	[Chain.Polygon]: IVersions
	[Chain.Rinkeby]: IVersions
} = {
	1: { latest: '1', beta: '1', alpha: '1' },
	4: {
		latest: '3',
		beta: '3',
		alpha: '3'
	}
}

/** Returns a list of versions. Newest first */
export function versionList(chain?: Chain.Rinkeby | Chain.Polygon) {
	return Object.keys(facets[chain ?? Chain.Rinkeby]).sort((a, b) => {
		return +b - +a
	})
}
