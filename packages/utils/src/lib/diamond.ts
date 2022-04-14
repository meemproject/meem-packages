export enum FacetCutAction {
	Add,
	Replace,
	Remove
}

export interface IFacetCut {
	facetAddress: string
	action: FacetCutAction
	functionSelectors: string[]
}
