'use strict';

import fs from "fs";
import { PathLike } from "fs";
import { EnumFsStreamErrorCode, NodeLikeError } from './lib/errors';
import {
	IFsStream,
	IFsStreamState,
	IFsStreamOptions,
	IFsWriteStreamOptions,
	IFsStreamData,
	IFsPath,
} from './lib/interface';
import { getFsStreamData, SYM_FS_STREAM_DATA } from './lib/internal';
import internal from "./lib/internal";
import { WriteStream } from './write'

export class SyncWriteStream extends WriteStream
{
	constructor(path: PathLike, options?: string | IFsWriteStreamOptions)
	{
		// @ts-ignore
		super(path, options)
	}

	static get create()
	{
		return createSyncWriteStream
	}

	open(): void
	{
		if (typeof getFsStreamData(this) !== 'boolean')
		{
			this[SYM_FS_STREAM_DATA].opened = true
			internal.open(this)
		}
		else if (this[SYM_FS_STREAM_DATA].opened === true)
		{
			this[SYM_FS_STREAM_DATA].opened = false
			this.emit('open', this.fd);
			this.emit('ready');
		}
	}

	write(chunk: any, cb?: (error: Error | null | undefined) => void): boolean;
	write(chunk: any, encoding?: string, cb?: (error: Error | null | undefined) => void): boolean;
	write(chunk: any, ...argv)
	{
		/*
		if (this.closed)
		{
			throw new NodeLikeError(EnumFsStreamErrorCode.ERR_STREAM_WRITE_AFTER_END, `write after end`)
		}
		*/
		if (this._writableState.destroyed)
		{
			throw new NodeLikeError(EnumFsStreamErrorCode.ERR_STREAM_DESTROYED, `Cannot call write after a stream was destroyed`)
		}

		//console.dir({chunk,argv} );

		return super.write(chunk, ...argv)
	}

	/**
	 * @fixme a unknow bug make stream.write only run once
	 */
	_write(chunk: Buffer, encoding: string, callback: Function)
	{
		let self = this

		//console.dir({chunk, encoding, callback} );

		if (!(chunk instanceof Buffer))
		{
			return this.emit('error', new Error('Invalid data'));
		}

		if (typeof this.fd !== 'number')
		{
			return this.once('open', function ()
			{
				self._write(chunk, encoding, callback);
			});
		}

		try
		{
			let bytes = fs.writeSync(this.fd, chunk, 0, chunk.length, this.pos);

			this.bytesWritten += bytes;
		}
		catch (e)
		{
			internal._error_callback(this, e, callback)
		}

		if (this.pos !== undefined)
		{
			this.pos += chunk.length;
		}
	}

	close(cb?: Function)
	{
		if (cb)
		{
			if (this.closed)
			{
				cb();
				return;
			}
			else
			{
				// @ts-ignore
				this.on('close', cb);
			}
		}

		// If we are not autoClosing, we should call
		// destroy on 'finish'.
		if (!this.autoClose)
		{
			this.on('finish', this.destroy.bind(this));
		}

		// we use end() instead of destroy() because of
		// https://github.com/nodejs/node/issues/2006
		this.end();
	}

	_destroy(error: Error | null, callback: (error: Error | null) => void): void
	{
		internal._destroy(this, error, callback)
	}
}

export function createSyncWriteStream(path: PathLike, options?: string | IFsWriteStreamOptions)
{
	return new SyncWriteStream(path, options)
}

export default SyncWriteStream
