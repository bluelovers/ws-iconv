/**
 * 同步寫入流實作
 * Synchronous Write Stream Implementation
 *
 * 提供同步檔案寫入流功能
 * Provides synchronous file writing stream functionality
 *
 * @module fs-stream-sync/write-sync
 */

'use strict';

import fs from "fs";
import { PathLike } from "fs";
import { EnumFsStreamErrorCode, NodeLikeError } from './lib/errors';
import {
	IFsStream,
	IFsStreamState,
	IFsStreamOptions,
	IFsWriteStreamOptions,
	IFsStreamData,
	IFsPath,
} from './lib/interface';
import { getFsStreamData, SYM_FS_STREAM_DATA } from './lib/internal';
import internal from "./lib/internal";
import { WriteStream } from './write'

/**
 * 同步寫入流類別
 * Synchronous Write Stream Class
 *
 * 提供同步檔案寫入功能，繼承自 WriteStream
 * Provides synchronous file writing functionality, extends WriteStream
 */
export class SyncWriteStream extends WriteStream
{
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
	}

	/**
	 * 建立函數別名
	 * Factory method alias
	 */
	static get create()
	{
		return createSyncWriteStream
	}

	/**
	 * 開啟檔案流
	 * Open file stream
	 *
	 * 同步開啟檔案並發送 open 和 ready 事件
	 * Opens file synchronously and emits open and ready events
	 */
	open(): void
	{
		if (typeof getFsStreamData(this) !== 'boolean')
		{
			this[SYM_FS_STREAM_DATA].opened = true
			internal.open(this)
		}
		else if (this[SYM_FS_STREAM_DATA].opened === true)
		{
			this[SYM_FS_STREAM_DATA].opened = false
			this.emit('open', this.fd);
			this.emit('ready');
		}
	}

	/**
	 * 寫入資料
	 * Write data
	 *
	 * 將資料寫入流，檢查流狀態後呼叫父類方法
	 * Writes data to stream, checks stream state before calling parent method
	 *
	 * @param {any} chunk - 要寫入的資料 / Data to write
	 * @param {(error: Error | null | undefined) => void} [cb] - 回調函數 / Callback function
	 * @returns {boolean} 寫入結果 / Write result
	 */
	write(chunk: any, cb?: (error: Error | null | undefined) => void): boolean;
	/**
	 * 寫入資料（帶編碼）
	 * Write data with encoding
	 *
	 * @param {any} chunk - 要寫入的資料 / Data to write
	 * @param {string} [encoding] - 編碼格式 / Encoding
	 * @param {(error: Error | null | undefined) => void} [cb] - 回調函數 / Callback function
	 * @returns {boolean} 寫入結果 / Write result
	 */
	write(chunk: any, encoding?: string, cb?: (error: Error | null | undefined) => void): boolean;
	write(chunk: any, ...argv)
	{
		/*
		if (this.closed)
		{
			throw new NodeLikeError(EnumFsStreamErrorCode.ERR_STREAM_WRITE_AFTER_END, `write after end`)
		}
		*/
		// 檢查流是否已銷毀 / Check if stream is destroyed
		if (this._writableState.destroyed)
		{
			throw new NodeLikeError(EnumFsStreamErrorCode.ERR_STREAM_DESTROYED, `Cannot call write after a stream was destroyed`)
		}

		//console.dir({chunk,argv} );

		return super.write(chunk, ...argv)
	}

	/**
	 * 內部寫入方法
	 * Internal write method
	 *
	 * 同步寫入資料到檔案
	 * Writes data to file synchronously
	 *
	 * @fixme 存在未知錯誤導致 stream.write 只能執行一次
	 * @fixme Unknown bug makes stream.write only run once
	 *
	 * @param {Buffer} chunk - 要寫入的緩衝區 / Buffer to write
	 * @param {string} encoding - 編碼格式（未使用）/ Encoding (unused)
	 * @param {Function} callback - 完成回調 / Completion callback
	 * @returns {boolean | this} 寫入結果 / Write result
	 */
	_write(chunk: Buffer, encoding: string, callback: Function)
	{
		let self = this

		//console.dir({chunk, encoding, callback} );

		// 驗證資料類型 / Validate data type
		if (!(chunk instanceof Buffer))
		{
			return this.emit('error', new Error('Invalid data'));
		}

		// 等待檔案開啟 / Wait for file to open
		if (typeof this.fd !== 'number')
		{
			return this.once('open', function ()
			{
				self._write(chunk, encoding, callback);
			});
		}

		try
		{
			// 同步寫入檔案 / Write to file synchronously
			let bytes = fs.writeSync(this.fd, chunk, 0, chunk.length, this.pos);

			this.bytesWritten += bytes;
		}
		catch (e)
		{
			// 發生錯誤時呼叫錯誤回調 / Call error callback on failure
			internal._error_callback(this, e, callback)
		}

		// 更新寫入位置 / Update write position
		if (this.pos !== undefined)
		{
			this.pos += chunk.length;
		}
	}

	/**
	 * 關閉流
	 * Close stream
	 *
	 * 關閉檔案流並發送 close 事件
	 * Closes file stream and emits close event
	 *
	 * @param {Function} [cb] - 關閉回調 / Close callback
	 */
	close(cb?: Function)
	{
		if (cb)
		{
			if (this.closed)
			{
				// 已關閉，直接執行回調 / Already closed, execute callback directly
				cb();
				return;
			}
			else
			{
				// 監聽 close 事件 / Listen for close event
				// @ts-ignore
				this.on('close', cb);
			}
		}

		// 若非自動關閉模式，在 finish 時銷毀
		// If not auto-closing, destroy on 'finish'
		if (!this.autoClose)
		{
			this.on('finish', this.destroy.bind(this));
		}

		// 使用 end() 而非 destroy() 因為 Node.js issue #2006
		// Use end() instead of destroy() due to https://github.com/nodejs/node/issues/2006
		this.end();
	}

	/**
	 * 銷毀流
	 * Destroy stream
	 *
	 * 清理資源並關閉檔案描述符
	 * Cleans up resources and closes file descriptor
	 *
	 * @param {Error | null} error - 錯誤物件或 null / Error object or null
	 * @param {(error: Error | null) => void} callback - 完成回調 / Completion callback
	 */
	_destroy(error: Error | null, callback: (error: Error | null) => void): void
	{
		internal._destroy(this, error, callback)
	}
}

/**
 * 建立同步寫入流
 * Create synchronous write stream
 *
 * 工廠函數，建立 SyncWriteStream 實例
 * Factory function that creates a SyncWriteStream instance
 *
 * @param {PathLike} path - 檔案路徑 / File path
 * @param {string | IFsWriteStreamOptions} [options] - 選項 / Options
 * @returns {SyncWriteStream} 同步寫入流實例 / Synchronous write stream instance
 */
export function createSyncWriteStream(path: PathLike, options?: string | IFsWriteStreamOptions)
{
	return new SyncWriteStream(path, options)
}

/**
 * 預設導出 - SyncWriteStream 類別
 * Default export - SyncWriteStream class
 */
export default SyncWriteStream
