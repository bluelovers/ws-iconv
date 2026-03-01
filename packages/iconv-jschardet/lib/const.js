"use strict";
/**
 * iconv-jschardet 常數定義模組
 * iconv-jschardet constants definition module
 *
 * 定義編碼名稱、ID 和相關常數
 * Defines encoding names, IDs, and related constants
 *
 * @module iconv-jschardet/lib/const
 * @created 2019/3/21
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumEncoding = exports.codec_table = exports.NodeEncoding = exports.ENUM_NODE_ENCODING = exports.CODEC_DATA_ENCODING_ID = exports.CODEC_DATA_NAME_TO_UPPER_CASE = exports.CODEC_DATA_NAME = void 0;
exports.codecDataNameToUpperCase = codecDataNameToUpperCase;
exports._codecTable = _codecTable;
exports._enc = _enc;
/**
 * 編碼資料名稱列舉（原始格式）
 * Encoding data name enum (original format)
 *
 * 定義各種字符編碼的標準名稱
 * Defines standard names for various character encodings
 */
var CODEC_DATA_NAME;
(function (CODEC_DATA_NAME) {
    /** Big5 繁體中文編碼 / Big5 Traditional Chinese encoding */
    CODEC_DATA_NAME["BIG5"] = "Big5";
    /** GBK 簡體中文編碼 / GBK Simplified Chinese encoding */
    CODEC_DATA_NAME["GBK"] = "GBK";
    /** GB2312 簡體中文編碼 / GB2312 Simplified Chinese encoding */
    CODEC_DATA_NAME["GB2312"] = "GB2312";
    /** UTF-16 小尾端編碼 / UTF-16 Little Endian encoding */
    CODEC_DATA_NAME["UTF_16_LE"] = "UTF-16LE";
    /** UTF-16 大尾端編碼 / UTF-16 Big Endian encoding */
    CODEC_DATA_NAME["UTF_16_BE"] = "UTF-16BE";
    /** EUC-JP 日文編碼 / EUC-JP Japanese encoding */
    CODEC_DATA_NAME["EUC_JP"] = "EUC-JP";
    /** Shift_JIS 日文編碼 / Shift_JIS Japanese encoding */
    CODEC_DATA_NAME["SHIFT_JIS"] = "SHIFT_JIS";
    /** ASCII 編碼 / ASCII encoding */
    CODEC_DATA_NAME["ASCII"] = "ASCII";
    /** UTF-8 編碼 / UTF-8 encoding */
    CODEC_DATA_NAME["UTF_8"] = "UTF-8";
    /** UTF-32 小尾端編碼 / UTF-32 Little Endian encoding */
    CODEC_DATA_NAME["UTF_32_LE"] = "UTF-32LE";
    /** UTF-32 大尾端編碼 / UTF-32 Big Endian encoding */
    CODEC_DATA_NAME["UTF_32_BE"] = "UTF-32BE";
})(CODEC_DATA_NAME || (exports.CODEC_DATA_NAME = CODEC_DATA_NAME = {}));
/**
 * 編碼資料名稱列舉（大寫格式）
 * Encoding data name enum (uppercase format)
 *
 * 用於內部比對和標準化處理
 * Used for internal comparison and standardization
 */
