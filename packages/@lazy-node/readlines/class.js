"use strict";
/**
 * Created by user on 2020/5/29.
 */
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LineByLine_file, _LineByLine_fd, _LineByLine_options, _LineByLine_newLineCharacter, _LineByLine_eofReached, _LineByLine_linesCache, _LineByLine_fdPosition, _LineByLine_readChunk, _LineByLine_lineNumber;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineByLine = void 0;
const fs_1 = require("fs");
const util_1 = require("./lib/util");
class LineByLine {
    constructor(file, options) {
        _LineByLine_file.set(this, void 0);
        _LineByLine_fd.set(this, void 0);
        _LineByLine_options.set(this, void 0);
        _LineByLine_newLineCharacter.set(this, void 0);
        _LineByLine_eofReached.set(this, void 0);
        _LineByLine_linesCache.set(this, void 0);
        _LineByLine_fdPosition.set(this, void 0);
        _LineByLine_readChunk.set(this, void 0);
        _LineByLine_lineNumber.set(this, -1);
        let { readChunk, newLineCharacter } = (options = options || {});
        if (!readChunk)
            readChunk = 1024;
        __classPrivateFieldSet(this, _LineByLine_file, file, "f");
        __classPrivateFieldSet(this, _LineByLine_options, options, "f");
        __classPrivateFieldSet(this, _LineByLine_newLineCharacter, Buffer.from(util_1.handleOptionNewLineCharacter(newLineCharacter)), "f");
        __classPrivateFieldSet(this, _LineByLine_readChunk, readChunk, "f");
        if (__classPrivateFieldGet(this, _LineByLine_newLineCharacter, "f").length <= 0) {
            throw new TypeError(`newLineCharacter should have length > 0`);
        }
        this._open();
        this.reset();
    }
    _open() {
        if (typeof __classPrivateFieldGet(this, _LineByLine_file, "f") === 'number') {
            __classPrivateFieldSet(this, _LineByLine_fd, __classPrivateFieldGet(this, _LineByLine_file, "f"), "f");
        }
        else {
            __classPrivateFieldSet(this, _LineByLine_fd, fs_1.openSync(__classPrivateFieldGet(this, _LineByLine_file, "f"), 'r'), "f");
        }
    }
    get file() {
        return __classPrivateFieldGet(this, _LineByLine_file, "f");
    }
    get fd() {
        return __classPrivateFieldGet(this, _LineByLine_fd, "f");
    }
    get options() {
        return __classPrivateFieldGet(this, _LineByLine_options, "f");
    }
    get fdPosition() {
        return __classPrivateFieldGet(this, _LineByLine_fdPosition, "f");
    }
    get newLineCharacter() {
        return __classPrivateFieldGet(this, _LineByLine_newLineCharacter, "f");
    }
    get eofReached() {
        return __classPrivateFieldGet(this, _LineByLine_eofReached, "f");
    }
    /**
     * get current lineNumber
     */
    get lineNumber() {
        return __classPrivateFieldGet(this, _LineByLine_lineNumber, "f");
    }
    reset() {
        __classPrivateFieldSet(this, _LineByLine_eofReached, false, "f");
        __classPrivateFieldSet(this, _LineByLine_linesCache, [], "f");
        __classPrivateFieldSet(this, _LineByLine_fdPosition, 0, "f");
        __classPrivateFieldSet(this, _LineByLine_lineNumber, -1, "f");
    }
    close() {
        __classPrivateFieldGet(this, _LineByLine_fd, "f") && fs_1.closeSync(__classPrivateFieldGet(this, _LineByLine_fd, "f"));
        __classPrivateFieldSet(this, _LineByLine_fd, null, "f");
    }
    _extractLines(buffer) {
        return util_1.splitBufferByBuffer(buffer, __classPrivateFieldGet(this, _LineByLine_newLineCharacter, "f"));
    }
    ;
    _readChunk(lineLeftovers) {
        let totalBytesRead = 0;
        let bytesRead;
        const buffers = [];
        do {
            const readBuffer = Buffer.alloc(__classPrivateFieldGet(this, _LineByLine_readChunk, "f"));
            bytesRead = fs_1.readSync(__classPrivateFieldGet(this, _LineByLine_fd, "f"), readBuffer, 0, __classPrivateFieldGet(this, _LineByLine_readChunk, "f"), __classPrivateFieldGet(this, _LineByLine_fdPosition, "f"));
            totalBytesRead = totalBytesRead + bytesRead;
            __classPrivateFieldSet(this, _LineByLine_fdPosition, __classPrivateFieldGet(this, _LineByLine_fdPosition, "f") + bytesRead, "f");
            buffers.push(readBuffer);
        } while (bytesRead && buffers[buffers.length - 1].indexOf(__classPrivateFieldGet(this, _LineByLine_newLineCharacter, "f")) === -1);
        let bufferData = Buffer.concat(buffers);
        if (bytesRead < __classPrivateFieldGet(this, _LineByLine_readChunk, "f")) {
            __classPrivateFieldSet(this, _LineByLine_eofReached, true, "f");
            bufferData = bufferData.slice(0, totalBytesRead);
        }
        if (totalBytesRead) {
            __classPrivateFieldSet(this, _LineByLine_linesCache, this._extractLines(bufferData), "f");
            if (lineLeftovers) {
                __classPrivateFieldGet(this, _LineByLine_linesCache, "f")[0] = Buffer.concat([lineLeftovers, __classPrivateFieldGet(this, _LineByLine_linesCache, "f")[0]]);
            }
        }
        return totalBytesRead;
    }
    next() {
        if (!__classPrivateFieldGet(this, _LineByLine_fd, "f") || __classPrivateFieldGet(this, _LineByLine_eofReached, "f") && __classPrivateFieldGet(this, _LineByLine_linesCache, "f").length === 0) {
            return;
        }
        let line;
        let bytesRead;
        if (!__classPrivateFieldGet(this, _LineByLine_linesCache, "f").length) {
            bytesRead = this._readChunk();
        }
        if (__classPrivateFieldGet(this, _LineByLine_linesCache, "f").length) {
            line = __classPrivateFieldGet(this, _LineByLine_linesCache, "f").shift();
            //const lastLineCharacter = line[line.length - 1];
            if (!util_1.bufferEndWithByBuffer(line, __classPrivateFieldGet(this, _LineByLine_newLineCharacter, "f"))) {
                bytesRead = this._readChunk(line);
                if (bytesRead) {
                    line = __classPrivateFieldGet(this, _LineByLine_linesCache, "f").shift();
                }
            }
        }
        if (__classPrivateFieldGet(this, _LineByLine_eofReached, "f") && __classPrivateFieldGet(this, _LineByLine_linesCache, "f").length === 0) {
            this.close();
        }
        if (line) {
            line = util_1.bufferStripEndWithByBuffer(line, __classPrivateFieldGet(this, _LineByLine_newLineCharacter, "f"), 0 - __classPrivateFieldGet(this, _LineByLine_newLineCharacter, "f").length);
        }
        __classPrivateFieldSet(this, _LineByLine_lineNumber, +__classPrivateFieldGet(this, _LineByLine_lineNumber, "f") + 1, "f");
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
_LineByLine_file = new WeakMap(), _LineByLine_fd = new WeakMap(), _LineByLine_options = new WeakMap(), _LineByLine_newLineCharacter = new WeakMap(), _LineByLine_eofReached = new WeakMap(), _LineByLine_linesCache = new WeakMap(), _LineByLine_fdPosition = new WeakMap(), _LineByLine_readChunk = new WeakMap(), _LineByLine_lineNumber = new WeakMap();
LineByLine.LineByLine = LineByLine;
LineByLine.default = LineByLine;
exports.default = LineByLine;
//# sourceMappingURL=class.js.map