import { Meem_Contract_20221116 } from './Meem/20221116/Contract'
import { Meem_Token_20221116 } from './Meem/20221116/Token'
import { Meem_AgreementContract_20221116 } from './Meem/20221116/AgreementContract'
import { Meem_AgreementToken_20221116 } from './Meem/20221116/AgreementToken'
import { Meem_AgreementRoleContract_20221116 } from './Meem/20221116/AgreementRoleContract'
import { Meem_AgreementRoleToken_20221116 } from './Meem/20221116/AgreementRoleToken'
import { Meem_AgreementExtension_20221116 } from './Meem/20221116/AgreementExtension'

export { Meem_Contract_20221116, Meem_Token_20221116 }
export { Meem_AgreementContract_20221116, Meem_AgreementToken_20221116 }
export { Meem_AgreementRoleContract_20221116, Meem_AgreementRoleToken_20221116 }
export { Meem_AgreementExtension_20221116 }

export type MeemMetadataLike = {
	meem_metadata_type: string
	meem_metadata_version: string
	[key: string]: any
}