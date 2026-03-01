import iconvLite, { encodingExists, Options as IOptionsIconvLite } from 'iconv-lite';
import jschardet from 'jschardet';
import console from 'debug-color2/logger';

//import encodingExists = iconvLite.encodingExists;

export * from './lib/const';
export * from './encoding';

import { codec_data, disableCodecDataWarn } from './encoding';
import { IDetectData, vEncoding } from './lib/const';
import { codecDataNameToUpperCase, CODEC_DATA_NAME_TO_UPPER_CASE, ENUM_NODE_ENCODING } from './lib/const';

export {
	encodingExists,

	/*
	codec_data,
	_enc,
	isNodeEncoding,
	NodeEncoding,
	*/

	jschardet,
	iconvLite,

	disableCodecDataWarn,
}

/**
 * 停用編碼檢測警告
 * Disable encoding detection warning
 *
 * 設定是否停用 iconv-lite 的解碼警告功能
 * Set whether to disable the decoding warning feature in iconv-lite
 *
 * @param {boolean} bool - 是否停用警告 / Whether to disable warnings (default: true)
 * @returns {boolean} - 設定後的狀態 / The set status
 */
export function skipDecodeWarning(bool: boolean = true): boolean
{
	// @ts-ignore
	return iconvLite.skipDecodeWarning = bool;
}

/**
 * 將輸入內容轉換為 Buffer
 * Convert input content to Buffer
 *
 * 支援多種輸入格式的 Buffer 轉換，包括字串、ArrayBuffer、TypedArray 等
 * Support Buffer conversion for various input formats, including strings, ArrayBuffer, TypedArray, etc.
 *
 * @param {unknown} str - 輸入內容 / Input content (string, ArrayBuffer, TypedArray, etc.)
 * @param {vEncoding} encoding - 目標編碼 / Target encoding (default: 'utf8')
 * @param {vEncoding} [from] - 原始編碼 / Original encoding (optional)
 * @param {IOptionsIconvLite} [options] - iconv-lite 選項 / iconv-lite options (optional)
 * @returns {Buffer} - 轉換後的 Buffer / Converted Buffer
 */
export function BufferFrom(str: unknown, encoding: vEncoding = 'utf8', from?: vEncoding, options?: IOptionsIconvLite): Buffer
{
	let data;

	if (from)
	{
		data = Buffer.from(str as any, from as BufferEncoding);
	}
	else if (ArrayBuffer.isView(str))
	{
		data = Buffer.from(str.buffer, str.byteOffset, str.byteLength);
	}
	else if (str instanceof ArrayBuffer)
	{
		data = Buffer.from(str);
	}
	else
	{
		data = str;
	}

	data = decode(data);
	let buf = iconvLite.encode(data, encoding, options);

	return buf;
}

/**
 * 檢測輸入內容編碼
 * Detect input content encoding
 *
 * 使用 jschardet 庫來自動檢測輸入內容的字符編碼
 * Use the jschardet library to automatically detect the character encoding of input content
 *
 * @param {any} str - 要檢測的輸入內容 / Input content to detect
 * @param {boolean} [plus] - 是否包含額外的編碼資訊 / Whether to include additional encoding information (optional)
 * @returns {IDetectData} - 檢測結果，包含編碼名稱和置信度 / Detection result, including encoding name and confidence
 */
export function detect(str, plus?: boolean)
{
	let ret = jschardet.detect(str) as any as IDetectData;

	if (plus)
	{
		let cd = codec_data(ret.encoding);
		if (cd)
		{
			if (cd.name)
			{
				ret.name = cd.name;
			}

			ret.id = cd.id;
		}
	}

	if (!ret.name)
	{
		ret.name = ret.encoding;
	}

	return ret;
}

/**
 * 檢測輸入內容編碼並且轉換為 字串
 * Detect input content encoding and convert to string
 *
 * 自動檢測輸入內容的編碼並轉換為 UTF-8 字串
 * Automatically detect the encoding of input content and convert it to a UTF-8 string
 *
 * @param {any} str - 要解碼的輸入內容 / Input content to decode
 * @param {vEncoding} [from] - 指定的原始編碼 / Specified original encoding (optional)
 * @returns {string} - 解碼後的字串 / Decoded string
 */
export function decode(str, from: vEncoding = null): string
{
	let c;

	if (!str.length)
	{
		return '';
	}

	if (!from)
	{
		c = detect(str);
		from = c.encoding;
	}

	let data;

	let cd = codec_data(from);

	let key: string;

	if (cd && cd.name && !cd.not)
	{
		key = cd.name;
	}
	else
	{
		key = from;
	}

	switch (codecDataNameToUpperCase(key))
	{
		//case 'BIG5':
		//case 'GBK':
		//case 'GB2312':
		//case 'UTF-16LE':
		//case 'UTF-16BE':
		//case 'EUC-JP':
		//case 'SHIFT_JIS':
		case CODEC_DATA_NAME_TO_UPPER_CASE.BIG5:
		case CODEC_DATA_NAME_TO_UPPER_CASE.GBK:
		case CODEC_DATA_NAME_TO_UPPER_CASE.GB2312:
		case CODEC_DATA_NAME_TO_UPPER_CASE.UTF_16_LE:
		case CODEC_DATA_NAME_TO_UPPER_CASE.UTF_16_BE:
		case CODEC_DATA_NAME_TO_UPPER_CASE.EUC_JP:
		case CODEC_DATA_NAME_TO_UPPER_CASE.SHIFT_JIS:
			data = iconvLite.decode(str, from);
			break;
		//case 'ASCII':
		//case 'UTF-8':
		case CODEC_DATA_NAME_TO_UPPER_CASE.ASCII:
		case CODEC_DATA_NAME_TO_UPPER_CASE.UTF_8:
			data = str;
			break;
		default:
			c = c || detect(str);

			// @ts-ignore
			if (!iconvLite.skipDecodeWarning)
			{
				console.warn('decode', from, c);
			}

			//data = str;
			data = iconvLite.decode(str, from);
			break;
	}

	return data;
}

/**
 * 檢測輸入內容編碼並且轉換為 Buffer
 * Detect input content encoding and convert to Buffer
 *
 * 將輸入內容轉換為指定編碼的 Buffer
 * Convert input content to a Buffer with the specified encoding
 *
 * @param {any} str - 要編碼的輸入內容 / Input content to encode
 * @param {vEncoding} [to] - 目標編碼 / Target encoding (default: UTF8)
 * @param {vEncoding} [from] - 原始編碼 / Original encoding (optional)
 * @param {IOptionsIconvLite} [options] - iconv-lite 選項 / iconv-lite options (optional)
 * @returns {Buffer} - 編碼後的 Buffer / Encoded Buffer
 */
export function encode(str, to: vEncoding = ENUM_NODE_ENCODING.UTF8, from: vEncoding = null, options?: IOptionsIconvLite): Buffer
{
	let buf = BufferFrom(str, ENUM_NODE_ENCODING.UTF8, from);

	// @ts-ignore
	return iconvLite.encode(buf, to, options);
}

export default exports as typeof import('./index');
