"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSyncReadStream = exports.SyncReadStream = exports.kMinPoolSpace = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const internal_1 = require("./lib/internal");
const internal_2 = tslib_1.__importDefault(require("./lib/internal"));
const read_1 = require("./read");
exports.kMinPoolSpace = 128;
let pool;
const poolFragments = [];
function allocNewPool(poolSize) {
    if (poolFragments.length > 0) {
        pool = poolFragments.pop();
    }
    else {
        pool = Buffer.allocUnsafe(poolSize);
    }
    pool.used = 0;
}
class SyncReadStream extends read_1.ReadStream {
    constructor(path, options) {
        // @ts-ignore
        super(path, options);
    }
    static get create() {
        return createSyncReadStream;
    }
    open() {
        if (typeof (0, internal_1.getFsStreamData)(this) !== 'boolean') {
            this[internal_1.SYM_FS_STREAM_DATA].opened = true;
            internal_2.default.open(this);
            this.read();
        }
        else if (this[internal_1.SYM_FS_STREAM_DATA].opened === true) {
            this[internal_1.SYM_FS_STREAM_DATA].opened = false;
            this.emit('open', this.fd);
            this.emit('ready');
        }
    }
    _read(n) {
        if (typeof this.fd !== 'number') {
            return this.once('open', function () {
                // @ts-ignore
                this._read(n);
            });
        }
        if (this.destroyed) {
            return;
        }
        if (!pool || pool.length - pool.used < exports.kMinPoolSpace) {
            // discard the old pool.
            allocNewPool(this.readableHighWaterMark);
        }
        const thisPool = pool;
        let toRead = Math.min(pool.length - pool.used, n);
        const start = pool.used;
        if (this.pos !== undefined) {
            toRead = Math.min(this.end - this.pos + 1, toRead);
        }
        else {
            toRead = Math.min(this.end - this.bytesRead + 1, toRead);
        }
        // already read everything we were supposed to read!
        // treat as EOF.
        if (toRead <= 0) {
            return this.push(null);
        }
        try {
            // the actual read.
            let bytesRead = fs_1.default.readSync(this.fd, pool, pool.used, toRead, this.pos);
            let b = null;
            // Now that we know how much data we have actually read, re-wind the
            // 'used' field if we can, and otherwise allow the remainder of our
            // reservation to be used as a new pool later.
            if (start + toRead === thisPool.used && thisPool === pool) {
                thisPool.used += bytesRead - toRead;
            }
            else if (toRead - bytesRead > exports.kMinPoolSpace) {
                poolFragments.push(thisPool.slice(start + bytesRead, start + toRead));
            }
            if (bytesRead > 0) {
                this.bytesRead += bytesRead;
                b = thisPool.slice(start, start + bytesRead);
            }
            this.push(b);
        }
        catch (er) {
            if (this.autoClose) {
                this.destroy();
            }
            this.emit('error', er);
        }
        // move the pool positions, and internal position for reading.
        if (this.pos !== undefined) {
            this.pos += toRead;
        }
        pool.used += toRead;
    }
    _destroy(error, callback) {
        internal_2.default._destroy(this, error, callback);
    }
}
exports.SyncReadStream = SyncReadStream;
function createSyncReadStream(path, options) {
    return new SyncReadStream(path, options);
}
exports.createSyncReadStream = createSyncReadStream;
exports.default = SyncReadStream;
//# sourceMappingURL=read-sync.js.map