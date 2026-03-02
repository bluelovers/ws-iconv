"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableCodecDataWarn = exports.iconvLite = exports.jschardet = exports.encodingExists = void 0;
exports.skipDecodeWarning = skipDecodeWarning;
exports.BufferFrom = BufferFrom;
exports.detect = detect;
exports.decode = decode;
exports.encode = encode;
const tslib_1 = require("tslib");
const iconv_lite_1 = tslib_1.__importStar(require("iconv-lite"));
exports.iconvLite = iconv_lite_1.default;
Object.defineProperty(exports, "encodingExists", { enumerable: true, get: function () { return iconv_lite_1.encodingExists; } });
const jschardet_1 = tslib_1.__importDefault(require("jschardet"));
exports.jschardet = jschardet_1.default;
const logger_1 = tslib_1.__importDefault(require("debug-color2/logger"));
//import encodingExists = iconvLite.encodingExists;
tslib_1.__exportStar(require("./lib/const"), exports);
tslib_1.__exportStar(require("./encoding"), exports);
const encoding_1 = require("./encoding");
Object.defineProperty(exports, "disableCodecDataWarn", { enumerable: true, get: function () { return encoding_1.disableCodecDataWarn; } });
const const_1 = require("./lib/const");
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
function skipDecodeWarning(bool = true) {
    // @ts-ignore
    return iconv_lite_1.default.skipDecodeWarning = bool;
}
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
function BufferFrom(str, encoding = 'utf8', from, options) {
    let data;
    if (from) {
        data = Buffer.from(str, from);
    }
    else if (ArrayBuffer.isView(str)) {
        data = Buffer.from(str.buffer, str.byteOffset, str.byteLength);
    }
    else if (str instanceof ArrayBuffer) {
        data = Buffer.from(str);
    }
    else {
        data = str;
    }
    data = decode(data);
    let buf = iconv_lite_1.default.encode(data, encoding, options);
    return buf;
}
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
function detect(str, plus) {
    let ret = jschardet_1.default.detect(str);
    if (plus) {
        let cd = (0, encoding_1.codec_data)(ret.encoding);
        if (cd) {
            if (cd.name) {
                ret.name = cd.name;
            }
            ret.id = cd.id;
        }
    }
    if (!ret.name) {
        ret.name = ret.encoding;
    }
    return ret;
}
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
function decode(str, from = null) {
    let c;
    if (!str.length) {
        return '';
    }
    if (!from) {
        c = detect(str);
        from = c.encoding;
    }
    let data;
    let cd = (0, encoding_1.codec_data)(from);
    let key;
    if (cd && cd.name && !cd.not) {
        key = cd.name;
    }
    else {
        key = from;
    }
    switch ((0, const_1.codecDataNameToUpperCase)(key)) {
        //case 'BIG5':
        //case 'GBK':
        //case 'GB2312':
        //case 'UTF-16LE':
        //case 'UTF-16BE':
        //case 'EUC-JP':
        //case 'SHIFT_JIS':
        case "BIG5" /* CODEC_DATA_NAME_TO_UPPER_CASE.BIG5 */:
        case "GBK" /* CODEC_DATA_NAME_TO_UPPER_CASE.GBK */:
        case "GB2312" /* CODEC_DATA_NAME_TO_UPPER_CASE.GB2312 */:
        case "UTF-16LE" /* CODEC_DATA_NAME_TO_UPPER_CASE.UTF_16_LE */:
        case "UTF-16BE" /* CODEC_DATA_NAME_TO_UPPER_CASE.UTF_16_BE */:
        case "EUC-JP" /* CODEC_DATA_NAME_TO_UPPER_CASE.EUC_JP */:
        case "SHIFT_JIS" /* CODEC_DATA_NAME_TO_UPPER_CASE.SHIFT_JIS */:
            data = iconv_lite_1.default.decode(str, from);
            break;
        //case 'ASCII':
        //case 'UTF-8':
        case "ASCII" /* CODEC_DATA_NAME_TO_UPPER_CASE.ASCII */:
        case "UTF-8" /* CODEC_DATA_NAME_TO_UPPER_CASE.UTF_8 */:
            data = str;
            break;
        default:
            c = c || detect(str);
            // @ts-ignore
            if (!iconv_lite_1.default.skipDecodeWarning) {
                logger_1.default.warn('decode', from, c);
            }
            //data = str;
            data = iconv_lite_1.default.decode(str, from);
            break;
    }
    return data;
}
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
function encode(str, to = "utf8" /* ENUM_NODE_ENCODING.UTF8 */, from = null, options) {
    let buf = BufferFrom(str, "utf8" /* ENUM_NODE_ENCODING.UTF8 */, from);
    // @ts-ignore
    return iconv_lite_1.default.encode(buf, to, options);
}
exports.default = exports;
//# sourceMappingURL=index.js.map