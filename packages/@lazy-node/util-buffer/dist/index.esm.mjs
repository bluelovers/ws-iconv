function _valueLength(e) {
  return "number" == typeof e ? 1 : e.length;
}

function _bufferLastIndexOf(e, n, f, t) {
  const r = _valueLength(n);
  return {
    len: r,
    i: e.lastIndexOf(n, null != f ? f : 0 - r, t)
  };
}

function _endWith(e, n, f) {
  return -1 !== n && n + f === e.length;
}

function _indexWith(e, n) {
  return -1 !== e && e === n;
}

function bufferEndWith(e, n, f, t) {
  const {len: r, i: u} = _bufferLastIndexOf(e, n, f, t);
  return _endWith(e, u, r);
}

function bufferStripEndWith(e, n, f, t) {
  const {len: r, i: u} = _bufferLastIndexOf(e, n, f, t);
  return _endWith(e, u, r) ? e.subarray(0, u) : e;
}

function bufferIndexWith(e, n, f, t) {
  return _indexWith(e.indexOf(n, f, t), f);
}

function splitBufferByBuffer(e, n) {
  const f = _valueLength(n), t = [];
  let r = 0, u = 0;
  for (;;) {
    let i;
    const h = e[r];
    if (bufferIndexWith(e, n, r++)) i = e.subarray(u, r += f - 1), t.push(i), u = r; else if (void 0 === h) break;
  }
  const i = e.subarray(u, r);
  return i.length && t.push(i), t;
}

export { _bufferLastIndexOf, _endWith, _indexWith, _valueLength, bufferEndWith, bufferEndWith as bufferEndWithByBuffer, bufferIndexWith, bufferIndexWith as bufferIndexWithByBuffer, bufferStripEndWith, bufferStripEndWith as bufferStripEndWithByBuffer, splitBufferByBuffer };
//# sourceMappingURL=index.esm.mjs.map
