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
 * @param verboseVersion
 */
export declare function validateVersion(verboseVersion: string): void;
