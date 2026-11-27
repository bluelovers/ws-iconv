"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

let e = /*#__PURE__*/ function(e) {
  return e.none = "none", e.roundTrip = "round-trip", e.gapFill = "gap-fill", e;
}({});

const t = /*#__PURE__*/ new Map([ [ 0x20AC, 0x80 ], [ 0x201A, 0x82 ], [ 0x0192, 0x83 ], [ 0x201E, 0x84 ], [ 0x2026, 0x85 ], [ 0x2020, 0x86 ], [ 0x2021, 0x87 ], [ 0x02C6, 0x88 ], [ 0x2030, 0x89 ], [ 0x0160, 0x8A ], [ 0x2039, 0x8B ], [ 0x0152, 0x8C ], [ 0x017D, 0x8E ], [ 0x2018, 0x91 ], [ 0x2019, 0x92 ], [ 0x201C, 0x93 ], [ 0x201D, 0x94 ], [ 0x2022, 0x95 ], [ 0x2013, 0x96 ], [ 0x2014, 0x97 ], [ 0x02DC, 0x98 ], [ 0x2122, 0x99 ], [ 0x0161, 0x9A ], [ 0x203A, 0x9B ], [ 0x0153, 0x9C ], [ 0x017E, 0x9E ], [ 0x0178, 0x9F ] ]), n = /*#__PURE__*/ new Set(/*#__PURE__*/ Array.from("的一是了人我不在有他這这中大來来上國国個个到說说們们為为子和你地出道也時时年得就那要下以生會会自著着去之過过家學学對对她她裡里後后小天心多好都然沒没日於于起發发成事只作當当想看文無无開开手十用主行明經经頭头方又如前所本見见長长間门問问理月半安點点實实內内全表機机太海車车白兒儿爭争北才領领切呢活爾尔反特許许建先像做女真写東东業业電話电话攝影摄影撮影動画动画音楽音乐風景风景美人美女世界日本中国時間时间写真集電車电车新幹線天気天气料理会社学生先生機場机场感謝谢谢")), o = [ "写真", "写真集", "撮影", "東京", "东京", "日本", "中国", "世界", "美人", "美女", "風景", "风景", "人物", "動画", "动画", "音樂", "音乐", "時間", "时间", "電話", "电话", "電車", "电车", "新幹線", "新干线", "天気", "天气", "料理", "会社", "学生", "先生", "機場", "机场", "ありがとう", "こんにちは", "おはよう", "すみません", "撮影会" ], r = /*#__PURE__*/ new TextDecoder("utf-8", {
  fatal: !0
});

function _charToByte(e) {
  const n = e.codePointAt(0);
  if (void 0 === n) return null;
  if (n <= 0xFF) return n;
  const o = t.get(n);
  return void 0 === o ? null : o;
}

function _strictDecodeUtf8(e) {
  try {
    return r.decode(Uint8Array.from(e));
  } catch {
    return null;
  }
}

function _lineToBytes(e) {
  const t = [];
  for (const n of e) {
    const e = _charToByte(n);
    if (null === e) return null;
    t.push(e);
  }
  return t;
}

function _hasMojibakeMarker(e) {
  for (const o of e) {
    var n;
    const e = null !== (n = o.codePointAt(0)) && void 0 !== n ? n : 0;
    if (e >= 0x80 && e <= 0x9F) return !0;
    if (e > 0xFF && t.has(e)) return !0;
  }
  return !1;
}

function _isLeadLike(e) {
  return e >= 0xC2 && e <= 0xF4;
}

function _hasLeadContAdjacency(e) {
  for (let t = 0; t + 1 < e.length; t++) if (_isLeadLike(e[t]) && e[t + 1] >= 0xA0 && e[t + 1] <= 0xBF) return !0;
  return !1;
}

function _countDistinctLeadLike(e) {
  const t = new Set;
  for (const n of e) _isLeadLike(n) && t.add(n);
  return t.size;
}

