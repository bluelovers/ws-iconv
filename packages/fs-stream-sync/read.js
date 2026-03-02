"use strict";
/**
 * fs-stream-sync - 檔案系統流處理工具
 *
 * 這個模組提供了檔案系統的同步和異步流處理功能，包括讀取和寫入流。
 *
 * @module fs-stream-sync
 * @author bluelovers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadStream = void 0;
exports.createReadStream = createReadStream;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const internal_1 = require("./lib/internal");
/**
 * 讀取流類 - 擴展 Node.js 的 ReadStream
 *
 * 這個類提供了檔案讀取流的功能，支援同步和異步操作。
 *
 * @class ReadStream
 * @extends fs.ReadStream
 */
// @ts-ignore
class ReadStream extends fs_1.default.ReadStream {
    /**
     * 構造函數
     *
     * @param {PathLike} path 檔案路徑
     * @param {string | IFsWriteStreamOptions} [options] 選項
     */
    constructor(path, options) {
        // 調用父類構造函數
        // @ts-ignore
        super(path, options);
        // 初始化流資料
        (0, internal_1.getFsStreamData)(this);
    }
    /** 創建函數別名 */
    static get create() {
        return createReadStream;
    }
    /**
     * 打開流
     *
     * 這個函數會打開檔案流，並設置相關狀態。
     */
    open() {
        if (typeof (0, internal_1.getFsStreamData)(this) !== 'boolean') {
            this[internal_1.SYM_FS_STREAM_DATA].opened = true;
            // 調用父類的 open 方法
            // @ts-ignore
            fs_1.default.ReadStream.prototype.open.call(this);
        }
    }
}
exports.ReadStream = ReadStream;
/**
 * 創建讀取流
 *
 * 這個函數會創建一個 ReadStream 實例。
 *
 * @param {PathLike} path 檔案路徑
 * @param {string | IFsReadStreamOptions} [options] 選項
 * @returns {ReadStream} 讀取流實例
 */
function createReadStream(path, options) {
    return new ReadStream(path, options);
}
/** 預設導出 - ReadStream 類 */
exports.default = ReadStream;
//# sourceMappingURL=read.js.map