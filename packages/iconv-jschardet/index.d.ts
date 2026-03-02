import iconvLite, { encodingExists, Options as IOptionsIconvLite } from 'iconv-lite';
import jschardet from 'jschardet';
export * from './lib/const';
export * from './encoding';
import { disableCodecDataWarn } from './encoding';
import { IDetectData, vEncoding } from './lib/const';
export { encodingExists, jschardet, iconvLite, disableCodecDataWarn, };
/**
 * 停用編碼檢測警告
 * Disable encoding detection warning
 *
 * 設定是否停用 iconv-lite 的解碼警告功能
 * Set whether to disable the decoding warning feature in iconv-lite
 *
 * @param {boolean} bool - 是否停用警告 / Whether to disable warnings (default: true)
 * @returns {boolean} - 設定後的狀態 / The set status
 */
export declare function skipDecodeWarning(bool?: boolean): boolean;
/**
 * 將輸入內容轉換為 Buffer
 * Convert input content to Buffer
 *
 * 支援多種輸入格式的 Buffer 轉換，包括字串、ArrayBuffer、TypedArray 等
 * Support Buffer conversion for various input formats, including strings, ArrayBuffer, TypedArray, etc.
 *
 * @param {unknown} str - 輸入內容 / Input content (string, ArrayBuffer, TypedArray, etc.)
 * @param {vEncoding} encoding - 目標編碼 / Target encoding (default: 'utf8')
 * @param {vEncoding} [from] - 原始編碼 / Original encoding (optional)
 * @param {IOptionsIconvLite} [options] - iconv-lite 選項 / iconv-lite options (optional)
 * @returns {Buffer} - 轉換後的 Buffer / Converted Buffer
 */
export declare function BufferFrom(str: unknown, encoding?: vEncoding, from?: vEncoding, options?: IOptionsIconvLite): Buffer;
/**
 * 檢測輸入內容編碼
 * Detect input content encoding
 *
 * 使用 jschardet 庫來自動檢測輸入內容的字符編碼
 * Use the jschardet library to automatically detect the character encoding of input content
 *
 * @param {any} str - 要檢測的輸入內容 / Input content to detect
 * @param {boolean} [plus] - 是否包含額外的編碼資訊 / Whether to include additional encoding information (optional)
 * @returns {IDetectData} - 檢測結果，包含編碼名稱和置信度 / Detection result, including encoding name and confidence
 */
export declare function detect(str: any, plus?: boolean): IDetectData;
/**
 * 檢測輸入內容編碼並且轉換為 字串
 * Detect input content encoding and convert to string
 *
 * 自動檢測輸入內容的編碼並轉換為 UTF-8 字串
 * Automatically detect the encoding of input content and convert it to a UTF-8 string
 *
 * @param {any} str - 要解碼的輸入內容 / Input content to decode
 * @param {vEncoding} [from] - 指定的原始編碼 / Specified original encoding (optional)
 * @returns {string} - 解碼後的字串 / Decoded string
 */
export declare function decode(str: any, from?: vEncoding): string;
/**
 * 檢測輸入內容編碼並且轉換為 Buffer
 * Detect input content encoding and convert to Buffer
 *
 * 將輸入內容轉換為指定編碼的 Buffer
 * Convert input content to a Buffer with the specified encoding
 *
 * @param {any} str - 要編碼的輸入內容 / Input content to encode
 * @param {vEncoding} [to] - 目標編碼 / Target encoding (default: UTF8)
 * @param {vEncoding} [from] - 原始編碼 / Original encoding (optional)
 * @param {IOptionsIconvLite} [options] - iconv-lite 選項 / iconv-lite options (optional)
 * @returns {Buffer} - 編碼後的 Buffer / Encoded Buffer
 */
export declare function encode(str: any, to?: vEncoding, from?: vEncoding, options?: IOptionsIconvLite): Buffer;
declare const _default: typeof import("./index");
export default _default;
