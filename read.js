"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const internal_1 = require("./lib/internal");
const read_sync_1 = require("./read-sync");
class ReadStream extends fs.ReadStream {
    constructor(path, options) {
        // @ts-ignore
        super(path, options);
        internal_1.getFsStreamData(this);
    }
    static get create() {
        return createReadStream;
    }
    open() {
        if (typeof internal_1.getFsStreamData(this) !== 'boolean') {
            this[internal_1.SYM_FS_STREAM_DATA].opened = true;
            // @ts-ignore
            fs.ReadStream.prototype.open.call(this);
        }
    }
}
exports.ReadStream = ReadStream;
function createReadStream(path, options) {
    return new ReadStream(path, options);
}
exports.createReadStream = createReadStream;
exports.default = read_sync_1.default;
// @ts-ignore
Object.freeze(exports);
