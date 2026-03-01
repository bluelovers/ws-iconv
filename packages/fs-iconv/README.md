# fs-iconv

> 檔案系統編碼轉換工具

這個模組提供了檔案系統操作的編碼轉換功能，可以處理各種文字編碼的檔案讀寫操作。

## 主要功能

- 支援多種文字編碼的檔案讀寫
- 自動偵測檔案編碼
- 同步和異步操作
- 與 fs-extra 完全相容的 API
- 內建編碼轉換功能

## 安裝

```bash
npm install fs-iconv
```

## 使用方式

`npm install fs-iconv`

## 基本使用

### 匯入模組

```ts
import * as fs from 'fs-iconv';
```

### 與 fs-extra 相容性

fs-iconv 完全相容於 fs-extra 的 API，可以無縫替換：

```ts
// 原來使用 fs-extra
import * as fs from 'fs-extra';

// 改用 fs-iconv
import * as fs from 'fs-iconv';
```

## 檔案操作範例

### 保存檔案

#### 自動偵測編碼

```ts
(async ()=>
{
	// 讀取檔案時自動偵測編碼
	let big5_2 = await fs.readFile('./res/big5.txt');
	fs.saveFile('./temp/out/_big5_2.txt', big5_2);

	// 手動指定編碼
	let big5 = "\xa6\xb8\xb1\x60\xa5\xce\xb0\xea\xa6\x72\xbc\xd0\xb7\xc7\xa6\x72\xc5\xe9\xaa\xed";
	fs.saveFile('./temp/out/_big5.txt', big5, {
		encoding: 'big5',
	});
})();
```

## 進階使用

### 載入檔案

#### 自動編碼偵測

```ts
fs.loadFile('./res/big5.txt', {
	autoDecode: true,
})
	.then(function (buf)
	{
		// 自動偵測並轉換為 UTF-8
		console.log('[autoDecode]');
		console.log(Buffer.isBuffer(buf), buf);
		console.log(fs.iconv.detect(buf));
		console.log(buf.toString());
	})
;
```

#### 指定編碼

```ts
fs.loadFile('./res/big5.txt', {
		encoding: 'big5',
	})
	.then(function (buf)
	{
		// 指定 Big5 編碼
		console.log('[encoding:big5]');
		console.log(Buffer.isBuffer(buf), buf);
		console.log(fs.iconv.detect(buf));
		console.log(buf.toString());
	})
;
```

#### 限制解碼編碼

```ts
fs.loadFile('./res/big5.txt', {
		autoDecode: ['gbk'],
	})
	.then(function (buf)
	{
		// 只允許使用 gbk 解碼
		console.log('[autoDecode:gbk]');
		console.log(Buffer.isBuffer(buf), buf);
		console.log(fs.iconv.detect(buf));
		console.log(buf.toString());
	})
;
```

## 執行結果

```bash
[autoDecode]
true <Buffer e6 ac a1 e5 b8 b8 e7 94 a8 e5 9c 8b e5 ad 97 e6 a8 99 e6 ba 96 e5 ad 97 e9 ab 94 e8 a1 a8>
{ encoding: 'UTF-8', confidence: 0.99, name: 'UTF-8' }
次常用國字標準字體表
[encoding:big5]
false '次常用國字標準字體表'
{ encoding: 'ascii', confidence: 1, name: 'ascii' }
次常用國字標準字體表
[autoDecode:gbk]
true <Buffer a6 b8 b1 60 a5 ce b0 ea a6 72 bc d0 b7 c7 a6 72 c5 e9 aa ed>
{ encoding: 'Big5', confidence: 0.99, name: 'Big5' }
`ΰrзǦr
```

## iconv 模組

### 匯入 iconv

```ts
import { iconv } from 'fs-iconv';

// 或透過 fs 實例取得
import * as fs from 'fs-iconv';
const iconv = fs.iconv;
```

詳細的 iconv 功能請參閱 [iconv-jschardet](https://github.com/bluelovers/node-iconv-jschardet#readme)
## 批量處理範例

### 自動轉換檔案編碼

```ts
import fs = require('fs-iconv');
import Bluebird = require('bluebird');
import globby from 'node-novel-globby/g';
import { EnumEncoding } from 'iconv-jschardet';

Bluebird.mapSeries(globby.async([
	'*.txt',
], {
	cwd: 'C:/Home/link/dist_novel/syosetu/悠閑農家與亂碼技能/00000_null',
	absolute: true,
}), async function (file: string)
{
	let buf = await fs.loadFile(file);

	// 自動判斷檔案編碼並轉換為 UTF-8
	return fs.saveFile(file, buf, {
			encoding: EnumEncoding.UTF8
		})
		.tap(function ()
		{
			console.log(file);
		})
})
;
```

這個範例適合用在檔案編碼不統一混亂時，可以自動處理大量檔案的編碼轉換，避免手動檢查每個檔案的編碼。
