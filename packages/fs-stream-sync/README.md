# fs-stream-sync - 檔案系統流處理工具

這個模組提供了檔案系統的同步和異步流處理功能，包括讀取和寫入流。

## 主要功能

- 同步和異步流處理
- 讀取和寫入流
- 完全相容於 Node.js 核心流
- 支援同步寫入流
- 跨平台相容性

## 安裝 (Installation)

```bash
# 使用 yarn / Using yarn
yarn add fs-stream-sync

# 使用 yarn-tool / Using yarn-tool
yarn-tool add fs-stream-sync
# yt 是 yarn-tool 的別名 / yt is an alias for yarn-tool
yt add fs-stream-sync

# 使用 pnpm / Using pnpm
pnpm add fs-stream-sync

# 使用 npm / Using npm
npm install fs-stream-sync
```

## 已知問題

- 與 ReadStream/WriteStream 不完全相同
- 某些事件觸發不如預期
- 某些 API 仍為異步
- SyncWriteStream.write 無法追加

> 歡迎發送 PR，使這個模組更接近原始的 fs.stream

## Known Issues (已知問題)

- not 100% same as ReadStream/WriteStream
- some event not trigger as expect
- some api still async
- SyncWriteStream.write can't append

> wellcome send pr, make this near original fs.stream

## usage

- [ReadStream](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options)
- [WriteStream](https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options)

```ts
import {
    ReadStream, WriteStream,
    SyncReadStream, SyncWriteStream,
    
    createReadStream, createWriteStream,
    createSyncReadStream, createSyncWriteStream
} from 'fs-stream-sync';
```

```ts
import * as fs from "fs-extra";
import * as FsStream from "fs-stream-sync";

fs.ensureDirSync('./temp')
fs.removeSync('./temp/temp1.txt')

let file = './temp/temp1.txt'

let s = FsStream.createSyncWriteStream(file, {
	flags: 'w+',
});

[
	'open',
	'ready',
	'close',
	'finish',
].forEach(function (name)
{
	s.on(name, function (...argv)
	{
		console.log(name, argv);
	})
})

s.open()

let text = ''

let line = `test${0}\n`

s.write(line)

text += line

s.on('close', function (...argv)
{
	let buf = fs.readFileSync(file)

	console.log('close2', argv, buf.toString() === text);
})

s.destroy()

let buf = fs.readFileSync(file)

console.log(buf.toString() === text);
```

```
open [ 4 ]
ready []
close []
close2 [] true
true
```
