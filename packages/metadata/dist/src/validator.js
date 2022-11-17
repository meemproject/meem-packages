"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const jsonschema_1 = require("jsonschema");
const versions_1 = require("./versions");
class Validator {
    constructor(metadata) {
        const { meem_metadata_type, meem_metadata_version } = metadata;
        if (!meem_metadata_type) {
            throw new Error(`The metadata does not contain required meem_metadata_type`);
        }
        if (!meem_metadata_version) {
            throw new Error(`The metadata does not contain required meem_metadata_version`);
        }
        (0, versions_1.validateMetadataVersion)(metadata);
        const [name, type] = meem_metadata_type.split('_');
        this.name = name;
        this.type = type;
        this.calVer = meem_metadata_version;
    }
    /**
     * Validates the passed json against the Validator's schema
     *
     * @param json
     */
    validate(json) {
        const jsonValidator = new jsonschema_1.Validator();
        const schema = require(`../schemas/${this.name}/${this.calVer}/${this.type}.json`);
        jsonValidator.addSchema(schema);
        function importNextSchema() {
            const nextSchema = jsonValidator.unresolvedRefs.shift();
            if (!nextSchema) {
                return;
            }
            const s = require(`../schemas${nextSchema}`);
            jsonValidator.addSchema(s);
        }
        for (let i = 0; i < jsonValidator.unresolvedRefs.length; i += 1) {
            importNextSchema();
        }
        return jsonValidator.validate(json, schema);
    }
}
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map