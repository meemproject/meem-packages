"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const validator_1 = require("./validator");
const versions_1 = require("./versions");
class Parser {
    /**
     * Parses a metadata object or JSON string
     *
     * @param metadata
     */
    parse(metadata) {
        const parsed = typeof metadata === 'string' ? JSON.parse(metadata) : metadata;
        if (!parsed.meem_metadata_type) {
            throw new Error(`The parsed metadata does not contain required meem_metadata_type`);
        }
        if (!parsed.meem_metadata_version) {
            throw new Error(`The parsed metadata does not contain required meem_metadata_version`);
        }
        (0, versions_1.validateMetadataVersion)(parsed);
        const validator = new validator_1.Validator(parsed);
        const validatorResult = validator.validate(parsed);
        if (!validatorResult.valid) {
            throw new Error(`The parsed metadata is invalid: ${validatorResult.errors.map((e) => e.message)}`);
        }
        const [name, type, calVer] = parsed.meem_metadata_version.split('_');
        return {
            name,
            type,
            calVer,
            metadata: parsed
        };
    }
}
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map