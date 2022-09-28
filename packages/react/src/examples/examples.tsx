// import { mint } from '@meemproject/meem-contracts'
// import React from 'react'
// import { useWallet } from '../contexts/walletContext'

// export const CreatePage: React.FC = () => {
// 	const { signer } = useWallet()

// 	const handleMint = async () => {
// 		try {
// 			const to = await signer.getAddress()

// 			const tx = await mint({
// 				shouldWaitforTransaction: true,
// 				contractAddress: '<CONTRACT_ADDRESS>',
// 				signer,
// 				to,
// 				tokenURI: 'ipfs://example',
// 				uriSource: UriSource.Url
// 			})

// 			console.log(`Minted token with tx: ${tx.hash}`)
// 		} catch (e) {
// 			console.log(e)
// 		}
// 	}

// 	return <button onClick={handleMint}>Mint a token</button>
// }
