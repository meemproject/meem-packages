import { gql } from '@apollo/client'

export const GET_CONTRACT_QUERY = gql`
	query GetContract($contractId: uuid!) {
		Contracts(where: { id: { _eq: $contractId } }) {
			abi
			bytecode
		}
	}
`

export const GET_BUNDLE_BY_ID = gql`
	query GetBundleById($id: uuid!) {
		Bundles(where: { id: { _eq: $id } }) {
			id
			abi
			BundleContracts {
				functionSelectors
				Contract {
					ContractInstances {
						address
					}
				}
			}
		}
	}
`

export const GET_AGREEMENT_EXTENSION_BY_ID = gql`
	query GetAgreementExtensionById($id: uuid!) {
		AgreementExtensions(where: { id: { _eq: $id } }) {
			id
			metadata
		}
	}
`
