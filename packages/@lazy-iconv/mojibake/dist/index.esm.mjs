const n = /*#__PURE__*/ new Map([ [ 0x20AC, 0x80 ], [ 0x201A, 0x82 ], [ 0x0192, 0x83 ], [ 0x201E, 0x84 ], [ 0x2026, 0x85 ], [ 0x2020, 0x86 ], [ 0x2021, 0x87 ], [ 0x02C6, 0x88 ], [ 0x2030, 0x89 ], [ 0x0160, 0x8A ], [ 0x2039, 0x8B ], [ 0x0152, 0x8C ], [ 0x017D, 0x8E ], [ 0x2018, 0x91 ], [ 0x2019, 0x92 ], [ 0x201C, 0x93 ], [ 0x201D, 0x94 ], [ 0x2022, 0x95 ], [ 0x2013, 0x96 ], [ 0x2014, 0x97 ], [ 0x02DC, 0x98 ], [ 0x2122, 0x99 ], [ 0x0161, 0x9A ], [ 0x203A, 0x9B ], [ 0x0153, 0x9C ], [ 0x017E, 0x9E ], [ 0x0178, 0x9F ] ]), e = /*#__PURE__*/ new Set(/*#__PURE__*/ Array.from("的一是了人我不在有他這这中大來来上國国個个到說说們们為为子和你地出道也時时年得就那要下以生會会自著着去之過过家學学對对她她裡里後后小天心多好都然沒没日於于起發发成事只作當当想看文無无開开手十用主行明經经頭头方又如前所本見见長长間门問问理月半安點点實实內内全表機机太海車车白兒儿爭争北才領领切呢活爾尔反特許许建先像做女真写東东業业電話电话攝影摄影撮影動画动画音楽音乐風景风景美人美女世界日本中国時間时间写真集電車电车新幹線天気天气料理会社学生先生機場机场感謝谢谢")), t = [ "写真", "写真集", "撮影", "東京", "东京", "日本", "中国", "世界", "美人", "美女", "風景", "风景", "人物", "動画", "动画", "音樂", "音乐", "時間", "时间", "電話", "电话", "電車", "电车", "新幹線", "新干线", "天気", "天气", "料理", "会社", "学生", "先生", "機場", "机场", "ありがとう", "こんにちは", "おはよう", "すみません", "撮影会" ], o = /*#__PURE__*/ new TextDecoder("utf-8", {
  fatal: !0
});

let r = /*#__PURE__*/ function(n) {
  return n.none = "none", n.roundTrip = "round-trip", n.gapFill = "gap-fill", n;
}({});

function _charToByte(e) {
  const t = e.codePointAt(0);
  if (void 0 === t) return null;
  if (t <= 0xFF) return t;
  const o = n.get(t);
  return void 0 === o ? null : o;
}

function _strictDecodeUtf8(n) {
  try {
    return o.decode(Uint8Array.from(n));
  } catch {
    return null;
  }
}

function _hasMojibakeMarker(e, t) {
  for (const r of e) {
    var o;
    const e = null !== (o = r.codePointAt(0)) && void 0 !== o ? o : 0;
    if (e >= 0x80 && e <= 0x9F) return !0;
    if (e > 0xFF && n.has(e)) return !0;
    if (void 0 !== t && e === t) return !0;
  }
  return !1;
}

function _isLeadLike(n) {
  return n >= 0xC2 && n <= 0xF4;
}

function _charScore(n) {
  return n >= 0x3040 && n <= 0x30FF ? 3 : n >= 0x3000 && n <= 0x303F ? 2 : n >= 0x4E00 && n <= 0x9FFF ? e.has(String.fromCodePoint(n)) ? 4 : 1 : n >= 0x3400 && n <= 0x4DBF ? 1 : n >= 0xFF00 && n <= 0xFFEF ? 2 : n >= 0x2000 && n <= 0x206F ? "–—‘’“”…‰‡".includes(String.fromCodePoint(n)) ? 3 : 1 : n >= 0x20A0 && n <= 0x20BF ? 2 : 0;
}

