"use strict";
/**
 * @lazy-node/is-writeable-path - 路徑可寫入檢測模組
 *
 * 這個模組提供了檢測目標路徑是否可寫入的功能，支援同步和非同步操作。
 * 可以檢測檔案和目錄的可寫入狀態。
 *
 * @module @lazy-node/is-writeable-path
 * @author bluelovers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWritableAsync = isWritableAsync;
exports.isWritableSync = isWritableSync;
exports.isWritableFileAsync = isWritableFileAsync;
exports.isWritableFileSync = isWritableFileSync;
exports.isWritableDirectoryAsync = isWritableDirectoryAsync;
exports.isWritableDirectorySync = isWritableDirectorySync;
const fs_1 = require("fs");
const fs_stat_1 = require("fs-stat");
/**
 * 讀寫權限常數
 *
 * @description 結合讀權限和寫權限的常數，用於檢測檔案系統權限
 * @constant {number}
 */
const RW_OK = fs_1.constants.W_OK | fs_1.constants.R_OK;
/**
 * 非同步檢測路徑是否可寫入
 *
 * @description 使用 fs.access() 檢測指定路徑是否具有讀寫權限
 * @param {PathLike} target 要檢測的路徑
 * @returns {Promise<boolean>} 檢測結果，true 表示可寫入，false 表示不可寫入
 * @example
 * ```typescript
 * const isWritable = await isWritableAsync('/path/to/file');
 * console.log(isWritable); // true 或 false
 * ```
 */
function isWritableAsync(target) {
    return fs_1.promises.access(target, RW_OK)
        .then(r => { var _a; return (_a = r) !== null && _a !== void 0 ? _a : true; });
}
/**
 * 同步檢測路徑是否可寫入
 *
 * @description 使用 fs.accessSync() 檢測指定路徑是否具有讀寫權限
 * @param {PathLike} target 要檢測的路徑
 * @returns {boolean} 檢測結果，true 表示可寫入，false 表示不可寫入
 * @example
 * ```typescript
 * const isWritable = isWritableSync('/path/to/file');
 * console.log(isWritable); // true 或 false
 * ```
 */
function isWritableSync(target) {
    var _a;
    try {
        return (_a = (0, fs_1.accessSync)(target, RW_OK)) !== null && _a !== void 0 ? _a : true;
    }
    catch (err) { }
}
/**
 * 非同步檢測檔案是否可寫入
 *
 * @description 先檢查路徑是否存在且為檔案，然後檢測是否可寫入
 * @param {PathLike} target 要檢測的檔案路徑
 * @returns {Promise<boolean>} 檢測結果，true 表示可寫入，false 表示不可寫入
 * @example
 * ```typescript
 * const isFileWritable = await isWritableFileAsync('/path/to/file.txt');
 * console.log(isFileWritable); // true 或 false
 * ```
 */
function isWritableFileAsync(target) {
    return (0, fs_stat_1.fsStatExists)(target, {
        onlyFiles: true,
    }).then(() => isWritableAsync(target));
}
/**
 * 同步檢測檔案是否可寫入
 *
 * @description 先檢查路徑是否存在且為檔案，然後檢測是否可寫入
 * @param {PathLike} target 要檢測的檔案路徑
 * @returns {boolean} 檢測結果，true 表示可寫入，false 表示不可寫入
 * @example
 * ```typescript
 * const isFileWritable = isWritableFileSync('/path/to/file.txt');
 * console.log(isFileWritable); // true 或 false
 * ```
 */
function isWritableFileSync(target) {
    return (0, fs_stat_1.fsStatExistsSync)(target, {
        onlyFiles: true,
    }) && isWritableSync(target);
}
/**
 * 非同步檢測目錄是否可寫入
 *
 * @description 先檢查路徑是否存在且為目錄，然後檢測是否可寫入
 * @param {PathLike} target 要檢測的目錄路徑
 * @returns {Promise<boolean>} 檢測結果，true 表示可寫入，false 表示不可寫入
 * @example
 * ```typescript
 * const isDirWritable = await isWritableDirectoryAsync('/path/to/directory');
 * console.log(isDirWritable); // true 或 false
 * ```
 */
function isWritableDirectoryAsync(target) {
    return (0, fs_stat_1.fsStatExists)(target, {
        onlyDirectories: true,
    }).then(() => isWritableAsync(target));
}
/**
 * 同步檢測目錄是否可寫入
 *
 * @description 先檢查路徑是否存在且為目錄，然後檢測是否可寫入
 * @param {PathLike} target 要檢測的目錄路徑
 * @returns {boolean} 檢測結果，true 表示可寫入，false 表示不可寫入
 * @example
 * ```typescript
 * const isDirWritable = isWritableDirectorySync('/path/to/directory');
 * console.log(isDirWritable); // true 或 false
 * ```
 */
function isWritableDirectorySync(target) {
    return (0, fs_stat_1.fsStatExistsSync)(target, {
        onlyDirectories: true,
    }) && isWritableSync(target);
}
/**
 * 預設匯出：同步檢測路徑是否可寫入
 *
 * @description 這是最常用的函數，提供同步方式檢測路徑可寫入狀態
 * @type {typeof isWritableSync}
 */
exports.default = isWritableSync;
//# sourceMappingURL=index.js.map