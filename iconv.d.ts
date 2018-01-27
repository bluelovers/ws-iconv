/// <reference types="node" />
export declare type vEncoding = 'Big5' | 'UTF-8' | 'Gbk' | string | null;
export declare function skipDecodeWarning(bool?: boolean): boolean;
export declare function BufferFrom(str: any, encoding: vEncoding, from?: vEncoding): Buffer;
export declare function detect(str: any): {
    encoding: string;
    confidence: number;
    encoding_lc: string;
};
export declare function decode(str: any, from?: vEncoding): string;
export declare function encode(str: any, to?: vEncoding, from?: vEncoding): Buffer;
import * as self from './iconv';
export default self;
