/**
 * ArrayBuffer to String/Buffer Conversion Module
 * ArrayBuffer 轉字串/Buffer 模組
 *
 * 提供將 ArrayBuffer、TypedArray 或數字陣列轉換為 Node.js Buffer 或字串的功能
 * Provides functionality for converting ArrayBuffer, TypedArray, or number arrays to Node.js Buffer or string
 *
 * @module @bluelovers/array-buffer-to-string
 * @author bluelovers
 * @created 2020-05-01
 */
import { Buffer } from "buffer";
/**
 * 可接受的緩衝區類型
 * Acceptable buffer types
 */
export type vBufferLike = number[] | ArrayBuffer | Uint8Array;
/**
 * 將 ArrayBuffer 或類似緩衝區轉換為字串
 * Convert ArrayBuffer or buffer-like to string
 *
 * 先將輸入轉換為 Node.js Buffer，再使用指定的編碼轉換為字串
 * Converts input to Node.js Buffer first, then to string using specified encoding
 *
 * @param {vBufferLike} buf - 來源緩衝區 / Source buffer
 * @param {BufferEncoding} [encoding='utf-8'] - 目標編碼 / Target encoding
 * @param {BufferEncoding} [from] - 來源編碼 / Source encoding
 * @returns {string} - 轉換後的字串 / Converted string
 *
 * @example
 * ```typescript
 * const buffer = new ArrayBuffer(8);
 * const str = arrayBufferToString(buffer, 'utf-8');
 * console.log(str); // string representation
 * ```
 */
export declare function arrayBufferToString(buf: vBufferLike, encoding?: BufferEncoding, from?: BufferEncoding): string;
/**
 * 將 ArrayBuffer 或類似緩衝區轉換為 Node.js Buffer
 * Convert ArrayBuffer or buffer-like to Node.js Buffer
 *
 * 使用 typedarray-to-buffer 將輸入標準化為 Buffer，然後根據需要重新編碼
 * Uses typedarray-to-buffer to normalize input to Buffer, then re-encodes if needed
 *
 * @param {vBufferLike} buf - 來源緩衝區 / Source buffer
 * @param {BufferEncoding} [encoding='utf-8'] - 目標編碼 / Target encoding
 * @param {BufferEncoding} [from] - 來源編碼 / Source encoding
 * @returns {Buffer} - Node.js Buffer 實例 / Node.js Buffer instance
 *
 * @example
 * ```typescript
 * const buffer = new ArrayBuffer(8);
 * const nodeBuffer = arrayBufferToBuffer(buffer, 'utf-8');
 * console.log(nodeBuffer instanceof Buffer); // true
 * ```
 */
export declare function arrayBufferToBuffer(buf: vBufferLike, encoding?: BufferEncoding, from?: BufferEncoding): Buffer;
/**
 * 預設導出：arrayBufferToString 函數
 * Default export: arrayBufferToString function
 */
export default arrayBufferToString;
