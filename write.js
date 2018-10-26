"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const internal_1 = require("./lib/internal");
const write_sync_1 = require("./write-sync");
class WriteStream extends fs.WriteStream {
    constructor(path, options) {
        // @ts-ignore
        super(path, options);
        internal_1.getFsStreamData(this);
    }
    static get create() {
        return write_sync_1.createSyncWriteStream;
    }
    open() {
        if (!internal_1.getFsStreamData(this).opened) {
            this[internal_1.SYM_FS_STREAM_DATA].opened = true;
            // @ts-ignore
            super.open();
        }
    }
}
exports.WriteStream = WriteStream;
function createWriteStream(path, options) {
    return new WriteStream(path, options);
}
exports.createWriteStream = createWriteStream;
exports.default = WriteStream;
