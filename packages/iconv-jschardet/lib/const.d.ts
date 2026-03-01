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
/**
 * 編碼資料名稱列舉（原始格式）
 * Encoding data name enum (original format)
 *
 * 定義各種字符編碼的標準名稱
 * Defines standard names for various character encodings
 */
export declare const enum CODEC_DATA_NAME {
    /** Big5 繁體中文編碼 / Big5 Traditional Chinese encoding */
    BIG5 = "Big5",
    /** GBK 簡體中文編碼 / GBK Simplified Chinese encoding */
    GBK = "GBK",
    /** GB2312 簡體中文編碼 / GB2312 Simplified Chinese encoding */
    GB2312 = "GB2312",
    /** UTF-16 小尾端編碼 / UTF-16 Little Endian encoding */
    UTF_16_LE = "UTF-16LE",
    /** UTF-16 大尾端編碼 / UTF-16 Big Endian encoding */
    UTF_16_BE = "UTF-16BE",
    /** EUC-JP 日文編碼 / EUC-JP Japanese encoding */
    EUC_JP = "EUC-JP",
    /** Shift_JIS 日文編碼 / Shift_JIS Japanese encoding */
    SHIFT_JIS = "SHIFT_JIS",
    /** ASCII 編碼 / ASCII encoding */
    ASCII = "ASCII",
    /** UTF-8 編碼 / UTF-8 encoding */
    UTF_8 = "UTF-8",
    /** UTF-32 小尾端編碼 / UTF-32 Little Endian encoding */
    UTF_32_LE = "UTF-32LE",
    /** UTF-32 大尾端編碼 / UTF-32 Big Endian encoding */
    UTF_32_BE = "UTF-32BE"
}
/**
 * 編碼資料名稱列舉（大寫格式）
 * Encoding data name enum (uppercase format)
 *
 * 用於內部比對和標準化處理
 * Used for internal comparison and standardization
 */
export declare const enum CODEC_DATA_NAME_TO_UPPER_CASE {
    /** Big5 繁體中文編碼 / Big5 Traditional Chinese encoding */
    BIG5 = "BIG5",
    /** GBK 簡體中文編碼 / GBK Simplified Chinese encoding */
    GBK = "GBK",
    /** GB2312 簡體中文編碼 / GB2312 Simplified Chinese encoding */
    GB2312 = "GB2312",
    /** UTF-16 小尾端編碼 / UTF-16 Little Endian encoding */
    UTF_16_LE = "UTF-16LE",
    /** UTF-16 大尾端編碼 / UTF-16 Big Endian encoding */
    UTF_16_BE = "UTF-16BE",
    /** EUC-JP 日文編碼 / EUC-JP Japanese encoding */
    EUC_JP = "EUC-JP",
    /** Shift_JIS 日文編碼 / Shift_JIS Japanese encoding */
    SHIFT_JIS = "SHIFT_JIS",
    /** ASCII 編碼 / ASCII encoding */
    ASCII = "ASCII",
    /** UTF-8 編碼 / UTF-8 encoding */
    UTF_8 = "UTF-8",
    /** UTF-32 小尾端編碼 / UTF-32 Little Endian encoding */
    UTF_32_LE = "UTF-32LE",
    /** UTF-32 大尾端編碼 / UTF-32 Big Endian encoding */
    UTF_32_BE = "UTF-32BE"
}
/**
 * 編碼資料 ID 列舉（小寫標準化格式）
 * Encoding data ID enum (lowercase normalized format)
 *
 * 用於內部識別和標準化編碼名稱
 * Used for internal identification and standardization of encoding names
 */
