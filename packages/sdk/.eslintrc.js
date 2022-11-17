module.exports = {
	extends: 'kengoldfarb',
	globals: {
		describe: true,
		before: true,
		beforeEach: true,
		afterEach: true,
		after: true,
		it: true,
		Promise: true
	},
	rules: {
		"no-param-reassign": ["error", { "props": false }],
		"react/static-property-placement": 0
	}
}
