"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYM_FS_STREAM_DATA = void 0;
exports.open = open;
exports._error_emit = _error_emit;
exports.__close = __close;
exports._error_callback = _error_callback;
exports.closeFsStreamSync = closeFsStreamSync;
exports._destroy = _destroy;
exports.getFsStreamData = getFsStreamData;
const fs_1 = require("fs");
exports.SYM_FS_STREAM_DATA = Symbol('FsStreamData');
function open(thisArgv, argv) {
    if (typeof thisArgv.fd !== 'number') {
        let fd;
        try {
            // @ts-ignore
            fd = (0, fs_1.openSync)(thisArgv.path, thisArgv.flags, thisArgv.mode);
        }
        catch (er) {
            _error_emit(thisArgv, er);
            return;
        }
        thisArgv.fd = fd;
    }
    thisArgv.emit('open', thisArgv.fd);
    thisArgv.emit('ready');
}
function _error_emit(thisArgv, e) {
    __close(thisArgv);
    thisArgv.emit('error', e);
}
function __close(thisArgv) {
    // @ts-ignore
    if (thisArgv.autoClose) {
        thisArgv.destroy();
    }
}
function _error_callback(thisArgv, e, callback) {
    __close(thisArgv);
    callback(e);
}
function closeFsStreamSync(stream, cb, err) {
    let er;
    try {
        // @ts-ignore
        (0, fs_1.closeSync)(stream.fd);
    }
    catch (e) {
        er = e || err;
    }
    cb(er);
    // @ts-ignore
    stream.closed = true;
    if (!er) {
        stream.emit('close');
    }
}
function _destroy(thisArgv, error, callback) {
    // @ts-ignore
    const isOpen = typeof thisArgv.fd !== 'number';
    if (isOpen) {
        // @ts-ignore
        thisArgv.once('open', closeFsStreamSync.bind(null, thisArgv, callback, error));
        return;
    }
    closeFsStreamSync(thisArgv, callback);
    // @ts-ignore
    thisArgv.fd = null;
}
function emitErrorAndCloseNT(self, err) {
    emitErrorNT(self, err);
    emitCloseNT(self);
}
function emitCloseNT(self) {
    if (self._writableState && !self._writableState.emitClose) {
        return;
    }
    if (self._readableState && !self._readableState.emitClose) {
        return;
    }
    self.emit('close');
}
function emitErrorNT(self, err) {
    self.emit('error', err);
}
function getFsStreamData(thisArgv) {
    return thisArgv[exports.SYM_FS_STREAM_DATA] = thisArgv[exports.SYM_FS_STREAM_DATA] || {};
}
exports.default = exports;
//# sourceMappingURL=internal.js.map