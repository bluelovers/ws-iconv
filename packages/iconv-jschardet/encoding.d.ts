import { IEncodingCodec, vEncoding } from './lib/const';
export * from './lib/const';
/**
 * 檢查是否為 Node.js 支援的編碼
 * Check if encoding is supported by Node.js
 *
 * 驗證輸入的編碼是否屬於 Node.js 內建支援的編碼列表
 * Verify if the input encoding belongs to the list of encodings natively supported by Node.js
 *
 * @param {vEncoding} encoding - 要檢查的編碼 / Encoding to check
 * @returns {string} - 如果支援則返回標準化編碼名稱，否則返回 null / Returns normalized encoding name if supported, otherwise null
 */
export declare function isNodeEncoding(encoding: vEncoding): string;
/**
 * 停用編碼資料警告
 * Disable codec data warning
 *
 * 控制是否顯示編碼資料相關的警告訊息
 * Control whether to display warning messages related to codec data
 *
 * @param {boolean} bool - 是否停用警告 / Whether to disable warnings (default: true)
 * @returns {boolean} - 設定後的狀態 / The set status
 */
export declare function disableCodecDataWarn(bool?: boolean): boolean;
/**
 * 取得編碼資料
 * Get codec data
 *
 * 根據輸入編碼取得對應的編碼器資料，包含編碼名稱、ID 等資訊
 * Get the corresponding codec data based on the input encoding, including encoding name, ID, etc.
 *
 * @param {vEncoding} encoding - 輸入編碼 / Input encoding
 * @returns {IEncodingCodec} - 編碼器資料物件 / Codec data object
 * @throws {Error} - 當編碼為 null 或 undefined 時拋出錯誤 / Throws error when encoding is null or undefined
 */
export declare function codec_data(encoding: vEncoding): IEncodingCodec;
declare const _default: typeof import("./encoding");
export default _default;
