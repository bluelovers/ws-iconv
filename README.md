# fs-stream-sync

    File System SyncWriteStream/SyncReadStream implementation from Node.js Core

## install

```nodemon
npm install fs-stream-sync
```

## demo

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

