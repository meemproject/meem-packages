import { MeemAPI } from '../generated/api.generated'
import { makeRequest } from '../lib/fetcher'
import log from '../lib/log'

export interface ICreateAgreementExtensionOptions
	extends MeemAPI.v1.CreateAgreementExtension.IRequestBody {
	agreementId: string
}

export class AgreementExtension {
	private jwt?: string

	public constructor(options: { jwt?: string }) {
		this.jwt = options.jwt
	}

	/** Sets the JWT used in api calls */
	public setJwt(jwt?: string) {
		this.jwt = jwt
	}

	/** Create a new agreement */
	public async createAgreementExtension(
		options: ICreateAgreementExtensionOptions
	) {
		const { extensionId, metadata, agreementId } = options

		log.debug('Creating agreement Extension', options)

		const result =
			await makeRequest<MeemAPI.v1.CreateAgreementExtension.IDefinition>(
				MeemAPI.v1.CreateAgreementExtension.path({
					agreementId
				}),
				{
					jwt: this.jwt,
					method: MeemAPI.v1.CreateAgreement.method,
					body: {
						extensionId,
						metadata
					}
				}
			)

		return result
	}
}
