# iconv-jschardet

> JavaScript 字符編碼轉換與自動檢測工具 (支援 iconv-lite, jschardet) / Character encoding conversion and auto-detection tool in JavaScript (supports iconv-lite, jschardet)

## 安裝 / Installation

```bash
npm install iconv-jschardet
```

```bash
yarn add iconv-jschardet
```

```bash
pnpm add iconv-jschardet
```

## 功能特色 / Features

- ✅ **自動編碼檢測** - 使用 jschardet 自動識別文本編碼 / Auto-detection of text encoding using jschardet
- ✅ **多編碼支援** - 支援 Big5、GBK、UTF-8、ASCII 等多種編碼 / Support for multiple encodings including Big5, GBK, UTF-8, ASCII
- ✅ **Buffer 轉換** - 提供靈活的 Buffer 轉換功能 / Flexible Buffer conversion capabilities
- ✅ **TypeScript 支援** - 完整的 TypeScript 類型定義 / Complete TypeScript type definitions
- ✅ **Node.js 相容** - 與 Node.js 原生 Buffer API 完全相容 / Fully compatible with Node.js native Buffer API

## 使用範例 / Usage Examples

### 基本匯入 / Basic Import

```ts
import * as iconv from 'iconv-jschardet';

// 或使用預設匯入 / Or use default import
import iconv from 'iconv-jschardet';
```

### BufferFrom - 多格式轉換 / BufferFrom - Multi-format Conversion

```js
const BIG5_HEX = 'a6b8b160a5ceb0eaa672bcd0b7c7a672c5e9aaed';

// 轉換為 UTF-8 Buffer / Convert to UTF-8 Buffer
iconv.BufferFrom(Buffer.from(BIG5_HEX, 'hex'), 'utf8')
iconv.BufferFrom(BIG5_HEX, 'utf8', 'hex')

// 轉換為 Big5 Buffer / Convert to Big5 Buffer
iconv.BufferFrom(Buffer.from(BIG5_HEX, 'hex'), 'big5')
iconv.BufferFrom(BIG5_HEX, 'big5', 'hex')
```

### 編碼檢測與轉換 / Encoding Detection and Conversion

```js
const BIG5_STR = "\xa6\xb8\xb1\x60\xa5\xce\xb0\xea\xa6\x72\xbc\xd0\xb7\xc7\xa6\x72\xc5\xe9\xaa\xed";
const BIG5_BUF = Buffer.from('a6b8b160a5ceb0eaa672bcd0b7c7a672c5e9aaed', 'hex');

const BIG5_UTF8_BUF = Buffer.from('e6 ac a1 e5 b8 b8 e7 94 a8 e5 9c 8b e5 ad 97 e6 a8 99 e6 ba 96 e5 ad 97 e9 ab 94 e8 a1 a8'.replace(/\s/g, ''), 'hex');
```

```ts
// 編碼檢測 / Encoding Detection
// 同等於 jschardet.detect
// Equivalent to jschardet.detect
iconv.detect(BIG5_STR);
iconv.detect(BIG5_BUF);

// 編碼轉換 / Encoding Conversion
// Big5 Buffer
iconv.encode(BIG5_STR, 'big5');
iconv.encode(BIG5_BUF, 'big5');

// UTF-8 Buffer
iconv.encode(BIG5_STR, 'utf8');
iconv.encode(BIG5_BUF, 'utf8');

// UTF-8 字串
iconv.decode(BIG5_STR);
iconv.decode(BIG5_BUF);
```

### 進階功能 / Advanced Features

```ts
// 停用解碼警告 / Disable decode warnings
iconv.skipDecodeWarning(bool: boolean = true)

// 停用編碼資料警告 / Disable codec data warnings
iconv.disableCodecDataWarn(bool: boolean = true)
```

## API 文件 / API Documentation

### 主要函數 / Main Functions

#### `detect(str, plus?: boolean): IDetectData`
自動檢測輸入內容的編碼格式
Automatically detect the encoding format of input content

#### `encode(str, to: vEncoding, from?: vEncoding, options?: IOptionsIconvLite): Buffer`
將輸入內容轉換為指定編碼的 Buffer
Convert input content to Buffer with specified encoding

#### `decode(str, from?: vEncoding): string`
將輸入內容解碼為字串
Decode input content to string

#### `BufferFrom(str, encoding?: vEncoding, from?: vEncoding, options?: IOptionsIconvLite): Buffer`
將多種格式的輸入轉換為 Buffer
Convert various input formats to Buffer

#### `skipDecodeWarning(bool?: boolean): boolean`
控制是否顯示解碼警告
Control whether to display decode warnings

#### `disableCodecDataWarn(bool?: boolean): boolean`
控制是否顯示編碼資料警告
Control whether to display codec data warnings

## 相關套件 / Related Packages

- [fs-iconv](https://www.npmjs.com/package/fs-iconv) - 檔案系統編碼處理 / File system encoding handling
- [iconv-lite](https://www.npmjs.com/package/iconv-lite) - 輕量級編碼轉換 / Lightweight encoding conversion
- [jschardet](https://www.npmjs.com/package/jschardet) - 編碼自動檢測 / Automatic encoding detection

## 貢獻 / Contributing

歡迎提交 Issue 和 Pull Request！

Welcome to submit Issues and Pull Requests!

## 授權 / License

ISC
