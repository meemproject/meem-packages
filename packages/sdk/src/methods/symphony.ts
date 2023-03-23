import { MeemAPI } from '../generated/api.generated'
import { makeRequest } from '../lib/fetcher'
// import log from '../lib/log'

export class Symphony {
	private jwt?: string

	private apiUrl?: string

	public constructor(options: { jwt?: string; apiUrl?: string }) {
		const { jwt, apiUrl } = options
		this.jwt = jwt
		this.apiUrl = apiUrl
	}

	/** Sets the JWT used in api calls */
	public setJwt(jwt?: string) {
		this.jwt = jwt
	}

	/** Disconnect a Discord from Symphony */
	public async disconnectDiscord(options: { agreementDiscordId: string }) {
		const { agreementDiscordId } = options
		const result = await makeRequest<MeemAPI.v1.DisconnectDiscord.IDefinition>(
			MeemAPI.v1.DisconnectDiscord.path(),
			{
				jwt: this.jwt,
				baseUrl: this.apiUrl,
				method: MeemAPI.v1.DisconnectDiscord.method,
				body: {
					agreementDiscordId
				}
			}
		)

		return result
	}

	/** Disconnect a Slack from Symphony */
	public async disconnectSlack(options: { agreementSlackId: string }) {
		const { agreementSlackId } = options
		const result = await makeRequest<MeemAPI.v1.DisconnectSlack.IDefinition>(
			MeemAPI.v1.DisconnectSlack.path(),
			{
				jwt: this.jwt,
				baseUrl: this.apiUrl,
				method: MeemAPI.v1.DisconnectSlack.method,
				body: {
					agreementSlackId
				}
			}
		)

		return result
	}

	/** Disconnect a Twitter from Symphony */
	public async disconnectTwitter(options: { agreementTwitterId: string }) {
		const { agreementTwitterId } = options
		const result = await makeRequest<MeemAPI.v1.DisconnectTwitter.IDefinition>(
			MeemAPI.v1.DisconnectTwitter.path(),
			{
				jwt: this.jwt,
				baseUrl: this.apiUrl,
				method: MeemAPI.v1.DisconnectTwitter.method,
				body: {
					agreementTwitterId
				}
			}
		)

		return result
	}

	/** Get a URL to invite Symphony to Discord and the activation code */
	public async inviteDiscordBot(options: { agreementId: string }) {
		const { agreementId } = options
		const result = await makeRequest<MeemAPI.v1.InviteDiscordBot.IDefinition>(
			MeemAPI.v1.InviteDiscordBot.path(),
			{
				jwt: this.jwt,
				baseUrl: this.apiUrl,
				method: MeemAPI.v1.InviteDiscordBot.method,
				query: { agreementId }
			}
		)

		return result
	}

	/** Save a new Symphony rule */
	public async saveRule(options: {
		agreementId: string

		rule: MeemAPI.IRuleToSave
	}) {
		const { agreementId, rule } = options

		const result = await makeRequest<MeemAPI.v1.SaveRule.IDefinition>(
			MeemAPI.v1.SaveRule.path(),
			{
				jwt: this.jwt,
				baseUrl: this.apiUrl,
				method: MeemAPI.v1.SaveRule.method,
				body: {
					agreementId,
					rule
				}
			}
		)

		return result
	}

	/** Remove Symphony rules */
	public async removeRules(options: {
		agreementId: string

		/** The rules to remove */
		ruleIds: string[]
	}) {
		const { agreementId, ruleIds } = options

		const result = await makeRequest<MeemAPI.v1.RemoveRules.IDefinition>(
			MeemAPI.v1.RemoveRules.path(),
			{
				jwt: this.jwt,
				baseUrl: this.apiUrl,
				method: MeemAPI.v1.RemoveRules.method,
				body: {
					agreementId,
					ruleIds
				}
			}
		)

		return result
	}
}
