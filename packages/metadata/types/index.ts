import { Meem_Contract_20221116 } from './Meem/20221116/Contract'
import { Meem_Token_20221116 } from './Meem/20221116/Token'
import { MeemAgreement_Contract_20221116 } from './MeemAgreement/20221116/Contract'
import { MeemAgreement_Token_20221116 } from './MeemAgreement/20221116/Token'

export { Meem_Contract_20221116, Meem_Token_20221116 }
export { MeemAgreement_Contract_20221116, MeemAgreement_Token_20221116 }

export type MeemContractMetadataLike =
	| Meem_Contract_20221116
	| MeemAgreement_Contract_20221116

export type MeemTokenMetadataLike =
	| Meem_Token_20221116
	| MeemAgreement_Token_20221116

export type MeemMetadataLike = MeemContractMetadataLike | MeemTokenMetadataLike