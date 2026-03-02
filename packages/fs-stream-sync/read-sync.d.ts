/**
 * 同步讀取流實作
 * Synchronous Read Stream Implementation
 *
 * 提供同步檔案讀取流功能
 * Provides synchronous file reading stream functionality
 *
 * @module fs-stream-sync/read-sync
 */
import { PathLike } from "fs";
import { IFsReadStreamOptions } from './lib/interface';
import { ReadStream } from './read';
/**
 * 最小緩衝池空間（位元組）
 * Minimum pool space in bytes
 */
export declare const kMinPoolSpace = 128;
/**
 * 同步讀取流類別
 * Synchronous Read Stream Class
 *
 * 提供同步檔案讀取功能，繼承自 ReadStream
 * Provides synchronous file reading functionality, extends ReadStream
 */
export declare class SyncReadStream extends ReadStream {
    /**
     * 構造函數
     * Constructor
     *
     * @param {PathLike} path - 檔案路徑 / File path
     * @param {string | IFsReadStreamOptions} [options] - 選項 / Options
     */
    constructor(path: PathLike, options?: string | IFsReadStreamOptions);
    /**
     * 建立函數別名
     * Factory method alias
     */
    static get create(): typeof createSyncReadStream;
    /**
     * 開啟檔案流
     * Open file stream
     *
     * 同步開啟檔案並發送 open 和 ready 事件
     * Opens file synchronously and emits open and ready events
     */
    open(): void;
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
    _read(n: number): boolean | this;
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
    _destroy(error: Error | null, callback: (error: Error | null) => void): void;
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
export declare function createSyncReadStream(path: PathLike, options?: string | IFsReadStreamOptions): SyncReadStream;
/**
 * 預設導出 - SyncReadStream 類別
 * Default export - SyncReadStream class
 */
export default SyncReadStream;
