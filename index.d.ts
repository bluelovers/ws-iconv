import { ReadStream, createReadStream } from './read';
import { SyncReadStream, createSyncReadStream } from './read-sync';
import { SyncWriteStream, createSyncWriteStream } from './write-sync';
import { WriteStream, createWriteStream } from './write';
export { IFsReadStreamOptions, IFsWriteStreamOptions, PathLike } from './lib/interface';
export { ReadStream, WriteStream, SyncReadStream, SyncWriteStream, createReadStream, createWriteStream, createSyncReadStream, createSyncWriteStream };
import * as SyncStream from './index';
export default SyncStream;
