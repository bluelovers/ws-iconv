# path-is-same - 路徑比較工具

這個模組提供了多種路徑比較功能，可以檢查多個路徑是否指向相同的檔案或目錄。

## 主要功能

- 檢查多個路徑是否相同
- 檢查多個路徑是否指向相同的實體檔案
- 支援相對路徑比較
- 支援網路磁碟機路徑
- 完全相容於 Node.js 路徑處理

## 安裝

```bash
yarn add path-is-same
yarn-tool add path-is-same
yt add path-is-same
```

## 快速開始

```typescript
import pathIsSame from 'path-is-same';

// 檢查兩個路徑是否相同
const result = pathIsSame('/path/to/file', '/path/to/file');
console.log(result); // true

// 檢查多個路徑是否相同
const result2 = pathIsSame('/path/to/file', '/path/to/file', '/path/to/file');
console.log(result2); // true
```

## API 文件

### pathIsSame(p1: string, ...ps: string[]): boolean

檢查多個路徑是否相同。

**參數：**
- `p1` (string): 第一個路徑
- `...ps` (string[]): 其他路徑

**返回值：**
- `boolean`: 如果所有路徑相同則返回 true，否則返回 false

### fsSameRealpath(p1: string, ...ps: string[]): boolean

檢查多個路徑是否指向相同的實體檔案。

**參數：**
- `p1` (string): 第一個路徑
- `...ps` (string[]): 其他路徑

**返回值：**
- `boolean`: 如果所有路徑指向相同的實體檔案則返回 true，否則返回 false

### _pathIsSame(p1: string, p2: string): boolean

內部函數：檢查兩個路徑是否相同。

**參數：**
- `p1` (string): 第一個路徑
- `p2` (string): 第二個路徑

**返回值：**
- `boolean`: 如果路徑相同則返回 true，否則返回 false

### _assertInputArgv(p1: string, ...ps: string[]): void

內部函數：檢查輸入參數是否有效。

**參數：**
- `p1` (string): 第一個路徑
- `...ps` (string[]): 其他路徑

**拋出：**
- `TypeError`: 如果沒有提供足夠的路徑參數

## 使用範例

### 基本路徑比較

```typescript
import pathIsSame from 'path-is-same';

// 檢查相對路徑
console.log(pathIsSame('./file.txt', './file.txt')); // true

// 檢查絕對路徑
console.log(pathIsSame('/home/user/file.txt', '/home/user/file.txt')); // true

// 檢查不同路徑
console.log(pathIsSame('/path/to/file', '/different/path/file')); // false
```

### 實體檔案比較

```typescript
import { fsSameRealpath } from 'path-is-same';

// 檢查符號連結是否指向相同檔案
console.log(fsSameRealpath('/path/to/link1', '/path/to/link2')); // true/false

// 檢查硬連結是否指向相同檔案
console.log(fsSameRealpath('/path/to/hardlink1', '/path/to/hardlink2')); // true/false
```

### 多路徑比較

```typescript
import pathIsSame from 'path-is-same';

// 檢查多個路徑是否都相同
const paths = ['/path/to/file', '/path/to/file', '/path/to/file'];
console.log(pathIsSame(...paths)); // true

// 檢查多個路徑是否不完全相同
const differentPaths = ['/path/to/file1', '/path/to/file2', '/path/to/file3'];
console.log(pathIsSame(...differentPaths)); // false
```

## 貢獻

歡迎提交問題和拉取請求！

## 授權

ISC

