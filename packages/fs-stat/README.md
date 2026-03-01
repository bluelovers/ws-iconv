# fs-stat - 檔案系統狀態檢查工具

這個模組提供了檔案系統狀態檢查的功能，包括檔案/目錄屬性檢查、符號連結檢查等。

## 主要功能

- 檔案系統狀態檢查
- 同步和異步操作
- 符號連結檢查
- 檔案/目錄類型過濾
- 錯誤處理
- 完全相容於 Node.js fs 模組

## 安裝

```bash
yarn add fs-stat
yarn-tool add fs-stat
yt add fs-stat
```

## 快速開始

```typescript
import fsStat from 'fs-stat';

// 檢查檔案狀態
const stat = await fsStat('/path/to/file');
console.log('檔案大小:', stat.size);
console.log('是否為檔案:', stat.isFile());
console.log('是否為目錄:', stat.isDirectory());

// 檢查符號連結
const isSymlink = await fsStat.isSymbolicLink('/path/to/symlink');
console.log('是否為符號連結:', isSymlink);

// 同步操作
import fsStatSync from 'fs-stat';
const syncStat = fsStatSync('/path/to/file');
console.log('檔案大小:', syncStat.size);
```

## API 文件

### fsStat<S extends IStatsInput = Stats>(path: string | Buffer, options?: IOptions): Promise<S>

檢查檔案系統狀態（異步）。

**參數：**
- `path` (string | Buffer): 要檢查的路徑
- `options` (IOptions): 選項物件

**返回值：**
- `Promise<S>`: Promise，解析為狀態物件

### fsStatSync<S extends IStatsInput = Stats>(path: string | Buffer, options?: IOptions): S

檢查檔案系統狀態（同步）。

**參數：**
- `path` (string | Buffer): 要檢查的路徑
- `options` (IOptions): 選項物件

**返回值：**
- `S`: 狀態物件

### isSymbolicLink(dir0: string, options?: IOptions): Promise<boolean>

檢查是否為符號連結（異步）。

**參數：**
- `dir0` (string): 要檢查的路徑
- `options` (IOptions): 選項物件

**返回值：**
- `Promise<boolean>`: Promise，解析為是否為符號連結

### isSymbolicLinkSync(dir0: string, options?: IOptions): boolean

檢查是否為符號連結（同步）。

**參數：**
- `dir0` (string): 要檢查的路徑
- `options` (IOptions): 選項物件

**返回值：**
- `boolean`: 是否為符號連結

### isSameStat<S extends IStatsInput>(st1: S, st2: S, ...stats: S[]): boolean

檢查多個狀態物件是否相同。

**參數：**
- `st1` (S): 第一個狀態物件
- `st2` (S): 第二個狀態物件
- `...stats` (S[]): 其他狀態物件

**返回值：**
- `boolean`: 是否所有狀態物件相同

### isDirectoryOrFileStat(stat: IStatsInput, opts: ITSRequireAtLeastOne<IOptionsIsDirectoryOrFileStat>): boolean

檢查狀態物件是否為目錄或檔案。

**參數：**
- `stat` (IStatsInput): 狀態物件
- `opts` (ITSRequireAtLeastOne<IOptionsIsDirectoryOrFileStat>): 選項物件

**返回值：**
- `boolean`: 是否符合條件

### isExistsStat(stat: IStatsInput, options?: IOptionsIsDirectoryOrFileStat): boolean

檢查狀態物件是否存在。

**參數：**
- `stat` (IStatsInput): 狀態物件
- `options` (IOptionsIsDirectoryOrFileStat): 選項物件

**返回值：**
- `boolean`: 是否符合條件

### fsStatExists(path: string | Buffer, options?: IOptionsWithOnlyDirectoryOrFile): Promise<boolean>

檢查檔案系統狀態是否存在（異步）。

**參數：**
- `path` (string | Buffer): 要檢查的路徑
- `options` (IOptionsWithOnlyDirectoryOrFile): 選項物件

**返回值：**
- `Promise<boolean>`: Promise，解析為是否符合條件

### fsStatExistsSync(path: string | Buffer, options?: IOptionsWithOnlyDirectoryOrFile): boolean

檢查檔案系統狀態是否存在（同步）。

**參數：**
- `path` (string | Buffer): 要檢查的路徑
- `options` (IOptionsWithOnlyDirectoryOrFile): 選項物件

**返回值：**
- `boolean`: 是否符合條件

### IOptions 介面

```typescript
interface IOptions extends StatSyncOptions, StatOptions {
  followSymlinks?: boolean;           // 是否跟隨符號連結
  allowSymlinks?: boolean;            // 別名：followSymlinks
  throwIfNoEntry?: boolean;           // 如果不存在是否拋出錯誤
  onlyDirectories?: boolean;          // 只檢查目錄
  onlyFiles?: boolean;                // 只檢查檔案
}
```

