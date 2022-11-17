import { Validator } from './validator'
import { validateMetadataVersion } from './versions'

export class Generator {
	public type: string

	public version: string

	constructor(metadata: { meem_metadata_type: string, meem_metadata_version: string }) {
		const { meem_metadata_type, meem_metadata_version } = metadata
		validateMetadataVersion(metadata)

		this.type = meem_metadata_type
		this.version = meem_metadata_version
	}

	/**
	 * Generates valid, minfied, and ordered (alphabetized keys) schema
	 * Raises if the unordered json does not Validate against the Generator's schema
	 *
	 * @param unordered
	 */
	public generateJSON(unordered: { [key: string]: any }): string {
		// validate the schema
		const validator = new Validator({meem_metadata_type: this.type, meem_metadata_version: this.version})
		const validated = validator.validate(unordered)
		if (!validated) {
			throw new Error(`JSON does not conform to the ${this.type}_${this.version} schema.`)
		}

		// alphabetize key
		const ordered: { [key: string]: {} } = {}
		Object.keys(unordered)
			.sort()
			.forEach(key => {
				ordered[key] = unordered[key]
			})

		return JSON.stringify(ordered) // minify
	}
}
