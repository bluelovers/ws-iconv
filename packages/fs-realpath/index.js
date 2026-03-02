"use strict";
/**
 * fs-realpath-native - 檔案系統實體路徑處理
 *
 * 這個模組提供了檔案系統實體路徑處理的功能，包括同步和異步操作，以及錯誤處理。
 *
 * @module fs-realpath-native
 * @author bluelovers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fsRealpathNativeSync = void 0;
exports.fsRealpathNativeAsync = fsRealpathNativeAsync;
exports.tryFsRealpathNativeSync = tryFsRealpathNativeSync;
exports.tryFsRealpathNativeAsync = tryFsRealpathNativeAsync;
const fs_1 = require("fs");
/** 同步解析實體路徑函數 */
exports.fsRealpathNativeSync = fs_1.realpathSync.native;
/**
 * 異步解析實體路徑
 *
 * 這個函數會異步解析指定路徑的實體路徑，支援不同的編碼選項。
 *
 * @param {PathLike} path 要解析的路徑
 * @param {BufferEncodingOption | EncodingOption} [options] 編碼選項
 * @returns {Promise<string | Buffer>} Promise，解析為字串或緩衝區
 */
async function fsRealpathNativeAsync(path, options) {
    // 使用同步函數來實現異步功能
    return (0, exports.fsRealpathNativeSync)(path, options);
}
/**
 * 嘗試解析實體路徑（同步）
 *
 * 這個函數會嘗試解析指定路徑的實體路徑，如果路徑不存在則返回原路徑，不拋出錯誤。
 *
 * @param {PathLike} path 要解析的路徑
 * @param {BufferEncodingOption | EncodingOption} [options] 編碼選項
 * @returns {string | Buffer} 解析後的路徑或原路徑
 * @see https://github.com/facebook/jest/blob/main/packages/jest-util/src/tryRealpath.ts
 */
function tryFsRealpathNativeSync(path, options) {
    try {
        // 嘗試解析實體路徑
        path = fs_1.realpathSync.native(path, options);
    }
    catch (error) {
        // 如果錯誤不是因為路徑不存在，則重新拋出錯誤
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }
    // 返回解析後的路徑或原路徑
    return path;
}
/**
 * 嘗試解析實體路徑（異步）
 *
 * 這個函數會嘗試異步解析指定路徑的實體路徑，如果路徑不存在則返回原路徑，不拋出錯誤。
 *
 * @param {PathLike} path 要解析的路徑
 * @param {BufferEncodingOption | EncodingOption} [options] 編碼選項
 * @returns {Promise<string | Buffer>} Promise，解析為字串或緩衝區
 */
async function tryFsRealpathNativeAsync(path, options) {
    // 使用同步函數來實現異步功能
    return tryFsRealpathNativeSync(path, options);
}
/** 預設導出 - 嘗試解析實體路徑（同步）函數 */
exports.default = tryFsRealpathNativeSync;
//# sourceMappingURL=index.js.map