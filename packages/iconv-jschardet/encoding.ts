import iconvLite from 'iconv-lite';
import console from 'debug-color2/logger';
import { _enc, codec_table, ENUM_NODE_ENCODING, IEncodingCodec, NodeEncoding, vEncoding } from './lib/const';
import { getIconvLiteCodec } from './lib/util';

export * from './lib/const';
//export { console }

export function isNodeEncoding(encoding: vEncoding): string
{
	let enc = _enc(encoding);
	return NodeEncoding.includes(_enc<ENUM_NODE_ENCODING>(encoding)) ? enc : null;
}

let DISABLE_CODEC_DATA_WARN = false;

export function disableCodecDataWarn(bool: boolean = true)
{
	return DISABLE_CODEC_DATA_WARN = bool;
}

export function codec_data(encoding: vEncoding): IEncodingCodec
{
	if (encoding == null)
	{
		throw new Error(`encoding '${encoding}' is unknown or broken`);
	}

	let codec: {
		encodingName?: string,
		enc?: string,
	};
	let enc: string;
	let enc2: string;

	if (!codec_table[enc = _enc(encoding)])
	{
		let data = getIconvLiteCodec(encoding)

		codec = data.codec ?? codec;
		enc2 = data.enc2 ?? enc2;
		enc = data.enc ?? enc;
	}

	if (codec_table[enc])
	{
		codec_table[enc].key = codec_table[enc].key || enc;
		codec_table[enc].id = codec_table[enc].id || enc;

		codec_table[enc].input = encoding;

		return codec_table[enc];
	}

	if (!DISABLE_CODEC_DATA_WARN)
	{
		console.warn(encoding, enc, enc2, codec);
	}

	if (enc2)
	{
		return {
			key: enc,
			key2: enc2,

			input: encoding,

			error: true,

			not: !codec,
		};
	}
	else
	{
		return null;
	}
}

export default exports as typeof import('./encoding');
