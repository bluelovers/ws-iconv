import { openSync as e, closeSync as t, readSync as i } from "fs";

import { splitBufferByBuffer as n, bufferEndWithByBuffer as h, bufferStripEndWithByBuffer as r } from "@lazy-node/util-buffer";

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

var s;

!function(e) {
  e[e.LF = 10] = "LF", e[e.CR = 13] = "CR";
}(s || (s = {}));

class LineByLine {
  #e;
  #t;
  #i;
  #n;
  #h;
  #r;
  #s;
  #a;
  #o=-1;
  constructor(e, t) {
    let {readChunk: i, newLineCharacter: n} = t = t || {};
    if (i || (i = 1024), this.#e = e, this.#i = t, this.#n = Buffer.from(handleOptionNewLineCharacter(n)), 
    this.#a = i, this.#n.length <= 0) throw new TypeError("newLineCharacter should have length > 0");
    this._open(), this.reset();
  }
  _open() {
    "number" == typeof this.#e ? this.#t = this.#e : this.#t = e(this.#e, "r");
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
    return this.#h;
  }
  get lineNumber() {
    return this.#o;
  }
  reset() {
    this.#h = !1, this.#r = [], this.#s = 0, this.#o = -1;
  }
  close() {
    this.#t && t(this.#t), this.#t = null;
  }
  _extractLines(e) {
    return n(e, this.#n);
  }
  _readChunk(e) {
    let t, n = 0;
    const h = [];
    do {
      const e = Buffer.alloc(this.#a);
      t = i(this.#t, e, 0, this.#a, this.#s), n += t, this.#s = this.#s + t, h.push(e);
    } while (t && -1 === h[h.length - 1].indexOf(this.#n));
    let r = Buffer.concat(h);
    return t < this.#a && (this.#h = !0, r = r.slice(0, n)), n && (this.#r = this._extractLines(r), 
    e && (this.#r[0] = Buffer.concat([ e, this.#r[0] ]))), n;
  }
  next() {
    if (!this.#t || this.#h && 0 === this.#r.length) return;
    let e, t;
    return this.#r.length || (t = this._readChunk()), this.#r.length && (e = this.#r.shift(), 
    h(e, this.#n) || (t = this._readChunk(e), t && (e = this.#r.shift()))), this.#h && 0 === this.#r.length && this.close(), 
    e && (e = r(e, this.#n, 0 - this.#n.length)), this.#o++, e;
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

export { s as EnumNewLineCharacter, LineByLine, LineByLine as default, handleOptionNewLineCharacter };
//# sourceMappingURL=index.esm.mjs.map
