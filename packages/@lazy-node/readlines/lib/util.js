"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitBufferByBuffer = exports.bufferIndexWith = exports.bufferIndexWithByBuffer = exports.bufferStripEndWith = exports.bufferStripEndWithByBuffer = exports.bufferEndWith = exports.bufferEndWithByBuffer = exports.handleOptionNewLineCharacter = void 0;
function handleOptionNewLineCharacter(newLineCharacter) {
    if (!newLineCharacter) {
        return [10 /* EnumNewLineCharacter.LF */];
    }
    else if (typeof newLineCharacter !== 'number') {
        let ls = [];
        for (let i = 0; i < newLineCharacter.length; i++) {
            let c = newLineCharacter[i];
            if (typeof c !== 'number') {
                ls.push(c.charCodeAt(0));
            }
            else {
                ls.push(c);
            }
        }
        return ls;
    }
    return [newLineCharacter];
}
exports.handleOptionNewLineCharacter = handleOptionNewLineCharacter;
function bufferEndWithByBuffer(buf, value, byteOffset, encoding) {
    let i = buf.lastIndexOf(value, byteOffset !== null && byteOffset !== void 0 ? byteOffset : (0 - value.length), encoding);
    return i !== -1 && (i + value.length) === buf.length;
}
exports.bufferEndWithByBuffer = bufferEndWithByBuffer;
function bufferEndWith(buf, value, byteOffset, encoding) {
    if (typeof value === 'number') {
        return buf[buf.length - 1] === value;
    }
    let i = buf.lastIndexOf(value, byteOffset !== null && byteOffset !== void 0 ? byteOffset : (0 - value.length), encoding);
    return i !== -1 && (i + value.length) === buf.length;
}
exports.bufferEndWith = bufferEndWith;
function bufferStripEndWithByBuffer(buf, value, byteOffset, encoding) {
    let i = buf.lastIndexOf(value, byteOffset !== null && byteOffset !== void 0 ? byteOffset : (0 - value.length), encoding);
    if (i !== -1 && (i + value.length) === buf.length) {
        return buf.slice(0, i);
    }
    return buf;
}
exports.bufferStripEndWithByBuffer = bufferStripEndWithByBuffer;
function bufferStripEndWith(buf, value, byteOffset, encoding) {
    if (typeof value === 'number') {
        if (buf[buf.length - 1] === value) {
            return buf.slice(0, buf.length - 1);
        }
    }
    else {
        let i = buf.lastIndexOf(value, byteOffset !== null && byteOffset !== void 0 ? byteOffset : (0 - value.length), encoding);
        if (i !== -1 && (i + value.length) === buf.length) {
            /*
            console.dir({
                i,
                vl: value.length,
                bl: buf.length,

                v: value.toString(),
                b: buf.toString(),
                b2: buf.slice(0, i).toString(),
            })
             */
            return buf.slice(0, i);
        }
    }
    return buf;
}
exports.bufferStripEndWith = bufferStripEndWith;
function bufferIndexWithByBuffer(buf, value, byteOffset, encoding) {
    let i = buf.indexOf(value, byteOffset, encoding);
    return i !== -1 && i === byteOffset;
}
exports.bufferIndexWithByBuffer = bufferIndexWithByBuffer;
function bufferIndexWith(buf, value, byteOffset, encoding) {
    if (typeof value === 'number') {
        return buf[byteOffset] === value;
    }
    let i = buf.indexOf(value, byteOffset, encoding);
    return i !== -1 && i === byteOffset;
}
exports.bufferIndexWith = bufferIndexWith;
function splitBufferByBuffer(buffer, value) {
    const lines = [];
    let bufferPosition = 0;
    let lastNewLineBufferPosition = 0;
    while (true) {
        let line;
        let bufferPositionValue = buffer[bufferPosition];
        if (bufferIndexWithByBuffer(buffer, value, bufferPosition++)) {
            line = buffer.slice(lastNewLineBufferPosition, bufferPosition += (value.length - 1));
            lines.push(line);
            lastNewLineBufferPosition = bufferPosition;
        }
        else if (bufferPositionValue === undefined) {
            break;
        }
    }
    let leftovers = buffer.slice(lastNewLineBufferPosition, bufferPosition);
    if (leftovers.length) {
        lines.push(leftovers);
    }
    return lines;
}
exports.splitBufferByBuffer = splitBufferByBuffer;
//# sourceMappingURL=util.js.map