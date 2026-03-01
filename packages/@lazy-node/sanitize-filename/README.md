# @lazy-node/sanitize-filename - 檔案名稱安全化模組

這個模組提供了將字串轉換為安全檔案名稱的功能，移除或替換不安全的字元，確保檔案名稱在各種作業系統上都能正常使用。

## 主要功能

- 移除或替換不安全的字元
- 支援 Windows 不安全名稱檢測
- 支援零寬字元處理
- 支援全形字元替換
- 多種修剪選項
- 跨平台相容性

## 安裝

```bash
yarn add @lazy-node/sanitize-filename
yarn-tool add @lazy-node/sanitize-filename
yt add @lazy-node/sanitize-filename
```

## 快速開始

```typescript
import { sanitizeFilename } from '@lazy-node/sanitize-filename';

// 基本使用
const safeName = sanitizeFilename('my file?.txt');
console.log(safeName); // 'my file!.txt'

// 使用選項
const safeNameWithOptions = sanitizeFilename('my file?.txt', {
  trim: true,
  replaceToFullWidth: true
});
console.log(safeNameWithOptions); // 'my file！.txt'
```

## API 文件

### 主要函數

#### sanitizeFilename(name: string, options?: IOptions): string
將字串轉換為安全的檔案名稱。

**參數：**
- `name` (string): 要處理的原始字串
- `options` (IOptions): 處理選項

**返回值：**
- `string`: 安全的檔案名稱

**選項物件：**
```typescript
interface IOptions {
  replacement?: string;        // 替換字元，預設 '!'
  removeDotFile?: boolean;     // 是否移除點檔案
  replaceToFullWidth?: boolean; // 是否替換為全形字元
  trim?: boolean;              // 是否進行完整修剪
  noTrimSpace?: boolean;       // 是否跳過空格修剪
  throwEmpty?: boolean;        // 當結果為空時是否拋出錯誤
}
```

### 輔助函數

#### replaceToFullWidth(name: string): string
將特殊字元替換為全形字元。

**參數：**
- `name` (string): 要處理的字串

**返回值：**
- `string`: 替換後的字串

#### trimSpace(name: string): string
修剪字串前後的空格和特殊空白字元。

**參數：**
- `name` (string): 要處理的字串

**返回值：**
- `string`: 修剪後的字串

#### trimFilename(name: string): string
修剪檔案名稱，移除前後的空格、底線、連字號和加號。

**參數：**
- `name` (string): 要處理的字串

**返回值：**
- `string`: 修剪後的字串

## 使用範例

### 基本使用

```typescript
import { sanitizeFilename } from '@lazy-node/sanitize-filename';

// 處理包含特殊字元的檔案名稱
const unsafeName = 'my file?.txt';
const safeName = sanitizeFilename(unsafeName);
console.log(safeName); // 'my file!.txt'

// 處理包含路徑分隔符的字串
const pathName = 'folder/file:name.txt';
const safePathName = sanitizeFilename(pathName);
console.log(safePathName); // 'folder_file!name.txt'
```

### 使用選項

```typescript
import { sanitizeFilename } from '@lazy-node/sanitize-filename';

// 使用自訂替換字元
const customName = sanitizeFilename('file?.txt', {
  replacement: '_'
});
console.log(customName); // 'file_.txt'

// 啟用全形字元替換
const fullWidthName = sanitizeFilename('file?.txt', {
  replaceToFullWidth: true
});
console.log(fullWidthName); // 'file？.txt'

// 啟用完整修剪
const trimmedName = sanitizeFilename('___file.txt___', {
  trim: true
});
console.log(trimmedName); // 'file.txt'
```

### 實際應用場景

```typescript
import { sanitizeFilename } from '@lazy-node/sanitize-filename';

// 安全地建立檔案名稱
function createSafeFilename(userInput: string): string {
  return sanitizeFilename(userInput, {
    trim: true,
    replaceToFullWidth: true,
    throwEmpty: true
  });
}

// 處理使用者上傳的檔案
function handleFileUpload(originalName: string) {
  try {
    const safeName = createSafeFilename(originalName);
    console.log(`安全的檔案名稱: ${safeName}`);
    return safeName;
  } catch (error) {
    console.error('檔案名稱無效:', error.message);
    throw error;
  }
}

// 使用範例
const userInput = '我的檔案?.txt';
const safeFilename = handleFileUpload(userInput);
console.log(safeFilename); // '我的檔案！.txt'
```

### 批量處理

```typescript
import { sanitizeFilename } from '@lazy-node/sanitize-filename';

// 批量處理多個檔案名稱
const unsafeNames = [
  'file?.txt',
  'file*.doc',
  'file:name.pdf',
  'file>test.docx'
];

const safeNames = unsafeNames.map(name => 
  sanitizeFilename(name, { trim: true })
);

console.log(safeNames);
// ['file!.txt', 'file*.doc', 'file!name.pdf', 'file!test.docx']
```

## 選項詳細說明

### replacement
指定用來替換不安全字元的字元，預設為 '!'。

```typescript
sanitizeFilename('file?.txt', { replacement: '_' }); // 'file_.txt'
```

### removeDotFile
是否移除以點開頭的檔案名稱（點檔案）。

```typescript
sanitizeFilename('.hidden', { removeDotFile: true }); // 'hidden'
sanitizeFilename('.hidden', { removeDotFile: false }); // '.hidden'
```

### replaceToFullWidth
是否將特殊字元替換為全形字元。

```typescript
sanitizeFilename('file?.txt', { replaceToFullWidth: true }); // 'file？.txt'
```

### trim
是否進行完整修剪，移除前後的底線、連字號和加號。

```typescript
sanitizeFilename('___file.txt___', { trim: true }); // 'file.txt'
```

### noTrimSpace
是否跳過空格修剪。

```typescript
sanitizeFilename('  file.txt  ', { noTrimSpace: true }); // '  file.txt  '
```

### throwEmpty
當處理結果為空時是否拋出錯誤。

```typescript
try {
  sanitizeFilename('?', { throwEmpty: true });
} catch (error) {
  console.log('拋出錯誤:', error.message);
}
```

## 注意事項

- 模組會自動處理零寬字元、BOM 標記等特殊字元
- 支援 Windows 不安全名稱檢測和處理
- 預設會移除換行符號
- 可以組合多種選項來達到最佳的處理效果

## 貢獻

歡迎提交問題和拉取請求！

## 授權

ISC
