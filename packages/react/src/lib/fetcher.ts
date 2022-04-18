import { MeemAPI } from '@meemproject/api'
import Cookies from 'js-cookie'
import superagent from 'superagent'

interface IMakeFetcher {
	method?: MeemAPI.HttpMethod
	cleaner?: (res: superagent.Response) => any
	headers?: () => any
}

interface IBody {
	[key: string]: any
}

export function makeFetcher<U, V extends IBody | undefined, X>({
	method,
	headers,
	cleaner
}: IMakeFetcher): (path: string, queryParams?: U, body?: V) => Promise<X> {
	return (path: string, queryParams?: U, body?: V) => {
		const uri = process.env.NEXT_PUBLIC_API_URL
		// @ts-ignore
		const req = superagent[method.toLowerCase()](`${uri}${path}`)
		const jwt = Cookies.get('meemJwtToken')
		if (jwt) {
			req.set('Authorization', `JWT ${jwt}`)
		}
		if (headers) {
			req.set(headers())
		}
		if (queryParams) {
			req.query({ ...queryParams })
		}
		return req.send(body).then(cleaner ?? ((res: any) => res.body))
	}
}

export interface IQueryParams {}

export interface IPathParams {}

export interface IRequestBody {}

export interface IResponseBody {}

export interface IEndpoint {
	pathParams?: IPathParams
	queryParams?: IQueryParams
	requestBody?: IRequestBody
	responseBody?: IResponseBody
}

export interface IError {
	status: 'failure'
	code: string
	reason: string
	friendlyReason: string
}

export function getError(e: any): IError {
	if (
		e?.response?.body &&
		e.response.body.status &&
		e.response.body.code &&
		e.response.body.reason &&
		e.response.body.friendlyReason
	) {
		return e.response.body
	}
	return {
		code: 'UKNOWN_ERROR',
		status: 'failure',
		reason: 'An unknown error occurred.',
		friendlyReason: 'Sorry, something went wrong'
	}
}

export async function makeRequest<TDefinition extends IEndpoint = IEndpoint>(
	/** The URL path obtained from calling .path(). */
	url: string,
	options?: {
		/** The HTTP method. GET by default */
		method?: MeemAPI.HttpMethod
		/** Headers to send with the request */
		headers?: Record<string, string>
		/** Query parameters */
		query?: TDefinition['queryParams']
		/** Request body */
		body?: TDefinition['requestBody']
	}
): Promise<TDefinition['responseBody']> {
	const uri = /^http/.test(url)
		? url
		: `${process.env.NEXT_PUBLIC_API_URL}${url}`

	const method = options?.method ?? MeemAPI.HttpMethod.Get
	// @ts-ignore
	const req = superagent[method.toLowerCase()](uri)
	const jwt = Cookies.get('meemJwtToken')
	if (jwt) {
		req.set('Authorization', `JWT ${jwt}`)
	}
	if (options?.headers) {
		req.set(options.headers)
	}
	if (options?.query) {
		req.query({ ...options.query })
	}
	const { body: responseBody } = await req.send(options?.body)

	return responseBody
}