export declare const enum CODEC_DATA_ENCODING_ID {
    /** Big5-HKSCS 繁體中文編碼 / Big5-HKSCS Traditional Chinese encoding */
    big5hkscs = "big5hkscs",
    /** CP936 (GBK) 簡體中文編碼 / CP936 (GBK) Simplified Chinese encoding */
    cp936 = "cp936",
    /** GBK 簡體中文編碼 / GBK Simplified Chinese encoding */
    gbk = "gbk",
    /** EUC-JP 日文編碼 / EUC-JP Japanese encoding */
    eucjp = "eucjp",
    /** Shift_JIS 日文編碼 / Shift_JIS Japanese encoding */
    shiftjis = "shiftjis",
    /** UTF-8 編碼 / UTF-8 encoding */
    utf8 = "utf8",
    /** UCS-2 (UTF-16 LE) 編碼 / UCS-2 (UTF-16 LE) encoding */
    ucs2 = "ucs2",
    /** UTF-16 大尾端編碼 / UTF-16 Big Endian encoding */
    utf16be = "utf16be",
    /** UTF-32 大尾端編碼 / UTF-32 Big Endian encoding */
    utf32be = "utf32be",
    /** UTF-32 小尾端編碼 / UTF-32 Little Endian encoding */
    utf32le = "utf32le",
    /** GBK 簡體中文編碼（大寫）/ GBK Simplified Chinese encoding (uppercase) */
    GBK = "gbk",
    /** EUC-JP 日文編碼（大寫）/ EUC-JP Japanese encoding (uppercase) */
    EUC_JP = "eucjp",
    /** Shift_JIS 日文編碼（大寫）/ Shift_JIS Japanese encoding (uppercase) */
    SHIFT_JIS = "shiftjis",
    /** UTF-8 編碼（大寫）/ UTF-8 encoding (uppercase) */
    UTF_8 = "utf8",
    /** UTF-16 大尾端編碼（大寫）/ UTF-16 Big Endian encoding (uppercase) */
    UTF_16_BE = "utf16be",
    /** UTF-32 小尾端編碼（大寫）/ UTF-32 Little Endian encoding (uppercase) */
    UTF_32_LE = "utf32le",
    /** UTF-32 大尾端編碼（大寫）/ UTF-32 Big Endian encoding (uppercase) */
    UTF_32_BE = "utf32be",
    /** ASCII 編碼（小寫）/ ASCII encoding (lowercase) */
    ascii = "ascii",
    /** ASCII 編碼（大寫）/ ASCII encoding (uppercase) */
    ASCII = "ASCII"
}
/**
 * 編碼器資料介面
 * Encoding codec data interface
 *
 * 定義編碼器的元資料結構
 * Defines the metadata structure of an encoding codec
 */
export interface IEncodingCodec {
    /**
     * 主要編碼鍵 / Primary encoding key
     */
    key?: CODEC_DATA_ENCODING_ID | string;
    /**
     * 次要編碼鍵 / Secondary encoding key
     */
    key2?: CODEC_DATA_ENCODING_ID | string;
    /**
     * 編碼 ID / Encoding ID
     */
    id?: CODEC_DATA_ENCODING_ID | string;
    /**
     * 編碼名稱 / Encoding name
     */
    name?: CODEC_DATA_NAME | string;
    /**
     * 輸入編碼 / Input encoding
     */
    input?: EnumEncoding | string;
    /**
     * 是否發生錯誤 / Whether an error occurred
     */
    error?: boolean;
    /**
     * 是否不支援 / Whether not supported
     */
    not?: boolean;
}
/**
 * 編碼器資料表介面
 * Encoding codec table interface
 *
 * 定義支援的編碼器及其屬性
 * Defines supported encodings and their properties
 */
