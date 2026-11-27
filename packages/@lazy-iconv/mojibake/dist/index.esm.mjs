let e = /*#__PURE__*/ function(e) {
  return e.none = "none", e.roundTrip = "round-trip", e.gapFill = "gap-fill", e;
}({});

const n = /*#__PURE__*/ new Map([ [ 0x20AC, 0x80 ], [ 0x201A, 0x82 ], [ 0x0192, 0x83 ], [ 0x201E, 0x84 ], [ 0x2026, 0x85 ], [ 0x2020, 0x86 ], [ 0x2021, 0x87 ], [ 0x02C6, 0x88 ], [ 0x2030, 0x89 ], [ 0x0160, 0x8A ], [ 0x2039, 0x8B ], [ 0x0152, 0x8C ], [ 0x017D, 0x8E ], [ 0x2018, 0x91 ], [ 0x2019, 0x92 ], [ 0x201C, 0x93 ], [ 0x201D, 0x94 ], [ 0x2022, 0x95 ], [ 0x2013, 0x96 ], [ 0x2014, 0x97 ], [ 0x02DC, 0x98 ], [ 0x2122, 0x99 ], [ 0x0161, 0x9A ], [ 0x203A, 0x9B ], [ 0x0153, 0x9C ], [ 0x017E, 0x9E ], [ 0x0178, 0x9F ] ]), t = /*#__PURE__*/ new Set(/*#__PURE__*/ Array.from("的一是了人我不在有他這这中大來来上國国個个到說说們们為为子和你地出道也時时年得就那要下以生會会自著着去之過过家學学對对她她裡里後后小天心多好都然沒没日於于起發发成事只作當当想看文無无開开手十用主行明經经頭头方又如前所本見见長长間门問问理月半安點点實实內内全表機机太海車车白兒儿爭争北才領领切呢活爾尔反特許许建先像做女真写東东業业電話电话攝影摄影撮影動画动画音楽音乐風景风景美人美女世界日本中国時間时间写真集電車电车新幹線天気天气料理会社学生先生機場机场感謝谢谢")), o = [ "写真", "写真集", "撮影", "東京", "东京", "日本", "中国", "世界", "美人", "美女", "風景", "风景", "人物", "動画", "动画", "音樂", "音乐", "時間", "时间", "電話", "电话", "電車", "电车", "新幹線", "新干线", "天気", "天气", "料理", "会社", "学生", "先生", "機場", "机场", "ありがとう", "こんにちは", "おはよう", "すみません", "撮影会" ], r = /*#__PURE__*/ new TextDecoder("utf-8", {
  fatal: !0
});

function _charToByte(e) {
  const t = e.codePointAt(0);
  if (void 0 === t) return null;
  if (t <= 0xFF) return t;
  const o = n.get(t);
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
  const n = [];
  for (const t of e) {
    const e = _charToByte(t);
    if (null === e) return null;
    n.push(e);
  }
  return n;
}

function _hasMojibakeMarker(e) {
  for (const o of e) {
    var t;
    const e = null !== (t = o.codePointAt(0)) && void 0 !== t ? t : 0;
    if (e >= 0x80 && e <= 0x9F) return !0;
    if (e > 0xFF && n.has(e)) return !0;
  }
  return !1;
}

function _isLeadLike(e) {
  return e >= 0xC2 && e <= 0xF4;
}

function _hasLeadContAdjacency(e) {
  for (let n = 0; n + 1 < e.length; n++) if (_isLeadLike(e[n]) && e[n + 1] >= 0xA0 && e[n + 1] <= 0xBF) return !0;
  return !1;
}

function _countDistinctLeadLike(e) {
  const n = new Set;
  for (const t of e) _isLeadLike(t) && n.add(t);
  return n.size;
}

