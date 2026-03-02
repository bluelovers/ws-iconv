"use strict";
/**
 * 寫入流實作
 * Write Stream Implementation
 *
 * 提供非同步檔案寫入流功能，擴展 Node.js fs.WriteStream
 * Provides asynchronous file writing stream functionality, extends Node.js fs.WriteStream
 *
 * @module fs-stream-sync/write
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteStream = void 0;
exports.createWriteStream = createWriteStream;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const internal_1 = require("./lib/internal");
/**
 * 寫入流類別
 * Write Stream Class
 *
 * 擴展 Node.js fs.WriteStream，提供額外功能
 * Extends Node.js fs.WriteStream with additional functionality
 */
// @ts-ignore
class WriteStream extends fs_1.default.WriteStream {
    /**
     * 構造函數
     * Constructor
     *
     * @param {PathLike} path - 檔案路徑 / File path
     * @param {string | IFsWriteStreamOptions} [options] - 選項 / Options
     */
    constructor(path, options) {
        // @ts-ignore
        super(path, options);
        // 初始化流資料 / Initialize stream data
        (0, internal_1.getFsStreamData)(this);
    }
    /**
     * 建立函數別名
     * Factory method alias
     */
    static get create() {
        return createWriteStream;
    }
    /**
     * 開啟檔案流
     * Open file stream
     *
     * 開啟檔案並發送 open 和 ready 事件
     * Opens file and emits open and ready events
     */
    open() {
        if (!(0, internal_1.getFsStreamData)(this).opened) {
            const self = this;
            this[internal_1.SYM_FS_STREAM_DATA].opened = true;
            // 監聽 open 事件並發送 ready 事件
            // Listen for open event and emit ready event
            this.once('open', function () {
                process.nextTick(function () {
                    self.emit('ready');
                });
            });
            // @ts-ignore
            fs_1.default.WriteStream.prototype.open.call(this);
        }
    }
}
exports.WriteStream = WriteStream;
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
function createWriteStream(path, options) {
    return new WriteStream(path, options);
}
/**
 * 預設導出 - WriteStream 類別
 * Default export - WriteStream class
 */
exports.default = WriteStream;
//# sourceMappingURL=write.js.map