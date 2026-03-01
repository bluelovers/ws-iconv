"use strict";
/**
 * iconv-jschardet 工具函數模組
 * iconv-jschardet utility functions module
 *
 * 提供與 iconv-lite 整合的輔助函數
 * Provides helper functions for integration with iconv-lite
 *
 * @module iconv-jschardet/lib/util
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIconvLiteCodec = getIconvLiteCodec;
const const_1 = require("./const");
// @ts-ignore
const iconv_lite_1 = require("iconv-lite");
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
function getIconvLiteCodec(encoding) {
    /**
     * iconv-lite 編碼器物件
     * iconv-lite codec object
     */
    let codec;
    /**
     * 標準化編碼 ID
     * Normalized encoding ID
     */
    let enc;
    /**
     * 原始編碼名稱
     * Raw encoding name
     */
    let enc2;
    try {
        // 取得 iconv-lite 編碼器 / Get iconv-lite codec
        // @ts-ignore
        codec = (0, iconv_lite_1.getCodec)(encoding);
        enc2 = codec.encodingName || codec.enc;
        // 檢查是否在編碼表中 / Check if in codec table
        if (const_1.codec_table[enc2]) {
            enc = enc2;
        }
    }
    catch (e) {
        // 發生錯誤時忽略 / Ignore errors
    }
    return {
        codec,
        enc,
        enc2,
    };
}
//# sourceMappingURL=util.js.map