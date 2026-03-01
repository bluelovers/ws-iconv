# @lazy-node/readlines

逐行讀取檔案，無需將整個檔案載入記憶體。
Read file line by line without buffering the whole file in memory.

在 Node.js 中逐行讀取檔案看似簡單，但沒有直接的方法可以做到。許多函式庫使用 Transform Streams 來實現，但這似乎過於複雜。因此這個函式庫只使用 Node.js 的 `filesystem` 模組來達成相同目的。請注意這是**同步**函式庫。

Reading file line by line may seem like a trivial problem, but in Node.js, there is no straightforward way to do it. Many libraries use Transform Streams to achieve it, but it seems like overkill. This library uses only the `filesystem` module of Node.js. Note that this is a *synchronous* library.

## 安裝 (Installation)

```bash
# 使用 yarn / Using yarn
yarn add @lazy-node/readlines

# 使用 yarn-tool / Using yarn-tool
yarn-tool add @lazy-node/readlines
# yt 是 yarn-tool 的別名 / yt is an alias for yarn-tool
yt add @lazy-node/readlines

# 使用 pnpm / Using pnpm
pnpm add @lazy-node/readlines

# 使用 npm / Using npm
npm install @lazy-node/readlines
```

## 文件 (Documentation)

### `new LineByLine(filename, [options])`
### `new LineByLine(fd, [options])`

建立逐行讀取器實例。
Create a line-by-line reader instance.

**參數 (Arguments)**

| 參數 | 類型 | 說明 |
|------|------|------|
| `filename` | `string` | 要讀取的檔案路徑 / Path to the file you want to read from |
| `fd` | `number` | 檔案描述符 / File descriptor |
| `options` | `object` | 選項物件 / Options object |
| `options.readChunk` | `number` | 每次讀取的位元組數。預設：1024 / Number of bytes to read at once. Default: 1024 |
| `options.newLineCharacter` | `string` | 換行字元，目前只支援單一位元組字元。預設：`\n` (0x0a) / New line character, only supports single byte characters for now. Default: `\n` which is `0x0a` hex encoded |

`@lazy-node/readlines` 可以處理最後一行後面沒有換行字元的檔案。
`@lazy-node/readlines` can handle files without newLineCharacter after the last line.

---

### `readlines.next()`

讀取下一行。
Read the next line.

**回傳 (Returns)**

- `Buffer` - 行資料（不包含換行字元）/ Line data without the `newLineCharacter`
- `undefined` - 已到達檔案結尾 / End of file is reached

---

### `readlines.reset()`

重置讀取器，從檔案開頭重新讀取。只有在未到達結尾時才有效。
Resets the pointer and starts from the beginning of the file. This works only if the end is not reached.

---

### `readlines.close()`

手動關閉開啟的檔案，後續的 `next()` 呼叫將回傳 false。只有在未到達結尾時才有效。
Manually close the open file, subsequent `next()` calls will return false. This works only if the end is not reached.

---

### `readlines.generator()`

產生器函式，用於迭代讀取所有行。
Generator function for iterating through all lines.

**回傳 (Returns)**

- `Generator<Buffer>` - 行資料產生器 / Line data generator

---

### `LineByLine.generator(file, [options])`

靜態產生器函式，建立實例並迭代讀取所有行。
Static generator function to create instance and iterate through all lines.

---

## 屬性 (Properties)

| 屬性 | 類型 | 說明 |
|------|------|------|
| `file` | `IPathLike` | 檔案路徑或描述符 / File path or descriptor |
| `fd` | `number` | 檔案描述符 / File descriptor |
| `options` | `IOptions` | 讀取選項 / Read options |
| `fdPosition` | `number` | 當前檔案讀取位置 / Current file read position |
| `newLineCharacter` | `Buffer` | 換行字元 Buffer / New line character buffer |
| `eofReached` | `boolean` | 是否已到達檔案結尾 / Whether end of file is reached |
| `lineNumber` | `number` | 當前行號（從 0 開始）/ Current line number (0-based) |

---

## 使用範例 (Example)

```javascript
const LineByLine = require('@lazy-node/readlines');
const liner = new LineByLine('./test/fixtures/normalFile.txt');

let line;
let lineNumber = 0;

// 使用 next() 逐行讀取 / Read line by line using next()
while (line = liner.next()) {
    console.log('Line ' + lineNumber + ': ' + line.toString());
    lineNumber++;
}

console.log('end of line reached');
```

### 使用產生器 (Using Generator)

```javascript
const LineByLine = require('@lazy-node/readlines');

// 使用實例產生器 / Using instance generator
const liner = new LineByLine('./test/fixtures/normalFile.txt');
for (const line of liner.generator()) {
    console.log(line.toString());
}

// 使用靜態產生器 / Using static generator
for (const line of LineByLine.generator('./test/fixtures/normalFile.txt')) {
    console.log(line.toString());
}
```

---

## 相關連結 (Links)

- [GitHub Repository](https://github.com/bluelovers/ws-iconv/tree/master/packages/@lazy-node/readlines)
- [Issue Tracker](https://github.com/bluelovers/ws-iconv/issues)

## 授權 (License)

MIT