var CODEC_DATA_NAME_TO_UPPER_CASE;
(function (CODEC_DATA_NAME_TO_UPPER_CASE) {
    /** Big5 繁體中文編碼 / Big5 Traditional Chinese encoding */
    CODEC_DATA_NAME_TO_UPPER_CASE["BIG5"] = "BIG5";
    /** GBK 簡體中文編碼 / GBK Simplified Chinese encoding */
    CODEC_DATA_NAME_TO_UPPER_CASE["GBK"] = "GBK";
    /** GB2312 簡體中文編碼 / GB2312 Simplified Chinese encoding */
    CODEC_DATA_NAME_TO_UPPER_CASE["GB2312"] = "GB2312";
    /** UTF-16 小尾端編碼 / UTF-16 Little Endian encoding */
    CODEC_DATA_NAME_TO_UPPER_CASE["UTF_16_LE"] = "UTF-16LE";
    /** UTF-16 大尾端編碼 / UTF-16 Big Endian encoding */
    CODEC_DATA_NAME_TO_UPPER_CASE["UTF_16_BE"] = "UTF-16BE";
    /** EUC-JP 日文編碼 / EUC-JP Japanese encoding */
    CODEC_DATA_NAME_TO_UPPER_CASE["EUC_JP"] = "EUC-JP";
    /** Shift_JIS 日文編碼 / Shift_JIS Japanese encoding */
    CODEC_DATA_NAME_TO_UPPER_CASE["SHIFT_JIS"] = "SHIFT_JIS";
    /** ASCII 編碼 / ASCII encoding */
    CODEC_DATA_NAME_TO_UPPER_CASE["ASCII"] = "ASCII";
    /** UTF-8 編碼 / UTF-8 encoding */
    CODEC_DATA_NAME_TO_UPPER_CASE["UTF_8"] = "UTF-8";
    /** UTF-32 小尾端編碼 / UTF-32 Little Endian encoding */
    CODEC_DATA_NAME_TO_UPPER_CASE["UTF_32_LE"] = "UTF-32LE";
    /** UTF-32 大尾端編碼 / UTF-32 Big Endian encoding */
    CODEC_DATA_NAME_TO_UPPER_CASE["UTF_32_BE"] = "UTF-32BE";
})(CODEC_DATA_NAME_TO_UPPER_CASE || (exports.CODEC_DATA_NAME_TO_UPPER_CASE = CODEC_DATA_NAME_TO_UPPER_CASE = {}));
/**
 * 編碼資料 ID 列舉（小寫標準化格式）
 * Encoding data ID enum (lowercase normalized format)
 *
 * 用於內部識別和標準化編碼名稱
 * Used for internal identification and standardization of encoding names
 */
var CODEC_DATA_ENCODING_ID;
(function (CODEC_DATA_ENCODING_ID) {
    /** Big5-HKSCS 繁體中文編碼 / Big5-HKSCS Traditional Chinese encoding */
    CODEC_DATA_ENCODING_ID["big5hkscs"] = "big5hkscs";
    /** CP936 (GBK) 簡體中文編碼 / CP936 (GBK) Simplified Chinese encoding */
    CODEC_DATA_ENCODING_ID["cp936"] = "cp936";
    /** GBK 簡體中文編碼 / GBK Simplified Chinese encoding */
    CODEC_DATA_ENCODING_ID["gbk"] = "gbk";
    /** EUC-JP 日文編碼 / EUC-JP Japanese encoding */
    CODEC_DATA_ENCODING_ID["eucjp"] = "eucjp";
    /** Shift_JIS 日文編碼 / Shift_JIS Japanese encoding */
    CODEC_DATA_ENCODING_ID["shiftjis"] = "shiftjis";
    /** UTF-8 編碼 / UTF-8 encoding */
    CODEC_DATA_ENCODING_ID["utf8"] = "utf8";
    /** UCS-2 (UTF-16 LE) 編碼 / UCS-2 (UTF-16 LE) encoding */
    CODEC_DATA_ENCODING_ID["ucs2"] = "ucs2";
    /** UTF-16 大尾端編碼 / UTF-16 Big Endian encoding */
    CODEC_DATA_ENCODING_ID["utf16be"] = "utf16be";
    /** UTF-32 大尾端編碼 / UTF-32 Big Endian encoding */
    CODEC_DATA_ENCODING_ID["utf32be"] = "utf32be";
    /** UTF-32 小尾端編碼 / UTF-32 Little Endian encoding */
    CODEC_DATA_ENCODING_ID["utf32le"] = "utf32le";
    // ------------
    /** GBK 簡體中文編碼（大寫）/ GBK Simplified Chinese encoding (uppercase) */
    CODEC_DATA_ENCODING_ID["GBK"] = "gbk";
    /** EUC-JP 日文編碼（大寫）/ EUC-JP Japanese encoding (uppercase) */
    CODEC_DATA_ENCODING_ID["EUC_JP"] = "eucjp";
    /** Shift_JIS 日文編碼（大寫）/ Shift_JIS Japanese encoding (uppercase) */
    CODEC_DATA_ENCODING_ID["SHIFT_JIS"] = "shiftjis";
    /** UTF-8 編碼（大寫）/ UTF-8 encoding (uppercase) */
    CODEC_DATA_ENCODING_ID["UTF_8"] = "utf8";
    /** UTF-16 大尾端編碼（大寫）/ UTF-16 Big Endian encoding (uppercase) */
    CODEC_DATA_ENCODING_ID["UTF_16_BE"] = "utf16be";
    /** UTF-32 小尾端編碼（大寫）/ UTF-32 Little Endian encoding (uppercase) */
    CODEC_DATA_ENCODING_ID["UTF_32_LE"] = "utf32le";
    /** UTF-32 大尾端編碼（大寫）/ UTF-32 Big Endian encoding (uppercase) */
    CODEC_DATA_ENCODING_ID["UTF_32_BE"] = "utf32be";
    // ----------
    /** ASCII 編碼（小寫）/ ASCII encoding (lowercase) */
    CODEC_DATA_ENCODING_ID["ascii"] = "ascii";
    /** ASCII 編碼（大寫）/ ASCII encoding (uppercase) */
    CODEC_DATA_ENCODING_ID["ASCII"] = "ASCII";
})(CODEC_DATA_ENCODING_ID || (exports.CODEC_DATA_ENCODING_ID = CODEC_DATA_ENCODING_ID = {}));
/**
 * Node.js 原生編碼列舉
 * Node.js native encoding enum
 *
 * 定義 Node.js Buffer 支援的標準編碼
 * Defines standard encodings supported by Node.js Buffer
 */
