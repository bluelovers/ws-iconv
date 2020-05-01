/**
 * Created by user on 2020/5/1.
 */

import { vEncoding, BufferFrom } from 'iconv-jschardet';

export function arrayBufferToString(buf: number[] | ArrayBuffer, encoding?: vEncoding, from?: vEncoding)
{
	return BufferFrom(buf, encoding, from).toString(encoding);
}

export default arrayBufferToString
