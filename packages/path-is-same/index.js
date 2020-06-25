"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathIsSame = void 0;
const path_dir_normalize_1 = require("path-dir-normalize");
function pathIsSame(p1, ...ps) {
    p1 = path_dir_normalize_1.pathDirNormalize(p1);
    if (ps.length <= 0) {
        throw new TypeError(`p2 must be protected`);
    }
    return ps.every(p2 => path_dir_normalize_1.pathDirNormalize(p2) === p1);
}
exports.pathIsSame = pathIsSame;
exports.default = pathIsSame;
//# sourceMappingURL=index.js.map