# @lazy-node/is-writeable-path - 路徑可寫入檢測模組

這個模組提供了檢測目標路徑是否可寫入的功能，支援同步和非同步操作，可以檢測檔案和目錄的可寫入狀態。

## 主要功能

- 檢測路徑是否可寫入（同步和非同步）
- 檢測檔案是否可寫入
- 檢測目錄是否可寫入
- 支援 Node.js 檔案系統權限檢查

## 安裝

```bash
yarn add @lazy-node/is-writeable-path
yarn-tool add @lazy-node/is-writeable-path
yt add @lazy-node/is-writeable-path
```

## 快速開始

```typescript
import { isWritableSync, isWritableAsync } from '@lazy-node/is-writeable-path';

// 同步檢測
const isWritable = isWritableSync('/path/to/file');
console.log('路徑可寫入:', isWritable);

// 非同步檢測
const isWritableAsync = await isWritableAsync('/path/to/file');
console.log('路徑可寫入:', isWritableAsync);
```

## API 文件

### 基本檢測函數

#### isWritableAsync(target: PathLike): Promise<boolean>
非同步檢測路徑是否可寫入。

**參數：**
- `target` (PathLike): 要檢測的路徑

**返回值：**
- `Promise<boolean>`: 檢測結果，true 表示可寫入，false 表示不可寫入

#### isWritableSync(target: PathLike): boolean
同步檢測路徑是否可寫入。

**參數：**
- `target` (PathLike): 要檢測的路徑

**返回值：**
- `boolean`: 檢測結果，true 表示可寫入，false 表示不可寫入

### 檔案檢測函數

#### isWritableFileAsync(target: PathLike): Promise<boolean>
非同步檢測檔案是否可寫入。

**參數：**
- `target` (PathLike): 要檢測的檔案路徑

**返回值：**
- `Promise<boolean>`: 檢測結果

#### isWritableFileSync(target: PathLike): boolean
同步檢測檔案是否可寫入。

**參數：**
- `target` (PathLike): 要檢測的檔案路徑

**返回值：**
- `boolean`: 檢測結果

### 目錄檢測函數

#### isWritableDirectoryAsync(target: PathLike): Promise<boolean>
非同步檢測目錄是否可寫入。

**參數：**
- `target` (PathLike): 要檢測的目錄路徑

**返回值：**
- `Promise<boolean>`: 檢測結果

#### isWritableDirectorySync(target: PathLike): boolean
同步檢測目錄是否可寫入。

**參數：**
- `target` (PathLike): 要檢測的目錄路徑

**返回值：**
- `boolean`: 檢測結果

## 使用範例

### 基本使用

```typescript
import { isWritableSync, isWritableAsync } from '@lazy-node/is-writeable-path';

// 檢測檔案是否可寫入
const filePath = '/path/to/myfile.txt';
const canWrite = isWritableSync(filePath);
console.log(`檔案 ${filePath} 是否可寫入: ${canWrite}`);

// 檢測目錄是否可寫入
const dirPath = '/path/to/mydirectory';
const canWriteDir = isWritableSync(dirPath);
console.log(`目錄 ${dirPath} 是否可寫入: ${canWriteDir}`);
```

### 非同步使用

```typescript
import { isWritableAsync } from '@lazy-node/is-writeable-path';

async function checkWriteable() {
  try {
    const canWrite = await isWritableAsync('/path/to/file');
    console.log('路徑可寫入:', canWrite);
  } catch (error) {
    console.error('檢查失敗:', error);
  }
}

checkWriteable();
```

### 檢測特定類型

```typescript
import { 
  isWritableFileAsync, 
  isWritableFileSync,
  isWritableDirectoryAsync,
  isWritableDirectorySync 
} from '@lazy-node/is-writeable-path';

// 檢測檔案
const isFileWritable = isWritableFileSync('/path/to/file.txt');
console.log('檔案可寫入:', isFileWritable);

// 檢測目錄
const isDirWritable = isWritableDirectorySync('/path/to/directory');
console.log('目錄可寫入:', isDirWritable);
```

### 實際應用場景

```typescript
import { isWritableSync } from '@lazy-node/is-writeable-path';
import { writeFileSync } from 'fs';

function safeWriteFile(filePath: string, content: string) {
  // 先檢查路徑是否可寫入
  if (!isWritableSync(filePath)) {
    throw new Error(`路徑 ${filePath} 不可寫入`);
  }

  // 安全地寫入檔案
  writeFileSync(filePath, content);
  console.log(`成功寫入檔案: ${filePath}`);
}

// 使用範例
try {
  safeWriteFile('/path/to/output.txt', 'Hello, World!');
} catch (error) {
  console.error('寫入失敗:', error.message);
}
```

## 錯誤處理

模組會自動處理以下情況：

1. **路徑不存在**：返回 false
2. **權限不足**：返回 false
3. **非檔案/目錄類型**：根據檢測類型返回 false

## 注意事項

- 模組使用 Node.js 的 `fs.access()` 和 `fs.accessSync()` 進行權限檢查
- 檢測結果基於當前程序的執行權限
- 在 Windows 系統上，某些特殊檔案名稱可能需要特殊處理

## 貢獻

歡迎提交問題和拉取請求！

## 授權

ISC
