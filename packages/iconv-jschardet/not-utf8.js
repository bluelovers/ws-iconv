"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectEncoding = detectEncoding;
exports.notUTF8Buffer = notUTF8Buffer;
exports.notUTF8 = notUTF8;
/**
 * Created by user on 2019/3/21.
 */
const index_1 = require("./index");
const const_1 = require("./lib/const");
/**
 * 檢測 Buffer 並且返回小寫標準化後的編碼 ID
 * Detect Buffer and return lowercase normalized encoding ID
 *
 * 使用 jschardet 檢測 Buffer 的編碼格式，並返回標準化的小寫編碼 ID
 * Use jschardet to detect the encoding format of a Buffer and return the normalized lowercase encoding ID
 *
 * @param {Buffer} buf - 要檢測的 Buffer / Buffer to detect
 * @returns {T} - 標準化後的編碼 ID / Normalized encoding ID
 */
function detectEncoding(buf) {
    let chk = (0, index_1.detect)(buf);
    return (0, const_1._enc)(chk.encoding);
}
/**
 * 當 Buffer 編碼不屬於 UTF-8 或者 ascii 時
 * 返回編碼資訊
 * Return encoding information when Buffer encoding is not UTF-8 or ASCII
 *
 * 檢測 Buffer 編碼，如果編碼不是 UTF-8 或 ASCII，則返回完整的編碼檢測結果
 * Detect Buffer encoding, and if the encoding is not UTF-8 or ASCII, return the complete encoding detection result
 *
 * @param {Buffer} buf - 要檢測的 Buffer / Buffer to detect
 * @returns {IDetectData | null} - 如果不是 UTF-8 或 ASCII 則返回檢測結果，否則返回 null / Returns detection result if not UTF-8 or ASCII, otherwise returns null
 */
function notUTF8Buffer(buf) {
    let chk = (0, index_1.detect)(buf, true);
    let encoding = (0, const_1._enc)(chk.encoding);
    return (encoding === "utf8" /* CODEC_DATA_ENCODING_ID.utf8 */ || encoding === "ascii" /* CODEC_DATA_ENCODING_ID.ascii */) ? null : chk;
}
/**
 * 當 Buffer | string 編碼不屬於 UTF-8 或者 ascii 時
 * 返回編碼資訊
 * Return encoding information when Buffer or string encoding is not UTF-8 or ASCII
 *
 * 檢測輸入內容的編碼，如果編碼不是 UTF-8 或 ASCII，則返回完整的編碼檢測結果
 * Detect the encoding of input content, and if the encoding is not UTF-8 or ASCII, return the complete encoding detection result
 *
 * @param {Buffer | string} buf - 要檢測的 Buffer 或字串 / Buffer or string to detect
 * @returns {IDetectData | null} - 如果不是 UTF-8 或 ASCII 則返回檢測結果，否則返回 null / Returns detection result if not UTF-8 or ASCII, otherwise returns null
 */
function notUTF8(buf) {
    if (!Buffer.isBuffer(buf)) {
        buf = Buffer.from(buf);
    }
    return notUTF8Buffer(buf);
}
exports.default = exports;
//# sourceMappingURL=not-utf8.js.map