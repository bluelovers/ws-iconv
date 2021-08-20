"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathIsSame = exports.fsSameRealpath = exports._assertInputArgv = exports._pathIsSame = void 0;
const upath2_1 = require("upath2");
const fs_1 = require("fs");
function _pathIsSame(p1, p2) {
    return (0, upath2_1.relative)(p1, p2) === '';
}
exports._pathIsSame = _pathIsSame;
function _assertInputArgv(p1, ...ps) {
    if (ps.length <= 0) {
        throw new TypeError(`p2 must be provide`);
    }
}
exports._assertInputArgv = _assertInputArgv;
function fsSameRealpath(p1, ...ps) {
    var _a;
    _assertInputArgv(p1, ...ps);
    if (!(p1 === null || p1 === void 0 ? void 0 : p1.length) || !((_a = ps[0]) === null || _a === void 0 ? void 0 : _a.length)) {
        return false;
    }
    p1 = (0, fs_1.realpathSync)(p1);
    return ps.every(p2 => {
        try {
            p2 = (0, fs_1.realpathSync)(p2);
        }
        catch (e) {
            return false;
        }
        return _pathIsSame(p1, p2);
    });
}
exports.fsSameRealpath = fsSameRealpath;
function pathIsSame(p1, ...ps) {
    var _a;
    _assertInputArgv(p1, ...ps);
    if (!(p1 === null || p1 === void 0 ? void 0 : p1.length) || !((_a = ps[0]) === null || _a === void 0 ? void 0 : _a.length)) {
        return false;
    }
    return ps.every(p2 => _pathIsSame(p1, p2));
}
exports.pathIsSame = pathIsSame;
exports.default = pathIsSame;
//# sourceMappingURL=index.js.map