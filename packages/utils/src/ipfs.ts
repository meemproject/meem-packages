export const normalizeImageUrl = (url: string) => {
	const isIPFS = /^ipfs:\/\//.test(url)
	if (isIPFS) {
		const ipfsId = url.replace('ipfs://', '')
		return `https://gateway.pinata.cloud/ipfs/${ipfsId}`
	}
	return url
}
