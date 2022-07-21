"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVersion = exports.supportedVersionsTypeMapping = exports.supportedVersions = void 0;
/**
 *
 */
exports.supportedVersions = {
    Meem: ['20220718'],
    MeemClub: ['20220718']
};
/**
 *
 */
exports.supportedVersionsTypeMapping = {
    Meem: {
        20220718: {
            Contract: 'Meem_Contract_20220718',
            Token: 'Meem_Token_20220718'
        }
    },
    MeemClub: {
        20220718: {
            Contract: 'MeemClub_Contract_20220718',
            Token: 'MeemClub_Token_20220718'
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