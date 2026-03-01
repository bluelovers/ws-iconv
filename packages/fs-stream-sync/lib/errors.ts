/**
 * 檔案系統流錯誤處理
 * File System Stream Error Handling
 *
 * 定義錯誤類型和錯誤碼列舉
 * Defines error classes and error code enums
 */

import ErrnoException = NodeJS.ErrnoException;

/**
 * Node.js 風格錯誤類別
 * Node.js style error class
 *
 * 擴展 Error 類別，加入錯誤碼屬性
 * Extends Error class with code property
 */
export class NodeLikeError extends Error
{
	/**
	 * 錯誤碼 / Error code
	 */
	public code: string

	/**
	 * 構造函數
	 * Constructor
	 *
	 * @param {string} code - 錯誤碼 / Error code
	 * @param {string} [msg] - 錯誤訊息 / Error message
	 */
	constructor(code: string, msg?)
	{
		super(msg)
		this.code = code
	}
}

/**
 * 建立錯誤物件
 * Create error object
 *
 * 使用指定的錯誤類別和錯誤碼建立錯誤物件
 * Creates error object with specified error class and code
 *
 * @param {new (msg?) => T} Err - 錯誤類別 / Error class
 * @param {string} code - 錯誤碼 / Error code
 * @param {string} [msg] - 錯誤訊息 / Error message
 * @returns {T} 錯誤物件 / Error object
 */
export function createError<T extends ErrnoException>(Err: new (msg?) => T, code: string, msg?)
{
	let e = new Err(msg)
	e.code = code
	return e
}

/**
 * 檔案流錯誤碼列舉
 * File stream error code enum
 */
export enum EnumFsStreamErrorCode
{
	/**
	 * 寫入在結束後嘗試 / Write after end
	 */
	ERR_STREAM_WRITE_AFTER_END = 'ERR_STREAM_WRITE_AFTER_END',
	/**
	 * 流已銷毀 / Stream destroyed
	 */
	ERR_STREAM_DESTROYED = 'ERR_STREAM_DESTROYED',
}

