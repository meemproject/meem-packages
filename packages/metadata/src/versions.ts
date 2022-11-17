/**
 *
 */
export const supportedVersions: { [key: string]: Array<string> } = {
	Meem: ['20221116'],
	MeemAgreement: ['20221116'],
	MeemAgreementRole: ['20221116']
}

/**
 *
 */
export const supportedVersionsTypeMapping: {
	[key: string]: { [key: string]: { [key: string]: string } }
} = {
	Meem: {
		20221116: {
			Contract: 'Meem_Contract_20221116',
			Token: 'Meem_Token_20221116',
			AgreementContract: 'Meem_AgreementContract_20221116',
			AgreementToken: 'Meem_AgreementToken_20221116',
			AgreementRoleContract: 'Meem_AgreementRoleContract_20221116',
			AgreementRoleToken: 'Meem_AgreementRoleToken_20221116'
		}
	}
}

/**
 *
 * @param metadata
 */
export function validateMetadataVersion(metadata: { meem_metadata_type: string, meem_metadata_version: string }): void {
	const { meem_metadata_type, meem_metadata_version } = metadata
	const [name, type] = meem_metadata_type.split('_')
	const calVer = meem_metadata_version

	// require name exists in `versions`
	if (!(name in supportedVersions)) {
		throw new Error(`There are no versions with the ${name} project name`)
	}

	// require calVer exists in `versions`
	const supportedVersionIndex = supportedVersions[name].indexOf(calVer)
	if (supportedVersionIndex === -1) {
		throw new Error(
			`There are no versions in the ${name} namespace with the ${calVer} calendar version`
		)
	}

	if (!supportedVersionsTypeMapping[name]?.[calVer]?.[type]) {
		throw new Error(
			`There are no types in the ${name} namespace with the ${calVer} calendar version that match ${type}`
		)
	}
}
