import { Agreement } from './methods/agreement'
import { Id } from './methods/id'

export * from './generated/api.generated'
export * from './abis'
export * from './lib/image'
export * from './lib/meemdata'
export * from './lib/fetcher'
export * from './methods/id'
export * from './methods/agreement'

export class MeemSDK {
	public id: Id

	public agreement: Agreement

	private jwt?: string

	public constructor(options: { jwt?: string }) {
		this.jwt = options.jwt
		this.id = new Id({ jwt: this.jwt })
		this.agreement = new Agreement({ jwt: this.jwt })
	}

	/** Sets the JWT used in api calls */
	public setJwt(jwt?: string) {
		this.jwt = jwt
		this.id.setJwt(jwt)
		this.agreement.setJwt(jwt)
	}
}
