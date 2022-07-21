import { MeemMetadataLike } from '../types';
export interface ParserResult {
    name: string;
    type: string;
    calVer: string;
    metadata: MeemMetadataLike;
}
export declare class Parser {
    /**
     * Parses a metadata object or JSON string
     *
     * @param metadata
     */
    parse(metadata: string | MeemMetadataLike): ParserResult;
}
