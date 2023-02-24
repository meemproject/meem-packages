import { Agreement } from './methods/agreement'
import { AgreementExtension } from './methods/agreementExtension'
import { Id } from './methods/id'
import { GunOptions, Storage } from './methods/storage'

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

export class MeemSDK {
	public id: Id

	public agreement: Agreement

	public agreementExtension: AgreementExtension

	public storage: Storage

	private jwt?: string

	public constructor(options: {
		jwt?: string
		apiUrl?: string
		isGunEnabled?: boolean
		gunOptions?: GunOptions
		gqlHttpUrl?: string
		gqlWsUri?: string
	}) {
		const { jwt, apiUrl, gunOptions, gqlHttpUrl, gqlWsUri, isGunEnabled } =
			options
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
			gunOptions,
			isGunEnabled: typeof isGunEnabled === 'boolean' ? isGunEnabled : true,
			id: this.id,
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
	}
}
