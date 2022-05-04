import { ethers } from 'hardhat'
import {
	AccessControlFacet,
	ClippingFacet,
	ERC721Facet,
	InitDiamond,
	MeemAdminFacet,
	MeemBaseFacet,
	MeemPermissionsFacet,
	MeemQueryFacet,
	MeemSplitsFacet,
	ReactionFacet
} from '../../typechain'

export async function getMeemContracts(contractAddress: string) {
	const accessControlFacet = (await ethers.getContractAt(
		'AccessControlFacet',
		contractAddress
	)) as AccessControlFacet
	const clippingFacet = (await ethers.getContractAt(
		'ClippingFacet',
		contractAddress
	)) as ClippingFacet
	const eRC721Facet = (await ethers.getContractAt(
		'ERC721Facet',
		contractAddress
	)) as ERC721Facet
	const initDiamond = (await ethers.getContractAt(
		'InitDiamond',
		contractAddress
	)) as InitDiamond
	const meemAdminFacet = (await ethers.getContractAt(
		'MeemAdminFacet',
		contractAddress
	)) as MeemAdminFacet
	const meemBaseFacet = (await ethers.getContractAt(
		'MeemBaseFacet',
		contractAddress
	)) as MeemBaseFacet
	const meemPermissionsFacet = (await ethers.getContractAt(
		'MeemPermissionsFacet',
		contractAddress
	)) as MeemPermissionsFacet
	const meemQueryFacet = (await ethers.getContractAt(
		'MeemQueryFacet',
		contractAddress
	)) as MeemQueryFacet
	const meemSplitsFacet = (await ethers.getContractAt(
		'MeemSplitsFacet',
		contractAddress
	)) as MeemSplitsFacet
	const reactionFacet = (await ethers.getContractAt(
		'ReactionFacet',
		contractAddress
	)) as ReactionFacet

	return {
		accessControlFacet,
		clippingFacet,
		eRC721Facet,
		initDiamond,
		meemAdminFacet,
		meemBaseFacet,
		meemPermissionsFacet,
		meemQueryFacet,
		meemSplitsFacet,
		reactionFacet
	}
}

export type MeemContracts = Awaited<ReturnType<typeof getMeemContracts>>
