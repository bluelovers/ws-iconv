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

import {
	outputJSON as _outputJSON,
	outputJSONSync as _outputJSONSync,
	readJSON,
	readJSONSync,
	writeJSON as _writeJSON,
	writeJSONSync as _writeJSONSync,
	WriteOptions,
} from 'fs-extra';
import { stringify } from 'jsonfile/utils';
import { JFWriteOptions } from 'jsonfile';

/**
 * 擴充 fs-extra 的 WriteOptions 介面
 * Extend fs-extra WriteOptions interface
 */
declare module 'fs-extra'
{
	interface WriteOptions extends Exclude<JFWriteOptions, string | null>
	{
		/**
		 * 是否在 JSON 結尾添加換行符號
		 * Whether to add final newline to JSON
		 * @default true
		 */
		finalEOL?: boolean
	}
}

/**
 * 寫入選項類型
 * Write options type
 *
 * 結合 fs-extra 和 jsonfile 的寫入選項
 * Combines fs-extra and jsonfile write options
 */
export type IWriteOptions = WriteOptions & Exclude<JFWriteOptions, string | null>;

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
export function _handleWriteOptions(options?: IWriteOptions): IWriteOptions
{
	options ??= {};
	options.finalEOL ??= true;
	return options
}

/**
 * 從 fs-extra 導出的讀取函數
 * Read functions exported from fs-extra
 */
export {
	/**
	 * 異步讀取 JSON 檔案
	 * Read JSON file asynchronously
	 */
	readJSON,
	/**
	 * 同步讀取 JSON 檔案
	 * Read JSON file synchronously
	 */
	readJSONSync,
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
export function outputJSON(file: string, data: any, options?: IWriteOptions)
{
	options = _handleWriteOptions(options);
	return _outputJSON(file, data, options as any)
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
export function outputJSONSync(file: string, data: any, options?: IWriteOptions)
{
	options = _handleWriteOptions(options);
	return _outputJSONSync(file, data, options as any)
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
export function writeJSON(file: string, data: any, options?: IWriteOptions)
{
	options = _handleWriteOptions(options);
	return _writeJSON(file, data, options)
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
export function writeJSONSync(file: string, data: any, options?: IWriteOptions)
{
	options = _handleWriteOptions(options);
	return _writeJSONSync(file, data, options)
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
export function stringifyJSON(data: any, options?: IWriteOptions): string
{
	options = _handleWriteOptions(options);
	return stringify(data, options as any)
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
export function parseJSON(stringOrUint8Array: string | Uint8Array,
	reviver?: (this: any, key: string, value: any) => any,
): string
{
	return JSON.parse(stringOrUint8Array.toString(), reviver)
}
