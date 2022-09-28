import { ethers } from 'hardhat'
import {
	AccessControlFacet,
	AdminFacet,
	ClippingFacet,
	PermissionsFacet,
	SplitsFacet,
	ReactionFacet,
	MeemBaseERC721Facet
} from '../../typechain'

export async function getMeemContracts(contractAddress: string) {
	const accessControlFacet = (await ethers.getContractAt(
		'AccessControlFacet',
		contractAddress
	)) as AccessControlFacet
	const adminFacet = (await ethers.getContractAt(
		'AdminFacet',
		contractAddress
	)) as AdminFacet
	const clippingFacet = (await ethers.getContractAt(
		'ClippingFacet',
		contractAddress
	)) as ClippingFacet
	const permissionsFacet = (await ethers.getContractAt(
		'PermissionsFacet',
		contractAddress
	)) as PermissionsFacet
	const splitsFacet = (await ethers.getContractAt(
		'SplitsFacet',
		contractAddress
	)) as SplitsFacet
	const reactionFacet = (await ethers.getContractAt(
		'ReactionFacet',
		contractAddress
	)) as ReactionFacet
	const meemBaseERC721Facet = (await ethers.getContractAt(
		'MeemBaseERC721Facet',
		contractAddress
	)) as MeemBaseERC721Facet

	return {
		accessControlFacet,
		adminFacet,
		clippingFacet,
		permissionsFacet,
		splitsFacet,
		reactionFacet,
		meemBaseERC721Facet
	}
}

export type MeemContracts = Awaited<ReturnType<typeof getMeemContracts>>
