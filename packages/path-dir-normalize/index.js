"use strict";
/**
 * path-dir-normalize - 目錄路徑規範化工具
 *
 * 這個模組提供了目錄路徑的規範化功能，確保目錄路徑以正確的分隔符結尾。
 *
 * @module path-dir-normalize
 * @author bluelovers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathDirNormalize = pathDirNormalize;
exports.createPathDirNormalize = createPathDirNormalize;
const upath2_1 = require("upath2");
const path_strip_sep_1 = require("path-strip-sep");
/**
 * 目錄路徑規範化
 *
 * 這個函數會規範化目錄路徑，確保其以正確的分隔符結尾。
 *
 * @param {string} dir 要規範化的目錄路徑
 * @param {IPathLibLike} [pathLib] 路徑庫選項
 * @returns {string} 規範化後的目錄路徑
 */
function pathDirNormalize(dir, pathLib) {
    var _a, _b;
    // 設置預設路徑庫
    pathLib = pathLib !== null && pathLib !== void 0 ? pathLib : {};
    // 獲取分隔符
    let sep = ((_a = pathLib.sep) !== null && _a !== void 0 ? _a : upath2_1.sep);
    // 規範化路徑並移除尾部分隔符
    let ret = (0, path_strip_sep_1.pathStripSep)(((_b = pathLib.normalize) !== null && _b !== void 0 ? _b : upath2_1.normalize)(dir));
    // 添加正確的分隔符
    return ret + sep;
}
/**
 * 創建目錄路徑規範化函數
 *
 * 這個函數會創建一個自定義的目錄路徑規範化函數，支援自定義的路徑庫。
 *
 * @param {{ normalize(path: string): string, sep: string }} defaultPathLib 預設路徑庫
 * @returns {function(string, IPathLibLike): string} 自定義的規範化函數
 */
function createPathDirNormalize(defaultPathLib) {
    // 檢查參數有效性
    if (typeof defaultPathLib.normalize !== 'function') {
        throw new TypeError(`normalize must be function`);
    }
    if (typeof defaultPathLib.sep !== 'string' || !defaultPathLib.sep.length) {
        throw new TypeError(`sep must be not empty string`);
    }
    // 返回自定義的規範化函數
    return function pathDirNormalize(dir, pathLib) {
        var _a, _b;
        // 設置預設路徑庫
        pathLib = pathLib !== null && pathLib !== void 0 ? pathLib : {};
        // 規範化路徑並添加分隔符
        return ((_a = pathLib.normalize) !== null && _a !== void 0 ? _a : defaultPathLib.normalize)(dir + ((_b = pathLib.sep) !== null && _b !== void 0 ? _b : defaultPathLib.sep));
    };
}
/** 預設導出 - pathDirNormalize 函數 */
exports.default = pathDirNormalize;
//# sourceMappingURL=index.js.map