"use strict";
/**
 * Created by user on 2020/5/29.
 */
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _file, _fd, _options, _newLineCharacter, _eofReached, _linesCache, _fdPosition, _readChunk_1, _lineNumber;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineByLine = void 0;
const fs_1 = require("fs");
const util_1 = require("./lib/util");
class LineByLine {
    constructor(file, options) {
        _file.set(this, void 0);
        _fd.set(this, void 0);
        _options.set(this, void 0);
        _newLineCharacter.set(this, void 0);
        _eofReached.set(this, void 0);
        _linesCache.set(this, void 0);
        _fdPosition.set(this, void 0);
        _readChunk_1.set(this, void 0);
        _lineNumber.set(this, -1);
        let { readChunk, newLineCharacter } = (options = options || {});
        if (!readChunk)
            readChunk = 1024;
        __classPrivateFieldSet(this, _file, file);
        __classPrivateFieldSet(this, _options, options);
        __classPrivateFieldSet(this, _newLineCharacter, Buffer.from(util_1.handleOptionNewLineCharacter(newLineCharacter)));
        __classPrivateFieldSet(this, _readChunk_1, readChunk);
        if (__classPrivateFieldGet(this, _newLineCharacter).length <= 0) {
            throw new TypeError(`newLineCharacter should have length > 0`);
        }
        this._open();
        this.reset();
    }
    _open() {
        if (typeof __classPrivateFieldGet(this, _file) === 'number') {
            __classPrivateFieldSet(this, _fd, __classPrivateFieldGet(this, _file));
        }
        else {
            __classPrivateFieldSet(this, _fd, fs_1.openSync(__classPrivateFieldGet(this, _file), 'r'));
        }
    }
    get file() {
        return __classPrivateFieldGet(this, _file);
    }
    get fd() {
        return __classPrivateFieldGet(this, _fd);
    }
    get options() {
        return __classPrivateFieldGet(this, _options);
    }
    get fdPosition() {
        return __classPrivateFieldGet(this, _fdPosition);
    }
    get newLineCharacter() {
        return __classPrivateFieldGet(this, _newLineCharacter);
    }
    get eofReached() {
        return __classPrivateFieldGet(this, _eofReached);
    }
    /**
     * get current lineNumber
     */
    get lineNumber() {
        return __classPrivateFieldGet(this, _lineNumber);
    }
    reset() {
        __classPrivateFieldSet(this, _eofReached, false);
        __classPrivateFieldSet(this, _linesCache, []);
        __classPrivateFieldSet(this, _fdPosition, 0);
        __classPrivateFieldSet(this, _lineNumber, -1);
    }
    close() {
        __classPrivateFieldGet(this, _fd) && fs_1.closeSync(__classPrivateFieldGet(this, _fd));
        __classPrivateFieldSet(this, _fd, null);
    }
    _extractLines(buffer) {
        return util_1.splitBufferByBuffer(buffer, __classPrivateFieldGet(this, _newLineCharacter));
    }
    ;
    _readChunk(lineLeftovers) {
        let totalBytesRead = 0;
        let bytesRead;
        const buffers = [];
        do {
            const readBuffer = Buffer.alloc(__classPrivateFieldGet(this, _readChunk_1));
            bytesRead = fs_1.readSync(__classPrivateFieldGet(this, _fd), readBuffer, 0, __classPrivateFieldGet(this, _readChunk_1), __classPrivateFieldGet(this, _fdPosition));
            totalBytesRead = totalBytesRead + bytesRead;
            __classPrivateFieldSet(this, _fdPosition, __classPrivateFieldGet(this, _fdPosition) + bytesRead);
            buffers.push(readBuffer);
        } while (bytesRead && buffers[buffers.length - 1].indexOf(__classPrivateFieldGet(this, _newLineCharacter)) === -1);
        let bufferData = Buffer.concat(buffers);
        if (bytesRead < __classPrivateFieldGet(this, _readChunk_1)) {
            __classPrivateFieldSet(this, _eofReached, true);
            bufferData = bufferData.slice(0, totalBytesRead);
        }
        if (totalBytesRead) {
            __classPrivateFieldSet(this, _linesCache, this._extractLines(bufferData));
            if (lineLeftovers) {
                __classPrivateFieldGet(this, _linesCache)[0] = Buffer.concat([lineLeftovers, __classPrivateFieldGet(this, _linesCache)[0]]);
            }
        }
        return totalBytesRead;
    }
    next() {
        if (!__classPrivateFieldGet(this, _fd) || __classPrivateFieldGet(this, _eofReached) && __classPrivateFieldGet(this, _linesCache).length === 0) {
            return;
        }
        let line;
        let bytesRead;
        if (!__classPrivateFieldGet(this, _linesCache).length) {
            bytesRead = this._readChunk();
        }
        if (__classPrivateFieldGet(this, _linesCache).length) {
            line = __classPrivateFieldGet(this, _linesCache).shift();
            //const lastLineCharacter = line[line.length - 1];
            if (!util_1.bufferEndWithByBuffer(line, __classPrivateFieldGet(this, _newLineCharacter))) {
                bytesRead = this._readChunk(line);
                if (bytesRead) {
                    line = __classPrivateFieldGet(this, _linesCache).shift();
                }
            }
        }
        if (__classPrivateFieldGet(this, _eofReached) && __classPrivateFieldGet(this, _linesCache).length === 0) {
            this.close();
        }
        if (line) {
            line = util_1.bufferStripEndWithByBuffer(line, __classPrivateFieldGet(this, _newLineCharacter), 0 - __classPrivateFieldGet(this, _newLineCharacter).length);
        }
        __classPrivateFieldSet(this, _lineNumber, +__classPrivateFieldGet(this, _lineNumber) + 1);
        return line;
    }
    *generator() {
        let line;
        while (line = this.next()) {
            yield line;
        }
    }
    static *generator(file, options) {
        const liner = new this(file, options);
        yield* liner.generator();
    }
}
exports.LineByLine = LineByLine;
_file = new WeakMap(), _fd = new WeakMap(), _options = new WeakMap(), _newLineCharacter = new WeakMap(), _eofReached = new WeakMap(), _linesCache = new WeakMap(), _fdPosition = new WeakMap(), _readChunk_1 = new WeakMap(), _lineNumber = new WeakMap();
LineByLine.LineByLine = LineByLine;
LineByLine.default = LineByLine;
exports.default = LineByLine;
//# sourceMappingURL=class.js.map