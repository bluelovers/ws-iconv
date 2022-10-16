"use strict";

var e, t = require("fs"), i = require("@lazy-node/util-buffer");

function handleOptionNewLineCharacter(e) {
  if (!e) return [ 10 ];
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

!function(e) {
  e[e.LF = 10] = "LF", e[e.CR = 13] = "CR";
}(e || (e = {}));

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
    "number" == typeof this.#e ? this.#t = this.#e : this.#t = t.openSync(this.#e, "r");
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
    this.#t && t.closeSync(this.#t), this.#t = null;
  }
  _extractLines(e) {
    return i.splitBufferByBuffer(e, this.#n);
  }
  _readChunk(e) {
    let i, n = 0;
    const r = [];
    do {
      const e = Buffer.alloc(this.#a);
      i = t.readSync(this.#t, e, 0, this.#a, this.#s), n += i, this.#s = this.#s + i, 
      r.push(e);
    } while (i && -1 === r[r.length - 1].indexOf(this.#n));
    let h = Buffer.concat(r);
    return i < this.#a && (this.#r = !0, h = h.slice(0, n)), n && (this.#h = this._extractLines(h), 
    e && (this.#h[0] = Buffer.concat([ e, this.#h[0] ]))), n;
  }
  next() {
    if (!this.#t || this.#r && 0 === this.#h.length) return;
    let e, t;
    return this.#h.length || (t = this._readChunk()), this.#h.length && (e = this.#h.shift(), 
    i.bufferEndWithByBuffer(e, this.#n) || (t = this._readChunk(e), t && (e = this.#h.shift()))), 
    this.#r && 0 === this.#h.length && this.close(), e && (e = i.bufferStripEndWithByBuffer(e, this.#n, 0 - this.#n.length)), 
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
  value: e
}), module.exports = LineByLine;
//# sourceMappingURL=index.cjs.production.min.cjs.map
