/**
 * Created by user on 2019/3/21.
 */
import { detect } from './index';
import { CODEC_DATA_ENCODING_ID, _enc } from './lib/const';

/**
 * 檢測 Buffer 並且返回小寫標準化後的編碼 ID
 * Detect Buffer and return lowercase normalized encoding ID
 *
 * 使用 jschardet 檢測 Buffer 的編碼格式，並返回標準化的小寫編碼 ID
 * Use jschardet to detect the encoding format of a Buffer and return the normalized lowercase encoding ID
 *
 * @param {Buffer} buf - 要檢測的 Buffer / Buffer to detect
 * @returns {T} - 標準化後的編碼 ID / Normalized encoding ID
 */
export function detectEncoding<T extends CODEC_DATA_ENCODING_ID | string>(buf: Buffer): T
{
	let chk = detect(buf);
	return _enc<T>(chk.encoding);
}

/**
 * 當 Buffer 編碼不屬於 UTF-8 或者 ascii 時
 * 返回編碼資訊
 * Return encoding information when Buffer encoding is not UTF-8 or ASCII
 *
 * 檢測 Buffer 編碼，如果編碼不是 UTF-8 或 ASCII，則返回完整的編碼檢測結果
 * Detect Buffer encoding, and if the encoding is not UTF-8 or ASCII, return the complete encoding detection result
 *
 * @param {Buffer} buf - 要檢測的 Buffer / Buffer to detect
 * @returns {IDetectData | null} - 如果不是 UTF-8 或 ASCII 則返回檢測結果，否則返回 null / Returns detection result if not UTF-8 or ASCII, otherwise returns null
 */
export function notUTF8Buffer(buf: Buffer)
{
	let chk = detect(buf, true);
	let encoding = _enc(chk.encoding);

	return (encoding === CODEC_DATA_ENCODING_ID.utf8 || encoding === CODEC_DATA_ENCODING_ID.ascii) ? null : chk;
}

/**
 * 當 Buffer | string 編碼不屬於 UTF-8 或者 ascii 時
 * 返回編碼資訊
 * Return encoding information when Buffer or string encoding is not UTF-8 or ASCII
 *
 * 檢測輸入內容的編碼，如果編碼不是 UTF-8 或 ASCII，則返回完整的編碼檢測結果
 * Detect the encoding of input content, and if the encoding is not UTF-8 or ASCII, return the complete encoding detection result
 *
 * @param {Buffer | string} buf - 要檢測的 Buffer 或字串 / Buffer or string to detect
 * @returns {IDetectData | null} - 如果不是 UTF-8 或 ASCII 則返回檢測結果，否則返回 null / Returns detection result if not UTF-8 or ASCII, otherwise returns null
 */
export function notUTF8(buf: Buffer | string)
{
	if (!Buffer.isBuffer(buf))
	{
		buf = Buffer.from(buf)
	}

	return notUTF8Buffer(buf)
}

export default exports as typeof import('./not-utf8');
