"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSameStat = exports.isSymbolicLinkSync = exports.isSymbolicLink = exports.fsStatSync = exports.fsStat = void 0;
/**
 * Created by user on 2020/6/22.
 */
const fs_extra_1 = require("fs-extra");
const fs_1 = require("fs");
function fsStat(path, options) {
    var _a;
    let followSymlinks = (_a = options === null || options === void 0 ? void 0 : options.followSymlinks) !== null && _a !== void 0 ? _a : options === null || options === void 0 ? void 0 : options.allowSymlinks;
    return (followSymlinks ? fs_extra_1.stat : fs_extra_1.lstat)(path);
}
exports.fsStat = fsStat;
function fsStatSync(path, options) {
    var _a;
    let followSymlinks = (_a = options === null || options === void 0 ? void 0 : options.followSymlinks) !== null && _a !== void 0 ? _a : options === null || options === void 0 ? void 0 : options.allowSymlinks;
    return (followSymlinks ? fs_extra_1.statSync : fs_extra_1.lstatSync)(path, options);
}
exports.fsStatSync = fsStatSync;
function isSymbolicLink(dir0, options) {
    return fsStat(dir0, {
        throwIfNoEntry: false,
        ...options,
    }).then(stats => stats === null || stats === void 0 ? void 0 : stats.isSymbolicLink());
}
exports.isSymbolicLink = isSymbolicLink;
function isSymbolicLinkSync(dir0, options) {
    const stats = fsStatSync(dir0, {
        throwIfNoEntry: false,
        ...options,
    });
    return stats === null || stats === void 0 ? void 0 : stats.isSymbolicLink();
}
exports.isSymbolicLinkSync = isSymbolicLinkSync;
function isSameStat(st1, ...stats) {
    if (stats.length <= 0) {
        throw new TypeError(`st2 must be protected`);
    }
    if (!st1 || !stats[0]) {
        return false;
    }
    return stats.every(st2 => (st2 === null || st2 === void 0 ? void 0 : st2.ino) === st1.ino);
}
exports.isSameStat = isSameStat;
exports.default = fsStat;
//# sourceMappingURL=index.js.map