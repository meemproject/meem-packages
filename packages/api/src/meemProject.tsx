export enum MeemProject {
	Unknown,
	Tweet,
	Prompt,
	Meme
}

export const getMeemProject = (parentTokenId: string) => {
	let meemProject = MeemProject.Unknown
	switch (parentTokenId) {
		case process.env.NEXT_PUBLIC_MEEM_MAKER_PARENT_TOKEN_ID:
			meemProject = MeemProject.Meme
			break
		case process.env.NEXT_PUBLIC_MEEM_TWEETS_PARENT_TOKEN_ID:
			meemProject = MeemProject.Tweet
			break
		case process.env.NEXT_PUBLIC_MEEM_TWEET_PROMPTS_PARENT_TOKEN_ID:
			meemProject = MeemProject.Prompt
			break
		default:
			meemProject = MeemProject.Unknown
			break
	}
	return meemProject
}
