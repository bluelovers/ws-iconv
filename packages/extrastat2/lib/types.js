"use strict";
/**
 * 擴展檔案狀態類型定義
 * Extended file status type definitions
 *
 * 定義了擴展檔案狀態相關的介面和列舉
 * Defines interfaces and enums for extended file status
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumMimetypePlus = void 0;
/**
 * MIME 類型擴展列舉
 * MIME type extended enum
 *
 * 特殊檔案類型的 MIME 類型定義
 * MIME type definitions for special file types
 */
var EnumMimetypePlus;
(function (EnumMimetypePlus) {
    /**
     * 目錄 / Directory
     */
    EnumMimetypePlus["directory"] = "application/directory";
    /**
     * 先進先出管道 / FIFO pipe
     */
    EnumMimetypePlus["fifo"] = "application/FIFO";
    /**
     * Socket 檔案 / Socket file
     */
    EnumMimetypePlus["socket"] = "application/socket";
    /**
     * 未知類型 / Unknown type
     */
    EnumMimetypePlus["unknown"] = "application/unknown";
})(EnumMimetypePlus || (exports.EnumMimetypePlus = EnumMimetypePlus = {}));
//# sourceMappingURL=types.js.map