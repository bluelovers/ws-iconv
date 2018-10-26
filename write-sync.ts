'use strict';

import * as fs from 'fs';
import { PathLike } from "fs";
import { EnumFsStreamErrorCode, NodeLikeError } from './lib/errors';
import { IFsStream, IFsStreamState, IFsStreamOptions, IFsWriteStreamOptions, IFsStreamData } from './lib/interface';
import { getFsStreamData, SYM_FS_STREAM_DATA } from './lib/internal';
import * as internal from './lib/internal';
import { closeFsStreamSync } from './lib/internal';
import { Writable } from 'stream'

export class SyncWriteStream extends fs.WriteStream
{
	protected autoClose: boolean
	protected flags: string
	fd: number
	protected mode: number
	protected pos: number
	protected closed: boolean
	protected destroyed: boolean

	protected _writableState: IFsStreamState
	protected _readableState: IFsStreamState

	protected [SYM_FS_STREAM_DATA]: IFsStreamData

	/**
	 * The number of bytes written so far. Does not include data that is still queued for writing.
	 */
	public bytesWritten: number

	/**
	 * The path to the file the stream is writing to as specified in the first argument to fs.createWriteStream(). If path is passed as a string, then writeStream.path will be a string. If path is passed as a Buffer, then writeStream.path will be a Buffer.
	 */
	public readonly path: string | Buffer

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

		return super.write(chunk, ...argv)
	}

	_write(chunk: Buffer, encoding: string, callback: Function)
	{
		if (!(chunk instanceof Buffer))
		{
			return this.emit('error', new Error('Invalid data'));
		}

		if (typeof this.fd !== 'number')
		{
			return this.once('open', function ()
			{
				this._write(chunk, encoding, callback);
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
// @ts-ignore
Object.freeze(exports)