function _detectGaps(e) {
  const n = [];
  let t = 0;
  for (;t < e.length; ) {
    const o = e[t];
    if (o < 0x80) {
      t++;
      continue;
    }
    let r = 0;
    if (o >= 0xC2 && o <= 0xDF) r = 1; else if (o >= 0xE0 && o <= 0xEF) r = 2; else {
      if (!(o >= 0xF0 && o <= 0xF4)) return null;
      r = 3;
    }
    const i = [];
    let l = t + 1;
    for (;l < e.length && e[l] >= 0x80 && e[l] <= 0xBF; ) i.push(e[l]), l++;
    if (i.length > r) return null;
    if (i.length < r) {
      if (1 === r) return null;
      n.push({
        index: t,
        lead: o,
        needed: r,
        present: i
      });
    }
    t = l;
  }
  return n;
}

function _charScore(e) {
  return e >= 0x3040 && e <= 0x30FF ? 3 : e >= 0x3000 && e <= 0x303F ? 2 : e >= 0x4E00 && e <= 0x9FFF ? t.has(String.fromCodePoint(e)) ? 4 : 1 : e >= 0x3400 && e <= 0x4DBF ? 1 : e >= 0xFF00 && e <= 0xFFEF ? 2 : e >= 0x2000 && e <= 0x206F ? "–—‘’“”…‰‡".includes(String.fromCodePoint(e)) ? 3 : 1 : e >= 0x20A0 && e <= 0x20BF ? 2 : 0;
}

function _codePointFrom(e, n) {
  let t = e & (e >= 0xF0 ? 0x07 : 0x0F);
  for (const e of n) t = t << 6 | 0x3F & e;
  return t;
}

function _contsFromCodePoint(e) {
  return e < 0x800 || e > 0xFFFF ? null : [ 0x80 | e >> 6 & 0x3F, 0x80 | 0x3F & e ];
}

function _leadFromCodePoint(e) {
  return e < 0x800 ? 0xC0 | e >> 6 : e <= 0xFFFF ? 0xE0 | e >> 12 : 0xF0 | e >> 18;
}

function _wordCandidateFits(e, n) {
  if (_leadFromCodePoint(n) !== e.lead) return !1;
  const t = _contsFromCodePoint(n);
  if (null === t || t.length !== e.needed) return !1;
  const o = [ ...e.present ];
  for (const e of t) {
    const n = o.indexOf(e);
    if (n >= 0) o.splice(n, 1); else if (e < 128 || e > 159) return !1;
  }
  return 0 === o.length;
}

function _enumerateGapCandidates(e) {
  const n = e.present, t = [], o = new Set, r = [], chooseSlots = (n, t, o) => {
    if (0 !== t) for (let r = n; r + t - 1 < e.needed; r++) chooseSlots(r + 1, t - 1, [ ...o, r ]); else r.push([ ...o ]);
  };
  chooseSlots(0, n.length, []);
  for (const i of r) {
    const r = new Map;
    i.forEach((e, t) => r.set(e, n[t]));
    const l = [];
    for (let n = 0; n < e.needed; n++) r.has(n) || l.push(n);
    const c = Math.pow(32, l.length);
    for (let n = 0; n < c; n++) {
      const i = [];
      let c = n;
      for (let n = 0; n < e.needed; n++) if (r.has(n)) i.push(r.get(n)); else {
        const e = l.indexOf(n), t = Math.pow(32, l.length - 1 - e);
        i.push(128 + Math.floor(c / t)), c %= t;
      }
      const u = _codePointFrom(e.lead, i);
      if (u >= 0xD800 && u <= 0xDFFF) continue;
      const s = _charScore(u);
      if (s <= 0) continue;
      const a = String.fromCodePoint(u);
      o.has(a) || (o.add(a), t.push({
        conts: i,
        char: a,
        score: s
      }));
    }
  }
  return t.sort((e, n) => n.score - e.score), t.slice(0, 48);
}

