"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

const e = /*#__PURE__*/ new Map([ [ 0x20AC, 0x80 ], [ 0x201A, 0x82 ], [ 0x0192, 0x83 ], [ 0x201E, 0x84 ], [ 0x2026, 0x85 ], [ 0x2020, 0x86 ], [ 0x2021, 0x87 ], [ 0x02C6, 0x88 ], [ 0x2030, 0x89 ], [ 0x0160, 0x8A ], [ 0x2039, 0x8B ], [ 0x0152, 0x8C ], [ 0x017D, 0x8E ], [ 0x2018, 0x91 ], [ 0x2019, 0x92 ], [ 0x201C, 0x93 ], [ 0x201D, 0x94 ], [ 0x2022, 0x95 ], [ 0x2013, 0x96 ], [ 0x2014, 0x97 ], [ 0x02DC, 0x98 ], [ 0x2122, 0x99 ], [ 0x0161, 0x9A ], [ 0x203A, 0x9B ], [ 0x0153, 0x9C ], [ 0x017E, 0x9E ], [ 0x0178, 0x9F ] ]), n = /*#__PURE__*/ new Set(/*#__PURE__*/ Array.from("的一是了人我不在有他這这中大來来上國国個个到說说們们為为子和你地出道也時时年得就那要下以生會会自著着去之過过家學学對对她她裡里後后小天心多好都然沒没日於于起發发成事只作當当想看文無无開开手十用主行明經经頭头方又如前所本見见長长間门問问理月半安點点實实內内全表機机太海車车白兒儿爭争北才領领切呢活爾尔反特許许建先像做女真写東东業业電話电话攝影摄影撮影動画动画音楽音乐風景风景美人美女世界日本中国時間时间写真集電車电车新幹線天気天气料理会社学生先生機場机场感謝谢谢")), t = [ "写真", "写真集", "撮影", "東京", "东京", "日本", "中国", "世界", "美人", "美女", "風景", "风景", "人物", "動画", "动画", "音樂", "音乐", "時間", "时间", "電話", "电话", "電車", "电车", "新幹線", "新干线", "天気", "天气", "料理", "会社", "学生", "先生", "機場", "机场", "ありがとう", "こんにちは", "おはよう", "すみません", "撮影会" ], o = /*#__PURE__*/ new TextDecoder("utf-8", {
  fatal: !0
});

let r = /*#__PURE__*/ function(e) {
  return e.none = "none", e.roundTrip = "round-trip", e.gapFill = "gap-fill", e;
}({});

function _charToByte(n) {
  const t = n.codePointAt(0);
  if (void 0 === t) return null;
  if (t <= 0xFF) return t;
  const o = e.get(t);
  return void 0 === o ? null : o;
}

function _strictDecodeUtf8(e) {
  try {
    return o.decode(Uint8Array.from(e));
  } catch {
    return null;
  }
}

function _hasMojibakeMarker(n, t) {
  for (const r of n) {
    var o;
    const n = null !== (o = r.codePointAt(0)) && void 0 !== o ? o : 0;
    if (n >= 0x80 && n <= 0x9F) return !0;
    if (n > 0xFF && e.has(n)) return !0;
    if (void 0 !== t && n === t) return !0;
  }
  return !1;
}

function _isLeadLike(e) {
  return e >= 0xC2 && e <= 0xF4;
}

function _charScore(e) {
  return e >= 0x3040 && e <= 0x30FF ? 3 : e >= 0x3000 && e <= 0x303F ? 2 : e >= 0x4E00 && e <= 0x9FFF ? n.has(String.fromCodePoint(e)) ? 4 : 1 : e >= 0x3400 && e <= 0x4DBF ? 1 : e >= 0xFF00 && e <= 0xFFEF ? 2 : e >= 0x2000 && e <= 0x206F ? "–—‘’“”…‰‡".includes(String.fromCodePoint(e)) ? 3 : 1 : e >= 0x20A0 && e <= 0x20BF ? 2 : 0;
}

