import Cookies from 'js-cookie'
import { DateTime } from 'luxon'
import { MeemAPI } from '../api.generated'
import { getMeemProject, MeemProject } from '../meemProject'
import { normalizeImageUrl } from './image'

export interface MeemData {
	childMeemCount: number
	claimed: boolean
	createdAt: string
	createdEditionsCount: number
	contractAddress: string
	description: string
	imageUrl: string
	isOwner: boolean
	ownedBy: string
	ownedByName: string
	project: MeemProject
	rawMeem: MeemAPI.IMetadataMeem
	reactionUpvotes: number
	reactionUpvoteFromMe: boolean
	reactionDownvotes: number
	reactionDownvoteFromMe: boolean
	title: string
	tokenId: string
	tokenUrl: string
	totalEditionsCount: number

	// Convenience for lists
	key: string
}

export const meemDataFromApiMeem = (meemApiData: MeemAPI.IMetadataMeem) => {
	const meemMetadata = meemApiData.metadata
	const walletAddress = Cookies.get('walletAddress') ?? ''

	let hasUpvotesFromMe = false
	let hasDownvotesFromMe = false

	meemApiData.addressReactions?.forEach(element => {
		if (element.reaction === 'upvote') {
			hasUpvotesFromMe = true
		} else if (element.reaction === 'downvote') {
			hasDownvotesFromMe = true
		}
	})

	let upvotes = 0
	let downvotes = 0

	if (meemApiData.reactionCounts) {
		if (meemApiData.reactionCounts.upvote) {
			upvotes = meemApiData.reactionCounts.upvote
		}
		if (meemApiData.reactionCounts.downvote) {
			downvotes = meemApiData.reactionCounts.downvote
		}
	}

	const meemDataModel: MeemData = {
		// childMeemCount: meemApiData.childCount,
		childMeemCount: 0,
		claimed:
			meemApiData.owner !== process.env.NEXT_PUBLIC_MEEM_CONTRACT_ADDRESS,
		contractAddress: meemApiData.root,
		createdAt: DateTime.fromSeconds(meemApiData.mintedAt)
			.toLocaleString(DateTime.DATETIME_MED)
			.toString(),
		createdEditionsCount: 0,
		description: meemMetadata.description,
		key: `${meemApiData.tokenId}-${meemApiData.mintedAt}`,
		imageUrl: normalizeImageUrl(meemMetadata.image ?? ' '),
		isOwner: meemApiData.owner.toLowerCase() === walletAddress.toLowerCase(),
		ownedBy: meemApiData.owner,
		ownedByName:
			// eslint-disable-next-line no-nested-ternary
			meemApiData.owner.toLowerCase() === walletAddress.toLowerCase()
				? 'you'
				: meemMetadata.extension_properties?.meem_tweets_extension.tweet
						.username
				? meemMetadata.extension_properties?.meem_tweets_extension.tweet
						.username ?? ''
				: '',
		project: getMeemProject(meemApiData.parentTokenId),
		rawMeem: meemApiData,
		reactionDownvotes: downvotes,
		reactionDownvoteFromMe: hasDownvotesFromMe,
		reactionUpvotes: upvotes,
		reactionUpvoteFromMe: hasUpvotesFromMe,
		title: meemMetadata.name,
		tokenId: meemApiData.tokenId,
		tokenUrl:
			process.env.NEXT_PUBLIC_NETWORK === 'rinkeby'
				? `https://rinkeby.etherscan.io/token/${process.env.NEXT_PUBLIC_MEEM_CONTRACT_ADDRESS}?a=${meemApiData.tokenId}`
				: `https://polygonscan.com/token/${process.env.NEXT_PUBLIC_MEEM_CONTRACT_ADDRESS}?a=${meemApiData.tokenId}`,
		totalEditionsCount: Number(meemApiData.properties.totalCopies)
	}

	return meemDataModel
}
