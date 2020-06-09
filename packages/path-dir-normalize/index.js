"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPathDirNormalize = exports.pathDirNormalize = void 0;
const path_1 = require("path");
/**
 * dir normalize with end of path.sep
 */
function pathDirNormalize(dir, pathLib) {
    var _a, _b;
    pathLib = pathLib !== null && pathLib !== void 0 ? pathLib : {};
    return ((_a = pathLib.normalize) !== null && _a !== void 0 ? _a : path_1.normalize)(dir + ((_b = pathLib.sep) !== null && _b !== void 0 ? _b : path_1.sep));
}
exports.pathDirNormalize = pathDirNormalize;
function createPathDirNormalize(defaultPathLib) {
    if (typeof defaultPathLib.normalize !== 'function') {
        throw new TypeError(`normalize must be function`);
    }
    if (typeof defaultPathLib.sep !== 'string' || !defaultPathLib.sep.length) {
        throw new TypeError(`sep must be not empty string`);
    }
    return function pathDirNormalize(dir, pathLib) {
        var _a, _b;
        pathLib = pathLib !== null && pathLib !== void 0 ? pathLib : {};
        return ((_a = pathLib.normalize) !== null && _a !== void 0 ? _a : defaultPathLib.normalize)(dir + ((_b = pathLib.sep) !== null && _b !== void 0 ? _b : defaultPathLib.sep));
    };
}
exports.createPathDirNormalize = createPathDirNormalize;
exports.default = pathDirNormalize;
//# sourceMappingURL=index.js.map