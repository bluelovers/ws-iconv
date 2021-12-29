"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWriteStream = exports.WriteStream = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const internal_1 = require("./lib/internal");
// @ts-ignore
class WriteStream extends fs_1.default.WriteStream {
    constructor(path, options) {
        // @ts-ignore
        super(path, options);
        (0, internal_1.getFsStreamData)(this);
    }
    static get create() {
        return createWriteStream;
    }
    open() {
        if (!(0, internal_1.getFsStreamData)(this).opened) {
            const self = this;
            this[internal_1.SYM_FS_STREAM_DATA].opened = true;
            this.once('open', function () {
                process.nextTick(function () {
                    self.emit('ready');
                });
            });
            // @ts-ignore
            fs_1.default.WriteStream.prototype.open.call(this);
        }
    }
}
exports.WriteStream = WriteStream;
function createWriteStream(path, options) {
    return new WriteStream(path, options);
}
exports.createWriteStream = createWriteStream;
exports.default = WriteStream;
//# sourceMappingURL=write.js.map