/**
 * Created by user on 2020/5/1.
 */

import { Buffer } from "buffer";
import toBuffer from 'typedarray-to-buffer';

export function arrayBufferToString(buf: number[] | ArrayBuffer | Uint8Array, encoding?: BufferEncoding, from?: BufferEncoding)
{
	return arrayBufferToBuffer(buf as any, encoding, from).toString(encoding);
}

export function arrayBufferToBuffer(buf: number[] | ArrayBuffer | Uint8Array, encoding?: BufferEncoding, from?: BufferEncoding)
{
	return Buffer.from(toBuffer(buf), from);
}

export default arrayBufferToString
