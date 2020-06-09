"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPathDirNormalize = exports.pathDirNormalize = void 0;
const path_1 = require("path");
/**
 * dir normalize with end of path.sep
 */
function pathDirNormalize(dir, pathLib) {
    const { normalize = path_1.normalize, sep = path_1.sep } = pathLib !== null && pathLib !== void 0 ? pathLib : {};
    return normalize(dir + sep);
}
exports.pathDirNormalize = pathDirNormalize;
function createPathDirNormalize(defaultPathLib) {
    if (typeof defaultPathLib.normalize !== 'function') {
        throw new TypeError(`normalize must be function`);
    }
    if (typeof defaultPathLib.sep !== 'string' || !defaultPathLib.sep.length) {
        throw new TypeError(`sep must be not empty string`);
    }
    return function pathDirNormalize(dir, pathLib = defaultPathLib) {
        const { normalize = defaultPathLib.normalize, sep = defaultPathLib.sep } = pathLib !== null && pathLib !== void 0 ? pathLib : {};
        return normalize(dir + sep);
    };
}
exports.createPathDirNormalize = createPathDirNormalize;
exports.default = pathDirNormalize;
//# sourceMappingURL=index.js.map