function _buildPrefixBytes(e, n, t, o, r) {
  const i = [];
  let l = 0;
  for (let r = 0; r < o; r++) {
    var c;
    const o = n[r];
    i.push(...e.slice(l, o.index + 1)), i.push(...null !== (c = t[r]) && void 0 !== c ? c : o.present), 
    l = o.index + 1 + o.present.length;
  }
  return r && i.push(...e.slice(l)), i;
}

function _wordBonus(e) {
  let n = 0;
  for (const t of o) {
    let o = 0;
    for (;;) {
      const r = e.indexOf(t, o);
      if (r < 0) break;
      n++, o = r + t.length;
    }
  }
  return n;
}

function _beamFill(e, n, t) {
  const o = n.map(e => _enumerateGapCandidates(e));
  let r = -1;
  for (let e = 0; e <= n.length; e++) e < n.length && r >= 0 && n[e].index === n[e - 1].index + 1 + n[e - 1].present.length || (r >= 0 && e - r >= 2 && _applyWordRescue(n, o, r, e), 
  r = e < n.length ? e : -1);
  let i = [ {
    fills: [],
    prefix: "",
    score: 0
  } ];
  for (let t = 0; t < n.length; t++) {
    if (0 === o[t].length) return null;
    const r = [];
    for (const l of i) for (const i of o[t]) {
      const o = [ ...l.fills, i.conts ], c = _strictDecodeUtf8(_buildPrefixBytes(e, n, o, t + 1, !1));
      null !== c && r.push({
        fills: o,
        prefix: c,
        score: l.score + i.score + 5 * _wordBonus(c)
      });
    }
    if (r.sort((e, n) => n.score - e.score), i = r.slice(0, 8), 0 === i.length) return null;
  }
  const l = _strictDecodeUtf8(_buildPrefixBytes(e, n, i[0].fills, n.length, !0));
  return null === l ? null : _repairGapFilledOutput(l, t) ? l : null;
}

function _applyWordRescue(e, n, t, r) {
  const i = r - t;
  for (const r of o) {
    const o = Array.from(r);
    if (!(o.length < 2 || o.length > i)) for (let r = 0; r + o.length <= i; r++) for (let i = 0; i < o.length; i++) {
      var l;
      const c = e[t + r + i], u = null !== (l = o[i].codePointAt(0)) && void 0 !== l ? l : 0;
      if (!_wordCandidateFits(c, u)) continue;
      const s = _contsFromCodePoint(u);
      if (null === s) continue;
      const a = _charScore(u);
      if (a <= 0) continue;
      const f = n[t + r + i];
      f.some(e => e.char === o[i]) || f.push({
        conts: s,
        char: o[i],
        score: a + 6
      });
    }
  }
}

function _repairGapFilledOutput(e, n) {
  let t = 0;
  for (const n of e) {
    var o;
    const e = null !== (o = n.codePointAt(0)) && void 0 !== o ? o : 0;
    if (e >= 0x80 && e <= 0x9F) return !1;
    (e >= 0x3000 && e <= 0x30FF || e >= 0x4E00 && e <= 0x9FFF) && t++;
  }
  return 0 === t ? n : t >= 2 && _wordBonus(e) >= 1;
}

function _repairRoundTripOutput(e, t) {
  if (t === e) return !1;
  let o = !1, r = !1;
  for (const t of e) {
    var i;
    const e = null !== (i = t.codePointAt(0)) && void 0 !== i ? i : 0;
    if (e >= 0x80 && e <= 0x9F || e > 0xFF && n.has(e) || 0xC3 === e) {
      o = !0;
      break;
    }
  }
  for (const e of t) {
    var l;
    const n = null !== (l = e.codePointAt(0)) && void 0 !== l ? l : 0;
    if (n >= 0x3000 && n <= 0x30FF || n >= 0x4E00 && n <= 0x9FFF) {
      r = !0;
      break;
    }
  }
  return o || r;
}

