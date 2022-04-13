export const normalizeImageUrl = (url: string) => {
	const isIPFS = /^ipfs:\/\//.test(url)
	if (isIPFS) {
		const ipfsId = url.replace('ipfs://', '')
		return `https://ipfs.moralis.io:2053/ipfs/${ipfsId}`
	}
	return url
}
