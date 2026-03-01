/**
 * iconv-jschardet 工具函數模組
 * iconv-jschardet utility functions module
 *
 * 提供與 iconv-lite 整合的輔助函數
 * Provides helper functions for integration with iconv-lite
 *
 * @module iconv-jschardet/lib/util
 */
import { vEncoding } from './const';
/**
 * 取得 iconv-lite 編碼器資訊
 * Get iconv-lite codec information
 *
 * 使用 iconv-lite 的內部 API 取得編碼器資訊，並與本模組的編碼表進行比對
 * Uses iconv-lite's internal API to get codec information and compares with this module's codec table
 *
 * @param {vEncoding} encoding - 要查詢的編碼 / Encoding to query
 * @returns {object} - 包含編碼器、編碼 ID 和次要編碼 ID 的物件 / Object containing codec, encoding ID, and secondary encoding ID
 * @property {object} codec - iconv-lite 編碼器物件 / iconv-lite codec object
 * @property {string} enc - 標準化編碼 ID（如果在編碼表中找到）/ Normalized encoding ID (if found in codec table)
 * @property {string} enc2 - iconv-lite 返回的原始編碼名稱 / Raw encoding name returned by iconv-lite
 */
export declare function getIconvLiteCodec(encoding: vEncoding): {
    codec: {
        encodingName?: string;
        enc?: string;
    };
    enc: string;
    enc2: string;
};
