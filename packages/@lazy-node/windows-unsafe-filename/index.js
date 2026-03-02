"use strict";
/**
 * @lazy-node/windows-unsafe-filename - Windows 不安全檔案名稱檢測模組
 *
 * 這個模組提供了檢測和處理 Windows 系統中不安全檔案名稱的功能。
 * Windows 系統有特定的保留字元和裝置名稱，不能用作檔案名稱。
 *
 * @module @lazy-node/windows-unsafe-filename
 * @author bluelovers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.newRegExpWindowsUnsafeName = newRegExpWindowsUnsafeName;
exports.hasWindowsUnsafeName = hasWindowsUnsafeName;
exports.replaceWindowsUnsafeName = replaceWindowsUnsafeName;
const windowsReservedRe = newRegExpWindowsUnsafeName();
const windowsReservedRe2 = newRegExpWindowsUnsafeName(true);
/**
 * 建立 Windows 不安全名稱的正規表示式
 *
 * @description 根據模式建立不同的正規表示式來檢測 Windows 保留名稱
 * @param {boolean} [mode] 是否使用擴展模式（支援 com00-lpt99）
 * @returns {RegExp} 檢測 Windows 不安全名稱的正規表示式
 * @example
 * ```typescript
 * const re = newRegExpWindowsUnsafeName();
 * console.log(re.test('con')); // true
 * console.log(re.test('com1')); // true
 * ```
 */
function newRegExpWindowsUnsafeName(mode) {
    if (mode) {
        // 擴展模式：支援 com00-lpt99
        return /^(con|prn|aux|nul|com\d{1,2}|lpt\d{1,2})(\..*)?$/i;
    }
    // 標準模式：只支援 com0-lpt9
    return /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
}
/**
 * 檢測字串是否包含 Windows 不安全名稱
 *
 * @description 檢查給定的字串是否匹配 Windows 保留的裝置名稱
 * @param {string} name 要檢測的字串
 * @param {boolean} [mode] 是否使用擴展模式
 * @returns {RegExpMatchArray | null} 匹配結果，null 表示安全
 * @example
 * ```typescript
 * const result = hasWindowsUnsafeName('con.txt');
 * console.log(result); // 匹配結果陣列
 *
 * const safeResult = hasWindowsUnsafeName('normal.txt');
 * console.log(safeResult); // null
 * ```
 */
function hasWindowsUnsafeName(name, mode) {
    return name.match(mode ? windowsReservedRe2 : windowsReservedRe);
}
/**
 * 替換 Windows 不安全名稱
 *
 * @description 將 Windows 不安全名稱替換為指定的字串或使用回呼函數處理
 * @param {string} name 要處理的字串
 * @param {string | ((substring: string, ...args: (string | undefined)[]) => string)} replaceValue 替換值或回呼函數
 * @param {boolean} [mode] 是否使用擴展模式
 * @returns {string} 處理後的字串
 * @example
 * ```typescript
 * const result1 = replaceWindowsUnsafeName('con.txt', 'safe_name');
 * console.log(result1); // 'safe_name.txt'
 *
 * const result2 = replaceWindowsUnsafeName('com1.txt', (match, name, ext) => `_${name}_${ext}`);
 * console.log(result2); // '_com1_.txt'
 * ```
 */
function replaceWindowsUnsafeName(name, replaceValue, mode) {
    return name.replace(mode ? windowsReservedRe2 : windowsReservedRe, replaceValue);
}
/**
 * 預設匯出：Windows 不安全名稱檢測函數
 *
 * @description 這是最常用的函數，提供基本的 Windows 不安全名稱檢測功能
 * @type {typeof hasWindowsUnsafeName}
 */
exports.default = hasWindowsUnsafeName;
//# sourceMappingURL=index.js.map