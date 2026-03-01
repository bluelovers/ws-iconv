# path-in-dir - 檢查路徑是否在目錄內

這個模組提供了檢查一個路徑是否位於指定目錄內的功能。

## 主要功能

- 檢查路徑是否在目錄內
- 支援跨平台路徑
- 自動規範化路徑
- 完全相容於 Node.js 路徑處理

## 安裝

```bash
yarn add path-in-dir
yarn-tool add path-in-dir
yt add path-in-dir
```

## 快速開始

```typescript
import pathInsideDirectory from 'path-in-dir';

// 檢查路徑是否在目錄內
const result1 = pathInsideDirectory('/home/user/projects/my-app/src', '/home/user/projects');
console.log(result1); // true

const result2 = pathInsideDirectory('/home/user/other-project/src', '/home/user/projects');
console.log(result2); // false

// 檢查子目錄
const result3 = pathInsideDirectory('/home/user/projects/my-app/src/components', '/home/user/projects/my-app');
console.log(result3); // true
```

## API 文件

### pathInsideDirectory(input: string, dir: string): boolean

檢查路徑是否在目錄內。

**參數：**
- `input` (string): 要檢查的路徑
- `dir` (string): 目錄路徑

**返回值：**
- `boolean`: 如果路徑在目錄內則返回 true，否則返回 false

## 使用範例

### 基本檢查

```typescript
import pathInsideDirectory from 'path-in-dir';

// 檢查檔案是否在目錄內
const isInDir = pathInsideDirectory('/Users/name/Documents/file.txt', '/Users/name/Documents');
console.log(isInDir); // true

// 檢查檔案是否不在目錄內
const isNotInDir = pathInsideDirectory('/Users/name/Downloads/file.txt', '/Users/name/Documents');
console.log(isNotInDir); // false
```

### 檢查子目錄

```typescript
import pathInsideDirectory from 'path-in-dir';

// 檢查子目錄是否在父目錄內
const isSubDir = pathInsideDirectory('/home/user/projects/my-app/src', '/home/user/projects');
console.log(isSubDir); // true

// 檢查同級目錄
const isSiblingDir = pathInsideDirectory('/home/user/projects/other-app', '/home/user/projects/my-app');
console.log(isSiblingDir); // false
```

### 跨平台使用

```typescript
import pathInsideDirectory from 'path-in-dir';

// Windows 路徑
const windowsResult = pathInsideDirectory('C:\\Users\\name\\Documents\\file.txt', 'C:\\Users\\name\\Documents');
console.log(windowsResult); // true

// Unix 路徑
const unixResult = pathInsideDirectory('/home/user/file.txt', '/home/user');
console.log(unixResult); // true
```

### 實際應用場景

```typescript
import pathInsideDirectory from 'path-in-dir';
import { readdirSync } from 'fs';
import { join } from 'path';

// 安全的檔案讀取 - 確保檔案在允許的目錄內
function safeReadFile(filePath: string, allowedDir: string) {
  if (!pathInsideDirectory(filePath, allowedDir)) {
    throw new Error(`Access denied: ${filePath} is outside allowed directory ${allowedDir}`);
  }
  
  // 安全地讀取檔案
  return require('fs').readFileSync(filePath, 'utf8');
}

// 使用範例
try {
  const content = safeReadFile('/home/user/projects/app/config.json', '/home/user/projects');
  console.log(content);
} catch (error) {
  console.error(error.message);
}
```

### 與其他路徑模組結合使用

```typescript
import pathInsideDirectory from 'path-in-dir';
import { pathDirNormalize } from 'path-dir-normalize';
import { normalize } from 'upath2';

// 處理不規範的路徑
const dirtyPath = '/home/user/projects/../projects/my-app/src';
const cleanPath = normalize(dirtyPath);
const targetDir = pathDirNormalize('/home/user/projects');

const result = pathInsideDirectory(cleanPath, targetDir);
console.log(result); // true
```

## 注意事項

1. **路徑規範化**：模組會自動規範化輸入的路徑，處理 `..` 和 `.` 等相對路徑
2. **跨平台相容**：支援 Windows、Unix 和其他平台的路徑格式
3. **大小寫敏感**：在大小寫敏感的檔案系統上，路徑比較也是大小寫敏感的
4. **效能**：對於大量路徑檢查，建議快取結果以提高效能

## 貢獻

歡迎提交問題和拉取請求！

## 授權

ISC

