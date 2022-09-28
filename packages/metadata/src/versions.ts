/**
 *
 */
export const supportedVersions: { [key: string]: Array<string> } = {
	Meem: ['20220718'],
	MeemClub: ['20220718']
}

/**
 *
 */
export const supportedVersionsTypeMapping: {
	[key: string]: { [key: string]: { [key: string]: string } }
} = {
	Meem: {
		20220718: {
			Contract: 'Meem_Contract_20220718',
			Token: 'Meem_Token_20220718'
		}
	},
	MeemClub: {
		20220718: {
			Contract: 'MeemClub_Contract_20220718',
			Token: 'MeemClub_Token_20220718'
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
