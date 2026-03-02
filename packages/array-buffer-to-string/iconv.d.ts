/**
 * ArrayBuffer to String/Buffer Conversion Module (iconv-jschardet version)
 * ArrayBuffer 轉字串/Buffer 模組 (iconv-jschardet 版本)
 *
 * 使用 iconv-jschardet 提供進階編碼轉換功能
 * Provides advanced encoding conversion using iconv-jschardet
 *
 * @module @bluelovers/array-buffer-to-string/iconv
 * @author bluelovers
 * @created 2020-05-01
 */
import { vEncoding } from 'iconv-jschardet';
/**
 * 可接受的緩衝區類型
 * Acceptable buffer types
 */
export type vBufferLike = number[] | ArrayBuffer | Uint8Array;
/**
 * 將 ArrayBuffer 或類似緩衝區轉換為字串（使用 iconv-jschardet）
 * Convert ArrayBuffer or buffer-like to string (using iconv-jschardet)
 *
 * 使用 iconv-jschardet 的 BufferFrom 進行編碼轉換，支援自動編碼偵測
 * Uses iconv-jschardet's BufferFrom for encoding conversion with auto-detection support
 *
 * @param {vBufferLike} buf - 來源緩衝區 / Source buffer
 * @param {vEncoding} [encoding] - 目標編碼 / Target encoding
 * @param {vEncoding} [from] - 來源編碼（可設為 'auto' 進行自動偵測）/ Source encoding (can be 'auto' for auto-detection)
 * @returns {string} - 轉換後的字串 / Converted string
 *
 * @example
 * ```typescript
 * const buffer = new ArrayBuffer(8);
 * // 使用自動偵測來源編碼
 * const str = arrayBufferToString(buffer, 'utf-8', 'auto');
 * console.log(str);
 * ```
 */
export declare function arrayBufferToString(buf: vBufferLike, encoding?: vEncoding, from?: vEncoding): string;
/**
 * 將 ArrayBuffer 或類似緩衝區轉換為 Node.js Buffer（使用 iconv-jschardet）
 * Convert ArrayBuffer or buffer-like to Node.js Buffer (using iconv-jschardet)
 *
 * 使用 iconv-jschardet 的 BufferFrom 進行編碼轉換，支援多種編碼格式
 * Uses iconv-jschardet's BufferFrom for encoding conversion supporting multiple formats
 *
 * @param {vBufferLike} buf - 來源緩衝區 / Source buffer
 * @param {vEncoding} [encoding] - 目標編碼 / Target encoding
 * @param {vEncoding} [from] - 來源編碼（可設為 'auto' 進行自動偵測）/ Source encoding (can be 'auto' for auto-detection)
 * @returns {Buffer} - Node.js Buffer 實例 / Node.js Buffer instance
 *
 * @example
 * ```typescript
 * const buffer = new ArrayBuffer(8);
 * // 從 Big5 轉換為 UTF-8
 * const nodeBuffer = arrayBufferToBuffer(buffer, 'utf-8', 'big5');
 * console.log(nodeBuffer instanceof Buffer); // true
 * ```
 */
export declare function arrayBufferToBuffer(buf: vBufferLike, encoding?: vEncoding, from?: vEncoding): Buffer;
/**
 * 預設導出：arrayBufferToString 函數
 * Default export: arrayBufferToString function
 */
export default arrayBufferToString;
