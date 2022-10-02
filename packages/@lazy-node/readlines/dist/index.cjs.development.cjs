'use strict';

var fs = require('fs');
var utilBuffer = require('@lazy-node/util-buffer');

function handleOptionNewLineCharacter(newLineCharacter) {
  if (!newLineCharacter) {
    return [10];
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

  _extractLines(buffer) {
    return utilBuffer.splitBufferByBuffer(buffer, this.#newLineCharacter);
  }

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

  static LineByLine = LineByLine;
  static default = LineByLine;
}
Object.defineProperty(LineByLine, "__esModule", {
  value: true
});
Object.defineProperty(LineByLine, "handleOptionNewLineCharacter", {
  value: handleOptionNewLineCharacter
});
Object.defineProperty(LineByLine, "EnumNewLineCharacter", {
  value: EnumNewLineCharacter
});

module.exports = LineByLine;
//# sourceMappingURL=index.cjs.development.cjs.map
