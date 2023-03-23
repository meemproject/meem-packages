import { Agreement } from './methods/agreement'
import { AgreementExtension } from './methods/agreementExtension'
import { Id } from './methods/id'
import { Storage } from './methods/storage'
import { Symphony } from './methods/symphony'

export * from './generated/api.generated'
export * from './abis'
export * from './lib/image'
export * from './lib/meemdata'
export * from './lib/fetcher'
export * from './lib/GQLClient'
export * from './methods/id'
export * from './methods/agreement'
export * from './methods/agreementExtension'
export * from './methods/storage'
export * from './methods/symphony'

export class MeemSDK {
	public id: Id

	public agreement: Agreement

	public agreementExtension: AgreementExtension

	public storage: Storage

	public symphony: Symphony

	private jwt?: string

	public constructor(options: {
		jwt?: string
		apiUrl?: string
		gqlHttpUrl?: string
		gqlWsUri?: string
	}) {
		const { jwt, apiUrl, gqlHttpUrl, gqlWsUri } = options
		this.jwt = jwt
		this.id = new Id({ jwt: this.jwt, gqlHttpUrl, gqlWsUri, apiUrl })
		this.agreement = new Agreement({
			jwt: this.jwt,
			gqlHttpUrl,
			gqlWsUri,
			apiUrl
		})
		this.agreementExtension = new AgreementExtension({ jwt: this.jwt, apiUrl })

		this.storage = new Storage({
			id: this.id,
			jwt: this.jwt,
			apiUrl
		})
		this.symphony = new Symphony({
			jwt: this.jwt,
			apiUrl
		})
	}

	/** Sets the JWT used in api calls */
	public setJwt(jwt?: string) {
		this.jwt = jwt
		this.id.setJwt(jwt)
		this.agreement.setJwt(jwt)
		this.agreementExtension.setJwt(jwt)
		this.storage.setJwt(jwt)
		this.symphony.setJwt(jwt)
	}
}
