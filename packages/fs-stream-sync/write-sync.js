'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSyncWriteStream = exports.SyncWriteStream = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const errors_1 = require("./lib/errors");
const internal_1 = require("./lib/internal");
const internal_2 = tslib_1.__importDefault(require("./lib/internal"));
const write_1 = require("./write");
class SyncWriteStream extends write_1.WriteStream {
    constructor(path, options) {
        // @ts-ignore
        super(path, options);
    }
    static get create() {
        return createSyncWriteStream;
    }
    open() {
        if (typeof (0, internal_1.getFsStreamData)(this) !== 'boolean') {
            this[internal_1.SYM_FS_STREAM_DATA].opened = true;
            internal_2.default.open(this);
        }
        else if (this[internal_1.SYM_FS_STREAM_DATA].opened === true) {
            this[internal_1.SYM_FS_STREAM_DATA].opened = false;
            this.emit('open', this.fd);
            this.emit('ready');
        }
    }
    write(chunk, ...argv) {
        /*
        if (this.closed)
        {
            throw new NodeLikeError(EnumFsStreamErrorCode.ERR_STREAM_WRITE_AFTER_END, `write after end`)
        }
        */
        if (this._writableState.destroyed) {
            throw new errors_1.NodeLikeError(errors_1.EnumFsStreamErrorCode.ERR_STREAM_DESTROYED, `Cannot call write after a stream was destroyed`);
        }
        //console.dir({chunk,argv} );
        return super.write(chunk, ...argv);
    }
    /**
     * @fixme a unknow bug make stream.write only run once
     */
    _write(chunk, encoding, callback) {
        let self = this;
        //console.dir({chunk, encoding, callback} );
        if (!(chunk instanceof Buffer)) {
            return this.emit('error', new Error('Invalid data'));
        }
        if (typeof this.fd !== 'number') {
            return this.once('open', function () {
                self._write(chunk, encoding, callback);
            });
        }
        try {
            let bytes = fs_1.default.writeSync(this.fd, chunk, 0, chunk.length, this.pos);
            this.bytesWritten += bytes;
        }
        catch (e) {
            internal_2.default._error_callback(this, e, callback);
        }
        if (this.pos !== undefined) {
            this.pos += chunk.length;
        }
    }
    close(cb) {
        if (cb) {
            if (this.closed) {
                cb();
                return;
            }
            else {
                // @ts-ignore
                this.on('close', cb);
            }
        }
        // If we are not autoClosing, we should call
        // destroy on 'finish'.
        if (!this.autoClose) {
            this.on('finish', this.destroy.bind(this));
        }
        // we use end() instead of destroy() because of
        // https://github.com/nodejs/node/issues/2006
        this.end();
    }
    _destroy(error, callback) {
        internal_2.default._destroy(this, error, callback);
    }
}
exports.SyncWriteStream = SyncWriteStream;
function createSyncWriteStream(path, options) {
    return new SyncWriteStream(path, options);
}
exports.createSyncWriteStream = createSyncWriteStream;
exports.default = SyncWriteStream;
//# sourceMappingURL=write-sync.js.map