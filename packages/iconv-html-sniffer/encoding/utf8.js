"use strict";
/**
 * Created by user on 2020/5/1.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.iconvDecode = exports.sniffHTMLEncoding = exports.defaultEncoding = void 0;
const index_1 = require("../index");
exports.defaultEncoding = 'UTF8';
exports.sniffHTMLEncoding = (0, index_1.createSniffHTMLEncoding)(exports.defaultEncoding);
exports.iconvDecode = (0, index_1.createIconvDecode)(exports.defaultEncoding, exports.sniffHTMLEncoding);
exports.default = {
    defaultEncoding: exports.defaultEncoding,
    sniffHTMLEncoding: exports.sniffHTMLEncoding,
    iconvDecode: exports.iconvDecode,
};
//# sourceMappingURL=utf8.js.map