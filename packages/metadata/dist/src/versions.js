"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVersion = exports.supportedVersionsTypeMapping = exports.supportedVersions = void 0;
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
            Token: 'Meem_Token_20221116'
        }
    },
    MeemAgreement: {
        20221116: {
            Contract: 'MeemAgreement_Contract_20221116',
            Token: 'MeemAgreement_Token_20221116'
        }
    },
    MeemAgreementRole: {
        20221116: {
            Contract: 'MeemAgreementRole_Contract_20221116',
            Token: 'MeemAgreementRole_Token_20221116'
        }
    }
};
/**
 *
 * @param verboseVersion
 */
function validateVersion(verboseVersion) {
    var _a, _b;
    const [name, type, calVer] = verboseVersion.split('_');
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
exports.validateVersion = validateVersion;
//# sourceMappingURL=versions.js.map