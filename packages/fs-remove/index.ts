/**
 * fs-remove-extra - 檔案和目錄刪除工具
 * 
 * 這個模組提供了刪除檔案和目錄的功能，支援同步和異步操作，並可以根據選項過濾刪除的目標。
 * 
 * @module fs-remove-extra
 * @author bluelovers
 */

import { remove, removeSync } from 'fs-extra';
import { fsStatExists, fsStatExistsSync, IOptionsWithOnlyDirectoryOrFile } from 'fs-stat';

/**
 * 刪除檔案或目錄（異步）
 * 
 * 這個函數會刪除指定的檔案或目錄，如果目錄包含內容也會一併刪除。如果路徑不存在，則靜默不做任何操作。
 * 
 * @param {string} dirOrFile 要刪除的檔案或目錄路徑
 * @param {IOptionsWithOnlyDirectoryOrFile} [options] 選項
 * @param {boolean} [options.onlyFiles] 只刪除檔案
 * @param {boolean} [options.onlyDirectories] 只刪除目錄
 * @returns {Promise<boolean>} Promise，解析為是否成功刪除
 */
export async function fsRemove(dirOrFile: string, options?: IOptionsWithOnlyDirectoryOrFile)
{
	// 如果有選項，先檢查目標是否存在
	if (options)
	{
		if (!await fsStatExists(dirOrFile, options))
		{
			return false
		}
	}

	// 使用 fs-extra 的 remove 函數刪除目標
	return remove(dirOrFile)
}

/**
 * 刪除檔案或目錄（同步）
 * 
 * 這個函數會同步刪除指定的檔案或目錄，如果目錄包含內容也會一併刪除。如果路徑不存在，則靜默不做任何操作。
 * 
 * @param {string} dirOrFile 要刪除的檔案或目錄路徑
 * @param {IOptionsWithOnlyDirectoryOrFile} [options] 選項
 * @param {boolean} [options.onlyFiles] 只刪除檔案
 * @param {boolean} [options.onlyDirectories] 只刪除目錄
 * @returns {boolean} 是否成功刪除
 */
export function fsRemoveSync(dirOrFile: string, options?: IOptionsWithOnlyDirectoryOrFile)
{
	// 如果有選項，先檢查目標是否存在
	if (options)
	{
		if (!fsStatExistsSync(dirOrFile, options))
		{
			return false
		}
	}

	// 使用 fs-extra 的 removeSync 函數同步刪除目標
	return removeSync(dirOrFile)
}

/**
 * 刪除檔案（異步）
 * 
 * 這個函數會刪除指定的檔案，如果路徑不存在或不是檔案則不做任何操作。
 * 
 * @param {string} dirOrFile 要刪除的檔案路徑
 * @returns {Promise<boolean>} Promise，解析為是否成功刪除
 */
export function fsRemoveFile(dirOrFile: string)
{
	return fsRemove(dirOrFile, {
		onlyFiles: true,
	})
}

/**
 * 刪除檔案（同步）
 * 
 * 這個函數會同步刪除指定的檔案，如果路徑不存在或不是檔案則不做任何操作。
 * 
 * @param {string} dirOrFile 要刪除的檔案路徑
 * @returns {boolean} 是否成功刪除
 */
export function fsRemoveFileSync(dirOrFile: string)
{
	return fsRemoveSync(dirOrFile, {
		onlyFiles: true,
	})
}

/**
 * 刪除目錄（異步）
 * 
 * 這個函數會刪除指定的目錄，如果路徑不存在或不是目錄則不做任何操作。
 * 
 * @param {string} dirOrFile 要刪除的目錄路徑
 * @returns {Promise<boolean>} Promise，解析為是否成功刪除
 */
export function fsRemoveDirectories(dirOrFile: string)
{
	return fsRemove(dirOrFile, {
		onlyDirectories: true,
	})
}

/**
 * 刪除目錄（同步）
 * 
 * 這個函數會同步刪除指定的目錄，如果路徑不存在或不是目錄則不做任何操作。
 * 
 * @param {string} dirOrFile 要刪除的目錄路徑
 * @returns {boolean} 是否成功刪除
 */
export function fsRemoveDirectoriesSync(dirOrFile: string)
{
	return fsRemoveSync(dirOrFile, {
		onlyDirectories: true,
	})
}

/** 預設導出 - 刪除檔案或目錄（異步）函數 */
export default fsRemove