function _repairRunSegment(n) {
  const t = _lineToBytes(n);
  if (null === t) return null;
  const o = _hasMojibakeMarker(n), r = _strictDecodeUtf8(t);
  if (null !== r && _repairRoundTripOutput(n, r)) return {
    text: r,
    method: e.roundTrip,
    confidence: o ? 0.95 : 0.8
  };
  if (!(o || _hasLeadContAdjacency(t) || _countDistinctLeadLike(t) >= 2)) return null;
  const i = _detectGaps(t);
  if (null === i || 0 === i.length) return null;
  const l = _beamFill(t, i, o);
  if (null === l) return null;
  const c = Math.min(0.8, Math.max(0.1, 0.35 + 0.15 * _wordBonus(l) - 0.03 * Math.max(0, i.length - 1)));
  return {
    text: l,
    method: e.gapFill,
    confidence: c
  };
}

function _repairRunWithSpecialBoundaries(n) {
  const t = [], o = [];
  let r = "";
  const flush = () => {
    if ("" === r) return;
    const e = _repairRunSegment(r);
    null === e ? t.push(r) : (o.push(e), t.push(e.text)), r = "";
  };
  for (const e of n) {
    var i;
    (null !== (i = e.codePointAt(0)) && void 0 !== i ? i : 0) > 0xFF ? (flush(), t.push(e)) : r += e;
  }
  return flush(), 0 === o.length ? null : {
    text: t.join(""),
    method: o.some(n => n.method === e.gapFill) ? e.gapFill : e.roundTrip,
    confidence: Math.min(...o.map(e => e.confidence))
  };
}

function _repairLine(n) {
  let t = !1;
  for (const e of n) {
    var o;
    if ((null !== (o = e.codePointAt(0)) && void 0 !== o ? o : 0) > 0x7F) {
      t = !0;
      break;
    }
  }
  if (!t) return null;
  const r = _repairRunSegment(n);
  if (null !== r) return r;
  const i = [], l = [];
  let c = "";
  const flush = () => {
    var e;
    if ("" === c) return;
    const n = null !== (e = _repairRunSegment(c)) && void 0 !== e ? e : _repairRunWithSpecialBoundaries(c);
    null === n ? i.push(c) : (l.push(n), i.push(n.text)), c = "";
  };
  for (const e of n) null === _charToByte(e) ? (flush(), i.push(e)) : c += e;
  return flush(), 0 === l.length ? null : {
    text: i.join(""),
    method: l.some(n => n.method === e.gapFill) ? e.gapFill : e.roundTrip,
    confidence: Math.min(...l.map(e => e.confidence))
  };
}

function repairMojibake(n) {
  const t = n.split("\n"), o = [];
  let r = !1, i = e.none, l = 1;
  for (const n of t) {
    const t = _repairLine(n);
    null !== t ? (r = !0, o.push(t.text), i = e.gapFill === t.method ? e.gapFill : i === e.none ? t.method : i, 
    l = Math.min(l, t.confidence)) : o.push(n);
  }
  return r ? {
    text: o.join("\n"),
    method: i,
    confidence: l,
    changed: !0
  } : {
    text: n,
    method: e.none,
    confidence: 0,
    changed: !1
  };
}

export { e as EnumMojibakeRepairMethod, _applyWordRescue, _beamFill, _buildPrefixBytes, _charScore, _charToByte, _codePointFrom, _contsFromCodePoint, _countDistinctLeadLike, _detectGaps, _enumerateGapCandidates, _hasLeadContAdjacency, _hasMojibakeMarker, _isLeadLike, _leadFromCodePoint, _lineToBytes, _repairGapFilledOutput, _repairLine, _repairRoundTripOutput, _repairRunSegment, _repairRunWithSpecialBoundaries, _strictDecodeUtf8, _wordBonus, _wordCandidateFits, repairMojibake as default, repairMojibake };
//# sourceMappingURL=index.esm.mjs.map
