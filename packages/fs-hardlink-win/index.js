"use strict";
/**
 * fs-hardlink-win - Windows 硬連結工具
 *
 * 這個模組提供了在 Windows 系統上檢查硬連結的工具，可以列出指定檔案的所有硬連結。
 *
 * @module fs-hardlink-win
 * @author bluelovers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._handleOutput = _handleOutput;
exports.winHardlinkList = winHardlinkList;
exports.winHardlinkListSync = winHardlinkListSync;
const cross_spawn_extra_1 = require("cross-spawn-extra");
const crlf_normalize_1 = require("crlf-normalize");
/**
 * 處理命令列輸出
 *
 * 這個內部函數會處理 fsutil 命令的輸出，將其轉換為陣列格式。
 *
 * @internal
 * @param {string | Buffer} stdout 命令列輸出
 * @returns {string[]} 處理後的輸出陣列
 */
function _handleOutput(stdout) {
    return (0, crlf_normalize_1.crlf)(stdout.toString()).split('\n').filter(Boolean);
}
/**
 * 異步檢查硬連結列表
 *
 * 這個函數會使用 fsutil 命令檢查指定檔案的所有硬連結，並返回結果陣列。
 *
 * @param {string} file 要檢查的檔案路徑
 * @param {object} [options={}] 選項
 * @param {string} [options.cwd] 工作目錄
 * @returns {Promise<string[]>} Promise，解析為硬連結列表陣列
 */
function winHardlinkList(file, options) {
    var _a;
    return (0, cross_spawn_extra_1.async)('fsutil', [
        'hardlink',
        'list',
        file,
    ], {
        cwd: (_a = options === null || options === void 0 ? void 0 : options.cwd) !== null && _a !== void 0 ? _a : process.cwd(),
    })
        .then(cp => _handleOutput(cp.stdout));
}
/**
 * 同步檢查硬連結列表
 *
 * 這個函數會使用 fsutil 命令同步檢查指定檔案的所有硬連結，並返回結果陣列。
 *
 * @param {string} file 要檢查的檔案路徑
 * @param {object} [options={}] 選項
 * @param {string} [options.cwd] 工作目錄
 * @returns {string[]} 硬連結列表陣列
 */
function winHardlinkListSync(file, options) {
    var _a;
    let cp = (0, cross_spawn_extra_1.sync)('fsutil', [
        'hardlink',
        'list',
        file,
    ], {
        cwd: (_a = options === null || options === void 0 ? void 0 : options.cwd) !== null && _a !== void 0 ? _a : process.cwd(),
    });
    return _handleOutput(cp.stdout);
}
/** 預設導出 - 異步檢查硬連結列表函數 */
exports.default = winHardlinkList;
//# sourceMappingURL=index.js.map