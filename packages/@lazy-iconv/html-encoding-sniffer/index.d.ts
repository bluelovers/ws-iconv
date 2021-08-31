/// <reference types="node" />
export interface INormalizeHTML {
    html: string;
    encoding: string;
}
export declare function normalizeHTML(html: string, transportLayerEncodingLabel?: string): INormalizeHTML;
export declare function normalizeHTML(html: Buffer, transportLayerEncodingLabel?: string): INormalizeHTML;
export declare function normalizeHTML(html: ArrayBuffer, transportLayerEncodingLabel?: string): INormalizeHTML;
export default normalizeHTML;
