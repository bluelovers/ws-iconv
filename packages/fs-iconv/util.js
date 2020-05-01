"use strict";
/**
 * Created by user on 2019/3/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimFilename = void 0;
const sanitize = require("sanitize-filename");
function trimFilename(name) {
    let ret = name.toString()
        .replace(/\r\n|\r|\n/g, ' ')
        .replace(/[\r\n\t  \xA0]+/g, ' ');
    return sanitize(ret)
        .trim()
        .replace(/^[　\s_]+/g, '')
        .replace(/[　\s_]+$/g, '');
}
exports.trimFilename = trimFilename;
exports.default = exports;
//# sourceMappingURL=util.js.map