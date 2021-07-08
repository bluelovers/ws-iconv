"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathIsSame = void 0;
const path_1 = require("path");
function pathIsSame(p1, ...ps) {
    if (ps.length <= 0) {
        throw new TypeError(`p2 must be protected`);
    }
    return ps.every(p2 => (0, path_1.relative)(p1, p2) === '');
}
exports.pathIsSame = pathIsSame;
exports.default = pathIsSame;
//# sourceMappingURL=index.js.map