function _codePointFrom(n, e) {
  let t = n & (n >= 0xF0 ? 0x07 : 0x0F);
  for (const n of e) t = t << 6 | 0x3F & n;
  return t;
}

function _contsFromCodePoint(n) {
  return n < 0x800 || n > 0xFFFF ? null : [ 0x80 | n >> 6 & 0x3F, 0x80 | 0x3F & n ];
}

function _wordCandidateFits(n, e) {
  if (function _leadFromCodePoint(n) {
    return n < 0x800 ? 0xC0 | n >> 6 : n <= 0xFFFF ? 0xE0 | n >> 12 : 0xF0 | n >> 18;
  }(e) !== n.lead) return !1;
  const t = _contsFromCodePoint(e);
  if (null === t || t.length !== n.needed) return !1;
  const o = [ ...n.present ];
  for (const n of t) {
    const e = o.indexOf(n);
    if (e >= 0) o.splice(e, 1); else if (n < 128 || n > 159) return !1;
  }
  return 0 === o.length;
}

function _buildPrefixBytes(n, e, t, o, r) {
  const i = [];
  let c = 0;
  for (let r = 0; r < o; r++) {
    var l;
    const o = e[r];
    i.push(...n.slice(c, o.index + 1)), i.push(...null !== (l = t[r]) && void 0 !== l ? l : o.present), 
    c = o.index + 1 + o.present.length;
  }
  return r && i.push(...n.slice(c)), i;
}

function _wordBonus(n) {
  let e = 0;
  for (const o of t) {
    let t = 0;
    for (;;) {
      const r = n.indexOf(o, t);
      if (r < 0) break;
      e++, t = r + o.length;
    }
  }
  return e;
}

function _applyWordRescue(n, e, o, r) {
  const i = r - o;
  for (const r of t) {
    const t = Array.from(r);
    if (!(t.length < 2 || t.length > i)) for (let r = 0; r + t.length <= i; r++) for (let i = 0; i < t.length; i++) {
      var c;
      const l = n[o + r + i], s = null !== (c = t[i].codePointAt(0)) && void 0 !== c ? c : 0;
      if (!_wordCandidateFits(l, s)) continue;
      const u = _contsFromCodePoint(s);
      if (null === u) continue;
      const f = _charScore(s);
      if (f <= 0) continue;
      const a = e[o + r + i];
      a.some(n => n.char === t[i]) || a.push({
        conts: u,
        char: t[i],
        score: f + 6
      });
    }
  }
}

function _isCjkOrKana(n) {
  return n >= 0x3000 && n <= 0x30FF || n >= 0x4E00 && n <= 0x9FFF;
}

