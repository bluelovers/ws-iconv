/**
 * Created by user on 2020/5/1.
 */

import { Buffer } from "buffer";

export function arrayBufferToString(buf: number[] | ArrayBuffer)
{
	return Buffer.from(buf).toString();
}

export default arrayBufferToString
