# fs-hardlink-win

Windows hardlink inspection tool. List all hardlinks for a specified file.
Windows 硬連結檢查工具。可以列出指定檔案的所有硬連結。

## Features / 主要功能

- List all hardlinks for a file / 檢查硬連結列表
- Async and sync operations / 支援異步和同步操作
- Uses Windows fsutil command / 使用 fsutil 命令
- Built-in output processing / 內建輸出處理

## Install / 安裝

```bash
yarn add fs-hardlink-win
yarn-tool add fs-hardlink-win
yt add fs-hardlink-win
pnpm add fs-hardlink-win
npm install fs-hardlink-win
```

## Quick Start / 快速開始

```typescript
import { winHardlinkList, winHardlinkListSync } from 'fs-hardlink-win';

// Async / 異步
const hardlinks = await winHardlinkList('C:\\path\\to\\file.txt');
console.log(hardlinks);
// Output: ['C:\\path\\to\\file.txt', 'C:\\another\\path\\hardlink.txt']

// Sync / 同步
const hardlinksSync = winHardlinkListSync('C:\\path\\to\\file.txt');
console.log(hardlinksSync);

// With options / 使用選項
const hardlinksWithCwd = await winHardlinkList('file.txt', {
  cwd: 'C:\\some\\directory'
});
```

## API

### `winHardlinkList(file, options?)`
Lists all hardlinks for a file asynchronously using Windows fsutil command.
使用 Windows fsutil 命令異步列出檔案的所有硬連結。

### `winHardlinkListSync(file, options?)`
Lists all hardlinks for a file synchronously using Windows fsutil command.
使用 Windows fsutil 命令同步列出檔案的所有硬連結。

### Options / 選項

- `cwd?: string` - Working directory for the command / 命令的工作目錄

## Note / 注意事項

This module only works on Windows systems with fsutil available.
此模組僅在有 fsutil 可用的 Windows 系統上運作。

