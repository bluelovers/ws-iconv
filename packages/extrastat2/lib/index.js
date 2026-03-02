"use strict";
/**
 * 擴展檔案狀態核心模組
 * Extended file status core module
 *
 * 提供 statExtra 函數以取得擴展的檔案狀態資訊
 * Provides statExtra function to get extended file status information
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.statExtra = statExtra;
const promises_1 = require("fs/promises");
const options_1 = require("./options");
const path_1 = require("path");
/**
 * 取得擴展檔案狀態
 * Get extended file status
 *
 * 解析檔案路徑並取得包含 MIME 類型、權限等額外資訊的狀態物件
 * Resolves file path and returns status object with additional info like MIME type, permissions
 *
 * @param {string} pathname - 檔案路徑 / File path
 * @param {IOptions} [options] - 選項 / Options
 * @returns {Promise<IStatsExtra>} 擴展狀態物件 / Extended status object
 */
function statExtra(pathname, options) {
    // 解析為絕對路徑 / Resolve to absolute path
    const resolvedpath = (0, path_1.resolve)(pathname);
    // 解析路徑組件 / Parse path components
    const parsedPath = (0, path_1.parse)(resolvedpath);
    return (0, promises_1.stat)(resolvedpath)
        // @ts-ignore
        .then((statData) => {
        // 儲存解析後的路徑 / Store parsed path
        statData.parsed = parsedPath;
        // 執行所有選項解析器 / Execute all option resolvers
        return Promise
            .all((0, options_1.getOptionResolvers)(options).map(fn => fn(parsedPath, statData)))
            .then(() => {
            return statData;
        });
    });
}
/**
 * 預設導出 - statExtra 函數
 * Default export - statExtra function
 */
exports.default = statExtra;
//# sourceMappingURL=index.js.map