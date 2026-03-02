/**
 * BOM Encoding Module
 * BOM 編碼模組
 *
 * 提供創建和偵測位元組順序標記 (BOM) 的功能
 * Provides functionality for creating and detecting Byte Order Mark (BOM)
 *
 * @module bom-encoding
 * @author bluelovers
 */
import { ITSToStringLiteral } from 'ts-type/lib/helper/string';
/**
 * 支援的編碼列舉
 * Supported encoding enumeration
 *
 * 定義所有支援的帶有 BOM 的編碼格式
 * Defines all supported encodings with BOM
 */
export declare const enum EnumEncoding {
    /** UTF-16 Big Endian / UTF-16 大端序 */
    utf_16be = "UTF-16BE",
    /** UTF-16 Little Endian / UTF-16 小端序 */
    utf_16le = "UTF-16LE",
    /** UTF-8 with BOM / 帶 BOM 的 UTF-8 */
    utf_8 = "UTF-8",
    /** UTF-32 Big Endian / UTF-32 大端序 */
    utf_32be = "UTF-32BE",
    /** UTF-32 Little Endian / UTF-32 小端序 */
    utf_32le = "UTF-32LE",
    /** GB-18030 Chinese encoding / GB-18030 中文編碼 */
    gb_18030 = "GB-18030",
    /** Unicode encoding / Unicode 編碼 */
    unicode = "Unicode"
}
/**
 * 為指定編碼創建 BOM 位元組陣列
 * Create BOM byte array for specified encoding
 *
 * 根據編碼類型返回對應的 BOM 位元組序列
 * Returns the corresponding BOM byte sequence based on encoding type
 *
 * @param {IEnumAndString<I_WhatwgEncodingAllowed> | string} encoding - 目標編碼 / Target encoding
 * @param {Object} [options] - 選項 / Options
 * @param {boolean} [options.throwError] - 如果編碼不支援則拋出錯誤 / Throw error if encoding is not supported
 * @returns {[number, number, ...number[]]} - BOM 位元組陣列 / BOM byte array
 * @throws {TypeError} - 當編碼不支援且 throwError 為 true 時拋出 / Thrown when encoding is not supported and throwError is true
 *
 * @example
 * ```typescript
 * const bom = createBOMEncoding(EnumEncoding.utf_8);
 * console.log(bom); // [0xEF, 0xBB, 0xBF]
 * ```
 */
export declare function createBOMEncoding(encoding: IEnumAndString<I_WhatwgEncodingAllowed> | string, options?: {
    throwError?: boolean;
}): [number, number, ...number[]];
/**
 * 從緩衝區偵測 BOM 編碼
 * Detect BOM encoding from buffer
 *
 * 根據緩衝區的前幾個位元組識別編碼類型
 * Identifies encoding type based on first few bytes of the buffer
 *
 * @see https://github.com/jsdom/whatwg-encoding/blob/master/lib/whatwg-encoding.js
 * @see https://github.com/whatwg/html/issues/1910#issuecomment-254017369
 * @see https://zh.wikipedia.org/wiki/位元組順序記號
 *
 * @param {Uint8Array} buffer - 要偵測的緩衝區 / Buffer to detect
 * @param {Object} [options] - 選項 / Options
 * @param {boolean} [options.utf_32le] - 啟用 UTF-32LE 偵測 / Enable UTF-32LE detection
 * @param {boolean} [options.unicode] - 啟用 Unicode 偵測 / Enable Unicode detection
 * @returns {EnumEncoding} - 偵測到的編碼，若無 BOM 則返回 null / Detected encoding, returns null if no BOM found
 *
 * @example
 * ```typescript
 * const buffer = new Uint8Array([0xEF, 0xBB, 0xBF, 0x68, 0x65, 0x6C, 0x6C, 0x6F]);
 * const encoding = detectBOMEncoding(buffer);
 * console.log(encoding); // "UTF-8"
 * ```
 */
export declare function detectBOMEncoding(buffer: Uint8Array, options?: {
    utf_32le?: boolean;
    unicode?: boolean;
}): EnumEncoding;
/**
 * WHATWG 標準允許的編碼類型
 * WHATWG standard allowed encoding types
 *
 * WHATWG Encoding Standard 僅允許 UTF-8、UTF-16BE 和 UTF-16LE
 * WHATWG Encoding Standard only allows UTF-8, UTF-16BE, and UTF-16LE
 */
export type I_WhatwgEncodingAllowed = EnumEncoding.utf_8 | EnumEncoding.utf_16be | EnumEncoding.utf_16le;
/**
 * 列舉或字串類型
 * Enum or string type
 *
 * 允許傳入列舉值或對應的字串
 * Allows passing enum value or corresponding string
 */
export type IEnumAndString<T extends string | number> = T | ITSToStringLiteral<T>;
/**
 * 檢查編碼是否符合 WHATWG 標準
 * Check if encoding conforms to WHATWG standard
 *
 * @param {IEnumAndString<I_WhatwgEncodingAllowed> | string} encoding - 要檢查的編碼 / Encoding to check
 * @returns {boolean} - 是否為 WHATWG 允許的編碼 / Whether it's a WHATWG allowed encoding
 */
export declare function isWhatwgBOMEncodingAllowed(encoding: IEnumAndString<I_WhatwgEncodingAllowed> | string): encoding is I_WhatwgEncodingAllowed;
/**
 * 偵測符合 WHATWG 標準的 BOM 編碼
 * Detect BOM encoding conforming to WHATWG standard
 *
 * 僅返回 WHATWG Encoding Standard 允許的編碼類型
 * Only returns encoding types allowed by WHATWG Encoding Standard
 *
 * @param {Uint8Array} buffer - 要偵測的緩衝區 / Buffer to detect
 * @param {Object} [options] - 選項 / Options
 * @param {boolean} [options.utf_32le] - 啟用 UTF-32LE 偵測 / Enable UTF-32LE detection
 * @param {boolean} [options.unicode] - 啟用 Unicode 偵測 / Enable Unicode detection
 * @returns {I_WhatwgEncodingAllowed} - 偵測到的 WHATWG 標準編碼 / Detected WHATWG standard encoding
 *
 * @example
 * ```typescript
 * const buffer = new Uint8Array([0xEF, 0xBB, 0xBF, ...]);
 * const encoding = whatwgBOMEncoding(buffer);
 * console.log(encoding); // "UTF-8" (WHATWG 允許)
 * ```
 */
export declare function whatwgBOMEncoding(buffer: Uint8Array, options?: {
    utf_32le?: boolean;
    unicode?: boolean;
}): I_WhatwgEncodingAllowed;
/**
 * 預設導出：BOM 編碼偵測函數
 * Default export: BOM encoding detection function
 */
export default detectBOMEncoding;
