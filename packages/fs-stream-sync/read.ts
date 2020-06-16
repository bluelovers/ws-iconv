import { PathLike } from "fs";
import fs from 'fs';
import { IFsReadStreamOptions, IFsStreamData, IFsStreamState, IFsWriteStreamOptions } from './lib/interface';
import { getFsStreamData, SYM_FS_STREAM_DATA } from './lib/internal';

// @ts-ignore
export class ReadStream extends fs.ReadStream
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

	protected end: number

	constructor(path: PathLike, options?: string | IFsWriteStreamOptions)
	{
		// @ts-ignore
		super(path, options)

		getFsStreamData(this)
	}

	static get create()
	{
		return createReadStream
	}

	open()
	{
		if (typeof getFsStreamData(this) !== 'boolean')
		{
			this[SYM_FS_STREAM_DATA].opened = true
			// @ts-ignore
			fs.ReadStream.prototype.open.call(this)
		}
	}
}

export function createReadStream(path: PathLike, options?: string | IFsReadStreamOptions)
{
	return new ReadStream(path, options)
}

export default ReadStream