export interface IEncodingCodecTable {
    /** Big5-HKSCS 編碼資料 / Big5-HKSCS encoding data */
    [CODEC_DATA_ENCODING_ID.big5hkscs]: IEncodingCodec & {
        readonly id: "big5";
        readonly name: CODEC_DATA_NAME.BIG5;
    };
    /** CP936 (GB2312) 編碼資料 / CP936 (GB2312) encoding data */
    [CODEC_DATA_ENCODING_ID.cp936]: IEncodingCodec & {
        readonly name: CODEC_DATA_NAME.GB2312;
    };
    /** GBK 編碼資料 / GBK encoding data */
    [CODEC_DATA_ENCODING_ID.gbk]: IEncodingCodec & {
        readonly name: CODEC_DATA_NAME.GBK;
    };
    /** EUC-JP 編碼資料 / EUC-JP encoding data */
    [CODEC_DATA_ENCODING_ID.eucjp]: IEncodingCodec & {
        readonly name: CODEC_DATA_NAME.EUC_JP;
    };
    /** Shift_JIS 編碼資料 / Shift_JIS encoding data */
    [CODEC_DATA_ENCODING_ID.shiftjis]: IEncodingCodec & {
        readonly name: CODEC_DATA_NAME.SHIFT_JIS;
    };
    /** UTF-8 編碼資料 / UTF-8 encoding data */
    [CODEC_DATA_ENCODING_ID.utf8]: IEncodingCodec & {
        readonly name: CODEC_DATA_NAME.UTF_8;
    };
    /** UCS-2 (UTF-16 LE) 編碼資料 / UCS-2 (UTF-16 LE) encoding data */
    [CODEC_DATA_ENCODING_ID.ucs2]: IEncodingCodec & {
        readonly name: CODEC_DATA_NAME.UTF_16_LE;
    };
    /** UTF-16 BE 編碼資料 / UTF-16 BE encoding data */
    [CODEC_DATA_ENCODING_ID.utf16be]: IEncodingCodec & {
        readonly name: CODEC_DATA_NAME.UTF_16_BE;
    };
    /** UTF-32 BE 編碼資料（不支援）/ UTF-32 BE encoding data (not supported) */
    [CODEC_DATA_ENCODING_ID.utf32be]: IEncodingCodec & {
        readonly name: CODEC_DATA_NAME.UTF_32_BE;
        readonly not: true;
    };
    /** UTF-32 LE 編碼資料（不支援）/ UTF-32 LE encoding data (not supported) */
    [CODEC_DATA_ENCODING_ID.utf32le]: IEncodingCodec & {
        readonly name: CODEC_DATA_NAME.UTF_32_LE;
        readonly not: true;
    };
    /** 允許額外的編碼項目 / Allow additional encoding entries */
    [key: string]: IEncodingCodec;
}
/**
 * Node.js 原生編碼列舉
 * Node.js native encoding enum
 *
 * 定義 Node.js Buffer 支援的標準編碼
 * Defines standard encodings supported by Node.js Buffer
 */
export declare const enum ENUM_NODE_ENCODING {
    /** ASCII 編碼 / ASCII encoding */
    ASCII = "ascii",
    /** UTF-8 編碼（短格式）/ UTF-8 encoding (short format) */
    UTF8 = "utf8",
    /** UTF-8 編碼（帶連字符）/ UTF-8 encoding (with hyphen) */
    UTF_8 = "utf-8",
    /** UTF-16 小尾端編碼 / UTF-16 Little Endian encoding */
    UTF16_LE = "utf16le",
    /** UCS-2 編碼（UTF-16 LE 別名）/ UCS-2 encoding (UTF-16 LE alias) */
    UCS2 = "ucs2",
    /** Base64 編碼 / Base64 encoding */
    BASE64 = "base64",
    /** Latin1 編碼 / Latin1 encoding */
    LATIN1 = "latin1",
    /** Binary 編碼（Latin1 別名）/ Binary encoding (Latin1 alias) */
    BINARY = "binary",
    /** Hex 編碼 / Hex encoding */
    HEX = "hex"
}
/**
 * Node.js 原生編碼陣列
 * Node.js native encoding array
 *
 * 包含所有 Node.js Buffer 支援的標準編碼
 * Contains all standard encodings supported by Node.js Buffer
 */
export declare const NodeEncoding: ENUM_NODE_ENCODING[];
/**
 * 編碼器資料表
 * Encoding codec table
 *
 * 定義支援的編碼器及其元資料
 * Defines supported encodings and their metadata
 */
