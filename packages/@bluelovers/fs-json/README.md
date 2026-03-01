# @bluelovers/fs-json

Enhanced JSON file operations with final EOL (End of Line) support.
增強型 JSON 檔案操作，支援結尾換行符號（EOL）。

## Features / 功能

- Read and write JSON files / 讀寫 JSON 檔案
- Output JSON with auto directory creation / 輸出 JSON 並自動創建目錄
- Stringify JSON with final EOL option / 字串化 JSON 並支援結尾換行選項
- Parse JSON from string or Uint8Array / 從字串或 Uint8Array 解析 JSON
- Based on fs-extra and jsonfile / 基於 fs-extra 和 jsonfile

## Install / 安裝

```bash
yarn add @bluelovers/fs-json
yarn-tool add @bluelovers/fs-json
yt add @bluelovers/fs-json
pnpm add @bluelovers/fs-json
npm install @bluelovers/fs-json
```

## Quick Start / 快速開始

```typescript
import {
  readJSON,
  readJSONSync,
  writeJSON,
  writeJSONSync,
  outputJSON,
  outputJSONSync,
  stringifyJSON,
  parseJSON
} from '@bluelovers/fs-json';

// Read JSON / 讀取 JSON
const data = await readJSON('config.json');
const dataSync = readJSONSync('config.json');

// Write JSON / 寫入 JSON
await writeJSON('output.json', { key: 'value' });
writeJSONSync('output.json', { key: 'value' });

// Output JSON (creates directory if needed) / 輸出 JSON（必要時創建目錄）
await outputJSON('path/to/file.json', { key: 'value' });
outputJSONSync('path/to/file.json', { key: 'value' });

// Stringify with final EOL / 字串化並添加結尾換行
const jsonString = stringifyJSON({ key: 'value' });
console.log(jsonString); // '{"key":"value"}\n'

// Parse JSON / 解析 JSON
const obj = parseJSON('{"key":"value"}');
const objFromUint8 = parseJSON(new Uint8Array([123, 34, 107, 101, 121, 34, 58, 34, 118, 97, 108, 117, 101, 34, 125]));
```

## API

### `readJSON(file, options?)` / `readJSONSync(file, options?)`
Reads a JSON file asynchronously or synchronously.
異步或同步讀取 JSON 檔案。

### `writeJSON(file, data, options?)` / `writeJSONSync(file, data, options?)`
Writes a JSON file asynchronously or synchronously.
異步或同步寫入 JSON 檔案。

### `outputJSON(file, data, options?)` / `outputJSONSync(file, data, options?)`
Writes a JSON file, creating the directory if it doesn't exist.
寫入 JSON 檔案，如果目錄不存在則自動創建。

### `stringifyJSON(data, options?)`
Stringifies data to JSON with final EOL support.
將資料字串化為 JSON，支援結尾換行。

### `parseJSON(stringOrUint8Array, reviver?)`
Parses JSON from string or Uint8Array.
從字串或 Uint8Array 解析 JSON。

### Options / 選項

```typescript
interface IWriteOptions {
  finalEOL?: boolean;  // Add final newline (default: true) / 添加結尾換行（預設：true）
  spaces?: string | number;  // Indentation / 縮排
  // ... other fs-extra/jsonfile options
}
```

