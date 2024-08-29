"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._pathIsSame = _pathIsSame;
exports._assertInputArgv = _assertInputArgv;
exports.fsSameRealpath = fsSameRealpath;
exports.pathIsSame = pathIsSame;
const upath2_1 = require("upath2");
const fs_1 = require("fs");
function _pathIsSame(p1, p2) {
    return (0, upath2_1.relative)(p1, p2) === '';
}
function _assertInputArgv(p1, ...ps) {
    if (ps.length <= 0) {
        throw new TypeError(`p2 must be provide`);
    }
}
function fsSameRealpath(p1, ...ps) {
    var _a;
    _assertInputArgv(p1, ...ps);
    if (!(p1 === null || p1 === void 0 ? void 0 : p1.length) || !((_a = ps[0]) === null || _a === void 0 ? void 0 : _a.length)) {
        return false;
    }
    p1 = fs_1.realpathSync.native(p1);
    return ps.every(p2 => {
        try {
            p2 = fs_1.realpathSync.native(p2);
        }
        catch (e) {
            return false;
        }
        return _pathIsSame(p1, p2);
    });
}
function pathIsSame(p1, ...ps) {
    var _a;
    _assertInputArgv(p1, ...ps);
    if (!(p1 === null || p1 === void 0 ? void 0 : p1.length) || !((_a = ps[0]) === null || _a === void 0 ? void 0 : _a.length)) {
        return false;
    }
    return ps.every(p2 => _pathIsSame(p1, p2));
}
exports.default = pathIsSame;
//# sourceMappingURL=index.js.map