# @lazy-iconv/html-encoding-sniffer

Normalize HTML encoding by sniffing and decoding with proper encoding.
透過偵測和解碼正確編碼來標準化 HTML 編碼。

This module is inspired by [JSDOM's html-encoding-sniffer implementation](https://github.com/jsdom/jsdom/blob/04f6c13f4a4d387c7fc979b8f62c6f68d8a0c639/lib/api.js#L288).
此模組靈感來自 [JSDOM 的 html-encoding-sniffer 實作](https://github.com/jsdom/jsdom/blob/04f6c13f4a4d387c7fc979b8f62c6f68d8a0c639/lib/api.js#L288)。

## Features / 功能

- Auto-detect HTML encoding from Buffer/ArrayBuffer / 從 Buffer/ArrayBuffer 自動偵測 HTML 編碼
- Decode HTML with proper encoding / 使用正確編碼解碼 HTML
- Support transport layer encoding label / 支援傳輸層編碼標籤
- Support string, Buffer, and ArrayBuffer input / 支援字串、Buffer 和 ArrayBuffer 輸入

## Install / 安裝

```bash
yarn add @lazy-iconv/html-encoding-sniffer
yarn-tool add @lazy-iconv/html-encoding-sniffer
yt add @lazy-iconv/html-encoding-sniffer
pnpm add @lazy-iconv/html-encoding-sniffer
npm install @lazy-iconv/html-encoding-sniffer
```

## Quick Start / 快速開始

```typescript
import { normalizeHTML } from '@lazy-iconv/html-encoding-sniffer';

// From Buffer / 從 Buffer
const buffer = Buffer.from('<html>...', 'utf-8');
const result = normalizeHTML(buffer);
console.log(result.html);     // Decoded HTML string
console.log(result.encoding); // Detected encoding: 'UTF-8'

// From ArrayBuffer / 從 ArrayBuffer
const arrayBuffer = new ArrayBuffer(100);
const result2 = normalizeHTML(arrayBuffer);

// From string / 從字串
const result3 = normalizeHTML('<html>...</html>');

// With transport layer encoding / 使用傳輸層編碼
const result4 = normalizeHTML(buffer, 'text/html; charset=utf-8');
```

## API

### `normalizeHTML(html, transportLayerEncodingLabel?)`

Normalizes HTML input by detecting and decoding with proper encoding.
透過偵測和解碼正確編碼來標準化 HTML 輸入。

#### Parameters / 參數

- `html: string | Buffer | ArrayBuffer` - The HTML input / HTML 輸入
- `transportLayerEncodingLabel?: string` - Optional transport layer encoding hint / 可選的傳輸層編碼提示

#### Returns / 返回

```typescript
interface INormalizeHTML {
  html: string;      // Normalized HTML string / 標準化後的 HTML 字串
  encoding: string;  // Detected encoding / 偵測到的編碼
}
```

## Dependencies / 依賴

- [html-encoding-sniffer](https://www.npmjs.com/package/html-encoding-sniffer) - HTML encoding detection
- [whatwg-encoding](https://www.npmjs.com/package/whatwg-encoding) - Encoding decoding according to WHATWG standard