function _codePointFrom(e, n) {
  let t = e & (e >= 0xF0 ? 0x07 : 0x0F);
  for (const e of n) t = t << 6 | 0x3F & e;
  return t;
}

function _contsFromCodePoint(e) {
  return e < 0x800 || e > 0xFFFF ? null : [ 0x80 | e >> 6 & 0x3F, 0x80 | 0x3F & e ];
}

function _wordCandidateFits(e, n) {
  if (function _leadFromCodePoint(e) {
    return e < 0x800 ? 0xC0 | e >> 6 : e <= 0xFFFF ? 0xE0 | e >> 12 : 0xF0 | e >> 18;
  }(n) !== e.lead) return !1;
  const t = _contsFromCodePoint(n);
  if (null === t || t.length !== e.needed) return !1;
  const o = [ ...e.present ];
  for (const e of t) {
    const n = o.indexOf(e);
    if (n >= 0) o.splice(n, 1); else if (e < 128 || e > 159) return !1;
  }
  return 0 === o.length;
}

function _buildPrefixBytes(e, n, t, o, r) {
  const i = [];
  let c = 0;
  for (let r = 0; r < o; r++) {
    var l;
    const o = n[r];
    i.push(...e.slice(c, o.index + 1)), i.push(...null !== (l = t[r]) && void 0 !== l ? l : o.present), 
    c = o.index + 1 + o.present.length;
  }
  return r && i.push(...e.slice(c)), i;
}

function _wordBonus(e) {
  let n = 0;
  for (const o of t) {
    let t = 0;
    for (;;) {
      const r = e.indexOf(o, t);
      if (r < 0) break;
      n++, t = r + o.length;
    }
  }
  return n;
}

function _applyWordRescue(e, n, o, r) {
  const i = r - o;
  for (const r of t) {
    const t = Array.from(r);
    if (!(t.length < 2 || t.length > i)) for (let r = 0; r + t.length <= i; r++) for (let i = 0; i < t.length; i++) {
      var c;
      const l = e[o + r + i], s = null !== (c = t[i].codePointAt(0)) && void 0 !== c ? c : 0;
      if (!_wordCandidateFits(l, s)) continue;
      const u = _contsFromCodePoint(s);
      if (null === u) continue;
      const f = _charScore(s);
      if (f <= 0) continue;
      const a = n[o + r + i];
      a.some(e => e.char === t[i]) || a.push({
        conts: u,
        char: t[i],
        score: f + 6
      });
    }
  }
}

function _isCjkOrKana(e) {
  return e >= 0x3000 && e <= 0x30FF || e >= 0x4E00 && e <= 0x9FFF;
}