export declare const codec_table: IEncodingCodecTable;
/**
 * 編碼列舉（簡短格式）
 * Encoding enum (short format)
 *
 * 常用編碼的簡短列舉形式
 * Short enum form of commonly used encodings
 */
export declare enum EnumEncoding {
    /** Big5 編碼 / Big5 encoding */
    BIG5 = "Big5",
    /** UTF-8 編碼 / UTF-8 encoding */
    UTF8 = "UTF-8",
    /** GBK 編碼 / GBK encoding */
    GBK = "Gbk"
}
/**
 * Node.js 編碼類型
 * Node.js encoding type
 *
 * 支援的 Node.js 編碼類型聯合
 * Union type of supported Node.js encodings
 */
export type vNodeEncoding = string | null | ENUM_NODE_ENCODING | BufferEncoding;
/**
 * 通用編碼類型
 * General encoding type
 *
 * 支援的所有編碼類型聯合
 * Union type of all supported encodings
 */
export type vEncoding = string | null | EnumEncoding | ENUM_NODE_ENCODING | BufferEncoding;
/**
 * 編碼檢測結果介面
 * Encoding detection result interface
 *
 * 定義 jschardet 檢測結果的結構
 * Defines the structure of jschardet detection results
 */
export interface IDetectData {
    /**
     * 檢測到的編碼名稱 / Detected encoding name
     */
    encoding: string;
    /**
     * 檢測置信度（0-1）/ Detection confidence (0-1)
     */
    confidence: number;
    /**
     * 標準化編碼名稱 / Normalized encoding name
     */
    name?: string;
    /**
     * 編碼 ID / Encoding ID
     */
    id?: CODEC_DATA_ENCODING_ID | string;
}
/**
 * 將編碼名稱轉換為大寫
 * Convert encoding name to uppercase
 *
 * 用於標準化編碼名稱進行比對
 * Used for standardizing encoding names for comparison
 *
 * @param {string} key - 編碼名稱 / Encoding name
 * @returns {string} - 大寫格式的編碼名稱 / Uppercase encoding name
 */
export declare function codecDataNameToUpperCase<T extends keyof typeof CODEC_DATA_NAME_TO_UPPER_CASE>(key: (typeof CODEC_DATA_NAME_TO_UPPER_CASE | typeof CODEC_DATA_NAME)[T]): (typeof CODEC_DATA_NAME_TO_UPPER_CASE)[T];
export declare function codecDataNameToUpperCase(key: IDetectData["name"]): CODEC_DATA_NAME_TO_UPPER_CASE | string;
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
export declare function _codecTable<T extends Partial<IEncodingCodec>>(data: T): IEncodingCodec & T;
/**
 * 返回小寫標準化後的編碼 ID
 * Return lowercase normalized encoding ID
 *
 * 將各種格式的編碼名稱標準化為小寫 ID
 * Standardizes various encoding name formats to lowercase ID
 *
 * @param {string} encoding - 輸入編碼名稱 / Input encoding name
 * @returns {CODEC_DATA_ENCODING_ID | string} - 標準化後的編碼 ID / Normalized encoding ID
 * @throws {Error} - 當編碼為 null 或 undefined 時拋出錯誤 / Throws error when encoding is null or undefined
 */
export declare function _enc(encoding: string | CODEC_DATA_NAME | CODEC_DATA_NAME_TO_UPPER_CASE | ENUM_NODE_ENCODING): CODEC_DATA_ENCODING_ID | string;
/**
 * 返回小寫標準化後的編碼 ID（泛型版本）
 * Return lowercase normalized encoding ID (generic version)
 *
 * @param {string} encoding - 輸入編碼名稱 / Input encoding name
 * @returns {T} - 標準化後的編碼 ID / Normalized encoding ID
 */
export declare function _enc<T extends CODEC_DATA_ENCODING_ID | string>(encoding: string | CODEC_DATA_NAME | CODEC_DATA_NAME_TO_UPPER_CASE | ENUM_NODE_ENCODING): T;
declare const _default: typeof import("./const");
export default _default;
