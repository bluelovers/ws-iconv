"use strict";
/**
 * Created by user on 2020/5/1.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayBufferToBuffer = exports.arrayBufferToString = void 0;
const iconv_jschardet_1 = require("iconv-jschardet");
function arrayBufferToString(buf, encoding, from) {
    return (0, iconv_jschardet_1.BufferFrom)(buf, encoding, from).toString(encoding);
}
exports.arrayBufferToString = arrayBufferToString;
function arrayBufferToBuffer(buf, encoding, from) {
    return (0, iconv_jschardet_1.BufferFrom)(buf, encoding, from);
}
exports.arrayBufferToBuffer = arrayBufferToBuffer;
exports.default = arrayBufferToString;
//# sourceMappingURL=iconv.js.map