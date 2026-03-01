'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 獲取值的長度
 *
 * @description 計算輸入值的位元組長度，數字類型固定為 1
 * @param {IBufferValueInput} value 要計算長度的值
 * @returns {number} 值的長度
 */
function _valueLength(value) {
  return typeof value === 'number' ? 1 : value.length;
}
/**
 * 在 Buffer 中尋找最後出現的位置
 *
 * @description 使用 lastIndexOf 方法尋找指定值在 Buffer 中最後出現的位置
 * @param {Buffer} buf 要搜尋的 Buffer
 * @param {IBufferValueInput} value 要尋找的值
 * @param {number} [byteOffset] 搜尋的起始位置
 * @param {BufferEncoding} [encoding] 字串編碼格式
 * @returns {{len: number, i: number}} 包含長度和索引的物件
 */
function _bufferLastIndexOf(buf, value, byteOffset, encoding) {
  const len = _valueLength(value);
  const i = buf.lastIndexOf(value, byteOffset !== null && byteOffset !== void 0 ? byteOffset : 0 - len, encoding);
  return {
    len,
    i
  };
}
/**
 * 檢查 Buffer 是否以指定值結尾
 *
 * @description 判斷 Buffer 是否在指定位置以給定值結尾
 * @param {any[] | Uint8Array | Buffer} buf 要檢查的 Buffer
 * @param {number} i 索引位置
 * @param {number} len 長度
 * @returns {buf is Uint8Array | Buffer} 是否以指定值結尾
 */
function _endWith(buf, i, len) {
  return i !== -1 && i + len === buf.length;
}
/**
 * 檢查索引是否匹配指定位置
 *
 * @description 判斷索引是否等於指定的位移位置
 * @param {number} i 索引位置
 * @param {number} byteOffset 位移位置
 * @returns {boolean} 是否匹配
 */
function _indexWith(i, byteOffset) {
  return i !== -1 && i === byteOffset;
}
/**
 * 檢查 Buffer 是否以指定值結尾
 *
 * @description 判斷 Buffer 是否以給定的值結尾
 * @param {Buffer} buf 要檢查的 Buffer
 * @param {IBufferValueInput} value 要檢查的值
 * @param {number} [byteOffset] 搜尋的起始位置
 * @param {BufferEncoding} [encoding] 字串編碼格式
 * @returns {boolean} 是否以指定值結尾
 */
function bufferEndWith(buf, value, byteOffset, encoding) {
  const {
    len,
    i
  } = _bufferLastIndexOf(buf, value, byteOffset, encoding);
  return _endWith(buf, i, len);
}
/**
 * 移除 Buffer 結尾的指定值
 *
 * @description 如果 Buffer 以指定值結尾，則移除該值
 * @param {Buffer} buf 要處理的 Buffer
 * @param {IBufferValueInput} value 要移除的值
 * @param {number} [byteOffset] 搜尋的起始位置
 * @param {BufferEncoding} [encoding] 字串編碼格式
 * @returns {Buffer} 處理後的 Buffer
 */
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
/**
 * 檢查 Buffer 是否在指定位置包含指定值
 *
 * @description 判斷 Buffer 在給定位置是否包含指定的值
 * @param {Buffer} buf 要檢查的 Buffer
 * @param {IBufferValueInput} value 要尋找的值
 * @param {number} byteOffset 搜尋的起始位置
 * @param {BufferEncoding} [encoding] 字串編碼格式
 * @returns {boolean} 是否在指定位置找到值
 */
function bufferIndexWith(buf, value, byteOffset, encoding) {
  const i = buf.indexOf(value, byteOffset, encoding);
  return _indexWith(i, byteOffset);
}
/**
 * 根據指定值分割 Buffer
 *
 * @description 將 Buffer 按照給定的分隔值進行分割，返回分割後的 Buffer 陣列
 * @param {Buffer} buffer 要分割的 Buffer
 * @param {Uint8Array} value 分隔值
 * @returns {Buffer[]} 分割後的 Buffer 陣列
 */
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
