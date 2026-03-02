/**
 * 檔案系統流內部工具函數
 * File System Stream Internal Utility Functions
 *
 * 提供開啟、關閉、銷毀流等核心功能
 * Provides core functions for opening, closing, and destroying streams
 */
import { ReadStream } from '../read';
import { WriteStream } from '../write';
import { SyncReadStream } from '../read-sync';
import { SyncWriteStream } from '../write-sync';
import { IFsStreamData } from './interface';
import fs from 'fs';
/**
 * 流資料符號鍵 / Stream data symbol key
 * 用於存取流的內部資料 / Used to access stream's internal data
 */
export declare const SYM_FS_STREAM_DATA: unique symbol;
/**
 * 檔案流類型聯合 / File stream type union
 */
export type IThisFsStream = WriteStream | ReadStream | SyncWriteStream | SyncReadStream;
/**
 * 開啟檔案流
 * Open file stream
 *
 * 使用同步方式開啟檔案並發送相關事件
 * Opens file synchronously and emits relevant events
 *
 * @param {IThisFsStream} thisArgv - 流實例 / Stream instance
 * @param {any[]} [argv] - 額外參數 / Additional arguments
 */
export declare function open(thisArgv: IThisFsStream, argv?: any[]): void;
/**
 * 發射錯誤事件
 * Emit error event
 *
 * 關閉流並發射錯誤事件
 * Closes stream and emits error event
 *
 * @param {IThisFsStream} thisArgv - 流實例 / Stream instance
 * @param {T} e - 錯誤物件 / Error object
 */
export declare function _error_emit<T extends Error>(thisArgv: IThisFsStream, e: T): void;
/**
 * 內部關閉函數
 * Internal close function
 *
 * 根據 autoClose 設定決定是否銷毀流
 * Destroys stream based on autoClose setting
 *
 * @param {IThisFsStream} thisArgv - 流實例 / Stream instance
 */
export declare function __close(thisArgv: IThisFsStream): void;
/**
 * 錯誤回調處理
 * Error callback handler
 *
 * 關閉流並執行錯誤回調
 * Closes stream and executes error callback
 *
 * @param {IThisFsStream} thisArgv - 流實例 / Stream instance
 * @param {T} e - 錯誤物件 / Error object
 * @param {Function} callback - 回調函數 / Callback function
 */
export declare function _error_callback<T extends Error>(thisArgv: IThisFsStream, e: T, callback: Function): void;
/**
 * 同步關閉檔案流
 * Close file stream synchronously
 *
 * 同步關閉檔案描述符並發送關閉事件
 * Closes file descriptor synchronously and emits close event
 *
 * @param {fs.WriteStream | fs.ReadStream | SyncWriteStream | SyncReadStream} stream - 流實例 / Stream instance
 * @param {Function} cb - 回調函數 / Callback function
 * @param {any} [err] - 錯誤物件 / Error object
 */
export declare function closeFsStreamSync(stream: fs.WriteStream | fs.ReadStream | SyncWriteStream | SyncReadStream, cb: Function, err?: any): void;
/**
 * 銷毀流
 * Destroy stream
 *
 * 處理流的銷毀邏輯，包括關閉檔案描述符
 * Handles stream destruction logic including closing file descriptor
 *
 * @param {IThisFsStream} thisArgv - 流實例 / Stream instance
 * @param {Error | null} error - 錯誤物件或 null / Error object or null
 * @param {(error: Error | null) => void} callback - 完成回調 / Completion callback
 */
export declare function _destroy(thisArgv: IThisFsStream, error: Error | null, callback: (error: Error | null) => void): void;
/**
 * 取得流資料
 * Get stream data
 *
 * 取得或初始化流的內部資料物件
 * Gets or initializes stream's internal data object
 *
 * @param {IThisFsStream} thisArgv - 流實例 / Stream instance
 * @returns {IFsStreamData} 流資料物件 / Stream data object
 */
export declare function getFsStreamData(thisArgv: IThisFsStream): IFsStreamData;
/**
 * 預設導出 - 內部模組
 * Default export - internal module
 */
declare const _default: typeof import("./internal");
export default _default;
