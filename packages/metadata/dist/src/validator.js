"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const jsonschema_1 = require("jsonschema");
const versions_1 = require("./versions");
class Validator {
    constructor(version) {
        // require version <name>_<type>_<calver>
        (0, versions_1.validateVersion)(version);
        const [name, type, calVer] = version.split('_');
        this.name = name;
        this.type = type;
        this.calVer = calVer;
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