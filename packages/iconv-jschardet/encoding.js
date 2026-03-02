"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNodeEncoding = isNodeEncoding;
exports.disableCodecDataWarn = disableCodecDataWarn;
exports.codec_data = codec_data;
const tslib_1 = require("tslib");
const logger_1 = tslib_1.__importDefault(require("debug-color2/logger"));
const const_1 = require("./lib/const");
const util_1 = require("./lib/util");
tslib_1.__exportStar(require("./lib/const"), exports);
//export { console }
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
function isNodeEncoding(encoding) {
    let enc = (0, const_1._enc)(encoding);
    return const_1.NodeEncoding.includes((0, const_1._enc)(encoding)) ? enc : null;
}
let DISABLE_CODEC_DATA_WARN = false;
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
function disableCodecDataWarn(bool = true) {
    return DISABLE_CODEC_DATA_WARN = bool;
}
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
function codec_data(encoding) {
    var _a, _b, _c;
    if (encoding == null) {
        throw new Error(`encoding '${encoding}' is unknown or broken`);
    }
    let codec;
    let enc;
    let enc2;
    if (!const_1.codec_table[enc = (0, const_1._enc)(encoding)]) {
        let data = (0, util_1.getIconvLiteCodec)(encoding);
        codec = (_a = data.codec) !== null && _a !== void 0 ? _a : codec;
        enc2 = (_b = data.enc2) !== null && _b !== void 0 ? _b : enc2;
        enc = (_c = data.enc) !== null && _c !== void 0 ? _c : enc;
    }
    if (const_1.codec_table[enc]) {
        const_1.codec_table[enc].key = const_1.codec_table[enc].key || enc;
        const_1.codec_table[enc].id = const_1.codec_table[enc].id || enc;
        const_1.codec_table[enc].input = encoding;
        return const_1.codec_table[enc];
    }
    if (!DISABLE_CODEC_DATA_WARN) {
        logger_1.default.warn(encoding, enc, enc2, codec);
    }
    if (enc2) {
        return {
            key: enc,
            key2: enc2,
            input: encoding,
            error: true,
            not: !codec,
        };
    }
    else {
        return null;
    }
}
exports.default = exports;
//# sourceMappingURL=encoding.js.map