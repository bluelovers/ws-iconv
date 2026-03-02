/**
 * 同步寫入流實作
 * Synchronous Write Stream Implementation
 *
 * 提供同步檔案寫入流功能
 * Provides synchronous file writing stream functionality
 *
 * @module fs-stream-sync/write-sync
 */
import { PathLike } from "fs";
import { IFsWriteStreamOptions } from './lib/interface';
import { WriteStream } from './write';
/**
 * 同步寫入流類別
 * Synchronous Write Stream Class
 *
 * 提供同步檔案寫入功能，繼承自 WriteStream
 * Provides synchronous file writing functionality, extends WriteStream
 */
export declare class SyncWriteStream extends WriteStream {
    /**
     * 構造函數
     * Constructor
     *
     * @param {PathLike} path - 檔案路徑 / File path
     * @param {string | IFsWriteStreamOptions} [options] - 選項 / Options
     */
    constructor(path: PathLike, options?: string | IFsWriteStreamOptions);
    /**
     * 建立函數別名
     * Factory method alias
     */
    static get create(): typeof createSyncWriteStream;
    /**
     * 開啟檔案流
     * Open file stream
     *
     * 同步開啟檔案並發送 open 和 ready 事件
     * Opens file synchronously and emits open and ready events
     */
    open(): void;
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
    _write(chunk: Buffer, encoding: string, callback: Function): boolean | this;
    /**
     * 關閉流
     * Close stream
     *
     * 關閉檔案流並發送 close 事件
     * Closes file stream and emits close event
     *
     * @param {Function} [cb] - 關閉回調 / Close callback
     */
    close(cb?: Function): void;
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
export declare function createSyncWriteStream(path: PathLike, options?: string | IFsWriteStreamOptions): SyncWriteStream;
/**
 * 預設導出 - SyncWriteStream 類別
 * Default export - SyncWriteStream class
 */
export default SyncWriteStream;
