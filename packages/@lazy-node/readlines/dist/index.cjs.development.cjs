'use strict';

var fs = require('fs');
var utilBuffer = require('@lazy-node/util-buffer');

/**
 * 處理換行字元選項，將各種輸入格式轉換為位元組陣列
 * Process new line character option, converting various input formats to byte array
 *
 * @param {INewLineCharacter} [newLineCharacter] - 換行字元設定 / New line character configuration
 * @returns {number[]} 換行字元的位元組陣列 / Byte array of new line characters
 */
function handleOptionNewLineCharacter(newLineCharacter) {
  if (!newLineCharacter) {
    return [10 /* EnumNewLineCharacter.LF */];
  } else if (typeof newLineCharacter !== 'number') {
    const ls = [];
    for (let i = 0; i < newLineCharacter.length; i++) {
      const c = newLineCharacter[i];
      if (typeof c !== 'number') {
        ls.push(c.charCodeAt(0));
      } else {
        ls.push(c);
      }
    }
    return ls;
  }
  return [newLineCharacter];
}

var EnumNewLineCharacter;
(function (EnumNewLineCharacter) {
  EnumNewLineCharacter[EnumNewLineCharacter["LF"] = 10] = "LF";
  EnumNewLineCharacter[EnumNewLineCharacter["CR"] = 13] = "CR";
})(EnumNewLineCharacter || (EnumNewLineCharacter = {}));
class LineByLine {
  #file;
  #fd;
  #options;
  #newLineCharacter;
  #eofReached;
  #linesCache;
  #fdPosition;
  #readChunk;
  #lineNumber = -1;
  /**
   * 建立逐行讀取器實例
   * Create a line by line reader instance
   *
   * @param {IPathLike} file - 檔案路徑或檔案描述符 / File path or file descriptor
   * @param {IOptions} [options] - 讀取選項 / Read options
   */
  constructor(file, options) {
    let {
      readChunk,
      newLineCharacter
    } = options = options || {};
    if (!readChunk) readChunk = 1024;
    this.#file = file;
    this.#options = options;
    this.#newLineCharacter = Buffer.from(handleOptionNewLineCharacter(newLineCharacter));
    this.#readChunk = readChunk;
    if (this.#newLineCharacter.length <= 0) {
      throw new TypeError(`newLineCharacter should have length > 0`);
    }
    this._open();
    this.reset();
  }
  /**
   * 開啟檔案並取得檔案描述符
   * Open file and obtain file descriptor
   * @protected
   */
  _open() {
    if (typeof this.#file === 'number') {
      this.#fd = this.#file;
    } else {
      this.#fd = fs.openSync(this.#file, 'r');
    }
  }
  get file() {
    return this.#file;
  }
  get fd() {
    return this.#fd;
  }
  get options() {
    return this.#options;
  }
  get fdPosition() {
    return this.#fdPosition;
  }
  get newLineCharacter() {
    return this.#newLineCharacter;
  }
  get eofReached() {
    return this.#eofReached;
  }
  get lineNumber() {
    return this.#lineNumber;
  }
  reset() {
    this.#eofReached = false;
    this.#linesCache = [];
    this.#fdPosition = 0;
    this.#lineNumber = -1;
  }
  close() {
    this.#fd && fs.closeSync(this.#fd);
    this.#fd = null;
  }
  /**
   * 從 Buffer 中提取行資料
   * Extract line data from buffer
   *
   * @param {Buffer} buffer - 原始 Buffer 資料 / Raw buffer data
   * @returns {Buffer[]} 分割後的行資料陣列 / Array of line data buffers
   * @protected
   */
  _extractLines(buffer) {
    return utilBuffer.splitBufferByBuffer(buffer, this.#newLineCharacter);
  }
  /**
   * 讀取一個區塊的資料並解析出行資料
   * Read a chunk of data and parse line data
   *
   * @param {Buffer} [lineLeftovers] - 上一區塊剩餘的未完整行資料 / Incomplete line data from previous chunk
   * @returns {number} 實際讀取的位元組數 / Number of bytes actually read
   * @protected
   */
  _readChunk(lineLeftovers) {
    let totalBytesRead = 0;
    let bytesRead;
    const buffers = [];
    do {
      const readBuffer = Buffer.alloc(this.#readChunk);
      bytesRead = fs.readSync(this.#fd, readBuffer, 0, this.#readChunk, this.#fdPosition);
      totalBytesRead = totalBytesRead + bytesRead;
      this.#fdPosition = this.#fdPosition + bytesRead;
      buffers.push(readBuffer);
    } while (bytesRead && buffers[buffers.length - 1].indexOf(this.#newLineCharacter) === -1);
    let bufferData = Buffer.concat(buffers);
    if (bytesRead < this.#readChunk) {
      this.#eofReached = true;
      bufferData = bufferData.slice(0, totalBytesRead);
    }
    if (totalBytesRead) {
      this.#linesCache = this._extractLines(bufferData);
      if (lineLeftovers) {
        this.#linesCache[0] = Buffer.concat([lineLeftovers, this.#linesCache[0]]);
      }
    }
    return totalBytesRead;
  }
  /**
   * 讀取下一行資料
   * Read next line data
   *
   * @returns {Buffer | undefined} 行資料 Buffer，若已到結尾則回傳 undefined / Line data buffer, returns undefined if end is reached
   */
  next() {
    if (!this.#fd || this.#eofReached && this.#linesCache.length === 0) {
      return;
    }
    let line;
    let bytesRead;
    if (!this.#linesCache.length) {
      bytesRead = this._readChunk();
    }
    if (this.#linesCache.length) {
      line = this.#linesCache.shift();
      if (!utilBuffer.bufferEndWithByBuffer(line, this.#newLineCharacter)) {
        bytesRead = this._readChunk(line);
        if (bytesRead) {
          line = this.#linesCache.shift();
        }
      }
    }
    if (this.#eofReached && this.#linesCache.length === 0) {
      this.close();
    }
    if (line) {
      line = utilBuffer.bufferStripEndWithByBuffer(line, this.#newLineCharacter, 0 - this.#newLineCharacter.length);
    }
    this.#lineNumber++;
    return line;
  }
  /**
   * 產生器函式，迭代讀取所有行
   * Generator function to iterate through all lines
   *
   * @returns {Generator<Buffer>} 行資料產生器 / Line data generator
   */
  *generator() {
    let line;
    while (line = this.next()) {
      yield line;
    }
  }
  /**
   * 靜態產生器函式，建立實例並迭代讀取所有行
   * Static generator function to create instance and iterate through all lines
   *
   * @param {IPathLike} file - 檔案路徑或檔案描述符 / File path or file descriptor
   * @param {IOptions} [options] - 讀取選項 / Read options
   * @returns {Generator<Buffer>} 行資料產生器 / Line data generator
   */
  static *generator(file, options) {
    const liner = new this(file, options);
    yield* liner.generator();
  }
}
// @ts-ignore
{
  Object.defineProperty(LineByLine, "__esModule", {
    value: true
  });
  Object.defineProperty(LineByLine, 'LineByLine', {
    value: LineByLine
  });
  Object.defineProperty(LineByLine, 'default', {
    value: LineByLine
  });
  Object.defineProperty(LineByLine, "handleOptionNewLineCharacter", {
    value: handleOptionNewLineCharacter
  });
  // @ts-ignore
  Object.defineProperty(LineByLine, "EnumNewLineCharacter", {
    value: EnumNewLineCharacter
  });
}

// @ts-ignore
module.exports = LineByLine;
//# sourceMappingURL=index.cjs.development.cjs.map
