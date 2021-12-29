"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codec_data = exports.disableCodecDataWarn = exports.isNodeEncoding = void 0;
const tslib_1 = require("tslib");
const logger_1 = tslib_1.__importDefault(require("debug-color2/logger"));
const const_1 = require("./lib/const");
const util_1 = require("./lib/util");
tslib_1.__exportStar(require("./lib/const"), exports);
//export { console }
function isNodeEncoding(encoding) {
    let enc = (0, const_1._enc)(encoding);
    return const_1.NodeEncoding.includes((0, const_1._enc)(encoding)) ? enc : null;
}
exports.isNodeEncoding = isNodeEncoding;
let DISABLE_CODEC_DATA_WARN = false;
function disableCodecDataWarn(bool = true) {
    return DISABLE_CODEC_DATA_WARN = bool;
}
exports.disableCodecDataWarn = disableCodecDataWarn;
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
exports.codec_data = codec_data;
exports.default = exports;
//# sourceMappingURL=encoding.js.map