/**
 * 同步讀取流實作
 * Synchronous Read Stream Implementation
 *
 * 提供同步檔案讀取流功能
 * Provides synchronous file reading stream functionality
 *
 * @module fs-stream-sync/read-sync
 */

import fs from 'fs';
import { PathLike } from "fs";
import { IFsReadStreamOptions } from './lib/interface';
import { getFsStreamData, SYM_FS_STREAM_DATA } from './lib/internal';
import internal from "./lib/internal";
import { ReadStream } from './read'

/**
 * 最小緩衝池空間（位元組）
 * Minimum pool space in bytes
 */
export const kMinPoolSpace = 128;

/**
 * 共享緩衝池 - 用於減少記憶體分配
 * Shared buffer pool - used to reduce memory allocations
 */
let pool;

/**
 * 緩衝池碎片陣列 - 儲存可回收的緩衝區
 * Pool fragments array - stores recyclable buffers
 */
const poolFragments = [];

/**
 * 分配新的緩衝池
 * Allocate new buffer pool
 *
 * 嘗試從碎片陣列重用緩衝區，否則建立新緩衝區
 * Tries to reuse buffer from fragments array, otherwise creates new buffer
 *
 * @param {number} poolSize - 緩衝池大小 / Pool size in bytes
 */
function allocNewPool(poolSize: number)
{
	if (poolFragments.length > 0)
	{
		// 重用現有的緩衝區碎片 / Reuse existing buffer fragment
		pool = poolFragments.pop();
	}
	else
	{
		// 建立新的不安全緩衝區 / Create new unsafe buffer
		pool = Buffer.allocUnsafe(poolSize);
	}
	pool.used = 0;
}

/**
 * 同步讀取流類別
 * Synchronous Read Stream Class
 *
 * 提供同步檔案讀取功能，繼承自 ReadStream
 * Provides synchronous file reading functionality, extends ReadStream
 */
export class SyncReadStream extends ReadStream
{
	/**
	 * 構造函數
	 * Constructor
	 *
	 * @param {PathLike} path - 檔案路徑 / File path
	 * @param {string | IFsReadStreamOptions} [options] - 選項 / Options
	 */
	constructor(path: PathLike, options?: string | IFsReadStreamOptions)
	{
		// @ts-ignore
		super(path, options)
	}

	/**
	 * 建立函數別名
	 * Factory method alias
	 */
	static override get create()
	{
		return createSyncReadStream
	}

	/**
	 * 開啟檔案流
	 * Open file stream
	 *
	 * 同步開啟檔案並發送 open 和 ready 事件
	 * Opens file synchronously and emits open and ready events
	 */
	override open(): void
	{
		if (typeof getFsStreamData(this) !== 'boolean')
		{
			this[SYM_FS_STREAM_DATA].opened = true
			internal.open(this)
			this.read();
		}
		else if (this[SYM_FS_STREAM_DATA].opened === true)
		{
			this[SYM_FS_STREAM_DATA].opened = false
			this.emit('open', this.fd);
			this.emit('ready');
		}
	}

	/**
	 * 內部讀取方法
	 * Internal read method
	 *
	 * 從檔案同步讀取資料到緩衝池
	 * Reads data from file synchronously into buffer pool
	 *
	 * @param {number} n - 要讀取的位元組數 / Number of bytes to read
	 * @returns {boolean | this} 讀取結果 / Read result
	 */
	override _read(n: number)
	{
		// 等待檔案開啟 / Wait for file to open
		if (typeof this.fd !== 'number')
		{
			return this.once('open', function ()
			{
				// @ts-ignore
				this._read(n);
			});
		}

		// 檢查流是否已銷毀 / Check if stream is destroyed
		if (this.destroyed)
		{
			return;
		}

		// 檢查緩衝池空間是否足夠 / Check if pool has enough space
		if (!pool || pool.length - pool.used < kMinPoolSpace)
		{
			// 丟棄舊緩衝池並建立新的 / Discard old pool and allocate new one
			allocNewPool(this.readableHighWaterMark);
		}

		const thisPool = pool;
		let toRead = Math.min(pool.length - pool.used, n);
		const start = pool.used;

		// 計算實際可讀取位元組數 / Calculate actual readable bytes
		if (this.pos !== undefined)
		{
			toRead = Math.min(this.end - this.pos + 1, toRead);
		}
		else
		{
			toRead = Math.min(this.end - this.bytesRead + 1, toRead);
		}

		// 已讀取完所有資料，視為 EOF / Already read everything, treat as EOF
		if (toRead <= 0)
		{
			return this.push(null);
		}

		try
		{
			// 實際讀取操作 / The actual read operation
			let bytesRead = fs.readSync(this.fd, pool, pool.used, toRead, this.pos);

			let b = null;
			// 調整緩衝池已使用標記或回收剩餘空間
			// Adjust pool used marker or recycle remaining space
			if (start + toRead === thisPool.used && thisPool === pool)
			{
				thisPool.used += bytesRead - toRead;
			}
			else if (toRead - bytesRead > kMinPoolSpace)
			{
				poolFragments.push(thisPool.slice(start + bytesRead, start + toRead));
			}

			// 建立結果緩衝區 / Create result buffer
			if (bytesRead > 0)
			{
				this.bytesRead += bytesRead;
				b = thisPool.slice(start, start + bytesRead);
			}

			this.push(b);
		}
		catch (er)
		{
			// 發生錯誤時自動關閉流 / Auto-close stream on error
			if (this.autoClose)
			{
				this.destroy();
			}
			this.emit('error', er);
		}

		// 更新位置和緩衝池標記 / Update position and pool markers
		if (this.pos !== undefined)
		{
			this.pos += toRead;
		}
		pool.used += toRead;
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
	override _destroy(error: Error | null, callback: (error: Error | null) => void): void
	{
		internal._destroy(this, error, callback)
	}
}

/**
 * 建立同步讀取流
 * Create synchronous read stream
 *
 * 工廠函數，建立 SyncReadStream 實例
 * Factory function that creates a SyncReadStream instance
 *
 * @param {PathLike} path - 檔案路徑 / File path
 * @param {string | IFsReadStreamOptions} [options] - 選項 / Options
 * @returns {SyncReadStream} 同步讀取流實例 / Synchronous read stream instance
 */
export function createSyncReadStream(path: PathLike, options?: string | IFsReadStreamOptions)
{
	return new SyncReadStream(path, options)
}

/**
 * 預設導出 - SyncReadStream 類別
 * Default export - SyncReadStream class
 */
export default SyncReadStream
