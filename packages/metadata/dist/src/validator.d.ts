import { ValidatorResult } from 'jsonschema';
export declare class Validator {
    name: string;
    calVer: string;
    type: string;
    constructor(metadata: {
        meem_metadata_type: string;
        meem_metadata_version: string;
    });
    /**
     * Validates the passed json against the Validator's schema
     *
     * @param json
     */
    validate(json: {
        [key: string]: any;
    }): ValidatorResult;
}
