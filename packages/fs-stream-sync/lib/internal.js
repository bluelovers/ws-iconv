"use strict";
/**
 * 檔案系統流內部工具函數
 * File System Stream Internal Utility Functions
 *
 * 提供開啟、關閉、銷毀流等核心功能
 * Provides core functions for opening, closing, and destroying streams
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYM_FS_STREAM_DATA = void 0;
exports.open = open;
exports._error_emit = _error_emit;
exports.__close = __close;
exports._error_callback = _error_callback;
exports.closeFsStreamSync = closeFsStreamSync;
exports._destroy = _destroy;
exports.getFsStreamData = getFsStreamData;
const fs_1 = require("fs");
/**
 * 流資料符號鍵 / Stream data symbol key
 * 用於存取流的內部資料 / Used to access stream's internal data
 */
exports.SYM_FS_STREAM_DATA = Symbol('FsStreamData');
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
function open(thisArgv, argv) {
    if (typeof thisArgv.fd !== 'number') {
        let fd;
        try {
            // 使用同步方式開啟檔案 / Open file synchronously
            // @ts-ignore
            fd = (0, fs_1.openSync)(thisArgv.path, thisArgv.flags, thisArgv.mode);
        }
        catch (er) {
            // 發生錯誤時發射錯誤事件 / Emit error on failure
            _error_emit(thisArgv, er);
            return;
        }
        thisArgv.fd = fd;
    }
    // 發送開啟和就緒事件 / Emit open and ready events
    thisArgv.emit('open', thisArgv.fd);
    thisArgv.emit('ready');
}
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
function _error_emit(thisArgv, e) {
    __close(thisArgv);
    thisArgv.emit('error', e);
}
/**
 * 內部關閉函數
 * Internal close function
 *
 * 根據 autoClose 設定決定是否銷毀流
 * Destroys stream based on autoClose setting
 *
 * @param {IThisFsStream} thisArgv - 流實例 / Stream instance
 */
function __close(thisArgv) {
    // 如果啟用自動關閉，則銷毀流 / Destroy stream if autoClose is enabled
    // @ts-ignore
    if (thisArgv.autoClose) {
        thisArgv.destroy();
    }
}
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
function _error_callback(thisArgv, e, callback) {
    __close(thisArgv);
    callback(e);
}
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
function closeFsStreamSync(stream, cb, err) {
    let er;
    try {
        // 同步關閉檔案描述符 / Close file descriptor synchronously
        // @ts-ignore
        (0, fs_1.closeSync)(stream.fd);
    }
    catch (e) {
        er = e || err;
    }
    cb(er);
    // 標記流為已關閉 / Mark stream as closed
    // @ts-ignore
    stream.closed = true;
    if (!er) {
        // 無錯誤時發送關閉事件 / Emit close event on success
        stream.emit('close');
    }
}
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
function _destroy(thisArgv, error, callback) {
    // 檢查檔案是否已開啟 / Check if file is open
    // @ts-ignore
    const isOpen = typeof thisArgv.fd !== 'number';
    if (isOpen) {
        // 等待開啟事件後再關閉 / Wait for open event before closing
        // @ts-ignore
        thisArgv.once('open', closeFsStreamSync.bind(null, thisArgv, callback, error));
        return;
    }
    closeFsStreamSync(thisArgv, callback);
    // 清除檔案描述符 / Clear file descriptor
    // @ts-ignore
    thisArgv.fd = null;
}
/**
 * 發射錯誤和關閉事件（下一個 tick）
 * Emit error and close events (next tick)
 */
function emitErrorAndCloseNT(self, err) {
    emitErrorNT(self, err);
    emitCloseNT(self);
}
/**
 * 發射關閉事件（下一個 tick）
 * Emit close event (next tick)
 */
function emitCloseNT(self) {
    if (self._writableState && !self._writableState.emitClose) {
        return;
    }
    if (self._readableState && !self._readableState.emitClose) {
        return;
    }
    self.emit('close');
}
/**
 * 發射錯誤事件（下一個 tick）
 * Emit error event (next tick)
 */
function emitErrorNT(self, err) {
    self.emit('error', err);
}
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
function getFsStreamData(thisArgv) {
    return thisArgv[exports.SYM_FS_STREAM_DATA] = thisArgv[exports.SYM_FS_STREAM_DATA] || {};
}
/**
 * 預設導出 - 內部模組
 * Default export - internal module
 */
exports.default = exports;
//# sourceMappingURL=internal.js.map