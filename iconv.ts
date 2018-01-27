import * as iconvLite from 'iconv-lite';
import * as jschardet from 'jschardet';

export function skipDecodeWarning(bool: boolean = true)
{
	// @ts-ignore
	iconvLite.skipDecodeWarning = bool;
}

export function BufferFrom(str, encoding, from?)
{
	let data;

	if (from)
	{
		data = Buffer.from(str, from);
	}
	else
	{
		data = str;
	}

	data = decode(data);
	let buf = iconvLite.encode(data, encoding);

	return buf;
}

export function detect(str): {
	encoding: string,
	confidence: number,

	encoding_lc: string,
}
{
	let ret = jschardet.detect(str);

	ret.encoding_lc = ret.encoding.toLowerCase();

	return ret;
}

export function decode(str, from: string = null): string
{
	let c = detect(str);

	if (!from)
	{
		from = c.encoding;
	}

	let data;

	switch (from.toUpperCase())
	{
		case 'BIG5':
		case 'GBK':
		case 'UTF-16LE':
			data = iconvLite.decode(str, from);
			break;
		case 'ASCII':
		case 'UTF-8':
			data = str;
			break;
		default:
			console.warn('decode', from, c);

			//data = str;
			data = iconvLite.decode(str, from);
			break;
	}

	return data;
}

export function encode(str, to: string = 'utf8', from: string = null)
{
	let buf = BufferFrom(str, 'utf8');

	// @ts-ignore
	return iconvLite.encode(buf, to);
}

import * as self from './iconv';
export default self;
