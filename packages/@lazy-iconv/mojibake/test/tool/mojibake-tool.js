/**
 * 亂碼產生器／亂碼還原工具（自 mja-tools.js 抽離的獨立版本，僅保留亂碼相關邏輯）。
 * Mojibake generator / repair tool — standalone extraction of the mojibake-only logic from mja-tools.js.
 *
 * 來源 / Source: https://mojiatlas.com/wp-content/plugins/mojiatlas-header-footer/assets/js/mja-tools.js?ver=1.1.12.1795572300
 * 僅在瀏覽器執行，不向外發送任何資料 / Runs in the browser only; nothing is sent anywhere.
 *
 * 用法 / Usage: 頁面放置 <div data-mja-tool="mojibake"></div> 後載入本檔，DOMContentLoaded 時自動初始化。
 *   Put <div data-mja-tool="mojibake"></div> on the page and load this file; it self-initialises on DOMContentLoaded.
 */
(function () {
  'use strict';
  var d = document, W = window;

  /* 與原始碼一致的 DOM 小工具 / DOM helpers, kept identical to the original */
  function $(s, r) { return (r || d).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || d).querySelectorAll(s)); }
  function el(tag, cls, txt) { var e = d.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function copyBtn(text, label) { var b = el('button', 'mja-copy mja-btn-copy', label || '複製'); b.type = 'button'; b.setAttribute('data-copy', text); return b; }

  /* mojibake generator / repair (WHATWG encodings via TextDecoder; encoders built from decode tables) */
  var ENC = [['utf-8', 'UTF-8'], ['big5', 'Big5（繁中 Windows）'], ['gbk', 'GBK（簡中 Windows）'], ['shift_jis', 'Shift_JIS（日文）'], ['euc-kr', 'EUC-KR（韓文）'], ['windows-1252', 'Latin-1／Windows-1252']], ecache = {};
  function encTable(enc) {
    if (ecache[enc]) return ecache[enc]; var m = {}, dec = new TextDecoder(enc), i, j, s;
    for (i = 0; i < 256; i++) { s = dec.decode(new Uint8Array([i])); if (s.length === 1 && s !== '\ufffd' && !(s in m)) m[s] = [i]; }
    if (enc !== 'windows-1252') for (i = 0x81; i <= 0xFE; i++) for (j = 0x40; j <= 0xFE; j++) { s = dec.decode(new Uint8Array([i, j])); if (s.length === 1 && s !== '\ufffd' && !(s in m)) m[s] = [i, j]; }
    return (ecache[enc] = m);
  }
  function encode(str, enc) { if (enc === 'utf-8') return Array.from(new TextEncoder().encode(str)); var t = encTable(enc), out = []; for (var ch of str) { var b = t[ch]; if (!b) return null; out.push.apply(out, b); } return out; }
  function decode(bytes, enc) { return new TextDecoder(enc).decode(new Uint8Array(bytes)); }
  function mojiTool(box) {
    box.innerHTML = '<label class="mja-lbl" for="mja-mj-in">輸入正常文字產生亂碼，或貼上亂碼嘗試還原</label><textarea id="mja-mj-in" class="mja-mj-in" rows="4">你好，這是亂碼測試。</textarea><div class="mja-form"><button type="button" class="mja-btn mja-mj-g">產生亂碼</button><button type="button" class="mja-btn mja-mj-r">嘗試還原</button></div><div class="mja-out mja-mj-o"></div>';
    var i = $('.mja-mj-in', box), o = $('.mja-mj-o', box);
    function table(rows, head) {
      o.textContent = ''; if (!rows.length) { o.appendChild(el('p', null, '沒有找到可用的組合。')); return; }
      var tb = el('table', 'mja-table'), th = el('thead'), tr = el('tr'); head.forEach(function (h) { tr.appendChild(el('th', null, h)); }); th.appendChild(tr); tb.appendChild(th);
      var body = el('tbody'); rows.forEach(function (r) { var rr = el('tr'); rr.appendChild(el('td', null, r[0])); var c = el('td', 'mja-mj-txt'); c.appendChild(el('span', null, r[1])); c.appendChild(copyBtn(r[1])); rr.appendChild(c); body.appendChild(rr); }); tb.appendChild(body);
      var w = el('div', 'mja-tablewrap'); w.appendChild(tb); o.appendChild(w);
    }
    function gen() {
      var s = i.value, rows = [];
      ENC.forEach(function (a) { ENC.forEach(function (b) { if (a[0] === b[0]) return; var by = encode(s, a[0]); if (!by) return; var r = decode(by, b[0]); if (r !== s) rows.push(['以 ' + a[1] + ' 存檔，用 ' + b[1] + ' 開啟', r]); }); });
      table(rows, ['情境', '會看到的亂碼']);
    }
    function fix() {
      var s = i.value, rows = [];
      ENC.forEach(function (b) { ENC.forEach(function (a) { if (a[0] === b[0]) return; var by = encode(s, b[0]); if (!by) return; var r = decode(by, a[0]); if (r.indexOf('\ufffd') >= 0 || r === s) return; var cjk = (r.match(/[\u4e00-\u9fff]/g) || []).length; rows.push([cjk, '原本是 ' + a[1] + '，被誤當 ' + b[1] + ' 讀取', r]); }); });
      rows.sort(function (x, y) { return y[0] - x[0]; }); table(rows.slice(0, 8).map(function (r) { return [r[1], r[2]]; }), ['可能的原因', '還原結果（請挑讀得通的那一列）']);
    }
    $('.mja-mj-g', box).addEventListener('click', gen); $('.mja-mj-r', box).addEventListener('click', fix); gen();
  }

  /* 複製按鈕：原始站台由頁面層級腳本處理，抽離為獨立檔案後自行委派 / copy buttons: the live site wires them at page level, so the standalone file delegates them itself */
  d.addEventListener('click', function (ev) {
    var t = ev.target, b = t && t.closest ? t.closest('[data-copy]') : null;
    if (!b || !W.navigator || !W.navigator.clipboard) return;
    W.navigator.clipboard.writeText(b.getAttribute('data-copy') || '');
  });

  function init() {
    $$('[data-mja-tool="mojibake"]').forEach(function (b) { try { mojiTool(b); b.classList.add('is-ready'); } catch (e) { if (W.console) console.error('mja mojibake', e); } });
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();

  /* 供測試或頁面重複呼叫 / exposed for tests or reuse from other pages */
  W.mjaMojibake = { encodings: ENC, encTable: encTable, encode: encode, decode: decode, tool: mojiTool };
})();
