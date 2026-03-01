/**
 * fs-stream-sync - 檔案系統同步流處理模組
 * File System Synchronous Stream Processing Module
 *
 * 提供同步檔案讀寫流功能，相容於 Node.js 核心 fs 模組
 * Provides synchronous file read/write streams, compatible with Node.js core fs module
 *
 * @module fs-stream-sync
 * @author bluelovers
 */

/// <reference types="node" />

import { ReadStream, createReadStream } from './read';
import { SyncReadStream, createSyncReadStream } from './read-sync';
import { SyncWriteStream, createSyncWriteStream } from './write-sync';
import { WriteStream, createWriteStream } from './write';

/**
 * 重新導出介面類型
 * Re-export interface types
 */
export { IFsReadStreamOptions, IFsWriteStreamOptions, PathLike } from './lib/interface';

/**
 * 導出所有流類別和建立函數
 * Export all stream classes and factory functions
 */
export {
	/**
	 * 讀取流類別 / Read stream class
	 */
	ReadStream,
	/**
	 * 寫入流類別 / Write stream class
	 */
	WriteStream,
	/**
	 * 同步讀取流類別 / Synchronous read stream class
	 */
	SyncReadStream,
	/**
	 * 同步寫入流類別 / Synchronous write stream class
	 */
	SyncWriteStream,

	/**
	 * 建立讀取流 / Create read stream
	 */
	createReadStream,
	/**
	 * 建立寫入流 / Create write stream
	 */
	createWriteStream,
	/**
	 * 建立同步讀取流 / Create synchronous read stream
	 */
	createSyncReadStream,
	/**
	 * 建立同步寫入流 / Create synchronous write stream
	 */
	createSyncWriteStream
}

/**
 * 預設導出 - 模組所有匯出內容
 * Default export - all module exports
 */
export default exports as typeof import('./index');
