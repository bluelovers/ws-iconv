"use strict";
/**
 * Created by user on 2020/5/1.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayBufferToString = void 0;
const buffer_1 = require("buffer");
function arrayBufferToString(buf) {
    return buffer_1.Buffer.from(buf).toString();
}
exports.arrayBufferToString = arrayBufferToString;
exports.default = arrayBufferToString;
//# sourceMappingURL=index.js.map