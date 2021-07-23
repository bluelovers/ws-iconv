"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathIsSame = exports.fsSameRealpath = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
function fsSameRealpath(dir0, dir1) {
    try {
        let real01 = (0, fs_1.realpathSync)(dir0);
        let real02 = (0, fs_1.realpathSync)(dir1);
        return pathIsSame(real01, real02);
    }
    catch (e) {
    }
}
exports.fsSameRealpath = fsSameRealpath;
function pathIsSame(p1, ...ps) {
    if (ps.length <= 0) {
        throw new TypeError(`p2 must be protected`);
    }
    return ps.every(p2 => (0, path_1.relative)(p1, p2) === '');
}
exports.pathIsSame = pathIsSame;
exports.default = pathIsSame;
//# sourceMappingURL=index.js.map