/// <reference types="node" />

import { ReadStream, WriteStream, createWriteStream, createReadStream } from 'fs';
import { SyncReadStream, createSyncReadStream } from './read';
import { SyncWriteStream, createSyncWriteStream } from './write';

export { IFsReadStreamOptions, IFsWriteStreamOptions } from './lib/interface';

export {
	ReadStream, WriteStream,
	SyncReadStream, SyncWriteStream,

	createReadStream, createWriteStream,
	createSyncReadStream, createSyncWriteStream
}

import * as SyncStream from './index'
export default SyncStream
