import { Agreement } from './methods/agreement'
import { Auth } from './methods/id'

export * from './api.generated'
export * from './abis'
export * from './lib/image'
export * from './lib/meemdata'
export * from './lib/fetcher'
export * from './methods/id'

export class MeemSDK {
	public auth: Auth

	public agreement: Agreement

	private jwt?: string

	public constructor(options: { jwt?: string }) {
		this.jwt = options.jwt
		this.auth = new Auth({ jwt: this.jwt })
		this.agreement = new Agreement({ jwt: this.jwt })
	}

	public setJwt(jwt?: string) {
		this.jwt = jwt
		this.auth.setJwt(jwt)
		this.agreement.setJwt(jwt)
	}
}
