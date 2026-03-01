# @lazy-node/util-buffer - Buffer 工具函數模組

這個模組提供了多種 Buffer 處理的工具函數，包括字串搜尋、截取、分割等功能，讓 Buffer 操作更加方便和高效。

## 主要功能

- Buffer 字串搜尋和定位
- Buffer 結尾檢查和截取
- Buffer 分割功能
- 支援多種輸入類型
- TypeScript 友好的類型定義

## 安裝

```bash
yarn add @lazy-node/util-buffer
yarn-tool add @lazy-node/util-buffer
yt add @lazy-node/util-buffer
```

## 快速開始

```typescript
import { bufferEndWith, splitBufferByBuffer } from '@lazy-node/util-buffer';

// 檢查 Buffer 是否以指定值結尾
const buffer = Buffer.from('Hello, World!');
const endsWithWorld = bufferEndWith(buffer, 'World!');
console.log(endsWithWorld); // true

// 分割 Buffer
const lines = splitBufferByBuffer(buffer, Buffer.from('\n'));
console.log(lines); // [Buffer.from('Hello, World!')]
```

## API 文件

### 類型定義

#### IBufferValueInput
Buffer 值輸入類型，支援多種類型的輸入。

```typescript
type IBufferValueInput = string | number | Uint8Array | Buffer;
```

### 工具函數

#### _valueLength(value: IBufferValueInput): number
獲取值的長度。

**參數：**
- `value` (IBufferValueInput): 要計算長度的值

**返回值：**
- `number`: 值的長度

#### _bufferLastIndexOf(buf: Buffer, value: IBufferValueInput, byteOffset?: number, encoding?: BufferEncoding): {len: number, i: number}
在 Buffer 中尋找最後出現的位置。

**參數：**
- `buf` (Buffer): 要搜尋的 Buffer
- `value` (IBufferValueInput): 要尋找的值
- `byteOffset` (number): 搜尋的起始位置
- `encoding` (BufferEncoding): 字串編碼格式

**返回值：**
- `{len: number, i: number}`: 包含長度和索引的物件

#### bufferEndWith(buf: Buffer, value: IBufferValueInput, byteOffset?: number, encoding?: BufferEncoding): boolean
檢查 Buffer 是否以指定值結尾。

**參數：**
- `buf` (Buffer): 要檢查的 Buffer
- `value` (IBufferValueInput): 要檢查的值
- `byteOffset` (number): 搜尋的起始位置
- `encoding` (BufferEncoding): 字串編碼格式

**返回值：**
- `boolean`: 是否以指定值結尾

#### bufferStripEndWith(buf: Buffer, value: IBufferValueInput, byteOffset?: number, encoding?: BufferEncoding): Buffer
移除 Buffer 結尾的指定值。

**參數：**
- `buf` (Buffer): 要處理的 Buffer
- `value` (IBufferValueInput): 要移除的值
- `byteOffset` (number): 搜尋的起始位置
- `encoding` (BufferEncoding): 字串編碼格式

**返回值：**
- `Buffer`: 處理後的 Buffer

#### bufferIndexWith(buf: Buffer, value: IBufferValueInput, byteOffset: number, encoding?: BufferEncoding): boolean
檢查 Buffer 是否在指定位置包含指定值。

**參數：**
- `buf` (Buffer): 要檢查的 Buffer
- `value` (IBufferValueInput): 要尋找的值
- `byteOffset` (number): 搜尋的起始位置
- `encoding` (BufferEncoding): 字串編碼格式

**返回值：**
- `boolean`: 是否在指定位置找到值

#### splitBufferByBuffer(buffer: Buffer, value: Uint8Array): Buffer[]
根據指定值分割 Buffer。

**參數：**
- `buffer` (Buffer): 要分割的 Buffer
- `value` (Uint8Array): 分隔值

**返回值：**
- `Buffer[]`: 分割後的 Buffer 陣列

## 使用範例

### 基本使用

```typescript
import { bufferEndWith, bufferStripEndWith } from '@lazy-node/util-buffer';

const buffer = Buffer.from('Hello, World!');

// 檢查是否以特定字串結尾
const endsWith = bufferEndWith(buffer, 'World!');
console.log(endsWith); // true

// 移除結尾字串
const stripped = bufferStripEndWith(buffer, 'World!');
console.log(stripped.toString()); // 'Hello, '
```

### Buffer 分割

```typescript
import { splitBufferByBuffer } from '@lazy-node/util-buffer';

const text = Buffer.from('line1\nline2\nline3');
const lines = splitBufferByBuffer(text, Buffer.from('\n'));

lines.forEach((line, index) => {
  console.log(`Line ${index + 1}: ${line.toString()}`);
});

// 輸出：
// Line 1: line1
// Line 2: line2
// Line 3: line3
```

### 實際應用場景

```typescript
import { bufferEndWith, bufferIndexWith } from '@lazy-node/util-buffer';

// 處理網路資料流
function processStreamData(buffer: Buffer): void {
  // 檢查是否包含完整訊息
  if (bufferEndWith(buffer, Buffer.from('\r\n'))) {
    console.log('收到完整訊息');
  }
  
  // 檢查特定位置是否包含標頭
  if (bufferIndexWith(buffer, 'HTTP/', 0)) {
    console.log('這是 HTTP 訊息');
  }
}

// 使用範例
const data = Buffer.from('HTTP/1.1 200 OK\r\n');
processStreamData(data);
```

### 與其他模組整合

```typescript
import { splitBufferByBuffer } from '@lazy-node/util-buffer';
import { Buffer } from 'buffer';

// 處理 CSV 資料
function parseCSV(buffer: Buffer): string[][] {
  const lines = splitBufferByBuffer(buffer, Buffer.from('\n'));
  
  return lines.map(line => {
    const fields = splitBufferByBuffer(line, Buffer.from(','));
    return fields.map(field => field.toString().trim());
  });
}

// 使用範例
const csvData = Buffer.from('name,age,city\nJohn,25,Taipei\nJane,30,Kaohsiung');
const parsed = parseCSV(csvData);

console.log(parsed);
// [
//   ['name', 'age', 'city'],
//   ['John', '25', 'Taipei'],
//   ['Jane', '30', 'Kaohsiung']
// ]
```

## 注意事項

- 所有函數都支援 TypeScript 類型檢查
- Buffer 處理是位元組級別的操作
- 某些函數有 @deprecated 標記，建議使用新的命名
- 處理大 Buffer 時請注意記憶體使用

## 貢獻

歡迎提交問題和拉取請求！

## 授權

ISC
