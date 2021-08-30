/**
 * Created by user on 2020/5/1.
 */

import { vEncoding, BufferFrom } from 'iconv-jschardet';

export function arrayBufferToString(buf: number[] | ArrayBuffer | Uint8Array, encoding?: vEncoding, from?: vEncoding)
{
	return BufferFrom(buf, encoding, from).toString(encoding as any);
}

export function arrayBufferToBuffer(buf: number[] | ArrayBuffer | Uint8Array, encoding?: vEncoding, from?: vEncoding)
{
	return BufferFrom(buf, encoding, from);
}

export default arrayBufferToString
