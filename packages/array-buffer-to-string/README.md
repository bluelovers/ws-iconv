# @bluelovers/array-buffer-to-string

Convert ArrayBuffer to string or Buffer with encoding support.
將 ArrayBuffer 轉換為字串或 Buffer，支援編碼。

## Install / 安裝

```bash
yarn add @bluelovers/array-buffer-to-string
yarn-tool add @bluelovers/array-buffer-to-string
yt add @bluelovers/array-buffer-to-string
pnpm add @bluelovers/array-buffer-to-string
npm install @bluelovers/array-buffer-to-string
```

## Usage / 使用方式

### Basic Usage / 基本使用

```typescript
import { arrayBufferToString, arrayBufferToBuffer } from '@bluelovers/array-buffer-to-string';

// Convert ArrayBuffer to string
const buffer = new ArrayBuffer(8);
const str = arrayBufferToString(buffer, 'utf-8');

// Convert ArrayBuffer to Node.js Buffer
const nodeBuffer = arrayBufferToBuffer(buffer, 'utf-8');
```

### With iconv-jschardet / 使用 iconv-jschardet

```typescript
import { arrayBufferToString, arrayBufferToBuffer } from '@bluelovers/array-buffer-to-string/iconv';

// Convert with encoding detection
const str = arrayBufferToString(buffer, 'utf-8', 'auto');
```

## API

### `arrayBufferToString(buf, encoding?, from?)`
Converts ArrayBuffer to string.
將 ArrayBuffer 轉換為字串。

- `buf`: Source ArrayBuffer, number array, or Uint8Array
- `encoding`: Target encoding (default: 'utf-8')
- `from`: Source encoding (optional)

### `arrayBufferToBuffer(buf, encoding?, from?)`
Converts ArrayBuffer to Node.js Buffer.
將 ArrayBuffer 轉換為 Node.js Buffer。

- `buf`: Source ArrayBuffer, number array, or Uint8Array
- `encoding`: Target encoding (default: 'utf-8')
- `from`: Source encoding (optional)

