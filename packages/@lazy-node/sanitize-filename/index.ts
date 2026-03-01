/**
 * @lazy-node/sanitize-filename - 檔案名稱安全化模組
 * 
 * 這個模組提供了將字串轉換為安全檔案名稱的功能，移除或替換不安全的字元，
 * 支援多種選項來自訂處理方式。
 * 
 * @module @lazy-node/sanitize-filename
 * @author bluelovers
 */

import { Options } from 'filenamify/filenamify';
import _ify from 'filenamify';
import {
	nbspToSpace,
	removeBom,
	removeZeroWidth,
	trimWithZeroWidth,
} from 'zero-width';
import hasWindowsUnsafeName, {
	newRegExpWindowsUnsafeName,
	replaceWindowsUnsafeName,
} from '@lazy-node/windows-unsafe-filename';

/**
 * 檔案名稱安全化選項介面
 * 
 * @description 擴展 filenamify 的選項，添加額外的處理選項
 * @interface IOptions
 * @extends {Options}
 */
export interface IOptions extends Options
{
	/** 是否移除點檔案（以點開頭的檔案） */
	removeDotFile?: boolean;
	/** 是否將特殊字元替換為全形字元 */
	replaceToFullWidth?: boolean;
	/** 是否進行完整修剪（移除前後底線、連字號、加號） */
	trim?: boolean;
	/** 是否跳過空格修剪 */
	noTrimSpace?: boolean;
	/** 當結果為空時是否拋出錯誤 */
	throwEmpty?: boolean;
}

/**
 * 將字串轉換為安全的檔案名稱
 * 
 * @description 移除或替換不安全的字元，確保檔案名稱在各種作業系統上都能正常使用
 * @param {string} name 要處理的原始字串
 * @param {IOptions} [options] 處理選項
 * @returns {string} 安全的檔案名稱
 * @example
 * ```typescript
 * const safeName = sanitizeFilename('my file?.txt');
 * console.log(safeName); // 'my file!.txt'
 * ```
 */
export function sanitizeFilename(name: string, options?: IOptions)
{
	const old = name;

	// 合併預設選項
	options = {
		...(options || null),
	};
	(options as any).replacement ??= '!'

	// 移除零寬字元
	name = removeZeroWidth(name, true);
	// 移除 BOM 標記
	name = removeBom(name, true);
	// 將不換行空格轉換為普通空格
	name = nbspToSpace(name);
	// 修剪包含零寬字元的空白
	name = trimWithZeroWidth(name);

	// 移除換行符號
	name = name
		.replace(/[\r\n]/g, '')
	;

	let dot = '';

	// 處理點檔案
	if (!options.removeDotFile)
	{
		dot = name.match(/^(\.)(?=\w)/i)?.[1] ?? ''
	}

	// 替換為全形字元
	if (options.replaceToFullWidth)
	{
		name = replaceToFullWidth(name);
	}

	let bool: boolean;

	// 處理 Windows 不安全名稱
	name = replaceWindowsUnsafeName(name, ($0, $1, $2) => {
		bool = true;
		return '~!' + ($2 ?? '')
	}, true);

	// 使用 filenamify 處理
	name = _ify(name, options);

	// 處理替換後的前綴
	if (bool === true)
	{
		name = name.replace(/^~!?(?:(?=\.)|$)/, options.replacement)
	}

	// 修剪處理
	if (options.trim)
	{
		name = trimFilename(name);
	}
	else if (!options.noTrimSpace)
	{
		name = trimSpace(name);
	}

	// 再次處理 Windows 不安全名稱
	name = replaceWindowsUnsafeName(name, ($0, $1, $2) => options.replacement + ($2 ?? ''), true);

	// 處理空結果
	if (name.length === 0 || old.length === 0)
	{
		if (options.throwEmpty)
		{
			throw new RangeError(`Invalid filename: {'${old}' => '${name}'} length ${old.length} => ${name.length}`)
		}
		else if (old.length !== 0)
		{
			name = options.replacement;
		}
	}

	return dot + name
}

/**
 * 將特殊字元替換為全形字元
 * 
 * @description 將常見的特殊字元轉換為對應的全形字元，使檔案名稱更美觀
 * @param {string} name 要處理的字串
 * @returns {string} 替換後的字串
 * @example
 * ```typescript
 * const fullWidth = replaceToFullWidth('file?name*');
 * console.log(fullWidth); // 'file？name＊'
 * ```
 */
export function replaceToFullWidth(name: string)
{
	return name
		.replace(/\//g, '／')
		.replace(/\\/g, '＼')
		.replace(/\?/g, '？')
		.replace(/\*/g, '＊')
		.replace(/>/g, '＞')
		.replace(/</g, '＜')
}

/**
 * 修剪空格
 * 
 * @description 移除字串前後的空格和特殊空白字元
 * @param {string} name 要處理的字串
 * @returns {string} 修剪後的字串
 */
export function trimSpace(name: string)
{
	name = name
		.replace(/^[　\s\xA0]+/g, '')
		.replace(/[　\s\xA0]+$/g, '')
	;

	return name
}

/**
 * 修剪檔案名稱
 * 
 * @description 移除字串前後的空格、底線、連字號和加號
 * @param {string} name 要處理的字串
 * @returns {string} 修剪後的字串
 */
export function trimFilename(name: string)
{
	name = trimSpace(name)
		.replace(/^[_\-+]+/g, '')
		.replace(/[_\-+]+$/g, '')
	;

	return name
}

/**
 * 預設匯出：檔案名稱安全化函數
 * 
 * @description 這是最主要的函數，提供完整的檔案名稱安全化功能
 * @type {typeof sanitizeFilename}
 */
export default sanitizeFilename
