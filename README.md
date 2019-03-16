# fs-iconv

> save file with charset/encoding/iconv

`npm install fs-iconv`

## demo

fs same as [fs-extra](https://www.npmjs.com/package/fs-extra)

```ts
import * as fs from 'fs-iconv';
```

### fs.saveFile

```ts
(async ()=>
{

	/**
	 * no need set encoding
	 */
	let big5_2 = await fs.readFile('./res/big5.txt');
	fs.saveFile('./temp/out/_big5_2.txt', big5_2);

	/**
	 * will fail if didn't set encoding
	 */
	let big5 = "\xa6\xb8\xb1\x60\xa5\xce\xb0\xea\xa6\x72\xbc\xd0\xb7\xc7\xa6\x72\xc5\xe9\xaa\xed";
	fs.saveFile('./temp/out/_big5.txt', big5, {
		encoding: 'big5',
	});

})();
```

### fs.loadFile

```ts
fs.loadFile('./res/big5.txt', {
	autoDecode: true,
})
	.then(function (buf)
	{
		// autoDecode, so will try decode/encode to utf8 buffer

		console.log('[autoDecode]');
		console.log(Buffer.isBuffer(buf), buf);
		console.log(fs.iconv.detect(buf));
		console.log(buf.toString());
	})
;

fs.loadFile('./res/big5.txt', {
		encoding: 'big5',
	})
	.then(function (buf)
	{
		// encoding is set, so will return string

		console.log('[encoding:big5]');
		console.log(Buffer.isBuffer(buf), buf);
		console.log(fs.iconv.detect(buf));
		console.log(buf.toString());
	})
;

fs.loadFile('./res/big5.txt', {
		autoDecode: ['gbk'],
	})
	.then(function (buf)
	{
		// buf is big5, but only allow decode gbk, so skip decode/encode

		console.log('[autoDecode:gbk]');
		console.log(Buffer.isBuffer(buf), buf);
		console.log(fs.iconv.detect(buf));
		console.log(buf.toString());
	})
;
```

```
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
���`�ΰ�r�зǦr���
```

### iconv

```ts
import { iconv } from 'fs-iconv';

import * as fs from 'fs-iconv';
const iconv = fs.iconv;
```

see [iconv-jschardet](https://github.com/bluelovers/node-iconv-jschardet#readme)

## demo 2

> 自動判斷 檔案編碼 並且轉成 UTF8

```ts
//import fs from 'fs-iconv';
import fs = require('fs-iconv');
import Bluebird = require('bluebird');
// @ts-ignore
import globby from 'node-novel-globby/g';
import { EnumEncoding } from 'iconv-jschardet';

import { SymFSLib } from 'fs-iconv/core';

Bluebird.mapSeries(globby.async([
	'*.txt',
], {
	cwd: 'C:/Home/link/dist_novel/syosetu/悠閑農家與亂碼技能/00000_null',
	absolute: true,
}), async function (file: string)
{
	let buf = await fs.loadFile(file);

	/**
	 * 自動判斷 檔案編碼 並且轉成 UTF8
	 * 適合用在檔案的編碼不統一混亂時
	 * 一個一個去肉眼檢查編碼會很累人
	 */
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
