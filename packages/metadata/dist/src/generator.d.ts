export declare class Generator {
    name: string;
    version: string;
    constructor(name: string, version: string);
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
