import { ITSToStringLiteral } from 'ts-type/lib/helper/string';

export const enum EnumEncoding
{
	utf_16be = "UTF-16BE",
	utf_16le = "UTF-16LE",

	utf_8 = "UTF-8",

	utf_32be = "UTF-32BE",
	utf_32le = "UTF-32LE",

	gb_18030 = "GB-18030",

	unicode = "Unicode",
}

export function createBOMEncoding(encoding: IEnumAndString<I_WhatwgEncodingAllowed> | string, options?: {
	throwError?: boolean,
})
{
	switch (encoding)
	{
		case EnumEncoding.utf_16be:
			return [0xFE, 0xFF];
		case EnumEncoding.utf_16le:
			return [0xFF, 0xFE];
		case EnumEncoding.utf_8:
			return [0xEF, 0xBB, 0xBF];
		case EnumEncoding.utf_32be:
			return [0x00, 0x00, 0xFE, 0xFF];
		case EnumEncoding.utf_32le:
			return [0xFF, 0xFE, 0x00, 0x00];
		case EnumEncoding.gb_18030:
			return [0x84, 0x31, 0x95, 0x33];
		case EnumEncoding.unicode:
			return [0x0E, 0xFE, 0xFF];
	}

	if (options?.throwError)
	{
		throw new TypeError(`Not support encoding: ${encoding}`)
	}

	return null
}

/**
 * @see https://github.com/jsdom/whatwg-encoding/blob/master/lib/whatwg-encoding.js
 * @see https://github.com/whatwg/html/issues/1910#issuecomment-254017369
 * @see https://zh.wikipedia.org/wiki/%E4%BD%8D%E5%85%83%E7%B5%84%E9%A0%86%E5%BA%8F%E8%A8%98%E8%99%9F
 */
export function detectBOMEncoding(buffer: Uint8Array, options?: {
	utf_32le?: boolean,
	unicode?: boolean,
})
{
	if (buffer[0] === 0xFE && buffer[1] === 0xFF)
	{
		return EnumEncoding.utf_16be;
	}
	else if (buffer[0] === 0xFF && buffer[1] === 0xFE)
	{
		if (options?.utf_32le && buffer[2] === 0x00 && buffer[3] === 0x00)
		{
			return EnumEncoding.utf_32le;
		}
		return EnumEncoding.utf_16le;
	}
	else if (buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF)
	{
		return EnumEncoding.utf_8;
	}
	else if (buffer[0] === 0x00 && buffer[1] === 0x00 && buffer[2] === 0xFE && buffer[3] === 0xFF)
	{
		return EnumEncoding.utf_32be;
	}
	else if (buffer[0] === 0x84 && buffer[1] === 0x31 && buffer[2] === 0x95 && buffer[3] === 0x33)
	{
		return EnumEncoding.gb_18030;
	}
	else if (options?.unicode && buffer[0] === 0x0E && buffer[1] === 0xFE && buffer[2] === 0xFF)
	{
		return EnumEncoding.unicode;
	}

	return null;
}

export type I_WhatwgEncodingAllowed = EnumEncoding.utf_8 | EnumEncoding.utf_16be | EnumEncoding.utf_16le;

export type IEnumAndString<T extends string | number> = T | ITSToStringLiteral<T>

const _whatwgEncodingAllowed = [
	EnumEncoding.utf_8,
	EnumEncoding.utf_16be,
	EnumEncoding.utf_16le,
] as IEnumAndString<I_WhatwgEncodingAllowed>[];

export function isWhatwgBOMEncodingAllowed(encoding: IEnumAndString<I_WhatwgEncodingAllowed> | string): encoding is I_WhatwgEncodingAllowed
{
	return _whatwgEncodingAllowed.includes(encoding as any)
}

export function whatwgBOMEncoding(buffer: Uint8Array, options?: {
	utf_32le?: boolean,
	unicode?: boolean,
}): I_WhatwgEncodingAllowed
{
	const encoding = detectBOMEncoding(buffer, options);

	if (isWhatwgBOMEncodingAllowed(encoding))
	{
		return encoding
	}

	return null
}

export default detectBOMEncoding
