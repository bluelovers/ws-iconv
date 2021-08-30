/// <reference types="node" />
import iconvLite, { encodingExists, Options as IOptionsIconvLite } from 'iconv-lite';
import jschardet from 'jschardet';
export * from './lib/const';
export * from './encoding';
import { disableCodecDataWarn } from './encoding';
import { IDetectData, vEncoding } from './lib/const';
export { encodingExists, jschardet, iconvLite, disableCodecDataWarn, };
/**
 * 停用編碼檢測警告
 */
export declare function skipDecodeWarning(bool?: boolean): boolean;
/**
 * 將輸入內容轉換為 Buffer
 */
export declare function BufferFrom(str: unknown, encoding?: vEncoding, from?: vEncoding, options?: IOptionsIconvLite): Buffer;
/**
 * 檢測輸入內容編碼
 */
export declare function detect(str: any, plus?: boolean): IDetectData;
/**
 * 檢測輸入內容編碼並且轉換為 字串
 */
export declare function decode(str: any, from?: vEncoding): string;
/**
 * 檢測輸入內容編碼並且轉換為 Buffer
 */
export declare function encode(str: any, to?: vEncoding, from?: vEncoding, options?: IOptionsIconvLite): Buffer;
declare const _default: typeof import("./index");
export default _default;
