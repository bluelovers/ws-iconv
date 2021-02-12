import { ReadStream, createReadStream } from './read';
import { SyncReadStream, createSyncReadStream } from './read-sync';
import { SyncWriteStream, createSyncWriteStream } from './write-sync';
import { WriteStream, createWriteStream } from './write';
export { IFsReadStreamOptions, IFsWriteStreamOptions, PathLike } from './lib/interface';
export { ReadStream, WriteStream, SyncReadStream, SyncWriteStream, createReadStream, createWriteStream, createSyncReadStream, createSyncWriteStream };
declare const _default: typeof import("./index");
export default _default;
