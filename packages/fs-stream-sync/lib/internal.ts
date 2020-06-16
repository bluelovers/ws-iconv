
import { ReadStream } from '../read';
import { WriteStream } from '../write';
import { SyncReadStream } from '../read-sync';
import { SyncWriteStream } from '../write-sync';
import { IFsStreamData } from './interface';
import fs, { openSync, closeSync } from 'fs';

export const SYM_FS_STREAM_DATA = Symbol('FsStreamData')

export type IThisFsStream = WriteStream | ReadStream | SyncWriteStream | SyncReadStream

export function open(thisArgv: IThisFsStream, argv?: any[])
{
	if (typeof thisArgv.fd !== 'number')
	{
		let fd: number
		try
		{
			// @ts-ignore
			fd = openSync(thisArgv.path, thisArgv.flags, thisArgv.mode)
		}
		catch (er)
		{
			_error_emit(thisArgv, er)
			return;
		}

		thisArgv.fd = fd;
	}

	thisArgv.emit('open', thisArgv.fd);
	thisArgv.emit('ready');
}

export function _error_emit<T extends Error>(thisArgv: IThisFsStream, e: T): void
{
	__close(thisArgv)
	thisArgv.emit('error', e);
}

export function __close(thisArgv: IThisFsStream): void
{
	// @ts-ignore
	if (thisArgv.autoClose)
	{
		thisArgv.destroy();
	}
}

export function _error_callback<T extends Error>(thisArgv: IThisFsStream, e: T, callback: Function): void
{
	__close(thisArgv)
	callback(e);
}

export function closeFsStreamSync(stream: fs.WriteStream | fs.ReadStream | SyncWriteStream | SyncReadStream,
	cb: Function,
	err?,
)
{
	let er
	try
	{
		// @ts-ignore
		closeSync(stream.fd)
	}
	catch (e)
	{
		er = e || err;
	}

	cb(er)
	// @ts-ignore
	stream.closed = true;
	if (!er)
	{
		stream.emit('close');
	}
}

export function _destroy(thisArgv: IThisFsStream, error: Error | null, callback: (error: Error | null) => void): void
{
	// @ts-ignore
	const isOpen = typeof thisArgv.fd !== 'number';

	if (isOpen)
	{
		// @ts-ignore
		thisArgv.once('open', closeFsStreamSync.bind(null, thisArgv, callback, error));
		return;
	}

	closeFsStreamSync(thisArgv as any, callback)
	// @ts-ignore
	thisArgv.fd = null;
}

function emitErrorAndCloseNT(self, err)
{
	emitErrorNT(self, err);
	emitCloseNT(self);
}

function emitCloseNT(self)
{
	if (self._writableState && !self._writableState.emitClose)
	{
		return;
	}
	if (self._readableState && !self._readableState.emitClose)
	{
		return;
	}
	self.emit('close');
}

function emitErrorNT(self, err)
{
	self.emit('error', err);
}

export function getFsStreamData(thisArgv: IThisFsStream): IFsStreamData
{
	return thisArgv[SYM_FS_STREAM_DATA] = thisArgv[SYM_FS_STREAM_DATA] || {}
}

export default exports as typeof import('./internal');
