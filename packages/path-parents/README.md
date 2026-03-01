# path-parents - 父目錄路徑處理工具

這個模組提供了獲取所有父目錄路徑的功能，支援多種選項和平台。

## 主要功能

- 獲取所有父目錄路徑
- 支援多種選項（限制層數、停止路徑等）
- 跨平台相容性
- 生成器函數
- 路徑分割功能

## 安裝

```bash
yarn add path-parents
yarn-tool add path-parents
yt add path-parents
```

## 快速開始

```typescript
import pathParents from 'path-parents';

// 獲取所有父目錄路徑
const parents = pathParents('/home/user/projects/my-app/src/components');
console.log(parents);
// 輸出: ['/home/user/projects/my-app/src/components', '/home/user/projects/my-app/src', '/home/user/projects/my-app', '/home/user/projects', '/home/user', '/home', '/']

// 使用選項限制層數
const limitedParents = pathParents('/home/user/projects/my-app/src/components', { limit: 3 });
console.log(limitedParents);
// 輸出: ['/home/user/projects/my-app/src/components', '/home/user/projects/my-app/src', '/home/user/projects/my-app']

// 使用停止路徑
const parentsUntilProject = pathParents('/home/user/projects/my-app/src/components', { stopPath: '/home/user/projects' });
console.log(parentsUntilProject);
// 輸出: ['/home/user/projects/my-app/src/components', '/home/user/projects/my-app/src', '/home/user/projects/my-app', '/home/user/projects']
```

## API 文件

### pathParents(cwd?: string | IOptions, opts?: IOptions): string[]

獲取所有父目錄路徑。

**參數：**
- `cwd` (string | IOptions): 當前工作目錄或選項物件
- `opts` (IOptions): 選項物件

**返回值：**
- `string[]`: 所有父目錄路徑陣列

### pathParentsGenerator(cwd?: string | IOptions, opts?: IOptions): Generator<string>

生成器函數，逐個產生父目錄路徑。

**參數：**
- `cwd` (string | IOptions): 當前工作目錄或選項物件
- `opts` (IOptions): 選項物件

**返回值：**
- `Generator<string>`: 父目錄路徑生成器

### pathSplit(cwd?: string | IOptions, opts?: IOptions): string[]

分割路徑為各個部分。

**參數：**
- `cwd` (string | IOptions): 當前工作目錄或選項物件
- `opts` (IOptions): 選項物件

**返回值：**
- `string[]`: 路徑部分陣列

### pathSplitGenerator(cwd?: string | IOptions, opts?: IOptions): Generator<string>

生成器函數，逐個產生路徑部分。

**參數：**
- `cwd` (string | IOptions): 當前工作目錄或選項物件
- `opts` (IOptions): 選項物件

**返回值：**
- `Generator<string>`: 路徑部分生成器

### handleOptions<T extends IOptions>(cwd?: string | T, opts?: T): IRuntime<T>

處理選項參數。

**參數：**
- `cwd` (string | T): 當前工作目錄或選項
- `opts` (T): 選項

**返回值：**
- `IRuntime<T>`: 執行時環境物件

## 選項物件 (IOptions)

### IOptions 介面

```typescript
interface IOptions {
  cwd?: string;           // 當前工作目錄
  platform?: IPathPlatform; // 平台類型
  stopPath?: string | string[]; // 停止路徑
  limit?: number;         // 限制層數
  includeCurrentDirectory?: boolean; // 是否包含當前目錄
}
```

## 使用範例

### 基本用法

```typescript
import pathParents from 'path-parents';

// 獲取所有父目錄
const allParents = pathParents('/Users/name/Documents/project/src');
console.log(allParents);
```

### 限制層數

```typescript
import pathParents from 'path-parents';

// 只獲取前 3 層父目錄
const limitedParents = pathParents('/Users/name/Documents/project/src', { limit: 3 });
console.log(limitedParents);
```

### 使用停止路徑

```typescript
import pathParents from 'path-parents';

// 停止在特定路徑
const parentsUntilStop = pathParents('/Users/name/Documents/project/src', { 
  stopPath: '/Users/name/Documents' 
});
console.log(parentsUntilStop);
```

### 跨平台使用

```typescript
import pathParents from 'path-parents';

// 指定平台
const windowsParents = pathParents('C:\\Users\\name\\Documents\\project', { 
  platform: 'win32' 
});
console.log(windowsParents);
```

### 路徑分割

```typescript
import { pathSplit } from 'path-parents';

// 分割路徑
const pathParts = pathSplit('/Users/name/Documents/project/src');
console.log(pathParts);
// 輸出: ['src', 'project', 'Documents', 'name', 'Users']
```

### 生成器使用

```typescript
import { pathParentsGenerator } from 'path-parents';

// 使用生成器
for (const parent of pathParentsGenerator('/Users/name/Documents/project/src')) {
  console.log(parent);
}
```

## 貢獻

歡迎提交問題和拉取請求！

## 授權

MIT