var ENUM_NODE_ENCODING;
(function (ENUM_NODE_ENCODING) {
    /** ASCII 編碼 / ASCII encoding */
    ENUM_NODE_ENCODING["ASCII"] = "ascii";
    /** UTF-8 編碼（短格式）/ UTF-8 encoding (short format) */
    ENUM_NODE_ENCODING["UTF8"] = "utf8";
    /** UTF-8 編碼（帶連字符）/ UTF-8 encoding (with hyphen) */
    ENUM_NODE_ENCODING["UTF_8"] = "utf-8";
    /** UTF-16 小尾端編碼 / UTF-16 Little Endian encoding */
    ENUM_NODE_ENCODING["UTF16_LE"] = "utf16le";
    /** UCS-2 編碼（UTF-16 LE 別名）/ UCS-2 encoding (UTF-16 LE alias) */
    ENUM_NODE_ENCODING["UCS2"] = "ucs2";
    /** Base64 編碼 / Base64 encoding */
    ENUM_NODE_ENCODING["BASE64"] = "base64";
    /** Latin1 編碼 / Latin1 encoding */
    ENUM_NODE_ENCODING["LATIN1"] = "latin1";
    /** Binary 編碼（Latin1 別名）/ Binary encoding (Latin1 alias) */
    ENUM_NODE_ENCODING["BINARY"] = "binary";
    /** Hex 編碼 / Hex encoding */
    ENUM_NODE_ENCODING["HEX"] = "hex";
})(ENUM_NODE_ENCODING || (exports.ENUM_NODE_ENCODING = ENUM_NODE_ENCODING = {}));
/**
 * Node.js 原生編碼陣列
 * Node.js native encoding array
 *
 * 包含所有 Node.js Buffer 支援的標準編碼
 * Contains all standard encodings supported by Node.js Buffer
 */
exports.NodeEncoding = [
    "ascii" /* ENUM_NODE_ENCODING.ASCII */,
    "utf8" /* ENUM_NODE_ENCODING.UTF8 */,
    "utf-8" /* ENUM_NODE_ENCODING.UTF_8 */,
    "utf16le" /* ENUM_NODE_ENCODING.UTF16_LE */,
    "ucs2" /* ENUM_NODE_ENCODING.UCS2 */,
    "base64" /* ENUM_NODE_ENCODING.BASE64 */,
    "latin1" /* ENUM_NODE_ENCODING.LATIN1 */,
    "binary" /* ENUM_NODE_ENCODING.BINARY */,
    "hex" /* ENUM_NODE_ENCODING.HEX */,
];
/**
 * 編碼器資料表
 * Encoding codec table
 *
 * 定義支援的編碼器及其元資料
 * Defines supported encodings and their metadata
 */
