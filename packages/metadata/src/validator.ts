import { Validator as JsonValidator, ValidatorResult } from 'jsonschema'
import { validateVersion } from './versions'

export class Validator {
	public name: string

	public calVer: string

	public type: string

	public constructor(version: string) {
		// require version <name>_<type>_<calver>
		validateVersion(version)

		const [name, type, calVer] = version.split('_')
		this.name = name
		this.type = type
		this.calVer = calVer
	}

	/**
	 * Validates the passed json against the Validator's schema
	 *
	 * @param json
	 */
	public validate(json: { [key: string]: any }): ValidatorResult {
		const jsonValidator = new JsonValidator()
		const schema = require(`../schemas/${this.name}/${this.calVer}/${this.type}.json`)
		jsonValidator.addSchema(schema)
		function importNextSchema() {
			const nextSchema = jsonValidator.unresolvedRefs.shift()
			if (!nextSchema) {
				return
			}
			const s = require(`../schemas${nextSchema}`)
			jsonValidator.addSchema(s)
		}
		for (let i = 0; i < jsonValidator.unresolvedRefs.length; i += 1) {
			importNextSchema()
		}
		return jsonValidator.validate(json, schema)
	}
}
