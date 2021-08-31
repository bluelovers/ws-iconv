import { ITSToStringLiteral } from 'ts-type/lib/helper/string';
export declare const enum EnumEncoding {
    utf_16be = "UTF-16BE",
    utf_16le = "UTF-16LE",
    utf_8 = "UTF-8",
    utf_32be = "UTF-32BE",
    utf_32le = "UTF-32LE",
    gb_18030 = "GB-18030",
    unicode = "Unicode"
}
export declare function createBOMEncoding(encoding: IEnumAndString<I_WhatwgEncodingAllowed> | string, options?: {
    throwError?: boolean;
}): number[];
/**
 * @see https://github.com/jsdom/whatwg-encoding/blob/master/lib/whatwg-encoding.js
 * @see https://github.com/whatwg/html/issues/1910#issuecomment-254017369
 * @see https://zh.wikipedia.org/wiki/%E4%BD%8D%E5%85%83%E7%B5%84%E9%A0%86%E5%BA%8F%E8%A8%98%E8%99%9F
 */
export declare function detectBOMEncoding(buffer: Uint8Array, options?: {
    utf_32le?: boolean;
    unicode?: boolean;
}): EnumEncoding;
export declare type I_WhatwgEncodingAllowed = EnumEncoding.utf_8 | EnumEncoding.utf_16be | EnumEncoding.utf_16le;
export declare type IEnumAndString<T extends string | number> = T | ITSToStringLiteral<T>;
export declare function isWhatwgBOMEncodingAllowed(encoding: IEnumAndString<I_WhatwgEncodingAllowed> | string): encoding is I_WhatwgEncodingAllowed;
export declare function whatwgBOMEncoding(buffer: Uint8Array, options?: {
    utf_32le?: boolean;
    unicode?: boolean;
}): I_WhatwgEncodingAllowed;
export default detectBOMEncoding;
