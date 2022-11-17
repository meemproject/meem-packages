"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMetadataVersion = exports.supportedVersionsTypeMapping = exports.supportedVersions = void 0;
/**
 *
 */
exports.supportedVersions = {
    Meem: ['20221116'],
    MeemAgreement: ['20221116'],
    MeemAgreementRole: ['20221116']
};
/**
 *
 */
exports.supportedVersionsTypeMapping = {
    Meem: {
        20221116: {
            Contract: 'Meem_Contract_20221116',
            Token: 'Meem_Token_20221116',
            AgreementContract: 'Meem_AgreementContract_20221116',
            AgreementToken: 'Meem_AgreementToken_20221116',
            AgreementRoleContract: 'Meem_AgreementRoleContract_20221116',
            AgreementRoleToken: 'Meem_AgreementRoleToken_20221116'
        }
    }
};
/**
 *
 * @param metadata
 */
function validateMetadataVersion(metadata) {
    var _a, _b;
    const { meem_metadata_type, meem_metadata_version } = metadata;
    const [name, type] = meem_metadata_type.split('_');
    const calVer = meem_metadata_version;
    // require name exists in `versions`
    if (!(name in exports.supportedVersions)) {
        throw new Error(`There are no versions with the ${name} project name`);
    }
    // require calVer exists in `versions`
    const supportedVersionIndex = exports.supportedVersions[name].indexOf(calVer);
    if (supportedVersionIndex === -1) {
        throw new Error(`There are no versions in the ${name} namespace with the ${calVer} calendar version`);
    }
    if (!((_b = (_a = exports.supportedVersionsTypeMapping[name]) === null || _a === void 0 ? void 0 : _a[calVer]) === null || _b === void 0 ? void 0 : _b[type])) {
        throw new Error(`There are no types in the ${name} namespace with the ${calVer} calendar version that match ${type}`);
    }
}
exports.validateMetadataVersion = validateMetadataVersion;
//# sourceMappingURL=versions.js.map