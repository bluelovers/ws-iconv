/**
 * path-dir-normalize - 目錄路徑規範化工具
 *
 * 這個模組提供了目錄路徑的規範化功能，確保目錄路徑以正確的分隔符結尾。
 *
 * @module path-dir-normalize
 * @author bluelovers
 */
/**
 * 路徑庫類型
 *
 * @interface IPathLibLike
 */
export interface IPathLibLike {
    /** 規範化函數 */
    normalize?(path: string): string;
    /** 分隔符 */
    sep?: string;
}
/**
 * 目錄路徑規範化
 *
 * 這個函數會規範化目錄路徑，確保其以正確的分隔符結尾。
 *
 * @param {string} dir 要規範化的目錄路徑
 * @param {IPathLibLike} [pathLib] 路徑庫選項
 * @returns {string} 規範化後的目錄路徑
 */
export declare function pathDirNormalize(dir: string, pathLib?: IPathLibLike): string;
/**
 * 創建目錄路徑規範化函數
 *
 * 這個函數會創建一個自定義的目錄路徑規範化函數，支援自定義的路徑庫。
 *
 * @param {{ normalize(path: string): string, sep: string }} defaultPathLib 預設路徑庫
 * @returns {function(string, IPathLibLike): string} 自定義的規範化函數
 */
export declare function createPathDirNormalize(defaultPathLib: {
    normalize(path: string): string;
    sep: string;
}): (dir: string, pathLib?: IPathLibLike) => string;
/** 預設導出 - pathDirNormalize 函數 */
export default pathDirNormalize;
