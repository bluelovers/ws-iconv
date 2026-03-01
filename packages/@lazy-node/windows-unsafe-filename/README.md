# @lazy-node/windows-unsafe-filename - Windows 不安全檔案名稱檢測模組

這個模組提供了檢測和處理 Windows 系統中不安全檔案名稱的功能。Windows 系統有特定的保留字元和裝置名稱，不能用作檔案名稱。

## 主要功能

- 檢測 Windows 保留的裝置名稱
- 支援標準模式和擴展模式
- 提供正規表示式建立功能
- 支援字串替換功能
- 跨平台相容性

## 安裝

```bash
yarn add @lazy-node/windows-unsafe-filename
yarn-tool add @lazy-node/windows-unsafe-filename
yt add @lazy-node/windows-unsafe-filename
```

## 快速開始

```typescript
import { hasWindowsUnsafeName, replaceWindowsUnsafeName } from '@lazy-node/windows-unsafe-filename';

// 檢測不安全名稱
const isUnsafe = hasWindowsUnsafeName('con.txt');
console.log(isUnsafe); // 匹配結果陣列

// 替換不安全名稱
const safeName = replaceWindowsUnsafeName('con.txt', 'safe_name');
console.log(safeName); // 'safe_name.txt'
```

## API 文件

### 主要函數

#### newRegExpWindowsUnsafeName(mode?: boolean): RegExp
建立 Windows 不安全名稱的正規表示式。

**參數：**
- `mode` (boolean): 是否使用擴展模式（支援 com00-lpt99）

**返回值：**
- `RegExp`: 檢測 Windows 不安全名稱的正規表示式

**模式說明：**
- `false` (預設): 標準模式，支援 com0-lpt9
- `true`: 擴展模式，支援 com00-lpt99

#### hasWindowsUnsafeName(name: string, mode?: boolean): RegExpMatchArray | null
檢測字串是否包含 Windows 不安全名稱。

**參數：**
- `name` (string): 要檢測的字串
- `mode` (boolean): 是否使用擴展模式

**返回值：**
- `RegExpMatchArray | null`: 匹配結果，null 表示安全

#### replaceWindowsUnsafeName(name: string, replaceValue: string | ((substring: string, ...args: (string | undefined)[]) => string), mode?: boolean): string
替換 Windows 不安全名稱。

**參數：**
- `name` (string): 要處理的字串
- `replaceValue` (string | function): 替換值或回呼函數
- `mode` (boolean): 是否使用擴展模式

**返回值：**
- `string`: 處理後的字串

## 使用範例

### 基本檢測

```typescript
import { hasWindowsUnsafeName } from '@lazy-node/windows-unsafe-filename';

// 檢測常見的 Windows 保留名稱
const testNames = [
  'con.txt',
  'prn.doc',
  'aux.exe',
  'nul.bat',
  'com1.log',
  'lpt1.dat',
  'normal.txt'
];

testNames.forEach(name => {
  const result = hasWindowsUnsafeName(name);
  console.log(`${name}: ${result ? '不安全' : '安全'}`);
});

// 輸出：
// con.txt: 不安全
// prn.doc: 不安全
// aux.exe: 不安全
// nul.bat: 不安全
// com1.log: 不安全
// lpt1.dat: 不安全
// normal.txt: 安全
```

### 使用替換功能

```typescript
import { replaceWindowsUnsafeName } from '@lazy-node/windows-unsafe-filename';

// 使用字串替換
const unsafeName = 'con.txt';
const safeName = replaceWindowsUnsafeName(unsafeName, 'safe_name');
console.log(safeName); // 'safe_name.txt'

// 使用回呼函數替換
const unsafeName2 = 'com1.log';
const safeName2 = replaceWindowsUnsafeName(unsafeName2, (match, name, ext) => {
  return `device_${name}${ext || ''}`;
});
console.log(safeName2); // 'device_com1.log'
```

### 擴展模式使用

```typescript
import { hasWindowsUnsafeName, replaceWindowsUnsafeName } from '@lazy-node/windows-unsafe-filename';

// 標準模式（預設）
console.log(hasWindowsUnsafeName('com10.txt')); // null (安全)
console.log(hasWindowsUnsafeName('lpt20.txt')); // null (安全)

// 擴展模式
console.log(hasWindowsUnsafeName('com10.txt', true)); // 匹配結果 (不安全)
console.log(hasWindowsUnsafeName('lpt20.txt', true)); // 匹配結果 (不安全)

// 擴展模式替換
const result = replaceWindowsUnsafeName('com10.txt', 'safe', true);
console.log(result); // 'safe.txt'
```

### 實際應用場景

```typescript
import { hasWindowsUnsafeName, replaceWindowsUnsafeName } from '@lazy-node/windows-unsafe-filename';

// 安全的檔案名稱處理
function createSafeFilename(filename: string): string {
  if (hasWindowsUnsafeName(filename)) {
    return replaceWindowsUnsafeName(filename, (match, name, ext) => {
      return `safe_${name}${ext || ''}`;
    });
  }
  return filename;
}

// 批量處理檔案名稱
function processFilenames(filenames: string[]): string[] {
  return filenames.map(name => createSafeFilename(name));
}

// 使用範例
const unsafeFilenames = [
  'con.txt',
  'prn.doc',
  'com1.log',
  'normal.txt'
];

const safeFilenames = processFilenames(unsafeFilenames);
console.log(safeFilenames);
// ['safe_con.txt', 'safe_prn.doc', 'safe_com1.log', 'normal.txt']
```

### 與其他模組整合

```typescript
import { sanitizeFilename } from '@lazy-node/sanitize-filename';
import { replaceWindowsUnsafeName } from '@lazy-node/windows-unsafe-filename';

// 綜合檔案名稱安全化
function comprehensiveSanitize(filename: string): string {
  // 先處理 Windows 不安全名稱
  let safeName = replaceWindowsUnsafeName(filename, 'safe_device');
  
  // 再進行完整的檔案名稱安全化
  safeName = sanitizeFilename(safeName, {
    trim: true,
    replaceToFullWidth: true
  });
  
  return safeName;
}

// 使用範例
const unsafeInput = 'con?.txt';
const safeOutput = comprehensiveSanitize(unsafeInput);
console.log(safeOutput); // 'safe_device！.txt'
```

## Windows 保留名稱列表

### 標準模式支援的名稱
- `con` - 控制台
- `prn` - 印表機
- `aux` - 輔助設備
- `nul` - 空設備
- `com0` 到 `com9` - 通訊埠
- `lpt0` 到 `lpt9` - 並列埠

### 擴展模式額外支援的名稱
- `com00` 到 `com99` - 擴展通訊埠
- `lpt00` 到 `lpt99` - 擴展並列埠

## 注意事項

- 模組會自動忽略大小寫
- 支援帶有副檔名的檔案名稱
- 擴展模式提供更嚴格的檢查
- 可以與其他檔案名稱處理模組配合使用

## 貢獻

歡迎提交問題和拉取請求！

## 授權

ISC