## 使用範例

### 基本檔案檢查

```typescript
import fsStat from 'fs-stat';

// 檢查檔案是否存在
const stat = await fsStat('/home/user/documents/file.txt');
if (stat) {
  console.log('檔案大小:', stat.size);
  console.log('建立時間:', stat.birthtime);
  console.log('修改時間:', stat.mtime);
} else {
  console.log('檔案不存在');
}
```

### 目錄檢查

```typescript
import fsStat from 'fs-stat';

// 檢查是否為目錄
const stat = await fsStat('/home/user/documents', { onlyDirectories: true });
if (stat) {
  console.log('這是一個目錄');
  console.log('目錄大小:', stat.size);
} else {
  console.log('這不是目錄或不存在');
}
```

### 檔案類型過濾

```typescript
import fsStat from 'fs-stat';

// 只檢查檔案
const fileStat = await fsStat('/home/user/documents/file.txt', { onlyFiles: true });
if (fileStat) {
  console.log('這是一個檔案');
  console.log('檔案大小:', fileStat.size);
} else {
  console.log('這不是檔案或不存在');
}
```

### 符號連結檢查

```typescript
import fsStat from 'fs-stat';

// 檢查是否為符號連結
const isSymlink = await fsStat.isSymbolicLink('/home/user/shortcut');
console.log('是否為符號連結:', isSymlink);

// 檢查符號連結指向的實際檔案
const stat = await fsStat('/home/user/shortcut', { followSymlinks: true });
console.log('符號連結指向的檔案大小:', stat?.size);
```

### 同步操作

```typescript
import fsStatSync from 'fs-stat';

// 同步檢查檔案
try {
  const stat = fsStatSync('/home/user/documents/file.txt');
  console.log('檔案大小:', stat.size);
  console.log('是否為檔案:', stat.isFile());
} catch (error) {
  console.error('檢查失敗:', error.message);
}
```

### 實際應用場景

```typescript
import fsStat from 'fs-stat';
import { readdir } from 'fs/promises';

// 安全的目錄遍歷
async function safeDirectoryTraversal(dirPath: string) {
  const stat = await fsStat(dirPath, { onlyDirectories: true });
  
  if (!stat) {
    throw new Error(`路徑不存在或不是目錄: ${dirPath}`);
  }
  
  const files = await readdir(dirPath);
  const results = [];
  
  for (const file of files) {
    const filePath = `${dirPath}/${file}`;
    const fileStat = await fsStat(filePath);
    
    results.push({
      name: file,
      isFile: fileStat?.isFile(),
      isDirectory: fileStat?.isDirectory(),
      size: fileStat?.size,
      modified: fileStat?.mtime
    });
  }
  
  return results;
}

// 使用範例
try {
  const files = await safeDirectoryTraversal('/home/user/documents');
  console.log(files);
} catch (error) {
  console.error(error.message);
}
```

### 狀態比較

```typescript
import fsStat from 'fs-stat';

// 比較兩個檔案是否相同
async function compareFiles(file1: string, file2: string) {
  const stat1 = await fsStat(file1);
  const stat2 = await fsStat(file2);
  
  if (stat1 && stat2) {
    const isSame = fsStat.isSameStat(stat1, stat2);
    console.log(`檔案 ${file1} 和 ${file2} 是否相同:`, isSame);
    return isSame;
  }
  
  return false;
}

// 使用範例
const isSame = await compareFiles('/home/user/file1.txt', '/home/user/file2.txt');
```

### 錯誤處理

```typescript
import fsStat from 'fs-stat';

// 安全的檔案檢查
async function safeFileCheck(filePath: string) {
  try {
    const stat = await fsStat(filePath, { throwIfNoEntry: false });
    
    if (!stat) {
      console.log('檔案不存在');
      return null;
    }
    
    return {
      exists: true,
      size: stat.size,
      isFile: stat.isFile(),
      isDirectory: stat.isDirectory(),
      isSymbolicLink: stat.isSymbolicLink()
    };
    
  } catch (error) {
    console.error('檢查失敗:', error.message);
    return null;
  }
}

// 使用範例
const result = await safeFileCheck('/home/user/nonexistent.txt');
console.log(result); // null
```

## 注意事項

1. **符號連結處理**：
   - 預設情況下，`fsStat` 會跟隨符號連結
   - 使用 `followSymlinks: false` 可以檢查符號連結本身
2. **錯誤處理**：
   - 預設情況下，不存在的檔案會返回 `undefined`
   - 使用 `throwIfNoEntry: true` 可以拋出錯誤
3. **類型過濾**：
   - `onlyFiles` 和 `onlyDirectories` 可以過濾結果
   - 兩者不能同時使用
4. **效能**：
   - 同步操作會阻塞事件循環
   - 大量檔案檢查時建議使用異步操作

## 貢獻

歡迎提交問題和拉取請求！

## 授權

ISC

