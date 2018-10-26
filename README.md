# fs-stream-sync

    File System SyncWriteStream/SyncReadStream implementation from Node.js Core

## install

```nodemon
npm install fs-stream-sync
```

## know issues

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
