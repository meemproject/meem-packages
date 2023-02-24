import { MeemAPI } from '../generated/api.generated'
import { makeRequest } from '../lib/fetcher'
import log from '../lib/log'

export interface ICreateAgreementExtensionOptions
	extends MeemAPI.v1.CreateAgreementExtension.IRequestBody {
	/** The id of the agreement */
	agreementId: string
}

export interface IUpdateAgreementExtensionOptions
	extends MeemAPI.v1.UpdateAgreementExtension.IRequestBody {
	/** The id of the agreement */
	agreementId: string

	/** The agreement extension id */
	agreementExtensionId: string
}

export class AgreementExtension {
	private jwt?: string

	private apiUrl?: string

	public constructor(options: { jwt?: string; apiUrl?: string }) {
		this.jwt = options.jwt
		this.apiUrl = options.apiUrl
	}

	/** Sets the JWT used in api calls */
	public setJwt(jwt?: string) {
		this.jwt = jwt
	}

	/** Create a new agreement extension */
	public async createAgreementExtension(
		options: ICreateAgreementExtensionOptions
	) {
		const { agreementId } = options

		log.debug('Creating agreement Extension', options)

		const result =
			await makeRequest<MeemAPI.v1.CreateAgreementExtension.IDefinition>(
				MeemAPI.v1.CreateAgreementExtension.path({
					agreementId
				}),
				{
					jwt: this.jwt,
					baseUrl: this.apiUrl,
					method: MeemAPI.v1.CreateAgreement.method,
					body: {
						...options
					}
				}
			)

		return result
	}

	/** Update an agreement extension */
	public async updateAgreementExtension(
		options: IUpdateAgreementExtensionOptions
	) {
		const { agreementExtensionId, agreementId } = options

		log.debug('Creating agreement Extension', options)

		const result =
			await makeRequest<MeemAPI.v1.UpdateAgreementExtension.IDefinition>(
				MeemAPI.v1.UpdateAgreementExtension.path({
					agreementId,
					agreementExtensionId
				}),
				{
					jwt: this.jwt,
					baseUrl: this.apiUrl,
					method: MeemAPI.v1.UpdateAgreementExtension.method,
					body: {
						...options
					}
				}
			)

		return result
	}
}
