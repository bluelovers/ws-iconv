/**
 * 寫入流實作
 * Write Stream Implementation
 *
 * 提供非同步檔案寫入流功能，擴展 Node.js fs.WriteStream
 * Provides asynchronous file writing stream functionality, extends Node.js fs.WriteStream
 *
 * @module fs-stream-sync/write
 */

import fs from "fs";
import { PathLike } from 'fs';
import { IFsPath, IFsStreamData, IFsStreamState, IFsWriteStreamOptions } from './lib/interface';
import { getFsStreamData, SYM_FS_STREAM_DATA } from './lib/internal';

/**
 * 寫入流類別
 * Write Stream Class
 *
 * 擴展 Node.js fs.WriteStream，提供額外功能
 * Extends Node.js fs.WriteStream with additional functionality
 */
// @ts-ignore
export class WriteStream extends fs.WriteStream
{
	/**
	 * 自動關閉標誌 / Auto close flag
	 */
	protected autoClose: boolean
	/**
	 * 檔案開啟標誌 / File open flags
	 */
	protected flags: string
	/**
	 * 檔案描述符 / File descriptor
	 */
	fd: number
	/**
	 * 檔案權限模式 / File permission mode
	 */
	protected mode: number
	/**
	 * 當前位置 / Current position
	 */
	protected pos: number
	/**
	 * 是否已關閉 / Whether closed
	 */
	protected closed: boolean
	/**
	 * 是否已銷毀 / Whether destroyed
	 */
	protected destroyed: boolean

	/**
	 * 可寫狀態 / Writable state
	 */
	protected _writableState: IFsStreamState
	/**
	 * 可讀狀態 / Readable state
	 */
	protected _readableState: IFsStreamState

	/**
	 * 流資料符號屬性 / Stream data symbol property
	 */
	protected [SYM_FS_STREAM_DATA]: IFsStreamData

	/**
	 * 已寫入的位元組數（不包含佇列中的資料）
	 * Number of bytes written so far (excludes queued data)
	 */
	public bytesWritten: number

	/**
	 * 檔案路徑（字串或 Buffer）
	 * File path (string or Buffer)
	 */
	public readonly path: IFsPath

	/**
	 * 構造函數
	 * Constructor
	 *
	 * @param {PathLike} path - 檔案路徑 / File path
	 * @param {string | IFsWriteStreamOptions} [options] - 選項 / Options
	 */
	constructor(path: PathLike, options?: string | IFsWriteStreamOptions)
	{
		// @ts-ignore
		super(path, options)

		// 初始化流資料 / Initialize stream data
		getFsStreamData(this)
	}

	/**
	 * 建立函數別名
	 * Factory method alias
	 */
	static get create()
	{
		return createWriteStream
	}

	/**
	 * 開啟檔案流
	 * Open file stream
	 *
	 * 開啟檔案並發送 open 和 ready 事件
	 * Opens file and emits open and ready events
	 */
	open()
	{
		if (!getFsStreamData(this).opened)
		{
			const self = this

			this[SYM_FS_STREAM_DATA].opened = true

			// 監聽 open 事件並發送 ready 事件
			// Listen for open event and emit ready event
			this.once('open', function ()
			{
				process.nextTick(function ()
				{
					self.emit('ready')
				})
			})
			// @ts-ignore
			fs.WriteStream.prototype.open.call(this)
		}
	}

}

/**
 * 建立寫入流
 * Create write stream
 *
 * 工廠函數，建立 WriteStream 實例
 * Factory function that creates a WriteStream instance
 *
 * @param {PathLike} path - 檔案路徑 / File path
 * @param {string | IFsWriteStreamOptions} [options] - 選項 / Options
 * @returns {WriteStream} 寫入流實例 / Write stream instance
 */
export function createWriteStream(path: PathLike, options?: string | IFsWriteStreamOptions)
{
	return new WriteStream(path, options)
}

/**
 * 預設導出 - WriteStream 類別
 * Default export - WriteStream class
 */
export default WriteStream
