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
			Token: 'Meem_Token_20221116'
		}
	},
	MeemAgreement: {
		20221116: {
			Contract: 'MeemAgreement_Contract_20221116',
			Token: 'MeemAgreement_Token_20221116'
		}
	},
	MeemAgreementRole: {
		20221116: {
			Contract: 'MeemAgreementRole_Contract_20221116',
			Token: 'MeemAgreementRole_Token_20221116'
		}
	}
}

/**
 *
 * @param verboseVersion
 */
export function validateVersion(verboseVersion: string): void {
	const [name, type, calVer] = verboseVersion.split('_')

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
