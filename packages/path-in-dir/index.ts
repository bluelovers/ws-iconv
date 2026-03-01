/**
 * path-in-dir - 檢查路徑是否在目錄內
 * 
 * 這個模組提供了檢查一個路徑是否位於指定目錄內的功能。
 * 
 * @module path-in-dir
 * @author bluelovers
 */

import { pathDirNormalize } from 'path-dir-normalize';
import { normalize } from 'upath2';

/**
 * 檢查路徑是否在目錄內
 * 
 * 這個函數會檢查輸入的路徑是否位於指定的目錄內。
 * 
 * @param {string} input 要檢查的路徑
 * @param {string} dir 目錄路徑
 * @returns {boolean} 如果路徑在目錄內則返回 true，否則返回 false
 */
export function pathInsideDirectory(input: string, dir: string)
{
	// 規範化目錄路徑
	dir = pathDirNormalize(dir);

	// 規範化輸入路徑
	input = normalize(input);

	// 檢查輸入路徑是否以目錄路徑開頭
	return input.startsWith(dir)
}

/** 預設導出 - pathInsideDirectory 函數 */
export default pathInsideDirectory

