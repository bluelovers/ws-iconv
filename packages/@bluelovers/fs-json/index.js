"use strict";
/**
 * Enhanced JSON File Operations Module
 * 增強型 JSON 檔案操作模組
 *
 * 提供增強的 JSON 檔案讀寫功能，支援結尾換行符號（finalEOL）
 * Provides enhanced JSON file read/write operations with final EOL support
 *
 * @module @bluelovers/fs-json
 * @author bluelovers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJSONSync = exports.readJSON = void 0;
exports._handleWriteOptions = _handleWriteOptions;
exports.outputJSON = outputJSON;
exports.outputJSONSync = outputJSONSync;
exports.writeJSON = writeJSON;
exports.writeJSONSync = writeJSONSync;
exports.stringifyJSON = stringifyJSON;
exports.parseJSON = parseJSON;
const fs_extra_1 = require("fs-extra");
Object.defineProperty(exports, "readJSON", { enumerable: true, get: function () { return fs_extra_1.readJSON; } });
Object.defineProperty(exports, "readJSONSync", { enumerable: true, get: function () { return fs_extra_1.readJSONSync; } });
const utils_1 = require("jsonfile/utils");
/**
 * 處理寫入選項
 * Handle write options
 *
 * 確保選項物件存在並設定 finalEOL 預設值為 true
 * Ensures options object exists and sets finalEOL default to true
 *
 * @param {IWriteOptions} [options] - 寫入選項 / Write options
 * @returns {IWriteOptions} - 處理後的選項 / Processed options
 * @private
 */
function _handleWriteOptions(options) {
    var _a;
    options !== null && options !== void 0 ? options : (options = {});
    (_a = options.finalEOL) !== null && _a !== void 0 ? _a : (options.finalEOL = true);
    return options;
}
/**
 * 輸出 JSON 檔案（異步）
 * Output JSON file (async)
 *
 * 寫入 JSON 檔案，如果目錄不存在則自動創建
 * Writes JSON file, creates directory if it doesn't exist
 *
 * @param {string} file - 檔案路徑 / File path
 * @param {any} data - 要寫入的資料 / Data to write
 * @param {IWriteOptions} [options] - 寫入選項 / Write options
 * @returns {Promise<void>} - Promise / Promise
 *
 * @example
 * ```typescript
 * await outputJSON('config.json', { key: 'value' });
 * ```
 */
function outputJSON(file, data, options) {
    options = _handleWriteOptions(options);
    return (0, fs_extra_1.outputJSON)(file, data, options);
}
/**
 * 輸出 JSON 檔案（同步）
 * Output JSON file (sync)
 *
 * 同步寫入 JSON 檔案，如果目錄不存在則自動創建
 * Synchronously writes JSON file, creates directory if it doesn't exist
 *
 * @param {string} file - 檔案路徑 / File path
 * @param {any} data - 要寫入的資料 / Data to write
 * @param {IWriteOptions} [options] - 寫入選項 / Write options
 * @returns {void}
 *
 * @example
 * ```typescript
 * outputJSONSync('config.json', { key: 'value' });
 * ```
 */
function outputJSONSync(file, data, options) {
    options = _handleWriteOptions(options);
    return (0, fs_extra_1.outputJSONSync)(file, data, options);
}
/**
 * 寫入 JSON 檔案（異步）
 * Write JSON file (async)
 *
 * 異步寫入 JSON 檔案
 * Writes JSON file asynchronously
 *
 * @param {string} file - 檔案路徑 / File path
 * @param {any} data - 要寫入的資料 / Data to write
 * @param {IWriteOptions} [options] - 寫入選項 / Write options
 * @returns {Promise<void>} - Promise / Promise
 *
 * @example
 * ```typescript
 * await writeJSON('data.json', { users: [] });
 * ```
 */
function writeJSON(file, data, options) {
    options = _handleWriteOptions(options);
    return (0, fs_extra_1.writeJSON)(file, data, options);
}
/**
 * 寫入 JSON 檔案（同步）
 * Write JSON file (sync)
 *
 * 同步寫入 JSON 檔案
 * Writes JSON file synchronously
 *
 * @param {string} file - 檔案路徑 / File path
 * @param {any} data - 要寫入的資料 / Data to write
 * @param {IWriteOptions} [options] - 寫入選項 / Write options
 * @returns {void}
 *
 * @example
 * ```typescript
 * writeJSONSync('data.json', { users: [] });
 * ```
 */
function writeJSONSync(file, data, options) {
    options = _handleWriteOptions(options);
    return (0, fs_extra_1.writeJSONSync)(file, data, options);
}
/**
 * 將資料字串化為 JSON
 * Stringify data to JSON
 *
 * 將 JavaScript 資料轉換為 JSON 字串，支援結尾換行選項
 * Converts JavaScript data to JSON string with final EOL support
 *
 * @param {any} data - 要字串化的資料 / Data to stringify
 * @param {IWriteOptions} [options] - 字串化選項 / Stringify options
 * @returns {string} - JSON 字串 / JSON string
 *
 * @example
 * ```typescript
 * const json = stringifyJSON({ key: 'value' });
 * console.log(json); // '{"key":"value"}\n'
 * ```
 */
function stringifyJSON(data, options) {
    options = _handleWriteOptions(options);
    return (0, utils_1.stringify)(data, options);
}
/**
 * 解析 JSON 字串
 * Parse JSON string
 *
 * 從字串或 Uint8Array 解析 JSON 資料
 * Parses JSON data from string or Uint8Array
 *
 * @param {string | Uint8Array} stringOrUint8Array - JSON 字串或 Uint8Array / JSON string or Uint8Array
 * @param {Function} [reviver] - 轉換函數 / Reviver function
 * @returns {any} - 解析後的資料 / Parsed data
 *
 * @example
 * ```typescript
 * const obj = parseJSON('{"key":"value"}');
 * const obj2 = parseJSON(new Uint8Array([123, 34, 107, 101, 121, 34, 58, 34, 118, 97, 108, 117, 101, 34, 125]));
 * ```
 */
function parseJSON(stringOrUint8Array, reviver) {
    return JSON.parse(stringOrUint8Array.toString(), reviver);
}
//# sourceMappingURL=index.js.map