# find-up-paths - 向上搜尋檔案或目錄
# find-up-paths - Find files or directories by walking up

從當前目錄開始向上遍歷父目錄，尋找符合條件的檔案或目錄。
Walks up from current directory through parent directories to find matching files or directories.

## 安裝 (Installation)

```bash
# 使用 yarn / Using yarn
yarn add find-up-paths

# 使用 yarn-tool / Using yarn-tool
yarn-tool add find-up-paths
# yt 是 yarn-tool 的別名 / yt is an alias for yarn-tool
yt add find-up-paths

# 使用 pnpm / Using pnpm
pnpm add find-up-paths

# 使用 npm / Using npm
npm install find-up-paths
```

## 使用範例 (Usage)

```typescript
import { findUpPaths, findUpPathsAsync } from 'find-up-paths';

// 同步搜尋 / Synchronous search
const result = findUpPaths('package.json');
console.log(result);
// { stat: Stats, result: '/path/to/package.json', dir: '/path/to' }

// 異步搜尋 / Asynchronous search
const resultAsync = await findUpPathsAsync(['.gitignore', '.git']);
console.log(resultAsync);

// 僅搜尋目錄 / Search directories only
const dirResult = findUpPaths('node_modules', { onlyDirectories: true });

// 向上搜尋並在找不到時拋出錯誤 / Throw if not found
findUpPaths('config.json', { throwIfNoEntry: true });
```

## API

### findUpPaths(pattern, options?)

同步向上搜尋檔案或目錄。
Synchronously find files or directories by walking up.

### findUpPathsAsync(pattern, options?)

異步向上搜尋檔案或目錄。
Asynchronously find files or directories by walking up.

### Options

- `onlyDirectories` - 僅搜尋目錄 / Only search directories
- `onlyFiles` - 僅搜尋檔案 / Only search files
- `throwIfNoEntry` - 找不到時拋出錯誤 / Throw error when not found
- `includeCurrentDirectory` - 包含當前目錄 / Include current directory

