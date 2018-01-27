/// <reference types="node" />
export declare function skipDecodeWarning(bool?: boolean): void;
export declare function BufferFrom(str: any, encoding: any, from?: any): NodeBuffer;
export declare function detect(str: any): {
    encoding: string;
    confidence: number;
    encoding_lc: string;
};
export declare function decode(str: any, from?: string): string;
export declare function encode(str: any, to?: string, from?: string): any;
import * as self from './iconv';
export default self;