function _detectGaps(e) {
  const t = [];
  let n = 0;
  for (;n < e.length; ) {
    const o = e[n];
    if (o < 0x80) {
      n++;
      continue;
    }
    let r = 0;
    if (o >= 0xC2 && o <= 0xDF) r = 1; else if (o >= 0xE0 && o <= 0xEF) r = 2; else {
      if (!(o >= 0xF0 && o <= 0xF4)) return null;
      r = 3;
    }
    const i = [];
    let s = n + 1;
    for (;s < e.length && e[s] >= 0x80 && e[s] <= 0xBF; ) i.push(e[s]), s++;
    if (i.length > r) return null;
    if (i.length < r) {
      if (1 === r) return null;
      t.push({
        index: n,
        lead: o,
        needed: r,
        present: i
      });
    }
    n = s;
  }
  return t;
}

function _charScore(e) {
  return e >= 0x3040 && e <= 0x30FF ? 3 : e >= 0x3000 && e <= 0x303F ? 2 : e >= 0x4E00 && e <= 0x9FFF ? n.has(String.fromCodePoint(e)) ? 4 : 1 : e >= 0x3400 && e <= 0x4DBF ? 1 : e >= 0xFF00 && e <= 0xFFEF ? 2 : e >= 0x2000 && e <= 0x206F ? "–—‘’“”…‰‡".includes(String.fromCodePoint(e)) ? 3 : 1 : e >= 0x20A0 && e <= 0x20BF ? 2 : 0;
}

function _codePointFrom(e, t) {
  let n = e & (e >= 0xF0 ? 0x07 : 0x0F);
  for (const e of t) n = n << 6 | 0x3F & e;
  return n;
}

function _contsFromCodePoint(e) {
  return e < 0x800 || e > 0xFFFF ? null : [ 0x80 | e >> 6 & 0x3F, 0x80 | 0x3F & e ];
}

function _leadFromCodePoint(e) {
  return e < 0x800 ? 0xC0 | e >> 6 : e <= 0xFFFF ? 0xE0 | e >> 12 : 0xF0 | e >> 18;
}

function _wordCandidateFits(e, t) {
  if (_leadFromCodePoint(t) !== e.lead) return !1;
  const n = _contsFromCodePoint(t);
  if (null === n || n.length !== e.needed) return !1;
  const o = [ ...e.present ];
  for (const e of n) {
    const t = o.indexOf(e);
    if (t >= 0) o.splice(t, 1); else if (e < 128 || e > 159) return !1;
  }
  return 0 === o.length;
}

function _enumerateGapCandidates(e) {
  const t = e.present, n = [], o = new Set, r = [], chooseSlots = (t, n, o) => {
    if (0 !== n) for (let r = t; r + n - 1 < e.needed; r++) chooseSlots(r + 1, n - 1, [ ...o, r ]); else r.push([ ...o ]);
  };
  chooseSlots(0, t.length, []);
  for (const i of r) {
    const r = new Map;
    i.forEach((e, n) => r.set(e, t[n]));
    const s = [];
    for (let t = 0; t < e.needed; t++) r.has(t) || s.push(t);
    const l = Math.pow(32, s.length);
    for (let t = 0; t < l; t++) {
      const i = [];
      let l = t;
      for (let t = 0; t < e.needed; t++) if (r.has(t)) i.push(r.get(t)); else {
        const e = s.indexOf(t), n = Math.pow(32, s.length - 1 - e);
        i.push(128 + Math.floor(l / n)), l %= n;
      }
      const c = _codePointFrom(e.lead, i);
      if (c >= 0xD800 && c <= 0xDFFF) continue;
      const u = _charScore(c);
      if (u <= 0) continue;
      const a = String.fromCodePoint(c);
      o.has(a) || (o.add(a), n.push({
        conts: i,
        char: a,
        score: u
      }));
    }
  }
  return n.sort((e, t) => t.score - e.score), n.slice(0, 48);
}

function _buildPrefixBytes(e, t, n, o, r) {
  const i = [];
  let s = 0;
  for (let r = 0; r < o; r++) {
    var l;
    const o = t[r];
    i.push(...e.slice(s, o.index + 1)), i.push(...null !== (l = n[r]) && void 0 !== l ? l : o.present), 
    s = o.index + 1 + o.present.length;
  }
  return r && i.push(...e.slice(s)), i;
}

