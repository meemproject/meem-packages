export enum Chain {
	Ethereum,
	Polygon,
	Cardano,
	Solana,
	Rinkeby
}

export enum PermissionType {
	Copy,
	Remix,
	Read
}

export enum Permission {
	Owner,
	Anyone,
	Addresses,
	Holders
}

export enum PropertyType {
	Meem,
	Child,
	DefaultMeem,
	DefaultChild
}

export enum MeemType {
	Original,
	Copy,
	Remix,
	Wrapped
}

export enum UriSource {
	Url,
	Json
}
