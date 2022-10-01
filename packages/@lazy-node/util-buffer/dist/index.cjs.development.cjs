'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _valueLength(value) {
  return typeof value === 'number' ? 1 : value.length;
}
function _bufferLastIndexOf(buf, value, byteOffset, encoding) {
  const len = _valueLength(value);

  const i = buf.lastIndexOf(value, byteOffset !== null && byteOffset !== void 0 ? byteOffset : 0 - len, encoding);
  return {
    len,
    i
  };
}
function _endWith(buf, i, len) {
  return i !== -1 && i + len === buf.length;
}
function _indexWith(i, byteOffset) {
  return i !== -1 && i === byteOffset;
}
function bufferEndWith(buf, value, byteOffset, encoding) {
  const {
    len,
    i
  } = _bufferLastIndexOf(buf, value, byteOffset, encoding);

  return _endWith(buf, i, len);
}
function bufferStripEndWith(buf, value, byteOffset, encoding) {
  const {
    len,
    i
  } = _bufferLastIndexOf(buf, value, byteOffset, encoding);

  if (_endWith(buf, i, len)) {
    return buf.subarray(0, i);
  }

  return buf;
}
function bufferIndexWith(buf, value, byteOffset, encoding) {
  const i = buf.indexOf(value, byteOffset, encoding);
  return _indexWith(i, byteOffset);
}
function splitBufferByBuffer(buffer, value) {
  const len = _valueLength(value);

  const lines = [];
  let bufferPosition = 0;
  let lastNewLineBufferPosition = 0;

  while (true) {
    let line;
    const bufferPositionValue = buffer[bufferPosition];

    if (bufferIndexWith(buffer, value, bufferPosition++)) {
      line = buffer.subarray(lastNewLineBufferPosition, bufferPosition += len - 1);
      lines.push(line);
      lastNewLineBufferPosition = bufferPosition;
    } else if (bufferPositionValue === void 0) {
      break;
    }
  }

  const leftovers = buffer.subarray(lastNewLineBufferPosition, bufferPosition);

  if (leftovers.length) {
    lines.push(leftovers);
  }

  return lines;
}

exports._bufferLastIndexOf = _bufferLastIndexOf;
exports._endWith = _endWith;
exports._indexWith = _indexWith;
exports._valueLength = _valueLength;
exports.bufferEndWith = bufferEndWith;
exports.bufferEndWithByBuffer = bufferEndWith;
exports.bufferIndexWith = bufferIndexWith;
exports.bufferIndexWithByBuffer = bufferIndexWith;
exports.bufferStripEndWith = bufferStripEndWith;
exports.bufferStripEndWithByBuffer = bufferStripEndWith;
exports.splitBufferByBuffer = splitBufferByBuffer;
//# sourceMappingURL=index.cjs.development.cjs.map
