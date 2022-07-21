/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * This schema describes version 20220718 of the Meem Club Contract Metadata Standard
 */
export type MeemClub_Contract_20220718 = Meem_Contract_20220718;

/**
 * This schema describes the 20220718 version of the Meem Contract Metadata Standard
 */
export interface Meem_Contract_20220718 {
  /**
   * The type of Meem Contract. See supported Meem contract types here: https://meem.wtf
   */
  meem_contract_type: string;
  /**
   * The version of the Meem contract metadata schema. See supported Meem contract metadata schemas here: https://meem.wtf
   */
  meem_metadata_version: string;
  /**
   * The description of the contract.
   */
  description: string;
  /**
   * The name of the contract.
   */
  name: string;
  /**
   * An optional image for the contract.
   */
  image?: string;
  /**
   * An optional url to a website with more information about the contract.
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
    [k: string]: unknown;
  }[];
}
