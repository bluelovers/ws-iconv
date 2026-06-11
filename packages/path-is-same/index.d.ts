/**
 * path-is-same - 路徑比較工具
 *
 * 這個模組提供了多種路徑比較功能，可以檢查多個路徑是否指向相同的檔案或目錄。
 *
 * @module path-is-same
 * @author bluelovers
 */
/**
 * 檢查兩個路徑是否相同
 *
 * 這個函數使用相對路徑比較來檢查兩個路徑是否指向相同的檔案或目錄。
 *
 * @param {string} p1 第一個路徑
 * @param {string} p2 第二個路徑
 * @returns {boolean} 如果路徑相同則返回 true，否則返回 false
 */
export declare function _pathIsSame(p1: string, p2: string): boolean;
/**
 * 檢查輸入參數是否有效
 *
 * 這個函數會檢查是否提供了足夠的路徑參數，如果沒有則拋出錯誤。
 *
 * @param {string} p1 第一個路徑
 * @param {...string[]} ps 其他路徑
 * @throws {TypeError} 如果沒有提供足夠的路徑參數
 */
export declare function _assertInputArgv(p1: string, ...ps: string[]): void;
/**
 * 檢查多個路徑是否指向相同的實體檔案
 *
 * 這個函數會解析所有路徑的實體路徑，然後檢查它們是否指向相同的檔案或目錄。
 *
 * @param {string} p1 第一個路徑
 * @param {string} p2 第二個路徑
 * @param {...string[]} ps 其他路徑
 * @returns {boolean} 如果所有路徑指向相同的實體檔案則返回 true，否則返回 false
 */
export declare function fsSameRealpath(p1: string, p2: string, ...ps: string[]): boolean;
/**
 * 檢查多個路徑是否相同
 *
 * 這個函數會檢查多個路徑是否指向相同的檔案或目錄，使用相對路徑比較。
 *
 * @param {string} p1 第一個路徑
 * @param {string} p2 第二個路徑
 * @param {...string[]} ps 其他路徑
 * @returns {boolean} 如果所有路徑相同則返回 true，否則返回 false
 */
export declare function pathIsSame(p1: string, p2: string, ...ps: string[]): boolean;
/** 預設導出 - pathIsSame 函數 */
export default pathIsSame;
