"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whatwgBOMEncoding = exports.isWhatwgBOMEncodingAllowed = exports.detectBOMEncoding = exports.createBOMEncoding = exports.EnumEncoding = void 0;
var EnumEncoding;
(function (EnumEncoding) {
    EnumEncoding["utf_16be"] = "UTF-16BE";
    EnumEncoding["utf_16le"] = "UTF-16LE";
    EnumEncoding["utf_8"] = "UTF-8";
    EnumEncoding["utf_32be"] = "UTF-32BE";
    EnumEncoding["utf_32le"] = "UTF-32LE";
    EnumEncoding["gb_18030"] = "GB-18030";
    EnumEncoding["unicode"] = "Unicode";
})(EnumEncoding = exports.EnumEncoding || (exports.EnumEncoding = {}));
function createBOMEncoding(encoding, options) {
    switch (encoding) {
        case "UTF-16BE" /* EnumEncoding.utf_16be */:
            return [0xFE, 0xFF];
        case "UTF-16LE" /* EnumEncoding.utf_16le */:
            return [0xFF, 0xFE];
        case "UTF-8" /* EnumEncoding.utf_8 */:
            return [0xEF, 0xBB, 0xBF];
        case "UTF-32BE" /* EnumEncoding.utf_32be */:
            return [0x00, 0x00, 0xFE, 0xFF];
        case "UTF-32LE" /* EnumEncoding.utf_32le */:
            return [0xFF, 0xFE, 0x00, 0x00];
        case "GB-18030" /* EnumEncoding.gb_18030 */:
            return [0x84, 0x31, 0x95, 0x33];
        case "Unicode" /* EnumEncoding.unicode */:
            return [0x0E, 0xFE, 0xFF];
    }
    if (options === null || options === void 0 ? void 0 : options.throwError) {
        throw new TypeError(`Not support encoding: ${encoding}`);
    }
    return null;
}
exports.createBOMEncoding = createBOMEncoding;
/**
 * @see https://github.com/jsdom/whatwg-encoding/blob/master/lib/whatwg-encoding.js
 * @see https://github.com/whatwg/html/issues/1910#issuecomment-254017369
 * @see https://zh.wikipedia.org/wiki/%E4%BD%8D%E5%85%83%E7%B5%84%E9%A0%86%E5%BA%8F%E8%A8%98%E8%99%9F
 */
function detectBOMEncoding(buffer, options) {
    if (buffer[0] === 0xFE && buffer[1] === 0xFF) {
        return "UTF-16BE" /* EnumEncoding.utf_16be */;
    }
    else if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
        if ((options === null || options === void 0 ? void 0 : options.utf_32le) && buffer[2] === 0x00 && buffer[3] === 0x00) {
            return "UTF-32LE" /* EnumEncoding.utf_32le */;
        }
        return "UTF-16LE" /* EnumEncoding.utf_16le */;
    }
    else if (buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
        return "UTF-8" /* EnumEncoding.utf_8 */;
    }
    else if (buffer[0] === 0x00 && buffer[1] === 0x00 && buffer[2] === 0xFE && buffer[3] === 0xFF) {
        return "UTF-32BE" /* EnumEncoding.utf_32be */;
    }
    else if (buffer[0] === 0x84 && buffer[1] === 0x31 && buffer[2] === 0x95 && buffer[3] === 0x33) {
        return "GB-18030" /* EnumEncoding.gb_18030 */;
    }
    else if ((options === null || options === void 0 ? void 0 : options.unicode) && buffer[0] === 0x0E && buffer[1] === 0xFE && buffer[2] === 0xFF) {
        return "Unicode" /* EnumEncoding.unicode */;
    }
    return null;
}
exports.detectBOMEncoding = detectBOMEncoding;
const _whatwgEncodingAllowed = [
    "UTF-8" /* EnumEncoding.utf_8 */,
    "UTF-16BE" /* EnumEncoding.utf_16be */,
    "UTF-16LE" /* EnumEncoding.utf_16le */,
];
function isWhatwgBOMEncodingAllowed(encoding) {
    return _whatwgEncodingAllowed.includes(encoding);
}
exports.isWhatwgBOMEncodingAllowed = isWhatwgBOMEncodingAllowed;
function whatwgBOMEncoding(buffer, options) {
    const encoding = detectBOMEncoding(buffer, options);
    if (isWhatwgBOMEncodingAllowed(encoding)) {
        return encoding;
    }
    return null;
}
exports.whatwgBOMEncoding = whatwgBOMEncoding;
exports.default = detectBOMEncoding;
//# sourceMappingURL=index.js.map