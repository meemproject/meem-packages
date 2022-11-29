/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'
import fs from 'fs-extra'
import request from 'superagent'

async function downloadTypes() {
	console.log('bundleid', process.env.BUNDLE_ID, process.argv)
	const response = await request
		.post(
			`${
				process.argv[2] === '--local'
					? 'http://localhost:3005'
					: 'https://dev-api.meem.wtf'
			}/api/1.0/generateTypes`
		)
		.type('application/json')
		.send({
			bundleId: process.env.BUNDLE_ID,
			name: 'Agreement'
		})

	const filePath = path.join(__dirname, '../generated/agreement.generated.ts')
	const abiPath = path.join(__dirname, '../abis/Agreement.json')

	if (response.body && response.body.abi) {
		fs.writeFileSync(abiPath, JSON.stringify(response.body.abi))
		console.log(`Agreement ABI downloaded and written to: ${abiPath}`)
	} else {
		console.log(response)
		throw new Error('Invalid response')
	}

	if (response.body && response.body.types) {
		fs.writeFileSync(filePath, response.body.types)
		console.log(`Agreement types downloaded and written to: ${filePath}`)
	} else {
		console.log(response)
		throw new Error('Invalid response')
	}
}

downloadTypes()
	.then(() => {})
	.catch(e => {
		console.log(e)
	})
