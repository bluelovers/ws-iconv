# fs-remove-extra

Remove files or directories with sync/async operations and type filtering.
刪除檔案和目錄，支援同步/異步操作和類型過濾。

## Features / 主要功能

- Remove files and directories / 刪除檔案和目錄
- Sync and async operations / 支援同步和異步操作
- Type filtering (files only or directories only) / 選項過濾（只刪除檔案或只刪除目錄）
- Silent handling for non-existent paths / 靜默處理不存在的路徑
- Compatible with fs-extra / 完全相容於 fs-extra

## Install / 安裝

```bash
yarn add fs-remove-extra
yarn-tool add fs-remove-extra
yt add fs-remove-extra
pnpm add fs-remove-extra
npm install fs-remove-extra
```

## Quick Start / 快速開始

```typescript
import { 
  fsRemove, 
  fsRemoveSync,
  fsRemoveFile,
  fsRemoveFileSync,
  fsRemoveDirectories,
  fsRemoveDirectoriesSync 
} from 'fs-remove-extra';

// Remove file or directory (async) / 刪除檔案或目錄（異步）
await fsRemove('./path-to-remove');

// Remove file or directory (sync) / 刪除檔案或目錄（同步）
fsRemoveSync('./path-to-remove');

// Remove only files / 只刪除檔案
await fsRemoveFile('./file.txt');
fsRemoveFileSync('./file.txt');

// Remove only directories / 只刪除目錄
await fsRemoveDirectories('./directory');
fsRemoveDirectoriesSync('./directory');

// With options / 使用選項
await fsRemove('./path', { onlyFiles: true });
await fsRemove('./path', { onlyDirectories: true });
```

## API

### `fsRemove(dirOrFile, options?)`
Removes a file or directory asynchronously. The directory can have contents.
異步刪除檔案或目錄。目錄可以有內容。

### `fsRemoveSync(dirOrFile, options?)`
Removes a file or directory synchronously. The directory can have contents.
同步刪除檔案或目錄。目錄可以有內容。

### `fsRemoveFile(dirOrFile)`
Removes only files asynchronously.
僅異步刪除檔案。

### `fsRemoveFileSync(dirOrFile)`
Removes only files synchronously.
僅同步刪除檔案。

### `fsRemoveDirectories(dirOrFile)`
Removes only directories asynchronously.
僅異步刪除目錄。

### `fsRemoveDirectoriesSync(dirOrFile)`
Removes only directories synchronously.
僅同步刪除目錄。

### Options / 選項

- `onlyFiles?: boolean` - Only remove if path is a file / 只在路徑是檔案時刪除
- `onlyDirectories?: boolean` - Only remove if path is a directory / 只在路徑是目錄時刪除

