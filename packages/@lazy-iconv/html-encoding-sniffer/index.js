"use strict";
/**
 * HTML Encoding Sniffer Module
 * HTML 編碼偵測模組
 *
 * 提供自動偵測和解碼 HTML 編碼的功能，支援多種輸入格式
 * Provides automatic HTML encoding detection and decoding with support for multiple input formats
 *
 * @module @lazy-iconv/html-encoding-sniffer
 * @author bluelovers
 * @see https://github.com/jsdom/jsdom/blob/master/lib/api.js
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeHTML = normalizeHTML;
const tslib_1 = require("tslib");
const html_encoding_sniffer_1 = tslib_1.__importDefault(require("html-encoding-sniffer"));
const whatwg_encoding_1 = tslib_1.__importDefault(require("whatwg-encoding"));
/**
 * 將 HTML 輸入標準化（內部實作）
 * Normalize HTML input (internal implementation)
 *
 * @param {any} [html=''] - HTML 輸入（字串、Buffer 或 ArrayBuffer）/ HTML input (string, Buffer, or ArrayBuffer)
 * @param {string} [transportLayerEncodingLabel] - 傳輸層編碼標籤 / Transport layer encoding label
 * @returns {INormalizeHTML} - 包含標準化 HTML 和編碼資訊的物件 / Object containing normalized HTML and encoding info
 */
function normalizeHTML(html = '', transportLayerEncodingLabel) {
    /**
     * 預設編碼為 UTF-8
     * Default encoding is UTF-8
     */
    let encoding = "UTF-8";
    /**
     * 處理 TypedArray（如 Uint8Array）輸入
     * Handle TypedArray (e.g., Uint8Array) input
     */
    if (ArrayBuffer.isView(html)) {
        // 從 TypedArray 創建 Buffer / Create Buffer from TypedArray
        // @ts-ignore
        html = Buffer.from(html.buffer, html.byteOffset, html.byteLength);
    }
    /**
     * 處理 ArrayBuffer 輸入
     * Handle ArrayBuffer input
     */
    else if (html instanceof ArrayBuffer) {
        // 從 ArrayBuffer 創建 Buffer / Create Buffer from ArrayBuffer
        html = Buffer.from(html);
    }
    /**
     * 如果是 Buffer，則偵測編碼並解碼
     * If Buffer, detect encoding and decode
     */
    if (Buffer.isBuffer(html)) {
        /**
         * 使用 html-encoding-sniffer 偵測編碼
         * 預設編碼為 windows-1252，並考慮傳輸層編碼標籤
         */
        encoding = (0, html_encoding_sniffer_1.default)(html, { defaultEncoding: "windows-1252", transportLayerEncodingLabel });
        /**
         * 使用 whatwg-encoding 根據偵測到的編碼解碼 Buffer
         * Decode Buffer using whatwg-encoding with detected encoding
         */
        html = whatwg_encoding_1.default.decode(html, encoding);
    }
    /**
     * 如果是字串，則直接轉換為字串
     * If string, convert directly to string
     */
    else {
        html = String(html);
    }
    // 返回標準化結果 / Return normalized result
    return { html, encoding };
}
/**
 * 預設導出：normalizeHTML 函數
 * Default export: normalizeHTML function
 */
exports.default = normalizeHTML;
//# sourceMappingURL=index.js.map