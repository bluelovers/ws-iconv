"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = exports.decode = exports.detect = exports.BufferFrom = exports.skipDecodeWarning = exports.disableCodecDataWarn = exports.iconvLite = exports.jschardet = exports.encodingExists = void 0;
const tslib_1 = require("tslib");
const iconv_lite_1 = (0, tslib_1.__importStar)(require("iconv-lite"));
exports.iconvLite = iconv_lite_1.default;
Object.defineProperty(exports, "encodingExists", { enumerable: true, get: function () { return iconv_lite_1.encodingExists; } });
const jschardet_1 = (0, tslib_1.__importDefault)(require("jschardet"));
exports.jschardet = jschardet_1.default;
const logger_1 = (0, tslib_1.__importDefault)(require("debug-color2/logger"));
//import encodingExists = iconvLite.encodingExists;
(0, tslib_1.__exportStar)(require("./lib/const"), exports);
(0, tslib_1.__exportStar)(require("./encoding"), exports);
const encoding_1 = require("./encoding");
Object.defineProperty(exports, "disableCodecDataWarn", { enumerable: true, get: function () { return encoding_1.disableCodecDataWarn; } });
const const_1 = require("./lib/const");
/**
 * 停用編碼檢測警告
 */
function skipDecodeWarning(bool = true) {
    // @ts-ignore
    return iconv_lite_1.default.skipDecodeWarning = bool;
}
exports.skipDecodeWarning = skipDecodeWarning;
/**
 * 將輸入內容轉換為 Buffer
 */
function BufferFrom(str, encoding = 'utf8', from) {
    let data;
    if (from) {
        data = Buffer.from(str, from);
    }
    else {
        data = str;
    }
    data = decode(data);
    let buf = iconv_lite_1.default.encode(data, encoding);
    return buf;
}
exports.BufferFrom = BufferFrom;
/**
 * 檢測輸入內容編碼
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
exports.detect = detect;
/**
 * 檢測輸入內容編碼並且轉換為 字串
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
        case "BIG5" /* BIG5 */:
        case "GBK" /* GBK */:
        case "GB2312" /* GB2312 */:
        case "UTF-16LE" /* UTF_16_LE */:
        case "UTF-16BE" /* UTF_16_BE */:
        case "EUC-JP" /* EUC_JP */:
        case "SHIFT_JIS" /* SHIFT_JIS */:
            data = iconv_lite_1.default.decode(str, from);
            break;
        //case 'ASCII':
        //case 'UTF-8':
        case "ASCII" /* ASCII */:
        case "UTF-8" /* UTF_8 */:
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
exports.decode = decode;
/**
 * 檢測輸入內容編碼並且轉換為 Buffer
 */
function encode(str, to = "utf8" /* UTF8 */, from = null) {
    let buf = BufferFrom(str, "utf8" /* UTF8 */);
    // @ts-ignore
    return iconv_lite_1.default.encode(buf, to);
}
exports.encode = encode;
exports.default = exports;
//# sourceMappingURL=index.js.map