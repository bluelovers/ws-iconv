"use strict";
/**
 * Created by user on 2017/12/9/009.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn = exports.upath = exports.win32 = exports.posix = void 0;
const path_1 = __importDefault(require("path"));
const wrap_1 = require("./lib/wrap");
exports.posix = new wrap_1.PathWrap(path_1.default.posix, 'posix');
exports.win32 = new wrap_1.PathWrap(path_1.default.win32, 'win32');
const _upath = new wrap_1.PathWrap(path_1.default, 'upath');
exports.upath = _upath;
exports.upath.PathWrap = wrap_1.PathWrap;
//upath.win32 = win32;
//upath.posix = posix;
//upath.upath = upath;
//PathWrap.fn = upath.fn;
exports.upath.fn.win32 = exports.win32;
exports.upath.fn.posix = exports.posix;
exports.upath.fn.upath = exports.upath;
// @ts-ignore
exports.upath.fn.default = exports.upath;
exports.fn = wrap_1.PathWrap.fn = exports.upath.fn;
// @ts-ignore
path_1.default.upath = exports.upath;
for (const key of [
    'win32',
    'posix',
    'upath',
]) {
    exports.win32.fn[key] = exports.posix.fn[key] = exports.upath.fn[key] = exports.upath[key];
}
exports.win32.default = exports.posix.default = exports.upath.default = exports.upath;
// @ts-ignore
//export default upath as PathWrap & IPath & IPathNode;
exports.default = exports.upath;
//# sourceMappingURL=core.js.map