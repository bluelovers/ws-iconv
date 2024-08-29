"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._handleOptions = _handleOptions;
exports.fsStat = fsStat;
exports.fsStatSync = fsStatSync;
exports.isSymbolicLink = isSymbolicLink;
exports.isSymbolicLinkSync = isSymbolicLinkSync;
exports.isSameStat = isSameStat;
exports.isDirectoryOrFileStat = isDirectoryOrFileStat;
exports.isExistsStat = isExistsStat;
exports.fsStatExists = fsStatExists;
exports.fsStatExistsSync = fsStatExistsSync;
/**
 * Created by user on 2020/6/22.
 */
const fs_extra_1 = require("fs-extra");
function _handleOptions(options) {
    var _a, _b;
    options = {
        ...options,
    };
    (_a = options.followSymlinks) !== null && _a !== void 0 ? _a : (options.followSymlinks = options.allowSymlinks);
    (_b = options.throwIfNoEntry) !== null && _b !== void 0 ? _b : (options.throwIfNoEntry = false);
    // @ts-ignore
    if (options.onlyFiles && options.onlyDirectories) {
        throw new TypeError(`Can't use onlyFiles and onlyDirectories at same time`);
    }
    return options;
}
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
function isSymbolicLink(dir0, options) {
    return fsStat(dir0, options).then(stats => stats === null || stats === void 0 ? void 0 : stats.isSymbolicLink());
}
function isSymbolicLinkSync(dir0, options) {
    const stats = fsStatSync(dir0, options);
    return stats === null || stats === void 0 ? void 0 : stats.isSymbolicLink();
}
function isSameStat(st1, ...stats) {
    if (stats.length <= 0) {
        throw new TypeError(`st2 must be protected`);
    }
    if (!st1 || !stats[0]) {
        return false;
    }
    return stats.every(st2 => (st2 === null || st2 === void 0 ? void 0 : st2.ino) === st1.ino);
}
function isDirectoryOrFileStat(stat, opts) {
    if (stat) {
        return !(opts.onlyDirectories && !stat.isDirectory() || opts.onlyFiles && !stat.isFile());
    }
    return null;
}
function isExistsStat(stat, options) {
    if (stat) {
        if (options.onlyFiles || options.onlyDirectories) {
            return isDirectoryOrFileStat(stat, options);
        }
        return true;
    }
    return null;
}
function fsStatExists(path, options) {
    return fsStat(path, options)
        .then(stat => {
        return isExistsStat(stat, options);
    });
}
function fsStatExistsSync(path, options) {
    const stat = fsStatSync(path, options);
    return isExistsStat(stat, options);
}
exports.default = fsStat;
//# sourceMappingURL=index.js.map