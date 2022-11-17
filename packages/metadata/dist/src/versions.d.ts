/**
 *
 */
export declare const supportedVersions: {
    [key: string]: Array<string>;
};
/**
 *
 */
export declare const supportedVersionsTypeMapping: {
    [key: string]: {
        [key: string]: {
            [key: string]: string;
        };
    };
};
/**
 *
 * @param metadata
 */
export declare function validateMetadataVersion(metadata: {
    meem_metadata_type: string;
    meem_metadata_version: string;
}): void;
