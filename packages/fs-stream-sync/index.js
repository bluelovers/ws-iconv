"use strict";
/// <reference types="node" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSyncWriteStream = exports.createSyncReadStream = exports.createWriteStream = exports.createReadStream = exports.SyncWriteStream = exports.SyncReadStream = exports.WriteStream = exports.ReadStream = void 0;
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
exports.default = exports;
//# sourceMappingURL=index.js.map