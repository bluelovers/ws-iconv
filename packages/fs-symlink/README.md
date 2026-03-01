# fs-symlink-extra - 符號連結和硬連結工具

這個模組提供了符號連結和硬連結的創建和管理功能，支援同步和異步操作，並包含覆蓋處理。

## 主要功能

- 符號連結創建
- 硬連結創建
- 同步和異步操作
- 覆蓋現有檔案處理
- 跨平台相容性

## 安裝

```bash
yarn add fs-symlink-extra
yarn-tool add fs-symlink-extra
yt add fs-symlink-extra
```

## 快速開始

```typescript
import fsSymlink from 'fs-symlink-extra';

// 創建符號連結
await fsSymlink('/path/to/source', '/path/to/symlink');

// 創建硬連結
import { fsHardlink } from 'fs-symlink';
await fsHardlink('/path/to/source', '/path/to/hardlink');

// 同步操作
import fsSymlinkSync from 'fs-symlink';
fsSymlinkSync('/path/to/source', '/path/to/symlink');
```

## API 文件

### fsSymlink(src: string, dest: string, options?: IOptions): Promise<void>

創建符號連結（異步）。

**參數：**
- `src` (string): 來源路徑
- `dest` (string): 目標路徑
- `options` (IOptions): 選項物件

**返回值：**
- `Promise<void>`: Promise

### fsSymlinkSync(src: string, dest: string, options?: IOptions): void

創建符號連結（同步）。

**參數：**
- `src` (string): 來源路徑
- `dest` (string): 目標路徑
- `options` (IOptions): 選項物件

**返回值：**
- `void`

### fsHardlink(src: string, dest: string, options?: IOptions): Promise<void>

創建硬連結（異步）。

**參數：**
- `src` (string): 來源路徑
- `dest` (string): 目標路徑
- `options` (IOptions): 選項物件

**返回值：**
- `Promise<void>`: Promise

### fsHardlinkSync(src: string, dest: string, options?: IOptions): void

創建硬連結（同步）。

**參數：**
- `src` (string): 來源路徑
- `dest` (string): 目標路徑
- `options` (IOptions): 選項物件

**返回值：**
- `void`

### IOptions 介面

```typescript
interface IOptions {
  overwrite?: boolean;    // 是否覆蓋現有檔案
  type?: SymlinkType;     // 符號連結類型（僅適用於符號連結）
}
```

## 使用範例

### 基本符號連結

```typescript
import fsSymlink from 'fs-symlink';

// 創建符號連結
try {
  await fsSymlink('/home/user/documents/file.txt', '/home/user/shortcut.txt');
  console.log('符號連結創建成功');
} catch (error) {
  console.error('創建失敗:', error);
}
```

### 帶選項的符號連結

```typescript
import fsSymlink from 'fs-symlink';

// 覆蓋現有檔案
await fsSymlink('/home/user/documents/file.txt', '/home/user/shortcut.txt', {
  overwrite: true
});

// 指定符號連結類型
await fsSymlink('/home/user/documents/file.txt', '/home/user/shortcut.txt', {
  type: 'file'  // 'file' | 'dir' | 'junction'
});
```

### 硬連結

```typescript
import { fsHardlink } from 'fs-symlink';

// 創建硬連結
try {
  await fsHardlink('/home/user/documents/file.txt', '/home/user/hardlink.txt');
  console.log('硬連結創建成功');
} catch (error) {
  console.error('創建失敗:', error);
}
```

### 同步操作

```typescript
import fsSymlinkSync from 'fs-symlink';

// 同步創建符號連結
try {
  fsSymlinkSync('/home/user/documents/file.txt', '/home/user/shortcut.txt');
  console.log('符號連結創建成功');
} catch (error) {
  console.error('創建失敗:', error);
}
```

### 實際應用場景

```typescript
import fsSymlink from 'fs-symlink';
import { existsSync } from 'fs';

// 安全的符號連結創建
async function createSafeSymlink(src: string, dest: string) {
  // 檢查來源檔案是否存在
  if (!existsSync(src)) {
    throw new Error(`來源檔案不存在: ${src}`);
  }

  // 創建符號連結
  await fsSymlink(src, dest, { overwrite: true });
  console.log(`符號連結已創建: ${dest} -> ${src}`);
}

// 使用範例
try {
  await createSafeSymlink('/home/user/app/config.json', '/home/user/config.json');
} catch (error) {
  console.error(error.message);
}
```

### 批量創建符號連結

```typescript
import fsSymlink from 'fs-symlink';

// 批量創建符號連結
async function createMultipleSymlinks(links: Array<{ src: string, dest: string }>) {
  for (const { src, dest } of links) {
    try {
      await fsSymlink(src, dest, { overwrite: true });
      console.log(`✓ ${dest} -> ${src}`);
    } catch (error) {
      console.error(`✗ ${dest}: ${error.message}`);
    }
  }
}

// 使用範例
const links = [
  { src: '/usr/local/bin/app1', dest: '/usr/bin/app1' },
  { src: '/usr/local/bin/app2', dest: '/usr/bin/app2' },
  { src: '/usr/local/bin/app3', dest: '/usr/bin/app3' }
];

await createMultipleSymlinks(links);
```

### 與其他檔案操作模組結合

```typescript
import fsSymlink from 'fs-symlink';
import { fsStat } from 'fs-stat';
import { pathIsSame } from 'path-is-same';

// 檢查符號連結狀態
async function checkSymlinkStatus(symlinkPath: string) {
  try {
    const stat = await fsStat(symlinkPath);
    console.log('符號連結存在');

    // 檢查是否指向相同的實體
    const target = await fs.readlink(symlinkPath);
    const isSame = pathIsSame(symlinkPath, target);
    console.log('指向相同實體:', isSame);

  } catch (error) {
    console.error('符號連結不存在或損壞:', error.message);
  }
}
```

## 注意事項

1. **權限要求**：創建符號連結可能需要特殊權限，特別是在 Windows 系統上
2. **平台差異**：
   - Windows 支援 junctions 和符號連結
   - Unix 系統支援符號連結和硬連結
3. **硬連結限制**：
   - 硬連結只能在同一個檔案系統內創建
   - 不能為目錄創建硬連結（某些檔案系統除外）
4. **符號連結類型**：
   - `file`: 指向檔案的符號連結
   - `dir`: 指向目錄的符號連結
   - `junction`: Windows junction points

## 貢獻

歡迎提交問題和拉取請求！

## 授權

ISC

