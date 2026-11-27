"use strict";
/**
 * path-is-same - 路徑比較工具
 *
 * 這個模組提供了多種路徑比較功能，可以檢查多個路徑是否指向相同的檔案或目錄。
 *
 * @module path-is-same
 * @author bluelovers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._pathIsSame = _pathIsSame;
exports._assertInputArgv = _assertInputArgv;
exports.fsSameRealpath = fsSameRealpath;
exports.pathIsSame = pathIsSame;
const upath2_1 = require("upath2");
const fs_1 = require("fs");
/**
 * 檢查兩個路徑是否相同
 *
 * 這個函數使用相對路徑比較來檢查兩個路徑是否指向相同的檔案或目錄。
 *
 * @param {string} p1 第一個路徑
 * @param {string} p2 第二個路徑
 * @returns {boolean} 如果路徑相同則返回 true，否則返回 false
 */
function _pathIsSame(p1, p2) {
    /**
     * 使用 upath2 的 relative 函數來比較路徑
     * 如果相對路徑為空字串，則表示兩個路徑相同
     */
    return typeof p2 === 'string' && (p1 === p2 || (0, upath2_1.relative)(p1, p2) === '');
}
/**
 * 檢查輸入參數是否有效
 *
 * 這個函數會檢查是否提供了足夠的路徑參數，如果沒有則拋出錯誤。
 *
 * @param {string} p1 第一個路徑
 * @param {...string[]} ps 其他路徑
 * @throws {TypeError} 如果沒有提供足夠的路徑參數
 */
function _assertInputArgv(p1, ...ps) {
    if (ps.length <= 0) {
        throw new TypeError(`p2 must be provide. p1: ${p1}`);
    }
}
function fsSameRealpath(p1, ...ps) {
    var _a;
    /** 檢查輸入參數 */
    _assertInputArgv(p1, ...ps);
    /** 檢查路徑是否為空 */
    if (!(p1 === null || p1 === void 0 ? void 0 : p1.length) || !((_a = ps[0]) === null || _a === void 0 ? void 0 : _a.length)) {
        return false;
    }
    /** 解析第一個路徑的實體路徑 */
    p1 = fs_1.realpathSync.native(p1);
    /** 檢查所有路徑是否指向相同的實體檔案 */
    return ps.every(p2 => {
        try {
            /** 解析第二個路徑的實體路徑 */
            p2 = fs_1.realpathSync.native(p2);
        }
        catch (e) {
            /** 如果解析失敗，則返回 false */
            return false;
        }
        /** 檢查兩個實體路徑是否相同 */
        return _pathIsSame(p1, p2);
    });
}
function pathIsSame(p1, ...ps) {
    var _a;
    /** 檢查輸入參數 */
    _assertInputArgv(p1, ...ps);
    /** 檢查路徑是否為空 */
    if (!(p1 === null || p1 === void 0 ? void 0 : p1.length) || !((_a = ps[0]) === null || _a === void 0 ? void 0 : _a.length)) {
        return false;
    }
    /** 檢查所有路徑是否相同 */
    return ps.every(p2 => _pathIsSame(p1, p2));
}
/** 預設導出 - pathIsSame 函數 */
exports.default = pathIsSame;
//# sourceMappingURL=index.js.map