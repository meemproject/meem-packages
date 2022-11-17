"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generator = void 0;
const validator_1 = require("./validator");
const versions_1 = require("./versions");
class Generator {
    constructor(metadata) {
        const { meem_metadata_type, meem_metadata_version } = metadata;
        (0, versions_1.validateMetadataVersion)(metadata);
        this.type = meem_metadata_type;
        this.version = meem_metadata_version;
    }
    /**
     * Generates valid, minfied, and ordered (alphabetized keys) schema
     * Raises if the unordered json does not Validate against the Generator's schema
     *
     * @param unordered
     */
    generateJSON(unordered) {
        // validate the schema
        const validator = new validator_1.Validator({ meem_metadata_type: this.type, meem_metadata_version: this.version });
        const validated = validator.validate(unordered);
        if (!validated) {
            throw new Error(`JSON does not conform to the ${this.type}_${this.version} schema.`);
        }
        // alphabetize key
        const ordered = {};
        Object.keys(unordered)
            .sort()
            .forEach(key => {
            ordered[key] = unordered[key];
        });
        return JSON.stringify(ordered); // minify
    }
}
exports.Generator = Generator;
//# sourceMappingURL=generator.js.map