function _wordBonus(e) {
  let t = 0;
  for (const n of o) {
    let o = 0;
    for (;;) {
      const r = e.indexOf(n, o);
      if (r < 0) break;
      t++, o = r + n.length;
    }
  }
  return t;
}

function _beamFill(e, t, n) {
  const o = t.map(e => _enumerateGapCandidates(e));
  let r = -1;
  for (let e = 0; e <= t.length; e++) e < t.length && r >= 0 && t[e].index === t[e - 1].index + 1 + t[e - 1].present.length || (r >= 0 && e - r >= 2 && _applyWordRescue(t, o, r, e), 
  r = e < t.length ? e : -1);
  let i = [ {
    fills: [],
    prefix: "",
    score: 0
  } ];
  for (let n = 0; n < t.length; n++) {
    if (0 === o[n].length) return null;
    const r = [];
    for (const s of i) for (const i of o[n]) {
      const o = [ ...s.fills, i.conts ], l = _strictDecodeUtf8(_buildPrefixBytes(e, t, o, n + 1, !1));
      null !== l && r.push({
        fills: o,
        prefix: l,
        score: s.score + i.score + 5 * _wordBonus(l)
      });
    }
    if (r.sort((e, t) => t.score - e.score), i = r.slice(0, 8), 0 === i.length) return null;
  }
  const s = _strictDecodeUtf8(_buildPrefixBytes(e, t, i[0].fills, t.length, !0));
  return null === s ? null : _repairGapFilledOutput(s, n) ? s : null;
}

function _applyWordRescue(e, t, n, r) {
  const i = r - n;
  for (const r of o) {
    const o = Array.from(r);
    if (!(o.length < 2 || o.length > i)) for (let r = 0; r + o.length <= i; r++) for (let i = 0; i < o.length; i++) {
      var s;
      const l = e[n + r + i], c = null !== (s = o[i].codePointAt(0)) && void 0 !== s ? s : 0;
      if (!_wordCandidateFits(l, c)) continue;
      const u = _contsFromCodePoint(c);
      if (null === u) continue;
      const a = _charScore(c);
      if (a <= 0) continue;
      const d = t[n + r + i];
      d.some(e => e.char === o[i]) || d.push({
        conts: u,
        char: o[i],
        score: a + 6
      });
    }
  }
}

function _repairGapFilledOutput(e, t) {
  let n = 0;
  for (const t of e) {
    var o;
    const e = null !== (o = t.codePointAt(0)) && void 0 !== o ? o : 0;
    if (e >= 0x80 && e <= 0x9F) return !1;
    (e >= 0x3000 && e <= 0x30FF || e >= 0x4E00 && e <= 0x9FFF) && n++;
  }
  return 0 === n ? t : n >= 2 && _wordBonus(e) >= 1;
}

function _repairRoundTripOutput(e, n) {
  if (n === e) return !1;
  let o = !1, r = !1;
  for (const n of e) {
    var i;
    const e = null !== (i = n.codePointAt(0)) && void 0 !== i ? i : 0;
    if (e >= 0x80 && e <= 0x9F || e > 0xFF && t.has(e) || 0xC3 === e) {
      o = !0;
      break;
    }
  }
  for (const e of n) {
    var s;
    const t = null !== (s = e.codePointAt(0)) && void 0 !== s ? s : 0;
    if (t >= 0x3000 && t <= 0x30FF || t >= 0x4E00 && t <= 0x9FFF) {
      r = !0;
      break;
    }
  }
  return o || r;
}

function _repairRunSegment(t) {
  const n = _lineToBytes(t);
  if (null === n) return null;
  const o = _hasMojibakeMarker(t), r = _strictDecodeUtf8(n);
  if (null !== r && _repairRoundTripOutput(t, r)) return {
    text: r,
    method: e.roundTrip,
    confidence: o ? 0.95 : 0.8
  };
  if (!(o || _hasLeadContAdjacency(n) || _countDistinctLeadLike(n) >= 2)) return null;
  const i = _detectGaps(n);
  if (null === i || 0 === i.length) return null;
  const s = _beamFill(n, i, o);
  if (null === s) return null;
  const l = Math.min(0.8, Math.max(0.1, 0.35 + 0.15 * _wordBonus(s) - 0.03 * Math.max(0, i.length - 1)));
  return {
    text: s,
    method: e.gapFill,
    confidence: l
  };
}

