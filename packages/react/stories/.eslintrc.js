require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
	extends: ["kengoldfarb"],
	rules: {
		'import/no-extraneous-dependencies': 'off'
	},
};
