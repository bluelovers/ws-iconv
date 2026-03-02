"use strict";
/**
 * 檔案系統流錯誤處理
 * File System Stream Error Handling
 *
 * 定義錯誤類型和錯誤碼列舉
 * Defines error classes and error code enums
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumFsStreamErrorCode = exports.NodeLikeError = void 0;
exports.createError = createError;
/**
 * Node.js 風格錯誤類別
 * Node.js style error class
 *
 * 擴展 Error 類別，加入錯誤碼屬性
 * Extends Error class with code property
 */
class NodeLikeError extends Error {
    /**
     * 構造函數
     * Constructor
     *
     * @param {string} code - 錯誤碼 / Error code
     * @param {string} [msg] - 錯誤訊息 / Error message
     */
    constructor(code, msg) {
        super(msg);
        this.code = code;
    }
}
exports.NodeLikeError = NodeLikeError;
/**
 * 建立錯誤物件
 * Create error object
 *
 * 使用指定的錯誤類別和錯誤碼建立錯誤物件
 * Creates error object with specified error class and code
 *
 * @param {new (msg?) => T} Err - 錯誤類別 / Error class
 * @param {string} code - 錯誤碼 / Error code
 * @param {string} [msg] - 錯誤訊息 / Error message
 * @returns {T} 錯誤物件 / Error object
 */
function createError(Err, code, msg) {
    let e = new Err(msg);
    e.code = code;
    return e;
}
/**
 * 檔案流錯誤碼列舉
 * File stream error code enum
 */
var EnumFsStreamErrorCode;
(function (EnumFsStreamErrorCode) {
    /**
     * 寫入在結束後嘗試 / Write after end
     */
    EnumFsStreamErrorCode["ERR_STREAM_WRITE_AFTER_END"] = "ERR_STREAM_WRITE_AFTER_END";
    /**
     * 流已銷毀 / Stream destroyed
     */
    EnumFsStreamErrorCode["ERR_STREAM_DESTROYED"] = "ERR_STREAM_DESTROYED";
})(EnumFsStreamErrorCode || (exports.EnumFsStreamErrorCode = EnumFsStreamErrorCode = {}));
//# sourceMappingURL=errors.js.map