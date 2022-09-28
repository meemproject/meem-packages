/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * This schema describes version 20220718 of the Meem Club Token Metadata Standard
 */
export type MeemClub_Token_20220718 = Meem_Token_20220718;

/**
 * This schema describes version 20220718 of the Meem Token Metadata Standard
 */
export interface Meem_Token_20220718 {
  /**
   * The version of the Meem token metadata schema. See supported Meem contract metadata schemas here: https://meem.wtf
   */
  meem_metadata_version?: string;
  /**
   * The description of the token.
   */
  description: string;
  /**
   * The name of the token.
   */
  name: string;
  /**
   * An optional image for the token.
   */
  image?: string;
  /**
   * An optional url containing additional information about the token.
   */
  external_url?: string;
  /**
   * Associated contracts.
   */
  associations?: {
    /**
     * The type of contract.
     */
    meem_contract_type: string;
    /**
     * Address of the contract.
     */
    address: string;
    /**
     * Token Ids of associated tokens.
     */
    tokenIds?: string[];
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
}
