/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'
import fs from 'fs-extra'
import request from 'superagent'

async function downloadTypes() {
	const response = await request.get(
		`${
			process.argv[2] === '--local'
				? 'http://localhost:3005'
				: 'https://dev-api.meem.wtf'
		}/api/1.0/types`
	)

	const filePath = path.join(__dirname, '../api.generated.ts')

	if (response.body && response.body.types) {
		fs.writeFileSync(filePath, response.body.types)
		console.log(`Meem Types downloaded and written to: ${filePath}`)
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
