/**
 * fs-symlink-extra - 符號連結和硬連結工具
 * 
 * 這個模組提供了符號連結和硬連結的創建和管理功能，支援同步和異步操作，並包含覆蓋處理。
 * 
 * @module fs-symlink-extra
 * @author bluelovers
 */

import {
	ensureLink,
	ensureLinkSync,
	ensureSymlink,
	ensureSymlinkSync,
	SymlinkType,
	unlink,
	unlinkSync,
} from 'fs-extra';
import { fsStat, fsStatSync, IOptions as IStatOptions, isSameStat } from 'fs-stat';
import { ITSResolvable } from 'ts-type';
import { fsSameRealpath } from 'path-is-same';

/**
 * 符號連結和硬連結選項
 * 
 * @interface IOptions
 */
export interface IOptions
{
	/** 是否覆蓋現有檔案 */
	overwrite?: boolean,

	/**
	 * 僅適用於符號連結
	 * @alias type
	 */
	type?: SymlinkType,
}

/**
 * 處理覆蓋邏輯
 * 
 * 這個函數會處理覆蓋現有檔案的邏輯，包括檢查是否需要覆蓋、刪除現有檔案等。
 * 
 * @param {string} src 來源路徑
 * @param {string} dest 目標路徑
 * @param {IOptions} options 選項
 * @param {boolean} async 是否異步
 * @returns {ITSResolvable<boolean>} 是否成功處理覆蓋
 */
export function _handleOverwrite(src: string, dest: string, options: IOptions, async: true): Promise<boolean>
export function _handleOverwrite(src: string, dest: string, options: IOptions, async: false): boolean
export function _handleOverwrite(src: string, dest: string, options: IOptions, async: boolean): ITSResolvable<boolean>
export function _handleOverwrite(src: string, dest: string, options: IOptions, async: boolean): ITSResolvable<boolean>
{
	// 設置統計選項
	const opts: IStatOptions = {
		followSymlinks: true,
		throwIfNoEntry: false,
	};

	if (async)
	{
		return Promise.resolve()
			.then(async () =>
			{

				// 如果不允許覆蓋，則返回 null
				if (!options?.overwrite)
				{
					return null as null
				}
				// 如果來源和目標是相同的實體路徑，則返回 false
				else if (fsSameRealpath(src, dest))
				{
					return false
				}

				// 獲取來源和目標的統計資訊
				let s1 = await fsStat(src, opts);
				let s2 = await fsStat(dest, opts) ?? await fsStat(dest, {
					...opts,
					followSymlinks: false,
				});

				// 如果兩個檔案都存在且不是相同的實體，則刪除目標檔案
				if (s1 && s2 && !isSameStat(s1, s2))
				{
					await unlink(dest)
					return true
				}

				return false
			})
	}
	else
	{
		// 如果不允許覆蓋，則返回 null
		if (!options?.overwrite)
		{
			return null as null
		}
		// 如果來源和目標是相同的實體路徑，則返回 false
		else if (fsSameRealpath(src, dest))
		{
			return false
		}

		// 獲取來源和目標的統計資訊
		let s1 = fsStatSync(src, opts);
		let s2 = fsStatSync(dest, opts) ?? fsStatSync(dest, {
			...opts,
			followSymlinks: false,
		});

		// 如果兩個檔案都存在且不是相同的實體，則刪除目標檔案
		if (s1 && s2 && !isSameStat(s1, s2))
		{
			unlinkSync(dest)
			return true
		}

		return false
	}
}

/**
 * 創建符號連結（異步）
 * 
 * 這個函數會創建符號連結，支援覆蓋現有檔案。
 * 
 * @param {string} src 來源路徑
 * @param {string} dest 目標路徑
 * @param {IOptions} [options] 選項
 * @returns {Promise<void>} Promise
 */
export async function fsSymlink(src: string, dest: string, options?: IOptions)
{
	// 處理覆蓋邏輯
	await _handleOverwrite(src, dest, options, true);

	// 創建符號連結
	return ensureSymlink(src, dest, options?.type);
}

/**
 * 創建符號連結（同步）
 * 
 * 這個函數會同步創建符號連結，支援覆蓋現有檔案。
 * 
 * @param {string} src 來源路徑
 * @param {string} dest 目標路徑
 * @param {IOptions} [options] 選項
 * @returns {void}
 */
export function fsSymlinkSync(src: string, dest: string, options?: IOptions)
{
	// 處理覆蓋邏輯
	_handleOverwrite(src, dest, options, false);

	// 創建符號連結
	return ensureSymlinkSync(src, dest, options?.type);
}

/**
 * 創建硬連結（異步）
 * 
 * 這個函數會創建硬連結，支援覆蓋現有檔案。
 * 
 * @param {string} src 來源路徑
 * @param {string} dest 目標路徑
 * @param {IOptions} [options] 選項
 * @returns {Promise<void>} Promise
 */
export async function fsHardlink(src: string, dest: string, options?: IOptions)
{
	// 處理覆蓋邏輯
	await _handleOverwrite(src, dest, options, true);

	// 創建硬連結
	return ensureLink(src, dest)
}

/**
 * 創建硬連結（同步）
 * 
 * 這個函數會同步創建硬連結，支援覆蓋現有檔案。
 * 
 * @param {string} src 來源路徑
 * @param {string} dest 目標路徑
 * @param {IOptions} [options] 選項
 * @returns {void}
 */
export function fsHardlinkSync(src: string, dest: string, options?: IOptions)
{
	return ensureLinkSync(src, dest)
}

/** 預設導出 - 創建符號連結（同步）函數 */
export default fsSymlinkSync