function _repairRunWithSpecialBoundaries(t) {
  const n = [], o = [];
  let r = "";
  const flush = () => {
    if ("" === r) return;
    const e = _repairRunSegment(r);
    null === e ? n.push(r) : (o.push(e), n.push(e.text)), r = "";
  };
  for (const e of t) {
    var i;
    (null !== (i = e.codePointAt(0)) && void 0 !== i ? i : 0) > 0xFF ? (flush(), n.push(e)) : r += e;
  }
  return flush(), 0 === o.length ? null : {
    text: n.join(""),
    method: o.some(t => t.method === e.gapFill) ? e.gapFill : e.roundTrip,
    confidence: Math.min(...o.map(e => e.confidence))
  };
}

function _repairLine(t) {
  let n = !1;
  for (const e of t) {
    var o;
    if ((null !== (o = e.codePointAt(0)) && void 0 !== o ? o : 0) > 0x7F) {
      n = !0;
      break;
    }
  }
  if (!n) return null;
  const r = _repairRunSegment(t);
  if (null !== r) return r;
  const i = [], s = [];
  let l = "";
  const flush = () => {
    var e;
    if ("" === l) return;
    const t = null !== (e = _repairRunSegment(l)) && void 0 !== e ? e : _repairRunWithSpecialBoundaries(l);
    null === t ? i.push(l) : (s.push(t), i.push(t.text)), l = "";
  };
  for (const e of t) null === _charToByte(e) ? (flush(), i.push(e)) : l += e;
  return flush(), 0 === s.length ? null : {
    text: i.join(""),
    method: s.some(t => t.method === e.gapFill) ? e.gapFill : e.roundTrip,
    confidence: Math.min(...s.map(e => e.confidence))
  };
}

function repairMojibake(t) {
  const n = t.split("\n"), o = [];
  let r = !1, i = e.none, s = 1;
  for (const t of n) {
    const n = _repairLine(t);
    null !== n ? (r = !0, o.push(n.text), i = e.gapFill === n.method ? e.gapFill : i === e.none ? n.method : i, 
    s = Math.min(s, n.confidence)) : o.push(t);
  }
  return r ? {
    text: o.join("\n"),
    method: i,
    confidence: s,
    changed: !0
  } : {
    text: t,
    method: e.none,
    confidence: 0,
    changed: !1
  };
}

exports.EnumMojibakeRepairMethod = e, exports._applyWordRescue = _applyWordRescue, 
exports._beamFill = _beamFill, exports._buildPrefixBytes = _buildPrefixBytes, exports._charScore = _charScore, 
exports._charToByte = _charToByte, exports._codePointFrom = _codePointFrom, exports._contsFromCodePoint = _contsFromCodePoint, 
exports._countDistinctLeadLike = _countDistinctLeadLike, exports._detectGaps = _detectGaps, 
exports._enumerateGapCandidates = _enumerateGapCandidates, exports._hasLeadContAdjacency = _hasLeadContAdjacency, 
exports._hasMojibakeMarker = _hasMojibakeMarker, exports._isLeadLike = _isLeadLike, 
exports._leadFromCodePoint = _leadFromCodePoint, exports._lineToBytes = _lineToBytes, 
exports._repairGapFilledOutput = _repairGapFilledOutput, exports._repairLine = _repairLine, 
exports._repairRoundTripOutput = _repairRoundTripOutput, exports._repairRunSegment = _repairRunSegment, 
exports._repairRunWithSpecialBoundaries = _repairRunWithSpecialBoundaries, exports._strictDecodeUtf8 = _strictDecodeUtf8, 
exports._wordBonus = _wordBonus, exports._wordCandidateFits = _wordCandidateFits, 
exports.default = repairMojibake, exports.repairMojibake = repairMojibake;
//# sourceMappingURL=index.cjs.production.min.cjs.map
