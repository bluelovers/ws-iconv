# bom-encoding

Create or detect BOM (Byte Order Mark) encoding.
創建或偵測位元組順序標記 (BOM) 編碼。

## Install / 安裝

```bash
yarn add bom-encoding
yarn-tool add bom-encoding
yt add bom-encoding
pnpm add bom-encoding
npm install bom-encoding
```

## Usage / 使用方式

```typescript
import { createBOMEncoding, detectBOMEncoding, EnumEncoding } from 'bom-encoding';

// Create BOM for UTF-8
const utf8BOM = createBOMEncoding(EnumEncoding.utf_8);
console.log(utf8BOM); // [0xEF, 0xBB, 0xBF]

// Detect BOM from buffer
const buffer = new Uint8Array([0xEF, 0xBB, 0xBF, 0x68, 0x65, 0x6C, 0x6C, 0x6F]);
const encoding = detectBOMEncoding(buffer);
console.log(encoding); // "UTF-8"
```

## Supported Encodings / 支援的編碼

- UTF-8
- UTF-16BE
- UTF-16LE
- UTF-32BE
- UTF-32LE
- GB-18030
- Unicode

## API

### `createBOMEncoding(encoding, options?)`
Creates a BOM byte array for the specified encoding.
為指定的編碼創建 BOM 位元組陣列。

### `detectBOMEncoding(buffer, options?)`
Detects the encoding from a buffer by checking its BOM.
透過檢查位元組順序標記從緩衝區偵測編碼。

