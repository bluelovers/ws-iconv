"use strict";
/**
 * Created by user on 2020/5/29.
 */
var _LineByLine_file, _LineByLine_fd, _LineByLine_options, _LineByLine_newLineCharacter, _LineByLine_eofReached, _LineByLine_linesCache, _LineByLine_fdPosition, _LineByLine_readChunk, _LineByLine_lineNumber;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineByLine = void 0;
const tslib_1 = require("tslib");
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
        (0, tslib_1.__classPrivateFieldSet)(this, _LineByLine_file, file, "f");
        (0, tslib_1.__classPrivateFieldSet)(this, _LineByLine_options, options, "f");
        (0, tslib_1.__classPrivateFieldSet)(this, _LineByLine_newLineCharacter, Buffer.from((0, util_1.handleOptionNewLineCharacter)(newLineCharacter)), "f");
        (0, tslib_1.__classPrivateFieldSet)(this, _LineByLine_readChunk, readChunk, "f");
        if ((0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_newLineCharacter, "f").length <= 0) {
            throw new TypeError(`newLineCharacter should have length > 0`);
        }
        this._open();
        this.reset();
    }
    _open() {
        if (typeof (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_file, "f") === 'number') {
            (0, tslib_1.__classPrivateFieldSet)(this, _LineByLine_fd, (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_file, "f"), "f");
        }
        else {
            (0, tslib_1.__classPrivateFieldSet)(this, _LineByLine_fd, (0, fs_1.openSync)((0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_file, "f"), 'r'), "f");
        }
    }
    get file() {
        return (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_file, "f");
    }
    get fd() {
        return (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_fd, "f");
    }
    get options() {
        return (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_options, "f");
    }
    get fdPosition() {
        return (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_fdPosition, "f");
    }
    get newLineCharacter() {
        return (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_newLineCharacter, "f");
    }
    get eofReached() {
        return (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_eofReached, "f");
    }
    /**
     * get current lineNumber
     */
    get lineNumber() {
        return (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_lineNumber, "f");
    }
    reset() {
        (0, tslib_1.__classPrivateFieldSet)(this, _LineByLine_eofReached, false, "f");
        (0, tslib_1.__classPrivateFieldSet)(this, _LineByLine_linesCache, [], "f");
        (0, tslib_1.__classPrivateFieldSet)(this, _LineByLine_fdPosition, 0, "f");
        (0, tslib_1.__classPrivateFieldSet)(this, _LineByLine_lineNumber, -1, "f");
    }
    close() {
        (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_fd, "f") && (0, fs_1.closeSync)((0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_fd, "f"));
        (0, tslib_1.__classPrivateFieldSet)(this, _LineByLine_fd, null, "f");
    }
    _extractLines(buffer) {
        return (0, util_1.splitBufferByBuffer)(buffer, (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_newLineCharacter, "f"));
    }
    ;
    _readChunk(lineLeftovers) {
        let totalBytesRead = 0;
        let bytesRead;
        const buffers = [];
        do {
            const readBuffer = Buffer.alloc((0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_readChunk, "f"));
            bytesRead = (0, fs_1.readSync)((0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_fd, "f"), readBuffer, 0, (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_readChunk, "f"), (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_fdPosition, "f"));
            totalBytesRead = totalBytesRead + bytesRead;
            (0, tslib_1.__classPrivateFieldSet)(this, _LineByLine_fdPosition, (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_fdPosition, "f") + bytesRead, "f");
            buffers.push(readBuffer);
        } while (bytesRead && buffers[buffers.length - 1].indexOf((0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_newLineCharacter, "f")) === -1);
        let bufferData = Buffer.concat(buffers);
        if (bytesRead < (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_readChunk, "f")) {
            (0, tslib_1.__classPrivateFieldSet)(this, _LineByLine_eofReached, true, "f");
            bufferData = bufferData.slice(0, totalBytesRead);
        }
        if (totalBytesRead) {
            (0, tslib_1.__classPrivateFieldSet)(this, _LineByLine_linesCache, this._extractLines(bufferData), "f");
            if (lineLeftovers) {
                (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_linesCache, "f")[0] = Buffer.concat([lineLeftovers, (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_linesCache, "f")[0]]);
            }
        }
        return totalBytesRead;
    }
    next() {
        var _a;
        if (!(0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_fd, "f") || (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_eofReached, "f") && (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_linesCache, "f").length === 0) {
            return;
        }
        let line;
        let bytesRead;
        if (!(0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_linesCache, "f").length) {
            bytesRead = this._readChunk();
        }
        if ((0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_linesCache, "f").length) {
            line = (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_linesCache, "f").shift();
            //const lastLineCharacter = line[line.length - 1];
            if (!(0, util_1.bufferEndWithByBuffer)(line, (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_newLineCharacter, "f"))) {
                bytesRead = this._readChunk(line);
                if (bytesRead) {
                    line = (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_linesCache, "f").shift();
                }
            }
        }
        if ((0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_eofReached, "f") && (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_linesCache, "f").length === 0) {
            this.close();
        }
        if (line) {
            line = (0, util_1.bufferStripEndWithByBuffer)(line, (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_newLineCharacter, "f"), 0 - (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_newLineCharacter, "f").length);
        }
        (0, tslib_1.__classPrivateFieldSet)(this, _LineByLine_lineNumber, (_a = (0, tslib_1.__classPrivateFieldGet)(this, _LineByLine_lineNumber, "f"), _a++, _a), "f");
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