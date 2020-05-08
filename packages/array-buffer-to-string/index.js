"use strict";
/**
 * Created by user on 2020/5/1.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayBufferToBuffer = exports.arrayBufferToString = void 0;
const buffer_1 = require("buffer");
function arrayBufferToString(buf, encoding, from) {
    return arrayBufferToBuffer(buf, encoding, from).toString(encoding);
}
exports.arrayBufferToString = arrayBufferToString;
function arrayBufferToBuffer(buf, encoding, from) {
    return buffer_1.Buffer.from(buf, from);
}
exports.arrayBufferToBuffer = arrayBufferToBuffer;
exports.default = arrayBufferToString;
//# sourceMappingURL=index.js.map