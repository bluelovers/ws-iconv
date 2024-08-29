"use strict";
/**
 * Created by user on 2020/5/1.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayBufferToString = arrayBufferToString;
exports.arrayBufferToBuffer = arrayBufferToBuffer;
const iconv_jschardet_1 = require("iconv-jschardet");
function arrayBufferToString(buf, encoding, from) {
    return (0, iconv_jschardet_1.BufferFrom)(buf, encoding, from).toString(encoding);
}
function arrayBufferToBuffer(buf, encoding, from) {
    return (0, iconv_jschardet_1.BufferFrom)(buf, encoding, from);
}
exports.default = arrayBufferToString;
//# sourceMappingURL=iconv.js.map