function _repairRunSegment(n) {
  const e = function _lineToBytes(n) {
    const e = [];
    for (const t of n) {
      const n = _charToByte(t);
      if (null === n) return null;
      e.push(n);
    }
    return e;
  }(n);
  if (null === e) return null;
  const t = _hasMojibakeMarker(n), o = _strictDecodeUtf8(e);
  if (null !== o && function _repairRoundTripOutput(n, e) {
    if (e === n) return !1;
    const t = _hasMojibakeMarker(n, 0xC3);
    let o = !1;
    for (const n of e) {
      var r;
      if (_isCjkOrKana(null !== (r = n.codePointAt(0)) && void 0 !== r ? r : 0)) {
        o = !0;
        break;
      }
    }
    return t || o;
  }(n, o)) return {
    text: o,
    method: r.roundTrip,
    confidence: t ? 0.95 : 0.8
  };
  const i = t || function _hasLeadContAdjacency(n) {
    for (let e = 0; e + 1 < n.length; e++) if (_isLeadLike(n[e]) && n[e + 1] >= 0xA0 && n[e + 1] <= 0xBF) return !0;
    return !1;
  }(e) || function _countDistinctLeadLike(n) {
    const e = new Set;
    for (const t of n) _isLeadLike(t) && e.add(t);
    return e.size;
  }(e) >= 2;
  if (!i) return null;
  const c = function _detectGaps(n) {
    const e = [];
    let t = 0;
    for (;t < n.length; ) {
      const o = n[t];
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
      for (;c < n.length && n[c] >= 0x80 && n[c] <= 0xBF; ) i.push(n[c]), c++;
      if (i.length > r) return null;
      if (i.length < r) {
        if (1 === r) return null;
        e.push({
          index: t,
          lead: o,
          needed: r,
          present: i
        });
      }
      t = c;
    }
    return e;
  }(e);
  if (null === c || 0 === c.length) return null;
  const l = function _beamFill(n, e, t) {
    const o = e.map(n => function _enumerateGapCandidates(n) {
      const e = n.present, t = [], o = new Set, r = [], chooseSlots = (e, t, o) => {
        if (0 !== t) for (let r = e; r + t - 1 < n.needed; r++) chooseSlots(r + 1, t - 1, [ ...o, r ]); else r.push([ ...o ]);
      };
      chooseSlots(0, e.length, []);
      for (const i of r) {
        const r = new Map;
        i.forEach((n, t) => r.set(n, e[t]));
        const c = [];
        for (let e = 0; e < n.needed; e++) r.has(e) || c.push(e);
        const l = Math.pow(32, c.length);
        for (let e = 0; e < l; e++) {
          const i = [];
          let l = e;
          for (let e = 0; e < n.needed; e++) if (r.has(e)) i.push(r.get(e)); else {
            const n = c.indexOf(e), t = Math.pow(32, c.length - 1 - n);
            i.push(128 + Math.floor(l / t)), l %= t;
          }
          const s = _codePointFrom(n.lead, i);
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
      return t.sort((n, e) => e.score - n.score), t.slice(0, 48);
    }(n));
    let r = -1;
    for (let n = 0; n <= e.length; n++) n < e.length && r >= 0 && e[n].index === e[n - 1].index + 1 + e[n - 1].present.length || (r >= 0 && n - r >= 2 && _applyWordRescue(e, o, r, n), 
    r = n < e.length ? n : -1);
    let i = [ {
      fills: [],
      prefix: "",
      score: 0
    } ];
    for (let t = 0; t < e.length; t++) {
      if (0 === o[t].length) return null;
      const r = [];
      for (const c of i) for (const i of o[t]) {
        const o = [ ...c.fills, i.conts ], l = _strictDecodeUtf8(_buildPrefixBytes(n, e, o, t + 1, !1));
        null !== l && r.push({
          fills: o,
          prefix: l,
          score: c.score + i.score + 5 * _wordBonus(l)
        });
      }
      if (r.sort((n, e) => e.score - n.score), i = r.slice(0, 8), 0 === i.length) return null;
    }
    const c = _strictDecodeUtf8(_buildPrefixBytes(n, e, i[0].fills, e.length, !0));
    return null === c ? null : function _repairGapFilledOutput(n, e) {
      let t = 0;
      for (const e of n) {
        var o;
        const n = null !== (o = e.codePointAt(0)) && void 0 !== o ? o : 0;
        if (n >= 0x80 && n <= 0x9F) return !1;
        _isCjkOrKana(n) && t++;
      }
      return 0 === t ? e : t >= 2 && _wordBonus(n) >= 1;
    }(c, t) ? c : null;
  }(e, c, t);
  if (null === l) return null;
  const s = Math.min(0.8, Math.max(0.1, 0.35 + 0.15 * _wordBonus(l) - 0.03 * Math.max(0, c.length - 1)));
  return {
    text: l,
    method: r.gapFill,
    confidence: s
  };
}

function _repairSplitBy(n, e, t) {
  const o = [], i = [];
  let c = "";
  const flush = () => {
    if ("" === c) return;
    const n = t(c);
    null === n ? o.push(c) : (i.push(n), o.push(n.text)), c = "";
  };
  for (const t of n) e(t) ? (flush(), o.push(t)) : c += t;
  return flush(), 0 === i.length ? null : {
    text: o.join(""),
    method: i.some(n => n.method === r.gapFill) ? r.gapFill : r.roundTrip,
    confidence: Math.min(...i.map(n => n.confidence))
  };
}

function _repairLine(n) {
  let e = !1;
  for (const o of n) {
    var t;
    if ((null !== (t = o.codePointAt(0)) && void 0 !== t ? t : 0) > 0x7F) {
      e = !0;
      break;
    }
  }
  if (!e) return null;
  const o = _repairRunSegment(n);
  return null !== o ? o : _repairSplitBy(n, n => null === _charToByte(n), n => {
    var e;
    return null !== (e = _repairRunSegment(n)) && void 0 !== e ? e : function _repairRunWithSpecialBoundaries(n) {
      return _repairSplitBy(n, n => {
        var e;
        return (null !== (e = n.codePointAt(0)) && void 0 !== e ? e : 0) > 0xFF;
      }, _repairRunSegment);
    }(n);
  });
}

function repairMojibake(n) {
  const e = n.split("\n"), t = [];
  let o = !1, i = r.none, c = 1;
  for (const n of e) {
    const e = _repairLine(n);
    null !== e ? (o = !0, t.push(e.text), i = r.gapFill === e.method ? r.gapFill : i === r.none ? e.method : i, 
    c = Math.min(c, e.confidence)) : t.push(n);
  }
  return o ? {
    text: t.join("\n"),
    method: i,
    confidence: c,
    changed: !0
  } : {
    text: n,
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

function getDecodeTable(n) {
  const e = c.get(n);
  if (void 0 !== e) return e;
  let t;
  try {
    const e = new TextDecoder(n);
    t = new Map;
    for (let n = 0; n < 256; n++) {
      const o = e.decode(new Uint8Array([ n ]));
      1 !== o.length || "�" === o || t.has(o) || t.set(o, [ n ]);
    }
    if ("windows-1252" !== n) for (let n = 0x81; n <= 0xFE; n++) for (let o = 0x40; o <= 0xFE; o++) {
      const r = e.decode(new Uint8Array([ n, o ]));
      1 !== r.length || "�" === r || t.has(r) || t.set(r, [ n, o ]);
    }
  } catch {
    t = null;
  }
  return c.set(n, t), t;
}

function encodeToBytes(n, e) {
  if ("utf-8" === e) return Array.from((new TextEncoder).encode(n));
  const t = getDecodeTable(e);
  if (null === t) return null;
  const o = [];
  for (const e of n) {
    const n = t.get(e);
    if (void 0 === n) return null;
    o.push(...n);
  }
  return o;
}

function decodeBytes(n, e) {
  return new TextDecoder(e).decode(Uint8Array.from(n));
}

function forEachEncodingPair(n, e) {
  for (const t of i) for (const o of i) {
    if (t.label === o.label) continue;
    const r = encodeToBytes(n, t.label);
    if (null === r) continue;
    const i = decodeBytes(r, o.label);
    i !== n && e(t, o, i);
  }
}

function generateMojibake(n) {
  const e = [];
  return forEachEncodingPair(n, (n, t, o) => {
    e.push({
      label: `以 ${n.name} 存檔，用 ${t.name} 開啟`,
      text: o
    });
  }), e;
}

function repairMojibakeByEncodings(n, e = 8) {
  const t = [];
  return forEachEncodingPair(n, (n, e, o) => {
    o.includes("�") || t.push({
      cjk: (o.match(/[\u4e00-\u9fff]/g) || []).length,
      candidate: {
        label: `原本是 ${e.name}，被誤當 ${n.name} 讀取`,
        text: o
      }
    });
  }), t.sort((n, e) => e.cjk - n.cjk), t.slice(0, e).map(n => n.candidate);
}

export { r as EnumMojibakeRepairMethod, i as MOJIBAKE_ENCODINGS, decodeBytes, repairMojibake as default, encodeToBytes, generateMojibake, getDecodeTable, repairMojibake, repairMojibakeByEncodings };
//# sourceMappingURL=index.esm.mjs.map
