/**
 * Created by user on 2020/5/1.
 */

import { Buffer } from "buffer";
import { vNodeEncoding, vEncoding } from 'iconv-jschardet';

export function arrayBufferToString(buf: number[] | ArrayBuffer, encoding?: BufferEncoding, from?: BufferEncoding)
{
	return Buffer.from(buf as any, from).toString(encoding);
}

export default arrayBufferToString
