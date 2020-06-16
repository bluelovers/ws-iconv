import ErrnoException = NodeJS.ErrnoException;

export class NodeLikeError extends Error
{
	public code: string

	constructor(code: string, msg?)
	{
		super(msg)
		this.code = code
	}
}

export function createError<T extends ErrnoException>(Err: new (msg?) => T, code: string, msg?)
{
	let e = new Err(msg)
	e.code = code
	return e
}

export enum EnumFsStreamErrorCode
{
	ERR_STREAM_WRITE_AFTER_END = 'ERR_STREAM_WRITE_AFTER_END',
	ERR_STREAM_DESTROYED = 'ERR_STREAM_DESTROYED',
}

