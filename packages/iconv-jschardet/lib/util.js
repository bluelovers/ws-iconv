"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIconvLiteCodec = void 0;
const const_1 = require("./const");
// @ts-ignore
const iconv_lite_1 = require("iconv-lite");
function getIconvLiteCodec(encoding) {
    let codec;
    let enc;
    let enc2;
    try {
        // @ts-ignore
        codec = (0, iconv_lite_1.getCodec)(encoding);
        enc2 = codec.encodingName || codec.enc;
        if (const_1.codec_table[enc2]) {
            enc = enc2;
        }
    }
    catch (e) {
    }
    return {
        codec,
        enc,
        enc2,
    };
}
exports.getIconvLiteCodec = getIconvLiteCodec;
//# sourceMappingURL=util.js.map