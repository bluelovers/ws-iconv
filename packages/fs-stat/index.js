"use strict";
/**
 * fs-stat - 檔案系統狀態檢查工具
 *
 * 這個模組提供了檔案系統狀態檢查的功能，包括檔案/目錄屬性檢查、符號連結檢查等。
 *
 * @module fs-stat
 * @author bluelovers
 */
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
const fs_extra_1 = require("fs-extra");
/**
 * 處理選項參數
 *
 * 這個內部函數會處理選項參數，設置預設值並檢查參數有效性。
 *
 * @template T 選項類型
 * @param {T} options 選項參數
 * @returns {T} 處理後的選項
 */
function _handleOptions(options) {
    var _a, _b;
    options = {
        ...options,
    };
    // 設置預設值
    (_a = options.followSymlinks) !== null && _a !== void 0 ? _a : (options.followSymlinks = options.allowSymlinks);
    (_b = options.throwIfNoEntry) !== null && _b !== void 0 ? _b : (options.throwIfNoEntry = false);
    // 檢查參數有效性
    // @ts-ignore
    if (options.onlyFiles && options.onlyDirectories) {
        throw new TypeError(`Can't use onlyFiles and onlyDirectories at same time`);
    }
    return options;
}
/**
 * 檢查檔案系統狀態（異步）
 *
 * 這個函數會檢查指定路徑的檔案系統狀態，支援不同的選項和編碼。
 *
 * @template S 狀態類型
 * @param {string | Buffer} path 要檢查的路徑
 * @param {IOptions} [options] 選項
 * @returns {Promise<S>} Promise，解析為狀態物件
 */
function fsStat(path, options) {
    // 處理選項
    options = _handleOptions(options);
    // 根據選項選擇 stat 或 lstat
    let p = (options.followSymlinks ? fs_extra_1.stat : fs_extra_1.lstat)(path);
    // 處理不存在的路徑
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
/**
 * 檢查檔案系統狀態（同步）
 *
 * 這個函數會同步檢查指定路徑的檔案系統狀態，支援不同的選項和編碼。
 *
 * @template S 狀態類型
 * @param {string | Buffer} path 要檢查的路徑
 * @param {IOptions} [options] 選項
 * @returns {S} 狀態物件
 */
function fsStatSync(path, options) {
    // 處理選項
    options = _handleOptions(options);
    let stat;
    try {
        // 根據選項選擇 statSync 或 lstatSync
        stat = (options.followSymlinks ? fs_extra_1.statSync : fs_extra_1.lstatSync)(path, options);
    }
    catch (e) {
        // 如果選項設置為拋出錯誤，則重新拋出
        if (options.throwIfNoEntry) {
            throw e;
        }
    }
    return stat;
}
/**
 * 檢查是否為符號連結（異步）
 *
 * 這個函數會檢查指定路徑是否為符號連結。
 *
 * @param {string} dir0 要檢查的路徑
 * @param {IOptions} [options] 選項
 * @returns {Promise<boolean>} Promise，解析為是否為符號連結
 */
function isSymbolicLink(dir0, options) {
    return fsStat(dir0, options).then(stats => stats === null || stats === void 0 ? void 0 : stats.isSymbolicLink());
}
/**
 * 檢查是否為符號連結（同步）
 *
 * 這個函數會同步檢查指定路徑是否為符號連結。
 *
 * @param {string} dir0 要檢查的路徑
 * @param {IOptions} [options] 選項
 * @returns {boolean} 是否為符號連結
 */
function isSymbolicLinkSync(dir0, options) {
    const stats = fsStatSync(dir0, options);
    return stats === null || stats === void 0 ? void 0 : stats.isSymbolicLink();
}
function isSameStat(st1, ...stats) {
    // 檢查是否提供了足夠的參數
    if (stats.length <= 0) {
        throw new TypeError(`st2 must be protected`);
    }
    // 檢查狀態物件是否為空
    if (!st1 || !stats[0]) {
        return false;
    }
    // 檢查所有狀態物件的 inode 是否相同
    return stats.every(st2 => (st2 === null || st2 === void 0 ? void 0 : st2.ino) === st1.ino);
}
/**
 * 檢查狀態物件是否為目錄或檔案
 *
 * 這個函數會檢查狀態物件是否為目錄或檔案，根據提供的選項。
 *
 * @param {IStatsInput} stat 狀態物件
 * @param {ITSRequireAtLeastOne<IOptionsIsDirectoryOrFileStat>} opts 選項
 * @returns {boolean} 是否符合條件
 */
function isDirectoryOrFileStat(stat, opts) {
    if (stat) {
        return !(opts.onlyDirectories && !stat.isDirectory() || opts.onlyFiles && !stat.isFile());
    }
    return null;
}
/**
 * 檢查狀態物件是否存在
 *
 * 這個函數會檢查狀態物件是否存在，並根據選項過濾結果。
 *
 * @param {IStatsInput} stat 狀態物件
 * @param {IOptionsIsDirectoryOrFileStat} [options] 選項
 * @returns {boolean} 是否符合條件
 */
function isExistsStat(stat, options) {
    if (stat) {
        if (options.onlyFiles || options.onlyDirectories) {
            return isDirectoryOrFileStat(stat, options);
        }
        return true;
    }
    return null;
}
/**
 * 檢查檔案系統狀態是否存在（異步）
 *
 * 這個函數會檢查指定路徑的檔案系統狀態是否存在，並根據選項過濾結果。
 *
 * @param {string | Buffer} path 要檢查的路徑
 * @param {IOptionsWithOnlyDirectoryOrFile} [options] 選項
 * @returns {Promise<boolean>} Promise，解析為是否符合條件
 */
function fsStatExists(path, options) {
    return fsStat(path, options)
        .then(stat => {
        return isExistsStat(stat, options);
    });
}
/**
 * 檢查檔案系統狀態是否存在（同步）
 *
 * 這個函數會同步檢查指定路徑的檔案系統狀態是否存在，並根據選項過濾結果。
 *
 * @param {string | Buffer} path 要檢查的路徑
 * @param {IOptionsWithOnlyDirectoryOrFile} [options] 選項
 * @returns {boolean} 是否符合條件
 */
function fsStatExistsSync(path, options) {
    const stat = fsStatSync(path, options);
    return isExistsStat(stat, options);
}
/** 預設導出 - 檢查檔案系統狀態（異步）函數 */
exports.default = fsStat;
//# sourceMappingURL=index.js.map