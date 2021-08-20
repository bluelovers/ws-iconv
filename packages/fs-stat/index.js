"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSameStat = exports.isSymbolicLinkSync = exports.isSymbolicLink = exports.fsStatSync = exports.fsStat = exports._handleOptions = void 0;
/**
 * Created by user on 2020/6/22.
 */
const fs_extra_1 = require("fs-extra");
const fs_1 = require("fs");
function _handleOptions(options) {
    var _a, _b;
    options = {
        ...options,
    };
    (_a = options.followSymlinks) !== null && _a !== void 0 ? _a : (options.followSymlinks = options.allowSymlinks);
    (_b = options.throwIfNoEntry) !== null && _b !== void 0 ? _b : (options.throwIfNoEntry = false);
    return options;
}
exports._handleOptions = _handleOptions;
function fsStat(path, options) {
    options = _handleOptions(options);
    let p = (options.followSymlinks ? fs_extra_1.stat : fs_extra_1.lstat)(path);
    if (!options.throwIfNoEntry) {
        p = p.catch(e => {
            if (e.code === 'ENOENT') {
                return void 0;
            }
            return Promise.reject(e);
        });
    }
    return p;
}
exports.fsStat = fsStat;
function fsStatSync(path, options) {
    options = _handleOptions(options);
    let stat;
    try {
        stat = (options.followSymlinks ? fs_extra_1.statSync : fs_extra_1.lstatSync)(path, options);
    }
    catch (e) {
        if (options.throwIfNoEntry) {
            throw e;
        }
    }
    return stat;
}
exports.fsStatSync = fsStatSync;
function isSymbolicLink(dir0, options) {
    return fsStat(dir0, options).then(stats => stats === null || stats === void 0 ? void 0 : stats.isSymbolicLink());
}
exports.isSymbolicLink = isSymbolicLink;
function isSymbolicLinkSync(dir0, options) {
    const stats = fsStatSync(dir0, options);
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