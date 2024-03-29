import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  jsonb: any;
  timestamptz: any;
  uuid: any;
};

/** columns and relationships of "AgreementExtensionLinks" */
export type AgreementExtensionLinks = {
  __typename?: 'AgreementExtensionLinks';
  /** An object relationship */
  AgreementExtension?: Maybe<AgreementExtensions>;
  AgreementExtensionId?: Maybe<Scalars['uuid']>;
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  isEnabled: Scalars['Boolean'];
  label?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['jsonb']>;
  updatedAt: Scalars['timestamptz'];
  url: Scalars['String'];
  visibility: Scalars['String'];
};


/** columns and relationships of "AgreementExtensionLinks" */
export type AgreementExtensionLinksMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "AgreementExtensionLinks" */
export type AgreementExtensionLinks_Aggregate = {
  __typename?: 'AgreementExtensionLinks_aggregate';
  aggregate?: Maybe<AgreementExtensionLinks_Aggregate_Fields>;
  nodes: Array<AgreementExtensionLinks>;
};

export type AgreementExtensionLinks_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<AgreementExtensionLinks_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<AgreementExtensionLinks_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<AgreementExtensionLinks_Aggregate_Bool_Exp_Count>;
};

export type AgreementExtensionLinks_Aggregate_Bool_Exp_Bool_And = {
  arguments: AgreementExtensionLinks_Select_Column_AgreementExtensionLinks_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AgreementExtensionLinks_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type AgreementExtensionLinks_Aggregate_Bool_Exp_Bool_Or = {
  arguments: AgreementExtensionLinks_Select_Column_AgreementExtensionLinks_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AgreementExtensionLinks_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type AgreementExtensionLinks_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<AgreementExtensionLinks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AgreementExtensionLinks_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "AgreementExtensionLinks" */
export type AgreementExtensionLinks_Aggregate_Fields = {
  __typename?: 'AgreementExtensionLinks_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AgreementExtensionLinks_Max_Fields>;
  min?: Maybe<AgreementExtensionLinks_Min_Fields>;
};


/** aggregate fields of "AgreementExtensionLinks" */
export type AgreementExtensionLinks_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AgreementExtensionLinks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "AgreementExtensionLinks" */
export type AgreementExtensionLinks_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AgreementExtensionLinks_Max_Order_By>;
  min?: InputMaybe<AgreementExtensionLinks_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type AgreementExtensionLinks_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "AgreementExtensionLinks" */
export type AgreementExtensionLinks_Arr_Rel_Insert_Input = {
  data: Array<AgreementExtensionLinks_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<AgreementExtensionLinks_On_Conflict>;
};

/** Boolean expression to filter rows from the table "AgreementExtensionLinks". All fields are combined with a logical 'AND'. */
export type AgreementExtensionLinks_Bool_Exp = {
  AgreementExtension?: InputMaybe<AgreementExtensions_Bool_Exp>;
  AgreementExtensionId?: InputMaybe<Uuid_Comparison_Exp>;
  _and?: InputMaybe<Array<AgreementExtensionLinks_Bool_Exp>>;
  _not?: InputMaybe<AgreementExtensionLinks_Bool_Exp>;
  _or?: InputMaybe<Array<AgreementExtensionLinks_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isEnabled?: InputMaybe<Boolean_Comparison_Exp>;
  label?: InputMaybe<String_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
  visibility?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "AgreementExtensionLinks" */
export enum AgreementExtensionLinks_Constraint {
  /** unique or primary key constraint on columns "id" */
  AgreementExtensionLinksPkey = 'AgreementExtensionLinks_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type AgreementExtensionLinks_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type AgreementExtensionLinks_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type AgreementExtensionLinks_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "AgreementExtensionLinks" */
export type AgreementExtensionLinks_Insert_Input = {
  AgreementExtension?: InputMaybe<AgreementExtensions_Obj_Rel_Insert_Input>;
  AgreementExtensionId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  isEnabled?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  url?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type AgreementExtensionLinks_Max_Fields = {
  __typename?: 'AgreementExtensionLinks_max_fields';
  AgreementExtensionId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
  visibility?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "AgreementExtensionLinks" */
export type AgreementExtensionLinks_Max_Order_By = {
  AgreementExtensionId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  visibility?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AgreementExtensionLinks_Min_Fields = {
  __typename?: 'AgreementExtensionLinks_min_fields';
  AgreementExtensionId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
  visibility?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "AgreementExtensionLinks" */
export type AgreementExtensionLinks_Min_Order_By = {
  AgreementExtensionId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  visibility?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "AgreementExtensionLinks" */
export type AgreementExtensionLinks_Mutation_Response = {
  __typename?: 'AgreementExtensionLinks_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AgreementExtensionLinks>;
};

/** on_conflict condition type for table "AgreementExtensionLinks" */
export type AgreementExtensionLinks_On_Conflict = {
  constraint: AgreementExtensionLinks_Constraint;
  update_columns?: Array<AgreementExtensionLinks_Update_Column>;
  where?: InputMaybe<AgreementExtensionLinks_Bool_Exp>;
};

/** Ordering options when selecting data from "AgreementExtensionLinks". */
export type AgreementExtensionLinks_Order_By = {
  AgreementExtension?: InputMaybe<AgreementExtensions_Order_By>;
  AgreementExtensionId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isEnabled?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  visibility?: InputMaybe<Order_By>;
};

/** primary key columns input for table: AgreementExtensionLinks */
export type AgreementExtensionLinks_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type AgreementExtensionLinks_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "AgreementExtensionLinks" */
export enum AgreementExtensionLinks_Select_Column {
  /** column name */
  AgreementExtensionId = 'AgreementExtensionId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  IsEnabled = 'isEnabled',
  /** column name */
  Label = 'label',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Url = 'url',
  /** column name */
  Visibility = 'visibility'
}

/** select "AgreementExtensionLinks_aggregate_bool_exp_bool_and_arguments_columns" columns of table "AgreementExtensionLinks" */
export enum AgreementExtensionLinks_Select_Column_AgreementExtensionLinks_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsEnabled = 'isEnabled'
}

/** select "AgreementExtensionLinks_aggregate_bool_exp_bool_or_arguments_columns" columns of table "AgreementExtensionLinks" */
export enum AgreementExtensionLinks_Select_Column_AgreementExtensionLinks_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsEnabled = 'isEnabled'
}

/** input type for updating data in table "AgreementExtensionLinks" */
export type AgreementExtensionLinks_Set_Input = {
  AgreementExtensionId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  isEnabled?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  url?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "AgreementExtensionLinks" */
export type AgreementExtensionLinks_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AgreementExtensionLinks_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AgreementExtensionLinks_Stream_Cursor_Value_Input = {
  AgreementExtensionId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  isEnabled?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  url?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<Scalars['String']>;
};

/** update columns of table "AgreementExtensionLinks" */
export enum AgreementExtensionLinks_Update_Column {
  /** column name */
  AgreementExtensionId = 'AgreementExtensionId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  IsEnabled = 'isEnabled',
  /** column name */
  Label = 'label',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Url = 'url',
  /** column name */
  Visibility = 'visibility'
}

export type AgreementExtensionLinks_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<AgreementExtensionLinks_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<AgreementExtensionLinks_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<AgreementExtensionLinks_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<AgreementExtensionLinks_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<AgreementExtensionLinks_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AgreementExtensionLinks_Set_Input>;
  where: AgreementExtensionLinks_Bool_Exp;
};

/** columns and relationships of "AgreementExtensionRoles" */
export type AgreementExtensionRoles = {
  __typename?: 'AgreementExtensionRoles';
  /** An object relationship */
  AgreementExtension?: Maybe<AgreementExtensions>;
  AgreementExtensionId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  AgreementRole?: Maybe<AgreementRoles>;
  AgreementRoleId?: Maybe<Scalars['uuid']>;
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  metadata?: Maybe<Scalars['jsonb']>;
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "AgreementExtensionRoles" */
export type AgreementExtensionRolesMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "AgreementExtensionRoles" */
export type AgreementExtensionRoles_Aggregate = {
  __typename?: 'AgreementExtensionRoles_aggregate';
  aggregate?: Maybe<AgreementExtensionRoles_Aggregate_Fields>;
  nodes: Array<AgreementExtensionRoles>;
};

export type AgreementExtensionRoles_Aggregate_Bool_Exp = {
  count?: InputMaybe<AgreementExtensionRoles_Aggregate_Bool_Exp_Count>;
};

export type AgreementExtensionRoles_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<AgreementExtensionRoles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AgreementExtensionRoles_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "AgreementExtensionRoles" */
export type AgreementExtensionRoles_Aggregate_Fields = {
  __typename?: 'AgreementExtensionRoles_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AgreementExtensionRoles_Max_Fields>;
  min?: Maybe<AgreementExtensionRoles_Min_Fields>;
};


/** aggregate fields of "AgreementExtensionRoles" */
export type AgreementExtensionRoles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AgreementExtensionRoles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "AgreementExtensionRoles" */
export type AgreementExtensionRoles_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AgreementExtensionRoles_Max_Order_By>;
  min?: InputMaybe<AgreementExtensionRoles_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type AgreementExtensionRoles_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "AgreementExtensionRoles" */
export type AgreementExtensionRoles_Arr_Rel_Insert_Input = {
  data: Array<AgreementExtensionRoles_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<AgreementExtensionRoles_On_Conflict>;
};

/** Boolean expression to filter rows from the table "AgreementExtensionRoles". All fields are combined with a logical 'AND'. */
export type AgreementExtensionRoles_Bool_Exp = {
  AgreementExtension?: InputMaybe<AgreementExtensions_Bool_Exp>;
  AgreementExtensionId?: InputMaybe<Uuid_Comparison_Exp>;
  AgreementRole?: InputMaybe<AgreementRoles_Bool_Exp>;
  AgreementRoleId?: InputMaybe<Uuid_Comparison_Exp>;
  _and?: InputMaybe<Array<AgreementExtensionRoles_Bool_Exp>>;
  _not?: InputMaybe<AgreementExtensionRoles_Bool_Exp>;
  _or?: InputMaybe<Array<AgreementExtensionRoles_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "AgreementExtensionRoles" */
export enum AgreementExtensionRoles_Constraint {
  /** unique or primary key constraint on columns "id" */
  AgreementExtensionRolesPkey = 'AgreementExtensionRoles_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type AgreementExtensionRoles_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type AgreementExtensionRoles_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type AgreementExtensionRoles_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "AgreementExtensionRoles" */
export type AgreementExtensionRoles_Insert_Input = {
  AgreementExtension?: InputMaybe<AgreementExtensions_Obj_Rel_Insert_Input>;
  AgreementExtensionId?: InputMaybe<Scalars['uuid']>;
  AgreementRole?: InputMaybe<AgreementRoles_Obj_Rel_Insert_Input>;
  AgreementRoleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type AgreementExtensionRoles_Max_Fields = {
  __typename?: 'AgreementExtensionRoles_max_fields';
  AgreementExtensionId?: Maybe<Scalars['uuid']>;
  AgreementRoleId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "AgreementExtensionRoles" */
export type AgreementExtensionRoles_Max_Order_By = {
  AgreementExtensionId?: InputMaybe<Order_By>;
  AgreementRoleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AgreementExtensionRoles_Min_Fields = {
  __typename?: 'AgreementExtensionRoles_min_fields';
  AgreementExtensionId?: Maybe<Scalars['uuid']>;
  AgreementRoleId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "AgreementExtensionRoles" */
export type AgreementExtensionRoles_Min_Order_By = {
  AgreementExtensionId?: InputMaybe<Order_By>;
  AgreementRoleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "AgreementExtensionRoles" */
export type AgreementExtensionRoles_Mutation_Response = {
  __typename?: 'AgreementExtensionRoles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AgreementExtensionRoles>;
};

/** on_conflict condition type for table "AgreementExtensionRoles" */
export type AgreementExtensionRoles_On_Conflict = {
  constraint: AgreementExtensionRoles_Constraint;
  update_columns?: Array<AgreementExtensionRoles_Update_Column>;
  where?: InputMaybe<AgreementExtensionRoles_Bool_Exp>;
};

/** Ordering options when selecting data from "AgreementExtensionRoles". */
export type AgreementExtensionRoles_Order_By = {
  AgreementExtension?: InputMaybe<AgreementExtensions_Order_By>;
  AgreementExtensionId?: InputMaybe<Order_By>;
  AgreementRole?: InputMaybe<AgreementRoles_Order_By>;
  AgreementRoleId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: AgreementExtensionRoles */
export type AgreementExtensionRoles_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type AgreementExtensionRoles_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "AgreementExtensionRoles" */
export enum AgreementExtensionRoles_Select_Column {
  /** column name */
  AgreementExtensionId = 'AgreementExtensionId',
  /** column name */
  AgreementRoleId = 'AgreementRoleId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "AgreementExtensionRoles" */
export type AgreementExtensionRoles_Set_Input = {
  AgreementExtensionId?: InputMaybe<Scalars['uuid']>;
  AgreementRoleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "AgreementExtensionRoles" */
export type AgreementExtensionRoles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AgreementExtensionRoles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AgreementExtensionRoles_Stream_Cursor_Value_Input = {
  AgreementExtensionId?: InputMaybe<Scalars['uuid']>;
  AgreementRoleId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "AgreementExtensionRoles" */
export enum AgreementExtensionRoles_Update_Column {
  /** column name */
  AgreementExtensionId = 'AgreementExtensionId',
  /** column name */
  AgreementRoleId = 'AgreementRoleId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type AgreementExtensionRoles_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<AgreementExtensionRoles_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<AgreementExtensionRoles_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<AgreementExtensionRoles_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<AgreementExtensionRoles_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<AgreementExtensionRoles_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AgreementExtensionRoles_Set_Input>;
  where: AgreementExtensionRoles_Bool_Exp;
};

/** columns and relationships of "AgreementExtensionStorages" */
export type AgreementExtensionStorages = {
  __typename?: 'AgreementExtensionStorages';
  AgreementId?: Maybe<Scalars['uuid']>;
  ExtensionId?: Maybe<Scalars['uuid']>;
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  metadata: Scalars['jsonb'];
  type: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "AgreementExtensionStorages" */
export type AgreementExtensionStoragesMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "AgreementExtensionStorages" */
export type AgreementExtensionStorages_Aggregate = {
  __typename?: 'AgreementExtensionStorages_aggregate';
  aggregate?: Maybe<AgreementExtensionStorages_Aggregate_Fields>;
  nodes: Array<AgreementExtensionStorages>;
};

/** aggregate fields of "AgreementExtensionStorages" */
export type AgreementExtensionStorages_Aggregate_Fields = {
  __typename?: 'AgreementExtensionStorages_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AgreementExtensionStorages_Max_Fields>;
  min?: Maybe<AgreementExtensionStorages_Min_Fields>;
};


/** aggregate fields of "AgreementExtensionStorages" */
export type AgreementExtensionStorages_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AgreementExtensionStorages_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type AgreementExtensionStorages_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "AgreementExtensionStorages". All fields are combined with a logical 'AND'. */
export type AgreementExtensionStorages_Bool_Exp = {
  AgreementId?: InputMaybe<Uuid_Comparison_Exp>;
  ExtensionId?: InputMaybe<Uuid_Comparison_Exp>;
  _and?: InputMaybe<Array<AgreementExtensionStorages_Bool_Exp>>;
  _not?: InputMaybe<AgreementExtensionStorages_Bool_Exp>;
  _or?: InputMaybe<Array<AgreementExtensionStorages_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "AgreementExtensionStorages" */
export enum AgreementExtensionStorages_Constraint {
  /** unique or primary key constraint on columns "id" */
  AgreementExtensionStoragesPkey = 'AgreementExtensionStorages_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type AgreementExtensionStorages_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type AgreementExtensionStorages_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type AgreementExtensionStorages_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "AgreementExtensionStorages" */
export type AgreementExtensionStorages_Insert_Input = {
  AgreementId?: InputMaybe<Scalars['uuid']>;
  ExtensionId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  type?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type AgreementExtensionStorages_Max_Fields = {
  __typename?: 'AgreementExtensionStorages_max_fields';
  AgreementId?: Maybe<Scalars['uuid']>;
  ExtensionId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type AgreementExtensionStorages_Min_Fields = {
  __typename?: 'AgreementExtensionStorages_min_fields';
  AgreementId?: Maybe<Scalars['uuid']>;
  ExtensionId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "AgreementExtensionStorages" */
export type AgreementExtensionStorages_Mutation_Response = {
  __typename?: 'AgreementExtensionStorages_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AgreementExtensionStorages>;
};

/** on_conflict condition type for table "AgreementExtensionStorages" */
export type AgreementExtensionStorages_On_Conflict = {
  constraint: AgreementExtensionStorages_Constraint;
  update_columns?: Array<AgreementExtensionStorages_Update_Column>;
  where?: InputMaybe<AgreementExtensionStorages_Bool_Exp>;
};

/** Ordering options when selecting data from "AgreementExtensionStorages". */
export type AgreementExtensionStorages_Order_By = {
  AgreementId?: InputMaybe<Order_By>;
  ExtensionId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: AgreementExtensionStorages */
export type AgreementExtensionStorages_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type AgreementExtensionStorages_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "AgreementExtensionStorages" */
export enum AgreementExtensionStorages_Select_Column {
  /** column name */
  AgreementId = 'AgreementId',
  /** column name */
  ExtensionId = 'ExtensionId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "AgreementExtensionStorages" */
export type AgreementExtensionStorages_Set_Input = {
  AgreementId?: InputMaybe<Scalars['uuid']>;
  ExtensionId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  type?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "AgreementExtensionStorages" */
export type AgreementExtensionStorages_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AgreementExtensionStorages_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AgreementExtensionStorages_Stream_Cursor_Value_Input = {
  AgreementId?: InputMaybe<Scalars['uuid']>;
  ExtensionId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  type?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "AgreementExtensionStorages" */
export enum AgreementExtensionStorages_Update_Column {
  /** column name */
  AgreementId = 'AgreementId',
  /** column name */
  ExtensionId = 'ExtensionId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type AgreementExtensionStorages_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<AgreementExtensionStorages_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<AgreementExtensionStorages_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<AgreementExtensionStorages_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<AgreementExtensionStorages_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<AgreementExtensionStorages_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AgreementExtensionStorages_Set_Input>;
  where: AgreementExtensionStorages_Bool_Exp;
};

/** columns and relationships of "AgreementExtensionWidgets" */
export type AgreementExtensionWidgets = {
  __typename?: 'AgreementExtensionWidgets';
  /** An object relationship */
  AgreementExtension?: Maybe<AgreementExtensions>;
  AgreementExtensionId?: Maybe<Scalars['uuid']>;
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  isEnabled: Scalars['Boolean'];
  metadata?: Maybe<Scalars['jsonb']>;
  updatedAt: Scalars['timestamptz'];
  visibility: Scalars['String'];
};


/** columns and relationships of "AgreementExtensionWidgets" */
export type AgreementExtensionWidgetsMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "AgreementExtensionWidgets" */
export type AgreementExtensionWidgets_Aggregate = {
  __typename?: 'AgreementExtensionWidgets_aggregate';
  aggregate?: Maybe<AgreementExtensionWidgets_Aggregate_Fields>;
  nodes: Array<AgreementExtensionWidgets>;
};

export type AgreementExtensionWidgets_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<AgreementExtensionWidgets_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<AgreementExtensionWidgets_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<AgreementExtensionWidgets_Aggregate_Bool_Exp_Count>;
};

export type AgreementExtensionWidgets_Aggregate_Bool_Exp_Bool_And = {
  arguments: AgreementExtensionWidgets_Select_Column_AgreementExtensionWidgets_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AgreementExtensionWidgets_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type AgreementExtensionWidgets_Aggregate_Bool_Exp_Bool_Or = {
  arguments: AgreementExtensionWidgets_Select_Column_AgreementExtensionWidgets_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AgreementExtensionWidgets_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type AgreementExtensionWidgets_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<AgreementExtensionWidgets_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AgreementExtensionWidgets_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "AgreementExtensionWidgets" */
export type AgreementExtensionWidgets_Aggregate_Fields = {
  __typename?: 'AgreementExtensionWidgets_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AgreementExtensionWidgets_Max_Fields>;
  min?: Maybe<AgreementExtensionWidgets_Min_Fields>;
};


/** aggregate fields of "AgreementExtensionWidgets" */
export type AgreementExtensionWidgets_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AgreementExtensionWidgets_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "AgreementExtensionWidgets" */
export type AgreementExtensionWidgets_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AgreementExtensionWidgets_Max_Order_By>;
  min?: InputMaybe<AgreementExtensionWidgets_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type AgreementExtensionWidgets_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "AgreementExtensionWidgets" */
export type AgreementExtensionWidgets_Arr_Rel_Insert_Input = {
  data: Array<AgreementExtensionWidgets_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<AgreementExtensionWidgets_On_Conflict>;
};

/** Boolean expression to filter rows from the table "AgreementExtensionWidgets". All fields are combined with a logical 'AND'. */
export type AgreementExtensionWidgets_Bool_Exp = {
  AgreementExtension?: InputMaybe<AgreementExtensions_Bool_Exp>;
  AgreementExtensionId?: InputMaybe<Uuid_Comparison_Exp>;
  _and?: InputMaybe<Array<AgreementExtensionWidgets_Bool_Exp>>;
  _not?: InputMaybe<AgreementExtensionWidgets_Bool_Exp>;
  _or?: InputMaybe<Array<AgreementExtensionWidgets_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isEnabled?: InputMaybe<Boolean_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  visibility?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "AgreementExtensionWidgets" */
export enum AgreementExtensionWidgets_Constraint {
  /** unique or primary key constraint on columns "id" */
  AgreementExtensionWidgetsPkey = 'AgreementExtensionWidgets_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type AgreementExtensionWidgets_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type AgreementExtensionWidgets_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type AgreementExtensionWidgets_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "AgreementExtensionWidgets" */
export type AgreementExtensionWidgets_Insert_Input = {
  AgreementExtension?: InputMaybe<AgreementExtensions_Obj_Rel_Insert_Input>;
  AgreementExtensionId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  isEnabled?: InputMaybe<Scalars['Boolean']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  visibility?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type AgreementExtensionWidgets_Max_Fields = {
  __typename?: 'AgreementExtensionWidgets_max_fields';
  AgreementExtensionId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  visibility?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "AgreementExtensionWidgets" */
export type AgreementExtensionWidgets_Max_Order_By = {
  AgreementExtensionId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  visibility?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AgreementExtensionWidgets_Min_Fields = {
  __typename?: 'AgreementExtensionWidgets_min_fields';
  AgreementExtensionId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  visibility?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "AgreementExtensionWidgets" */
export type AgreementExtensionWidgets_Min_Order_By = {
  AgreementExtensionId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  visibility?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "AgreementExtensionWidgets" */
export type AgreementExtensionWidgets_Mutation_Response = {
  __typename?: 'AgreementExtensionWidgets_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AgreementExtensionWidgets>;
};

/** on_conflict condition type for table "AgreementExtensionWidgets" */
export type AgreementExtensionWidgets_On_Conflict = {
  constraint: AgreementExtensionWidgets_Constraint;
  update_columns?: Array<AgreementExtensionWidgets_Update_Column>;
  where?: InputMaybe<AgreementExtensionWidgets_Bool_Exp>;
};

/** Ordering options when selecting data from "AgreementExtensionWidgets". */
export type AgreementExtensionWidgets_Order_By = {
  AgreementExtension?: InputMaybe<AgreementExtensions_Order_By>;
  AgreementExtensionId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isEnabled?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  visibility?: InputMaybe<Order_By>;
};

/** primary key columns input for table: AgreementExtensionWidgets */
export type AgreementExtensionWidgets_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type AgreementExtensionWidgets_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "AgreementExtensionWidgets" */
export enum AgreementExtensionWidgets_Select_Column {
  /** column name */
  AgreementExtensionId = 'AgreementExtensionId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  IsEnabled = 'isEnabled',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Visibility = 'visibility'
}

/** select "AgreementExtensionWidgets_aggregate_bool_exp_bool_and_arguments_columns" columns of table "AgreementExtensionWidgets" */
export enum AgreementExtensionWidgets_Select_Column_AgreementExtensionWidgets_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsEnabled = 'isEnabled'
}

/** select "AgreementExtensionWidgets_aggregate_bool_exp_bool_or_arguments_columns" columns of table "AgreementExtensionWidgets" */
export enum AgreementExtensionWidgets_Select_Column_AgreementExtensionWidgets_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsEnabled = 'isEnabled'
}

/** input type for updating data in table "AgreementExtensionWidgets" */
export type AgreementExtensionWidgets_Set_Input = {
  AgreementExtensionId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  isEnabled?: InputMaybe<Scalars['Boolean']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  visibility?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "AgreementExtensionWidgets" */
export type AgreementExtensionWidgets_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AgreementExtensionWidgets_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AgreementExtensionWidgets_Stream_Cursor_Value_Input = {
  AgreementExtensionId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  isEnabled?: InputMaybe<Scalars['Boolean']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  visibility?: InputMaybe<Scalars['String']>;
};

/** update columns of table "AgreementExtensionWidgets" */
export enum AgreementExtensionWidgets_Update_Column {
  /** column name */
  AgreementExtensionId = 'AgreementExtensionId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  IsEnabled = 'isEnabled',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Visibility = 'visibility'
}

export type AgreementExtensionWidgets_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<AgreementExtensionWidgets_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<AgreementExtensionWidgets_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<AgreementExtensionWidgets_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<AgreementExtensionWidgets_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<AgreementExtensionWidgets_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AgreementExtensionWidgets_Set_Input>;
  where: AgreementExtensionWidgets_Bool_Exp;
};

/** columns and relationships of "AgreementExtensions" */
export type AgreementExtensions = {
  __typename?: 'AgreementExtensions';
  /** An object relationship */
  Agreement?: Maybe<Agreements>;
  /** An array relationship */
  AgreementExtensionLinks: Array<AgreementExtensionLinks>;
  /** An aggregate relationship */
  AgreementExtensionLinks_aggregate: AgreementExtensionLinks_Aggregate;
  /** An array relationship */
  AgreementExtensionRoles: Array<AgreementExtensionRoles>;
  /** An aggregate relationship */
  AgreementExtensionRoles_aggregate: AgreementExtensionRoles_Aggregate;
  /** An array relationship */
  AgreementExtensionWidgets: Array<AgreementExtensionWidgets>;
  /** An aggregate relationship */
  AgreementExtensionWidgets_aggregate: AgreementExtensionWidgets_Aggregate;
  AgreementId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  AgreementRole?: Maybe<AgreementRoles>;
  /** An array relationship */
  AgreementRoleExtensions: Array<AgreementRoleExtensions>;
  /** An aggregate relationship */
  AgreementRoleExtensions_aggregate: AgreementRoleExtensions_Aggregate;
  AgreementRoleId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  Extension?: Maybe<Extensions>;
  ExtensionId?: Maybe<Scalars['uuid']>;
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  metadata?: Maybe<Scalars['jsonb']>;
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "AgreementExtensions" */
export type AgreementExtensionsAgreementExtensionLinksArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionLinks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionLinks_Order_By>>;
  where?: InputMaybe<AgreementExtensionLinks_Bool_Exp>;
};


/** columns and relationships of "AgreementExtensions" */
export type AgreementExtensionsAgreementExtensionLinks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionLinks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionLinks_Order_By>>;
  where?: InputMaybe<AgreementExtensionLinks_Bool_Exp>;
};


/** columns and relationships of "AgreementExtensions" */
export type AgreementExtensionsAgreementExtensionRolesArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionRoles_Order_By>>;
  where?: InputMaybe<AgreementExtensionRoles_Bool_Exp>;
};


/** columns and relationships of "AgreementExtensions" */
export type AgreementExtensionsAgreementExtensionRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionRoles_Order_By>>;
  where?: InputMaybe<AgreementExtensionRoles_Bool_Exp>;
};


/** columns and relationships of "AgreementExtensions" */
export type AgreementExtensionsAgreementExtensionWidgetsArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionWidgets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionWidgets_Order_By>>;
  where?: InputMaybe<AgreementExtensionWidgets_Bool_Exp>;
};


/** columns and relationships of "AgreementExtensions" */
export type AgreementExtensionsAgreementExtensionWidgets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionWidgets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionWidgets_Order_By>>;
  where?: InputMaybe<AgreementExtensionWidgets_Bool_Exp>;
};


/** columns and relationships of "AgreementExtensions" */
export type AgreementExtensionsAgreementRoleExtensionsArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleExtensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleExtensions_Order_By>>;
  where?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
};


/** columns and relationships of "AgreementExtensions" */
export type AgreementExtensionsAgreementRoleExtensions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleExtensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleExtensions_Order_By>>;
  where?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
};


/** columns and relationships of "AgreementExtensions" */
export type AgreementExtensionsMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "AgreementExtensions" */
export type AgreementExtensions_Aggregate = {
  __typename?: 'AgreementExtensions_aggregate';
  aggregate?: Maybe<AgreementExtensions_Aggregate_Fields>;
  nodes: Array<AgreementExtensions>;
};

export type AgreementExtensions_Aggregate_Bool_Exp = {
  count?: InputMaybe<AgreementExtensions_Aggregate_Bool_Exp_Count>;
};

export type AgreementExtensions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<AgreementExtensions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AgreementExtensions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "AgreementExtensions" */
export type AgreementExtensions_Aggregate_Fields = {
  __typename?: 'AgreementExtensions_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AgreementExtensions_Max_Fields>;
  min?: Maybe<AgreementExtensions_Min_Fields>;
};


/** aggregate fields of "AgreementExtensions" */
export type AgreementExtensions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AgreementExtensions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "AgreementExtensions" */
export type AgreementExtensions_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AgreementExtensions_Max_Order_By>;
  min?: InputMaybe<AgreementExtensions_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type AgreementExtensions_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "AgreementExtensions" */
export type AgreementExtensions_Arr_Rel_Insert_Input = {
  data: Array<AgreementExtensions_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<AgreementExtensions_On_Conflict>;
};

/** Boolean expression to filter rows from the table "AgreementExtensions". All fields are combined with a logical 'AND'. */
export type AgreementExtensions_Bool_Exp = {
  Agreement?: InputMaybe<Agreements_Bool_Exp>;
  AgreementExtensionLinks?: InputMaybe<AgreementExtensionLinks_Bool_Exp>;
  AgreementExtensionLinks_aggregate?: InputMaybe<AgreementExtensionLinks_Aggregate_Bool_Exp>;
  AgreementExtensionRoles?: InputMaybe<AgreementExtensionRoles_Bool_Exp>;
  AgreementExtensionRoles_aggregate?: InputMaybe<AgreementExtensionRoles_Aggregate_Bool_Exp>;
  AgreementExtensionWidgets?: InputMaybe<AgreementExtensionWidgets_Bool_Exp>;
  AgreementExtensionWidgets_aggregate?: InputMaybe<AgreementExtensionWidgets_Aggregate_Bool_Exp>;
  AgreementId?: InputMaybe<Uuid_Comparison_Exp>;
  AgreementRole?: InputMaybe<AgreementRoles_Bool_Exp>;
  AgreementRoleExtensions?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
  AgreementRoleExtensions_aggregate?: InputMaybe<AgreementRoleExtensions_Aggregate_Bool_Exp>;
  AgreementRoleId?: InputMaybe<Uuid_Comparison_Exp>;
  Extension?: InputMaybe<Extensions_Bool_Exp>;
  ExtensionId?: InputMaybe<Uuid_Comparison_Exp>;
  _and?: InputMaybe<Array<AgreementExtensions_Bool_Exp>>;
  _not?: InputMaybe<AgreementExtensions_Bool_Exp>;
  _or?: InputMaybe<Array<AgreementExtensions_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "AgreementExtensions" */
export enum AgreementExtensions_Constraint {
  /** unique or primary key constraint on columns "AgreementId", "ExtensionId" */
  AgreementExtensionsAgreementIdExtensionIdKey = 'AgreementExtensions_AgreementId_ExtensionId_key',
  /** unique or primary key constraint on columns "AgreementRoleId" */
  AgreementExtensionsAgreementRoleIdKey = 'AgreementExtensions_AgreementRoleId_key',
  /** unique or primary key constraint on columns "id" */
  AgreementExtensionsPkey = 'AgreementExtensions_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type AgreementExtensions_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type AgreementExtensions_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type AgreementExtensions_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "AgreementExtensions" */
export type AgreementExtensions_Insert_Input = {
  Agreement?: InputMaybe<Agreements_Obj_Rel_Insert_Input>;
  AgreementExtensionLinks?: InputMaybe<AgreementExtensionLinks_Arr_Rel_Insert_Input>;
  AgreementExtensionRoles?: InputMaybe<AgreementExtensionRoles_Arr_Rel_Insert_Input>;
  AgreementExtensionWidgets?: InputMaybe<AgreementExtensionWidgets_Arr_Rel_Insert_Input>;
  AgreementId?: InputMaybe<Scalars['uuid']>;
  AgreementRole?: InputMaybe<AgreementRoles_Obj_Rel_Insert_Input>;
  AgreementRoleExtensions?: InputMaybe<AgreementRoleExtensions_Arr_Rel_Insert_Input>;
  AgreementRoleId?: InputMaybe<Scalars['uuid']>;
  Extension?: InputMaybe<Extensions_Obj_Rel_Insert_Input>;
  ExtensionId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type AgreementExtensions_Max_Fields = {
  __typename?: 'AgreementExtensions_max_fields';
  AgreementId?: Maybe<Scalars['uuid']>;
  AgreementRoleId?: Maybe<Scalars['uuid']>;
  ExtensionId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "AgreementExtensions" */
export type AgreementExtensions_Max_Order_By = {
  AgreementId?: InputMaybe<Order_By>;
  AgreementRoleId?: InputMaybe<Order_By>;
  ExtensionId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AgreementExtensions_Min_Fields = {
  __typename?: 'AgreementExtensions_min_fields';
  AgreementId?: Maybe<Scalars['uuid']>;
  AgreementRoleId?: Maybe<Scalars['uuid']>;
  ExtensionId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "AgreementExtensions" */
export type AgreementExtensions_Min_Order_By = {
  AgreementId?: InputMaybe<Order_By>;
  AgreementRoleId?: InputMaybe<Order_By>;
  ExtensionId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "AgreementExtensions" */
export type AgreementExtensions_Mutation_Response = {
  __typename?: 'AgreementExtensions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AgreementExtensions>;
};

/** input type for inserting object relation for remote table "AgreementExtensions" */
export type AgreementExtensions_Obj_Rel_Insert_Input = {
  data: AgreementExtensions_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<AgreementExtensions_On_Conflict>;
};

/** on_conflict condition type for table "AgreementExtensions" */
export type AgreementExtensions_On_Conflict = {
  constraint: AgreementExtensions_Constraint;
  update_columns?: Array<AgreementExtensions_Update_Column>;
  where?: InputMaybe<AgreementExtensions_Bool_Exp>;
};

/** Ordering options when selecting data from "AgreementExtensions". */
export type AgreementExtensions_Order_By = {
  Agreement?: InputMaybe<Agreements_Order_By>;
  AgreementExtensionLinks_aggregate?: InputMaybe<AgreementExtensionLinks_Aggregate_Order_By>;
  AgreementExtensionRoles_aggregate?: InputMaybe<AgreementExtensionRoles_Aggregate_Order_By>;
  AgreementExtensionWidgets_aggregate?: InputMaybe<AgreementExtensionWidgets_Aggregate_Order_By>;
  AgreementId?: InputMaybe<Order_By>;
  AgreementRole?: InputMaybe<AgreementRoles_Order_By>;
  AgreementRoleExtensions_aggregate?: InputMaybe<AgreementRoleExtensions_Aggregate_Order_By>;
  AgreementRoleId?: InputMaybe<Order_By>;
  Extension?: InputMaybe<Extensions_Order_By>;
  ExtensionId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: AgreementExtensions */
export type AgreementExtensions_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type AgreementExtensions_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "AgreementExtensions" */
export enum AgreementExtensions_Select_Column {
  /** column name */
  AgreementId = 'AgreementId',
  /** column name */
  AgreementRoleId = 'AgreementRoleId',
  /** column name */
  ExtensionId = 'ExtensionId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "AgreementExtensions" */
export type AgreementExtensions_Set_Input = {
  AgreementId?: InputMaybe<Scalars['uuid']>;
  AgreementRoleId?: InputMaybe<Scalars['uuid']>;
  ExtensionId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "AgreementExtensions" */
export type AgreementExtensions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AgreementExtensions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AgreementExtensions_Stream_Cursor_Value_Input = {
  AgreementId?: InputMaybe<Scalars['uuid']>;
  AgreementRoleId?: InputMaybe<Scalars['uuid']>;
  ExtensionId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "AgreementExtensions" */
export enum AgreementExtensions_Update_Column {
  /** column name */
  AgreementId = 'AgreementId',
  /** column name */
  AgreementRoleId = 'AgreementRoleId',
  /** column name */
  ExtensionId = 'ExtensionId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type AgreementExtensions_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<AgreementExtensions_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<AgreementExtensions_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<AgreementExtensions_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<AgreementExtensions_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<AgreementExtensions_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AgreementExtensions_Set_Input>;
  where: AgreementExtensions_Bool_Exp;
};

/** columns and relationships of "AgreementRoleExtensions" */
export type AgreementRoleExtensions = {
  __typename?: 'AgreementRoleExtensions';
  /** An object relationship */
  Agreement?: Maybe<Agreements>;
  /** An object relationship */
  AgreementExtension?: Maybe<AgreementExtensions>;
  AgreementExtensionId?: Maybe<Scalars['uuid']>;
  AgreementId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  AgreementRole?: Maybe<AgreementRoles>;
  AgreementRoleId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  Extension?: Maybe<Extensions>;
  ExtensionId?: Maybe<Scalars['uuid']>;
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  isEnabled: Scalars['Boolean'];
  metadata: Scalars['jsonb'];
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "AgreementRoleExtensions" */
export type AgreementRoleExtensionsMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "AgreementRoleExtensions" */
export type AgreementRoleExtensions_Aggregate = {
  __typename?: 'AgreementRoleExtensions_aggregate';
  aggregate?: Maybe<AgreementRoleExtensions_Aggregate_Fields>;
  nodes: Array<AgreementRoleExtensions>;
};

export type AgreementRoleExtensions_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<AgreementRoleExtensions_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<AgreementRoleExtensions_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<AgreementRoleExtensions_Aggregate_Bool_Exp_Count>;
};

export type AgreementRoleExtensions_Aggregate_Bool_Exp_Bool_And = {
  arguments: AgreementRoleExtensions_Select_Column_AgreementRoleExtensions_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type AgreementRoleExtensions_Aggregate_Bool_Exp_Bool_Or = {
  arguments: AgreementRoleExtensions_Select_Column_AgreementRoleExtensions_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type AgreementRoleExtensions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<AgreementRoleExtensions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "AgreementRoleExtensions" */
export type AgreementRoleExtensions_Aggregate_Fields = {
  __typename?: 'AgreementRoleExtensions_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AgreementRoleExtensions_Max_Fields>;
  min?: Maybe<AgreementRoleExtensions_Min_Fields>;
};


/** aggregate fields of "AgreementRoleExtensions" */
export type AgreementRoleExtensions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AgreementRoleExtensions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "AgreementRoleExtensions" */
export type AgreementRoleExtensions_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AgreementRoleExtensions_Max_Order_By>;
  min?: InputMaybe<AgreementRoleExtensions_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type AgreementRoleExtensions_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "AgreementRoleExtensions" */
export type AgreementRoleExtensions_Arr_Rel_Insert_Input = {
  data: Array<AgreementRoleExtensions_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<AgreementRoleExtensions_On_Conflict>;
};

/** Boolean expression to filter rows from the table "AgreementRoleExtensions". All fields are combined with a logical 'AND'. */
export type AgreementRoleExtensions_Bool_Exp = {
  Agreement?: InputMaybe<Agreements_Bool_Exp>;
  AgreementExtension?: InputMaybe<AgreementExtensions_Bool_Exp>;
  AgreementExtensionId?: InputMaybe<Uuid_Comparison_Exp>;
  AgreementId?: InputMaybe<Uuid_Comparison_Exp>;
  AgreementRole?: InputMaybe<AgreementRoles_Bool_Exp>;
  AgreementRoleId?: InputMaybe<Uuid_Comparison_Exp>;
  Extension?: InputMaybe<Extensions_Bool_Exp>;
  ExtensionId?: InputMaybe<Uuid_Comparison_Exp>;
  _and?: InputMaybe<Array<AgreementRoleExtensions_Bool_Exp>>;
  _not?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
  _or?: InputMaybe<Array<AgreementRoleExtensions_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isEnabled?: InputMaybe<Boolean_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "AgreementRoleExtensions" */
export enum AgreementRoleExtensions_Constraint {
  /** unique or primary key constraint on columns "id" */
  AgreementRoleExtensionsPkey = 'AgreementRoleExtensions_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type AgreementRoleExtensions_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type AgreementRoleExtensions_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type AgreementRoleExtensions_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "AgreementRoleExtensions" */
export type AgreementRoleExtensions_Insert_Input = {
  Agreement?: InputMaybe<Agreements_Obj_Rel_Insert_Input>;
  AgreementExtension?: InputMaybe<AgreementExtensions_Obj_Rel_Insert_Input>;
  AgreementExtensionId?: InputMaybe<Scalars['uuid']>;
  AgreementId?: InputMaybe<Scalars['uuid']>;
  AgreementRole?: InputMaybe<AgreementRoles_Obj_Rel_Insert_Input>;
  AgreementRoleId?: InputMaybe<Scalars['uuid']>;
  Extension?: InputMaybe<Extensions_Obj_Rel_Insert_Input>;
  ExtensionId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  isEnabled?: InputMaybe<Scalars['Boolean']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type AgreementRoleExtensions_Max_Fields = {
  __typename?: 'AgreementRoleExtensions_max_fields';
  AgreementExtensionId?: Maybe<Scalars['uuid']>;
  AgreementId?: Maybe<Scalars['uuid']>;
  AgreementRoleId?: Maybe<Scalars['uuid']>;
  ExtensionId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "AgreementRoleExtensions" */
export type AgreementRoleExtensions_Max_Order_By = {
  AgreementExtensionId?: InputMaybe<Order_By>;
  AgreementId?: InputMaybe<Order_By>;
  AgreementRoleId?: InputMaybe<Order_By>;
  ExtensionId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AgreementRoleExtensions_Min_Fields = {
  __typename?: 'AgreementRoleExtensions_min_fields';
  AgreementExtensionId?: Maybe<Scalars['uuid']>;
  AgreementId?: Maybe<Scalars['uuid']>;
  AgreementRoleId?: Maybe<Scalars['uuid']>;
  ExtensionId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "AgreementRoleExtensions" */
export type AgreementRoleExtensions_Min_Order_By = {
  AgreementExtensionId?: InputMaybe<Order_By>;
  AgreementId?: InputMaybe<Order_By>;
  AgreementRoleId?: InputMaybe<Order_By>;
  ExtensionId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "AgreementRoleExtensions" */
export type AgreementRoleExtensions_Mutation_Response = {
  __typename?: 'AgreementRoleExtensions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AgreementRoleExtensions>;
};

/** on_conflict condition type for table "AgreementRoleExtensions" */
export type AgreementRoleExtensions_On_Conflict = {
  constraint: AgreementRoleExtensions_Constraint;
  update_columns?: Array<AgreementRoleExtensions_Update_Column>;
  where?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
};

/** Ordering options when selecting data from "AgreementRoleExtensions". */
export type AgreementRoleExtensions_Order_By = {
  Agreement?: InputMaybe<Agreements_Order_By>;
  AgreementExtension?: InputMaybe<AgreementExtensions_Order_By>;
  AgreementExtensionId?: InputMaybe<Order_By>;
  AgreementId?: InputMaybe<Order_By>;
  AgreementRole?: InputMaybe<AgreementRoles_Order_By>;
  AgreementRoleId?: InputMaybe<Order_By>;
  Extension?: InputMaybe<Extensions_Order_By>;
  ExtensionId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isEnabled?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: AgreementRoleExtensions */
export type AgreementRoleExtensions_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type AgreementRoleExtensions_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "AgreementRoleExtensions" */
export enum AgreementRoleExtensions_Select_Column {
  /** column name */
  AgreementExtensionId = 'AgreementExtensionId',
  /** column name */
  AgreementId = 'AgreementId',
  /** column name */
  AgreementRoleId = 'AgreementRoleId',
  /** column name */
  ExtensionId = 'ExtensionId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  IsEnabled = 'isEnabled',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** select "AgreementRoleExtensions_aggregate_bool_exp_bool_and_arguments_columns" columns of table "AgreementRoleExtensions" */
export enum AgreementRoleExtensions_Select_Column_AgreementRoleExtensions_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsEnabled = 'isEnabled'
}

/** select "AgreementRoleExtensions_aggregate_bool_exp_bool_or_arguments_columns" columns of table "AgreementRoleExtensions" */
export enum AgreementRoleExtensions_Select_Column_AgreementRoleExtensions_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsEnabled = 'isEnabled'
}

/** input type for updating data in table "AgreementRoleExtensions" */
export type AgreementRoleExtensions_Set_Input = {
  AgreementExtensionId?: InputMaybe<Scalars['uuid']>;
  AgreementId?: InputMaybe<Scalars['uuid']>;
  AgreementRoleId?: InputMaybe<Scalars['uuid']>;
  ExtensionId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  isEnabled?: InputMaybe<Scalars['Boolean']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "AgreementRoleExtensions" */
export type AgreementRoleExtensions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AgreementRoleExtensions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AgreementRoleExtensions_Stream_Cursor_Value_Input = {
  AgreementExtensionId?: InputMaybe<Scalars['uuid']>;
  AgreementId?: InputMaybe<Scalars['uuid']>;
  AgreementRoleId?: InputMaybe<Scalars['uuid']>;
  ExtensionId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  isEnabled?: InputMaybe<Scalars['Boolean']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "AgreementRoleExtensions" */
export enum AgreementRoleExtensions_Update_Column {
  /** column name */
  AgreementExtensionId = 'AgreementExtensionId',
  /** column name */
  AgreementId = 'AgreementId',
  /** column name */
  AgreementRoleId = 'AgreementRoleId',
  /** column name */
  ExtensionId = 'ExtensionId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  IsEnabled = 'isEnabled',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type AgreementRoleExtensions_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<AgreementRoleExtensions_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<AgreementRoleExtensions_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<AgreementRoleExtensions_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<AgreementRoleExtensions_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<AgreementRoleExtensions_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AgreementRoleExtensions_Set_Input>;
  where: AgreementRoleExtensions_Bool_Exp;
};

/** columns and relationships of "AgreementRoleTokenTransfers" */
export type AgreementRoleTokenTransfers = {
  __typename?: 'AgreementRoleTokenTransfers';
  /** An object relationship */
  AgreementRoleToken?: Maybe<AgreementRoleTokens>;
  AgreementRoleTokenId?: Maybe<Scalars['uuid']>;
  createdAt: Scalars['timestamptz'];
  from: Scalars['String'];
  id: Scalars['uuid'];
  to: Scalars['String'];
  transactionHash: Scalars['String'];
  transferredAt: Scalars['timestamptz'];
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "AgreementRoleTokenTransfers" */
export type AgreementRoleTokenTransfers_Aggregate = {
  __typename?: 'AgreementRoleTokenTransfers_aggregate';
  aggregate?: Maybe<AgreementRoleTokenTransfers_Aggregate_Fields>;
  nodes: Array<AgreementRoleTokenTransfers>;
};

export type AgreementRoleTokenTransfers_Aggregate_Bool_Exp = {
  count?: InputMaybe<AgreementRoleTokenTransfers_Aggregate_Bool_Exp_Count>;
};

export type AgreementRoleTokenTransfers_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<AgreementRoleTokenTransfers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AgreementRoleTokenTransfers_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "AgreementRoleTokenTransfers" */
export type AgreementRoleTokenTransfers_Aggregate_Fields = {
  __typename?: 'AgreementRoleTokenTransfers_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AgreementRoleTokenTransfers_Max_Fields>;
  min?: Maybe<AgreementRoleTokenTransfers_Min_Fields>;
};


/** aggregate fields of "AgreementRoleTokenTransfers" */
export type AgreementRoleTokenTransfers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AgreementRoleTokenTransfers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "AgreementRoleTokenTransfers" */
export type AgreementRoleTokenTransfers_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AgreementRoleTokenTransfers_Max_Order_By>;
  min?: InputMaybe<AgreementRoleTokenTransfers_Min_Order_By>;
};

/** input type for inserting array relation for remote table "AgreementRoleTokenTransfers" */
export type AgreementRoleTokenTransfers_Arr_Rel_Insert_Input = {
  data: Array<AgreementRoleTokenTransfers_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<AgreementRoleTokenTransfers_On_Conflict>;
};

/** Boolean expression to filter rows from the table "AgreementRoleTokenTransfers". All fields are combined with a logical 'AND'. */
export type AgreementRoleTokenTransfers_Bool_Exp = {
  AgreementRoleToken?: InputMaybe<AgreementRoleTokens_Bool_Exp>;
  AgreementRoleTokenId?: InputMaybe<Uuid_Comparison_Exp>;
  _and?: InputMaybe<Array<AgreementRoleTokenTransfers_Bool_Exp>>;
  _not?: InputMaybe<AgreementRoleTokenTransfers_Bool_Exp>;
  _or?: InputMaybe<Array<AgreementRoleTokenTransfers_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  from?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  to?: InputMaybe<String_Comparison_Exp>;
  transactionHash?: InputMaybe<String_Comparison_Exp>;
  transferredAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "AgreementRoleTokenTransfers" */
export enum AgreementRoleTokenTransfers_Constraint {
  /** unique or primary key constraint on columns "id" */
  AgreementRoleTokenTransfersPkey = 'AgreementRoleTokenTransfers_pkey'
}

/** input type for inserting data into table "AgreementRoleTokenTransfers" */
export type AgreementRoleTokenTransfers_Insert_Input = {
  AgreementRoleToken?: InputMaybe<AgreementRoleTokens_Obj_Rel_Insert_Input>;
  AgreementRoleTokenId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  from?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  to?: InputMaybe<Scalars['String']>;
  transactionHash?: InputMaybe<Scalars['String']>;
  transferredAt?: InputMaybe<Scalars['timestamptz']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type AgreementRoleTokenTransfers_Max_Fields = {
  __typename?: 'AgreementRoleTokenTransfers_max_fields';
  AgreementRoleTokenId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  from?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  to?: Maybe<Scalars['String']>;
  transactionHash?: Maybe<Scalars['String']>;
  transferredAt?: Maybe<Scalars['timestamptz']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "AgreementRoleTokenTransfers" */
export type AgreementRoleTokenTransfers_Max_Order_By = {
  AgreementRoleTokenId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  transactionHash?: InputMaybe<Order_By>;
  transferredAt?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AgreementRoleTokenTransfers_Min_Fields = {
  __typename?: 'AgreementRoleTokenTransfers_min_fields';
  AgreementRoleTokenId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  from?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  to?: Maybe<Scalars['String']>;
  transactionHash?: Maybe<Scalars['String']>;
  transferredAt?: Maybe<Scalars['timestamptz']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "AgreementRoleTokenTransfers" */
export type AgreementRoleTokenTransfers_Min_Order_By = {
  AgreementRoleTokenId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  transactionHash?: InputMaybe<Order_By>;
  transferredAt?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "AgreementRoleTokenTransfers" */
export type AgreementRoleTokenTransfers_Mutation_Response = {
  __typename?: 'AgreementRoleTokenTransfers_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AgreementRoleTokenTransfers>;
};

/** on_conflict condition type for table "AgreementRoleTokenTransfers" */
export type AgreementRoleTokenTransfers_On_Conflict = {
  constraint: AgreementRoleTokenTransfers_Constraint;
  update_columns?: Array<AgreementRoleTokenTransfers_Update_Column>;
  where?: InputMaybe<AgreementRoleTokenTransfers_Bool_Exp>;
};

/** Ordering options when selecting data from "AgreementRoleTokenTransfers". */
export type AgreementRoleTokenTransfers_Order_By = {
  AgreementRoleToken?: InputMaybe<AgreementRoleTokens_Order_By>;
  AgreementRoleTokenId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  transactionHash?: InputMaybe<Order_By>;
  transferredAt?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: AgreementRoleTokenTransfers */
export type AgreementRoleTokenTransfers_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "AgreementRoleTokenTransfers" */
export enum AgreementRoleTokenTransfers_Select_Column {
  /** column name */
  AgreementRoleTokenId = 'AgreementRoleTokenId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  From = 'from',
  /** column name */
  Id = 'id',
  /** column name */
  To = 'to',
  /** column name */
  TransactionHash = 'transactionHash',
  /** column name */
  TransferredAt = 'transferredAt',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "AgreementRoleTokenTransfers" */
export type AgreementRoleTokenTransfers_Set_Input = {
  AgreementRoleTokenId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  from?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  to?: InputMaybe<Scalars['String']>;
  transactionHash?: InputMaybe<Scalars['String']>;
  transferredAt?: InputMaybe<Scalars['timestamptz']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "AgreementRoleTokenTransfers" */
export type AgreementRoleTokenTransfers_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AgreementRoleTokenTransfers_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AgreementRoleTokenTransfers_Stream_Cursor_Value_Input = {
  AgreementRoleTokenId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  from?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  to?: InputMaybe<Scalars['String']>;
  transactionHash?: InputMaybe<Scalars['String']>;
  transferredAt?: InputMaybe<Scalars['timestamptz']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "AgreementRoleTokenTransfers" */
export enum AgreementRoleTokenTransfers_Update_Column {
  /** column name */
  AgreementRoleTokenId = 'AgreementRoleTokenId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  From = 'from',
  /** column name */
  Id = 'id',
  /** column name */
  To = 'to',
  /** column name */
  TransactionHash = 'transactionHash',
  /** column name */
  TransferredAt = 'transferredAt',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type AgreementRoleTokenTransfers_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AgreementRoleTokenTransfers_Set_Input>;
  where: AgreementRoleTokenTransfers_Bool_Exp;
};

/** columns and relationships of "AgreementRoleTokens" */
export type AgreementRoleTokens = {
  __typename?: 'AgreementRoleTokens';
  /** An object relationship */
  Agreement?: Maybe<Agreements>;
  AgreementId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  AgreementRole?: Maybe<AgreementRoles>;
  AgreementRoleId?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  AgreementRoleTokenTransfers: Array<AgreementRoleTokenTransfers>;
  /** An aggregate relationship */
  AgreementRoleTokenTransfers_aggregate: AgreementRoleTokenTransfers_Aggregate;
  OwnerId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  Wallet?: Maybe<Wallets>;
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  metadata: Scalars['jsonb'];
  mintedAt: Scalars['timestamptz'];
  mintedBy: Scalars['String'];
  tokenId: Scalars['String'];
  tokenURI: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "AgreementRoleTokens" */
export type AgreementRoleTokensAgreementRoleTokenTransfersArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleTokenTransfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleTokenTransfers_Order_By>>;
  where?: InputMaybe<AgreementRoleTokenTransfers_Bool_Exp>;
};


/** columns and relationships of "AgreementRoleTokens" */
export type AgreementRoleTokensAgreementRoleTokenTransfers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleTokenTransfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleTokenTransfers_Order_By>>;
  where?: InputMaybe<AgreementRoleTokenTransfers_Bool_Exp>;
};


/** columns and relationships of "AgreementRoleTokens" */
export type AgreementRoleTokensMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "AgreementRoleTokens" */
export type AgreementRoleTokens_Aggregate = {
  __typename?: 'AgreementRoleTokens_aggregate';
  aggregate?: Maybe<AgreementRoleTokens_Aggregate_Fields>;
  nodes: Array<AgreementRoleTokens>;
};

export type AgreementRoleTokens_Aggregate_Bool_Exp = {
  count?: InputMaybe<AgreementRoleTokens_Aggregate_Bool_Exp_Count>;
};

export type AgreementRoleTokens_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<AgreementRoleTokens_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AgreementRoleTokens_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "AgreementRoleTokens" */
export type AgreementRoleTokens_Aggregate_Fields = {
  __typename?: 'AgreementRoleTokens_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AgreementRoleTokens_Max_Fields>;
  min?: Maybe<AgreementRoleTokens_Min_Fields>;
};


/** aggregate fields of "AgreementRoleTokens" */
export type AgreementRoleTokens_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AgreementRoleTokens_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "AgreementRoleTokens" */
export type AgreementRoleTokens_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AgreementRoleTokens_Max_Order_By>;
  min?: InputMaybe<AgreementRoleTokens_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type AgreementRoleTokens_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "AgreementRoleTokens" */
export type AgreementRoleTokens_Arr_Rel_Insert_Input = {
  data: Array<AgreementRoleTokens_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<AgreementRoleTokens_On_Conflict>;
};

/** Boolean expression to filter rows from the table "AgreementRoleTokens". All fields are combined with a logical 'AND'. */
export type AgreementRoleTokens_Bool_Exp = {
  Agreement?: InputMaybe<Agreements_Bool_Exp>;
  AgreementId?: InputMaybe<Uuid_Comparison_Exp>;
  AgreementRole?: InputMaybe<AgreementRoles_Bool_Exp>;
  AgreementRoleId?: InputMaybe<Uuid_Comparison_Exp>;
  AgreementRoleTokenTransfers?: InputMaybe<AgreementRoleTokenTransfers_Bool_Exp>;
  AgreementRoleTokenTransfers_aggregate?: InputMaybe<AgreementRoleTokenTransfers_Aggregate_Bool_Exp>;
  OwnerId?: InputMaybe<Uuid_Comparison_Exp>;
  Wallet?: InputMaybe<Wallets_Bool_Exp>;
  _and?: InputMaybe<Array<AgreementRoleTokens_Bool_Exp>>;
  _not?: InputMaybe<AgreementRoleTokens_Bool_Exp>;
  _or?: InputMaybe<Array<AgreementRoleTokens_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  mintedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  mintedBy?: InputMaybe<String_Comparison_Exp>;
  tokenId?: InputMaybe<String_Comparison_Exp>;
  tokenURI?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "AgreementRoleTokens" */
export enum AgreementRoleTokens_Constraint {
  /** unique or primary key constraint on columns "id" */
  AgreementRoleTokensPkey = 'AgreementRoleTokens_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type AgreementRoleTokens_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type AgreementRoleTokens_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type AgreementRoleTokens_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "AgreementRoleTokens" */
export type AgreementRoleTokens_Insert_Input = {
  Agreement?: InputMaybe<Agreements_Obj_Rel_Insert_Input>;
  AgreementId?: InputMaybe<Scalars['uuid']>;
  AgreementRole?: InputMaybe<AgreementRoles_Obj_Rel_Insert_Input>;
  AgreementRoleId?: InputMaybe<Scalars['uuid']>;
  AgreementRoleTokenTransfers?: InputMaybe<AgreementRoleTokenTransfers_Arr_Rel_Insert_Input>;
  OwnerId?: InputMaybe<Scalars['uuid']>;
  Wallet?: InputMaybe<Wallets_Obj_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  mintedAt?: InputMaybe<Scalars['timestamptz']>;
  mintedBy?: InputMaybe<Scalars['String']>;
  tokenId?: InputMaybe<Scalars['String']>;
  tokenURI?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type AgreementRoleTokens_Max_Fields = {
  __typename?: 'AgreementRoleTokens_max_fields';
  AgreementId?: Maybe<Scalars['uuid']>;
  AgreementRoleId?: Maybe<Scalars['uuid']>;
  OwnerId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  mintedAt?: Maybe<Scalars['timestamptz']>;
  mintedBy?: Maybe<Scalars['String']>;
  tokenId?: Maybe<Scalars['String']>;
  tokenURI?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "AgreementRoleTokens" */
export type AgreementRoleTokens_Max_Order_By = {
  AgreementId?: InputMaybe<Order_By>;
  AgreementRoleId?: InputMaybe<Order_By>;
  OwnerId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mintedAt?: InputMaybe<Order_By>;
  mintedBy?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  tokenURI?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AgreementRoleTokens_Min_Fields = {
  __typename?: 'AgreementRoleTokens_min_fields';
  AgreementId?: Maybe<Scalars['uuid']>;
  AgreementRoleId?: Maybe<Scalars['uuid']>;
  OwnerId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  mintedAt?: Maybe<Scalars['timestamptz']>;
  mintedBy?: Maybe<Scalars['String']>;
  tokenId?: Maybe<Scalars['String']>;
  tokenURI?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "AgreementRoleTokens" */
export type AgreementRoleTokens_Min_Order_By = {
  AgreementId?: InputMaybe<Order_By>;
  AgreementRoleId?: InputMaybe<Order_By>;
  OwnerId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mintedAt?: InputMaybe<Order_By>;
  mintedBy?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  tokenURI?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "AgreementRoleTokens" */
export type AgreementRoleTokens_Mutation_Response = {
  __typename?: 'AgreementRoleTokens_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AgreementRoleTokens>;
};

/** input type for inserting object relation for remote table "AgreementRoleTokens" */
export type AgreementRoleTokens_Obj_Rel_Insert_Input = {
  data: AgreementRoleTokens_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<AgreementRoleTokens_On_Conflict>;
};

/** on_conflict condition type for table "AgreementRoleTokens" */
export type AgreementRoleTokens_On_Conflict = {
  constraint: AgreementRoleTokens_Constraint;
  update_columns?: Array<AgreementRoleTokens_Update_Column>;
  where?: InputMaybe<AgreementRoleTokens_Bool_Exp>;
};

/** Ordering options when selecting data from "AgreementRoleTokens". */
export type AgreementRoleTokens_Order_By = {
  Agreement?: InputMaybe<Agreements_Order_By>;
  AgreementId?: InputMaybe<Order_By>;
  AgreementRole?: InputMaybe<AgreementRoles_Order_By>;
  AgreementRoleId?: InputMaybe<Order_By>;
  AgreementRoleTokenTransfers_aggregate?: InputMaybe<AgreementRoleTokenTransfers_Aggregate_Order_By>;
  OwnerId?: InputMaybe<Order_By>;
  Wallet?: InputMaybe<Wallets_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  mintedAt?: InputMaybe<Order_By>;
  mintedBy?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  tokenURI?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: AgreementRoleTokens */
export type AgreementRoleTokens_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type AgreementRoleTokens_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "AgreementRoleTokens" */
export enum AgreementRoleTokens_Select_Column {
  /** column name */
  AgreementId = 'AgreementId',
  /** column name */
  AgreementRoleId = 'AgreementRoleId',
  /** column name */
  OwnerId = 'OwnerId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  MintedAt = 'mintedAt',
  /** column name */
  MintedBy = 'mintedBy',
  /** column name */
  TokenId = 'tokenId',
  /** column name */
  TokenUri = 'tokenURI',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "AgreementRoleTokens" */
export type AgreementRoleTokens_Set_Input = {
  AgreementId?: InputMaybe<Scalars['uuid']>;
  AgreementRoleId?: InputMaybe<Scalars['uuid']>;
  OwnerId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  mintedAt?: InputMaybe<Scalars['timestamptz']>;
  mintedBy?: InputMaybe<Scalars['String']>;
  tokenId?: InputMaybe<Scalars['String']>;
  tokenURI?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "AgreementRoleTokens" */
export type AgreementRoleTokens_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AgreementRoleTokens_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AgreementRoleTokens_Stream_Cursor_Value_Input = {
  AgreementId?: InputMaybe<Scalars['uuid']>;
  AgreementRoleId?: InputMaybe<Scalars['uuid']>;
  OwnerId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  mintedAt?: InputMaybe<Scalars['timestamptz']>;
  mintedBy?: InputMaybe<Scalars['String']>;
  tokenId?: InputMaybe<Scalars['String']>;
  tokenURI?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "AgreementRoleTokens" */
export enum AgreementRoleTokens_Update_Column {
  /** column name */
  AgreementId = 'AgreementId',
  /** column name */
  AgreementRoleId = 'AgreementRoleId',
  /** column name */
  OwnerId = 'OwnerId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  MintedAt = 'mintedAt',
  /** column name */
  MintedBy = 'mintedBy',
  /** column name */
  TokenId = 'tokenId',
  /** column name */
  TokenUri = 'tokenURI',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type AgreementRoleTokens_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<AgreementRoleTokens_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<AgreementRoleTokens_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<AgreementRoleTokens_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<AgreementRoleTokens_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<AgreementRoleTokens_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AgreementRoleTokens_Set_Input>;
  where: AgreementRoleTokens_Bool_Exp;
};

/** columns and relationships of "AgreementRoleWallets" */
export type AgreementRoleWallets = {
  __typename?: 'AgreementRoleWallets';
  AgreementRoleId?: Maybe<Scalars['uuid']>;
  WalletId?: Maybe<Scalars['uuid']>;
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  role: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "AgreementRoleWallets" */
export type AgreementRoleWallets_Aggregate = {
  __typename?: 'AgreementRoleWallets_aggregate';
  aggregate?: Maybe<AgreementRoleWallets_Aggregate_Fields>;
  nodes: Array<AgreementRoleWallets>;
};

/** aggregate fields of "AgreementRoleWallets" */
export type AgreementRoleWallets_Aggregate_Fields = {
  __typename?: 'AgreementRoleWallets_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AgreementRoleWallets_Max_Fields>;
  min?: Maybe<AgreementRoleWallets_Min_Fields>;
};


/** aggregate fields of "AgreementRoleWallets" */
export type AgreementRoleWallets_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AgreementRoleWallets_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "AgreementRoleWallets". All fields are combined with a logical 'AND'. */
export type AgreementRoleWallets_Bool_Exp = {
  AgreementRoleId?: InputMaybe<Uuid_Comparison_Exp>;
  WalletId?: InputMaybe<Uuid_Comparison_Exp>;
  _and?: InputMaybe<Array<AgreementRoleWallets_Bool_Exp>>;
  _not?: InputMaybe<AgreementRoleWallets_Bool_Exp>;
  _or?: InputMaybe<Array<AgreementRoleWallets_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "AgreementRoleWallets" */
export enum AgreementRoleWallets_Constraint {
  /** unique or primary key constraint on columns "id" */
  AgreementRoleWalletsPkey = 'AgreementRoleWallets_pkey'
}

/** input type for inserting data into table "AgreementRoleWallets" */
export type AgreementRoleWallets_Insert_Input = {
  AgreementRoleId?: InputMaybe<Scalars['uuid']>;
  WalletId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  role?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type AgreementRoleWallets_Max_Fields = {
  __typename?: 'AgreementRoleWallets_max_fields';
  AgreementRoleId?: Maybe<Scalars['uuid']>;
  WalletId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  role?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type AgreementRoleWallets_Min_Fields = {
  __typename?: 'AgreementRoleWallets_min_fields';
  AgreementRoleId?: Maybe<Scalars['uuid']>;
  WalletId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  role?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "AgreementRoleWallets" */
export type AgreementRoleWallets_Mutation_Response = {
  __typename?: 'AgreementRoleWallets_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AgreementRoleWallets>;
};

/** on_conflict condition type for table "AgreementRoleWallets" */
export type AgreementRoleWallets_On_Conflict = {
  constraint: AgreementRoleWallets_Constraint;
  update_columns?: Array<AgreementRoleWallets_Update_Column>;
  where?: InputMaybe<AgreementRoleWallets_Bool_Exp>;
};

/** Ordering options when selecting data from "AgreementRoleWallets". */
export type AgreementRoleWallets_Order_By = {
  AgreementRoleId?: InputMaybe<Order_By>;
  WalletId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: AgreementRoleWallets */
export type AgreementRoleWallets_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "AgreementRoleWallets" */
export enum AgreementRoleWallets_Select_Column {
  /** column name */
  AgreementRoleId = 'AgreementRoleId',
  /** column name */
  WalletId = 'WalletId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "AgreementRoleWallets" */
export type AgreementRoleWallets_Set_Input = {
  AgreementRoleId?: InputMaybe<Scalars['uuid']>;
  WalletId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  role?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "AgreementRoleWallets" */
export type AgreementRoleWallets_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AgreementRoleWallets_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AgreementRoleWallets_Stream_Cursor_Value_Input = {
  AgreementRoleId?: InputMaybe<Scalars['uuid']>;
  WalletId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  role?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "AgreementRoleWallets" */
export enum AgreementRoleWallets_Update_Column {
  /** column name */
  AgreementRoleId = 'AgreementRoleId',
  /** column name */
  WalletId = 'WalletId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type AgreementRoleWallets_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AgreementRoleWallets_Set_Input>;
  where: AgreementRoleWallets_Bool_Exp;
};

/** columns and relationships of "AgreementRoles" */
export type AgreementRoles = {
  __typename?: 'AgreementRoles';
  /** An object relationship */
  Agreement?: Maybe<Agreements>;
  /** An object relationship */
  AgreementExtension?: Maybe<AgreementExtensions>;
  AgreementId?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  AgreementRoleExtensions: Array<AgreementRoleExtensions>;
  /** An aggregate relationship */
  AgreementRoleExtensions_aggregate: AgreementRoleExtensions_Aggregate;
  /** An array relationship */
  AgreementRoleTokens: Array<AgreementRoleTokens>;
  /** An aggregate relationship */
  AgreementRoleTokens_aggregate: AgreementRoleTokens_Aggregate;
  OwnerId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  Transaction?: Maybe<Transactions>;
  TransactionId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  Wallet?: Maybe<Wallets>;
  address: Scalars['String'];
  adminContractAddress?: Maybe<Scalars['String']>;
  chainId: Scalars['Int'];
  contractURI: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  ens?: Maybe<Scalars['String']>;
  ensFetchedAt?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  isAdminRole: Scalars['Boolean'];
  isTransferrable: Scalars['Boolean'];
  maxSupply: Scalars['String'];
  metadata: Scalars['jsonb'];
  mintPermissions: Scalars['jsonb'];
  name: Scalars['String'];
  ownerFetchedAt?: Maybe<Scalars['timestamptz']>;
  slug: Scalars['String'];
  splits: Scalars['jsonb'];
  symbol: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "AgreementRoles" */
export type AgreementRolesAgreementRoleExtensionsArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleExtensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleExtensions_Order_By>>;
  where?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
};


/** columns and relationships of "AgreementRoles" */
export type AgreementRolesAgreementRoleExtensions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleExtensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleExtensions_Order_By>>;
  where?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
};


/** columns and relationships of "AgreementRoles" */
export type AgreementRolesAgreementRoleTokensArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleTokens_Order_By>>;
  where?: InputMaybe<AgreementRoleTokens_Bool_Exp>;
};


/** columns and relationships of "AgreementRoles" */
export type AgreementRolesAgreementRoleTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleTokens_Order_By>>;
  where?: InputMaybe<AgreementRoleTokens_Bool_Exp>;
};


/** columns and relationships of "AgreementRoles" */
export type AgreementRolesMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "AgreementRoles" */
export type AgreementRolesMintPermissionsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "AgreementRoles" */
export type AgreementRolesSplitsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "AgreementRoles" */
export type AgreementRoles_Aggregate = {
  __typename?: 'AgreementRoles_aggregate';
  aggregate?: Maybe<AgreementRoles_Aggregate_Fields>;
  nodes: Array<AgreementRoles>;
};

export type AgreementRoles_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<AgreementRoles_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<AgreementRoles_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<AgreementRoles_Aggregate_Bool_Exp_Count>;
};

export type AgreementRoles_Aggregate_Bool_Exp_Bool_And = {
  arguments: AgreementRoles_Select_Column_AgreementRoles_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AgreementRoles_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type AgreementRoles_Aggregate_Bool_Exp_Bool_Or = {
  arguments: AgreementRoles_Select_Column_AgreementRoles_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AgreementRoles_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type AgreementRoles_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<AgreementRoles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AgreementRoles_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "AgreementRoles" */
export type AgreementRoles_Aggregate_Fields = {
  __typename?: 'AgreementRoles_aggregate_fields';
  avg?: Maybe<AgreementRoles_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<AgreementRoles_Max_Fields>;
  min?: Maybe<AgreementRoles_Min_Fields>;
  stddev?: Maybe<AgreementRoles_Stddev_Fields>;
  stddev_pop?: Maybe<AgreementRoles_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<AgreementRoles_Stddev_Samp_Fields>;
  sum?: Maybe<AgreementRoles_Sum_Fields>;
  var_pop?: Maybe<AgreementRoles_Var_Pop_Fields>;
  var_samp?: Maybe<AgreementRoles_Var_Samp_Fields>;
  variance?: Maybe<AgreementRoles_Variance_Fields>;
};


/** aggregate fields of "AgreementRoles" */
export type AgreementRoles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AgreementRoles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "AgreementRoles" */
export type AgreementRoles_Aggregate_Order_By = {
  avg?: InputMaybe<AgreementRoles_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AgreementRoles_Max_Order_By>;
  min?: InputMaybe<AgreementRoles_Min_Order_By>;
  stddev?: InputMaybe<AgreementRoles_Stddev_Order_By>;
  stddev_pop?: InputMaybe<AgreementRoles_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<AgreementRoles_Stddev_Samp_Order_By>;
  sum?: InputMaybe<AgreementRoles_Sum_Order_By>;
  var_pop?: InputMaybe<AgreementRoles_Var_Pop_Order_By>;
  var_samp?: InputMaybe<AgreementRoles_Var_Samp_Order_By>;
  variance?: InputMaybe<AgreementRoles_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type AgreementRoles_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
  mintPermissions?: InputMaybe<Scalars['jsonb']>;
  splits?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "AgreementRoles" */
export type AgreementRoles_Arr_Rel_Insert_Input = {
  data: Array<AgreementRoles_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<AgreementRoles_On_Conflict>;
};

/** aggregate avg on columns */
export type AgreementRoles_Avg_Fields = {
  __typename?: 'AgreementRoles_avg_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "AgreementRoles" */
export type AgreementRoles_Avg_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "AgreementRoles". All fields are combined with a logical 'AND'. */
export type AgreementRoles_Bool_Exp = {
  Agreement?: InputMaybe<Agreements_Bool_Exp>;
  AgreementExtension?: InputMaybe<AgreementExtensions_Bool_Exp>;
  AgreementId?: InputMaybe<Uuid_Comparison_Exp>;
  AgreementRoleExtensions?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
  AgreementRoleExtensions_aggregate?: InputMaybe<AgreementRoleExtensions_Aggregate_Bool_Exp>;
  AgreementRoleTokens?: InputMaybe<AgreementRoleTokens_Bool_Exp>;
  AgreementRoleTokens_aggregate?: InputMaybe<AgreementRoleTokens_Aggregate_Bool_Exp>;
  OwnerId?: InputMaybe<Uuid_Comparison_Exp>;
  Transaction?: InputMaybe<Transactions_Bool_Exp>;
  TransactionId?: InputMaybe<Uuid_Comparison_Exp>;
  Wallet?: InputMaybe<Wallets_Bool_Exp>;
  _and?: InputMaybe<Array<AgreementRoles_Bool_Exp>>;
  _not?: InputMaybe<AgreementRoles_Bool_Exp>;
  _or?: InputMaybe<Array<AgreementRoles_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  adminContractAddress?: InputMaybe<String_Comparison_Exp>;
  chainId?: InputMaybe<Int_Comparison_Exp>;
  contractURI?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  ens?: InputMaybe<String_Comparison_Exp>;
  ensFetchedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isAdminRole?: InputMaybe<Boolean_Comparison_Exp>;
  isTransferrable?: InputMaybe<Boolean_Comparison_Exp>;
  maxSupply?: InputMaybe<String_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  mintPermissions?: InputMaybe<Jsonb_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ownerFetchedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  splits?: InputMaybe<Jsonb_Comparison_Exp>;
  symbol?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "AgreementRoles" */
export enum AgreementRoles_Constraint {
  /** unique or primary key constraint on columns "id" */
  AgreementRolesPkey = 'AgreementRoles_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type AgreementRoles_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']>>;
  mintPermissions?: InputMaybe<Array<Scalars['String']>>;
  splits?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type AgreementRoles_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']>;
  mintPermissions?: InputMaybe<Scalars['Int']>;
  splits?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type AgreementRoles_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']>;
  mintPermissions?: InputMaybe<Scalars['String']>;
  splits?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "AgreementRoles" */
export type AgreementRoles_Inc_Input = {
  chainId?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "AgreementRoles" */
export type AgreementRoles_Insert_Input = {
  Agreement?: InputMaybe<Agreements_Obj_Rel_Insert_Input>;
  AgreementExtension?: InputMaybe<AgreementExtensions_Obj_Rel_Insert_Input>;
  AgreementId?: InputMaybe<Scalars['uuid']>;
  AgreementRoleExtensions?: InputMaybe<AgreementRoleExtensions_Arr_Rel_Insert_Input>;
  AgreementRoleTokens?: InputMaybe<AgreementRoleTokens_Arr_Rel_Insert_Input>;
  OwnerId?: InputMaybe<Scalars['uuid']>;
  Transaction?: InputMaybe<Transactions_Obj_Rel_Insert_Input>;
  TransactionId?: InputMaybe<Scalars['uuid']>;
  Wallet?: InputMaybe<Wallets_Obj_Rel_Insert_Input>;
  address?: InputMaybe<Scalars['String']>;
  adminContractAddress?: InputMaybe<Scalars['String']>;
  chainId?: InputMaybe<Scalars['Int']>;
  contractURI?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  ens?: InputMaybe<Scalars['String']>;
  ensFetchedAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  isAdminRole?: InputMaybe<Scalars['Boolean']>;
  isTransferrable?: InputMaybe<Scalars['Boolean']>;
  maxSupply?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  mintPermissions?: InputMaybe<Scalars['jsonb']>;
  name?: InputMaybe<Scalars['String']>;
  ownerFetchedAt?: InputMaybe<Scalars['timestamptz']>;
  slug?: InputMaybe<Scalars['String']>;
  splits?: InputMaybe<Scalars['jsonb']>;
  symbol?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type AgreementRoles_Max_Fields = {
  __typename?: 'AgreementRoles_max_fields';
  AgreementId?: Maybe<Scalars['uuid']>;
  OwnerId?: Maybe<Scalars['uuid']>;
  TransactionId?: Maybe<Scalars['uuid']>;
  address?: Maybe<Scalars['String']>;
  adminContractAddress?: Maybe<Scalars['String']>;
  chainId?: Maybe<Scalars['Int']>;
  contractURI?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  ens?: Maybe<Scalars['String']>;
  ensFetchedAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  maxSupply?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ownerFetchedAt?: Maybe<Scalars['timestamptz']>;
  slug?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "AgreementRoles" */
export type AgreementRoles_Max_Order_By = {
  AgreementId?: InputMaybe<Order_By>;
  OwnerId?: InputMaybe<Order_By>;
  TransactionId?: InputMaybe<Order_By>;
  address?: InputMaybe<Order_By>;
  adminContractAddress?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  contractURI?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  ens?: InputMaybe<Order_By>;
  ensFetchedAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maxSupply?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  ownerFetchedAt?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  symbol?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AgreementRoles_Min_Fields = {
  __typename?: 'AgreementRoles_min_fields';
  AgreementId?: Maybe<Scalars['uuid']>;
  OwnerId?: Maybe<Scalars['uuid']>;
  TransactionId?: Maybe<Scalars['uuid']>;
  address?: Maybe<Scalars['String']>;
  adminContractAddress?: Maybe<Scalars['String']>;
  chainId?: Maybe<Scalars['Int']>;
  contractURI?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  ens?: Maybe<Scalars['String']>;
  ensFetchedAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  maxSupply?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ownerFetchedAt?: Maybe<Scalars['timestamptz']>;
  slug?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "AgreementRoles" */
export type AgreementRoles_Min_Order_By = {
  AgreementId?: InputMaybe<Order_By>;
  OwnerId?: InputMaybe<Order_By>;
  TransactionId?: InputMaybe<Order_By>;
  address?: InputMaybe<Order_By>;
  adminContractAddress?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  contractURI?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  ens?: InputMaybe<Order_By>;
  ensFetchedAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maxSupply?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  ownerFetchedAt?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  symbol?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "AgreementRoles" */
export type AgreementRoles_Mutation_Response = {
  __typename?: 'AgreementRoles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AgreementRoles>;
};

/** input type for inserting object relation for remote table "AgreementRoles" */
export type AgreementRoles_Obj_Rel_Insert_Input = {
  data: AgreementRoles_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<AgreementRoles_On_Conflict>;
};

/** on_conflict condition type for table "AgreementRoles" */
export type AgreementRoles_On_Conflict = {
  constraint: AgreementRoles_Constraint;
  update_columns?: Array<AgreementRoles_Update_Column>;
  where?: InputMaybe<AgreementRoles_Bool_Exp>;
};

/** Ordering options when selecting data from "AgreementRoles". */
export type AgreementRoles_Order_By = {
  Agreement?: InputMaybe<Agreements_Order_By>;
  AgreementExtension?: InputMaybe<AgreementExtensions_Order_By>;
  AgreementId?: InputMaybe<Order_By>;
  AgreementRoleExtensions_aggregate?: InputMaybe<AgreementRoleExtensions_Aggregate_Order_By>;
  AgreementRoleTokens_aggregate?: InputMaybe<AgreementRoleTokens_Aggregate_Order_By>;
  OwnerId?: InputMaybe<Order_By>;
  Transaction?: InputMaybe<Transactions_Order_By>;
  TransactionId?: InputMaybe<Order_By>;
  Wallet?: InputMaybe<Wallets_Order_By>;
  address?: InputMaybe<Order_By>;
  adminContractAddress?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  contractURI?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  ens?: InputMaybe<Order_By>;
  ensFetchedAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isAdminRole?: InputMaybe<Order_By>;
  isTransferrable?: InputMaybe<Order_By>;
  maxSupply?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  mintPermissions?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  ownerFetchedAt?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  splits?: InputMaybe<Order_By>;
  symbol?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: AgreementRoles */
export type AgreementRoles_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type AgreementRoles_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
  mintPermissions?: InputMaybe<Scalars['jsonb']>;
  splits?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "AgreementRoles" */
export enum AgreementRoles_Select_Column {
  /** column name */
  AgreementId = 'AgreementId',
  /** column name */
  OwnerId = 'OwnerId',
  /** column name */
  TransactionId = 'TransactionId',
  /** column name */
  Address = 'address',
  /** column name */
  AdminContractAddress = 'adminContractAddress',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  ContractUri = 'contractURI',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Ens = 'ens',
  /** column name */
  EnsFetchedAt = 'ensFetchedAt',
  /** column name */
  Id = 'id',
  /** column name */
  IsAdminRole = 'isAdminRole',
  /** column name */
  IsTransferrable = 'isTransferrable',
  /** column name */
  MaxSupply = 'maxSupply',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  MintPermissions = 'mintPermissions',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerFetchedAt = 'ownerFetchedAt',
  /** column name */
  Slug = 'slug',
  /** column name */
  Splits = 'splits',
  /** column name */
  Symbol = 'symbol',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** select "AgreementRoles_aggregate_bool_exp_bool_and_arguments_columns" columns of table "AgreementRoles" */
export enum AgreementRoles_Select_Column_AgreementRoles_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsAdminRole = 'isAdminRole',
  /** column name */
  IsTransferrable = 'isTransferrable'
}

/** select "AgreementRoles_aggregate_bool_exp_bool_or_arguments_columns" columns of table "AgreementRoles" */
export enum AgreementRoles_Select_Column_AgreementRoles_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsAdminRole = 'isAdminRole',
  /** column name */
  IsTransferrable = 'isTransferrable'
}

/** input type for updating data in table "AgreementRoles" */
export type AgreementRoles_Set_Input = {
  AgreementId?: InputMaybe<Scalars['uuid']>;
  OwnerId?: InputMaybe<Scalars['uuid']>;
  TransactionId?: InputMaybe<Scalars['uuid']>;
  address?: InputMaybe<Scalars['String']>;
  adminContractAddress?: InputMaybe<Scalars['String']>;
  chainId?: InputMaybe<Scalars['Int']>;
  contractURI?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  ens?: InputMaybe<Scalars['String']>;
  ensFetchedAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  isAdminRole?: InputMaybe<Scalars['Boolean']>;
  isTransferrable?: InputMaybe<Scalars['Boolean']>;
  maxSupply?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  mintPermissions?: InputMaybe<Scalars['jsonb']>;
  name?: InputMaybe<Scalars['String']>;
  ownerFetchedAt?: InputMaybe<Scalars['timestamptz']>;
  slug?: InputMaybe<Scalars['String']>;
  splits?: InputMaybe<Scalars['jsonb']>;
  symbol?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type AgreementRoles_Stddev_Fields = {
  __typename?: 'AgreementRoles_stddev_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "AgreementRoles" */
export type AgreementRoles_Stddev_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type AgreementRoles_Stddev_Pop_Fields = {
  __typename?: 'AgreementRoles_stddev_pop_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "AgreementRoles" */
export type AgreementRoles_Stddev_Pop_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type AgreementRoles_Stddev_Samp_Fields = {
  __typename?: 'AgreementRoles_stddev_samp_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "AgreementRoles" */
export type AgreementRoles_Stddev_Samp_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "AgreementRoles" */
export type AgreementRoles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AgreementRoles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AgreementRoles_Stream_Cursor_Value_Input = {
  AgreementId?: InputMaybe<Scalars['uuid']>;
  OwnerId?: InputMaybe<Scalars['uuid']>;
  TransactionId?: InputMaybe<Scalars['uuid']>;
  address?: InputMaybe<Scalars['String']>;
  adminContractAddress?: InputMaybe<Scalars['String']>;
  chainId?: InputMaybe<Scalars['Int']>;
  contractURI?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  ens?: InputMaybe<Scalars['String']>;
  ensFetchedAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  isAdminRole?: InputMaybe<Scalars['Boolean']>;
  isTransferrable?: InputMaybe<Scalars['Boolean']>;
  maxSupply?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  mintPermissions?: InputMaybe<Scalars['jsonb']>;
  name?: InputMaybe<Scalars['String']>;
  ownerFetchedAt?: InputMaybe<Scalars['timestamptz']>;
  slug?: InputMaybe<Scalars['String']>;
  splits?: InputMaybe<Scalars['jsonb']>;
  symbol?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type AgreementRoles_Sum_Fields = {
  __typename?: 'AgreementRoles_sum_fields';
  chainId?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "AgreementRoles" */
export type AgreementRoles_Sum_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** update columns of table "AgreementRoles" */
export enum AgreementRoles_Update_Column {
  /** column name */
  AgreementId = 'AgreementId',
  /** column name */
  OwnerId = 'OwnerId',
  /** column name */
  TransactionId = 'TransactionId',
  /** column name */
  Address = 'address',
  /** column name */
  AdminContractAddress = 'adminContractAddress',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  ContractUri = 'contractURI',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Ens = 'ens',
  /** column name */
  EnsFetchedAt = 'ensFetchedAt',
  /** column name */
  Id = 'id',
  /** column name */
  IsAdminRole = 'isAdminRole',
  /** column name */
  IsTransferrable = 'isTransferrable',
  /** column name */
  MaxSupply = 'maxSupply',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  MintPermissions = 'mintPermissions',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerFetchedAt = 'ownerFetchedAt',
  /** column name */
  Slug = 'slug',
  /** column name */
  Splits = 'splits',
  /** column name */
  Symbol = 'symbol',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type AgreementRoles_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<AgreementRoles_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<AgreementRoles_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<AgreementRoles_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<AgreementRoles_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<AgreementRoles_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<AgreementRoles_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AgreementRoles_Set_Input>;
  where: AgreementRoles_Bool_Exp;
};

/** aggregate var_pop on columns */
export type AgreementRoles_Var_Pop_Fields = {
  __typename?: 'AgreementRoles_var_pop_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "AgreementRoles" */
export type AgreementRoles_Var_Pop_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type AgreementRoles_Var_Samp_Fields = {
  __typename?: 'AgreementRoles_var_samp_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "AgreementRoles" */
export type AgreementRoles_Var_Samp_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type AgreementRoles_Variance_Fields = {
  __typename?: 'AgreementRoles_variance_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "AgreementRoles" */
export type AgreementRoles_Variance_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** columns and relationships of "AgreementTokenTransfers" */
export type AgreementTokenTransfers = {
  __typename?: 'AgreementTokenTransfers';
  /** An object relationship */
  AgreementToken?: Maybe<AgreementTokens>;
  AgreementTokenId?: Maybe<Scalars['uuid']>;
  createdAt: Scalars['timestamptz'];
  from: Scalars['String'];
  id: Scalars['uuid'];
  to: Scalars['String'];
  transactionHash: Scalars['String'];
  transferredAt: Scalars['timestamptz'];
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "AgreementTokenTransfers" */
export type AgreementTokenTransfers_Aggregate = {
  __typename?: 'AgreementTokenTransfers_aggregate';
  aggregate?: Maybe<AgreementTokenTransfers_Aggregate_Fields>;
  nodes: Array<AgreementTokenTransfers>;
};

export type AgreementTokenTransfers_Aggregate_Bool_Exp = {
  count?: InputMaybe<AgreementTokenTransfers_Aggregate_Bool_Exp_Count>;
};

export type AgreementTokenTransfers_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<AgreementTokenTransfers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AgreementTokenTransfers_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "AgreementTokenTransfers" */
export type AgreementTokenTransfers_Aggregate_Fields = {
  __typename?: 'AgreementTokenTransfers_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AgreementTokenTransfers_Max_Fields>;
  min?: Maybe<AgreementTokenTransfers_Min_Fields>;
};


/** aggregate fields of "AgreementTokenTransfers" */
export type AgreementTokenTransfers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AgreementTokenTransfers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "AgreementTokenTransfers" */
export type AgreementTokenTransfers_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AgreementTokenTransfers_Max_Order_By>;
  min?: InputMaybe<AgreementTokenTransfers_Min_Order_By>;
};

/** input type for inserting array relation for remote table "AgreementTokenTransfers" */
export type AgreementTokenTransfers_Arr_Rel_Insert_Input = {
  data: Array<AgreementTokenTransfers_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<AgreementTokenTransfers_On_Conflict>;
};

/** Boolean expression to filter rows from the table "AgreementTokenTransfers". All fields are combined with a logical 'AND'. */
export type AgreementTokenTransfers_Bool_Exp = {
  AgreementToken?: InputMaybe<AgreementTokens_Bool_Exp>;
  AgreementTokenId?: InputMaybe<Uuid_Comparison_Exp>;
  _and?: InputMaybe<Array<AgreementTokenTransfers_Bool_Exp>>;
  _not?: InputMaybe<AgreementTokenTransfers_Bool_Exp>;
  _or?: InputMaybe<Array<AgreementTokenTransfers_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  from?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  to?: InputMaybe<String_Comparison_Exp>;
  transactionHash?: InputMaybe<String_Comparison_Exp>;
  transferredAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "AgreementTokenTransfers" */
export enum AgreementTokenTransfers_Constraint {
  /** unique or primary key constraint on columns "id" */
  AgreementTokenTransfersPkey = 'AgreementTokenTransfers_pkey'
}

/** input type for inserting data into table "AgreementTokenTransfers" */
export type AgreementTokenTransfers_Insert_Input = {
  AgreementToken?: InputMaybe<AgreementTokens_Obj_Rel_Insert_Input>;
  AgreementTokenId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  from?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  to?: InputMaybe<Scalars['String']>;
  transactionHash?: InputMaybe<Scalars['String']>;
  transferredAt?: InputMaybe<Scalars['timestamptz']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type AgreementTokenTransfers_Max_Fields = {
  __typename?: 'AgreementTokenTransfers_max_fields';
  AgreementTokenId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  from?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  to?: Maybe<Scalars['String']>;
  transactionHash?: Maybe<Scalars['String']>;
  transferredAt?: Maybe<Scalars['timestamptz']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "AgreementTokenTransfers" */
export type AgreementTokenTransfers_Max_Order_By = {
  AgreementTokenId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  transactionHash?: InputMaybe<Order_By>;
  transferredAt?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AgreementTokenTransfers_Min_Fields = {
  __typename?: 'AgreementTokenTransfers_min_fields';
  AgreementTokenId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  from?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  to?: Maybe<Scalars['String']>;
  transactionHash?: Maybe<Scalars['String']>;
  transferredAt?: Maybe<Scalars['timestamptz']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "AgreementTokenTransfers" */
export type AgreementTokenTransfers_Min_Order_By = {
  AgreementTokenId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  transactionHash?: InputMaybe<Order_By>;
  transferredAt?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "AgreementTokenTransfers" */
export type AgreementTokenTransfers_Mutation_Response = {
  __typename?: 'AgreementTokenTransfers_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AgreementTokenTransfers>;
};

/** on_conflict condition type for table "AgreementTokenTransfers" */
export type AgreementTokenTransfers_On_Conflict = {
  constraint: AgreementTokenTransfers_Constraint;
  update_columns?: Array<AgreementTokenTransfers_Update_Column>;
  where?: InputMaybe<AgreementTokenTransfers_Bool_Exp>;
};

/** Ordering options when selecting data from "AgreementTokenTransfers". */
export type AgreementTokenTransfers_Order_By = {
  AgreementToken?: InputMaybe<AgreementTokens_Order_By>;
  AgreementTokenId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  transactionHash?: InputMaybe<Order_By>;
  transferredAt?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: AgreementTokenTransfers */
export type AgreementTokenTransfers_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "AgreementTokenTransfers" */
export enum AgreementTokenTransfers_Select_Column {
  /** column name */
  AgreementTokenId = 'AgreementTokenId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  From = 'from',
  /** column name */
  Id = 'id',
  /** column name */
  To = 'to',
  /** column name */
  TransactionHash = 'transactionHash',
  /** column name */
  TransferredAt = 'transferredAt',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "AgreementTokenTransfers" */
export type AgreementTokenTransfers_Set_Input = {
  AgreementTokenId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  from?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  to?: InputMaybe<Scalars['String']>;
  transactionHash?: InputMaybe<Scalars['String']>;
  transferredAt?: InputMaybe<Scalars['timestamptz']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "AgreementTokenTransfers" */
export type AgreementTokenTransfers_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AgreementTokenTransfers_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AgreementTokenTransfers_Stream_Cursor_Value_Input = {
  AgreementTokenId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  from?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  to?: InputMaybe<Scalars['String']>;
  transactionHash?: InputMaybe<Scalars['String']>;
  transferredAt?: InputMaybe<Scalars['timestamptz']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "AgreementTokenTransfers" */
export enum AgreementTokenTransfers_Update_Column {
  /** column name */
  AgreementTokenId = 'AgreementTokenId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  From = 'from',
  /** column name */
  Id = 'id',
  /** column name */
  To = 'to',
  /** column name */
  TransactionHash = 'transactionHash',
  /** column name */
  TransferredAt = 'transferredAt',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type AgreementTokenTransfers_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AgreementTokenTransfers_Set_Input>;
  where: AgreementTokenTransfers_Bool_Exp;
};

/** columns and relationships of "AgreementTokens" */
export type AgreementTokens = {
  __typename?: 'AgreementTokens';
  /** An object relationship */
  Agreement?: Maybe<Agreements>;
  AgreementId?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  AgreementTokenTransfers: Array<AgreementTokenTransfers>;
  /** An aggregate relationship */
  AgreementTokenTransfers_aggregate: AgreementTokenTransfers_Aggregate;
  OwnerId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  Transaction?: Maybe<Transactions>;
  TransactionId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  Wallet?: Maybe<Wallets>;
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  metadata: Scalars['jsonb'];
  mintedAt: Scalars['timestamptz'];
  mintedBy: Scalars['String'];
  tokenId: Scalars['String'];
  tokenURI: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "AgreementTokens" */
export type AgreementTokensAgreementTokenTransfersArgs = {
  distinct_on?: InputMaybe<Array<AgreementTokenTransfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementTokenTransfers_Order_By>>;
  where?: InputMaybe<AgreementTokenTransfers_Bool_Exp>;
};


/** columns and relationships of "AgreementTokens" */
export type AgreementTokensAgreementTokenTransfers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementTokenTransfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementTokenTransfers_Order_By>>;
  where?: InputMaybe<AgreementTokenTransfers_Bool_Exp>;
};


/** columns and relationships of "AgreementTokens" */
export type AgreementTokensMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "AgreementTokens" */
export type AgreementTokens_Aggregate = {
  __typename?: 'AgreementTokens_aggregate';
  aggregate?: Maybe<AgreementTokens_Aggregate_Fields>;
  nodes: Array<AgreementTokens>;
};

export type AgreementTokens_Aggregate_Bool_Exp = {
  count?: InputMaybe<AgreementTokens_Aggregate_Bool_Exp_Count>;
};

export type AgreementTokens_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<AgreementTokens_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AgreementTokens_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "AgreementTokens" */
export type AgreementTokens_Aggregate_Fields = {
  __typename?: 'AgreementTokens_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AgreementTokens_Max_Fields>;
  min?: Maybe<AgreementTokens_Min_Fields>;
};


/** aggregate fields of "AgreementTokens" */
export type AgreementTokens_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AgreementTokens_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "AgreementTokens" */
export type AgreementTokens_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AgreementTokens_Max_Order_By>;
  min?: InputMaybe<AgreementTokens_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type AgreementTokens_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "AgreementTokens" */
export type AgreementTokens_Arr_Rel_Insert_Input = {
  data: Array<AgreementTokens_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<AgreementTokens_On_Conflict>;
};

/** Boolean expression to filter rows from the table "AgreementTokens". All fields are combined with a logical 'AND'. */
export type AgreementTokens_Bool_Exp = {
  Agreement?: InputMaybe<Agreements_Bool_Exp>;
  AgreementId?: InputMaybe<Uuid_Comparison_Exp>;
  AgreementTokenTransfers?: InputMaybe<AgreementTokenTransfers_Bool_Exp>;
  AgreementTokenTransfers_aggregate?: InputMaybe<AgreementTokenTransfers_Aggregate_Bool_Exp>;
  OwnerId?: InputMaybe<Uuid_Comparison_Exp>;
  Transaction?: InputMaybe<Transactions_Bool_Exp>;
  TransactionId?: InputMaybe<Uuid_Comparison_Exp>;
  Wallet?: InputMaybe<Wallets_Bool_Exp>;
  _and?: InputMaybe<Array<AgreementTokens_Bool_Exp>>;
  _not?: InputMaybe<AgreementTokens_Bool_Exp>;
  _or?: InputMaybe<Array<AgreementTokens_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  mintedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  mintedBy?: InputMaybe<String_Comparison_Exp>;
  tokenId?: InputMaybe<String_Comparison_Exp>;
  tokenURI?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "AgreementTokens" */
export enum AgreementTokens_Constraint {
  /** unique or primary key constraint on columns "id" */
  AgreementTokensPkey = 'AgreementTokens_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type AgreementTokens_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type AgreementTokens_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type AgreementTokens_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "AgreementTokens" */
export type AgreementTokens_Insert_Input = {
  Agreement?: InputMaybe<Agreements_Obj_Rel_Insert_Input>;
  AgreementId?: InputMaybe<Scalars['uuid']>;
  AgreementTokenTransfers?: InputMaybe<AgreementTokenTransfers_Arr_Rel_Insert_Input>;
  OwnerId?: InputMaybe<Scalars['uuid']>;
  Transaction?: InputMaybe<Transactions_Obj_Rel_Insert_Input>;
  TransactionId?: InputMaybe<Scalars['uuid']>;
  Wallet?: InputMaybe<Wallets_Obj_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  mintedAt?: InputMaybe<Scalars['timestamptz']>;
  mintedBy?: InputMaybe<Scalars['String']>;
  tokenId?: InputMaybe<Scalars['String']>;
  tokenURI?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type AgreementTokens_Max_Fields = {
  __typename?: 'AgreementTokens_max_fields';
  AgreementId?: Maybe<Scalars['uuid']>;
  OwnerId?: Maybe<Scalars['uuid']>;
  TransactionId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  mintedAt?: Maybe<Scalars['timestamptz']>;
  mintedBy?: Maybe<Scalars['String']>;
  tokenId?: Maybe<Scalars['String']>;
  tokenURI?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "AgreementTokens" */
export type AgreementTokens_Max_Order_By = {
  AgreementId?: InputMaybe<Order_By>;
  OwnerId?: InputMaybe<Order_By>;
  TransactionId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mintedAt?: InputMaybe<Order_By>;
  mintedBy?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  tokenURI?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AgreementTokens_Min_Fields = {
  __typename?: 'AgreementTokens_min_fields';
  AgreementId?: Maybe<Scalars['uuid']>;
  OwnerId?: Maybe<Scalars['uuid']>;
  TransactionId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  mintedAt?: Maybe<Scalars['timestamptz']>;
  mintedBy?: Maybe<Scalars['String']>;
  tokenId?: Maybe<Scalars['String']>;
  tokenURI?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "AgreementTokens" */
export type AgreementTokens_Min_Order_By = {
  AgreementId?: InputMaybe<Order_By>;
  OwnerId?: InputMaybe<Order_By>;
  TransactionId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  mintedAt?: InputMaybe<Order_By>;
  mintedBy?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  tokenURI?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "AgreementTokens" */
export type AgreementTokens_Mutation_Response = {
  __typename?: 'AgreementTokens_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AgreementTokens>;
};

/** input type for inserting object relation for remote table "AgreementTokens" */
export type AgreementTokens_Obj_Rel_Insert_Input = {
  data: AgreementTokens_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<AgreementTokens_On_Conflict>;
};

/** on_conflict condition type for table "AgreementTokens" */
export type AgreementTokens_On_Conflict = {
  constraint: AgreementTokens_Constraint;
  update_columns?: Array<AgreementTokens_Update_Column>;
  where?: InputMaybe<AgreementTokens_Bool_Exp>;
};

/** Ordering options when selecting data from "AgreementTokens". */
export type AgreementTokens_Order_By = {
  Agreement?: InputMaybe<Agreements_Order_By>;
  AgreementId?: InputMaybe<Order_By>;
  AgreementTokenTransfers_aggregate?: InputMaybe<AgreementTokenTransfers_Aggregate_Order_By>;
  OwnerId?: InputMaybe<Order_By>;
  Transaction?: InputMaybe<Transactions_Order_By>;
  TransactionId?: InputMaybe<Order_By>;
  Wallet?: InputMaybe<Wallets_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  mintedAt?: InputMaybe<Order_By>;
  mintedBy?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  tokenURI?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: AgreementTokens */
export type AgreementTokens_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type AgreementTokens_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "AgreementTokens" */
export enum AgreementTokens_Select_Column {
  /** column name */
  AgreementId = 'AgreementId',
  /** column name */
  OwnerId = 'OwnerId',
  /** column name */
  TransactionId = 'TransactionId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  MintedAt = 'mintedAt',
  /** column name */
  MintedBy = 'mintedBy',
  /** column name */
  TokenId = 'tokenId',
  /** column name */
  TokenUri = 'tokenURI',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "AgreementTokens" */
export type AgreementTokens_Set_Input = {
  AgreementId?: InputMaybe<Scalars['uuid']>;
  OwnerId?: InputMaybe<Scalars['uuid']>;
  TransactionId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  mintedAt?: InputMaybe<Scalars['timestamptz']>;
  mintedBy?: InputMaybe<Scalars['String']>;
  tokenId?: InputMaybe<Scalars['String']>;
  tokenURI?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "AgreementTokens" */
export type AgreementTokens_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AgreementTokens_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AgreementTokens_Stream_Cursor_Value_Input = {
  AgreementId?: InputMaybe<Scalars['uuid']>;
  OwnerId?: InputMaybe<Scalars['uuid']>;
  TransactionId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  mintedAt?: InputMaybe<Scalars['timestamptz']>;
  mintedBy?: InputMaybe<Scalars['String']>;
  tokenId?: InputMaybe<Scalars['String']>;
  tokenURI?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "AgreementTokens" */
export enum AgreementTokens_Update_Column {
  /** column name */
  AgreementId = 'AgreementId',
  /** column name */
  OwnerId = 'OwnerId',
  /** column name */
  TransactionId = 'TransactionId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  MintedAt = 'mintedAt',
  /** column name */
  MintedBy = 'mintedBy',
  /** column name */
  TokenId = 'tokenId',
  /** column name */
  TokenUri = 'tokenURI',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type AgreementTokens_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<AgreementTokens_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<AgreementTokens_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<AgreementTokens_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<AgreementTokens_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<AgreementTokens_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AgreementTokens_Set_Input>;
  where: AgreementTokens_Bool_Exp;
};

/** columns and relationships of "AgreementWallets" */
export type AgreementWallets = {
  __typename?: 'AgreementWallets';
  /** An object relationship */
  Agreement?: Maybe<Agreements>;
  AgreementId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  Wallet?: Maybe<Wallets>;
  WalletId?: Maybe<Scalars['uuid']>;
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  role: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "AgreementWallets" */
export type AgreementWallets_Aggregate = {
  __typename?: 'AgreementWallets_aggregate';
  aggregate?: Maybe<AgreementWallets_Aggregate_Fields>;
  nodes: Array<AgreementWallets>;
};

export type AgreementWallets_Aggregate_Bool_Exp = {
  count?: InputMaybe<AgreementWallets_Aggregate_Bool_Exp_Count>;
};

export type AgreementWallets_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<AgreementWallets_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<AgreementWallets_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "AgreementWallets" */
export type AgreementWallets_Aggregate_Fields = {
  __typename?: 'AgreementWallets_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<AgreementWallets_Max_Fields>;
  min?: Maybe<AgreementWallets_Min_Fields>;
};


/** aggregate fields of "AgreementWallets" */
export type AgreementWallets_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AgreementWallets_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "AgreementWallets" */
export type AgreementWallets_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AgreementWallets_Max_Order_By>;
  min?: InputMaybe<AgreementWallets_Min_Order_By>;
};

/** input type for inserting array relation for remote table "AgreementWallets" */
export type AgreementWallets_Arr_Rel_Insert_Input = {
  data: Array<AgreementWallets_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<AgreementWallets_On_Conflict>;
};

/** Boolean expression to filter rows from the table "AgreementWallets". All fields are combined with a logical 'AND'. */
export type AgreementWallets_Bool_Exp = {
  Agreement?: InputMaybe<Agreements_Bool_Exp>;
  AgreementId?: InputMaybe<Uuid_Comparison_Exp>;
  Wallet?: InputMaybe<Wallets_Bool_Exp>;
  WalletId?: InputMaybe<Uuid_Comparison_Exp>;
  _and?: InputMaybe<Array<AgreementWallets_Bool_Exp>>;
  _not?: InputMaybe<AgreementWallets_Bool_Exp>;
  _or?: InputMaybe<Array<AgreementWallets_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "AgreementWallets" */
export enum AgreementWallets_Constraint {
  /** unique or primary key constraint on columns "AgreementId", "WalletId" */
  AgreementWalletsAgreementIdWalletIdKey = 'AgreementWallets_AgreementId_WalletId_key',
  /** unique or primary key constraint on columns "id" */
  AgreementWalletsPkey = 'AgreementWallets_pkey'
}

/** input type for inserting data into table "AgreementWallets" */
export type AgreementWallets_Insert_Input = {
  Agreement?: InputMaybe<Agreements_Obj_Rel_Insert_Input>;
  AgreementId?: InputMaybe<Scalars['uuid']>;
  Wallet?: InputMaybe<Wallets_Obj_Rel_Insert_Input>;
  WalletId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  role?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type AgreementWallets_Max_Fields = {
  __typename?: 'AgreementWallets_max_fields';
  AgreementId?: Maybe<Scalars['uuid']>;
  WalletId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  role?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "AgreementWallets" */
export type AgreementWallets_Max_Order_By = {
  AgreementId?: InputMaybe<Order_By>;
  WalletId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AgreementWallets_Min_Fields = {
  __typename?: 'AgreementWallets_min_fields';
  AgreementId?: Maybe<Scalars['uuid']>;
  WalletId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  role?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "AgreementWallets" */
export type AgreementWallets_Min_Order_By = {
  AgreementId?: InputMaybe<Order_By>;
  WalletId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "AgreementWallets" */
export type AgreementWallets_Mutation_Response = {
  __typename?: 'AgreementWallets_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AgreementWallets>;
};

/** on_conflict condition type for table "AgreementWallets" */
export type AgreementWallets_On_Conflict = {
  constraint: AgreementWallets_Constraint;
  update_columns?: Array<AgreementWallets_Update_Column>;
  where?: InputMaybe<AgreementWallets_Bool_Exp>;
};

/** Ordering options when selecting data from "AgreementWallets". */
export type AgreementWallets_Order_By = {
  Agreement?: InputMaybe<Agreements_Order_By>;
  AgreementId?: InputMaybe<Order_By>;
  Wallet?: InputMaybe<Wallets_Order_By>;
  WalletId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: AgreementWallets */
export type AgreementWallets_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "AgreementWallets" */
export enum AgreementWallets_Select_Column {
  /** column name */
  AgreementId = 'AgreementId',
  /** column name */
  WalletId = 'WalletId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "AgreementWallets" */
export type AgreementWallets_Set_Input = {
  AgreementId?: InputMaybe<Scalars['uuid']>;
  WalletId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  role?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "AgreementWallets" */
export type AgreementWallets_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: AgreementWallets_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type AgreementWallets_Stream_Cursor_Value_Input = {
  AgreementId?: InputMaybe<Scalars['uuid']>;
  WalletId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  role?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "AgreementWallets" */
export enum AgreementWallets_Update_Column {
  /** column name */
  AgreementId = 'AgreementId',
  /** column name */
  WalletId = 'WalletId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type AgreementWallets_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AgreementWallets_Set_Input>;
  where: AgreementWallets_Bool_Exp;
};

/** columns and relationships of "Agreements" */
export type Agreements = {
  __typename?: 'Agreements';
  /** An array relationship */
  AgreementExtensions: Array<AgreementExtensions>;
  /** An aggregate relationship */
  AgreementExtensions_aggregate: AgreementExtensions_Aggregate;
  /** An array relationship */
  AgreementRoleExtensions: Array<AgreementRoleExtensions>;
  /** An aggregate relationship */
  AgreementRoleExtensions_aggregate: AgreementRoleExtensions_Aggregate;
  /** An array relationship */
  AgreementRoleTokens: Array<AgreementRoleTokens>;
  /** An aggregate relationship */
  AgreementRoleTokens_aggregate: AgreementRoleTokens_Aggregate;
  /** An array relationship */
  AgreementRoles: Array<AgreementRoles>;
  /** An aggregate relationship */
  AgreementRoles_aggregate: AgreementRoles_Aggregate;
  /** An array relationship */
  AgreementTokens: Array<AgreementTokens>;
  /** An aggregate relationship */
  AgreementTokens_aggregate: AgreementTokens_Aggregate;
  /** An array relationship */
  AgreementWallets: Array<AgreementWallets>;
  /** An aggregate relationship */
  AgreementWallets_aggregate: AgreementWallets_Aggregate;
  OwnerId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  Transaction?: Maybe<Transactions>;
  TransactionId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  Wallet?: Maybe<Wallets>;
  address: Scalars['String'];
  adminContractAddress?: Maybe<Scalars['String']>;
  chainId: Scalars['Int'];
  contractURI: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  ens?: Maybe<Scalars['String']>;
  ensFetchedAt?: Maybe<Scalars['timestamptz']>;
  gnosisSafeAddress?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  isTransferrable: Scalars['Boolean'];
  maxSupply: Scalars['String'];
  metadata: Scalars['jsonb'];
  mintPermissions: Scalars['jsonb'];
  name: Scalars['String'];
  ownerFetchedAt?: Maybe<Scalars['timestamptz']>;
  slug: Scalars['String'];
  splits: Scalars['jsonb'];
  symbol: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "Agreements" */
export type AgreementsAgreementExtensionsArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensions_Order_By>>;
  where?: InputMaybe<AgreementExtensions_Bool_Exp>;
};


/** columns and relationships of "Agreements" */
export type AgreementsAgreementExtensions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensions_Order_By>>;
  where?: InputMaybe<AgreementExtensions_Bool_Exp>;
};


/** columns and relationships of "Agreements" */
export type AgreementsAgreementRoleExtensionsArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleExtensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleExtensions_Order_By>>;
  where?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
};


/** columns and relationships of "Agreements" */
export type AgreementsAgreementRoleExtensions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleExtensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleExtensions_Order_By>>;
  where?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
};


/** columns and relationships of "Agreements" */
export type AgreementsAgreementRoleTokensArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleTokens_Order_By>>;
  where?: InputMaybe<AgreementRoleTokens_Bool_Exp>;
};


/** columns and relationships of "Agreements" */
export type AgreementsAgreementRoleTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleTokens_Order_By>>;
  where?: InputMaybe<AgreementRoleTokens_Bool_Exp>;
};


/** columns and relationships of "Agreements" */
export type AgreementsAgreementRolesArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoles_Order_By>>;
  where?: InputMaybe<AgreementRoles_Bool_Exp>;
};


/** columns and relationships of "Agreements" */
export type AgreementsAgreementRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoles_Order_By>>;
  where?: InputMaybe<AgreementRoles_Bool_Exp>;
};


/** columns and relationships of "Agreements" */
export type AgreementsAgreementTokensArgs = {
  distinct_on?: InputMaybe<Array<AgreementTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementTokens_Order_By>>;
  where?: InputMaybe<AgreementTokens_Bool_Exp>;
};


/** columns and relationships of "Agreements" */
export type AgreementsAgreementTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementTokens_Order_By>>;
  where?: InputMaybe<AgreementTokens_Bool_Exp>;
};


/** columns and relationships of "Agreements" */
export type AgreementsAgreementWalletsArgs = {
  distinct_on?: InputMaybe<Array<AgreementWallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementWallets_Order_By>>;
  where?: InputMaybe<AgreementWallets_Bool_Exp>;
};


/** columns and relationships of "Agreements" */
export type AgreementsAgreementWallets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementWallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementWallets_Order_By>>;
  where?: InputMaybe<AgreementWallets_Bool_Exp>;
};


/** columns and relationships of "Agreements" */
export type AgreementsMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "Agreements" */
export type AgreementsMintPermissionsArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "Agreements" */
export type AgreementsSplitsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "Agreements" */
export type Agreements_Aggregate = {
  __typename?: 'Agreements_aggregate';
  aggregate?: Maybe<Agreements_Aggregate_Fields>;
  nodes: Array<Agreements>;
};

export type Agreements_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Agreements_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Agreements_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Agreements_Aggregate_Bool_Exp_Count>;
};

export type Agreements_Aggregate_Bool_Exp_Bool_And = {
  arguments: Agreements_Select_Column_Agreements_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Agreements_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Agreements_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Agreements_Select_Column_Agreements_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Agreements_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Agreements_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Agreements_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Agreements_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "Agreements" */
export type Agreements_Aggregate_Fields = {
  __typename?: 'Agreements_aggregate_fields';
  avg?: Maybe<Agreements_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Agreements_Max_Fields>;
  min?: Maybe<Agreements_Min_Fields>;
  stddev?: Maybe<Agreements_Stddev_Fields>;
  stddev_pop?: Maybe<Agreements_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Agreements_Stddev_Samp_Fields>;
  sum?: Maybe<Agreements_Sum_Fields>;
  var_pop?: Maybe<Agreements_Var_Pop_Fields>;
  var_samp?: Maybe<Agreements_Var_Samp_Fields>;
  variance?: Maybe<Agreements_Variance_Fields>;
};


/** aggregate fields of "Agreements" */
export type Agreements_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Agreements_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Agreements" */
export type Agreements_Aggregate_Order_By = {
  avg?: InputMaybe<Agreements_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Agreements_Max_Order_By>;
  min?: InputMaybe<Agreements_Min_Order_By>;
  stddev?: InputMaybe<Agreements_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Agreements_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Agreements_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Agreements_Sum_Order_By>;
  var_pop?: InputMaybe<Agreements_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Agreements_Var_Samp_Order_By>;
  variance?: InputMaybe<Agreements_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Agreements_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
  mintPermissions?: InputMaybe<Scalars['jsonb']>;
  splits?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "Agreements" */
export type Agreements_Arr_Rel_Insert_Input = {
  data: Array<Agreements_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Agreements_On_Conflict>;
};

/** aggregate avg on columns */
export type Agreements_Avg_Fields = {
  __typename?: 'Agreements_avg_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "Agreements" */
export type Agreements_Avg_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Agreements". All fields are combined with a logical 'AND'. */
export type Agreements_Bool_Exp = {
  AgreementExtensions?: InputMaybe<AgreementExtensions_Bool_Exp>;
  AgreementExtensions_aggregate?: InputMaybe<AgreementExtensions_Aggregate_Bool_Exp>;
  AgreementRoleExtensions?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
  AgreementRoleExtensions_aggregate?: InputMaybe<AgreementRoleExtensions_Aggregate_Bool_Exp>;
  AgreementRoleTokens?: InputMaybe<AgreementRoleTokens_Bool_Exp>;
  AgreementRoleTokens_aggregate?: InputMaybe<AgreementRoleTokens_Aggregate_Bool_Exp>;
  AgreementRoles?: InputMaybe<AgreementRoles_Bool_Exp>;
  AgreementRoles_aggregate?: InputMaybe<AgreementRoles_Aggregate_Bool_Exp>;
  AgreementTokens?: InputMaybe<AgreementTokens_Bool_Exp>;
  AgreementTokens_aggregate?: InputMaybe<AgreementTokens_Aggregate_Bool_Exp>;
  AgreementWallets?: InputMaybe<AgreementWallets_Bool_Exp>;
  AgreementWallets_aggregate?: InputMaybe<AgreementWallets_Aggregate_Bool_Exp>;
  OwnerId?: InputMaybe<Uuid_Comparison_Exp>;
  Transaction?: InputMaybe<Transactions_Bool_Exp>;
  TransactionId?: InputMaybe<Uuid_Comparison_Exp>;
  Wallet?: InputMaybe<Wallets_Bool_Exp>;
  _and?: InputMaybe<Array<Agreements_Bool_Exp>>;
  _not?: InputMaybe<Agreements_Bool_Exp>;
  _or?: InputMaybe<Array<Agreements_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  adminContractAddress?: InputMaybe<String_Comparison_Exp>;
  chainId?: InputMaybe<Int_Comparison_Exp>;
  contractURI?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  ens?: InputMaybe<String_Comparison_Exp>;
  ensFetchedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  gnosisSafeAddress?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isTransferrable?: InputMaybe<Boolean_Comparison_Exp>;
  maxSupply?: InputMaybe<String_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  mintPermissions?: InputMaybe<Jsonb_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  ownerFetchedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  splits?: InputMaybe<Jsonb_Comparison_Exp>;
  symbol?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "Agreements" */
export enum Agreements_Constraint {
  /** unique or primary key constraint on columns "id" */
  AgreementsPkey = 'Agreements_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Agreements_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']>>;
  mintPermissions?: InputMaybe<Array<Scalars['String']>>;
  splits?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Agreements_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']>;
  mintPermissions?: InputMaybe<Scalars['Int']>;
  splits?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Agreements_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']>;
  mintPermissions?: InputMaybe<Scalars['String']>;
  splits?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "Agreements" */
export type Agreements_Inc_Input = {
  chainId?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "Agreements" */
export type Agreements_Insert_Input = {
  AgreementExtensions?: InputMaybe<AgreementExtensions_Arr_Rel_Insert_Input>;
  AgreementRoleExtensions?: InputMaybe<AgreementRoleExtensions_Arr_Rel_Insert_Input>;
  AgreementRoleTokens?: InputMaybe<AgreementRoleTokens_Arr_Rel_Insert_Input>;
  AgreementRoles?: InputMaybe<AgreementRoles_Arr_Rel_Insert_Input>;
  AgreementTokens?: InputMaybe<AgreementTokens_Arr_Rel_Insert_Input>;
  AgreementWallets?: InputMaybe<AgreementWallets_Arr_Rel_Insert_Input>;
  OwnerId?: InputMaybe<Scalars['uuid']>;
  Transaction?: InputMaybe<Transactions_Obj_Rel_Insert_Input>;
  TransactionId?: InputMaybe<Scalars['uuid']>;
  Wallet?: InputMaybe<Wallets_Obj_Rel_Insert_Input>;
  address?: InputMaybe<Scalars['String']>;
  adminContractAddress?: InputMaybe<Scalars['String']>;
  chainId?: InputMaybe<Scalars['Int']>;
  contractURI?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  ens?: InputMaybe<Scalars['String']>;
  ensFetchedAt?: InputMaybe<Scalars['timestamptz']>;
  gnosisSafeAddress?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  isTransferrable?: InputMaybe<Scalars['Boolean']>;
  maxSupply?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  mintPermissions?: InputMaybe<Scalars['jsonb']>;
  name?: InputMaybe<Scalars['String']>;
  ownerFetchedAt?: InputMaybe<Scalars['timestamptz']>;
  slug?: InputMaybe<Scalars['String']>;
  splits?: InputMaybe<Scalars['jsonb']>;
  symbol?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Agreements_Max_Fields = {
  __typename?: 'Agreements_max_fields';
  OwnerId?: Maybe<Scalars['uuid']>;
  TransactionId?: Maybe<Scalars['uuid']>;
  address?: Maybe<Scalars['String']>;
  adminContractAddress?: Maybe<Scalars['String']>;
  chainId?: Maybe<Scalars['Int']>;
  contractURI?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  ens?: Maybe<Scalars['String']>;
  ensFetchedAt?: Maybe<Scalars['timestamptz']>;
  gnosisSafeAddress?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  maxSupply?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ownerFetchedAt?: Maybe<Scalars['timestamptz']>;
  slug?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "Agreements" */
export type Agreements_Max_Order_By = {
  OwnerId?: InputMaybe<Order_By>;
  TransactionId?: InputMaybe<Order_By>;
  address?: InputMaybe<Order_By>;
  adminContractAddress?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  contractURI?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  ens?: InputMaybe<Order_By>;
  ensFetchedAt?: InputMaybe<Order_By>;
  gnosisSafeAddress?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maxSupply?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  ownerFetchedAt?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  symbol?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Agreements_Min_Fields = {
  __typename?: 'Agreements_min_fields';
  OwnerId?: Maybe<Scalars['uuid']>;
  TransactionId?: Maybe<Scalars['uuid']>;
  address?: Maybe<Scalars['String']>;
  adminContractAddress?: Maybe<Scalars['String']>;
  chainId?: Maybe<Scalars['Int']>;
  contractURI?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  ens?: Maybe<Scalars['String']>;
  ensFetchedAt?: Maybe<Scalars['timestamptz']>;
  gnosisSafeAddress?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  maxSupply?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  ownerFetchedAt?: Maybe<Scalars['timestamptz']>;
  slug?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "Agreements" */
export type Agreements_Min_Order_By = {
  OwnerId?: InputMaybe<Order_By>;
  TransactionId?: InputMaybe<Order_By>;
  address?: InputMaybe<Order_By>;
  adminContractAddress?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  contractURI?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  ens?: InputMaybe<Order_By>;
  ensFetchedAt?: InputMaybe<Order_By>;
  gnosisSafeAddress?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  maxSupply?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  ownerFetchedAt?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  symbol?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "Agreements" */
export type Agreements_Mutation_Response = {
  __typename?: 'Agreements_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Agreements>;
};

/** input type for inserting object relation for remote table "Agreements" */
export type Agreements_Obj_Rel_Insert_Input = {
  data: Agreements_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Agreements_On_Conflict>;
};

/** on_conflict condition type for table "Agreements" */
export type Agreements_On_Conflict = {
  constraint: Agreements_Constraint;
  update_columns?: Array<Agreements_Update_Column>;
  where?: InputMaybe<Agreements_Bool_Exp>;
};

/** Ordering options when selecting data from "Agreements". */
export type Agreements_Order_By = {
  AgreementExtensions_aggregate?: InputMaybe<AgreementExtensions_Aggregate_Order_By>;
  AgreementRoleExtensions_aggregate?: InputMaybe<AgreementRoleExtensions_Aggregate_Order_By>;
  AgreementRoleTokens_aggregate?: InputMaybe<AgreementRoleTokens_Aggregate_Order_By>;
  AgreementRoles_aggregate?: InputMaybe<AgreementRoles_Aggregate_Order_By>;
  AgreementTokens_aggregate?: InputMaybe<AgreementTokens_Aggregate_Order_By>;
  AgreementWallets_aggregate?: InputMaybe<AgreementWallets_Aggregate_Order_By>;
  OwnerId?: InputMaybe<Order_By>;
  Transaction?: InputMaybe<Transactions_Order_By>;
  TransactionId?: InputMaybe<Order_By>;
  Wallet?: InputMaybe<Wallets_Order_By>;
  address?: InputMaybe<Order_By>;
  adminContractAddress?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  contractURI?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  ens?: InputMaybe<Order_By>;
  ensFetchedAt?: InputMaybe<Order_By>;
  gnosisSafeAddress?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isTransferrable?: InputMaybe<Order_By>;
  maxSupply?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  mintPermissions?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  ownerFetchedAt?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  splits?: InputMaybe<Order_By>;
  symbol?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Agreements */
export type Agreements_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Agreements_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
  mintPermissions?: InputMaybe<Scalars['jsonb']>;
  splits?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "Agreements" */
export enum Agreements_Select_Column {
  /** column name */
  OwnerId = 'OwnerId',
  /** column name */
  TransactionId = 'TransactionId',
  /** column name */
  Address = 'address',
  /** column name */
  AdminContractAddress = 'adminContractAddress',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  ContractUri = 'contractURI',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Ens = 'ens',
  /** column name */
  EnsFetchedAt = 'ensFetchedAt',
  /** column name */
  GnosisSafeAddress = 'gnosisSafeAddress',
  /** column name */
  Id = 'id',
  /** column name */
  IsTransferrable = 'isTransferrable',
  /** column name */
  MaxSupply = 'maxSupply',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  MintPermissions = 'mintPermissions',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerFetchedAt = 'ownerFetchedAt',
  /** column name */
  Slug = 'slug',
  /** column name */
  Splits = 'splits',
  /** column name */
  Symbol = 'symbol',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** select "Agreements_aggregate_bool_exp_bool_and_arguments_columns" columns of table "Agreements" */
export enum Agreements_Select_Column_Agreements_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsTransferrable = 'isTransferrable'
}

/** select "Agreements_aggregate_bool_exp_bool_or_arguments_columns" columns of table "Agreements" */
export enum Agreements_Select_Column_Agreements_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsTransferrable = 'isTransferrable'
}

/** input type for updating data in table "Agreements" */
export type Agreements_Set_Input = {
  OwnerId?: InputMaybe<Scalars['uuid']>;
  TransactionId?: InputMaybe<Scalars['uuid']>;
  address?: InputMaybe<Scalars['String']>;
  adminContractAddress?: InputMaybe<Scalars['String']>;
  chainId?: InputMaybe<Scalars['Int']>;
  contractURI?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  ens?: InputMaybe<Scalars['String']>;
  ensFetchedAt?: InputMaybe<Scalars['timestamptz']>;
  gnosisSafeAddress?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  isTransferrable?: InputMaybe<Scalars['Boolean']>;
  maxSupply?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  mintPermissions?: InputMaybe<Scalars['jsonb']>;
  name?: InputMaybe<Scalars['String']>;
  ownerFetchedAt?: InputMaybe<Scalars['timestamptz']>;
  slug?: InputMaybe<Scalars['String']>;
  splits?: InputMaybe<Scalars['jsonb']>;
  symbol?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Agreements_Stddev_Fields = {
  __typename?: 'Agreements_stddev_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "Agreements" */
export type Agreements_Stddev_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Agreements_Stddev_Pop_Fields = {
  __typename?: 'Agreements_stddev_pop_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "Agreements" */
export type Agreements_Stddev_Pop_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Agreements_Stddev_Samp_Fields = {
  __typename?: 'Agreements_stddev_samp_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "Agreements" */
export type Agreements_Stddev_Samp_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "Agreements" */
export type Agreements_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Agreements_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Agreements_Stream_Cursor_Value_Input = {
  OwnerId?: InputMaybe<Scalars['uuid']>;
  TransactionId?: InputMaybe<Scalars['uuid']>;
  address?: InputMaybe<Scalars['String']>;
  adminContractAddress?: InputMaybe<Scalars['String']>;
  chainId?: InputMaybe<Scalars['Int']>;
  contractURI?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  ens?: InputMaybe<Scalars['String']>;
  ensFetchedAt?: InputMaybe<Scalars['timestamptz']>;
  gnosisSafeAddress?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  isTransferrable?: InputMaybe<Scalars['Boolean']>;
  maxSupply?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  mintPermissions?: InputMaybe<Scalars['jsonb']>;
  name?: InputMaybe<Scalars['String']>;
  ownerFetchedAt?: InputMaybe<Scalars['timestamptz']>;
  slug?: InputMaybe<Scalars['String']>;
  splits?: InputMaybe<Scalars['jsonb']>;
  symbol?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type Agreements_Sum_Fields = {
  __typename?: 'Agreements_sum_fields';
  chainId?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "Agreements" */
export type Agreements_Sum_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** update columns of table "Agreements" */
export enum Agreements_Update_Column {
  /** column name */
  OwnerId = 'OwnerId',
  /** column name */
  TransactionId = 'TransactionId',
  /** column name */
  Address = 'address',
  /** column name */
  AdminContractAddress = 'adminContractAddress',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  ContractUri = 'contractURI',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Ens = 'ens',
  /** column name */
  EnsFetchedAt = 'ensFetchedAt',
  /** column name */
  GnosisSafeAddress = 'gnosisSafeAddress',
  /** column name */
  Id = 'id',
  /** column name */
  IsTransferrable = 'isTransferrable',
  /** column name */
  MaxSupply = 'maxSupply',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  MintPermissions = 'mintPermissions',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerFetchedAt = 'ownerFetchedAt',
  /** column name */
  Slug = 'slug',
  /** column name */
  Splits = 'splits',
  /** column name */
  Symbol = 'symbol',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Agreements_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Agreements_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Agreements_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Agreements_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Agreements_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Agreements_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Agreements_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Agreements_Set_Input>;
  where: Agreements_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Agreements_Var_Pop_Fields = {
  __typename?: 'Agreements_var_pop_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "Agreements" */
export type Agreements_Var_Pop_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Agreements_Var_Samp_Fields = {
  __typename?: 'Agreements_var_samp_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "Agreements" */
export type Agreements_Var_Samp_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Agreements_Variance_Fields = {
  __typename?: 'Agreements_variance_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "Agreements" */
export type Agreements_Variance_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** columns and relationships of "BundleContracts" */
export type BundleContracts = {
  __typename?: 'BundleContracts';
  /** An object relationship */
  Bundle?: Maybe<Bundles>;
  BundleId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  Contract?: Maybe<Contracts>;
  ContractId?: Maybe<Scalars['uuid']>;
  createdAt: Scalars['timestamptz'];
  functionSelectors: Scalars['jsonb'];
  id: Scalars['uuid'];
  order: Scalars['Int'];
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "BundleContracts" */
export type BundleContractsFunctionSelectorsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "BundleContracts" */
export type BundleContracts_Aggregate = {
  __typename?: 'BundleContracts_aggregate';
  aggregate?: Maybe<BundleContracts_Aggregate_Fields>;
  nodes: Array<BundleContracts>;
};

export type BundleContracts_Aggregate_Bool_Exp = {
  count?: InputMaybe<BundleContracts_Aggregate_Bool_Exp_Count>;
};

export type BundleContracts_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<BundleContracts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<BundleContracts_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "BundleContracts" */
export type BundleContracts_Aggregate_Fields = {
  __typename?: 'BundleContracts_aggregate_fields';
  avg?: Maybe<BundleContracts_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<BundleContracts_Max_Fields>;
  min?: Maybe<BundleContracts_Min_Fields>;
  stddev?: Maybe<BundleContracts_Stddev_Fields>;
  stddev_pop?: Maybe<BundleContracts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<BundleContracts_Stddev_Samp_Fields>;
  sum?: Maybe<BundleContracts_Sum_Fields>;
  var_pop?: Maybe<BundleContracts_Var_Pop_Fields>;
  var_samp?: Maybe<BundleContracts_Var_Samp_Fields>;
  variance?: Maybe<BundleContracts_Variance_Fields>;
};


/** aggregate fields of "BundleContracts" */
export type BundleContracts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<BundleContracts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "BundleContracts" */
export type BundleContracts_Aggregate_Order_By = {
  avg?: InputMaybe<BundleContracts_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<BundleContracts_Max_Order_By>;
  min?: InputMaybe<BundleContracts_Min_Order_By>;
  stddev?: InputMaybe<BundleContracts_Stddev_Order_By>;
  stddev_pop?: InputMaybe<BundleContracts_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<BundleContracts_Stddev_Samp_Order_By>;
  sum?: InputMaybe<BundleContracts_Sum_Order_By>;
  var_pop?: InputMaybe<BundleContracts_Var_Pop_Order_By>;
  var_samp?: InputMaybe<BundleContracts_Var_Samp_Order_By>;
  variance?: InputMaybe<BundleContracts_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type BundleContracts_Append_Input = {
  functionSelectors?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "BundleContracts" */
export type BundleContracts_Arr_Rel_Insert_Input = {
  data: Array<BundleContracts_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<BundleContracts_On_Conflict>;
};

/** aggregate avg on columns */
export type BundleContracts_Avg_Fields = {
  __typename?: 'BundleContracts_avg_fields';
  order?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "BundleContracts" */
export type BundleContracts_Avg_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "BundleContracts". All fields are combined with a logical 'AND'. */
export type BundleContracts_Bool_Exp = {
  Bundle?: InputMaybe<Bundles_Bool_Exp>;
  BundleId?: InputMaybe<Uuid_Comparison_Exp>;
  Contract?: InputMaybe<Contracts_Bool_Exp>;
  ContractId?: InputMaybe<Uuid_Comparison_Exp>;
  _and?: InputMaybe<Array<BundleContracts_Bool_Exp>>;
  _not?: InputMaybe<BundleContracts_Bool_Exp>;
  _or?: InputMaybe<Array<BundleContracts_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  functionSelectors?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  order?: InputMaybe<Int_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "BundleContracts" */
export enum BundleContracts_Constraint {
  /** unique or primary key constraint on columns "ContractId", "BundleId" */
  BundleContractsBundleIdContractIdKey = 'BundleContracts_BundleId_ContractId_key',
  /** unique or primary key constraint on columns "id" */
  BundleContractsPkey = 'BundleContracts_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type BundleContracts_Delete_At_Path_Input = {
  functionSelectors?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type BundleContracts_Delete_Elem_Input = {
  functionSelectors?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type BundleContracts_Delete_Key_Input = {
  functionSelectors?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "BundleContracts" */
export type BundleContracts_Inc_Input = {
  order?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "BundleContracts" */
export type BundleContracts_Insert_Input = {
  Bundle?: InputMaybe<Bundles_Obj_Rel_Insert_Input>;
  BundleId?: InputMaybe<Scalars['uuid']>;
  Contract?: InputMaybe<Contracts_Obj_Rel_Insert_Input>;
  ContractId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  functionSelectors?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  order?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type BundleContracts_Max_Fields = {
  __typename?: 'BundleContracts_max_fields';
  BundleId?: Maybe<Scalars['uuid']>;
  ContractId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  order?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "BundleContracts" */
export type BundleContracts_Max_Order_By = {
  BundleId?: InputMaybe<Order_By>;
  ContractId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type BundleContracts_Min_Fields = {
  __typename?: 'BundleContracts_min_fields';
  BundleId?: Maybe<Scalars['uuid']>;
  ContractId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  order?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "BundleContracts" */
export type BundleContracts_Min_Order_By = {
  BundleId?: InputMaybe<Order_By>;
  ContractId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "BundleContracts" */
export type BundleContracts_Mutation_Response = {
  __typename?: 'BundleContracts_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<BundleContracts>;
};

/** on_conflict condition type for table "BundleContracts" */
export type BundleContracts_On_Conflict = {
  constraint: BundleContracts_Constraint;
  update_columns?: Array<BundleContracts_Update_Column>;
  where?: InputMaybe<BundleContracts_Bool_Exp>;
};

/** Ordering options when selecting data from "BundleContracts". */
export type BundleContracts_Order_By = {
  Bundle?: InputMaybe<Bundles_Order_By>;
  BundleId?: InputMaybe<Order_By>;
  Contract?: InputMaybe<Contracts_Order_By>;
  ContractId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  functionSelectors?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: BundleContracts */
export type BundleContracts_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type BundleContracts_Prepend_Input = {
  functionSelectors?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "BundleContracts" */
export enum BundleContracts_Select_Column {
  /** column name */
  BundleId = 'BundleId',
  /** column name */
  ContractId = 'ContractId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  FunctionSelectors = 'functionSelectors',
  /** column name */
  Id = 'id',
  /** column name */
  Order = 'order',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "BundleContracts" */
export type BundleContracts_Set_Input = {
  BundleId?: InputMaybe<Scalars['uuid']>;
  ContractId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  functionSelectors?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  order?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type BundleContracts_Stddev_Fields = {
  __typename?: 'BundleContracts_stddev_fields';
  order?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "BundleContracts" */
export type BundleContracts_Stddev_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type BundleContracts_Stddev_Pop_Fields = {
  __typename?: 'BundleContracts_stddev_pop_fields';
  order?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "BundleContracts" */
export type BundleContracts_Stddev_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type BundleContracts_Stddev_Samp_Fields = {
  __typename?: 'BundleContracts_stddev_samp_fields';
  order?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "BundleContracts" */
export type BundleContracts_Stddev_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "BundleContracts" */
export type BundleContracts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: BundleContracts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type BundleContracts_Stream_Cursor_Value_Input = {
  BundleId?: InputMaybe<Scalars['uuid']>;
  ContractId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  functionSelectors?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  order?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type BundleContracts_Sum_Fields = {
  __typename?: 'BundleContracts_sum_fields';
  order?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "BundleContracts" */
export type BundleContracts_Sum_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** update columns of table "BundleContracts" */
export enum BundleContracts_Update_Column {
  /** column name */
  BundleId = 'BundleId',
  /** column name */
  ContractId = 'ContractId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  FunctionSelectors = 'functionSelectors',
  /** column name */
  Id = 'id',
  /** column name */
  Order = 'order',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type BundleContracts_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<BundleContracts_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<BundleContracts_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<BundleContracts_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<BundleContracts_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<BundleContracts_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<BundleContracts_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<BundleContracts_Set_Input>;
  where: BundleContracts_Bool_Exp;
};

/** aggregate var_pop on columns */
export type BundleContracts_Var_Pop_Fields = {
  __typename?: 'BundleContracts_var_pop_fields';
  order?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "BundleContracts" */
export type BundleContracts_Var_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type BundleContracts_Var_Samp_Fields = {
  __typename?: 'BundleContracts_var_samp_fields';
  order?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "BundleContracts" */
export type BundleContracts_Var_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type BundleContracts_Variance_Fields = {
  __typename?: 'BundleContracts_variance_fields';
  order?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "BundleContracts" */
export type BundleContracts_Variance_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** columns and relationships of "Bundles" */
export type Bundles = {
  __typename?: 'Bundles';
  /** An array relationship */
  BundleContracts: Array<BundleContracts>;
  /** An aggregate relationship */
  BundleContracts_aggregate: BundleContracts_Aggregate;
  /** An object relationship */
  Creator?: Maybe<Wallets>;
  CreatorId?: Maybe<Scalars['uuid']>;
  abi: Scalars['jsonb'];
  createdAt: Scalars['timestamptz'];
  description: Scalars['String'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  types: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "Bundles" */
export type BundlesBundleContractsArgs = {
  distinct_on?: InputMaybe<Array<BundleContracts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BundleContracts_Order_By>>;
  where?: InputMaybe<BundleContracts_Bool_Exp>;
};


/** columns and relationships of "Bundles" */
export type BundlesBundleContracts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<BundleContracts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BundleContracts_Order_By>>;
  where?: InputMaybe<BundleContracts_Bool_Exp>;
};


/** columns and relationships of "Bundles" */
export type BundlesAbiArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "Bundles" */
export type Bundles_Aggregate = {
  __typename?: 'Bundles_aggregate';
  aggregate?: Maybe<Bundles_Aggregate_Fields>;
  nodes: Array<Bundles>;
};

export type Bundles_Aggregate_Bool_Exp = {
  count?: InputMaybe<Bundles_Aggregate_Bool_Exp_Count>;
};

export type Bundles_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Bundles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Bundles_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "Bundles" */
export type Bundles_Aggregate_Fields = {
  __typename?: 'Bundles_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Bundles_Max_Fields>;
  min?: Maybe<Bundles_Min_Fields>;
};


/** aggregate fields of "Bundles" */
export type Bundles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Bundles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Bundles" */
export type Bundles_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Bundles_Max_Order_By>;
  min?: InputMaybe<Bundles_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Bundles_Append_Input = {
  abi?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "Bundles" */
export type Bundles_Arr_Rel_Insert_Input = {
  data: Array<Bundles_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Bundles_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Bundles". All fields are combined with a logical 'AND'. */
export type Bundles_Bool_Exp = {
  BundleContracts?: InputMaybe<BundleContracts_Bool_Exp>;
  BundleContracts_aggregate?: InputMaybe<BundleContracts_Aggregate_Bool_Exp>;
  Creator?: InputMaybe<Wallets_Bool_Exp>;
  CreatorId?: InputMaybe<Uuid_Comparison_Exp>;
  _and?: InputMaybe<Array<Bundles_Bool_Exp>>;
  _not?: InputMaybe<Bundles_Bool_Exp>;
  _or?: InputMaybe<Array<Bundles_Bool_Exp>>;
  abi?: InputMaybe<Jsonb_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  types?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "Bundles" */
export enum Bundles_Constraint {
  /** unique or primary key constraint on columns "id" */
  BundlesPkey = 'Bundles_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Bundles_Delete_At_Path_Input = {
  abi?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Bundles_Delete_Elem_Input = {
  abi?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Bundles_Delete_Key_Input = {
  abi?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "Bundles" */
export type Bundles_Insert_Input = {
  BundleContracts?: InputMaybe<BundleContracts_Arr_Rel_Insert_Input>;
  Creator?: InputMaybe<Wallets_Obj_Rel_Insert_Input>;
  CreatorId?: InputMaybe<Scalars['uuid']>;
  abi?: InputMaybe<Scalars['jsonb']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  types?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Bundles_Max_Fields = {
  __typename?: 'Bundles_max_fields';
  CreatorId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  types?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "Bundles" */
export type Bundles_Max_Order_By = {
  CreatorId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  types?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Bundles_Min_Fields = {
  __typename?: 'Bundles_min_fields';
  CreatorId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  types?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "Bundles" */
export type Bundles_Min_Order_By = {
  CreatorId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  types?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "Bundles" */
export type Bundles_Mutation_Response = {
  __typename?: 'Bundles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Bundles>;
};

/** input type for inserting object relation for remote table "Bundles" */
export type Bundles_Obj_Rel_Insert_Input = {
  data: Bundles_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Bundles_On_Conflict>;
};

/** on_conflict condition type for table "Bundles" */
export type Bundles_On_Conflict = {
  constraint: Bundles_Constraint;
  update_columns?: Array<Bundles_Update_Column>;
  where?: InputMaybe<Bundles_Bool_Exp>;
};

/** Ordering options when selecting data from "Bundles". */
export type Bundles_Order_By = {
  BundleContracts_aggregate?: InputMaybe<BundleContracts_Aggregate_Order_By>;
  Creator?: InputMaybe<Wallets_Order_By>;
  CreatorId?: InputMaybe<Order_By>;
  abi?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  types?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Bundles */
export type Bundles_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Bundles_Prepend_Input = {
  abi?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "Bundles" */
export enum Bundles_Select_Column {
  /** column name */
  CreatorId = 'CreatorId',
  /** column name */
  Abi = 'abi',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Types = 'types',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "Bundles" */
export type Bundles_Set_Input = {
  CreatorId?: InputMaybe<Scalars['uuid']>;
  abi?: InputMaybe<Scalars['jsonb']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  types?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "Bundles" */
export type Bundles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Bundles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Bundles_Stream_Cursor_Value_Input = {
  CreatorId?: InputMaybe<Scalars['uuid']>;
  abi?: InputMaybe<Scalars['jsonb']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  types?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "Bundles" */
export enum Bundles_Update_Column {
  /** column name */
  CreatorId = 'CreatorId',
  /** column name */
  Abi = 'abi',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Types = 'types',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Bundles_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Bundles_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Bundles_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Bundles_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Bundles_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Bundles_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Bundles_Set_Input>;
  where: Bundles_Bool_Exp;
};

/** columns and relationships of "ChainNonces" */
export type ChainNonces = {
  __typename?: 'ChainNonces';
  chainId: Scalars['Int'];
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  nonce: Scalars['Int'];
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "ChainNonces" */
export type ChainNonces_Aggregate = {
  __typename?: 'ChainNonces_aggregate';
  aggregate?: Maybe<ChainNonces_Aggregate_Fields>;
  nodes: Array<ChainNonces>;
};

/** aggregate fields of "ChainNonces" */
export type ChainNonces_Aggregate_Fields = {
  __typename?: 'ChainNonces_aggregate_fields';
  avg?: Maybe<ChainNonces_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<ChainNonces_Max_Fields>;
  min?: Maybe<ChainNonces_Min_Fields>;
  stddev?: Maybe<ChainNonces_Stddev_Fields>;
  stddev_pop?: Maybe<ChainNonces_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<ChainNonces_Stddev_Samp_Fields>;
  sum?: Maybe<ChainNonces_Sum_Fields>;
  var_pop?: Maybe<ChainNonces_Var_Pop_Fields>;
  var_samp?: Maybe<ChainNonces_Var_Samp_Fields>;
  variance?: Maybe<ChainNonces_Variance_Fields>;
};


/** aggregate fields of "ChainNonces" */
export type ChainNonces_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ChainNonces_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type ChainNonces_Avg_Fields = {
  __typename?: 'ChainNonces_avg_fields';
  chainId?: Maybe<Scalars['Float']>;
  nonce?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "ChainNonces". All fields are combined with a logical 'AND'. */
export type ChainNonces_Bool_Exp = {
  _and?: InputMaybe<Array<ChainNonces_Bool_Exp>>;
  _not?: InputMaybe<ChainNonces_Bool_Exp>;
  _or?: InputMaybe<Array<ChainNonces_Bool_Exp>>;
  chainId?: InputMaybe<Int_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  nonce?: InputMaybe<Int_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "ChainNonces" */
export enum ChainNonces_Constraint {
  /** unique or primary key constraint on columns "chainId" */
  ChainNoncesChainIdKey = 'ChainNonces_chainId_key',
  /** unique or primary key constraint on columns "chainId" */
  ChainNoncesChainIdKey1 = 'ChainNonces_chainId_key1',
  /** unique or primary key constraint on columns "chainId" */
  ChainNoncesChainIdKey2 = 'ChainNonces_chainId_key2',
  /** unique or primary key constraint on columns "chainId" */
  ChainNoncesChainIdKey3 = 'ChainNonces_chainId_key3',
  /** unique or primary key constraint on columns "chainId" */
  ChainNoncesChainIdKey4 = 'ChainNonces_chainId_key4',
  /** unique or primary key constraint on columns "chainId" */
  ChainNoncesChainIdKey5 = 'ChainNonces_chainId_key5',
  /** unique or primary key constraint on columns "chainId" */
  ChainNoncesChainIdKey6 = 'ChainNonces_chainId_key6',
  /** unique or primary key constraint on columns "id" */
  ChainNoncesPkey = 'ChainNonces_pkey'
}

/** input type for incrementing numeric columns in table "ChainNonces" */
export type ChainNonces_Inc_Input = {
  chainId?: InputMaybe<Scalars['Int']>;
  nonce?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "ChainNonces" */
export type ChainNonces_Insert_Input = {
  chainId?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  nonce?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type ChainNonces_Max_Fields = {
  __typename?: 'ChainNonces_max_fields';
  chainId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  nonce?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type ChainNonces_Min_Fields = {
  __typename?: 'ChainNonces_min_fields';
  chainId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  nonce?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "ChainNonces" */
export type ChainNonces_Mutation_Response = {
  __typename?: 'ChainNonces_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ChainNonces>;
};

/** on_conflict condition type for table "ChainNonces" */
export type ChainNonces_On_Conflict = {
  constraint: ChainNonces_Constraint;
  update_columns?: Array<ChainNonces_Update_Column>;
  where?: InputMaybe<ChainNonces_Bool_Exp>;
};

/** Ordering options when selecting data from "ChainNonces". */
export type ChainNonces_Order_By = {
  chainId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: ChainNonces */
export type ChainNonces_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "ChainNonces" */
export enum ChainNonces_Select_Column {
  /** column name */
  ChainId = 'chainId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Nonce = 'nonce',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "ChainNonces" */
export type ChainNonces_Set_Input = {
  chainId?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  nonce?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type ChainNonces_Stddev_Fields = {
  __typename?: 'ChainNonces_stddev_fields';
  chainId?: Maybe<Scalars['Float']>;
  nonce?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type ChainNonces_Stddev_Pop_Fields = {
  __typename?: 'ChainNonces_stddev_pop_fields';
  chainId?: Maybe<Scalars['Float']>;
  nonce?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type ChainNonces_Stddev_Samp_Fields = {
  __typename?: 'ChainNonces_stddev_samp_fields';
  chainId?: Maybe<Scalars['Float']>;
  nonce?: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "ChainNonces" */
export type ChainNonces_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ChainNonces_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ChainNonces_Stream_Cursor_Value_Input = {
  chainId?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  nonce?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type ChainNonces_Sum_Fields = {
  __typename?: 'ChainNonces_sum_fields';
  chainId?: Maybe<Scalars['Int']>;
  nonce?: Maybe<Scalars['Int']>;
};

/** update columns of table "ChainNonces" */
export enum ChainNonces_Update_Column {
  /** column name */
  ChainId = 'chainId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Nonce = 'nonce',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type ChainNonces_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<ChainNonces_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ChainNonces_Set_Input>;
  where: ChainNonces_Bool_Exp;
};

/** aggregate var_pop on columns */
export type ChainNonces_Var_Pop_Fields = {
  __typename?: 'ChainNonces_var_pop_fields';
  chainId?: Maybe<Scalars['Float']>;
  nonce?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type ChainNonces_Var_Samp_Fields = {
  __typename?: 'ChainNonces_var_samp_fields';
  chainId?: Maybe<Scalars['Float']>;
  nonce?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type ChainNonces_Variance_Fields = {
  __typename?: 'ChainNonces_variance_fields';
  chainId?: Maybe<Scalars['Float']>;
  nonce?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "ContractInstances" */
export type ContractInstances = {
  __typename?: 'ContractInstances';
  /** An object relationship */
  Contract?: Maybe<Contracts>;
  ContractId?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  WalletContractInstances: Array<WalletContractInstances>;
  /** An aggregate relationship */
  WalletContractInstances_aggregate: WalletContractInstances_Aggregate;
  address: Scalars['String'];
  chainId: Scalars['Int'];
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "ContractInstances" */
export type ContractInstancesWalletContractInstancesArgs = {
  distinct_on?: InputMaybe<Array<WalletContractInstances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<WalletContractInstances_Order_By>>;
  where?: InputMaybe<WalletContractInstances_Bool_Exp>;
};


/** columns and relationships of "ContractInstances" */
export type ContractInstancesWalletContractInstances_AggregateArgs = {
  distinct_on?: InputMaybe<Array<WalletContractInstances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<WalletContractInstances_Order_By>>;
  where?: InputMaybe<WalletContractInstances_Bool_Exp>;
};

/** aggregated selection of "ContractInstances" */
export type ContractInstances_Aggregate = {
  __typename?: 'ContractInstances_aggregate';
  aggregate?: Maybe<ContractInstances_Aggregate_Fields>;
  nodes: Array<ContractInstances>;
};

export type ContractInstances_Aggregate_Bool_Exp = {
  count?: InputMaybe<ContractInstances_Aggregate_Bool_Exp_Count>;
};

export type ContractInstances_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<ContractInstances_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<ContractInstances_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "ContractInstances" */
export type ContractInstances_Aggregate_Fields = {
  __typename?: 'ContractInstances_aggregate_fields';
  avg?: Maybe<ContractInstances_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<ContractInstances_Max_Fields>;
  min?: Maybe<ContractInstances_Min_Fields>;
  stddev?: Maybe<ContractInstances_Stddev_Fields>;
  stddev_pop?: Maybe<ContractInstances_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<ContractInstances_Stddev_Samp_Fields>;
  sum?: Maybe<ContractInstances_Sum_Fields>;
  var_pop?: Maybe<ContractInstances_Var_Pop_Fields>;
  var_samp?: Maybe<ContractInstances_Var_Samp_Fields>;
  variance?: Maybe<ContractInstances_Variance_Fields>;
};


/** aggregate fields of "ContractInstances" */
export type ContractInstances_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ContractInstances_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "ContractInstances" */
export type ContractInstances_Aggregate_Order_By = {
  avg?: InputMaybe<ContractInstances_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ContractInstances_Max_Order_By>;
  min?: InputMaybe<ContractInstances_Min_Order_By>;
  stddev?: InputMaybe<ContractInstances_Stddev_Order_By>;
  stddev_pop?: InputMaybe<ContractInstances_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<ContractInstances_Stddev_Samp_Order_By>;
  sum?: InputMaybe<ContractInstances_Sum_Order_By>;
  var_pop?: InputMaybe<ContractInstances_Var_Pop_Order_By>;
  var_samp?: InputMaybe<ContractInstances_Var_Samp_Order_By>;
  variance?: InputMaybe<ContractInstances_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "ContractInstances" */
export type ContractInstances_Arr_Rel_Insert_Input = {
  data: Array<ContractInstances_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<ContractInstances_On_Conflict>;
};

/** aggregate avg on columns */
export type ContractInstances_Avg_Fields = {
  __typename?: 'ContractInstances_avg_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "ContractInstances" */
export type ContractInstances_Avg_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "ContractInstances". All fields are combined with a logical 'AND'. */
export type ContractInstances_Bool_Exp = {
  Contract?: InputMaybe<Contracts_Bool_Exp>;
  ContractId?: InputMaybe<Uuid_Comparison_Exp>;
  WalletContractInstances?: InputMaybe<WalletContractInstances_Bool_Exp>;
  WalletContractInstances_aggregate?: InputMaybe<WalletContractInstances_Aggregate_Bool_Exp>;
  _and?: InputMaybe<Array<ContractInstances_Bool_Exp>>;
  _not?: InputMaybe<ContractInstances_Bool_Exp>;
  _or?: InputMaybe<Array<ContractInstances_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  chainId?: InputMaybe<Int_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "ContractInstances" */
export enum ContractInstances_Constraint {
  /** unique or primary key constraint on columns "id" */
  ContractInstancesPkey = 'ContractInstances_pkey'
}

/** input type for incrementing numeric columns in table "ContractInstances" */
export type ContractInstances_Inc_Input = {
  chainId?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "ContractInstances" */
export type ContractInstances_Insert_Input = {
  Contract?: InputMaybe<Contracts_Obj_Rel_Insert_Input>;
  ContractId?: InputMaybe<Scalars['uuid']>;
  WalletContractInstances?: InputMaybe<WalletContractInstances_Arr_Rel_Insert_Input>;
  address?: InputMaybe<Scalars['String']>;
  chainId?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type ContractInstances_Max_Fields = {
  __typename?: 'ContractInstances_max_fields';
  ContractId?: Maybe<Scalars['uuid']>;
  address?: Maybe<Scalars['String']>;
  chainId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "ContractInstances" */
export type ContractInstances_Max_Order_By = {
  ContractId?: InputMaybe<Order_By>;
  address?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ContractInstances_Min_Fields = {
  __typename?: 'ContractInstances_min_fields';
  ContractId?: Maybe<Scalars['uuid']>;
  address?: Maybe<Scalars['String']>;
  chainId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "ContractInstances" */
export type ContractInstances_Min_Order_By = {
  ContractId?: InputMaybe<Order_By>;
  address?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "ContractInstances" */
export type ContractInstances_Mutation_Response = {
  __typename?: 'ContractInstances_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ContractInstances>;
};

/** input type for inserting object relation for remote table "ContractInstances" */
export type ContractInstances_Obj_Rel_Insert_Input = {
  data: ContractInstances_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<ContractInstances_On_Conflict>;
};

/** on_conflict condition type for table "ContractInstances" */
export type ContractInstances_On_Conflict = {
  constraint: ContractInstances_Constraint;
  update_columns?: Array<ContractInstances_Update_Column>;
  where?: InputMaybe<ContractInstances_Bool_Exp>;
};

/** Ordering options when selecting data from "ContractInstances". */
export type ContractInstances_Order_By = {
  Contract?: InputMaybe<Contracts_Order_By>;
  ContractId?: InputMaybe<Order_By>;
  WalletContractInstances_aggregate?: InputMaybe<WalletContractInstances_Aggregate_Order_By>;
  address?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: ContractInstances */
export type ContractInstances_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "ContractInstances" */
export enum ContractInstances_Select_Column {
  /** column name */
  ContractId = 'ContractId',
  /** column name */
  Address = 'address',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "ContractInstances" */
export type ContractInstances_Set_Input = {
  ContractId?: InputMaybe<Scalars['uuid']>;
  address?: InputMaybe<Scalars['String']>;
  chainId?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type ContractInstances_Stddev_Fields = {
  __typename?: 'ContractInstances_stddev_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "ContractInstances" */
export type ContractInstances_Stddev_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type ContractInstances_Stddev_Pop_Fields = {
  __typename?: 'ContractInstances_stddev_pop_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "ContractInstances" */
export type ContractInstances_Stddev_Pop_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type ContractInstances_Stddev_Samp_Fields = {
  __typename?: 'ContractInstances_stddev_samp_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "ContractInstances" */
export type ContractInstances_Stddev_Samp_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "ContractInstances" */
export type ContractInstances_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: ContractInstances_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type ContractInstances_Stream_Cursor_Value_Input = {
  ContractId?: InputMaybe<Scalars['uuid']>;
  address?: InputMaybe<Scalars['String']>;
  chainId?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type ContractInstances_Sum_Fields = {
  __typename?: 'ContractInstances_sum_fields';
  chainId?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "ContractInstances" */
export type ContractInstances_Sum_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** update columns of table "ContractInstances" */
export enum ContractInstances_Update_Column {
  /** column name */
  ContractId = 'ContractId',
  /** column name */
  Address = 'address',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type ContractInstances_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<ContractInstances_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<ContractInstances_Set_Input>;
  where: ContractInstances_Bool_Exp;
};

/** aggregate var_pop on columns */
export type ContractInstances_Var_Pop_Fields = {
  __typename?: 'ContractInstances_var_pop_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "ContractInstances" */
export type ContractInstances_Var_Pop_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type ContractInstances_Var_Samp_Fields = {
  __typename?: 'ContractInstances_var_samp_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "ContractInstances" */
export type ContractInstances_Var_Samp_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type ContractInstances_Variance_Fields = {
  __typename?: 'ContractInstances_variance_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "ContractInstances" */
export type ContractInstances_Variance_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** columns and relationships of "Contracts" */
export type Contracts = {
  __typename?: 'Contracts';
  /** An array relationship */
  BundleContracts: Array<BundleContracts>;
  /** An aggregate relationship */
  BundleContracts_aggregate: BundleContracts_Aggregate;
  /** An array relationship */
  ContractInstances: Array<ContractInstances>;
  /** An aggregate relationship */
  ContractInstances_aggregate: ContractInstances_Aggregate;
  /** An object relationship */
  Creator?: Maybe<Wallets>;
  CreatorId?: Maybe<Scalars['uuid']>;
  abi: Scalars['jsonb'];
  bytecode: Scalars['String'];
  contractType: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  description: Scalars['String'];
  functionSelectors: Scalars['jsonb'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  version: Scalars['Int'];
};


/** columns and relationships of "Contracts" */
export type ContractsBundleContractsArgs = {
  distinct_on?: InputMaybe<Array<BundleContracts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BundleContracts_Order_By>>;
  where?: InputMaybe<BundleContracts_Bool_Exp>;
};


/** columns and relationships of "Contracts" */
export type ContractsBundleContracts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<BundleContracts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BundleContracts_Order_By>>;
  where?: InputMaybe<BundleContracts_Bool_Exp>;
};


/** columns and relationships of "Contracts" */
export type ContractsContractInstancesArgs = {
  distinct_on?: InputMaybe<Array<ContractInstances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ContractInstances_Order_By>>;
  where?: InputMaybe<ContractInstances_Bool_Exp>;
};


/** columns and relationships of "Contracts" */
export type ContractsContractInstances_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ContractInstances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ContractInstances_Order_By>>;
  where?: InputMaybe<ContractInstances_Bool_Exp>;
};


/** columns and relationships of "Contracts" */
export type ContractsAbiArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "Contracts" */
export type ContractsFunctionSelectorsArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "Contracts" */
export type Contracts_Aggregate = {
  __typename?: 'Contracts_aggregate';
  aggregate?: Maybe<Contracts_Aggregate_Fields>;
  nodes: Array<Contracts>;
};

export type Contracts_Aggregate_Bool_Exp = {
  count?: InputMaybe<Contracts_Aggregate_Bool_Exp_Count>;
};

export type Contracts_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Contracts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Contracts_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "Contracts" */
export type Contracts_Aggregate_Fields = {
  __typename?: 'Contracts_aggregate_fields';
  avg?: Maybe<Contracts_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Contracts_Max_Fields>;
  min?: Maybe<Contracts_Min_Fields>;
  stddev?: Maybe<Contracts_Stddev_Fields>;
  stddev_pop?: Maybe<Contracts_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Contracts_Stddev_Samp_Fields>;
  sum?: Maybe<Contracts_Sum_Fields>;
  var_pop?: Maybe<Contracts_Var_Pop_Fields>;
  var_samp?: Maybe<Contracts_Var_Samp_Fields>;
  variance?: Maybe<Contracts_Variance_Fields>;
};


/** aggregate fields of "Contracts" */
export type Contracts_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Contracts_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Contracts" */
export type Contracts_Aggregate_Order_By = {
  avg?: InputMaybe<Contracts_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Contracts_Max_Order_By>;
  min?: InputMaybe<Contracts_Min_Order_By>;
  stddev?: InputMaybe<Contracts_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Contracts_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Contracts_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Contracts_Sum_Order_By>;
  var_pop?: InputMaybe<Contracts_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Contracts_Var_Samp_Order_By>;
  variance?: InputMaybe<Contracts_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Contracts_Append_Input = {
  abi?: InputMaybe<Scalars['jsonb']>;
  functionSelectors?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "Contracts" */
export type Contracts_Arr_Rel_Insert_Input = {
  data: Array<Contracts_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Contracts_On_Conflict>;
};

/** aggregate avg on columns */
export type Contracts_Avg_Fields = {
  __typename?: 'Contracts_avg_fields';
  version?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "Contracts" */
export type Contracts_Avg_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Contracts". All fields are combined with a logical 'AND'. */
export type Contracts_Bool_Exp = {
  BundleContracts?: InputMaybe<BundleContracts_Bool_Exp>;
  BundleContracts_aggregate?: InputMaybe<BundleContracts_Aggregate_Bool_Exp>;
  ContractInstances?: InputMaybe<ContractInstances_Bool_Exp>;
  ContractInstances_aggregate?: InputMaybe<ContractInstances_Aggregate_Bool_Exp>;
  Creator?: InputMaybe<Wallets_Bool_Exp>;
  CreatorId?: InputMaybe<Uuid_Comparison_Exp>;
  _and?: InputMaybe<Array<Contracts_Bool_Exp>>;
  _not?: InputMaybe<Contracts_Bool_Exp>;
  _or?: InputMaybe<Array<Contracts_Bool_Exp>>;
  abi?: InputMaybe<Jsonb_Comparison_Exp>;
  bytecode?: InputMaybe<String_Comparison_Exp>;
  contractType?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  functionSelectors?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  version?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "Contracts" */
export enum Contracts_Constraint {
  /** unique or primary key constraint on columns "id" */
  ContractsPkey = 'Contracts_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Contracts_Delete_At_Path_Input = {
  abi?: InputMaybe<Array<Scalars['String']>>;
  functionSelectors?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Contracts_Delete_Elem_Input = {
  abi?: InputMaybe<Scalars['Int']>;
  functionSelectors?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Contracts_Delete_Key_Input = {
  abi?: InputMaybe<Scalars['String']>;
  functionSelectors?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "Contracts" */
export type Contracts_Inc_Input = {
  version?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "Contracts" */
export type Contracts_Insert_Input = {
  BundleContracts?: InputMaybe<BundleContracts_Arr_Rel_Insert_Input>;
  ContractInstances?: InputMaybe<ContractInstances_Arr_Rel_Insert_Input>;
  Creator?: InputMaybe<Wallets_Obj_Rel_Insert_Input>;
  CreatorId?: InputMaybe<Scalars['uuid']>;
  abi?: InputMaybe<Scalars['jsonb']>;
  bytecode?: InputMaybe<Scalars['String']>;
  contractType?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  functionSelectors?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  version?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Contracts_Max_Fields = {
  __typename?: 'Contracts_max_fields';
  CreatorId?: Maybe<Scalars['uuid']>;
  bytecode?: Maybe<Scalars['String']>;
  contractType?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  version?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "Contracts" */
export type Contracts_Max_Order_By = {
  CreatorId?: InputMaybe<Order_By>;
  bytecode?: InputMaybe<Order_By>;
  contractType?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Contracts_Min_Fields = {
  __typename?: 'Contracts_min_fields';
  CreatorId?: Maybe<Scalars['uuid']>;
  bytecode?: Maybe<Scalars['String']>;
  contractType?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  version?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "Contracts" */
export type Contracts_Min_Order_By = {
  CreatorId?: InputMaybe<Order_By>;
  bytecode?: InputMaybe<Order_By>;
  contractType?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "Contracts" */
export type Contracts_Mutation_Response = {
  __typename?: 'Contracts_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Contracts>;
};

/** input type for inserting object relation for remote table "Contracts" */
export type Contracts_Obj_Rel_Insert_Input = {
  data: Contracts_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Contracts_On_Conflict>;
};

/** on_conflict condition type for table "Contracts" */
export type Contracts_On_Conflict = {
  constraint: Contracts_Constraint;
  update_columns?: Array<Contracts_Update_Column>;
  where?: InputMaybe<Contracts_Bool_Exp>;
};

/** Ordering options when selecting data from "Contracts". */
export type Contracts_Order_By = {
  BundleContracts_aggregate?: InputMaybe<BundleContracts_Aggregate_Order_By>;
  ContractInstances_aggregate?: InputMaybe<ContractInstances_Aggregate_Order_By>;
  Creator?: InputMaybe<Wallets_Order_By>;
  CreatorId?: InputMaybe<Order_By>;
  abi?: InputMaybe<Order_By>;
  bytecode?: InputMaybe<Order_By>;
  contractType?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  functionSelectors?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  version?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Contracts */
export type Contracts_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Contracts_Prepend_Input = {
  abi?: InputMaybe<Scalars['jsonb']>;
  functionSelectors?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "Contracts" */
export enum Contracts_Select_Column {
  /** column name */
  CreatorId = 'CreatorId',
  /** column name */
  Abi = 'abi',
  /** column name */
  Bytecode = 'bytecode',
  /** column name */
  ContractType = 'contractType',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  FunctionSelectors = 'functionSelectors',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Version = 'version'
}

/** input type for updating data in table "Contracts" */
export type Contracts_Set_Input = {
  CreatorId?: InputMaybe<Scalars['uuid']>;
  abi?: InputMaybe<Scalars['jsonb']>;
  bytecode?: InputMaybe<Scalars['String']>;
  contractType?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  functionSelectors?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  version?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Contracts_Stddev_Fields = {
  __typename?: 'Contracts_stddev_fields';
  version?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "Contracts" */
export type Contracts_Stddev_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Contracts_Stddev_Pop_Fields = {
  __typename?: 'Contracts_stddev_pop_fields';
  version?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "Contracts" */
export type Contracts_Stddev_Pop_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Contracts_Stddev_Samp_Fields = {
  __typename?: 'Contracts_stddev_samp_fields';
  version?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "Contracts" */
export type Contracts_Stddev_Samp_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "Contracts" */
export type Contracts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Contracts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Contracts_Stream_Cursor_Value_Input = {
  CreatorId?: InputMaybe<Scalars['uuid']>;
  abi?: InputMaybe<Scalars['jsonb']>;
  bytecode?: InputMaybe<Scalars['String']>;
  contractType?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  functionSelectors?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  version?: InputMaybe<Scalars['Int']>;
};

/** aggregate sum on columns */
export type Contracts_Sum_Fields = {
  __typename?: 'Contracts_sum_fields';
  version?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "Contracts" */
export type Contracts_Sum_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** update columns of table "Contracts" */
export enum Contracts_Update_Column {
  /** column name */
  CreatorId = 'CreatorId',
  /** column name */
  Abi = 'abi',
  /** column name */
  Bytecode = 'bytecode',
  /** column name */
  ContractType = 'contractType',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  FunctionSelectors = 'functionSelectors',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Version = 'version'
}

export type Contracts_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Contracts_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Contracts_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Contracts_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Contracts_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Contracts_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Contracts_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Contracts_Set_Input>;
  where: Contracts_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Contracts_Var_Pop_Fields = {
  __typename?: 'Contracts_var_pop_fields';
  version?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "Contracts" */
export type Contracts_Var_Pop_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Contracts_Var_Samp_Fields = {
  __typename?: 'Contracts_var_samp_fields';
  version?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "Contracts" */
export type Contracts_Var_Samp_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Contracts_Variance_Fields = {
  __typename?: 'Contracts_variance_fields';
  version?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "Contracts" */
export type Contracts_Variance_Order_By = {
  version?: InputMaybe<Order_By>;
};

/** columns and relationships of "Extensions" */
export type Extensions = {
  __typename?: 'Extensions';
  /** An array relationship */
  AgreementExtensions: Array<AgreementExtensions>;
  /** An aggregate relationship */
  AgreementExtensions_aggregate: AgreementExtensions_Aggregate;
  /** An array relationship */
  AgreementRoleExtensions: Array<AgreementRoleExtensions>;
  /** An aggregate relationship */
  AgreementRoleExtensions_aggregate: AgreementRoleExtensions_Aggregate;
  createdAt: Scalars['timestamptz'];
  description: Scalars['String'];
  guideUrl: Scalars['String'];
  icon: Scalars['String'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  slug: Scalars['String'];
  storageDefinition: Scalars['jsonb'];
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "Extensions" */
export type ExtensionsAgreementExtensionsArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensions_Order_By>>;
  where?: InputMaybe<AgreementExtensions_Bool_Exp>;
};


/** columns and relationships of "Extensions" */
export type ExtensionsAgreementExtensions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensions_Order_By>>;
  where?: InputMaybe<AgreementExtensions_Bool_Exp>;
};


/** columns and relationships of "Extensions" */
export type ExtensionsAgreementRoleExtensionsArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleExtensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleExtensions_Order_By>>;
  where?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
};


/** columns and relationships of "Extensions" */
export type ExtensionsAgreementRoleExtensions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleExtensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleExtensions_Order_By>>;
  where?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
};


/** columns and relationships of "Extensions" */
export type ExtensionsStorageDefinitionArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "Extensions" */
export type Extensions_Aggregate = {
  __typename?: 'Extensions_aggregate';
  aggregate?: Maybe<Extensions_Aggregate_Fields>;
  nodes: Array<Extensions>;
};

/** aggregate fields of "Extensions" */
export type Extensions_Aggregate_Fields = {
  __typename?: 'Extensions_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Extensions_Max_Fields>;
  min?: Maybe<Extensions_Min_Fields>;
};


/** aggregate fields of "Extensions" */
export type Extensions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Extensions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Extensions_Append_Input = {
  storageDefinition?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "Extensions". All fields are combined with a logical 'AND'. */
export type Extensions_Bool_Exp = {
  AgreementExtensions?: InputMaybe<AgreementExtensions_Bool_Exp>;
  AgreementExtensions_aggregate?: InputMaybe<AgreementExtensions_Aggregate_Bool_Exp>;
  AgreementRoleExtensions?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
  AgreementRoleExtensions_aggregate?: InputMaybe<AgreementRoleExtensions_Aggregate_Bool_Exp>;
  _and?: InputMaybe<Array<Extensions_Bool_Exp>>;
  _not?: InputMaybe<Extensions_Bool_Exp>;
  _or?: InputMaybe<Array<Extensions_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  guideUrl?: InputMaybe<String_Comparison_Exp>;
  icon?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  storageDefinition?: InputMaybe<Jsonb_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "Extensions" */
export enum Extensions_Constraint {
  /** unique or primary key constraint on columns "id" */
  ExtensionsPkey = 'Extensions_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Extensions_Delete_At_Path_Input = {
  storageDefinition?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Extensions_Delete_Elem_Input = {
  storageDefinition?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Extensions_Delete_Key_Input = {
  storageDefinition?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "Extensions" */
export type Extensions_Insert_Input = {
  AgreementExtensions?: InputMaybe<AgreementExtensions_Arr_Rel_Insert_Input>;
  AgreementRoleExtensions?: InputMaybe<AgreementRoleExtensions_Arr_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  guideUrl?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  storageDefinition?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Extensions_Max_Fields = {
  __typename?: 'Extensions_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  guideUrl?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Extensions_Min_Fields = {
  __typename?: 'Extensions_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  guideUrl?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "Extensions" */
export type Extensions_Mutation_Response = {
  __typename?: 'Extensions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Extensions>;
};

/** input type for inserting object relation for remote table "Extensions" */
export type Extensions_Obj_Rel_Insert_Input = {
  data: Extensions_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Extensions_On_Conflict>;
};

/** on_conflict condition type for table "Extensions" */
export type Extensions_On_Conflict = {
  constraint: Extensions_Constraint;
  update_columns?: Array<Extensions_Update_Column>;
  where?: InputMaybe<Extensions_Bool_Exp>;
};

/** Ordering options when selecting data from "Extensions". */
export type Extensions_Order_By = {
  AgreementExtensions_aggregate?: InputMaybe<AgreementExtensions_Aggregate_Order_By>;
  AgreementRoleExtensions_aggregate?: InputMaybe<AgreementRoleExtensions_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  guideUrl?: InputMaybe<Order_By>;
  icon?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  storageDefinition?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Extensions */
export type Extensions_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Extensions_Prepend_Input = {
  storageDefinition?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "Extensions" */
export enum Extensions_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  GuideUrl = 'guideUrl',
  /** column name */
  Icon = 'icon',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug',
  /** column name */
  StorageDefinition = 'storageDefinition',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "Extensions" */
export type Extensions_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  guideUrl?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  storageDefinition?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "Extensions" */
export type Extensions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Extensions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Extensions_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  guideUrl?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  storageDefinition?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "Extensions" */
export enum Extensions_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  GuideUrl = 'guideUrl',
  /** column name */
  Icon = 'icon',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug',
  /** column name */
  StorageDefinition = 'storageDefinition',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Extensions_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Extensions_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Extensions_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Extensions_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Extensions_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Extensions_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Extensions_Set_Input>;
  where: Extensions_Bool_Exp;
};

/** columns and relationships of "IdentityProviders" */
export type IdentityProviders = {
  __typename?: 'IdentityProviders';
  connectionId: Scalars['String'];
  connectionName: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  description: Scalars['String'];
  icon: Scalars['String'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "IdentityProviders" */
export type IdentityProviders_Aggregate = {
  __typename?: 'IdentityProviders_aggregate';
  aggregate?: Maybe<IdentityProviders_Aggregate_Fields>;
  nodes: Array<IdentityProviders>;
};

/** aggregate fields of "IdentityProviders" */
export type IdentityProviders_Aggregate_Fields = {
  __typename?: 'IdentityProviders_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<IdentityProviders_Max_Fields>;
  min?: Maybe<IdentityProviders_Min_Fields>;
};


/** aggregate fields of "IdentityProviders" */
export type IdentityProviders_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<IdentityProviders_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "IdentityProviders". All fields are combined with a logical 'AND'. */
export type IdentityProviders_Bool_Exp = {
  _and?: InputMaybe<Array<IdentityProviders_Bool_Exp>>;
  _not?: InputMaybe<IdentityProviders_Bool_Exp>;
  _or?: InputMaybe<Array<IdentityProviders_Bool_Exp>>;
  connectionId?: InputMaybe<String_Comparison_Exp>;
  connectionName?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  icon?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "IdentityProviders" */
export enum IdentityProviders_Constraint {
  /** unique or primary key constraint on columns "id" */
  IdentityProvidersPkey = 'IdentityProviders_pkey'
}

/** input type for inserting data into table "IdentityProviders" */
export type IdentityProviders_Insert_Input = {
  connectionId?: InputMaybe<Scalars['String']>;
  connectionName?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type IdentityProviders_Max_Fields = {
  __typename?: 'IdentityProviders_max_fields';
  connectionId?: Maybe<Scalars['String']>;
  connectionName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type IdentityProviders_Min_Fields = {
  __typename?: 'IdentityProviders_min_fields';
  connectionId?: Maybe<Scalars['String']>;
  connectionName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "IdentityProviders" */
export type IdentityProviders_Mutation_Response = {
  __typename?: 'IdentityProviders_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<IdentityProviders>;
};

/** input type for inserting object relation for remote table "IdentityProviders" */
export type IdentityProviders_Obj_Rel_Insert_Input = {
  data: IdentityProviders_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<IdentityProviders_On_Conflict>;
};

/** on_conflict condition type for table "IdentityProviders" */
export type IdentityProviders_On_Conflict = {
  constraint: IdentityProviders_Constraint;
  update_columns?: Array<IdentityProviders_Update_Column>;
  where?: InputMaybe<IdentityProviders_Bool_Exp>;
};

/** Ordering options when selecting data from "IdentityProviders". */
export type IdentityProviders_Order_By = {
  connectionId?: InputMaybe<Order_By>;
  connectionName?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  icon?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: IdentityProviders */
export type IdentityProviders_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "IdentityProviders" */
export enum IdentityProviders_Select_Column {
  /** column name */
  ConnectionId = 'connectionId',
  /** column name */
  ConnectionName = 'connectionName',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Icon = 'icon',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "IdentityProviders" */
export type IdentityProviders_Set_Input = {
  connectionId?: InputMaybe<Scalars['String']>;
  connectionName?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "IdentityProviders" */
export type IdentityProviders_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: IdentityProviders_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type IdentityProviders_Stream_Cursor_Value_Input = {
  connectionId?: InputMaybe<Scalars['String']>;
  connectionName?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "IdentityProviders" */
export enum IdentityProviders_Update_Column {
  /** column name */
  ConnectionId = 'connectionId',
  /** column name */
  ConnectionName = 'connectionName',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Icon = 'icon',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type IdentityProviders_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<IdentityProviders_Set_Input>;
  where: IdentityProviders_Bool_Exp;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** columns and relationships of "Integrations" */
export type Integrations = {
  __typename?: 'Integrations';
  createdAt: Scalars['timestamptz'];
  deletedAt?: Maybe<Scalars['timestamptz']>;
  description: Scalars['String'];
  guideUrl: Scalars['String'];
  icon: Scalars['String'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "Integrations" */
export type Integrations_Aggregate = {
  __typename?: 'Integrations_aggregate';
  aggregate?: Maybe<Integrations_Aggregate_Fields>;
  nodes: Array<Integrations>;
};

/** aggregate fields of "Integrations" */
export type Integrations_Aggregate_Fields = {
  __typename?: 'Integrations_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Integrations_Max_Fields>;
  min?: Maybe<Integrations_Min_Fields>;
};


/** aggregate fields of "Integrations" */
export type Integrations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Integrations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "Integrations". All fields are combined with a logical 'AND'. */
export type Integrations_Bool_Exp = {
  _and?: InputMaybe<Array<Integrations_Bool_Exp>>;
  _not?: InputMaybe<Integrations_Bool_Exp>;
  _or?: InputMaybe<Array<Integrations_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  guideUrl?: InputMaybe<String_Comparison_Exp>;
  icon?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "Integrations" */
export enum Integrations_Constraint {
  /** unique or primary key constraint on columns "id" */
  IntegrationsPkey = 'Integrations_pkey'
}

/** input type for inserting data into table "Integrations" */
export type Integrations_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  guideUrl?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Integrations_Max_Fields = {
  __typename?: 'Integrations_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  deletedAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  guideUrl?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Integrations_Min_Fields = {
  __typename?: 'Integrations_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  deletedAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  guideUrl?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "Integrations" */
export type Integrations_Mutation_Response = {
  __typename?: 'Integrations_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Integrations>;
};

/** on_conflict condition type for table "Integrations" */
export type Integrations_On_Conflict = {
  constraint: Integrations_Constraint;
  update_columns?: Array<Integrations_Update_Column>;
  where?: InputMaybe<Integrations_Bool_Exp>;
};

/** Ordering options when selecting data from "Integrations". */
export type Integrations_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  guideUrl?: InputMaybe<Order_By>;
  icon?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Integrations */
export type Integrations_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Integrations" */
export enum Integrations_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  Description = 'description',
  /** column name */
  GuideUrl = 'guideUrl',
  /** column name */
  Icon = 'icon',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "Integrations" */
export type Integrations_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  guideUrl?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "Integrations" */
export type Integrations_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Integrations_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Integrations_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  guideUrl?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "Integrations" */
export enum Integrations_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  Description = 'description',
  /** column name */
  GuideUrl = 'guideUrl',
  /** column name */
  Icon = 'icon',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Integrations_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Integrations_Set_Input>;
  where: Integrations_Bool_Exp;
};

/** columns and relationships of "RolePermissions" */
export type RolePermissions = {
  __typename?: 'RolePermissions';
  createdAt: Scalars['timestamptz'];
  deletedAt?: Maybe<Scalars['timestamptz']>;
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "RolePermissions" */
export type RolePermissions_Aggregate = {
  __typename?: 'RolePermissions_aggregate';
  aggregate?: Maybe<RolePermissions_Aggregate_Fields>;
  nodes: Array<RolePermissions>;
};

/** aggregate fields of "RolePermissions" */
export type RolePermissions_Aggregate_Fields = {
  __typename?: 'RolePermissions_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<RolePermissions_Max_Fields>;
  min?: Maybe<RolePermissions_Min_Fields>;
};


/** aggregate fields of "RolePermissions" */
export type RolePermissions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<RolePermissions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "RolePermissions". All fields are combined with a logical 'AND'. */
export type RolePermissions_Bool_Exp = {
  _and?: InputMaybe<Array<RolePermissions_Bool_Exp>>;
  _not?: InputMaybe<RolePermissions_Bool_Exp>;
  _or?: InputMaybe<Array<RolePermissions_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "RolePermissions" */
export enum RolePermissions_Constraint {
  /** unique or primary key constraint on columns "id" */
  RolePermissionsPkey = 'RolePermissions_pkey'
}

/** input type for inserting data into table "RolePermissions" */
export type RolePermissions_Insert_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type RolePermissions_Max_Fields = {
  __typename?: 'RolePermissions_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  deletedAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type RolePermissions_Min_Fields = {
  __typename?: 'RolePermissions_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  deletedAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "RolePermissions" */
export type RolePermissions_Mutation_Response = {
  __typename?: 'RolePermissions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<RolePermissions>;
};

/** on_conflict condition type for table "RolePermissions" */
export type RolePermissions_On_Conflict = {
  constraint: RolePermissions_Constraint;
  update_columns?: Array<RolePermissions_Update_Column>;
  where?: InputMaybe<RolePermissions_Bool_Exp>;
};

/** Ordering options when selecting data from "RolePermissions". */
export type RolePermissions_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: RolePermissions */
export type RolePermissions_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "RolePermissions" */
export enum RolePermissions_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "RolePermissions" */
export type RolePermissions_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "RolePermissions" */
export type RolePermissions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: RolePermissions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type RolePermissions_Stream_Cursor_Value_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "RolePermissions" */
export enum RolePermissions_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type RolePermissions_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<RolePermissions_Set_Input>;
  where: RolePermissions_Bool_Exp;
};

/** columns and relationships of "SequelizeMeta" */
export type SequelizeMeta = {
  __typename?: 'SequelizeMeta';
  name: Scalars['String'];
};

/** aggregated selection of "SequelizeMeta" */
export type SequelizeMeta_Aggregate = {
  __typename?: 'SequelizeMeta_aggregate';
  aggregate?: Maybe<SequelizeMeta_Aggregate_Fields>;
  nodes: Array<SequelizeMeta>;
};

/** aggregate fields of "SequelizeMeta" */
export type SequelizeMeta_Aggregate_Fields = {
  __typename?: 'SequelizeMeta_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<SequelizeMeta_Max_Fields>;
  min?: Maybe<SequelizeMeta_Min_Fields>;
};


/** aggregate fields of "SequelizeMeta" */
export type SequelizeMeta_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<SequelizeMeta_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "SequelizeMeta". All fields are combined with a logical 'AND'. */
export type SequelizeMeta_Bool_Exp = {
  _and?: InputMaybe<Array<SequelizeMeta_Bool_Exp>>;
  _not?: InputMaybe<SequelizeMeta_Bool_Exp>;
  _or?: InputMaybe<Array<SequelizeMeta_Bool_Exp>>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "SequelizeMeta" */
export enum SequelizeMeta_Constraint {
  /** unique or primary key constraint on columns "name" */
  SequelizeMetaPkey = 'SequelizeMeta_pkey'
}

/** input type for inserting data into table "SequelizeMeta" */
export type SequelizeMeta_Insert_Input = {
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type SequelizeMeta_Max_Fields = {
  __typename?: 'SequelizeMeta_max_fields';
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type SequelizeMeta_Min_Fields = {
  __typename?: 'SequelizeMeta_min_fields';
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "SequelizeMeta" */
export type SequelizeMeta_Mutation_Response = {
  __typename?: 'SequelizeMeta_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<SequelizeMeta>;
};

/** on_conflict condition type for table "SequelizeMeta" */
export type SequelizeMeta_On_Conflict = {
  constraint: SequelizeMeta_Constraint;
  update_columns?: Array<SequelizeMeta_Update_Column>;
  where?: InputMaybe<SequelizeMeta_Bool_Exp>;
};

/** Ordering options when selecting data from "SequelizeMeta". */
export type SequelizeMeta_Order_By = {
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: SequelizeMeta */
export type SequelizeMeta_Pk_Columns_Input = {
  name: Scalars['String'];
};

/** select columns of table "SequelizeMeta" */
export enum SequelizeMeta_Select_Column {
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "SequelizeMeta" */
export type SequelizeMeta_Set_Input = {
  name?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "SequelizeMeta" */
export type SequelizeMeta_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: SequelizeMeta_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type SequelizeMeta_Stream_Cursor_Value_Input = {
  name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "SequelizeMeta" */
export enum SequelizeMeta_Update_Column {
  /** column name */
  Name = 'name'
}

export type SequelizeMeta_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<SequelizeMeta_Set_Input>;
  where: SequelizeMeta_Bool_Exp;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "Transactions" */
export type Transactions = {
  __typename?: 'Transactions';
  /** An array relationship */
  AgreementRoles: Array<AgreementRoles>;
  /** An aggregate relationship */
  AgreementRoles_aggregate: AgreementRoles_Aggregate;
  /** An array relationship */
  AgreementTokens: Array<AgreementTokens>;
  /** An aggregate relationship */
  AgreementTokens_aggregate: AgreementTokens_Aggregate;
  /** An array relationship */
  Agreements: Array<Agreements>;
  /** An aggregate relationship */
  Agreements_aggregate: Agreements_Aggregate;
  /** An object relationship */
  Wallet?: Maybe<Wallets>;
  WalletId?: Maybe<Scalars['uuid']>;
  chainId: Scalars['Int'];
  createdAt: Scalars['timestamptz'];
  customABI?: Maybe<Scalars['jsonb']>;
  hash?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  status: Scalars['String'];
  transactionInput: Scalars['jsonb'];
  transactionType: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "Transactions" */
export type TransactionsAgreementRolesArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoles_Order_By>>;
  where?: InputMaybe<AgreementRoles_Bool_Exp>;
};


/** columns and relationships of "Transactions" */
export type TransactionsAgreementRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoles_Order_By>>;
  where?: InputMaybe<AgreementRoles_Bool_Exp>;
};


/** columns and relationships of "Transactions" */
export type TransactionsAgreementTokensArgs = {
  distinct_on?: InputMaybe<Array<AgreementTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementTokens_Order_By>>;
  where?: InputMaybe<AgreementTokens_Bool_Exp>;
};


/** columns and relationships of "Transactions" */
export type TransactionsAgreementTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementTokens_Order_By>>;
  where?: InputMaybe<AgreementTokens_Bool_Exp>;
};


/** columns and relationships of "Transactions" */
export type TransactionsAgreementsArgs = {
  distinct_on?: InputMaybe<Array<Agreements_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Agreements_Order_By>>;
  where?: InputMaybe<Agreements_Bool_Exp>;
};


/** columns and relationships of "Transactions" */
export type TransactionsAgreements_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Agreements_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Agreements_Order_By>>;
  where?: InputMaybe<Agreements_Bool_Exp>;
};


/** columns and relationships of "Transactions" */
export type TransactionsCustomAbiArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "Transactions" */
export type TransactionsTransactionInputArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "Transactions" */
export type Transactions_Aggregate = {
  __typename?: 'Transactions_aggregate';
  aggregate?: Maybe<Transactions_Aggregate_Fields>;
  nodes: Array<Transactions>;
};

export type Transactions_Aggregate_Bool_Exp = {
  count?: InputMaybe<Transactions_Aggregate_Bool_Exp_Count>;
};

export type Transactions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Transactions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Transactions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "Transactions" */
export type Transactions_Aggregate_Fields = {
  __typename?: 'Transactions_aggregate_fields';
  avg?: Maybe<Transactions_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Transactions_Max_Fields>;
  min?: Maybe<Transactions_Min_Fields>;
  stddev?: Maybe<Transactions_Stddev_Fields>;
  stddev_pop?: Maybe<Transactions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Transactions_Stddev_Samp_Fields>;
  sum?: Maybe<Transactions_Sum_Fields>;
  var_pop?: Maybe<Transactions_Var_Pop_Fields>;
  var_samp?: Maybe<Transactions_Var_Samp_Fields>;
  variance?: Maybe<Transactions_Variance_Fields>;
};


/** aggregate fields of "Transactions" */
export type Transactions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Transactions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Transactions" */
export type Transactions_Aggregate_Order_By = {
  avg?: InputMaybe<Transactions_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Transactions_Max_Order_By>;
  min?: InputMaybe<Transactions_Min_Order_By>;
  stddev?: InputMaybe<Transactions_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Transactions_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Transactions_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Transactions_Sum_Order_By>;
  var_pop?: InputMaybe<Transactions_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Transactions_Var_Samp_Order_By>;
  variance?: InputMaybe<Transactions_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Transactions_Append_Input = {
  customABI?: InputMaybe<Scalars['jsonb']>;
  transactionInput?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "Transactions" */
export type Transactions_Arr_Rel_Insert_Input = {
  data: Array<Transactions_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Transactions_On_Conflict>;
};

/** aggregate avg on columns */
export type Transactions_Avg_Fields = {
  __typename?: 'Transactions_avg_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "Transactions" */
export type Transactions_Avg_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Transactions". All fields are combined with a logical 'AND'. */
export type Transactions_Bool_Exp = {
  AgreementRoles?: InputMaybe<AgreementRoles_Bool_Exp>;
  AgreementRoles_aggregate?: InputMaybe<AgreementRoles_Aggregate_Bool_Exp>;
  AgreementTokens?: InputMaybe<AgreementTokens_Bool_Exp>;
  AgreementTokens_aggregate?: InputMaybe<AgreementTokens_Aggregate_Bool_Exp>;
  Agreements?: InputMaybe<Agreements_Bool_Exp>;
  Agreements_aggregate?: InputMaybe<Agreements_Aggregate_Bool_Exp>;
  Wallet?: InputMaybe<Wallets_Bool_Exp>;
  WalletId?: InputMaybe<Uuid_Comparison_Exp>;
  _and?: InputMaybe<Array<Transactions_Bool_Exp>>;
  _not?: InputMaybe<Transactions_Bool_Exp>;
  _or?: InputMaybe<Array<Transactions_Bool_Exp>>;
  chainId?: InputMaybe<Int_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  customABI?: InputMaybe<Jsonb_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  transactionInput?: InputMaybe<Jsonb_Comparison_Exp>;
  transactionType?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "Transactions" */
export enum Transactions_Constraint {
  /** unique or primary key constraint on columns "id" */
  TransactionsPkey = 'Transactions_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Transactions_Delete_At_Path_Input = {
  customABI?: InputMaybe<Array<Scalars['String']>>;
  transactionInput?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Transactions_Delete_Elem_Input = {
  customABI?: InputMaybe<Scalars['Int']>;
  transactionInput?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Transactions_Delete_Key_Input = {
  customABI?: InputMaybe<Scalars['String']>;
  transactionInput?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "Transactions" */
export type Transactions_Inc_Input = {
  chainId?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "Transactions" */
export type Transactions_Insert_Input = {
  AgreementRoles?: InputMaybe<AgreementRoles_Arr_Rel_Insert_Input>;
  AgreementTokens?: InputMaybe<AgreementTokens_Arr_Rel_Insert_Input>;
  Agreements?: InputMaybe<Agreements_Arr_Rel_Insert_Input>;
  Wallet?: InputMaybe<Wallets_Obj_Rel_Insert_Input>;
  WalletId?: InputMaybe<Scalars['uuid']>;
  chainId?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  customABI?: InputMaybe<Scalars['jsonb']>;
  hash?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Scalars['String']>;
  transactionInput?: InputMaybe<Scalars['jsonb']>;
  transactionType?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Transactions_Max_Fields = {
  __typename?: 'Transactions_max_fields';
  WalletId?: Maybe<Scalars['uuid']>;
  chainId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  hash?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  status?: Maybe<Scalars['String']>;
  transactionType?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "Transactions" */
export type Transactions_Max_Order_By = {
  WalletId?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  transactionType?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Transactions_Min_Fields = {
  __typename?: 'Transactions_min_fields';
  WalletId?: Maybe<Scalars['uuid']>;
  chainId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  hash?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  status?: Maybe<Scalars['String']>;
  transactionType?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "Transactions" */
export type Transactions_Min_Order_By = {
  WalletId?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  transactionType?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "Transactions" */
export type Transactions_Mutation_Response = {
  __typename?: 'Transactions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Transactions>;
};

/** input type for inserting object relation for remote table "Transactions" */
export type Transactions_Obj_Rel_Insert_Input = {
  data: Transactions_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Transactions_On_Conflict>;
};

/** on_conflict condition type for table "Transactions" */
export type Transactions_On_Conflict = {
  constraint: Transactions_Constraint;
  update_columns?: Array<Transactions_Update_Column>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};

/** Ordering options when selecting data from "Transactions". */
export type Transactions_Order_By = {
  AgreementRoles_aggregate?: InputMaybe<AgreementRoles_Aggregate_Order_By>;
  AgreementTokens_aggregate?: InputMaybe<AgreementTokens_Aggregate_Order_By>;
  Agreements_aggregate?: InputMaybe<Agreements_Aggregate_Order_By>;
  Wallet?: InputMaybe<Wallets_Order_By>;
  WalletId?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  customABI?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  transactionInput?: InputMaybe<Order_By>;
  transactionType?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Transactions */
export type Transactions_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Transactions_Prepend_Input = {
  customABI?: InputMaybe<Scalars['jsonb']>;
  transactionInput?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "Transactions" */
export enum Transactions_Select_Column {
  /** column name */
  WalletId = 'WalletId',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CustomAbi = 'customABI',
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  Status = 'status',
  /** column name */
  TransactionInput = 'transactionInput',
  /** column name */
  TransactionType = 'transactionType',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "Transactions" */
export type Transactions_Set_Input = {
  WalletId?: InputMaybe<Scalars['uuid']>;
  chainId?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  customABI?: InputMaybe<Scalars['jsonb']>;
  hash?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Scalars['String']>;
  transactionInput?: InputMaybe<Scalars['jsonb']>;
  transactionType?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Transactions_Stddev_Fields = {
  __typename?: 'Transactions_stddev_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "Transactions" */
export type Transactions_Stddev_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Transactions_Stddev_Pop_Fields = {
  __typename?: 'Transactions_stddev_pop_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "Transactions" */
export type Transactions_Stddev_Pop_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Transactions_Stddev_Samp_Fields = {
  __typename?: 'Transactions_stddev_samp_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "Transactions" */
export type Transactions_Stddev_Samp_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "Transactions" */
export type Transactions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Transactions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Transactions_Stream_Cursor_Value_Input = {
  WalletId?: InputMaybe<Scalars['uuid']>;
  chainId?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  customABI?: InputMaybe<Scalars['jsonb']>;
  hash?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Scalars['String']>;
  transactionInput?: InputMaybe<Scalars['jsonb']>;
  transactionType?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type Transactions_Sum_Fields = {
  __typename?: 'Transactions_sum_fields';
  chainId?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "Transactions" */
export type Transactions_Sum_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** update columns of table "Transactions" */
export enum Transactions_Update_Column {
  /** column name */
  WalletId = 'WalletId',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CustomAbi = 'customABI',
  /** column name */
  Hash = 'hash',
  /** column name */
  Id = 'id',
  /** column name */
  Status = 'status',
  /** column name */
  TransactionInput = 'transactionInput',
  /** column name */
  TransactionType = 'transactionType',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Transactions_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Transactions_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Transactions_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Transactions_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Transactions_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Transactions_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Transactions_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Transactions_Set_Input>;
  where: Transactions_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Transactions_Var_Pop_Fields = {
  __typename?: 'Transactions_var_pop_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "Transactions" */
export type Transactions_Var_Pop_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Transactions_Var_Samp_Fields = {
  __typename?: 'Transactions_var_samp_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "Transactions" */
export type Transactions_Var_Samp_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Transactions_Variance_Fields = {
  __typename?: 'Transactions_variance_fields';
  chainId?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "Transactions" */
export type Transactions_Variance_Order_By = {
  chainId?: InputMaybe<Order_By>;
};

/** columns and relationships of "Transfers" */
export type Transfers = {
  __typename?: 'Transfers';
  MeemId?: Maybe<Scalars['uuid']>;
  createdAt: Scalars['timestamptz'];
  deletedAt?: Maybe<Scalars['timestamptz']>;
  from: Scalars['String'];
  id: Scalars['uuid'];
  to: Scalars['String'];
  transactionHash: Scalars['String'];
  transferredAt: Scalars['timestamptz'];
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "Transfers" */
export type Transfers_Aggregate = {
  __typename?: 'Transfers_aggregate';
  aggregate?: Maybe<Transfers_Aggregate_Fields>;
  nodes: Array<Transfers>;
};

/** aggregate fields of "Transfers" */
export type Transfers_Aggregate_Fields = {
  __typename?: 'Transfers_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Transfers_Max_Fields>;
  min?: Maybe<Transfers_Min_Fields>;
};


/** aggregate fields of "Transfers" */
export type Transfers_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Transfers_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "Transfers". All fields are combined with a logical 'AND'. */
export type Transfers_Bool_Exp = {
  MeemId?: InputMaybe<Uuid_Comparison_Exp>;
  _and?: InputMaybe<Array<Transfers_Bool_Exp>>;
  _not?: InputMaybe<Transfers_Bool_Exp>;
  _or?: InputMaybe<Array<Transfers_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  deletedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  from?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  to?: InputMaybe<String_Comparison_Exp>;
  transactionHash?: InputMaybe<String_Comparison_Exp>;
  transferredAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "Transfers" */
export enum Transfers_Constraint {
  /** unique or primary key constraint on columns "id" */
  TransfersPkey = 'Transfers_pkey'
}

/** input type for inserting data into table "Transfers" */
export type Transfers_Insert_Input = {
  MeemId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  from?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  to?: InputMaybe<Scalars['String']>;
  transactionHash?: InputMaybe<Scalars['String']>;
  transferredAt?: InputMaybe<Scalars['timestamptz']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Transfers_Max_Fields = {
  __typename?: 'Transfers_max_fields';
  MeemId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  deletedAt?: Maybe<Scalars['timestamptz']>;
  from?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  to?: Maybe<Scalars['String']>;
  transactionHash?: Maybe<Scalars['String']>;
  transferredAt?: Maybe<Scalars['timestamptz']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Transfers_Min_Fields = {
  __typename?: 'Transfers_min_fields';
  MeemId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  deletedAt?: Maybe<Scalars['timestamptz']>;
  from?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  to?: Maybe<Scalars['String']>;
  transactionHash?: Maybe<Scalars['String']>;
  transferredAt?: Maybe<Scalars['timestamptz']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "Transfers" */
export type Transfers_Mutation_Response = {
  __typename?: 'Transfers_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Transfers>;
};

/** on_conflict condition type for table "Transfers" */
export type Transfers_On_Conflict = {
  constraint: Transfers_Constraint;
  update_columns?: Array<Transfers_Update_Column>;
  where?: InputMaybe<Transfers_Bool_Exp>;
};

/** Ordering options when selecting data from "Transfers". */
export type Transfers_Order_By = {
  MeemId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  deletedAt?: InputMaybe<Order_By>;
  from?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  to?: InputMaybe<Order_By>;
  transactionHash?: InputMaybe<Order_By>;
  transferredAt?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Transfers */
export type Transfers_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Transfers" */
export enum Transfers_Select_Column {
  /** column name */
  MeemId = 'MeemId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  From = 'from',
  /** column name */
  Id = 'id',
  /** column name */
  To = 'to',
  /** column name */
  TransactionHash = 'transactionHash',
  /** column name */
  TransferredAt = 'transferredAt',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "Transfers" */
export type Transfers_Set_Input = {
  MeemId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  from?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  to?: InputMaybe<Scalars['String']>;
  transactionHash?: InputMaybe<Scalars['String']>;
  transferredAt?: InputMaybe<Scalars['timestamptz']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "Transfers" */
export type Transfers_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Transfers_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Transfers_Stream_Cursor_Value_Input = {
  MeemId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  deletedAt?: InputMaybe<Scalars['timestamptz']>;
  from?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  to?: InputMaybe<Scalars['String']>;
  transactionHash?: InputMaybe<Scalars['String']>;
  transferredAt?: InputMaybe<Scalars['timestamptz']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "Transfers" */
export enum Transfers_Update_Column {
  /** column name */
  MeemId = 'MeemId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DeletedAt = 'deletedAt',
  /** column name */
  From = 'from',
  /** column name */
  Id = 'id',
  /** column name */
  To = 'to',
  /** column name */
  TransactionHash = 'transactionHash',
  /** column name */
  TransferredAt = 'transferredAt',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Transfers_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Transfers_Set_Input>;
  where: Transfers_Bool_Exp;
};

/** columns and relationships of "UserIdentities" */
export type UserIdentities = {
  __typename?: 'UserIdentities';
  /** An object relationship */
  IdentityProvider?: Maybe<IdentityProviders>;
  IdentityProviderId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  User?: Maybe<Users>;
  UserId?: Maybe<Scalars['uuid']>;
  createdAt: Scalars['timestamptz'];
  externalId?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  metadata: Scalars['jsonb'];
  updatedAt: Scalars['timestamptz'];
  visibility: Scalars['String'];
};


/** columns and relationships of "UserIdentities" */
export type UserIdentitiesMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "UserIdentities" */
export type UserIdentities_Aggregate = {
  __typename?: 'UserIdentities_aggregate';
  aggregate?: Maybe<UserIdentities_Aggregate_Fields>;
  nodes: Array<UserIdentities>;
};

export type UserIdentities_Aggregate_Bool_Exp = {
  count?: InputMaybe<UserIdentities_Aggregate_Bool_Exp_Count>;
};

export type UserIdentities_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<UserIdentities_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<UserIdentities_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "UserIdentities" */
export type UserIdentities_Aggregate_Fields = {
  __typename?: 'UserIdentities_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<UserIdentities_Max_Fields>;
  min?: Maybe<UserIdentities_Min_Fields>;
};


/** aggregate fields of "UserIdentities" */
export type UserIdentities_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<UserIdentities_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "UserIdentities" */
export type UserIdentities_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<UserIdentities_Max_Order_By>;
  min?: InputMaybe<UserIdentities_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type UserIdentities_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "UserIdentities" */
export type UserIdentities_Arr_Rel_Insert_Input = {
  data: Array<UserIdentities_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<UserIdentities_On_Conflict>;
};

/** Boolean expression to filter rows from the table "UserIdentities". All fields are combined with a logical 'AND'. */
export type UserIdentities_Bool_Exp = {
  IdentityProvider?: InputMaybe<IdentityProviders_Bool_Exp>;
  IdentityProviderId?: InputMaybe<Uuid_Comparison_Exp>;
  User?: InputMaybe<Users_Bool_Exp>;
  UserId?: InputMaybe<Uuid_Comparison_Exp>;
  _and?: InputMaybe<Array<UserIdentities_Bool_Exp>>;
  _not?: InputMaybe<UserIdentities_Bool_Exp>;
  _or?: InputMaybe<Array<UserIdentities_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  externalId?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  visibility?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "UserIdentities" */
export enum UserIdentities_Constraint {
  /** unique or primary key constraint on columns "externalId" */
  UserIdentitiesExternalIdKey = 'UserIdentities_externalId_key',
  /** unique or primary key constraint on columns "externalId" */
  UserIdentitiesExternalIdKey1 = 'UserIdentities_externalId_key1',
  /** unique or primary key constraint on columns "id" */
  UserIdentitiesPkey = 'UserIdentities_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type UserIdentities_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type UserIdentities_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type UserIdentities_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "UserIdentities" */
export type UserIdentities_Insert_Input = {
  IdentityProvider?: InputMaybe<IdentityProviders_Obj_Rel_Insert_Input>;
  IdentityProviderId?: InputMaybe<Scalars['uuid']>;
  User?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  UserId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  externalId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  visibility?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type UserIdentities_Max_Fields = {
  __typename?: 'UserIdentities_max_fields';
  IdentityProviderId?: Maybe<Scalars['uuid']>;
  UserId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  externalId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  visibility?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "UserIdentities" */
export type UserIdentities_Max_Order_By = {
  IdentityProviderId?: InputMaybe<Order_By>;
  UserId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  externalId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  visibility?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type UserIdentities_Min_Fields = {
  __typename?: 'UserIdentities_min_fields';
  IdentityProviderId?: Maybe<Scalars['uuid']>;
  UserId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  externalId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  visibility?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "UserIdentities" */
export type UserIdentities_Min_Order_By = {
  IdentityProviderId?: InputMaybe<Order_By>;
  UserId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  externalId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  visibility?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "UserIdentities" */
export type UserIdentities_Mutation_Response = {
  __typename?: 'UserIdentities_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<UserIdentities>;
};

/** on_conflict condition type for table "UserIdentities" */
export type UserIdentities_On_Conflict = {
  constraint: UserIdentities_Constraint;
  update_columns?: Array<UserIdentities_Update_Column>;
  where?: InputMaybe<UserIdentities_Bool_Exp>;
};

/** Ordering options when selecting data from "UserIdentities". */
export type UserIdentities_Order_By = {
  IdentityProvider?: InputMaybe<IdentityProviders_Order_By>;
  IdentityProviderId?: InputMaybe<Order_By>;
  User?: InputMaybe<Users_Order_By>;
  UserId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  externalId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  visibility?: InputMaybe<Order_By>;
};

/** primary key columns input for table: UserIdentities */
export type UserIdentities_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type UserIdentities_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "UserIdentities" */
export enum UserIdentities_Select_Column {
  /** column name */
  IdentityProviderId = 'IdentityProviderId',
  /** column name */
  UserId = 'UserId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ExternalId = 'externalId',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Visibility = 'visibility'
}

/** input type for updating data in table "UserIdentities" */
export type UserIdentities_Set_Input = {
  IdentityProviderId?: InputMaybe<Scalars['uuid']>;
  UserId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  externalId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  visibility?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "UserIdentities" */
export type UserIdentities_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: UserIdentities_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type UserIdentities_Stream_Cursor_Value_Input = {
  IdentityProviderId?: InputMaybe<Scalars['uuid']>;
  UserId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  externalId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  visibility?: InputMaybe<Scalars['String']>;
};

/** update columns of table "UserIdentities" */
export enum UserIdentities_Update_Column {
  /** column name */
  IdentityProviderId = 'IdentityProviderId',
  /** column name */
  UserId = 'UserId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ExternalId = 'externalId',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Visibility = 'visibility'
}

export type UserIdentities_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<UserIdentities_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<UserIdentities_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<UserIdentities_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<UserIdentities_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<UserIdentities_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<UserIdentities_Set_Input>;
  where: UserIdentities_Bool_Exp;
};

/** columns and relationships of "Users" */
export type Users = {
  __typename?: 'Users';
  /** An object relationship */
  DefaultWallet?: Maybe<Wallets>;
  DefaultWalletId?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  UserIdentities: Array<UserIdentities>;
  /** An aggregate relationship */
  UserIdentities_aggregate: UserIdentities_Aggregate;
  /** An array relationship */
  Wallets: Array<Wallets>;
  /** An aggregate relationship */
  Wallets_aggregate: Wallets_Aggregate;
  createdAt: Scalars['timestamptz'];
  displayName?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  profilePicUrl?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "Users" */
export type UsersUserIdentitiesArgs = {
  distinct_on?: InputMaybe<Array<UserIdentities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserIdentities_Order_By>>;
  where?: InputMaybe<UserIdentities_Bool_Exp>;
};


/** columns and relationships of "Users" */
export type UsersUserIdentities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<UserIdentities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserIdentities_Order_By>>;
  where?: InputMaybe<UserIdentities_Bool_Exp>;
};


/** columns and relationships of "Users" */
export type UsersWalletsArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};


/** columns and relationships of "Users" */
export type UsersWallets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};

/** aggregated selection of "Users" */
export type Users_Aggregate = {
  __typename?: 'Users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

export type Users_Aggregate_Bool_Exp = {
  count?: InputMaybe<Users_Aggregate_Bool_Exp_Count>;
};

export type Users_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Users_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "Users" */
export type Users_Aggregate_Fields = {
  __typename?: 'Users_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "Users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Users" */
export type Users_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Users_Max_Order_By>;
  min?: InputMaybe<Users_Min_Order_By>;
};

/** input type for inserting array relation for remote table "Users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "Users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  DefaultWallet?: InputMaybe<Wallets_Bool_Exp>;
  DefaultWalletId?: InputMaybe<Uuid_Comparison_Exp>;
  UserIdentities?: InputMaybe<UserIdentities_Bool_Exp>;
  UserIdentities_aggregate?: InputMaybe<UserIdentities_Aggregate_Bool_Exp>;
  Wallets?: InputMaybe<Wallets_Bool_Exp>;
  Wallets_aggregate?: InputMaybe<Wallets_Aggregate_Bool_Exp>;
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  displayName?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  profilePicUrl?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "Users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'Users_pkey'
}

/** input type for inserting data into table "Users" */
export type Users_Insert_Input = {
  DefaultWallet?: InputMaybe<Wallets_Obj_Rel_Insert_Input>;
  DefaultWalletId?: InputMaybe<Scalars['uuid']>;
  UserIdentities?: InputMaybe<UserIdentities_Arr_Rel_Insert_Input>;
  Wallets?: InputMaybe<Wallets_Arr_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  displayName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  profilePicUrl?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'Users_max_fields';
  DefaultWalletId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  displayName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  profilePicUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "Users" */
export type Users_Max_Order_By = {
  DefaultWalletId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  displayName?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  profilePicUrl?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'Users_min_fields';
  DefaultWalletId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  displayName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  profilePicUrl?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "Users" */
export type Users_Min_Order_By = {
  DefaultWalletId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  displayName?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  profilePicUrl?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "Users" */
export type Users_Mutation_Response = {
  __typename?: 'Users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "Users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "Users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "Users". */
export type Users_Order_By = {
  DefaultWallet?: InputMaybe<Wallets_Order_By>;
  DefaultWalletId?: InputMaybe<Order_By>;
  UserIdentities_aggregate?: InputMaybe<UserIdentities_Aggregate_Order_By>;
  Wallets_aggregate?: InputMaybe<Wallets_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  displayName?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  profilePicUrl?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Users */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Users" */
export enum Users_Select_Column {
  /** column name */
  DefaultWalletId = 'DefaultWalletId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DisplayName = 'displayName',
  /** column name */
  Id = 'id',
  /** column name */
  ProfilePicUrl = 'profilePicUrl',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "Users" */
export type Users_Set_Input = {
  DefaultWalletId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  displayName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  profilePicUrl?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "Users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  DefaultWalletId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  displayName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  profilePicUrl?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "Users" */
export enum Users_Update_Column {
  /** column name */
  DefaultWalletId = 'DefaultWalletId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DisplayName = 'displayName',
  /** column name */
  Id = 'id',
  /** column name */
  ProfilePicUrl = 'profilePicUrl',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Users_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};

/** columns and relationships of "WalletContractInstances" */
export type WalletContractInstances = {
  __typename?: 'WalletContractInstances';
  /** An object relationship */
  ContractInstance?: Maybe<ContractInstances>;
  ContractInstanceId?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  Wallet?: Maybe<Wallets>;
  WalletId?: Maybe<Scalars['uuid']>;
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "WalletContractInstances" */
export type WalletContractInstances_Aggregate = {
  __typename?: 'WalletContractInstances_aggregate';
  aggregate?: Maybe<WalletContractInstances_Aggregate_Fields>;
  nodes: Array<WalletContractInstances>;
};

export type WalletContractInstances_Aggregate_Bool_Exp = {
  count?: InputMaybe<WalletContractInstances_Aggregate_Bool_Exp_Count>;
};

export type WalletContractInstances_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<WalletContractInstances_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<WalletContractInstances_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "WalletContractInstances" */
export type WalletContractInstances_Aggregate_Fields = {
  __typename?: 'WalletContractInstances_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<WalletContractInstances_Max_Fields>;
  min?: Maybe<WalletContractInstances_Min_Fields>;
};


/** aggregate fields of "WalletContractInstances" */
export type WalletContractInstances_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<WalletContractInstances_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "WalletContractInstances" */
export type WalletContractInstances_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<WalletContractInstances_Max_Order_By>;
  min?: InputMaybe<WalletContractInstances_Min_Order_By>;
};

/** input type for inserting array relation for remote table "WalletContractInstances" */
export type WalletContractInstances_Arr_Rel_Insert_Input = {
  data: Array<WalletContractInstances_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<WalletContractInstances_On_Conflict>;
};

/** Boolean expression to filter rows from the table "WalletContractInstances". All fields are combined with a logical 'AND'. */
export type WalletContractInstances_Bool_Exp = {
  ContractInstance?: InputMaybe<ContractInstances_Bool_Exp>;
  ContractInstanceId?: InputMaybe<Uuid_Comparison_Exp>;
  Wallet?: InputMaybe<Wallets_Bool_Exp>;
  WalletId?: InputMaybe<Uuid_Comparison_Exp>;
  _and?: InputMaybe<Array<WalletContractInstances_Bool_Exp>>;
  _not?: InputMaybe<WalletContractInstances_Bool_Exp>;
  _or?: InputMaybe<Array<WalletContractInstances_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  note?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "WalletContractInstances" */
export enum WalletContractInstances_Constraint {
  /** unique or primary key constraint on columns "id" */
  WalletContractInstancesPkey = 'WalletContractInstances_pkey'
}

/** input type for inserting data into table "WalletContractInstances" */
export type WalletContractInstances_Insert_Input = {
  ContractInstance?: InputMaybe<ContractInstances_Obj_Rel_Insert_Input>;
  ContractInstanceId?: InputMaybe<Scalars['uuid']>;
  Wallet?: InputMaybe<Wallets_Obj_Rel_Insert_Input>;
  WalletId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type WalletContractInstances_Max_Fields = {
  __typename?: 'WalletContractInstances_max_fields';
  ContractInstanceId?: Maybe<Scalars['uuid']>;
  WalletId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "WalletContractInstances" */
export type WalletContractInstances_Max_Order_By = {
  ContractInstanceId?: InputMaybe<Order_By>;
  WalletId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  note?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type WalletContractInstances_Min_Fields = {
  __typename?: 'WalletContractInstances_min_fields';
  ContractInstanceId?: Maybe<Scalars['uuid']>;
  WalletId?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "WalletContractInstances" */
export type WalletContractInstances_Min_Order_By = {
  ContractInstanceId?: InputMaybe<Order_By>;
  WalletId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  note?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "WalletContractInstances" */
export type WalletContractInstances_Mutation_Response = {
  __typename?: 'WalletContractInstances_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<WalletContractInstances>;
};

/** on_conflict condition type for table "WalletContractInstances" */
export type WalletContractInstances_On_Conflict = {
  constraint: WalletContractInstances_Constraint;
  update_columns?: Array<WalletContractInstances_Update_Column>;
  where?: InputMaybe<WalletContractInstances_Bool_Exp>;
};

/** Ordering options when selecting data from "WalletContractInstances". */
export type WalletContractInstances_Order_By = {
  ContractInstance?: InputMaybe<ContractInstances_Order_By>;
  ContractInstanceId?: InputMaybe<Order_By>;
  Wallet?: InputMaybe<Wallets_Order_By>;
  WalletId?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  note?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: WalletContractInstances */
export type WalletContractInstances_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "WalletContractInstances" */
export enum WalletContractInstances_Select_Column {
  /** column name */
  ContractInstanceId = 'ContractInstanceId',
  /** column name */
  WalletId = 'WalletId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Note = 'note',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "WalletContractInstances" */
export type WalletContractInstances_Set_Input = {
  ContractInstanceId?: InputMaybe<Scalars['uuid']>;
  WalletId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** Streaming cursor of the table "WalletContractInstances" */
export type WalletContractInstances_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: WalletContractInstances_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type WalletContractInstances_Stream_Cursor_Value_Input = {
  ContractInstanceId?: InputMaybe<Scalars['uuid']>;
  WalletId?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "WalletContractInstances" */
export enum WalletContractInstances_Update_Column {
  /** column name */
  ContractInstanceId = 'ContractInstanceId',
  /** column name */
  WalletId = 'WalletId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Note = 'note',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type WalletContractInstances_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<WalletContractInstances_Set_Input>;
  where: WalletContractInstances_Bool_Exp;
};

/** columns and relationships of "Wallets" */
export type Wallets = {
  __typename?: 'Wallets';
  /** An array relationship */
  AgreementRoleTokens: Array<AgreementRoleTokens>;
  /** An aggregate relationship */
  AgreementRoleTokens_aggregate: AgreementRoleTokens_Aggregate;
  /** An array relationship */
  AgreementRoles: Array<AgreementRoles>;
  /** An aggregate relationship */
  AgreementRoles_aggregate: AgreementRoles_Aggregate;
  /** An array relationship */
  AgreementTokens: Array<AgreementTokens>;
  /** An aggregate relationship */
  AgreementTokens_aggregate: AgreementTokens_Aggregate;
  /** An array relationship */
  AgreementWallets: Array<AgreementWallets>;
  /** An aggregate relationship */
  AgreementWallets_aggregate: AgreementWallets_Aggregate;
  /** An array relationship */
  Agreements: Array<Agreements>;
  /** An aggregate relationship */
  Agreements_aggregate: Agreements_Aggregate;
  /** An array relationship */
  Bundles: Array<Bundles>;
  /** An aggregate relationship */
  Bundles_aggregate: Bundles_Aggregate;
  /** An array relationship */
  Contracts: Array<Contracts>;
  /** An aggregate relationship */
  Contracts_aggregate: Contracts_Aggregate;
  /** An array relationship */
  Transactions: Array<Transactions>;
  /** An aggregate relationship */
  Transactions_aggregate: Transactions_Aggregate;
  /** An object relationship */
  User?: Maybe<Users>;
  UserId?: Maybe<Scalars['uuid']>;
  /** An array relationship */
  Users: Array<Users>;
  /** An aggregate relationship */
  Users_aggregate: Users_Aggregate;
  /** An array relationship */
  WalletContractInstances: Array<WalletContractInstances>;
  /** An aggregate relationship */
  WalletContractInstances_aggregate: WalletContractInstances_Aggregate;
  address: Scalars['String'];
  apiKey?: Maybe<Scalars['uuid']>;
  createdAt: Scalars['timestamptz'];
  dailyTXLimit: Scalars['Int'];
  ens?: Maybe<Scalars['String']>;
  ensFetchedAt?: Maybe<Scalars['timestamptz']>;
  id: Scalars['uuid'];
  nonce?: Maybe<Scalars['String']>;
  pkpTokenId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "Wallets" */
export type WalletsAgreementRoleTokensArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleTokens_Order_By>>;
  where?: InputMaybe<AgreementRoleTokens_Bool_Exp>;
};


/** columns and relationships of "Wallets" */
export type WalletsAgreementRoleTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleTokens_Order_By>>;
  where?: InputMaybe<AgreementRoleTokens_Bool_Exp>;
};


/** columns and relationships of "Wallets" */
export type WalletsAgreementRolesArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoles_Order_By>>;
  where?: InputMaybe<AgreementRoles_Bool_Exp>;
};


/** columns and relationships of "Wallets" */
export type WalletsAgreementRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoles_Order_By>>;
  where?: InputMaybe<AgreementRoles_Bool_Exp>;
};


/** columns and relationships of "Wallets" */
export type WalletsAgreementTokensArgs = {
  distinct_on?: InputMaybe<Array<AgreementTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementTokens_Order_By>>;
  where?: InputMaybe<AgreementTokens_Bool_Exp>;
};


/** columns and relationships of "Wallets" */
export type WalletsAgreementTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementTokens_Order_By>>;
  where?: InputMaybe<AgreementTokens_Bool_Exp>;
};


/** columns and relationships of "Wallets" */
export type WalletsAgreementWalletsArgs = {
  distinct_on?: InputMaybe<Array<AgreementWallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementWallets_Order_By>>;
  where?: InputMaybe<AgreementWallets_Bool_Exp>;
};


/** columns and relationships of "Wallets" */
export type WalletsAgreementWallets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementWallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementWallets_Order_By>>;
  where?: InputMaybe<AgreementWallets_Bool_Exp>;
};


/** columns and relationships of "Wallets" */
export type WalletsAgreementsArgs = {
  distinct_on?: InputMaybe<Array<Agreements_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Agreements_Order_By>>;
  where?: InputMaybe<Agreements_Bool_Exp>;
};


/** columns and relationships of "Wallets" */
export type WalletsAgreements_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Agreements_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Agreements_Order_By>>;
  where?: InputMaybe<Agreements_Bool_Exp>;
};


/** columns and relationships of "Wallets" */
export type WalletsBundlesArgs = {
  distinct_on?: InputMaybe<Array<Bundles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bundles_Order_By>>;
  where?: InputMaybe<Bundles_Bool_Exp>;
};


/** columns and relationships of "Wallets" */
export type WalletsBundles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Bundles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bundles_Order_By>>;
  where?: InputMaybe<Bundles_Bool_Exp>;
};


/** columns and relationships of "Wallets" */
export type WalletsContractsArgs = {
  distinct_on?: InputMaybe<Array<Contracts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contracts_Order_By>>;
  where?: InputMaybe<Contracts_Bool_Exp>;
};


/** columns and relationships of "Wallets" */
export type WalletsContracts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contracts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contracts_Order_By>>;
  where?: InputMaybe<Contracts_Bool_Exp>;
};


/** columns and relationships of "Wallets" */
export type WalletsTransactionsArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


/** columns and relationships of "Wallets" */
export type WalletsTransactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


/** columns and relationships of "Wallets" */
export type WalletsUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


/** columns and relationships of "Wallets" */
export type WalletsUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


/** columns and relationships of "Wallets" */
export type WalletsWalletContractInstancesArgs = {
  distinct_on?: InputMaybe<Array<WalletContractInstances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<WalletContractInstances_Order_By>>;
  where?: InputMaybe<WalletContractInstances_Bool_Exp>;
};


/** columns and relationships of "Wallets" */
export type WalletsWalletContractInstances_AggregateArgs = {
  distinct_on?: InputMaybe<Array<WalletContractInstances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<WalletContractInstances_Order_By>>;
  where?: InputMaybe<WalletContractInstances_Bool_Exp>;
};

/** aggregated selection of "Wallets" */
export type Wallets_Aggregate = {
  __typename?: 'Wallets_aggregate';
  aggregate?: Maybe<Wallets_Aggregate_Fields>;
  nodes: Array<Wallets>;
};

export type Wallets_Aggregate_Bool_Exp = {
  count?: InputMaybe<Wallets_Aggregate_Bool_Exp_Count>;
};

export type Wallets_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Wallets_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Wallets_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "Wallets" */
export type Wallets_Aggregate_Fields = {
  __typename?: 'Wallets_aggregate_fields';
  avg?: Maybe<Wallets_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Wallets_Max_Fields>;
  min?: Maybe<Wallets_Min_Fields>;
  stddev?: Maybe<Wallets_Stddev_Fields>;
  stddev_pop?: Maybe<Wallets_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Wallets_Stddev_Samp_Fields>;
  sum?: Maybe<Wallets_Sum_Fields>;
  var_pop?: Maybe<Wallets_Var_Pop_Fields>;
  var_samp?: Maybe<Wallets_Var_Samp_Fields>;
  variance?: Maybe<Wallets_Variance_Fields>;
};


/** aggregate fields of "Wallets" */
export type Wallets_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Wallets_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "Wallets" */
export type Wallets_Aggregate_Order_By = {
  avg?: InputMaybe<Wallets_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Wallets_Max_Order_By>;
  min?: InputMaybe<Wallets_Min_Order_By>;
  stddev?: InputMaybe<Wallets_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Wallets_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Wallets_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Wallets_Sum_Order_By>;
  var_pop?: InputMaybe<Wallets_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Wallets_Var_Samp_Order_By>;
  variance?: InputMaybe<Wallets_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "Wallets" */
export type Wallets_Arr_Rel_Insert_Input = {
  data: Array<Wallets_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Wallets_On_Conflict>;
};

/** aggregate avg on columns */
export type Wallets_Avg_Fields = {
  __typename?: 'Wallets_avg_fields';
  dailyTXLimit?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "Wallets" */
export type Wallets_Avg_Order_By = {
  dailyTXLimit?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "Wallets". All fields are combined with a logical 'AND'. */
export type Wallets_Bool_Exp = {
  AgreementRoleTokens?: InputMaybe<AgreementRoleTokens_Bool_Exp>;
  AgreementRoleTokens_aggregate?: InputMaybe<AgreementRoleTokens_Aggregate_Bool_Exp>;
  AgreementRoles?: InputMaybe<AgreementRoles_Bool_Exp>;
  AgreementRoles_aggregate?: InputMaybe<AgreementRoles_Aggregate_Bool_Exp>;
  AgreementTokens?: InputMaybe<AgreementTokens_Bool_Exp>;
  AgreementTokens_aggregate?: InputMaybe<AgreementTokens_Aggregate_Bool_Exp>;
  AgreementWallets?: InputMaybe<AgreementWallets_Bool_Exp>;
  AgreementWallets_aggregate?: InputMaybe<AgreementWallets_Aggregate_Bool_Exp>;
  Agreements?: InputMaybe<Agreements_Bool_Exp>;
  Agreements_aggregate?: InputMaybe<Agreements_Aggregate_Bool_Exp>;
  Bundles?: InputMaybe<Bundles_Bool_Exp>;
  Bundles_aggregate?: InputMaybe<Bundles_Aggregate_Bool_Exp>;
  Contracts?: InputMaybe<Contracts_Bool_Exp>;
  Contracts_aggregate?: InputMaybe<Contracts_Aggregate_Bool_Exp>;
  Transactions?: InputMaybe<Transactions_Bool_Exp>;
  Transactions_aggregate?: InputMaybe<Transactions_Aggregate_Bool_Exp>;
  User?: InputMaybe<Users_Bool_Exp>;
  UserId?: InputMaybe<Uuid_Comparison_Exp>;
  Users?: InputMaybe<Users_Bool_Exp>;
  Users_aggregate?: InputMaybe<Users_Aggregate_Bool_Exp>;
  WalletContractInstances?: InputMaybe<WalletContractInstances_Bool_Exp>;
  WalletContractInstances_aggregate?: InputMaybe<WalletContractInstances_Aggregate_Bool_Exp>;
  _and?: InputMaybe<Array<Wallets_Bool_Exp>>;
  _not?: InputMaybe<Wallets_Bool_Exp>;
  _or?: InputMaybe<Array<Wallets_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  apiKey?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  dailyTXLimit?: InputMaybe<Int_Comparison_Exp>;
  ens?: InputMaybe<String_Comparison_Exp>;
  ensFetchedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  nonce?: InputMaybe<String_Comparison_Exp>;
  pkpTokenId?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "Wallets" */
export enum Wallets_Constraint {
  /** unique or primary key constraint on columns "id" */
  WalletsPkey = 'Wallets_pkey'
}

/** input type for incrementing numeric columns in table "Wallets" */
export type Wallets_Inc_Input = {
  dailyTXLimit?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "Wallets" */
export type Wallets_Insert_Input = {
  AgreementRoleTokens?: InputMaybe<AgreementRoleTokens_Arr_Rel_Insert_Input>;
  AgreementRoles?: InputMaybe<AgreementRoles_Arr_Rel_Insert_Input>;
  AgreementTokens?: InputMaybe<AgreementTokens_Arr_Rel_Insert_Input>;
  AgreementWallets?: InputMaybe<AgreementWallets_Arr_Rel_Insert_Input>;
  Agreements?: InputMaybe<Agreements_Arr_Rel_Insert_Input>;
  Bundles?: InputMaybe<Bundles_Arr_Rel_Insert_Input>;
  Contracts?: InputMaybe<Contracts_Arr_Rel_Insert_Input>;
  Transactions?: InputMaybe<Transactions_Arr_Rel_Insert_Input>;
  User?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  UserId?: InputMaybe<Scalars['uuid']>;
  Users?: InputMaybe<Users_Arr_Rel_Insert_Input>;
  WalletContractInstances?: InputMaybe<WalletContractInstances_Arr_Rel_Insert_Input>;
  address?: InputMaybe<Scalars['String']>;
  apiKey?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  dailyTXLimit?: InputMaybe<Scalars['Int']>;
  ens?: InputMaybe<Scalars['String']>;
  ensFetchedAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  nonce?: InputMaybe<Scalars['String']>;
  pkpTokenId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Wallets_Max_Fields = {
  __typename?: 'Wallets_max_fields';
  UserId?: Maybe<Scalars['uuid']>;
  address?: Maybe<Scalars['String']>;
  apiKey?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  dailyTXLimit?: Maybe<Scalars['Int']>;
  ens?: Maybe<Scalars['String']>;
  ensFetchedAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  nonce?: Maybe<Scalars['String']>;
  pkpTokenId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "Wallets" */
export type Wallets_Max_Order_By = {
  UserId?: InputMaybe<Order_By>;
  address?: InputMaybe<Order_By>;
  apiKey?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  dailyTXLimit?: InputMaybe<Order_By>;
  ens?: InputMaybe<Order_By>;
  ensFetchedAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  pkpTokenId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Wallets_Min_Fields = {
  __typename?: 'Wallets_min_fields';
  UserId?: Maybe<Scalars['uuid']>;
  address?: Maybe<Scalars['String']>;
  apiKey?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  dailyTXLimit?: Maybe<Scalars['Int']>;
  ens?: Maybe<Scalars['String']>;
  ensFetchedAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  nonce?: Maybe<Scalars['String']>;
  pkpTokenId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "Wallets" */
export type Wallets_Min_Order_By = {
  UserId?: InputMaybe<Order_By>;
  address?: InputMaybe<Order_By>;
  apiKey?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  dailyTXLimit?: InputMaybe<Order_By>;
  ens?: InputMaybe<Order_By>;
  ensFetchedAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  pkpTokenId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "Wallets" */
export type Wallets_Mutation_Response = {
  __typename?: 'Wallets_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Wallets>;
};

/** input type for inserting object relation for remote table "Wallets" */
export type Wallets_Obj_Rel_Insert_Input = {
  data: Wallets_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Wallets_On_Conflict>;
};

/** on_conflict condition type for table "Wallets" */
export type Wallets_On_Conflict = {
  constraint: Wallets_Constraint;
  update_columns?: Array<Wallets_Update_Column>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};

/** Ordering options when selecting data from "Wallets". */
export type Wallets_Order_By = {
  AgreementRoleTokens_aggregate?: InputMaybe<AgreementRoleTokens_Aggregate_Order_By>;
  AgreementRoles_aggregate?: InputMaybe<AgreementRoles_Aggregate_Order_By>;
  AgreementTokens_aggregate?: InputMaybe<AgreementTokens_Aggregate_Order_By>;
  AgreementWallets_aggregate?: InputMaybe<AgreementWallets_Aggregate_Order_By>;
  Agreements_aggregate?: InputMaybe<Agreements_Aggregate_Order_By>;
  Bundles_aggregate?: InputMaybe<Bundles_Aggregate_Order_By>;
  Contracts_aggregate?: InputMaybe<Contracts_Aggregate_Order_By>;
  Transactions_aggregate?: InputMaybe<Transactions_Aggregate_Order_By>;
  User?: InputMaybe<Users_Order_By>;
  UserId?: InputMaybe<Order_By>;
  Users_aggregate?: InputMaybe<Users_Aggregate_Order_By>;
  WalletContractInstances_aggregate?: InputMaybe<WalletContractInstances_Aggregate_Order_By>;
  address?: InputMaybe<Order_By>;
  apiKey?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  dailyTXLimit?: InputMaybe<Order_By>;
  ens?: InputMaybe<Order_By>;
  ensFetchedAt?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  pkpTokenId?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: Wallets */
export type Wallets_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "Wallets" */
export enum Wallets_Select_Column {
  /** column name */
  UserId = 'UserId',
  /** column name */
  Address = 'address',
  /** column name */
  ApiKey = 'apiKey',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DailyTxLimit = 'dailyTXLimit',
  /** column name */
  Ens = 'ens',
  /** column name */
  EnsFetchedAt = 'ensFetchedAt',
  /** column name */
  Id = 'id',
  /** column name */
  Nonce = 'nonce',
  /** column name */
  PkpTokenId = 'pkpTokenId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "Wallets" */
export type Wallets_Set_Input = {
  UserId?: InputMaybe<Scalars['uuid']>;
  address?: InputMaybe<Scalars['String']>;
  apiKey?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  dailyTXLimit?: InputMaybe<Scalars['Int']>;
  ens?: InputMaybe<Scalars['String']>;
  ensFetchedAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  nonce?: InputMaybe<Scalars['String']>;
  pkpTokenId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Wallets_Stddev_Fields = {
  __typename?: 'Wallets_stddev_fields';
  dailyTXLimit?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "Wallets" */
export type Wallets_Stddev_Order_By = {
  dailyTXLimit?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Wallets_Stddev_Pop_Fields = {
  __typename?: 'Wallets_stddev_pop_fields';
  dailyTXLimit?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "Wallets" */
export type Wallets_Stddev_Pop_Order_By = {
  dailyTXLimit?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Wallets_Stddev_Samp_Fields = {
  __typename?: 'Wallets_stddev_samp_fields';
  dailyTXLimit?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "Wallets" */
export type Wallets_Stddev_Samp_Order_By = {
  dailyTXLimit?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "Wallets" */
export type Wallets_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Wallets_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Wallets_Stream_Cursor_Value_Input = {
  UserId?: InputMaybe<Scalars['uuid']>;
  address?: InputMaybe<Scalars['String']>;
  apiKey?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  dailyTXLimit?: InputMaybe<Scalars['Int']>;
  ens?: InputMaybe<Scalars['String']>;
  ensFetchedAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  nonce?: InputMaybe<Scalars['String']>;
  pkpTokenId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate sum on columns */
export type Wallets_Sum_Fields = {
  __typename?: 'Wallets_sum_fields';
  dailyTXLimit?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "Wallets" */
export type Wallets_Sum_Order_By = {
  dailyTXLimit?: InputMaybe<Order_By>;
};

/** update columns of table "Wallets" */
export enum Wallets_Update_Column {
  /** column name */
  UserId = 'UserId',
  /** column name */
  Address = 'address',
  /** column name */
  ApiKey = 'apiKey',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DailyTxLimit = 'dailyTXLimit',
  /** column name */
  Ens = 'ens',
  /** column name */
  EnsFetchedAt = 'ensFetchedAt',
  /** column name */
  Id = 'id',
  /** column name */
  Nonce = 'nonce',
  /** column name */
  PkpTokenId = 'pkpTokenId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type Wallets_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Wallets_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Wallets_Set_Input>;
  where: Wallets_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Wallets_Var_Pop_Fields = {
  __typename?: 'Wallets_var_pop_fields';
  dailyTXLimit?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "Wallets" */
export type Wallets_Var_Pop_Order_By = {
  dailyTXLimit?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Wallets_Var_Samp_Fields = {
  __typename?: 'Wallets_var_samp_fields';
  dailyTXLimit?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "Wallets" */
export type Wallets_Var_Samp_Order_By = {
  dailyTXLimit?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Wallets_Variance_Fields = {
  __typename?: 'Wallets_variance_fields';
  dailyTXLimit?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "Wallets" */
export type Wallets_Variance_Order_By = {
  dailyTXLimit?: InputMaybe<Order_By>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "AgreementExtensionLinks" */
  delete_AgreementExtensionLinks?: Maybe<AgreementExtensionLinks_Mutation_Response>;
  /** delete single row from the table: "AgreementExtensionLinks" */
  delete_AgreementExtensionLinks_by_pk?: Maybe<AgreementExtensionLinks>;
  /** delete data from the table: "AgreementExtensionRoles" */
  delete_AgreementExtensionRoles?: Maybe<AgreementExtensionRoles_Mutation_Response>;
  /** delete single row from the table: "AgreementExtensionRoles" */
  delete_AgreementExtensionRoles_by_pk?: Maybe<AgreementExtensionRoles>;
  /** delete data from the table: "AgreementExtensionStorages" */
  delete_AgreementExtensionStorages?: Maybe<AgreementExtensionStorages_Mutation_Response>;
  /** delete single row from the table: "AgreementExtensionStorages" */
  delete_AgreementExtensionStorages_by_pk?: Maybe<AgreementExtensionStorages>;
  /** delete data from the table: "AgreementExtensionWidgets" */
  delete_AgreementExtensionWidgets?: Maybe<AgreementExtensionWidgets_Mutation_Response>;
  /** delete single row from the table: "AgreementExtensionWidgets" */
  delete_AgreementExtensionWidgets_by_pk?: Maybe<AgreementExtensionWidgets>;
  /** delete data from the table: "AgreementExtensions" */
  delete_AgreementExtensions?: Maybe<AgreementExtensions_Mutation_Response>;
  /** delete single row from the table: "AgreementExtensions" */
  delete_AgreementExtensions_by_pk?: Maybe<AgreementExtensions>;
  /** delete data from the table: "AgreementRoleExtensions" */
  delete_AgreementRoleExtensions?: Maybe<AgreementRoleExtensions_Mutation_Response>;
  /** delete single row from the table: "AgreementRoleExtensions" */
  delete_AgreementRoleExtensions_by_pk?: Maybe<AgreementRoleExtensions>;
  /** delete data from the table: "AgreementRoleTokenTransfers" */
  delete_AgreementRoleTokenTransfers?: Maybe<AgreementRoleTokenTransfers_Mutation_Response>;
  /** delete single row from the table: "AgreementRoleTokenTransfers" */
  delete_AgreementRoleTokenTransfers_by_pk?: Maybe<AgreementRoleTokenTransfers>;
  /** delete data from the table: "AgreementRoleTokens" */
  delete_AgreementRoleTokens?: Maybe<AgreementRoleTokens_Mutation_Response>;
  /** delete single row from the table: "AgreementRoleTokens" */
  delete_AgreementRoleTokens_by_pk?: Maybe<AgreementRoleTokens>;
  /** delete data from the table: "AgreementRoleWallets" */
  delete_AgreementRoleWallets?: Maybe<AgreementRoleWallets_Mutation_Response>;
  /** delete single row from the table: "AgreementRoleWallets" */
  delete_AgreementRoleWallets_by_pk?: Maybe<AgreementRoleWallets>;
  /** delete data from the table: "AgreementRoles" */
  delete_AgreementRoles?: Maybe<AgreementRoles_Mutation_Response>;
  /** delete single row from the table: "AgreementRoles" */
  delete_AgreementRoles_by_pk?: Maybe<AgreementRoles>;
  /** delete data from the table: "AgreementTokenTransfers" */
  delete_AgreementTokenTransfers?: Maybe<AgreementTokenTransfers_Mutation_Response>;
  /** delete single row from the table: "AgreementTokenTransfers" */
  delete_AgreementTokenTransfers_by_pk?: Maybe<AgreementTokenTransfers>;
  /** delete data from the table: "AgreementTokens" */
  delete_AgreementTokens?: Maybe<AgreementTokens_Mutation_Response>;
  /** delete single row from the table: "AgreementTokens" */
  delete_AgreementTokens_by_pk?: Maybe<AgreementTokens>;
  /** delete data from the table: "AgreementWallets" */
  delete_AgreementWallets?: Maybe<AgreementWallets_Mutation_Response>;
  /** delete single row from the table: "AgreementWallets" */
  delete_AgreementWallets_by_pk?: Maybe<AgreementWallets>;
  /** delete data from the table: "Agreements" */
  delete_Agreements?: Maybe<Agreements_Mutation_Response>;
  /** delete single row from the table: "Agreements" */
  delete_Agreements_by_pk?: Maybe<Agreements>;
  /** delete data from the table: "BundleContracts" */
  delete_BundleContracts?: Maybe<BundleContracts_Mutation_Response>;
  /** delete single row from the table: "BundleContracts" */
  delete_BundleContracts_by_pk?: Maybe<BundleContracts>;
  /** delete data from the table: "Bundles" */
  delete_Bundles?: Maybe<Bundles_Mutation_Response>;
  /** delete single row from the table: "Bundles" */
  delete_Bundles_by_pk?: Maybe<Bundles>;
  /** delete data from the table: "ChainNonces" */
  delete_ChainNonces?: Maybe<ChainNonces_Mutation_Response>;
  /** delete single row from the table: "ChainNonces" */
  delete_ChainNonces_by_pk?: Maybe<ChainNonces>;
  /** delete data from the table: "ContractInstances" */
  delete_ContractInstances?: Maybe<ContractInstances_Mutation_Response>;
  /** delete single row from the table: "ContractInstances" */
  delete_ContractInstances_by_pk?: Maybe<ContractInstances>;
  /** delete data from the table: "Contracts" */
  delete_Contracts?: Maybe<Contracts_Mutation_Response>;
  /** delete single row from the table: "Contracts" */
  delete_Contracts_by_pk?: Maybe<Contracts>;
  /** delete data from the table: "Extensions" */
  delete_Extensions?: Maybe<Extensions_Mutation_Response>;
  /** delete single row from the table: "Extensions" */
  delete_Extensions_by_pk?: Maybe<Extensions>;
  /** delete data from the table: "IdentityProviders" */
  delete_IdentityProviders?: Maybe<IdentityProviders_Mutation_Response>;
  /** delete single row from the table: "IdentityProviders" */
  delete_IdentityProviders_by_pk?: Maybe<IdentityProviders>;
  /** delete data from the table: "Integrations" */
  delete_Integrations?: Maybe<Integrations_Mutation_Response>;
  /** delete single row from the table: "Integrations" */
  delete_Integrations_by_pk?: Maybe<Integrations>;
  /** delete data from the table: "RolePermissions" */
  delete_RolePermissions?: Maybe<RolePermissions_Mutation_Response>;
  /** delete single row from the table: "RolePermissions" */
  delete_RolePermissions_by_pk?: Maybe<RolePermissions>;
  /** delete data from the table: "SequelizeMeta" */
  delete_SequelizeMeta?: Maybe<SequelizeMeta_Mutation_Response>;
  /** delete single row from the table: "SequelizeMeta" */
  delete_SequelizeMeta_by_pk?: Maybe<SequelizeMeta>;
  /** delete data from the table: "Transactions" */
  delete_Transactions?: Maybe<Transactions_Mutation_Response>;
  /** delete single row from the table: "Transactions" */
  delete_Transactions_by_pk?: Maybe<Transactions>;
  /** delete data from the table: "Transfers" */
  delete_Transfers?: Maybe<Transfers_Mutation_Response>;
  /** delete single row from the table: "Transfers" */
  delete_Transfers_by_pk?: Maybe<Transfers>;
  /** delete data from the table: "UserIdentities" */
  delete_UserIdentities?: Maybe<UserIdentities_Mutation_Response>;
  /** delete single row from the table: "UserIdentities" */
  delete_UserIdentities_by_pk?: Maybe<UserIdentities>;
  /** delete data from the table: "Users" */
  delete_Users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "Users" */
  delete_Users_by_pk?: Maybe<Users>;
  /** delete data from the table: "WalletContractInstances" */
  delete_WalletContractInstances?: Maybe<WalletContractInstances_Mutation_Response>;
  /** delete single row from the table: "WalletContractInstances" */
  delete_WalletContractInstances_by_pk?: Maybe<WalletContractInstances>;
  /** delete data from the table: "Wallets" */
  delete_Wallets?: Maybe<Wallets_Mutation_Response>;
  /** delete single row from the table: "Wallets" */
  delete_Wallets_by_pk?: Maybe<Wallets>;
  /** insert data into the table: "AgreementExtensionLinks" */
  insert_AgreementExtensionLinks?: Maybe<AgreementExtensionLinks_Mutation_Response>;
  /** insert a single row into the table: "AgreementExtensionLinks" */
  insert_AgreementExtensionLinks_one?: Maybe<AgreementExtensionLinks>;
  /** insert data into the table: "AgreementExtensionRoles" */
  insert_AgreementExtensionRoles?: Maybe<AgreementExtensionRoles_Mutation_Response>;
  /** insert a single row into the table: "AgreementExtensionRoles" */
  insert_AgreementExtensionRoles_one?: Maybe<AgreementExtensionRoles>;
  /** insert data into the table: "AgreementExtensionStorages" */
  insert_AgreementExtensionStorages?: Maybe<AgreementExtensionStorages_Mutation_Response>;
  /** insert a single row into the table: "AgreementExtensionStorages" */
  insert_AgreementExtensionStorages_one?: Maybe<AgreementExtensionStorages>;
  /** insert data into the table: "AgreementExtensionWidgets" */
  insert_AgreementExtensionWidgets?: Maybe<AgreementExtensionWidgets_Mutation_Response>;
  /** insert a single row into the table: "AgreementExtensionWidgets" */
  insert_AgreementExtensionWidgets_one?: Maybe<AgreementExtensionWidgets>;
  /** insert data into the table: "AgreementExtensions" */
  insert_AgreementExtensions?: Maybe<AgreementExtensions_Mutation_Response>;
  /** insert a single row into the table: "AgreementExtensions" */
  insert_AgreementExtensions_one?: Maybe<AgreementExtensions>;
  /** insert data into the table: "AgreementRoleExtensions" */
  insert_AgreementRoleExtensions?: Maybe<AgreementRoleExtensions_Mutation_Response>;
  /** insert a single row into the table: "AgreementRoleExtensions" */
  insert_AgreementRoleExtensions_one?: Maybe<AgreementRoleExtensions>;
  /** insert data into the table: "AgreementRoleTokenTransfers" */
  insert_AgreementRoleTokenTransfers?: Maybe<AgreementRoleTokenTransfers_Mutation_Response>;
  /** insert a single row into the table: "AgreementRoleTokenTransfers" */
  insert_AgreementRoleTokenTransfers_one?: Maybe<AgreementRoleTokenTransfers>;
  /** insert data into the table: "AgreementRoleTokens" */
  insert_AgreementRoleTokens?: Maybe<AgreementRoleTokens_Mutation_Response>;
  /** insert a single row into the table: "AgreementRoleTokens" */
  insert_AgreementRoleTokens_one?: Maybe<AgreementRoleTokens>;
  /** insert data into the table: "AgreementRoleWallets" */
  insert_AgreementRoleWallets?: Maybe<AgreementRoleWallets_Mutation_Response>;
  /** insert a single row into the table: "AgreementRoleWallets" */
  insert_AgreementRoleWallets_one?: Maybe<AgreementRoleWallets>;
  /** insert data into the table: "AgreementRoles" */
  insert_AgreementRoles?: Maybe<AgreementRoles_Mutation_Response>;
  /** insert a single row into the table: "AgreementRoles" */
  insert_AgreementRoles_one?: Maybe<AgreementRoles>;
  /** insert data into the table: "AgreementTokenTransfers" */
  insert_AgreementTokenTransfers?: Maybe<AgreementTokenTransfers_Mutation_Response>;
  /** insert a single row into the table: "AgreementTokenTransfers" */
  insert_AgreementTokenTransfers_one?: Maybe<AgreementTokenTransfers>;
  /** insert data into the table: "AgreementTokens" */
  insert_AgreementTokens?: Maybe<AgreementTokens_Mutation_Response>;
  /** insert a single row into the table: "AgreementTokens" */
  insert_AgreementTokens_one?: Maybe<AgreementTokens>;
  /** insert data into the table: "AgreementWallets" */
  insert_AgreementWallets?: Maybe<AgreementWallets_Mutation_Response>;
  /** insert a single row into the table: "AgreementWallets" */
  insert_AgreementWallets_one?: Maybe<AgreementWallets>;
  /** insert data into the table: "Agreements" */
  insert_Agreements?: Maybe<Agreements_Mutation_Response>;
  /** insert a single row into the table: "Agreements" */
  insert_Agreements_one?: Maybe<Agreements>;
  /** insert data into the table: "BundleContracts" */
  insert_BundleContracts?: Maybe<BundleContracts_Mutation_Response>;
  /** insert a single row into the table: "BundleContracts" */
  insert_BundleContracts_one?: Maybe<BundleContracts>;
  /** insert data into the table: "Bundles" */
  insert_Bundles?: Maybe<Bundles_Mutation_Response>;
  /** insert a single row into the table: "Bundles" */
  insert_Bundles_one?: Maybe<Bundles>;
  /** insert data into the table: "ChainNonces" */
  insert_ChainNonces?: Maybe<ChainNonces_Mutation_Response>;
  /** insert a single row into the table: "ChainNonces" */
  insert_ChainNonces_one?: Maybe<ChainNonces>;
  /** insert data into the table: "ContractInstances" */
  insert_ContractInstances?: Maybe<ContractInstances_Mutation_Response>;
  /** insert a single row into the table: "ContractInstances" */
  insert_ContractInstances_one?: Maybe<ContractInstances>;
  /** insert data into the table: "Contracts" */
  insert_Contracts?: Maybe<Contracts_Mutation_Response>;
  /** insert a single row into the table: "Contracts" */
  insert_Contracts_one?: Maybe<Contracts>;
  /** insert data into the table: "Extensions" */
  insert_Extensions?: Maybe<Extensions_Mutation_Response>;
  /** insert a single row into the table: "Extensions" */
  insert_Extensions_one?: Maybe<Extensions>;
  /** insert data into the table: "IdentityProviders" */
  insert_IdentityProviders?: Maybe<IdentityProviders_Mutation_Response>;
  /** insert a single row into the table: "IdentityProviders" */
  insert_IdentityProviders_one?: Maybe<IdentityProviders>;
  /** insert data into the table: "Integrations" */
  insert_Integrations?: Maybe<Integrations_Mutation_Response>;
  /** insert a single row into the table: "Integrations" */
  insert_Integrations_one?: Maybe<Integrations>;
  /** insert data into the table: "RolePermissions" */
  insert_RolePermissions?: Maybe<RolePermissions_Mutation_Response>;
  /** insert a single row into the table: "RolePermissions" */
  insert_RolePermissions_one?: Maybe<RolePermissions>;
  /** insert data into the table: "SequelizeMeta" */
  insert_SequelizeMeta?: Maybe<SequelizeMeta_Mutation_Response>;
  /** insert a single row into the table: "SequelizeMeta" */
  insert_SequelizeMeta_one?: Maybe<SequelizeMeta>;
  /** insert data into the table: "Transactions" */
  insert_Transactions?: Maybe<Transactions_Mutation_Response>;
  /** insert a single row into the table: "Transactions" */
  insert_Transactions_one?: Maybe<Transactions>;
  /** insert data into the table: "Transfers" */
  insert_Transfers?: Maybe<Transfers_Mutation_Response>;
  /** insert a single row into the table: "Transfers" */
  insert_Transfers_one?: Maybe<Transfers>;
  /** insert data into the table: "UserIdentities" */
  insert_UserIdentities?: Maybe<UserIdentities_Mutation_Response>;
  /** insert a single row into the table: "UserIdentities" */
  insert_UserIdentities_one?: Maybe<UserIdentities>;
  /** insert data into the table: "Users" */
  insert_Users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "Users" */
  insert_Users_one?: Maybe<Users>;
  /** insert data into the table: "WalletContractInstances" */
  insert_WalletContractInstances?: Maybe<WalletContractInstances_Mutation_Response>;
  /** insert a single row into the table: "WalletContractInstances" */
  insert_WalletContractInstances_one?: Maybe<WalletContractInstances>;
  /** insert data into the table: "Wallets" */
  insert_Wallets?: Maybe<Wallets_Mutation_Response>;
  /** insert a single row into the table: "Wallets" */
  insert_Wallets_one?: Maybe<Wallets>;
  /** update data of the table: "AgreementExtensionLinks" */
  update_AgreementExtensionLinks?: Maybe<AgreementExtensionLinks_Mutation_Response>;
  /** update single row of the table: "AgreementExtensionLinks" */
  update_AgreementExtensionLinks_by_pk?: Maybe<AgreementExtensionLinks>;
  /** update multiples rows of table: "AgreementExtensionLinks" */
  update_AgreementExtensionLinks_many?: Maybe<Array<Maybe<AgreementExtensionLinks_Mutation_Response>>>;
  /** update data of the table: "AgreementExtensionRoles" */
  update_AgreementExtensionRoles?: Maybe<AgreementExtensionRoles_Mutation_Response>;
  /** update single row of the table: "AgreementExtensionRoles" */
  update_AgreementExtensionRoles_by_pk?: Maybe<AgreementExtensionRoles>;
  /** update multiples rows of table: "AgreementExtensionRoles" */
  update_AgreementExtensionRoles_many?: Maybe<Array<Maybe<AgreementExtensionRoles_Mutation_Response>>>;
  /** update data of the table: "AgreementExtensionStorages" */
  update_AgreementExtensionStorages?: Maybe<AgreementExtensionStorages_Mutation_Response>;
  /** update single row of the table: "AgreementExtensionStorages" */
  update_AgreementExtensionStorages_by_pk?: Maybe<AgreementExtensionStorages>;
  /** update multiples rows of table: "AgreementExtensionStorages" */
  update_AgreementExtensionStorages_many?: Maybe<Array<Maybe<AgreementExtensionStorages_Mutation_Response>>>;
  /** update data of the table: "AgreementExtensionWidgets" */
  update_AgreementExtensionWidgets?: Maybe<AgreementExtensionWidgets_Mutation_Response>;
  /** update single row of the table: "AgreementExtensionWidgets" */
  update_AgreementExtensionWidgets_by_pk?: Maybe<AgreementExtensionWidgets>;
  /** update multiples rows of table: "AgreementExtensionWidgets" */
  update_AgreementExtensionWidgets_many?: Maybe<Array<Maybe<AgreementExtensionWidgets_Mutation_Response>>>;
  /** update data of the table: "AgreementExtensions" */
  update_AgreementExtensions?: Maybe<AgreementExtensions_Mutation_Response>;
  /** update single row of the table: "AgreementExtensions" */
  update_AgreementExtensions_by_pk?: Maybe<AgreementExtensions>;
  /** update multiples rows of table: "AgreementExtensions" */
  update_AgreementExtensions_many?: Maybe<Array<Maybe<AgreementExtensions_Mutation_Response>>>;
  /** update data of the table: "AgreementRoleExtensions" */
  update_AgreementRoleExtensions?: Maybe<AgreementRoleExtensions_Mutation_Response>;
  /** update single row of the table: "AgreementRoleExtensions" */
  update_AgreementRoleExtensions_by_pk?: Maybe<AgreementRoleExtensions>;
  /** update multiples rows of table: "AgreementRoleExtensions" */
  update_AgreementRoleExtensions_many?: Maybe<Array<Maybe<AgreementRoleExtensions_Mutation_Response>>>;
  /** update data of the table: "AgreementRoleTokenTransfers" */
  update_AgreementRoleTokenTransfers?: Maybe<AgreementRoleTokenTransfers_Mutation_Response>;
  /** update single row of the table: "AgreementRoleTokenTransfers" */
  update_AgreementRoleTokenTransfers_by_pk?: Maybe<AgreementRoleTokenTransfers>;
  /** update multiples rows of table: "AgreementRoleTokenTransfers" */
  update_AgreementRoleTokenTransfers_many?: Maybe<Array<Maybe<AgreementRoleTokenTransfers_Mutation_Response>>>;
  /** update data of the table: "AgreementRoleTokens" */
  update_AgreementRoleTokens?: Maybe<AgreementRoleTokens_Mutation_Response>;
  /** update single row of the table: "AgreementRoleTokens" */
  update_AgreementRoleTokens_by_pk?: Maybe<AgreementRoleTokens>;
  /** update multiples rows of table: "AgreementRoleTokens" */
  update_AgreementRoleTokens_many?: Maybe<Array<Maybe<AgreementRoleTokens_Mutation_Response>>>;
  /** update data of the table: "AgreementRoleWallets" */
  update_AgreementRoleWallets?: Maybe<AgreementRoleWallets_Mutation_Response>;
  /** update single row of the table: "AgreementRoleWallets" */
  update_AgreementRoleWallets_by_pk?: Maybe<AgreementRoleWallets>;
  /** update multiples rows of table: "AgreementRoleWallets" */
  update_AgreementRoleWallets_many?: Maybe<Array<Maybe<AgreementRoleWallets_Mutation_Response>>>;
  /** update data of the table: "AgreementRoles" */
  update_AgreementRoles?: Maybe<AgreementRoles_Mutation_Response>;
  /** update single row of the table: "AgreementRoles" */
  update_AgreementRoles_by_pk?: Maybe<AgreementRoles>;
  /** update multiples rows of table: "AgreementRoles" */
  update_AgreementRoles_many?: Maybe<Array<Maybe<AgreementRoles_Mutation_Response>>>;
  /** update data of the table: "AgreementTokenTransfers" */
  update_AgreementTokenTransfers?: Maybe<AgreementTokenTransfers_Mutation_Response>;
  /** update single row of the table: "AgreementTokenTransfers" */
  update_AgreementTokenTransfers_by_pk?: Maybe<AgreementTokenTransfers>;
  /** update multiples rows of table: "AgreementTokenTransfers" */
  update_AgreementTokenTransfers_many?: Maybe<Array<Maybe<AgreementTokenTransfers_Mutation_Response>>>;
  /** update data of the table: "AgreementTokens" */
  update_AgreementTokens?: Maybe<AgreementTokens_Mutation_Response>;
  /** update single row of the table: "AgreementTokens" */
  update_AgreementTokens_by_pk?: Maybe<AgreementTokens>;
  /** update multiples rows of table: "AgreementTokens" */
  update_AgreementTokens_many?: Maybe<Array<Maybe<AgreementTokens_Mutation_Response>>>;
  /** update data of the table: "AgreementWallets" */
  update_AgreementWallets?: Maybe<AgreementWallets_Mutation_Response>;
  /** update single row of the table: "AgreementWallets" */
  update_AgreementWallets_by_pk?: Maybe<AgreementWallets>;
  /** update multiples rows of table: "AgreementWallets" */
  update_AgreementWallets_many?: Maybe<Array<Maybe<AgreementWallets_Mutation_Response>>>;
  /** update data of the table: "Agreements" */
  update_Agreements?: Maybe<Agreements_Mutation_Response>;
  /** update single row of the table: "Agreements" */
  update_Agreements_by_pk?: Maybe<Agreements>;
  /** update multiples rows of table: "Agreements" */
  update_Agreements_many?: Maybe<Array<Maybe<Agreements_Mutation_Response>>>;
  /** update data of the table: "BundleContracts" */
  update_BundleContracts?: Maybe<BundleContracts_Mutation_Response>;
  /** update single row of the table: "BundleContracts" */
  update_BundleContracts_by_pk?: Maybe<BundleContracts>;
  /** update multiples rows of table: "BundleContracts" */
  update_BundleContracts_many?: Maybe<Array<Maybe<BundleContracts_Mutation_Response>>>;
  /** update data of the table: "Bundles" */
  update_Bundles?: Maybe<Bundles_Mutation_Response>;
  /** update single row of the table: "Bundles" */
  update_Bundles_by_pk?: Maybe<Bundles>;
  /** update multiples rows of table: "Bundles" */
  update_Bundles_many?: Maybe<Array<Maybe<Bundles_Mutation_Response>>>;
  /** update data of the table: "ChainNonces" */
  update_ChainNonces?: Maybe<ChainNonces_Mutation_Response>;
  /** update single row of the table: "ChainNonces" */
  update_ChainNonces_by_pk?: Maybe<ChainNonces>;
  /** update multiples rows of table: "ChainNonces" */
  update_ChainNonces_many?: Maybe<Array<Maybe<ChainNonces_Mutation_Response>>>;
  /** update data of the table: "ContractInstances" */
  update_ContractInstances?: Maybe<ContractInstances_Mutation_Response>;
  /** update single row of the table: "ContractInstances" */
  update_ContractInstances_by_pk?: Maybe<ContractInstances>;
  /** update multiples rows of table: "ContractInstances" */
  update_ContractInstances_many?: Maybe<Array<Maybe<ContractInstances_Mutation_Response>>>;
  /** update data of the table: "Contracts" */
  update_Contracts?: Maybe<Contracts_Mutation_Response>;
  /** update single row of the table: "Contracts" */
  update_Contracts_by_pk?: Maybe<Contracts>;
  /** update multiples rows of table: "Contracts" */
  update_Contracts_many?: Maybe<Array<Maybe<Contracts_Mutation_Response>>>;
  /** update data of the table: "Extensions" */
  update_Extensions?: Maybe<Extensions_Mutation_Response>;
  /** update single row of the table: "Extensions" */
  update_Extensions_by_pk?: Maybe<Extensions>;
  /** update multiples rows of table: "Extensions" */
  update_Extensions_many?: Maybe<Array<Maybe<Extensions_Mutation_Response>>>;
  /** update data of the table: "IdentityProviders" */
  update_IdentityProviders?: Maybe<IdentityProviders_Mutation_Response>;
  /** update single row of the table: "IdentityProviders" */
  update_IdentityProviders_by_pk?: Maybe<IdentityProviders>;
  /** update multiples rows of table: "IdentityProviders" */
  update_IdentityProviders_many?: Maybe<Array<Maybe<IdentityProviders_Mutation_Response>>>;
  /** update data of the table: "Integrations" */
  update_Integrations?: Maybe<Integrations_Mutation_Response>;
  /** update single row of the table: "Integrations" */
  update_Integrations_by_pk?: Maybe<Integrations>;
  /** update multiples rows of table: "Integrations" */
  update_Integrations_many?: Maybe<Array<Maybe<Integrations_Mutation_Response>>>;
  /** update data of the table: "RolePermissions" */
  update_RolePermissions?: Maybe<RolePermissions_Mutation_Response>;
  /** update single row of the table: "RolePermissions" */
  update_RolePermissions_by_pk?: Maybe<RolePermissions>;
  /** update multiples rows of table: "RolePermissions" */
  update_RolePermissions_many?: Maybe<Array<Maybe<RolePermissions_Mutation_Response>>>;
  /** update data of the table: "SequelizeMeta" */
  update_SequelizeMeta?: Maybe<SequelizeMeta_Mutation_Response>;
  /** update single row of the table: "SequelizeMeta" */
  update_SequelizeMeta_by_pk?: Maybe<SequelizeMeta>;
  /** update multiples rows of table: "SequelizeMeta" */
  update_SequelizeMeta_many?: Maybe<Array<Maybe<SequelizeMeta_Mutation_Response>>>;
  /** update data of the table: "Transactions" */
  update_Transactions?: Maybe<Transactions_Mutation_Response>;
  /** update single row of the table: "Transactions" */
  update_Transactions_by_pk?: Maybe<Transactions>;
  /** update multiples rows of table: "Transactions" */
  update_Transactions_many?: Maybe<Array<Maybe<Transactions_Mutation_Response>>>;
  /** update data of the table: "Transfers" */
  update_Transfers?: Maybe<Transfers_Mutation_Response>;
  /** update single row of the table: "Transfers" */
  update_Transfers_by_pk?: Maybe<Transfers>;
  /** update multiples rows of table: "Transfers" */
  update_Transfers_many?: Maybe<Array<Maybe<Transfers_Mutation_Response>>>;
  /** update data of the table: "UserIdentities" */
  update_UserIdentities?: Maybe<UserIdentities_Mutation_Response>;
  /** update single row of the table: "UserIdentities" */
  update_UserIdentities_by_pk?: Maybe<UserIdentities>;
  /** update multiples rows of table: "UserIdentities" */
  update_UserIdentities_many?: Maybe<Array<Maybe<UserIdentities_Mutation_Response>>>;
  /** update data of the table: "Users" */
  update_Users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "Users" */
  update_Users_by_pk?: Maybe<Users>;
  /** update multiples rows of table: "Users" */
  update_Users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>;
  /** update data of the table: "WalletContractInstances" */
  update_WalletContractInstances?: Maybe<WalletContractInstances_Mutation_Response>;
  /** update single row of the table: "WalletContractInstances" */
  update_WalletContractInstances_by_pk?: Maybe<WalletContractInstances>;
  /** update multiples rows of table: "WalletContractInstances" */
  update_WalletContractInstances_many?: Maybe<Array<Maybe<WalletContractInstances_Mutation_Response>>>;
  /** update data of the table: "Wallets" */
  update_Wallets?: Maybe<Wallets_Mutation_Response>;
  /** update single row of the table: "Wallets" */
  update_Wallets_by_pk?: Maybe<Wallets>;
  /** update multiples rows of table: "Wallets" */
  update_Wallets_many?: Maybe<Array<Maybe<Wallets_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_AgreementExtensionLinksArgs = {
  where: AgreementExtensionLinks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_AgreementExtensionLinks_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_AgreementExtensionRolesArgs = {
  where: AgreementExtensionRoles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_AgreementExtensionRoles_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_AgreementExtensionStoragesArgs = {
  where: AgreementExtensionStorages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_AgreementExtensionStorages_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_AgreementExtensionWidgetsArgs = {
  where: AgreementExtensionWidgets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_AgreementExtensionWidgets_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_AgreementExtensionsArgs = {
  where: AgreementExtensions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_AgreementExtensions_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_AgreementRoleExtensionsArgs = {
  where: AgreementRoleExtensions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_AgreementRoleExtensions_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_AgreementRoleTokenTransfersArgs = {
  where: AgreementRoleTokenTransfers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_AgreementRoleTokenTransfers_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_AgreementRoleTokensArgs = {
  where: AgreementRoleTokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_AgreementRoleTokens_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_AgreementRoleWalletsArgs = {
  where: AgreementRoleWallets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_AgreementRoleWallets_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_AgreementRolesArgs = {
  where: AgreementRoles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_AgreementRoles_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_AgreementTokenTransfersArgs = {
  where: AgreementTokenTransfers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_AgreementTokenTransfers_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_AgreementTokensArgs = {
  where: AgreementTokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_AgreementTokens_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_AgreementWalletsArgs = {
  where: AgreementWallets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_AgreementWallets_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_AgreementsArgs = {
  where: Agreements_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Agreements_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_BundleContractsArgs = {
  where: BundleContracts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_BundleContracts_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_BundlesArgs = {
  where: Bundles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Bundles_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ChainNoncesArgs = {
  where: ChainNonces_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ChainNonces_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ContractInstancesArgs = {
  where: ContractInstances_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_ContractInstances_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ContractsArgs = {
  where: Contracts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contracts_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ExtensionsArgs = {
  where: Extensions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Extensions_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_IdentityProvidersArgs = {
  where: IdentityProviders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_IdentityProviders_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_IntegrationsArgs = {
  where: Integrations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Integrations_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_RolePermissionsArgs = {
  where: RolePermissions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_RolePermissions_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_SequelizeMetaArgs = {
  where: SequelizeMeta_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_SequelizeMeta_By_PkArgs = {
  name: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_TransactionsArgs = {
  where: Transactions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Transactions_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_TransfersArgs = {
  where: Transfers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Transfers_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UserIdentitiesArgs = {
  where: UserIdentities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_UserIdentities_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_WalletContractInstancesArgs = {
  where: WalletContractInstances_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_WalletContractInstances_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_WalletsArgs = {
  where: Wallets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Wallets_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_AgreementExtensionLinksArgs = {
  objects: Array<AgreementExtensionLinks_Insert_Input>;
  on_conflict?: InputMaybe<AgreementExtensionLinks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementExtensionLinks_OneArgs = {
  object: AgreementExtensionLinks_Insert_Input;
  on_conflict?: InputMaybe<AgreementExtensionLinks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementExtensionRolesArgs = {
  objects: Array<AgreementExtensionRoles_Insert_Input>;
  on_conflict?: InputMaybe<AgreementExtensionRoles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementExtensionRoles_OneArgs = {
  object: AgreementExtensionRoles_Insert_Input;
  on_conflict?: InputMaybe<AgreementExtensionRoles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementExtensionStoragesArgs = {
  objects: Array<AgreementExtensionStorages_Insert_Input>;
  on_conflict?: InputMaybe<AgreementExtensionStorages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementExtensionStorages_OneArgs = {
  object: AgreementExtensionStorages_Insert_Input;
  on_conflict?: InputMaybe<AgreementExtensionStorages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementExtensionWidgetsArgs = {
  objects: Array<AgreementExtensionWidgets_Insert_Input>;
  on_conflict?: InputMaybe<AgreementExtensionWidgets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementExtensionWidgets_OneArgs = {
  object: AgreementExtensionWidgets_Insert_Input;
  on_conflict?: InputMaybe<AgreementExtensionWidgets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementExtensionsArgs = {
  objects: Array<AgreementExtensions_Insert_Input>;
  on_conflict?: InputMaybe<AgreementExtensions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementExtensions_OneArgs = {
  object: AgreementExtensions_Insert_Input;
  on_conflict?: InputMaybe<AgreementExtensions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementRoleExtensionsArgs = {
  objects: Array<AgreementRoleExtensions_Insert_Input>;
  on_conflict?: InputMaybe<AgreementRoleExtensions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementRoleExtensions_OneArgs = {
  object: AgreementRoleExtensions_Insert_Input;
  on_conflict?: InputMaybe<AgreementRoleExtensions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementRoleTokenTransfersArgs = {
  objects: Array<AgreementRoleTokenTransfers_Insert_Input>;
  on_conflict?: InputMaybe<AgreementRoleTokenTransfers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementRoleTokenTransfers_OneArgs = {
  object: AgreementRoleTokenTransfers_Insert_Input;
  on_conflict?: InputMaybe<AgreementRoleTokenTransfers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementRoleTokensArgs = {
  objects: Array<AgreementRoleTokens_Insert_Input>;
  on_conflict?: InputMaybe<AgreementRoleTokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementRoleTokens_OneArgs = {
  object: AgreementRoleTokens_Insert_Input;
  on_conflict?: InputMaybe<AgreementRoleTokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementRoleWalletsArgs = {
  objects: Array<AgreementRoleWallets_Insert_Input>;
  on_conflict?: InputMaybe<AgreementRoleWallets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementRoleWallets_OneArgs = {
  object: AgreementRoleWallets_Insert_Input;
  on_conflict?: InputMaybe<AgreementRoleWallets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementRolesArgs = {
  objects: Array<AgreementRoles_Insert_Input>;
  on_conflict?: InputMaybe<AgreementRoles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementRoles_OneArgs = {
  object: AgreementRoles_Insert_Input;
  on_conflict?: InputMaybe<AgreementRoles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementTokenTransfersArgs = {
  objects: Array<AgreementTokenTransfers_Insert_Input>;
  on_conflict?: InputMaybe<AgreementTokenTransfers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementTokenTransfers_OneArgs = {
  object: AgreementTokenTransfers_Insert_Input;
  on_conflict?: InputMaybe<AgreementTokenTransfers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementTokensArgs = {
  objects: Array<AgreementTokens_Insert_Input>;
  on_conflict?: InputMaybe<AgreementTokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementTokens_OneArgs = {
  object: AgreementTokens_Insert_Input;
  on_conflict?: InputMaybe<AgreementTokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementWalletsArgs = {
  objects: Array<AgreementWallets_Insert_Input>;
  on_conflict?: InputMaybe<AgreementWallets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementWallets_OneArgs = {
  object: AgreementWallets_Insert_Input;
  on_conflict?: InputMaybe<AgreementWallets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AgreementsArgs = {
  objects: Array<Agreements_Insert_Input>;
  on_conflict?: InputMaybe<Agreements_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Agreements_OneArgs = {
  object: Agreements_Insert_Input;
  on_conflict?: InputMaybe<Agreements_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_BundleContractsArgs = {
  objects: Array<BundleContracts_Insert_Input>;
  on_conflict?: InputMaybe<BundleContracts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_BundleContracts_OneArgs = {
  object: BundleContracts_Insert_Input;
  on_conflict?: InputMaybe<BundleContracts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_BundlesArgs = {
  objects: Array<Bundles_Insert_Input>;
  on_conflict?: InputMaybe<Bundles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Bundles_OneArgs = {
  object: Bundles_Insert_Input;
  on_conflict?: InputMaybe<Bundles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ChainNoncesArgs = {
  objects: Array<ChainNonces_Insert_Input>;
  on_conflict?: InputMaybe<ChainNonces_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ChainNonces_OneArgs = {
  object: ChainNonces_Insert_Input;
  on_conflict?: InputMaybe<ChainNonces_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ContractInstancesArgs = {
  objects: Array<ContractInstances_Insert_Input>;
  on_conflict?: InputMaybe<ContractInstances_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ContractInstances_OneArgs = {
  object: ContractInstances_Insert_Input;
  on_conflict?: InputMaybe<ContractInstances_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ContractsArgs = {
  objects: Array<Contracts_Insert_Input>;
  on_conflict?: InputMaybe<Contracts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contracts_OneArgs = {
  object: Contracts_Insert_Input;
  on_conflict?: InputMaybe<Contracts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExtensionsArgs = {
  objects: Array<Extensions_Insert_Input>;
  on_conflict?: InputMaybe<Extensions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Extensions_OneArgs = {
  object: Extensions_Insert_Input;
  on_conflict?: InputMaybe<Extensions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_IdentityProvidersArgs = {
  objects: Array<IdentityProviders_Insert_Input>;
  on_conflict?: InputMaybe<IdentityProviders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_IdentityProviders_OneArgs = {
  object: IdentityProviders_Insert_Input;
  on_conflict?: InputMaybe<IdentityProviders_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_IntegrationsArgs = {
  objects: Array<Integrations_Insert_Input>;
  on_conflict?: InputMaybe<Integrations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Integrations_OneArgs = {
  object: Integrations_Insert_Input;
  on_conflict?: InputMaybe<Integrations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_RolePermissionsArgs = {
  objects: Array<RolePermissions_Insert_Input>;
  on_conflict?: InputMaybe<RolePermissions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_RolePermissions_OneArgs = {
  object: RolePermissions_Insert_Input;
  on_conflict?: InputMaybe<RolePermissions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SequelizeMetaArgs = {
  objects: Array<SequelizeMeta_Insert_Input>;
  on_conflict?: InputMaybe<SequelizeMeta_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SequelizeMeta_OneArgs = {
  object: SequelizeMeta_Insert_Input;
  on_conflict?: InputMaybe<SequelizeMeta_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TransactionsArgs = {
  objects: Array<Transactions_Insert_Input>;
  on_conflict?: InputMaybe<Transactions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Transactions_OneArgs = {
  object: Transactions_Insert_Input;
  on_conflict?: InputMaybe<Transactions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TransfersArgs = {
  objects: Array<Transfers_Insert_Input>;
  on_conflict?: InputMaybe<Transfers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Transfers_OneArgs = {
  object: Transfers_Insert_Input;
  on_conflict?: InputMaybe<Transfers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserIdentitiesArgs = {
  objects: Array<UserIdentities_Insert_Input>;
  on_conflict?: InputMaybe<UserIdentities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserIdentities_OneArgs = {
  object: UserIdentities_Insert_Input;
  on_conflict?: InputMaybe<UserIdentities_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_WalletContractInstancesArgs = {
  objects: Array<WalletContractInstances_Insert_Input>;
  on_conflict?: InputMaybe<WalletContractInstances_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_WalletContractInstances_OneArgs = {
  object: WalletContractInstances_Insert_Input;
  on_conflict?: InputMaybe<WalletContractInstances_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_WalletsArgs = {
  objects: Array<Wallets_Insert_Input>;
  on_conflict?: InputMaybe<Wallets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Wallets_OneArgs = {
  object: Wallets_Insert_Input;
  on_conflict?: InputMaybe<Wallets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementExtensionLinksArgs = {
  _append?: InputMaybe<AgreementExtensionLinks_Append_Input>;
  _delete_at_path?: InputMaybe<AgreementExtensionLinks_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AgreementExtensionLinks_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AgreementExtensionLinks_Delete_Key_Input>;
  _prepend?: InputMaybe<AgreementExtensionLinks_Prepend_Input>;
  _set?: InputMaybe<AgreementExtensionLinks_Set_Input>;
  where: AgreementExtensionLinks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementExtensionLinks_By_PkArgs = {
  _append?: InputMaybe<AgreementExtensionLinks_Append_Input>;
  _delete_at_path?: InputMaybe<AgreementExtensionLinks_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AgreementExtensionLinks_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AgreementExtensionLinks_Delete_Key_Input>;
  _prepend?: InputMaybe<AgreementExtensionLinks_Prepend_Input>;
  _set?: InputMaybe<AgreementExtensionLinks_Set_Input>;
  pk_columns: AgreementExtensionLinks_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementExtensionLinks_ManyArgs = {
  updates: Array<AgreementExtensionLinks_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementExtensionRolesArgs = {
  _append?: InputMaybe<AgreementExtensionRoles_Append_Input>;
  _delete_at_path?: InputMaybe<AgreementExtensionRoles_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AgreementExtensionRoles_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AgreementExtensionRoles_Delete_Key_Input>;
  _prepend?: InputMaybe<AgreementExtensionRoles_Prepend_Input>;
  _set?: InputMaybe<AgreementExtensionRoles_Set_Input>;
  where: AgreementExtensionRoles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementExtensionRoles_By_PkArgs = {
  _append?: InputMaybe<AgreementExtensionRoles_Append_Input>;
  _delete_at_path?: InputMaybe<AgreementExtensionRoles_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AgreementExtensionRoles_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AgreementExtensionRoles_Delete_Key_Input>;
  _prepend?: InputMaybe<AgreementExtensionRoles_Prepend_Input>;
  _set?: InputMaybe<AgreementExtensionRoles_Set_Input>;
  pk_columns: AgreementExtensionRoles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementExtensionRoles_ManyArgs = {
  updates: Array<AgreementExtensionRoles_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementExtensionStoragesArgs = {
  _append?: InputMaybe<AgreementExtensionStorages_Append_Input>;
  _delete_at_path?: InputMaybe<AgreementExtensionStorages_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AgreementExtensionStorages_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AgreementExtensionStorages_Delete_Key_Input>;
  _prepend?: InputMaybe<AgreementExtensionStorages_Prepend_Input>;
  _set?: InputMaybe<AgreementExtensionStorages_Set_Input>;
  where: AgreementExtensionStorages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementExtensionStorages_By_PkArgs = {
  _append?: InputMaybe<AgreementExtensionStorages_Append_Input>;
  _delete_at_path?: InputMaybe<AgreementExtensionStorages_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AgreementExtensionStorages_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AgreementExtensionStorages_Delete_Key_Input>;
  _prepend?: InputMaybe<AgreementExtensionStorages_Prepend_Input>;
  _set?: InputMaybe<AgreementExtensionStorages_Set_Input>;
  pk_columns: AgreementExtensionStorages_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementExtensionStorages_ManyArgs = {
  updates: Array<AgreementExtensionStorages_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementExtensionWidgetsArgs = {
  _append?: InputMaybe<AgreementExtensionWidgets_Append_Input>;
  _delete_at_path?: InputMaybe<AgreementExtensionWidgets_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AgreementExtensionWidgets_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AgreementExtensionWidgets_Delete_Key_Input>;
  _prepend?: InputMaybe<AgreementExtensionWidgets_Prepend_Input>;
  _set?: InputMaybe<AgreementExtensionWidgets_Set_Input>;
  where: AgreementExtensionWidgets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementExtensionWidgets_By_PkArgs = {
  _append?: InputMaybe<AgreementExtensionWidgets_Append_Input>;
  _delete_at_path?: InputMaybe<AgreementExtensionWidgets_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AgreementExtensionWidgets_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AgreementExtensionWidgets_Delete_Key_Input>;
  _prepend?: InputMaybe<AgreementExtensionWidgets_Prepend_Input>;
  _set?: InputMaybe<AgreementExtensionWidgets_Set_Input>;
  pk_columns: AgreementExtensionWidgets_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementExtensionWidgets_ManyArgs = {
  updates: Array<AgreementExtensionWidgets_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementExtensionsArgs = {
  _append?: InputMaybe<AgreementExtensions_Append_Input>;
  _delete_at_path?: InputMaybe<AgreementExtensions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AgreementExtensions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AgreementExtensions_Delete_Key_Input>;
  _prepend?: InputMaybe<AgreementExtensions_Prepend_Input>;
  _set?: InputMaybe<AgreementExtensions_Set_Input>;
  where: AgreementExtensions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementExtensions_By_PkArgs = {
  _append?: InputMaybe<AgreementExtensions_Append_Input>;
  _delete_at_path?: InputMaybe<AgreementExtensions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AgreementExtensions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AgreementExtensions_Delete_Key_Input>;
  _prepend?: InputMaybe<AgreementExtensions_Prepend_Input>;
  _set?: InputMaybe<AgreementExtensions_Set_Input>;
  pk_columns: AgreementExtensions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementExtensions_ManyArgs = {
  updates: Array<AgreementExtensions_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementRoleExtensionsArgs = {
  _append?: InputMaybe<AgreementRoleExtensions_Append_Input>;
  _delete_at_path?: InputMaybe<AgreementRoleExtensions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AgreementRoleExtensions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AgreementRoleExtensions_Delete_Key_Input>;
  _prepend?: InputMaybe<AgreementRoleExtensions_Prepend_Input>;
  _set?: InputMaybe<AgreementRoleExtensions_Set_Input>;
  where: AgreementRoleExtensions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementRoleExtensions_By_PkArgs = {
  _append?: InputMaybe<AgreementRoleExtensions_Append_Input>;
  _delete_at_path?: InputMaybe<AgreementRoleExtensions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AgreementRoleExtensions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AgreementRoleExtensions_Delete_Key_Input>;
  _prepend?: InputMaybe<AgreementRoleExtensions_Prepend_Input>;
  _set?: InputMaybe<AgreementRoleExtensions_Set_Input>;
  pk_columns: AgreementRoleExtensions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementRoleExtensions_ManyArgs = {
  updates: Array<AgreementRoleExtensions_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementRoleTokenTransfersArgs = {
  _set?: InputMaybe<AgreementRoleTokenTransfers_Set_Input>;
  where: AgreementRoleTokenTransfers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementRoleTokenTransfers_By_PkArgs = {
  _set?: InputMaybe<AgreementRoleTokenTransfers_Set_Input>;
  pk_columns: AgreementRoleTokenTransfers_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementRoleTokenTransfers_ManyArgs = {
  updates: Array<AgreementRoleTokenTransfers_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementRoleTokensArgs = {
  _append?: InputMaybe<AgreementRoleTokens_Append_Input>;
  _delete_at_path?: InputMaybe<AgreementRoleTokens_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AgreementRoleTokens_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AgreementRoleTokens_Delete_Key_Input>;
  _prepend?: InputMaybe<AgreementRoleTokens_Prepend_Input>;
  _set?: InputMaybe<AgreementRoleTokens_Set_Input>;
  where: AgreementRoleTokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementRoleTokens_By_PkArgs = {
  _append?: InputMaybe<AgreementRoleTokens_Append_Input>;
  _delete_at_path?: InputMaybe<AgreementRoleTokens_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AgreementRoleTokens_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AgreementRoleTokens_Delete_Key_Input>;
  _prepend?: InputMaybe<AgreementRoleTokens_Prepend_Input>;
  _set?: InputMaybe<AgreementRoleTokens_Set_Input>;
  pk_columns: AgreementRoleTokens_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementRoleTokens_ManyArgs = {
  updates: Array<AgreementRoleTokens_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementRoleWalletsArgs = {
  _set?: InputMaybe<AgreementRoleWallets_Set_Input>;
  where: AgreementRoleWallets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementRoleWallets_By_PkArgs = {
  _set?: InputMaybe<AgreementRoleWallets_Set_Input>;
  pk_columns: AgreementRoleWallets_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementRoleWallets_ManyArgs = {
  updates: Array<AgreementRoleWallets_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementRolesArgs = {
  _append?: InputMaybe<AgreementRoles_Append_Input>;
  _delete_at_path?: InputMaybe<AgreementRoles_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AgreementRoles_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AgreementRoles_Delete_Key_Input>;
  _inc?: InputMaybe<AgreementRoles_Inc_Input>;
  _prepend?: InputMaybe<AgreementRoles_Prepend_Input>;
  _set?: InputMaybe<AgreementRoles_Set_Input>;
  where: AgreementRoles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementRoles_By_PkArgs = {
  _append?: InputMaybe<AgreementRoles_Append_Input>;
  _delete_at_path?: InputMaybe<AgreementRoles_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AgreementRoles_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AgreementRoles_Delete_Key_Input>;
  _inc?: InputMaybe<AgreementRoles_Inc_Input>;
  _prepend?: InputMaybe<AgreementRoles_Prepend_Input>;
  _set?: InputMaybe<AgreementRoles_Set_Input>;
  pk_columns: AgreementRoles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementRoles_ManyArgs = {
  updates: Array<AgreementRoles_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementTokenTransfersArgs = {
  _set?: InputMaybe<AgreementTokenTransfers_Set_Input>;
  where: AgreementTokenTransfers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementTokenTransfers_By_PkArgs = {
  _set?: InputMaybe<AgreementTokenTransfers_Set_Input>;
  pk_columns: AgreementTokenTransfers_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementTokenTransfers_ManyArgs = {
  updates: Array<AgreementTokenTransfers_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementTokensArgs = {
  _append?: InputMaybe<AgreementTokens_Append_Input>;
  _delete_at_path?: InputMaybe<AgreementTokens_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AgreementTokens_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AgreementTokens_Delete_Key_Input>;
  _prepend?: InputMaybe<AgreementTokens_Prepend_Input>;
  _set?: InputMaybe<AgreementTokens_Set_Input>;
  where: AgreementTokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementTokens_By_PkArgs = {
  _append?: InputMaybe<AgreementTokens_Append_Input>;
  _delete_at_path?: InputMaybe<AgreementTokens_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<AgreementTokens_Delete_Elem_Input>;
  _delete_key?: InputMaybe<AgreementTokens_Delete_Key_Input>;
  _prepend?: InputMaybe<AgreementTokens_Prepend_Input>;
  _set?: InputMaybe<AgreementTokens_Set_Input>;
  pk_columns: AgreementTokens_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementTokens_ManyArgs = {
  updates: Array<AgreementTokens_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementWalletsArgs = {
  _set?: InputMaybe<AgreementWallets_Set_Input>;
  where: AgreementWallets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementWallets_By_PkArgs = {
  _set?: InputMaybe<AgreementWallets_Set_Input>;
  pk_columns: AgreementWallets_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementWallets_ManyArgs = {
  updates: Array<AgreementWallets_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_AgreementsArgs = {
  _append?: InputMaybe<Agreements_Append_Input>;
  _delete_at_path?: InputMaybe<Agreements_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Agreements_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Agreements_Delete_Key_Input>;
  _inc?: InputMaybe<Agreements_Inc_Input>;
  _prepend?: InputMaybe<Agreements_Prepend_Input>;
  _set?: InputMaybe<Agreements_Set_Input>;
  where: Agreements_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Agreements_By_PkArgs = {
  _append?: InputMaybe<Agreements_Append_Input>;
  _delete_at_path?: InputMaybe<Agreements_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Agreements_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Agreements_Delete_Key_Input>;
  _inc?: InputMaybe<Agreements_Inc_Input>;
  _prepend?: InputMaybe<Agreements_Prepend_Input>;
  _set?: InputMaybe<Agreements_Set_Input>;
  pk_columns: Agreements_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Agreements_ManyArgs = {
  updates: Array<Agreements_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_BundleContractsArgs = {
  _append?: InputMaybe<BundleContracts_Append_Input>;
  _delete_at_path?: InputMaybe<BundleContracts_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<BundleContracts_Delete_Elem_Input>;
  _delete_key?: InputMaybe<BundleContracts_Delete_Key_Input>;
  _inc?: InputMaybe<BundleContracts_Inc_Input>;
  _prepend?: InputMaybe<BundleContracts_Prepend_Input>;
  _set?: InputMaybe<BundleContracts_Set_Input>;
  where: BundleContracts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_BundleContracts_By_PkArgs = {
  _append?: InputMaybe<BundleContracts_Append_Input>;
  _delete_at_path?: InputMaybe<BundleContracts_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<BundleContracts_Delete_Elem_Input>;
  _delete_key?: InputMaybe<BundleContracts_Delete_Key_Input>;
  _inc?: InputMaybe<BundleContracts_Inc_Input>;
  _prepend?: InputMaybe<BundleContracts_Prepend_Input>;
  _set?: InputMaybe<BundleContracts_Set_Input>;
  pk_columns: BundleContracts_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_BundleContracts_ManyArgs = {
  updates: Array<BundleContracts_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_BundlesArgs = {
  _append?: InputMaybe<Bundles_Append_Input>;
  _delete_at_path?: InputMaybe<Bundles_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Bundles_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Bundles_Delete_Key_Input>;
  _prepend?: InputMaybe<Bundles_Prepend_Input>;
  _set?: InputMaybe<Bundles_Set_Input>;
  where: Bundles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Bundles_By_PkArgs = {
  _append?: InputMaybe<Bundles_Append_Input>;
  _delete_at_path?: InputMaybe<Bundles_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Bundles_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Bundles_Delete_Key_Input>;
  _prepend?: InputMaybe<Bundles_Prepend_Input>;
  _set?: InputMaybe<Bundles_Set_Input>;
  pk_columns: Bundles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Bundles_ManyArgs = {
  updates: Array<Bundles_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ChainNoncesArgs = {
  _inc?: InputMaybe<ChainNonces_Inc_Input>;
  _set?: InputMaybe<ChainNonces_Set_Input>;
  where: ChainNonces_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ChainNonces_By_PkArgs = {
  _inc?: InputMaybe<ChainNonces_Inc_Input>;
  _set?: InputMaybe<ChainNonces_Set_Input>;
  pk_columns: ChainNonces_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ChainNonces_ManyArgs = {
  updates: Array<ChainNonces_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ContractInstancesArgs = {
  _inc?: InputMaybe<ContractInstances_Inc_Input>;
  _set?: InputMaybe<ContractInstances_Set_Input>;
  where: ContractInstances_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_ContractInstances_By_PkArgs = {
  _inc?: InputMaybe<ContractInstances_Inc_Input>;
  _set?: InputMaybe<ContractInstances_Set_Input>;
  pk_columns: ContractInstances_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ContractInstances_ManyArgs = {
  updates: Array<ContractInstances_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ContractsArgs = {
  _append?: InputMaybe<Contracts_Append_Input>;
  _delete_at_path?: InputMaybe<Contracts_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Contracts_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Contracts_Delete_Key_Input>;
  _inc?: InputMaybe<Contracts_Inc_Input>;
  _prepend?: InputMaybe<Contracts_Prepend_Input>;
  _set?: InputMaybe<Contracts_Set_Input>;
  where: Contracts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contracts_By_PkArgs = {
  _append?: InputMaybe<Contracts_Append_Input>;
  _delete_at_path?: InputMaybe<Contracts_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Contracts_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Contracts_Delete_Key_Input>;
  _inc?: InputMaybe<Contracts_Inc_Input>;
  _prepend?: InputMaybe<Contracts_Prepend_Input>;
  _set?: InputMaybe<Contracts_Set_Input>;
  pk_columns: Contracts_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Contracts_ManyArgs = {
  updates: Array<Contracts_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ExtensionsArgs = {
  _append?: InputMaybe<Extensions_Append_Input>;
  _delete_at_path?: InputMaybe<Extensions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Extensions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Extensions_Delete_Key_Input>;
  _prepend?: InputMaybe<Extensions_Prepend_Input>;
  _set?: InputMaybe<Extensions_Set_Input>;
  where: Extensions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Extensions_By_PkArgs = {
  _append?: InputMaybe<Extensions_Append_Input>;
  _delete_at_path?: InputMaybe<Extensions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Extensions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Extensions_Delete_Key_Input>;
  _prepend?: InputMaybe<Extensions_Prepend_Input>;
  _set?: InputMaybe<Extensions_Set_Input>;
  pk_columns: Extensions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Extensions_ManyArgs = {
  updates: Array<Extensions_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_IdentityProvidersArgs = {
  _set?: InputMaybe<IdentityProviders_Set_Input>;
  where: IdentityProviders_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_IdentityProviders_By_PkArgs = {
  _set?: InputMaybe<IdentityProviders_Set_Input>;
  pk_columns: IdentityProviders_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_IdentityProviders_ManyArgs = {
  updates: Array<IdentityProviders_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_IntegrationsArgs = {
  _set?: InputMaybe<Integrations_Set_Input>;
  where: Integrations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Integrations_By_PkArgs = {
  _set?: InputMaybe<Integrations_Set_Input>;
  pk_columns: Integrations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Integrations_ManyArgs = {
  updates: Array<Integrations_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_RolePermissionsArgs = {
  _set?: InputMaybe<RolePermissions_Set_Input>;
  where: RolePermissions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_RolePermissions_By_PkArgs = {
  _set?: InputMaybe<RolePermissions_Set_Input>;
  pk_columns: RolePermissions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_RolePermissions_ManyArgs = {
  updates: Array<RolePermissions_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_SequelizeMetaArgs = {
  _set?: InputMaybe<SequelizeMeta_Set_Input>;
  where: SequelizeMeta_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_SequelizeMeta_By_PkArgs = {
  _set?: InputMaybe<SequelizeMeta_Set_Input>;
  pk_columns: SequelizeMeta_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_SequelizeMeta_ManyArgs = {
  updates: Array<SequelizeMeta_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TransactionsArgs = {
  _append?: InputMaybe<Transactions_Append_Input>;
  _delete_at_path?: InputMaybe<Transactions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Transactions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Transactions_Delete_Key_Input>;
  _inc?: InputMaybe<Transactions_Inc_Input>;
  _prepend?: InputMaybe<Transactions_Prepend_Input>;
  _set?: InputMaybe<Transactions_Set_Input>;
  where: Transactions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Transactions_By_PkArgs = {
  _append?: InputMaybe<Transactions_Append_Input>;
  _delete_at_path?: InputMaybe<Transactions_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Transactions_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Transactions_Delete_Key_Input>;
  _inc?: InputMaybe<Transactions_Inc_Input>;
  _prepend?: InputMaybe<Transactions_Prepend_Input>;
  _set?: InputMaybe<Transactions_Set_Input>;
  pk_columns: Transactions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Transactions_ManyArgs = {
  updates: Array<Transactions_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TransfersArgs = {
  _set?: InputMaybe<Transfers_Set_Input>;
  where: Transfers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Transfers_By_PkArgs = {
  _set?: InputMaybe<Transfers_Set_Input>;
  pk_columns: Transfers_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Transfers_ManyArgs = {
  updates: Array<Transfers_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UserIdentitiesArgs = {
  _append?: InputMaybe<UserIdentities_Append_Input>;
  _delete_at_path?: InputMaybe<UserIdentities_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<UserIdentities_Delete_Elem_Input>;
  _delete_key?: InputMaybe<UserIdentities_Delete_Key_Input>;
  _prepend?: InputMaybe<UserIdentities_Prepend_Input>;
  _set?: InputMaybe<UserIdentities_Set_Input>;
  where: UserIdentities_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_UserIdentities_By_PkArgs = {
  _append?: InputMaybe<UserIdentities_Append_Input>;
  _delete_at_path?: InputMaybe<UserIdentities_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<UserIdentities_Delete_Elem_Input>;
  _delete_key?: InputMaybe<UserIdentities_Delete_Key_Input>;
  _prepend?: InputMaybe<UserIdentities_Prepend_Input>;
  _set?: InputMaybe<UserIdentities_Set_Input>;
  pk_columns: UserIdentities_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UserIdentities_ManyArgs = {
  updates: Array<UserIdentities_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_WalletContractInstancesArgs = {
  _set?: InputMaybe<WalletContractInstances_Set_Input>;
  where: WalletContractInstances_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_WalletContractInstances_By_PkArgs = {
  _set?: InputMaybe<WalletContractInstances_Set_Input>;
  pk_columns: WalletContractInstances_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_WalletContractInstances_ManyArgs = {
  updates: Array<WalletContractInstances_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_WalletsArgs = {
  _inc?: InputMaybe<Wallets_Inc_Input>;
  _set?: InputMaybe<Wallets_Set_Input>;
  where: Wallets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Wallets_By_PkArgs = {
  _inc?: InputMaybe<Wallets_Inc_Input>;
  _set?: InputMaybe<Wallets_Set_Input>;
  pk_columns: Wallets_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Wallets_ManyArgs = {
  updates: Array<Wallets_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  AgreementExtensionLinks: Array<AgreementExtensionLinks>;
  /** An aggregate relationship */
  AgreementExtensionLinks_aggregate: AgreementExtensionLinks_Aggregate;
  /** fetch data from the table: "AgreementExtensionLinks" using primary key columns */
  AgreementExtensionLinks_by_pk?: Maybe<AgreementExtensionLinks>;
  /** An array relationship */
  AgreementExtensionRoles: Array<AgreementExtensionRoles>;
  /** An aggregate relationship */
  AgreementExtensionRoles_aggregate: AgreementExtensionRoles_Aggregate;
  /** fetch data from the table: "AgreementExtensionRoles" using primary key columns */
  AgreementExtensionRoles_by_pk?: Maybe<AgreementExtensionRoles>;
  /** fetch data from the table: "AgreementExtensionStorages" */
  AgreementExtensionStorages: Array<AgreementExtensionStorages>;
  /** fetch aggregated fields from the table: "AgreementExtensionStorages" */
  AgreementExtensionStorages_aggregate: AgreementExtensionStorages_Aggregate;
  /** fetch data from the table: "AgreementExtensionStorages" using primary key columns */
  AgreementExtensionStorages_by_pk?: Maybe<AgreementExtensionStorages>;
  /** An array relationship */
  AgreementExtensionWidgets: Array<AgreementExtensionWidgets>;
  /** An aggregate relationship */
  AgreementExtensionWidgets_aggregate: AgreementExtensionWidgets_Aggregate;
  /** fetch data from the table: "AgreementExtensionWidgets" using primary key columns */
  AgreementExtensionWidgets_by_pk?: Maybe<AgreementExtensionWidgets>;
  /** An array relationship */
  AgreementExtensions: Array<AgreementExtensions>;
  /** An aggregate relationship */
  AgreementExtensions_aggregate: AgreementExtensions_Aggregate;
  /** fetch data from the table: "AgreementExtensions" using primary key columns */
  AgreementExtensions_by_pk?: Maybe<AgreementExtensions>;
  /** An array relationship */
  AgreementRoleExtensions: Array<AgreementRoleExtensions>;
  /** An aggregate relationship */
  AgreementRoleExtensions_aggregate: AgreementRoleExtensions_Aggregate;
  /** fetch data from the table: "AgreementRoleExtensions" using primary key columns */
  AgreementRoleExtensions_by_pk?: Maybe<AgreementRoleExtensions>;
  /** An array relationship */
  AgreementRoleTokenTransfers: Array<AgreementRoleTokenTransfers>;
  /** An aggregate relationship */
  AgreementRoleTokenTransfers_aggregate: AgreementRoleTokenTransfers_Aggregate;
  /** fetch data from the table: "AgreementRoleTokenTransfers" using primary key columns */
  AgreementRoleTokenTransfers_by_pk?: Maybe<AgreementRoleTokenTransfers>;
  /** An array relationship */
  AgreementRoleTokens: Array<AgreementRoleTokens>;
  /** An aggregate relationship */
  AgreementRoleTokens_aggregate: AgreementRoleTokens_Aggregate;
  /** fetch data from the table: "AgreementRoleTokens" using primary key columns */
  AgreementRoleTokens_by_pk?: Maybe<AgreementRoleTokens>;
  /** fetch data from the table: "AgreementRoleWallets" */
  AgreementRoleWallets: Array<AgreementRoleWallets>;
  /** fetch aggregated fields from the table: "AgreementRoleWallets" */
  AgreementRoleWallets_aggregate: AgreementRoleWallets_Aggregate;
  /** fetch data from the table: "AgreementRoleWallets" using primary key columns */
  AgreementRoleWallets_by_pk?: Maybe<AgreementRoleWallets>;
  /** An array relationship */
  AgreementRoles: Array<AgreementRoles>;
  /** An aggregate relationship */
  AgreementRoles_aggregate: AgreementRoles_Aggregate;
  /** fetch data from the table: "AgreementRoles" using primary key columns */
  AgreementRoles_by_pk?: Maybe<AgreementRoles>;
  /** An array relationship */
  AgreementTokenTransfers: Array<AgreementTokenTransfers>;
  /** An aggregate relationship */
  AgreementTokenTransfers_aggregate: AgreementTokenTransfers_Aggregate;
  /** fetch data from the table: "AgreementTokenTransfers" using primary key columns */
  AgreementTokenTransfers_by_pk?: Maybe<AgreementTokenTransfers>;
  /** An array relationship */
  AgreementTokens: Array<AgreementTokens>;
  /** An aggregate relationship */
  AgreementTokens_aggregate: AgreementTokens_Aggregate;
  /** fetch data from the table: "AgreementTokens" using primary key columns */
  AgreementTokens_by_pk?: Maybe<AgreementTokens>;
  /** An array relationship */
  AgreementWallets: Array<AgreementWallets>;
  /** An aggregate relationship */
  AgreementWallets_aggregate: AgreementWallets_Aggregate;
  /** fetch data from the table: "AgreementWallets" using primary key columns */
  AgreementWallets_by_pk?: Maybe<AgreementWallets>;
  /** An array relationship */
  Agreements: Array<Agreements>;
  /** An aggregate relationship */
  Agreements_aggregate: Agreements_Aggregate;
  /** fetch data from the table: "Agreements" using primary key columns */
  Agreements_by_pk?: Maybe<Agreements>;
  /** An array relationship */
  BundleContracts: Array<BundleContracts>;
  /** An aggregate relationship */
  BundleContracts_aggregate: BundleContracts_Aggregate;
  /** fetch data from the table: "BundleContracts" using primary key columns */
  BundleContracts_by_pk?: Maybe<BundleContracts>;
  /** An array relationship */
  Bundles: Array<Bundles>;
  /** An aggregate relationship */
  Bundles_aggregate: Bundles_Aggregate;
  /** fetch data from the table: "Bundles" using primary key columns */
  Bundles_by_pk?: Maybe<Bundles>;
  /** fetch data from the table: "ChainNonces" */
  ChainNonces: Array<ChainNonces>;
  /** fetch aggregated fields from the table: "ChainNonces" */
  ChainNonces_aggregate: ChainNonces_Aggregate;
  /** fetch data from the table: "ChainNonces" using primary key columns */
  ChainNonces_by_pk?: Maybe<ChainNonces>;
  /** An array relationship */
  ContractInstances: Array<ContractInstances>;
  /** An aggregate relationship */
  ContractInstances_aggregate: ContractInstances_Aggregate;
  /** fetch data from the table: "ContractInstances" using primary key columns */
  ContractInstances_by_pk?: Maybe<ContractInstances>;
  /** An array relationship */
  Contracts: Array<Contracts>;
  /** An aggregate relationship */
  Contracts_aggregate: Contracts_Aggregate;
  /** fetch data from the table: "Contracts" using primary key columns */
  Contracts_by_pk?: Maybe<Contracts>;
  /** fetch data from the table: "Extensions" */
  Extensions: Array<Extensions>;
  /** fetch aggregated fields from the table: "Extensions" */
  Extensions_aggregate: Extensions_Aggregate;
  /** fetch data from the table: "Extensions" using primary key columns */
  Extensions_by_pk?: Maybe<Extensions>;
  /** fetch data from the table: "IdentityProviders" */
  IdentityProviders: Array<IdentityProviders>;
  /** fetch aggregated fields from the table: "IdentityProviders" */
  IdentityProviders_aggregate: IdentityProviders_Aggregate;
  /** fetch data from the table: "IdentityProviders" using primary key columns */
  IdentityProviders_by_pk?: Maybe<IdentityProviders>;
  /** fetch data from the table: "Integrations" */
  Integrations: Array<Integrations>;
  /** fetch aggregated fields from the table: "Integrations" */
  Integrations_aggregate: Integrations_Aggregate;
  /** fetch data from the table: "Integrations" using primary key columns */
  Integrations_by_pk?: Maybe<Integrations>;
  /** fetch data from the table: "RolePermissions" */
  RolePermissions: Array<RolePermissions>;
  /** fetch aggregated fields from the table: "RolePermissions" */
  RolePermissions_aggregate: RolePermissions_Aggregate;
  /** fetch data from the table: "RolePermissions" using primary key columns */
  RolePermissions_by_pk?: Maybe<RolePermissions>;
  /** fetch data from the table: "SequelizeMeta" */
  SequelizeMeta: Array<SequelizeMeta>;
  /** fetch aggregated fields from the table: "SequelizeMeta" */
  SequelizeMeta_aggregate: SequelizeMeta_Aggregate;
  /** fetch data from the table: "SequelizeMeta" using primary key columns */
  SequelizeMeta_by_pk?: Maybe<SequelizeMeta>;
  /** An array relationship */
  Transactions: Array<Transactions>;
  /** An aggregate relationship */
  Transactions_aggregate: Transactions_Aggregate;
  /** fetch data from the table: "Transactions" using primary key columns */
  Transactions_by_pk?: Maybe<Transactions>;
  /** fetch data from the table: "Transfers" */
  Transfers: Array<Transfers>;
  /** fetch aggregated fields from the table: "Transfers" */
  Transfers_aggregate: Transfers_Aggregate;
  /** fetch data from the table: "Transfers" using primary key columns */
  Transfers_by_pk?: Maybe<Transfers>;
  /** An array relationship */
  UserIdentities: Array<UserIdentities>;
  /** An aggregate relationship */
  UserIdentities_aggregate: UserIdentities_Aggregate;
  /** fetch data from the table: "UserIdentities" using primary key columns */
  UserIdentities_by_pk?: Maybe<UserIdentities>;
  /** An array relationship */
  Users: Array<Users>;
  /** An aggregate relationship */
  Users_aggregate: Users_Aggregate;
  /** fetch data from the table: "Users" using primary key columns */
  Users_by_pk?: Maybe<Users>;
  /** An array relationship */
  WalletContractInstances: Array<WalletContractInstances>;
  /** An aggregate relationship */
  WalletContractInstances_aggregate: WalletContractInstances_Aggregate;
  /** fetch data from the table: "WalletContractInstances" using primary key columns */
  WalletContractInstances_by_pk?: Maybe<WalletContractInstances>;
  /** An array relationship */
  Wallets: Array<Wallets>;
  /** An aggregate relationship */
  Wallets_aggregate: Wallets_Aggregate;
  /** fetch data from the table: "Wallets" using primary key columns */
  Wallets_by_pk?: Maybe<Wallets>;
};


export type Query_RootAgreementExtensionLinksArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionLinks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionLinks_Order_By>>;
  where?: InputMaybe<AgreementExtensionLinks_Bool_Exp>;
};


export type Query_RootAgreementExtensionLinks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionLinks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionLinks_Order_By>>;
  where?: InputMaybe<AgreementExtensionLinks_Bool_Exp>;
};


export type Query_RootAgreementExtensionLinks_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAgreementExtensionRolesArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionRoles_Order_By>>;
  where?: InputMaybe<AgreementExtensionRoles_Bool_Exp>;
};


export type Query_RootAgreementExtensionRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionRoles_Order_By>>;
  where?: InputMaybe<AgreementExtensionRoles_Bool_Exp>;
};


export type Query_RootAgreementExtensionRoles_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAgreementExtensionStoragesArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionStorages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionStorages_Order_By>>;
  where?: InputMaybe<AgreementExtensionStorages_Bool_Exp>;
};


export type Query_RootAgreementExtensionStorages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionStorages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionStorages_Order_By>>;
  where?: InputMaybe<AgreementExtensionStorages_Bool_Exp>;
};


export type Query_RootAgreementExtensionStorages_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAgreementExtensionWidgetsArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionWidgets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionWidgets_Order_By>>;
  where?: InputMaybe<AgreementExtensionWidgets_Bool_Exp>;
};


export type Query_RootAgreementExtensionWidgets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionWidgets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionWidgets_Order_By>>;
  where?: InputMaybe<AgreementExtensionWidgets_Bool_Exp>;
};


export type Query_RootAgreementExtensionWidgets_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAgreementExtensionsArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensions_Order_By>>;
  where?: InputMaybe<AgreementExtensions_Bool_Exp>;
};


export type Query_RootAgreementExtensions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensions_Order_By>>;
  where?: InputMaybe<AgreementExtensions_Bool_Exp>;
};


export type Query_RootAgreementExtensions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAgreementRoleExtensionsArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleExtensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleExtensions_Order_By>>;
  where?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
};


export type Query_RootAgreementRoleExtensions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleExtensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleExtensions_Order_By>>;
  where?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
};


export type Query_RootAgreementRoleExtensions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAgreementRoleTokenTransfersArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleTokenTransfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleTokenTransfers_Order_By>>;
  where?: InputMaybe<AgreementRoleTokenTransfers_Bool_Exp>;
};


export type Query_RootAgreementRoleTokenTransfers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleTokenTransfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleTokenTransfers_Order_By>>;
  where?: InputMaybe<AgreementRoleTokenTransfers_Bool_Exp>;
};


export type Query_RootAgreementRoleTokenTransfers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAgreementRoleTokensArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleTokens_Order_By>>;
  where?: InputMaybe<AgreementRoleTokens_Bool_Exp>;
};


export type Query_RootAgreementRoleTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleTokens_Order_By>>;
  where?: InputMaybe<AgreementRoleTokens_Bool_Exp>;
};


export type Query_RootAgreementRoleTokens_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAgreementRoleWalletsArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleWallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleWallets_Order_By>>;
  where?: InputMaybe<AgreementRoleWallets_Bool_Exp>;
};


export type Query_RootAgreementRoleWallets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleWallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleWallets_Order_By>>;
  where?: InputMaybe<AgreementRoleWallets_Bool_Exp>;
};


export type Query_RootAgreementRoleWallets_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAgreementRolesArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoles_Order_By>>;
  where?: InputMaybe<AgreementRoles_Bool_Exp>;
};


export type Query_RootAgreementRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoles_Order_By>>;
  where?: InputMaybe<AgreementRoles_Bool_Exp>;
};


export type Query_RootAgreementRoles_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAgreementTokenTransfersArgs = {
  distinct_on?: InputMaybe<Array<AgreementTokenTransfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementTokenTransfers_Order_By>>;
  where?: InputMaybe<AgreementTokenTransfers_Bool_Exp>;
};


export type Query_RootAgreementTokenTransfers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementTokenTransfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementTokenTransfers_Order_By>>;
  where?: InputMaybe<AgreementTokenTransfers_Bool_Exp>;
};


export type Query_RootAgreementTokenTransfers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAgreementTokensArgs = {
  distinct_on?: InputMaybe<Array<AgreementTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementTokens_Order_By>>;
  where?: InputMaybe<AgreementTokens_Bool_Exp>;
};


export type Query_RootAgreementTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementTokens_Order_By>>;
  where?: InputMaybe<AgreementTokens_Bool_Exp>;
};


export type Query_RootAgreementTokens_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAgreementWalletsArgs = {
  distinct_on?: InputMaybe<Array<AgreementWallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementWallets_Order_By>>;
  where?: InputMaybe<AgreementWallets_Bool_Exp>;
};


export type Query_RootAgreementWallets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementWallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementWallets_Order_By>>;
  where?: InputMaybe<AgreementWallets_Bool_Exp>;
};


export type Query_RootAgreementWallets_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAgreementsArgs = {
  distinct_on?: InputMaybe<Array<Agreements_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Agreements_Order_By>>;
  where?: InputMaybe<Agreements_Bool_Exp>;
};


export type Query_RootAgreements_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Agreements_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Agreements_Order_By>>;
  where?: InputMaybe<Agreements_Bool_Exp>;
};


export type Query_RootAgreements_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootBundleContractsArgs = {
  distinct_on?: InputMaybe<Array<BundleContracts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BundleContracts_Order_By>>;
  where?: InputMaybe<BundleContracts_Bool_Exp>;
};


export type Query_RootBundleContracts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<BundleContracts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BundleContracts_Order_By>>;
  where?: InputMaybe<BundleContracts_Bool_Exp>;
};


export type Query_RootBundleContracts_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootBundlesArgs = {
  distinct_on?: InputMaybe<Array<Bundles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bundles_Order_By>>;
  where?: InputMaybe<Bundles_Bool_Exp>;
};


export type Query_RootBundles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Bundles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bundles_Order_By>>;
  where?: InputMaybe<Bundles_Bool_Exp>;
};


export type Query_RootBundles_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootChainNoncesArgs = {
  distinct_on?: InputMaybe<Array<ChainNonces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ChainNonces_Order_By>>;
  where?: InputMaybe<ChainNonces_Bool_Exp>;
};


export type Query_RootChainNonces_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ChainNonces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ChainNonces_Order_By>>;
  where?: InputMaybe<ChainNonces_Bool_Exp>;
};


export type Query_RootChainNonces_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootContractInstancesArgs = {
  distinct_on?: InputMaybe<Array<ContractInstances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ContractInstances_Order_By>>;
  where?: InputMaybe<ContractInstances_Bool_Exp>;
};


export type Query_RootContractInstances_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ContractInstances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ContractInstances_Order_By>>;
  where?: InputMaybe<ContractInstances_Bool_Exp>;
};


export type Query_RootContractInstances_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootContractsArgs = {
  distinct_on?: InputMaybe<Array<Contracts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contracts_Order_By>>;
  where?: InputMaybe<Contracts_Bool_Exp>;
};


export type Query_RootContracts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contracts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contracts_Order_By>>;
  where?: InputMaybe<Contracts_Bool_Exp>;
};


export type Query_RootContracts_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootExtensionsArgs = {
  distinct_on?: InputMaybe<Array<Extensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Extensions_Order_By>>;
  where?: InputMaybe<Extensions_Bool_Exp>;
};


export type Query_RootExtensions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Extensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Extensions_Order_By>>;
  where?: InputMaybe<Extensions_Bool_Exp>;
};


export type Query_RootExtensions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootIdentityProvidersArgs = {
  distinct_on?: InputMaybe<Array<IdentityProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<IdentityProviders_Order_By>>;
  where?: InputMaybe<IdentityProviders_Bool_Exp>;
};


export type Query_RootIdentityProviders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<IdentityProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<IdentityProviders_Order_By>>;
  where?: InputMaybe<IdentityProviders_Bool_Exp>;
};


export type Query_RootIdentityProviders_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootIntegrationsArgs = {
  distinct_on?: InputMaybe<Array<Integrations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Integrations_Order_By>>;
  where?: InputMaybe<Integrations_Bool_Exp>;
};


export type Query_RootIntegrations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Integrations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Integrations_Order_By>>;
  where?: InputMaybe<Integrations_Bool_Exp>;
};


export type Query_RootIntegrations_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootRolePermissionsArgs = {
  distinct_on?: InputMaybe<Array<RolePermissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<RolePermissions_Order_By>>;
  where?: InputMaybe<RolePermissions_Bool_Exp>;
};


export type Query_RootRolePermissions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<RolePermissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<RolePermissions_Order_By>>;
  where?: InputMaybe<RolePermissions_Bool_Exp>;
};


export type Query_RootRolePermissions_By_PkArgs = {
  id: Scalars['String'];
};


export type Query_RootSequelizeMetaArgs = {
  distinct_on?: InputMaybe<Array<SequelizeMeta_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SequelizeMeta_Order_By>>;
  where?: InputMaybe<SequelizeMeta_Bool_Exp>;
};


export type Query_RootSequelizeMeta_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SequelizeMeta_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SequelizeMeta_Order_By>>;
  where?: InputMaybe<SequelizeMeta_Bool_Exp>;
};


export type Query_RootSequelizeMeta_By_PkArgs = {
  name: Scalars['String'];
};


export type Query_RootTransactionsArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Query_RootTransactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Query_RootTransactions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootTransfersArgs = {
  distinct_on?: InputMaybe<Array<Transfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transfers_Order_By>>;
  where?: InputMaybe<Transfers_Bool_Exp>;
};


export type Query_RootTransfers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transfers_Order_By>>;
  where?: InputMaybe<Transfers_Bool_Exp>;
};


export type Query_RootTransfers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUserIdentitiesArgs = {
  distinct_on?: InputMaybe<Array<UserIdentities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserIdentities_Order_By>>;
  where?: InputMaybe<UserIdentities_Bool_Exp>;
};


export type Query_RootUserIdentities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<UserIdentities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserIdentities_Order_By>>;
  where?: InputMaybe<UserIdentities_Bool_Exp>;
};


export type Query_RootUserIdentities_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootWalletContractInstancesArgs = {
  distinct_on?: InputMaybe<Array<WalletContractInstances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<WalletContractInstances_Order_By>>;
  where?: InputMaybe<WalletContractInstances_Bool_Exp>;
};


export type Query_RootWalletContractInstances_AggregateArgs = {
  distinct_on?: InputMaybe<Array<WalletContractInstances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<WalletContractInstances_Order_By>>;
  where?: InputMaybe<WalletContractInstances_Bool_Exp>;
};


export type Query_RootWalletContractInstances_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootWalletsArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};


export type Query_RootWallets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};


export type Query_RootWallets_By_PkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship */
  AgreementExtensionLinks: Array<AgreementExtensionLinks>;
  /** An aggregate relationship */
  AgreementExtensionLinks_aggregate: AgreementExtensionLinks_Aggregate;
  /** fetch data from the table: "AgreementExtensionLinks" using primary key columns */
  AgreementExtensionLinks_by_pk?: Maybe<AgreementExtensionLinks>;
  /** fetch data from the table in a streaming manner: "AgreementExtensionLinks" */
  AgreementExtensionLinks_stream: Array<AgreementExtensionLinks>;
  /** An array relationship */
  AgreementExtensionRoles: Array<AgreementExtensionRoles>;
  /** An aggregate relationship */
  AgreementExtensionRoles_aggregate: AgreementExtensionRoles_Aggregate;
  /** fetch data from the table: "AgreementExtensionRoles" using primary key columns */
  AgreementExtensionRoles_by_pk?: Maybe<AgreementExtensionRoles>;
  /** fetch data from the table in a streaming manner: "AgreementExtensionRoles" */
  AgreementExtensionRoles_stream: Array<AgreementExtensionRoles>;
  /** fetch data from the table: "AgreementExtensionStorages" */
  AgreementExtensionStorages: Array<AgreementExtensionStorages>;
  /** fetch aggregated fields from the table: "AgreementExtensionStorages" */
  AgreementExtensionStorages_aggregate: AgreementExtensionStorages_Aggregate;
  /** fetch data from the table: "AgreementExtensionStorages" using primary key columns */
  AgreementExtensionStorages_by_pk?: Maybe<AgreementExtensionStorages>;
  /** fetch data from the table in a streaming manner: "AgreementExtensionStorages" */
  AgreementExtensionStorages_stream: Array<AgreementExtensionStorages>;
  /** An array relationship */
  AgreementExtensionWidgets: Array<AgreementExtensionWidgets>;
  /** An aggregate relationship */
  AgreementExtensionWidgets_aggregate: AgreementExtensionWidgets_Aggregate;
  /** fetch data from the table: "AgreementExtensionWidgets" using primary key columns */
  AgreementExtensionWidgets_by_pk?: Maybe<AgreementExtensionWidgets>;
  /** fetch data from the table in a streaming manner: "AgreementExtensionWidgets" */
  AgreementExtensionWidgets_stream: Array<AgreementExtensionWidgets>;
  /** An array relationship */
  AgreementExtensions: Array<AgreementExtensions>;
  /** An aggregate relationship */
  AgreementExtensions_aggregate: AgreementExtensions_Aggregate;
  /** fetch data from the table: "AgreementExtensions" using primary key columns */
  AgreementExtensions_by_pk?: Maybe<AgreementExtensions>;
  /** fetch data from the table in a streaming manner: "AgreementExtensions" */
  AgreementExtensions_stream: Array<AgreementExtensions>;
  /** An array relationship */
  AgreementRoleExtensions: Array<AgreementRoleExtensions>;
  /** An aggregate relationship */
  AgreementRoleExtensions_aggregate: AgreementRoleExtensions_Aggregate;
  /** fetch data from the table: "AgreementRoleExtensions" using primary key columns */
  AgreementRoleExtensions_by_pk?: Maybe<AgreementRoleExtensions>;
  /** fetch data from the table in a streaming manner: "AgreementRoleExtensions" */
  AgreementRoleExtensions_stream: Array<AgreementRoleExtensions>;
  /** An array relationship */
  AgreementRoleTokenTransfers: Array<AgreementRoleTokenTransfers>;
  /** An aggregate relationship */
  AgreementRoleTokenTransfers_aggregate: AgreementRoleTokenTransfers_Aggregate;
  /** fetch data from the table: "AgreementRoleTokenTransfers" using primary key columns */
  AgreementRoleTokenTransfers_by_pk?: Maybe<AgreementRoleTokenTransfers>;
  /** fetch data from the table in a streaming manner: "AgreementRoleTokenTransfers" */
  AgreementRoleTokenTransfers_stream: Array<AgreementRoleTokenTransfers>;
  /** An array relationship */
  AgreementRoleTokens: Array<AgreementRoleTokens>;
  /** An aggregate relationship */
  AgreementRoleTokens_aggregate: AgreementRoleTokens_Aggregate;
  /** fetch data from the table: "AgreementRoleTokens" using primary key columns */
  AgreementRoleTokens_by_pk?: Maybe<AgreementRoleTokens>;
  /** fetch data from the table in a streaming manner: "AgreementRoleTokens" */
  AgreementRoleTokens_stream: Array<AgreementRoleTokens>;
  /** fetch data from the table: "AgreementRoleWallets" */
  AgreementRoleWallets: Array<AgreementRoleWallets>;
  /** fetch aggregated fields from the table: "AgreementRoleWallets" */
  AgreementRoleWallets_aggregate: AgreementRoleWallets_Aggregate;
  /** fetch data from the table: "AgreementRoleWallets" using primary key columns */
  AgreementRoleWallets_by_pk?: Maybe<AgreementRoleWallets>;
  /** fetch data from the table in a streaming manner: "AgreementRoleWallets" */
  AgreementRoleWallets_stream: Array<AgreementRoleWallets>;
  /** An array relationship */
  AgreementRoles: Array<AgreementRoles>;
  /** An aggregate relationship */
  AgreementRoles_aggregate: AgreementRoles_Aggregate;
  /** fetch data from the table: "AgreementRoles" using primary key columns */
  AgreementRoles_by_pk?: Maybe<AgreementRoles>;
  /** fetch data from the table in a streaming manner: "AgreementRoles" */
  AgreementRoles_stream: Array<AgreementRoles>;
  /** An array relationship */
  AgreementTokenTransfers: Array<AgreementTokenTransfers>;
  /** An aggregate relationship */
  AgreementTokenTransfers_aggregate: AgreementTokenTransfers_Aggregate;
  /** fetch data from the table: "AgreementTokenTransfers" using primary key columns */
  AgreementTokenTransfers_by_pk?: Maybe<AgreementTokenTransfers>;
  /** fetch data from the table in a streaming manner: "AgreementTokenTransfers" */
  AgreementTokenTransfers_stream: Array<AgreementTokenTransfers>;
  /** An array relationship */
  AgreementTokens: Array<AgreementTokens>;
  /** An aggregate relationship */
  AgreementTokens_aggregate: AgreementTokens_Aggregate;
  /** fetch data from the table: "AgreementTokens" using primary key columns */
  AgreementTokens_by_pk?: Maybe<AgreementTokens>;
  /** fetch data from the table in a streaming manner: "AgreementTokens" */
  AgreementTokens_stream: Array<AgreementTokens>;
  /** An array relationship */
  AgreementWallets: Array<AgreementWallets>;
  /** An aggregate relationship */
  AgreementWallets_aggregate: AgreementWallets_Aggregate;
  /** fetch data from the table: "AgreementWallets" using primary key columns */
  AgreementWallets_by_pk?: Maybe<AgreementWallets>;
  /** fetch data from the table in a streaming manner: "AgreementWallets" */
  AgreementWallets_stream: Array<AgreementWallets>;
  /** An array relationship */
  Agreements: Array<Agreements>;
  /** An aggregate relationship */
  Agreements_aggregate: Agreements_Aggregate;
  /** fetch data from the table: "Agreements" using primary key columns */
  Agreements_by_pk?: Maybe<Agreements>;
  /** fetch data from the table in a streaming manner: "Agreements" */
  Agreements_stream: Array<Agreements>;
  /** An array relationship */
  BundleContracts: Array<BundleContracts>;
  /** An aggregate relationship */
  BundleContracts_aggregate: BundleContracts_Aggregate;
  /** fetch data from the table: "BundleContracts" using primary key columns */
  BundleContracts_by_pk?: Maybe<BundleContracts>;
  /** fetch data from the table in a streaming manner: "BundleContracts" */
  BundleContracts_stream: Array<BundleContracts>;
  /** An array relationship */
  Bundles: Array<Bundles>;
  /** An aggregate relationship */
  Bundles_aggregate: Bundles_Aggregate;
  /** fetch data from the table: "Bundles" using primary key columns */
  Bundles_by_pk?: Maybe<Bundles>;
  /** fetch data from the table in a streaming manner: "Bundles" */
  Bundles_stream: Array<Bundles>;
  /** fetch data from the table: "ChainNonces" */
  ChainNonces: Array<ChainNonces>;
  /** fetch aggregated fields from the table: "ChainNonces" */
  ChainNonces_aggregate: ChainNonces_Aggregate;
  /** fetch data from the table: "ChainNonces" using primary key columns */
  ChainNonces_by_pk?: Maybe<ChainNonces>;
  /** fetch data from the table in a streaming manner: "ChainNonces" */
  ChainNonces_stream: Array<ChainNonces>;
  /** An array relationship */
  ContractInstances: Array<ContractInstances>;
  /** An aggregate relationship */
  ContractInstances_aggregate: ContractInstances_Aggregate;
  /** fetch data from the table: "ContractInstances" using primary key columns */
  ContractInstances_by_pk?: Maybe<ContractInstances>;
  /** fetch data from the table in a streaming manner: "ContractInstances" */
  ContractInstances_stream: Array<ContractInstances>;
  /** An array relationship */
  Contracts: Array<Contracts>;
  /** An aggregate relationship */
  Contracts_aggregate: Contracts_Aggregate;
  /** fetch data from the table: "Contracts" using primary key columns */
  Contracts_by_pk?: Maybe<Contracts>;
  /** fetch data from the table in a streaming manner: "Contracts" */
  Contracts_stream: Array<Contracts>;
  /** fetch data from the table: "Extensions" */
  Extensions: Array<Extensions>;
  /** fetch aggregated fields from the table: "Extensions" */
  Extensions_aggregate: Extensions_Aggregate;
  /** fetch data from the table: "Extensions" using primary key columns */
  Extensions_by_pk?: Maybe<Extensions>;
  /** fetch data from the table in a streaming manner: "Extensions" */
  Extensions_stream: Array<Extensions>;
  /** fetch data from the table: "IdentityProviders" */
  IdentityProviders: Array<IdentityProviders>;
  /** fetch aggregated fields from the table: "IdentityProviders" */
  IdentityProviders_aggregate: IdentityProviders_Aggregate;
  /** fetch data from the table: "IdentityProviders" using primary key columns */
  IdentityProviders_by_pk?: Maybe<IdentityProviders>;
  /** fetch data from the table in a streaming manner: "IdentityProviders" */
  IdentityProviders_stream: Array<IdentityProviders>;
  /** fetch data from the table: "Integrations" */
  Integrations: Array<Integrations>;
  /** fetch aggregated fields from the table: "Integrations" */
  Integrations_aggregate: Integrations_Aggregate;
  /** fetch data from the table: "Integrations" using primary key columns */
  Integrations_by_pk?: Maybe<Integrations>;
  /** fetch data from the table in a streaming manner: "Integrations" */
  Integrations_stream: Array<Integrations>;
  /** fetch data from the table: "RolePermissions" */
  RolePermissions: Array<RolePermissions>;
  /** fetch aggregated fields from the table: "RolePermissions" */
  RolePermissions_aggregate: RolePermissions_Aggregate;
  /** fetch data from the table: "RolePermissions" using primary key columns */
  RolePermissions_by_pk?: Maybe<RolePermissions>;
  /** fetch data from the table in a streaming manner: "RolePermissions" */
  RolePermissions_stream: Array<RolePermissions>;
  /** fetch data from the table: "SequelizeMeta" */
  SequelizeMeta: Array<SequelizeMeta>;
  /** fetch aggregated fields from the table: "SequelizeMeta" */
  SequelizeMeta_aggregate: SequelizeMeta_Aggregate;
  /** fetch data from the table: "SequelizeMeta" using primary key columns */
  SequelizeMeta_by_pk?: Maybe<SequelizeMeta>;
  /** fetch data from the table in a streaming manner: "SequelizeMeta" */
  SequelizeMeta_stream: Array<SequelizeMeta>;
  /** An array relationship */
  Transactions: Array<Transactions>;
  /** An aggregate relationship */
  Transactions_aggregate: Transactions_Aggregate;
  /** fetch data from the table: "Transactions" using primary key columns */
  Transactions_by_pk?: Maybe<Transactions>;
  /** fetch data from the table in a streaming manner: "Transactions" */
  Transactions_stream: Array<Transactions>;
  /** fetch data from the table: "Transfers" */
  Transfers: Array<Transfers>;
  /** fetch aggregated fields from the table: "Transfers" */
  Transfers_aggregate: Transfers_Aggregate;
  /** fetch data from the table: "Transfers" using primary key columns */
  Transfers_by_pk?: Maybe<Transfers>;
  /** fetch data from the table in a streaming manner: "Transfers" */
  Transfers_stream: Array<Transfers>;
  /** An array relationship */
  UserIdentities: Array<UserIdentities>;
  /** An aggregate relationship */
  UserIdentities_aggregate: UserIdentities_Aggregate;
  /** fetch data from the table: "UserIdentities" using primary key columns */
  UserIdentities_by_pk?: Maybe<UserIdentities>;
  /** fetch data from the table in a streaming manner: "UserIdentities" */
  UserIdentities_stream: Array<UserIdentities>;
  /** An array relationship */
  Users: Array<Users>;
  /** An aggregate relationship */
  Users_aggregate: Users_Aggregate;
  /** fetch data from the table: "Users" using primary key columns */
  Users_by_pk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "Users" */
  Users_stream: Array<Users>;
  /** An array relationship */
  WalletContractInstances: Array<WalletContractInstances>;
  /** An aggregate relationship */
  WalletContractInstances_aggregate: WalletContractInstances_Aggregate;
  /** fetch data from the table: "WalletContractInstances" using primary key columns */
  WalletContractInstances_by_pk?: Maybe<WalletContractInstances>;
  /** fetch data from the table in a streaming manner: "WalletContractInstances" */
  WalletContractInstances_stream: Array<WalletContractInstances>;
  /** An array relationship */
  Wallets: Array<Wallets>;
  /** An aggregate relationship */
  Wallets_aggregate: Wallets_Aggregate;
  /** fetch data from the table: "Wallets" using primary key columns */
  Wallets_by_pk?: Maybe<Wallets>;
  /** fetch data from the table in a streaming manner: "Wallets" */
  Wallets_stream: Array<Wallets>;
};


export type Subscription_RootAgreementExtensionLinksArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionLinks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionLinks_Order_By>>;
  where?: InputMaybe<AgreementExtensionLinks_Bool_Exp>;
};


export type Subscription_RootAgreementExtensionLinks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionLinks_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionLinks_Order_By>>;
  where?: InputMaybe<AgreementExtensionLinks_Bool_Exp>;
};


export type Subscription_RootAgreementExtensionLinks_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAgreementExtensionLinks_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<AgreementExtensionLinks_Stream_Cursor_Input>>;
  where?: InputMaybe<AgreementExtensionLinks_Bool_Exp>;
};


export type Subscription_RootAgreementExtensionRolesArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionRoles_Order_By>>;
  where?: InputMaybe<AgreementExtensionRoles_Bool_Exp>;
};


export type Subscription_RootAgreementExtensionRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionRoles_Order_By>>;
  where?: InputMaybe<AgreementExtensionRoles_Bool_Exp>;
};


export type Subscription_RootAgreementExtensionRoles_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAgreementExtensionRoles_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<AgreementExtensionRoles_Stream_Cursor_Input>>;
  where?: InputMaybe<AgreementExtensionRoles_Bool_Exp>;
};


export type Subscription_RootAgreementExtensionStoragesArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionStorages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionStorages_Order_By>>;
  where?: InputMaybe<AgreementExtensionStorages_Bool_Exp>;
};


export type Subscription_RootAgreementExtensionStorages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionStorages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionStorages_Order_By>>;
  where?: InputMaybe<AgreementExtensionStorages_Bool_Exp>;
};


export type Subscription_RootAgreementExtensionStorages_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAgreementExtensionStorages_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<AgreementExtensionStorages_Stream_Cursor_Input>>;
  where?: InputMaybe<AgreementExtensionStorages_Bool_Exp>;
};


export type Subscription_RootAgreementExtensionWidgetsArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionWidgets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionWidgets_Order_By>>;
  where?: InputMaybe<AgreementExtensionWidgets_Bool_Exp>;
};


export type Subscription_RootAgreementExtensionWidgets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensionWidgets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensionWidgets_Order_By>>;
  where?: InputMaybe<AgreementExtensionWidgets_Bool_Exp>;
};


export type Subscription_RootAgreementExtensionWidgets_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAgreementExtensionWidgets_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<AgreementExtensionWidgets_Stream_Cursor_Input>>;
  where?: InputMaybe<AgreementExtensionWidgets_Bool_Exp>;
};


export type Subscription_RootAgreementExtensionsArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensions_Order_By>>;
  where?: InputMaybe<AgreementExtensions_Bool_Exp>;
};


export type Subscription_RootAgreementExtensions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementExtensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementExtensions_Order_By>>;
  where?: InputMaybe<AgreementExtensions_Bool_Exp>;
};


export type Subscription_RootAgreementExtensions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAgreementExtensions_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<AgreementExtensions_Stream_Cursor_Input>>;
  where?: InputMaybe<AgreementExtensions_Bool_Exp>;
};


export type Subscription_RootAgreementRoleExtensionsArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleExtensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleExtensions_Order_By>>;
  where?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
};


export type Subscription_RootAgreementRoleExtensions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleExtensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleExtensions_Order_By>>;
  where?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
};


export type Subscription_RootAgreementRoleExtensions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAgreementRoleExtensions_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<AgreementRoleExtensions_Stream_Cursor_Input>>;
  where?: InputMaybe<AgreementRoleExtensions_Bool_Exp>;
};


export type Subscription_RootAgreementRoleTokenTransfersArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleTokenTransfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleTokenTransfers_Order_By>>;
  where?: InputMaybe<AgreementRoleTokenTransfers_Bool_Exp>;
};


export type Subscription_RootAgreementRoleTokenTransfers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleTokenTransfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleTokenTransfers_Order_By>>;
  where?: InputMaybe<AgreementRoleTokenTransfers_Bool_Exp>;
};


export type Subscription_RootAgreementRoleTokenTransfers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAgreementRoleTokenTransfers_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<AgreementRoleTokenTransfers_Stream_Cursor_Input>>;
  where?: InputMaybe<AgreementRoleTokenTransfers_Bool_Exp>;
};


export type Subscription_RootAgreementRoleTokensArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleTokens_Order_By>>;
  where?: InputMaybe<AgreementRoleTokens_Bool_Exp>;
};


export type Subscription_RootAgreementRoleTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleTokens_Order_By>>;
  where?: InputMaybe<AgreementRoleTokens_Bool_Exp>;
};


export type Subscription_RootAgreementRoleTokens_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAgreementRoleTokens_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<AgreementRoleTokens_Stream_Cursor_Input>>;
  where?: InputMaybe<AgreementRoleTokens_Bool_Exp>;
};


export type Subscription_RootAgreementRoleWalletsArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleWallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleWallets_Order_By>>;
  where?: InputMaybe<AgreementRoleWallets_Bool_Exp>;
};


export type Subscription_RootAgreementRoleWallets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoleWallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoleWallets_Order_By>>;
  where?: InputMaybe<AgreementRoleWallets_Bool_Exp>;
};


export type Subscription_RootAgreementRoleWallets_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAgreementRoleWallets_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<AgreementRoleWallets_Stream_Cursor_Input>>;
  where?: InputMaybe<AgreementRoleWallets_Bool_Exp>;
};


export type Subscription_RootAgreementRolesArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoles_Order_By>>;
  where?: InputMaybe<AgreementRoles_Bool_Exp>;
};


export type Subscription_RootAgreementRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementRoles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementRoles_Order_By>>;
  where?: InputMaybe<AgreementRoles_Bool_Exp>;
};


export type Subscription_RootAgreementRoles_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAgreementRoles_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<AgreementRoles_Stream_Cursor_Input>>;
  where?: InputMaybe<AgreementRoles_Bool_Exp>;
};


export type Subscription_RootAgreementTokenTransfersArgs = {
  distinct_on?: InputMaybe<Array<AgreementTokenTransfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementTokenTransfers_Order_By>>;
  where?: InputMaybe<AgreementTokenTransfers_Bool_Exp>;
};


export type Subscription_RootAgreementTokenTransfers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementTokenTransfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementTokenTransfers_Order_By>>;
  where?: InputMaybe<AgreementTokenTransfers_Bool_Exp>;
};


export type Subscription_RootAgreementTokenTransfers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAgreementTokenTransfers_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<AgreementTokenTransfers_Stream_Cursor_Input>>;
  where?: InputMaybe<AgreementTokenTransfers_Bool_Exp>;
};


export type Subscription_RootAgreementTokensArgs = {
  distinct_on?: InputMaybe<Array<AgreementTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementTokens_Order_By>>;
  where?: InputMaybe<AgreementTokens_Bool_Exp>;
};


export type Subscription_RootAgreementTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementTokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementTokens_Order_By>>;
  where?: InputMaybe<AgreementTokens_Bool_Exp>;
};


export type Subscription_RootAgreementTokens_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAgreementTokens_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<AgreementTokens_Stream_Cursor_Input>>;
  where?: InputMaybe<AgreementTokens_Bool_Exp>;
};


export type Subscription_RootAgreementWalletsArgs = {
  distinct_on?: InputMaybe<Array<AgreementWallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementWallets_Order_By>>;
  where?: InputMaybe<AgreementWallets_Bool_Exp>;
};


export type Subscription_RootAgreementWallets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AgreementWallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AgreementWallets_Order_By>>;
  where?: InputMaybe<AgreementWallets_Bool_Exp>;
};


export type Subscription_RootAgreementWallets_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAgreementWallets_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<AgreementWallets_Stream_Cursor_Input>>;
  where?: InputMaybe<AgreementWallets_Bool_Exp>;
};


export type Subscription_RootAgreementsArgs = {
  distinct_on?: InputMaybe<Array<Agreements_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Agreements_Order_By>>;
  where?: InputMaybe<Agreements_Bool_Exp>;
};


export type Subscription_RootAgreements_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Agreements_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Agreements_Order_By>>;
  where?: InputMaybe<Agreements_Bool_Exp>;
};


export type Subscription_RootAgreements_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAgreements_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Agreements_Stream_Cursor_Input>>;
  where?: InputMaybe<Agreements_Bool_Exp>;
};


export type Subscription_RootBundleContractsArgs = {
  distinct_on?: InputMaybe<Array<BundleContracts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BundleContracts_Order_By>>;
  where?: InputMaybe<BundleContracts_Bool_Exp>;
};


export type Subscription_RootBundleContracts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<BundleContracts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<BundleContracts_Order_By>>;
  where?: InputMaybe<BundleContracts_Bool_Exp>;
};


export type Subscription_RootBundleContracts_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootBundleContracts_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<BundleContracts_Stream_Cursor_Input>>;
  where?: InputMaybe<BundleContracts_Bool_Exp>;
};


export type Subscription_RootBundlesArgs = {
  distinct_on?: InputMaybe<Array<Bundles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bundles_Order_By>>;
  where?: InputMaybe<Bundles_Bool_Exp>;
};


export type Subscription_RootBundles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Bundles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Bundles_Order_By>>;
  where?: InputMaybe<Bundles_Bool_Exp>;
};


export type Subscription_RootBundles_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootBundles_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Bundles_Stream_Cursor_Input>>;
  where?: InputMaybe<Bundles_Bool_Exp>;
};


export type Subscription_RootChainNoncesArgs = {
  distinct_on?: InputMaybe<Array<ChainNonces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ChainNonces_Order_By>>;
  where?: InputMaybe<ChainNonces_Bool_Exp>;
};


export type Subscription_RootChainNonces_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ChainNonces_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ChainNonces_Order_By>>;
  where?: InputMaybe<ChainNonces_Bool_Exp>;
};


export type Subscription_RootChainNonces_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootChainNonces_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<ChainNonces_Stream_Cursor_Input>>;
  where?: InputMaybe<ChainNonces_Bool_Exp>;
};


export type Subscription_RootContractInstancesArgs = {
  distinct_on?: InputMaybe<Array<ContractInstances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ContractInstances_Order_By>>;
  where?: InputMaybe<ContractInstances_Bool_Exp>;
};


export type Subscription_RootContractInstances_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ContractInstances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ContractInstances_Order_By>>;
  where?: InputMaybe<ContractInstances_Bool_Exp>;
};


export type Subscription_RootContractInstances_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootContractInstances_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<ContractInstances_Stream_Cursor_Input>>;
  where?: InputMaybe<ContractInstances_Bool_Exp>;
};


export type Subscription_RootContractsArgs = {
  distinct_on?: InputMaybe<Array<Contracts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contracts_Order_By>>;
  where?: InputMaybe<Contracts_Bool_Exp>;
};


export type Subscription_RootContracts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Contracts_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Contracts_Order_By>>;
  where?: InputMaybe<Contracts_Bool_Exp>;
};


export type Subscription_RootContracts_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootContracts_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Contracts_Stream_Cursor_Input>>;
  where?: InputMaybe<Contracts_Bool_Exp>;
};


export type Subscription_RootExtensionsArgs = {
  distinct_on?: InputMaybe<Array<Extensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Extensions_Order_By>>;
  where?: InputMaybe<Extensions_Bool_Exp>;
};


export type Subscription_RootExtensions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Extensions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Extensions_Order_By>>;
  where?: InputMaybe<Extensions_Bool_Exp>;
};


export type Subscription_RootExtensions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootExtensions_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Extensions_Stream_Cursor_Input>>;
  where?: InputMaybe<Extensions_Bool_Exp>;
};


export type Subscription_RootIdentityProvidersArgs = {
  distinct_on?: InputMaybe<Array<IdentityProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<IdentityProviders_Order_By>>;
  where?: InputMaybe<IdentityProviders_Bool_Exp>;
};


export type Subscription_RootIdentityProviders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<IdentityProviders_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<IdentityProviders_Order_By>>;
  where?: InputMaybe<IdentityProviders_Bool_Exp>;
};


export type Subscription_RootIdentityProviders_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootIdentityProviders_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<IdentityProviders_Stream_Cursor_Input>>;
  where?: InputMaybe<IdentityProviders_Bool_Exp>;
};


export type Subscription_RootIntegrationsArgs = {
  distinct_on?: InputMaybe<Array<Integrations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Integrations_Order_By>>;
  where?: InputMaybe<Integrations_Bool_Exp>;
};


export type Subscription_RootIntegrations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Integrations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Integrations_Order_By>>;
  where?: InputMaybe<Integrations_Bool_Exp>;
};


export type Subscription_RootIntegrations_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootIntegrations_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Integrations_Stream_Cursor_Input>>;
  where?: InputMaybe<Integrations_Bool_Exp>;
};


export type Subscription_RootRolePermissionsArgs = {
  distinct_on?: InputMaybe<Array<RolePermissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<RolePermissions_Order_By>>;
  where?: InputMaybe<RolePermissions_Bool_Exp>;
};


export type Subscription_RootRolePermissions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<RolePermissions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<RolePermissions_Order_By>>;
  where?: InputMaybe<RolePermissions_Bool_Exp>;
};


export type Subscription_RootRolePermissions_By_PkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootRolePermissions_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<RolePermissions_Stream_Cursor_Input>>;
  where?: InputMaybe<RolePermissions_Bool_Exp>;
};


export type Subscription_RootSequelizeMetaArgs = {
  distinct_on?: InputMaybe<Array<SequelizeMeta_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SequelizeMeta_Order_By>>;
  where?: InputMaybe<SequelizeMeta_Bool_Exp>;
};


export type Subscription_RootSequelizeMeta_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SequelizeMeta_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SequelizeMeta_Order_By>>;
  where?: InputMaybe<SequelizeMeta_Bool_Exp>;
};


export type Subscription_RootSequelizeMeta_By_PkArgs = {
  name: Scalars['String'];
};


export type Subscription_RootSequelizeMeta_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<SequelizeMeta_Stream_Cursor_Input>>;
  where?: InputMaybe<SequelizeMeta_Bool_Exp>;
};


export type Subscription_RootTransactionsArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Subscription_RootTransactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Subscription_RootTransactions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootTransactions_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Transactions_Stream_Cursor_Input>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Subscription_RootTransfersArgs = {
  distinct_on?: InputMaybe<Array<Transfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transfers_Order_By>>;
  where?: InputMaybe<Transfers_Bool_Exp>;
};


export type Subscription_RootTransfers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transfers_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Transfers_Order_By>>;
  where?: InputMaybe<Transfers_Bool_Exp>;
};


export type Subscription_RootTransfers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootTransfers_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Transfers_Stream_Cursor_Input>>;
  where?: InputMaybe<Transfers_Bool_Exp>;
};


export type Subscription_RootUserIdentitiesArgs = {
  distinct_on?: InputMaybe<Array<UserIdentities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserIdentities_Order_By>>;
  where?: InputMaybe<UserIdentities_Bool_Exp>;
};


export type Subscription_RootUserIdentities_AggregateArgs = {
  distinct_on?: InputMaybe<Array<UserIdentities_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<UserIdentities_Order_By>>;
  where?: InputMaybe<UserIdentities_Bool_Exp>;
};


export type Subscription_RootUserIdentities_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUserIdentities_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<UserIdentities_Stream_Cursor_Input>>;
  where?: InputMaybe<UserIdentities_Bool_Exp>;
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootWalletContractInstancesArgs = {
  distinct_on?: InputMaybe<Array<WalletContractInstances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<WalletContractInstances_Order_By>>;
  where?: InputMaybe<WalletContractInstances_Bool_Exp>;
};


export type Subscription_RootWalletContractInstances_AggregateArgs = {
  distinct_on?: InputMaybe<Array<WalletContractInstances_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<WalletContractInstances_Order_By>>;
  where?: InputMaybe<WalletContractInstances_Bool_Exp>;
};


export type Subscription_RootWalletContractInstances_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootWalletContractInstances_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<WalletContractInstances_Stream_Cursor_Input>>;
  where?: InputMaybe<WalletContractInstances_Bool_Exp>;
};


export type Subscription_RootWalletsArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};


export type Subscription_RootWallets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};


export type Subscription_RootWallets_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootWallets_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Wallets_Stream_Cursor_Input>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type MeemIdSubscriptionSubscriptionVariables = Exact<{
  walletAddress?: InputMaybe<Scalars['String']>;
}>;


export type MeemIdSubscriptionSubscription = { __typename?: 'subscription_root', Users: Array<{ __typename?: 'Users', id: any, profilePicUrl?: string | null, displayName?: string | null, DefaultWallet?: { __typename?: 'Wallets', address: string, ens?: string | null } | null, UserIdentities: Array<{ __typename?: 'UserIdentities', id: any, metadata: any, visibility: string, IdentityProviderId?: any | null, IdentityProvider?: { __typename?: 'IdentityProviders', id: any, description: string, icon: string, name: string, connectionName: string, connectionId: string } | null }> }> };

export type GetIdentityProvidersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIdentityProvidersQuery = { __typename?: 'query_root', IdentityProviders: Array<{ __typename?: 'IdentityProviders', id: any, description: string, icon: string, name: string, connectionName: string, connectionId: string }> };


export const MeemIdSubscriptionDocument = gql`
    subscription MeemIdSubscription($walletAddress: String) {
  Users(where: {Wallets: {address: {_ilike: $walletAddress}}}) {
    id
    profilePicUrl
    displayName
    DefaultWallet {
      address
      ens
    }
    UserIdentities {
      id
      metadata
      visibility
      IdentityProviderId
      IdentityProvider {
        id
        description
        icon
        name
        connectionName
        connectionId
      }
    }
  }
}
    `;

/**
 * __useMeemIdSubscriptionSubscription__
 *
 * To run a query within a React component, call `useMeemIdSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMeemIdSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeemIdSubscriptionSubscription({
 *   variables: {
 *      walletAddress: // value for 'walletAddress'
 *   },
 * });
 */
export function useMeemIdSubscriptionSubscription(baseOptions?: Apollo.SubscriptionHookOptions<MeemIdSubscriptionSubscription, MeemIdSubscriptionSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MeemIdSubscriptionSubscription, MeemIdSubscriptionSubscriptionVariables>(MeemIdSubscriptionDocument, options);
      }
export type MeemIdSubscriptionSubscriptionHookResult = ReturnType<typeof useMeemIdSubscriptionSubscription>;
export type MeemIdSubscriptionSubscriptionResult = Apollo.SubscriptionResult<MeemIdSubscriptionSubscription>;
export const GetIdentityProvidersDocument = gql`
    query GetIdentityProviders {
  IdentityProviders {
    id
    description
    icon
    name
    connectionName
    connectionId
  }
}
    `;

/**
 * __useGetIdentityProvidersQuery__
 *
 * To run a query within a React component, call `useGetIdentityProvidersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIdentityProvidersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIdentityProvidersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetIdentityProvidersQuery(baseOptions?: Apollo.QueryHookOptions<GetIdentityProvidersQuery, GetIdentityProvidersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIdentityProvidersQuery, GetIdentityProvidersQueryVariables>(GetIdentityProvidersDocument, options);
      }
export function useGetIdentityProvidersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIdentityProvidersQuery, GetIdentityProvidersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIdentityProvidersQuery, GetIdentityProvidersQueryVariables>(GetIdentityProvidersDocument, options);
        }
export type GetIdentityProvidersQueryHookResult = ReturnType<typeof useGetIdentityProvidersQuery>;
export type GetIdentityProvidersLazyQueryHookResult = ReturnType<typeof useGetIdentityProvidersLazyQuery>;
export type GetIdentityProvidersQueryResult = Apollo.QueryResult<GetIdentityProvidersQuery, GetIdentityProvidersQueryVariables>;