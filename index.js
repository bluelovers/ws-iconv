"use strict";
/// <reference types="node" />
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.ReadStream = fs_1.ReadStream;
exports.WriteStream = fs_1.WriteStream;
exports.createWriteStream = fs_1.createWriteStream;
exports.createReadStream = fs_1.createReadStream;
const read_1 = require("./read");
exports.SyncReadStream = read_1.SyncReadStream;
exports.createSyncReadStream = read_1.createSyncReadStream;
const write_1 = require("./write");
exports.SyncWriteStream = write_1.SyncWriteStream;
exports.createSyncWriteStream = write_1.createSyncWriteStream;
const SyncStream = require("./index");
exports.default = SyncStream;
