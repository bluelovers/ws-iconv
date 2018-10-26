"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const internal_1 = require("./lib/internal");
class WriteStream extends fs.WriteStream {
    constructor(path, options) {
        // @ts-ignore
        super(path, options);
        internal_1.getFsStreamData(this);
    }
    static get create() {
        return createWriteStream;
    }
    open() {
        if (!internal_1.getFsStreamData(this).opened) {
            const self = this;
            this[internal_1.SYM_FS_STREAM_DATA].opened = true;
            this.once('open', function () {
                process.nextTick(function () {
                    self.emit('ready');
                });
            });
            // @ts-ignore
            fs.WriteStream.prototype.open.call(this);
        }
    }
}
exports.WriteStream = WriteStream;
function createWriteStream(path, options) {
    return new WriteStream(path, options);
}
exports.createWriteStream = createWriteStream;
exports.default = WriteStream;
// @ts-ignore
Object.freeze(exports);
