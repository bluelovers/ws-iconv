"use strict";
/**
 * Created by user on 2020/5/1.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayBufferToBuffer = exports.arrayBufferToString = void 0;
const tslib_1 = require("tslib");
const buffer_1 = require("buffer");
const typedarray_to_buffer_1 = tslib_1.__importDefault(require("typedarray-to-buffer"));
function arrayBufferToString(buf, encoding, from) {
    return arrayBufferToBuffer(buf, encoding, from).toString(encoding);
}
exports.arrayBufferToString = arrayBufferToString;
function arrayBufferToBuffer(buf, encoding, from) {
    return buffer_1.Buffer.from((0, typedarray_to_buffer_1.default)(buf), from);
}
exports.arrayBufferToBuffer = arrayBufferToBuffer;
exports.default = arrayBufferToString;
//# sourceMappingURL=index.js.map