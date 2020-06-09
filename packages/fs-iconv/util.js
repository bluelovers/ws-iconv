"use strict";
/**
 * Created by user on 2019/3/17.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimFilename = void 0;
const sanitize_filename_1 = __importDefault(require("sanitize-filename"));
function trimFilename(name) {
    let ret = name.toString()
        .replace(/\r\n|\r|\n/g, ' ')
        .replace(/[\r\n\t  \xA0]+/g, ' ');
    return sanitize_filename_1.default(ret)
        .trim()
        .replace(/^[　\s_]+/g, '')
        .replace(/[　\s_]+$/g, '');
}
exports.trimFilename = trimFilename;
exports.default = exports;
//# sourceMappingURL=util.js.map