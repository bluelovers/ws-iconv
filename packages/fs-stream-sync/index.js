"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSyncWriteStream = exports.createSyncReadStream = exports.createWriteStream = exports.createReadStream = exports.SyncWriteStream = exports.SyncReadStream = exports.WriteStream = exports.ReadStream = void 0;
/// <reference types="node" />
const read_1 = require("./read");
Object.defineProperty(exports, "ReadStream", { enumerable: true, get: function () { return read_1.ReadStream; } });
Object.defineProperty(exports, "createReadStream", { enumerable: true, get: function () { return read_1.createReadStream; } });
const read_sync_1 = require("./read-sync");
Object.defineProperty(exports, "SyncReadStream", { enumerable: true, get: function () { return read_sync_1.SyncReadStream; } });
Object.defineProperty(exports, "createSyncReadStream", { enumerable: true, get: function () { return read_sync_1.createSyncReadStream; } });
const write_sync_1 = require("./write-sync");
Object.defineProperty(exports, "SyncWriteStream", { enumerable: true, get: function () { return write_sync_1.SyncWriteStream; } });
Object.defineProperty(exports, "createSyncWriteStream", { enumerable: true, get: function () { return write_sync_1.createSyncWriteStream; } });
const write_1 = require("./write");
Object.defineProperty(exports, "WriteStream", { enumerable: true, get: function () { return write_1.WriteStream; } });
Object.defineProperty(exports, "createWriteStream", { enumerable: true, get: function () { return write_1.createWriteStream; } });
/**
 * 預設導出 - 模組所有匯出內容
 * Default export - all module exports
 */
exports.default = exports;
//# sourceMappingURL=index.js.map