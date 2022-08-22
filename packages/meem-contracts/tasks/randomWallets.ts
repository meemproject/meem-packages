/* eslint-disable no-console */
import { HardhatEthersHelpers } from '@nomiclabs/hardhat-ethers/types'
import { ethers as Ethers } from 'ethers'
import { task, types } from 'hardhat/config'
import { HardhatArguments } from 'hardhat/types'
// import log from '../src/lib/log'

export async function randomWallets(options: {
	args: {
		n: number
	}
	ethers: HardhatEthersHelpers
	hardhatArguments?: HardhatArguments
}) {
	const { args } = options
	for (let i = 0; i < args.n; i += 1) {
		const wallet = Ethers.Wallet.createRandom()
		console.log(wallet.address)
	}
}

task('randomWallets', 'Get a list of random wallets')
	.addParam('n', 'The number of wallets to generate', 10, types.int, true)
	.setAction(async (args, { ethers, hardhatArguments }) => {
		const result = await randomWallets({ args, ethers, hardhatArguments })
		return result
	})
