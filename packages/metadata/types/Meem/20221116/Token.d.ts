/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * This schema describes version 20221116 of the Meem Token metadata standard.
 */
export interface Meem_Token_20221116 {
  /**
   * The type of metadata. See supported Meem metadata types here: https://meem.wtf
   */
  meem_metadata_type: string;
  /**
   * The calendar version of the Meem token metadata schema. See supported Meem contract metadata schemas here: https://meem.wtf
   */
  meem_metadata_version: string;
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
  [k: string]: unknown;
}
