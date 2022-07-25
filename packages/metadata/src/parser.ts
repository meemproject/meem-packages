import { MeemMetadataLike } from '../types'
import { Validator } from './validator'
import { validateVersion } from './versions'

export interface ParserResult {
	name: string
	type: string
	calVer: string,
	metadata: MeemMetadataLike
}

export class Parser {

	/**
	 * Parses a metadata object or JSON string
	 *
	 * @param metadata
	 */
	public parse(metadata: string | MeemMetadataLike): ParserResult {
		const parsed: MeemMetadataLike = typeof metadata === 'string' ? JSON.parse(metadata) : metadata

		if (!parsed.meem_metadata_version) {
			throw new Error(`The parsed metadata does not contain required meem_metadata_version`)
		}

		validateVersion(parsed.meem_metadata_version)

		const validator = new Validator(parsed.meem_metadata_version)
		const validatorResult = validator.validate(parsed)

		if (!validatorResult.valid) {
			throw new Error(`The parsed metadata is invalid: ${validatorResult.errors.map((e) => e.message)}`)
		}

		const [name, type, calVer] = parsed.meem_metadata_version.split('_')

		return {
			name,
			type,
			calVer,
			metadata: parsed
		}
	}
}
