# fs-realpath-native

File system real path resolution with sync/async operations and error handling.
檔案系統實體路徑處理，支援同步/異步操作和錯誤處理。

## Features / 主要功能

- Real path resolution / 實體路徑解析
- Sync and async operations / 同步和異步操作
- Error handling (ENOENT safe) / 錯誤處理（安全處理路徑不存在）
- Encoding options support / 支援不同編碼選項
- Compatible with Node.js fs module / 完全相容於 Node.js fs 模組

## Install / 安裝

```bash
yarn add fs-realpath-native
yarn-tool add fs-realpath-native
yt add fs-realpath-native
pnpm add fs-realpath-native
npm install fs-realpath-native
```

## Quick Start / 快速開始

```typescript
import { 
  fsRealpathNativeSync, 
  fsRealpathNativeAsync,
  tryFsRealpathNativeSync,
  tryFsRealpathNativeAsync 
} from 'fs-realpath-native';

// Synchronous / 同步
const realPath = fsRealpathNativeSync('./symlink-to-file');
console.log(realPath);

// Asynchronous / 異步
const realPathAsync = await fsRealpathNativeAsync('./symlink-to-file');
console.log(realPathAsync);

// Safe version (returns original path if not exists) / 安全版本（路徑不存在時返回原路徑）
const safePath = tryFsRealpathNativeSync('./maybe-not-exists');
console.log(safePath);
```

## API

### `fsRealpathNativeSync(path, options?)`
Resolves the real path synchronously using native OS methods.
使用原生作業系統方法同步解析實體路徑。

### `fsRealpathNativeAsync(path, options?)`
Resolves the real path asynchronously using native OS methods.
使用原生作業系統方法異步解析實體路徑。

### `tryFsRealpathNativeSync(path, options?)`
Safely resolves the real path synchronously. Returns original path if not exists.
安全地同步解析實體路徑。如果路徑不存在則返回原路徑。

### `tryFsRealpathNativeAsync(path, options?)`
Safely resolves the real path asynchronously. Returns original path if not exists.
安全地異步解析實體路徑。如果路徑不存在則返回原路徑。

