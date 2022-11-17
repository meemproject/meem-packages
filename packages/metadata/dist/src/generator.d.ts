export declare class Generator {
    type: string;
    version: string;
    constructor(metadata: {
        meem_metadata_type: string;
        meem_metadata_version: string;
    });
    /**
     * Generates valid, minfied, and ordered (alphabetized keys) schema
     * Raises if the unordered json does not Validate against the Generator's schema
     *
     * @param unordered
     */
    generateJSON(unordered: {
        [key: string]: any;
    }): string;
}
