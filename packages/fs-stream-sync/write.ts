import fs from "fs";
import { PathLike } from 'fs';
import { IFsPath, IFsStreamData, IFsStreamState, IFsWriteStreamOptions } from './lib/interface';
import { getFsStreamData, SYM_FS_STREAM_DATA } from './lib/internal';

// @ts-ignore
export class WriteStream extends fs.WriteStream
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
	public readonly path: IFsPath

	constructor(path: PathLike, options?: string | IFsWriteStreamOptions)
	{
		// @ts-ignore
		super(path, options)

		getFsStreamData(this)
	}

	static get create()
	{
		return createWriteStream
	}

	open()
	{
		if (!getFsStreamData(this).opened)
		{
			const self = this

			this[SYM_FS_STREAM_DATA].opened = true

			this.once('open', function ()
			{
				process.nextTick(function ()
				{
					self.emit('ready')
				})
			})
			// @ts-ignore
			fs.WriteStream.prototype.open.call(this)
		}
	}

}

export function createWriteStream(path: PathLike, options?: string | IFsWriteStreamOptions)
{
	return new WriteStream(path, options)
}

export default WriteStream
