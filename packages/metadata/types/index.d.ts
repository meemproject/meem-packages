import { Meem_Contract_20220718 } from './Meem/20220718/Contract';
import { Meem_Token_20220718 } from './Meem/20220718/Token';
import { MeemClub_Contract_20220718 } from './MeemClub/20220718/Contract';
import { MeemClub_Token_20220718 } from './MeemClub/20220718/Token';
export { Meem_Contract_20220718, Meem_Token_20220718 };
export { MeemClub_Contract_20220718, MeemClub_Token_20220718 };
export declare type MeemContractMetadataLike = Meem_Contract_20220718 | MeemClub_Contract_20220718;
export declare type MeemTokenMetadataLike = Meem_Token_20220718 | MeemClub_Token_20220718;
export declare type MeemMetadataLike = MeemContractMetadataLike | MeemTokenMetadataLike;
