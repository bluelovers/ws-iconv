"use strict";
/// <reference types="node" />
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.ReadStream = fs_1.ReadStream;
exports.createReadStream = fs_1.createReadStream;
const read_sync_1 = require("./read-sync");
exports.SyncReadStream = read_sync_1.SyncReadStream;
exports.createSyncReadStream = read_sync_1.createSyncReadStream;
const write_sync_1 = require("./write-sync");
exports.SyncWriteStream = write_sync_1.SyncWriteStream;
exports.createSyncWriteStream = write_sync_1.createSyncWriteStream;
const write_1 = require("./write");
exports.WriteStream = write_1.WriteStream;
exports.createWriteStream = write_1.createWriteStream;
const SyncStream = require("./index");
exports.default = SyncStream;
