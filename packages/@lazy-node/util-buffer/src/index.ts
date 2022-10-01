
export type IBufferValueInput = string | number | Uint8Array;

export function _valueLength(value: IBufferValueInput)
{
	return typeof value === 'number' ? 1 : value.length;
}

export function _bufferLastIndexOf(buf: Buffer,
	value: IBufferValueInput,
	byteOffset?: number,
	encoding?: BufferEncoding,
)
{
	const len = _valueLength(value);
	const i = buf.lastIndexOf(value, byteOffset ?? (0 - len), encoding);

	return {
		len,
		i,
	}
}

export function _endWith(buf: any[] | Uint8Array, i: number, len: number)
{
	return i !== -1 && (i + len) === buf.length
}

export function _indexWith(i: number, byteOffset: number)
{
	return i !== -1 && i === byteOffset
}

export function bufferEndWith(buf: Buffer,
	value: string | number | Uint8Array,
	byteOffset?: number,
	encoding?: BufferEncoding,
)
{
	const { len, i } = _bufferLastIndexOf(buf, value, byteOffset, encoding);

	return _endWith(buf, i, len)
}

export { bufferEndWith as bufferEndWithByBuffer }

export function bufferStripEndWith(buf: Buffer,
	value: IBufferValueInput,
	byteOffset?: number,
	encoding?: BufferEncoding,
)
{
	const { len, i } = _bufferLastIndexOf(buf, value, byteOffset, encoding);

	if (_endWith(buf, i, len))
	{
		return buf.subarray(0, i)
	}

	return buf
}

export { bufferStripEndWith as bufferStripEndWithByBuffer }

export function bufferIndexWith(buf: Buffer,
	value: IBufferValueInput,
	byteOffset: number,
	encoding?: BufferEncoding,
)
{
	const i = buf.indexOf(value, byteOffset, encoding);

	return _indexWith(i, byteOffset)
}

export { bufferIndexWith as bufferIndexWithByBuffer }

export function splitBufferByBuffer(buffer: Buffer, value: Uint8Array)
{
	const len = _valueLength(value);

	const lines: Buffer[] = [];
	let bufferPosition = 0;

	let lastNewLineBufferPosition = 0;
	while (true)
	{
		let line: Buffer;
		const bufferPositionValue = buffer[bufferPosition];

		if (bufferIndexWith(buffer, value, bufferPosition++))
		{
			line = buffer.subarray(lastNewLineBufferPosition, bufferPosition += (len - 1));
			lines.push(line);
			lastNewLineBufferPosition = bufferPosition;
		}
		else if (bufferPositionValue === void 0)
		{
			break;
		}
	}

	const leftovers = buffer.subarray(lastNewLineBufferPosition, bufferPosition);
	if (leftovers.length)
	{
		lines.push(leftovers);
	}

	return lines;
}