exports.codec_table = {
    /** Big5-HKSCS 編碼資料 / Big5-HKSCS encoding data */
    ["big5hkscs" /* CODEC_DATA_ENCODING_ID.big5hkscs */]: _codecTable({
        id: 'big5',
        name: "Big5" /* CODEC_DATA_NAME.BIG5 */,
    }),
    /** CP936 (GB2312) 編碼資料 / CP936 (GB2312) encoding data */
    ["cp936" /* CODEC_DATA_ENCODING_ID.cp936 */]: _codecTable({
        name: "GB2312" /* CODEC_DATA_NAME.GB2312 */,
    }),
    /** GBK 編碼資料 / GBK encoding data */
    ["gbk" /* CODEC_DATA_ENCODING_ID.gbk */]: _codecTable({
        name: "GBK" /* CODEC_DATA_NAME.GBK */,
    }),
    /** EUC-JP 編碼資料 / EUC-JP encoding data */
    ["eucjp" /* CODEC_DATA_ENCODING_ID.eucjp */]: _codecTable({
        name: "EUC-JP" /* CODEC_DATA_NAME.EUC_JP */,
    }),
    /** Shift_JIS 編碼資料 / Shift_JIS encoding data */
    ["shiftjis" /* CODEC_DATA_ENCODING_ID.shiftjis */]: _codecTable({
        name: "SHIFT_JIS" /* CODEC_DATA_NAME.SHIFT_JIS */,
    }),
    //------------------
    /** UTF-8 編碼資料 / UTF-8 encoding data */
    ["utf8" /* CODEC_DATA_ENCODING_ID.utf8 */]: _codecTable({
        name: "UTF-8" /* CODEC_DATA_NAME.UTF_8 */,
    }),
    /** UCS-2 編碼資料 / UCS-2 encoding data */
    ["ucs2" /* CODEC_DATA_ENCODING_ID.ucs2 */]: _codecTable({
        name: "UTF-16LE" /* CODEC_DATA_NAME.UTF_16_LE */,
    }),
    //------------------
    /** UTF-16 BE 編碼資料 / UTF-16 BE encoding data */
    ["utf16be" /* CODEC_DATA_ENCODING_ID.utf16be */]: _codecTable({
        name: "UTF-16BE" /* CODEC_DATA_NAME.UTF_16_BE */,
    }),
    /**
     * Error: Encoding not recognized: '' (searched as: '')
     * UTF-32 BE 編碼資料（不支援）/ UTF-32 BE encoding data (not supported)
     */
    ["utf32be" /* CODEC_DATA_ENCODING_ID.utf32be */]: _codecTable({
        name: "UTF-32BE" /* CODEC_DATA_NAME.UTF_32_BE */,
        not: true,
    }),
    /**
     * UTF-32 LE 編碼資料（不支援）/ UTF-32 LE encoding data (not supported)
     */
    ["utf32le" /* CODEC_DATA_ENCODING_ID.utf32le */]: _codecTable({
        name: "UTF-32LE" /* CODEC_DATA_NAME.UTF_32_LE */,
        not: true,
    }),
};
/**
 * 編碼列舉（簡短格式）
 * Encoding enum (short format)
 *
 * 常用編碼的簡短列舉形式
 * Short enum form of commonly used encodings
 */
var EnumEncoding;
(function (EnumEncoding) {
    /** Big5 編碼 / Big5 encoding */
    EnumEncoding["BIG5"] = "Big5";
    /** UTF-8 編碼 / UTF-8 encoding */
    EnumEncoding["UTF8"] = "UTF-8";
    /** GBK 編碼 / GBK encoding */
    EnumEncoding["GBK"] = "Gbk";
})(EnumEncoding || (exports.EnumEncoding = EnumEncoding = {}));
function codecDataNameToUpperCase(key) {
    return key.toUpperCase();
}
/**
 * 建立編碼器資料表項目
 * Create codec table entry
 *
 * 輔助函數，用於建立類型安全的編碼器資料
 * Helper function for creating type-safe codec data
 *
 * @param {T} data - 編碼器資料 / Codec data
 * @returns {IEncodingCodec & T} - 完整的編碼器資料 / Complete codec data
 */
function _codecTable(data) {
    return data;
}
function _enc(encoding) {
    if (encoding == null) {
        throw new Error(`encoding '${encoding}' is broken`);
    }
    // 標準化：轉小寫並移除非字母數字字符
    // Standardize: convert to lowercase and remove non-alphanumeric characters
    return encoding
        .toString()
        .toLowerCase()
        .replace(/[^0-9a-z]|:\d{4}$/g, '');
}
exports.default = exports;
//# sourceMappingURL=const.js.map