function _repairRunSegment(e) {
  const n = function _lineToBytes(e) {
    const n = [];
    for (const t of e) {
      const e = _charToByte(t);
      if (null === e) return null;
      n.push(e);
    }
    return n;
  }(e);
  if (null === n) return null;
  const t = _hasMojibakeMarker(e), o = _strictDecodeUtf8(n);
  if (null !== o && function _repairRoundTripOutput(e, n) {
    if (n === e) return !1;
    const t = _hasMojibakeMarker(e, 0xC3);
    let o = !1;
    for (const e of n) {
      var r;
      if (_isCjkOrKana(null !== (r = e.codePointAt(0)) && void 0 !== r ? r : 0)) {
        o = !0;
        break;
      }
    }
    return t || o;
  }(e, o)) return {
    text: o,
    method: r.roundTrip,
    confidence: t ? 0.95 : 0.8
  };
  const i = t || function _hasLeadContAdjacency(e) {
    for (let n = 0; n + 1 < e.length; n++) if (_isLeadLike(e[n]) && e[n + 1] >= 0xA0 && e[n + 1] <= 0xBF) return !0;
    return !1;
  }(n) || function _countDistinctLeadLike(e) {
    const n = new Set;
    for (const t of e) _isLeadLike(t) && n.add(t);
    return n.size;
  }(n) >= 2;
  if (!i) return null;
  const c = function _detectGaps(e) {
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
      let c = t + 1;
      for (;c < e.length && e[c] >= 0x80 && e[c] <= 0xBF; ) i.push(e[c]), c++;
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
      t = c;
    }
    return n;
  }(n);
  if (null === c || 0 === c.length) return null;
  const l = function _beamFill(e, n, t) {
    const o = n.map(e => function _enumerateGapCandidates(e) {
      const n = e.present, t = [], o = new Set, r = [], chooseSlots = (n, t, o) => {
        if (0 !== t) for (let r = n; r + t - 1 < e.needed; r++) chooseSlots(r + 1, t - 1, [ ...o, r ]); else r.push([ ...o ]);
      };
      chooseSlots(0, n.length, []);
      for (const i of r) {
        const r = new Map;
        i.forEach((e, t) => r.set(e, n[t]));
        const c = [];
        for (let n = 0; n < e.needed; n++) r.has(n) || c.push(n);
        const l = Math.pow(32, c.length);
        for (let n = 0; n < l; n++) {
          const i = [];
          let l = n;
          for (let n = 0; n < e.needed; n++) if (r.has(n)) i.push(r.get(n)); else {
            const e = c.indexOf(n), t = Math.pow(32, c.length - 1 - e);
            i.push(128 + Math.floor(l / t)), l %= t;
          }
          const s = _codePointFrom(e.lead, i);
          if (s >= 0xD800 && s <= 0xDFFF) continue;
          const u = _charScore(s);
          if (u <= 0) continue;
          const f = String.fromCodePoint(s);
          o.has(f) || (o.add(f), t.push({
            conts: i,
            char: f,
            score: u
          }));
        }
      }
      return t.sort((e, n) => n.score - e.score), t.slice(0, 48);
    }(e));
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
      for (const c of i) for (const i of o[t]) {
        const o = [ ...c.fills, i.conts ], l = _strictDecodeUtf8(_buildPrefixBytes(e, n, o, t + 1, !1));
        null !== l && r.push({
          fills: o,
          prefix: l,
          score: c.score + i.score + 5 * _wordBonus(l)
        });
      }
      if (r.sort((e, n) => n.score - e.score), i = r.slice(0, 8), 0 === i.length) return null;
    }
    const c = _strictDecodeUtf8(_buildPrefixBytes(e, n, i[0].fills, n.length, !0));
    return null === c ? null : function _repairGapFilledOutput(e, n) {
      let t = 0;
      for (const n of e) {
        var o;
        const e = null !== (o = n.codePointAt(0)) && void 0 !== o ? o : 0;
        if (e >= 0x80 && e <= 0x9F) return !1;
        _isCjkOrKana(e) && t++;
      }
      return 0 === t ? n : t >= 2 && _wordBonus(e) >= 1;
    }(c, t) ? c : null;
  }(n, c, t);
  if (null === l) return null;
  const s = Math.min(0.8, Math.max(0.1, 0.35 + 0.15 * _wordBonus(l) - 0.03 * Math.max(0, c.length - 1)));
  return {
    text: l,
    method: r.gapFill,
    confidence: s
  };
}

function _repairSplitBy(e, n, t) {
  const o = [], i = [];
  let c = "";
  const flush = () => {
    if ("" === c) return;
    const e = t(c);
    null === e ? o.push(c) : (i.push(e), o.push(e.text)), c = "";
  };
  for (const t of e) n(t) ? (flush(), o.push(t)) : c += t;
  return flush(), 0 === i.length ? null : {
    text: o.join(""),
    method: i.some(e => e.method === r.gapFill) ? r.gapFill : r.roundTrip,
    confidence: Math.min(...i.map(e => e.confidence))
  };
}

function _repairLine(e) {
  let n = !1;
  for (const o of e) {
    var t;
    if ((null !== (t = o.codePointAt(0)) && void 0 !== t ? t : 0) > 0x7F) {
      n = !0;
      break;
    }
  }
  if (!n) return null;
  const o = _repairRunSegment(e);
  return null !== o ? o : _repairSplitBy(e, e => null === _charToByte(e), e => {
    var n;
    return null !== (n = _repairRunSegment(e)) && void 0 !== n ? n : function _repairRunWithSpecialBoundaries(e) {
      return _repairSplitBy(e, e => {
        var n;
        return (null !== (n = e.codePointAt(0)) && void 0 !== n ? n : 0) > 0xFF;
      }, _repairRunSegment);
    }(e);
  });
}

