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

import sniffHTMLEncoding from 'html-encoding-sniffer';
import whatwgEncoding from 'whatwg-encoding';

/**
 * 標準化 HTML 結果介面
 * Normalized HTML result interface
 */
export interface INormalizeHTML
{
	/**
	 * 標準化後的 HTML 字串
	 * Normalized HTML string
	 */
	html: string,

	/**
	 * 偵測到的編碼
	 * Detected encoding
	 */
	encoding: string,
}

/**
 * 將 HTML 輸入標準化，自動偵測並解碼編碼
 * Normalize HTML input by detecting and decoding encoding
 *
 * 支援字串、Buffer 和 ArrayBuffer 輸入，自動偵測正確的編碼並解碼為 UTF-8 字串
 * Supports string, Buffer, and ArrayBuffer input, auto-detects correct encoding and decodes to UTF-8 string
 *
 * @param {string} html - HTML 字串輸入 / HTML string input
 * @param {string} [transportLayerEncodingLabel] - 傳輸層編碼標籤（可選）/ Transport layer encoding label (optional)
 * @returns {INormalizeHTML} - 包含標準化 HTML 和編碼資訊的物件 / Object containing normalized HTML and encoding info
 *
 * @example
 * ```typescript
 * const result = normalizeHTML('<html>...</html>');
 * console.log(result.html);     // '<html>...</html>'
 * console.log(result.encoding); // 'UTF-8'
 * ```
 */
export function normalizeHTML(html: string, transportLayerEncodingLabel?: string): INormalizeHTML

/**
 * 將 HTML Buffer 標準化，自動偵測並解碼編碼
 * Normalize HTML Buffer by detecting and decoding encoding
 *
 * 使用 html-encoding-sniffer 偵測 Buffer 的編碼，然後使用 whatwg-encoding 解碼
 * Uses html-encoding-sniffer to detect Buffer encoding, then decodes with whatwg-encoding
 *
 * @param {Buffer} html - HTML Buffer 輸入 / HTML Buffer input
 * @param {string} [transportLayerEncodingLabel] - 傳輸層編碼標籤（可選）/ Transport layer encoding label (optional)
 * @returns {INormalizeHTML} - 包含標準化 HTML 和編碼資訊的物件 / Object containing normalized HTML and encoding info
 *
 * @example
 * ```typescript
 * const buffer = Buffer.from('<html>...</html>', 'utf-8');
 * const result = normalizeHTML(buffer);
 * console.log(result.encoding); // 'UTF-8'
 * ```
 */
export function normalizeHTML(html: Buffer, transportLayerEncodingLabel?: string): INormalizeHTML

/**
 * 將 HTML ArrayBuffer 標準化，自動偵測並解碼編碼
 * Normalize HTML ArrayBuffer by detecting and decoding encoding
 *
 * 先將 ArrayBuffer 轉換為 Buffer，然後進行編碼偵測和解碼
 * Converts ArrayBuffer to Buffer first, then performs encoding detection and decoding
 *
 * @param {ArrayBuffer} html - HTML ArrayBuffer 輸入 / HTML ArrayBuffer input
 * @param {string} [transportLayerEncodingLabel] - 傳輸層編碼標籤（可選）/ Transport layer encoding label (optional)
 * @returns {INormalizeHTML} - 包含標準化 HTML 和編碼資訊的物件 / Object containing normalized HTML and encoding info
 *
 * @example
 * ```typescript
 * const arrayBuffer = new ArrayBuffer(100);
 * const result = normalizeHTML(arrayBuffer);
 * console.log(result.encoding); // Detected encoding
 * ```
 */
export function normalizeHTML(html: ArrayBuffer, transportLayerEncodingLabel?: string): INormalizeHTML

/**
 * 將 HTML 輸入標準化（內部實作）
 * Normalize HTML input (internal implementation)
 *
 * @param {any} [html=''] - HTML 輸入（字串、Buffer 或 ArrayBuffer）/ HTML input (string, Buffer, or ArrayBuffer)
 * @param {string} [transportLayerEncodingLabel] - 傳輸層編碼標籤 / Transport layer encoding label
 * @returns {INormalizeHTML} - 包含標準化 HTML 和編碼資訊的物件 / Object containing normalized HTML and encoding info
 */
export function normalizeHTML(html: any = '', transportLayerEncodingLabel?: string): INormalizeHTML
{
	/**
	 * 預設編碼為 UTF-8
	 * Default encoding is UTF-8
	 */
	let encoding = "UTF-8";

	/**
	 * 處理 TypedArray（如 Uint8Array）輸入
	 * Handle TypedArray (e.g., Uint8Array) input
	 */
	if (ArrayBuffer.isView(html))
	{
		// 從 TypedArray 創建 Buffer / Create Buffer from TypedArray
		// @ts-ignore
		html = Buffer.from(html.buffer, html.byteOffset, html.byteLength);
	}
	/**
	 * 處理 ArrayBuffer 輸入
	 * Handle ArrayBuffer input
	 */
	else if (html instanceof ArrayBuffer)
	{
		// 從 ArrayBuffer 創建 Buffer / Create Buffer from ArrayBuffer
		html = Buffer.from(html);
	}

	/**
	 * 如果是 Buffer，則偵測編碼並解碼
	 * If Buffer, detect encoding and decode
	 */
	if (Buffer.isBuffer(html))
	{
		/**
		 * 使用 html-encoding-sniffer 偵測編碼
		 * 預設編碼為 windows-1252，並考慮傳輸層編碼標籤
		 */
		encoding = sniffHTMLEncoding(html, { defaultEncoding: "windows-1252", transportLayerEncodingLabel });

		/**
		 * 使用 whatwg-encoding 根據偵測到的編碼解碼 Buffer
		 * Decode Buffer using whatwg-encoding with detected encoding
		 */
		html = whatwgEncoding.decode(html, encoding);
	}
	/**
	 * 如果是字串，則直接轉換為字串
	 * If string, convert directly to string
	 */
	else
	{
		html = String(html);
	}

	// 返回標準化結果 / Return normalized result
	return { html, encoding };
}

/**
 * 預設導出：normalizeHTML 函數
 * Default export: normalizeHTML function
 */
export default normalizeHTML
