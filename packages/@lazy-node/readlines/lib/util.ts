import { INewLineCharacter, EnumNewLineCharacter } from './types';

export function handleOptionNewLineCharacter(newLineCharacter?: INewLineCharacter): number[]
{
	if (!newLineCharacter)
	{
		return [EnumNewLineCharacter.LF];
	}
	else if (typeof newLineCharacter !== 'number')
	{
		let ls = [] as number[]

		for (let i = 0; i < newLineCharacter.length; i++)
		{
			let c = newLineCharacter[i];

			if (typeof c !== 'number')
			{
				ls.push(c.charCodeAt(0))
			}
			else
			{
				ls.push(c)
			}
		}

		return ls
	}

	return [newLineCharacter]
}

export function bufferEndWithByBuffer(buf: Buffer,
	value: Uint8Array,
	byteOffset?: number,
	encoding?: BufferEncoding,
)
{
	let i = buf.lastIndexOf(value, byteOffset ?? (0 - value.length), encoding)

	return i !== -1 && (i + value.length) === buf.length
}

export function bufferEndWith(buf: Buffer,
	value: string | number | Uint8Array,
	byteOffset?: number,
	encoding?: BufferEncoding,
)
{
	if (typeof value === 'number')
	{
		return buf[buf.length - 1] === value
	}

	let i = buf.lastIndexOf(value, byteOffset ?? (0 - value.length), encoding)

	return i !== -1 && (i + value.length) === buf.length
}

export function bufferStripEndWithByBuffer(buf: Buffer,
	value: Uint8Array,
	byteOffset?: number,
	encoding?: BufferEncoding,
)
{
	let i = buf.lastIndexOf(value, byteOffset ?? (0 - value.length), encoding)

	if (i !== -1 && (i + value.length) === buf.length)
	{
		return buf.slice(0, i)
	}

	return buf
}

export function bufferStripEndWith(buf: Buffer,
	value: string | number | Uint8Array,
	byteOffset?: number,
	encoding?: BufferEncoding,
)
{
	if (typeof value === 'number')
	{
		if (buf[buf.length - 1] === value)
		{
			return buf.slice(0, buf.length - 1);
		}
	}
	else
	{
		let i = buf.lastIndexOf(value, byteOffset ?? (0 - value.length), encoding)

		if (i !== -1 && (i + value.length) === buf.length)
		{
			/*
			console.dir({
				i,
				vl: value.length,
				bl: buf.length,

				v: value.toString(),
				b: buf.toString(),
				b2: buf.slice(0, i).toString(),
			})
			 */

			return buf.slice(0, i)
		}
	}

	return buf
}

export function bufferIndexWithByBuffer(buf: Buffer,
	value: Uint8Array,
	byteOffset: number,
	encoding?: BufferEncoding,)
{
	let i = buf.indexOf(value, byteOffset, encoding)

	return i !== -1 && i === byteOffset
}

export function bufferIndexWith(buf: Buffer,
	value: string | number | Uint8Array,
	byteOffset: number,
	encoding?: BufferEncoding,)
{
	if (typeof value === 'number')
	{
		return buf[byteOffset] === value
	}

	let i = buf.indexOf(value, byteOffset, encoding)

	return i !== -1 && i === byteOffset
}

export function splitBufferByBuffer(buffer: Buffer, value: Uint8Array)
{
	const lines: Buffer[] = [];
	let bufferPosition = 0;

	let lastNewLineBufferPosition = 0;
	while (true)
	{
		let line: Buffer;
		let bufferPositionValue = buffer[bufferPosition];

		if (bufferIndexWithByBuffer(buffer, value, bufferPosition++))
		{
			line = buffer.slice(lastNewLineBufferPosition, bufferPosition += (value.length - 1));
			lines.push(line);
			lastNewLineBufferPosition = bufferPosition;
		}
		else if (bufferPositionValue === undefined)
		{
			break;
		}
	}

	let leftovers = buffer.slice(lastNewLineBufferPosition, bufferPosition);
	if (leftovers.length)
	{
		lines.push(leftovers);
	}

	return lines;
}