function repairMojibake(e) {
  const n = e.split("\n"), t = [];
  let o = !1, i = r.none, c = 1;
  for (const e of n) {
    const n = _repairLine(e);
    null !== n ? (o = !0, t.push(n.text), i = r.gapFill === n.method ? r.gapFill : i === r.none ? n.method : i, 
    c = Math.min(c, n.confidence)) : t.push(e);
  }
  return o ? {
    text: t.join("\n"),
    method: i,
    confidence: c,
    changed: !0
  } : {
    text: e,
    method: r.none,
    confidence: 0,
    changed: !1
  };
}

const i = [ {
  label: "utf-8",
  name: "UTF-8"
}, {
  label: "big5",
  name: "Big5（繁中 Windows）"
}, {
  label: "gbk",
  name: "GBK（簡中 Windows）"
}, {
  label: "shift_jis",
  name: "Shift_JIS（日文）"
}, {
  label: "euc-kr",
  name: "EUC-KR（韓文）"
}, {
  label: "windows-1252",
  name: "Latin-1／Windows-1252"
} ], c = /*#__PURE__*/ new Map;

function getDecodeTable(e) {
  const n = c.get(e);
  if (void 0 !== n) return n;
  let t;
  try {
    const n = new TextDecoder(e);
    t = new Map;
    for (let e = 0; e < 256; e++) {
      const o = n.decode(new Uint8Array([ e ]));
      1 !== o.length || "�" === o || t.has(o) || t.set(o, [ e ]);
    }
    if ("windows-1252" !== e) for (let e = 0x81; e <= 0xFE; e++) for (let o = 0x40; o <= 0xFE; o++) {
      const r = n.decode(new Uint8Array([ e, o ]));
      1 !== r.length || "�" === r || t.has(r) || t.set(r, [ e, o ]);
    }
  } catch {
    t = null;
  }
  return c.set(e, t), t;
}

function encodeToBytes(e, n) {
  if ("utf-8" === n) return Array.from((new TextEncoder).encode(e));
  const t = getDecodeTable(n);
  if (null === t) return null;
  const o = [];
  for (const n of e) {
    const e = t.get(n);
    if (void 0 === e) return null;
    o.push(...e);
  }
  return o;
}

function decodeBytes(e, n) {
  return new TextDecoder(n).decode(Uint8Array.from(e));
}

function forEachEncodingPair(e, n) {
  for (const t of i) for (const o of i) {
    if (t.label === o.label) continue;
    const r = encodeToBytes(e, t.label);
    if (null === r) continue;
    const i = decodeBytes(r, o.label);
    i !== e && n(t, o, i);
  }
}

exports.EnumMojibakeRepairMethod = r, exports.MOJIBAKE_ENCODINGS = i, exports.decodeBytes = decodeBytes, 
exports.default = repairMojibake, exports.encodeToBytes = encodeToBytes, exports.generateMojibake = function generateMojibake(e) {
  const n = [];
  return forEachEncodingPair(e, (e, t, o) => {
    n.push({
      label: `以 ${e.name} 存檔，用 ${t.name} 開啟`,
      text: o
    });
  }), n;
}, exports.getDecodeTable = getDecodeTable, exports.repairMojibake = repairMojibake, 
exports.repairMojibakeByEncodings = function repairMojibakeByEncodings(e, n = 8) {
  const t = [];
  return forEachEncodingPair(e, (e, n, o) => {
    o.includes("�") || t.push({
      cjk: (o.match(/[\u4e00-\u9fff]/g) || []).length,
      candidate: {
        label: `原本是 ${n.name}，被誤當 ${e.name} 讀取`,
        text: o
      }
    });
  }), t.sort((e, n) => n.cjk - e.cjk), t.slice(0, n).map(e => e.candidate);
};
//# sourceMappingURL=index.cjs.production.min.cjs.map
