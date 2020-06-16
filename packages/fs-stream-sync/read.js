"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReadStream = exports.ReadStream = void 0;
const fs_1 = __importDefault(require("fs"));
const internal_1 = require("./lib/internal");
// @ts-ignore
class ReadStream extends fs_1.default.ReadStream {
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
            fs_1.default.ReadStream.prototype.open.call(this);
        }
    }
}
exports.ReadStream = ReadStream;
function createReadStream(path, options) {
    return new ReadStream(path, options);
}
exports.createReadStream = createReadStream;
exports.default = ReadStream;
//# sourceMappingURL=read.js.map