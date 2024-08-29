"use strict";
/**
 * Created by user on 2019/3/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimFilename = trimFilename;
const tslib_1 = require("tslib");
const sanitize_filename_1 = tslib_1.__importDefault(require("@lazy-node/sanitize-filename"));
function trimFilename(name) {
    let ret = name.toString()
        .replace(/\r\n|\r|\n/g, ' ')
        .replace(/[\r\n\t  \xA0]+/g, ' ');
    return (0, sanitize_filename_1.default)(ret)
        .trim()
        .replace(/^[　\s_]+/g, '')
        .replace(/[　\s_]+$/g, '');
}
exports.default = exports;
//# sourceMappingURL=util.js.map