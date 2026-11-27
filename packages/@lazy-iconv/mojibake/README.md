# @lazy-iconv/mojibake

把「被以 Latin-1 / Windows-1252 誤讀的 UTF-8 文字 (mojibake)」盡可能還原為原始文字。

- bytes 俱在時走 **round-trip**：反向對映後以 UTF-8 嚴格解碼，確定性還原。
- 續接位元組 (continuation byte) 0x80–0x9F 被剝除時走 **gap-fill**：以存活錨點 + 常用字／詞典 (dictionary) 重建缺口，屬推測性還原。
- 證據不足時保守不動，未確認的輸入不會被修改。

## Installation

```bash
# Using yarn
yarn add @lazy-iconv/mojibake

# Using yarn-tool
yarn-tool add @lazy-iconv/mojibake
# yt is an alias for yarn-tool
yt add @lazy-iconv/mojibake

# Using pnpm
pnpm add @lazy-iconv/mojibake

# Using npm
npm install @lazy-iconv/mojibake
```

## Usage

```ts
import { repairMojibake } from '@lazy-iconv/mojibake'

repairMojibake('cafÃ©')
// { text: 'café', method: 'round-trip', confidence: 0.8, changed: true }

repairMojibake('æ±äº¬')
// { text: '東京', method: 'gap-fill', confidence: 0.5, changed: true }

repairMojibake('café')
// { text: 'café', method: 'none', confidence: 0, changed: false }
```

預設匯出 (default export) 與具名匯出的 `repairMojibake` 為同一函式：

```ts
import repairMojibake from '@lazy-iconv/mojibake'
```

## 還原方法 (Repair Method)

| 方法 | 時機 | 性質 |
| --- | --- | --- |
| `none` | 非 mojibake、或證據不足以安全還原 | 不修改輸入 |
| `round-trip` | 所有 bytes 俱在，Latin-1 / Windows-1252 反向對映後可嚴格解碼 | 確定性還原 |
| `gap-fill` | 部分續接位元組在傳輸中被丟棄，以候選枚舉 + 詞典評分重建缺口 | 推測性還原（最佳努力） |

## 信心分數 (Confidence)

- `round-trip`：確定性還原，`≥ 0.8`（輸出行帶 C1 控制字元等鏈證據時更高）。
- `gap-fill`：推測結果，`≤ 0.8`，分數隨詞典命中數提升、隨缺口數下降。
- `none`：`0`。

呼叫端可依 `confidence` 決定是否採用或提示使用者。

## 行為邊界

- 逐行處理，`\n` 結構保留；行內還原失敗時以真 Unicode / cp1252 專屬符號分段，正確文字原樣保留，只有殘骸段被修復。
- 合法外文（法文 `café`、北歐文 `Ångström`）與真正的日中 Unicode 文字不會被改寫。
- 透過剪貼簿進入應用程式的 mojibake 通常 bytes 完整，round-trip 即可精確還原；經聊天室顯示再複製的文字可能丟失更多 bytes，資訊不足時工具會保守地不動。

## Test

```bash
pnpm run test:node
```

Node.js 原生測試 (node:test) 位於 `test/`，測試資料集位於 `test/fixtures/`。
