"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function open(thisArgv, argv) {
    let fd;
    try {
        // @ts-ignore
        fd = fs.openSync(thisArgv.path, thisArgv.flags, thisArgv.mode);
    }
    catch (er) {
        _error_emit(thisArgv, er);
        return;
    }
    // @ts-ignore
    thisArgv.fd = fd;
    thisArgv.emit('open', fd);
    thisArgv.emit('ready');
}
exports.open = open;
function _error_emit(thisArgv, e) {
    __close(thisArgv);
    thisArgv.emit('error', e);
}
exports._error_emit = _error_emit;
function __close(thisArgv) {
    // @ts-ignore
    if (thisArgv.autoClose) {
        thisArgv.destroy();
    }
}
exports.__close = __close;
function _error_callback(thisArgv, e, callback) {
    __close(thisArgv);
    callback(e);
}
exports._error_callback = _error_callback;
function closeFsStreamSync(stream, cb, err) {
    let er;
    try {
        // @ts-ignore
        fs.closeSync(stream.fd);
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
exports.closeFsStreamSync = closeFsStreamSync;
function _destroy(thisArgv, error, callback) {
    // @ts-ignore
    const isOpen = typeof thisArgv.fd !== 'number';
    if (isOpen) {
        thisArgv.once('open', closeFsStreamSync.bind(null, thisArgv, callback, error));
        return;
    }
    closeFsStreamSync(thisArgv, callback);
    // @ts-ignore
    thisArgv.fd = null;
}
exports._destroy = _destroy;
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
// @ts-ignore
Object.freeze(exports);
