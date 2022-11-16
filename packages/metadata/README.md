# Meem Metadata

Metadata types and validator.

## Types
This package contains types for all supported Meem metadata schemas. Import the metadata type as shown below to ensure metadata will pass validation when parsed by the Meem API.

See the `types` folder for currently supported metadata types.

    import { MeemAgreement_Contract_20221116 } from '@meemproject/metadata'

    const metadata: MeemAgreement_Contract_20221116 = {
        meem_metadata_version: "MeemAgreement_Contract_20221116",
        meem_metadata_type: "MeemAgreement",
        name: "Strongly typed Agreement!",
        description: "Now with tokens!",
        external_url: "",
        image: ""
    }

## Parser
The parser can take a metadata object or JSON string and parse/validate it against supported metadata versions.

    const parser = new Parser()

    try {
        const parsedMetadata = parser.parse(
            metadata as unknown as MeemMetadataLike
        )
        const { name, type, calVer, metadata } = parsedMetadata
        console.log(name, type, calVer, metadata)
    } catch (e) {
        console.log(e)
    }

## Validator
Here's an example of how to validate metadata for a MeemAgreement contract

    const metadata = {
        meem_metadata_version: "MeemAgreement_Contract_20221116",
        meem_metadata_type: "MeemAgreement",
        name: "Strongly typed Agreement!",
        description: "Now with tokens!",
        external_url: "",
        image: ""
    }

    const validator = new Validator(metadata.meem_metadata_version)
    const result = validator.validate(metadata)
    const isValid = result.valid