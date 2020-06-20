import { vEncoding, codec_table } from './const';
// @ts-ignore
import { getCodec } from 'iconv-lite';

export function getIconvLiteCodec(encoding: vEncoding)
{
	let codec: {
		encodingName?: string,
		enc?: string,
	};
	let enc: string;
	let enc2: string;

	try
	{
		// @ts-ignore
		codec = getCodec(encoding);
		enc2 = codec.encodingName || codec.enc;

		if (codec_table[enc2])
		{
			enc = enc2;
		}
	}
	catch (e)
	{

	}

	return {
		codec,
		enc,
		enc2,
	}
}
