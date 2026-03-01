/**
 * path-dir-normalize - 目錄路徑規範化工具
 * 
 * 這個模組提供了目錄路徑的規範化功能，確保目錄路徑以正確的分隔符結尾。
 * 
 * @module path-dir-normalize
 * @author bluelovers
 */

import { normalize as _normalize, sep as _sep } from 'upath2';
import { pathStripSep as _strip_sep } from 'path-strip-sep';

/**
 * 路徑庫類型
 * 
 * @interface IPathLibLike
 */
export interface IPathLibLike
{
	/** 規範化函數 */
	normalize?(path: string): string,

	/** 分隔符 */
	sep?: string,
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
export function pathDirNormalize(dir: string, pathLib?: IPathLibLike): string
{
	// 設置預設路徑庫
	pathLib = pathLib ?? {};

	// 獲取分隔符
	let sep = (pathLib.sep ?? _sep);

	// 規範化路徑並移除尾部分隔符
	let ret = _strip_sep((pathLib.normalize ?? _normalize)(dir));

	// 添加正確的分隔符
	return ret + sep
}

/**
 * 創建目錄路徑規範化函數
 * 
 * 這個函數會創建一個自定義的目錄路徑規範化函數，支援自定義的路徑庫。
 * 
 * @param {{ normalize(path: string): string, sep: string }} defaultPathLib 預設路徑庫
 * @returns {function(string, IPathLibLike): string} 自定義的規範化函數
 */
export function createPathDirNormalize(defaultPathLib: {
	normalize(path: string): string,
	sep: string,
})
{
	// 檢查參數有效性
	if (typeof defaultPathLib.normalize !== 'function')
	{
		throw new TypeError(`normalize must be function`)
	}

	if (typeof defaultPathLib.sep !== 'string' || !defaultPathLib.sep.length)
	{
		throw new TypeError(`sep must be not empty string`)
	}

	// 返回自定義的規範化函數
	return function pathDirNormalize(dir: string, pathLib?: IPathLibLike): string
	{
		// 設置預設路徑庫
		pathLib = pathLib ?? {};

		// 規範化路徑並添加分隔符
		return (pathLib.normalize ?? defaultPathLib.normalize)(dir + (pathLib.sep ?? defaultPathLib.sep))
	}
}

/** 預設導出 - pathDirNormalize 函數 */
export default pathDirNormalize

