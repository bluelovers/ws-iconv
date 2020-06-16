import fs from 'fs';
import { PathLike } from "fs";
import { IFsReadStreamOptions } from './lib/interface';
import { getFsStreamData, SYM_FS_STREAM_DATA } from './lib/internal';
import internal from "./lib/internal";
import { ReadStream } from './read'

export const kMinPoolSpace = 128;
let pool;
const poolFragments = [];

function allocNewPool(poolSize: number)
{
	if (poolFragments.length > 0)
	{
		pool = poolFragments.pop();
	}
	else
	{
		pool = Buffer.allocUnsafe(poolSize);
	}
	pool.used = 0;
}

export class SyncReadStream extends ReadStream
{
	constructor(path: PathLike, options?: string | IFsReadStreamOptions)
	{
		// @ts-ignore
		super(path, options)
	}

	static get create()
	{
		return createSyncReadStream
	}

	open(): void
	{
		if (typeof getFsStreamData(this) !== 'boolean')
		{
			this[SYM_FS_STREAM_DATA].opened = true
			internal.open(this)
			this.read();
		}
		else if (this[SYM_FS_STREAM_DATA].opened === true)
		{
			this[SYM_FS_STREAM_DATA].opened = false
			this.emit('open', this.fd);
			this.emit('ready');
		}
	}

	_read(n: number)
	{
		if (typeof this.fd !== 'number')
		{
			return this.once('open', function ()
			{
				// @ts-ignore
				this._read(n);
			});
		}

		if (this.destroyed)
		{
			return;
		}

		if (!pool || pool.length - pool.used < kMinPoolSpace)
		{
			// discard the old pool.
			allocNewPool(this.readableHighWaterMark);
		}

		const thisPool = pool;
		let toRead = Math.min(pool.length - pool.used, n);
		const start = pool.used;

		if (this.pos !== undefined)
		{
			toRead = Math.min(this.end - this.pos + 1, toRead);
		}
		else
		{
			toRead = Math.min(this.end - this.bytesRead + 1, toRead);
		}

		// already read everything we were supposed to read!
		// treat as EOF.
		if (toRead <= 0)
		{
			return this.push(null);
		}

		try
		{
			// the actual read.
			let bytesRead = fs.readSync(this.fd, pool, pool.used, toRead, this.pos);

			let b = null;
			// Now that we know how much data we have actually read, re-wind the
			// 'used' field if we can, and otherwise allow the remainder of our
			// reservation to be used as a new pool later.
			if (start + toRead === thisPool.used && thisPool === pool)
			{
				thisPool.used += bytesRead - toRead;
			}
			else if (toRead - bytesRead > kMinPoolSpace)
			{
				poolFragments.push(thisPool.slice(start + bytesRead, start + toRead));
			}

			if (bytesRead > 0)
			{
				this.bytesRead += bytesRead;
				b = thisPool.slice(start, start + bytesRead);
			}

			this.push(b);
		}
		catch (er)
		{
			if (this.autoClose)
			{
				this.destroy();
			}
			this.emit('error', er);
		}

		// move the pool positions, and internal position for reading.
		if (this.pos !== undefined)
		{
			this.pos += toRead;
		}
		pool.used += toRead;
	}

	_destroy(error: Error | null, callback: (error: Error | null) => void): void
	{
		internal._destroy(this, error, callback)
	}
}

export function createSyncReadStream(path: PathLike, options?: string | IFsReadStreamOptions)
{
	return new SyncReadStream(path, options)
}

export default SyncReadStream
