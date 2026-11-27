"use strict";

var e = require("fs"), t = require("@lazy-node/util-buffer");

function handleOptionNewLineCharacter(e) {
  if (!e) return [ i.LF ];
  if ("number" != typeof e) {
    const t = [];
    for (let i = 0; i < e.length; i++) {
      const n = e[i];
      t.push("number" != typeof n ? n.charCodeAt(0) : n);
    }
    return t;
  }
  return [ e ];
}

let i = /*#__PURE__*/ function(e) {
  return e[e.LF = 10] = "LF", e[e.CR = 13] = "CR", e;
}({});

class LineByLine {
  #e;
  #t;
  #i;
  #n;
  #r;
  #h;
  #s;
  #a;
  #f=-1;
  constructor(e, t) {
    let {readChunk: i, newLineCharacter: n} = t = t || {};
    if (i || (i = 1024), this.#e = e, this.#i = t, this.#n = Buffer.from(handleOptionNewLineCharacter(n)), 
    this.#a = i, this.#n.length <= 0) throw new TypeError("newLineCharacter should have length > 0");
    this._open(), this.reset();
  }
  _open() {
    "number" == typeof this.#e ? this.#t = this.#e : this.#t = e.openSync(this.#e, "r");
  }
  get file() {
    return this.#e;
  }
  get fd() {
    return this.#t;
  }
  get options() {
    return this.#i;
  }
  get fdPosition() {
    return this.#s;
  }
  get newLineCharacter() {
    return this.#n;
  }
  get eofReached() {
    return this.#r;
  }
  get lineNumber() {
    return this.#f;
  }
  reset() {
    this.#r = !1, this.#h = [], this.#s = 0, this.#f = -1;
  }
  close() {
    this.#t && e.closeSync(this.#t), this.#t = null;
  }
  _extractLines(e) {
    return t.splitBufferByBuffer(e, this.#n);
  }
  _readChunk(t) {
    let i, n = 0;
    const r = [];
    do {
      const t = Buffer.alloc(this.#a);
      i = e.readSync(this.#t, t, 0, this.#a, this.#s), n += i, this.#s = this.#s + i, 
      r.push(t);
    } while (i && -1 === r[r.length - 1].indexOf(this.#n));
    let h = Buffer.concat(r);
    return i < this.#a && (this.#r = !0, h = h.slice(0, n)), n && (this.#h = this._extractLines(h), 
    t && (this.#h[0] = Buffer.concat([ t, this.#h[0] ]))), n;
  }
  next() {
    if (!this.#t || this.#r && 0 === this.#h.length) return;
    let e, i;
    return this.#h.length || (i = this._readChunk()), this.#h.length && (e = this.#h.shift(), 
    t.bufferEndWithByBuffer(e, this.#n) || (i = this._readChunk(e), i && (e = this.#h.shift()))), 
    this.#r && 0 === this.#h.length && this.close(), e && (e = t.bufferStripEndWithByBuffer(e, this.#n, 0 - this.#n.length)), 
    this.#f++, e;
  }
  * generator() {
    let e;
    for (;e = this.next(); ) yield e;
  }
  static * generator(e, t) {
    const i = new this(e, t);
    yield* i.generator();
  }
}

Object.defineProperty(LineByLine, "__esModule", {
  value: !0
}), Object.defineProperty(LineByLine, "LineByLine", {
  value: LineByLine
}), Object.defineProperty(LineByLine, "default", {
  value: LineByLine
}), Object.defineProperty(LineByLine, "handleOptionNewLineCharacter", {
  value: handleOptionNewLineCharacter
}), Object.defineProperty(LineByLine, "EnumNewLineCharacter", {
  value: i
}), module.exports = LineByLine;
//# sourceMappingURL=index.cjs.production.min.cjs.map
