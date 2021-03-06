import { decode as _iconvDecode, vEncoding } from 'iconv-jschardet';
import _sniffHTMLEncoding from 'html-encoding-sniffer';

export type ICreateFnDecode<T, E extends string = string> = (buf: unknown | ArrayLike<number>, defaultEncoding?: E) => T

export function createIconvDecode(defaultEncodingBase?: string | vEncoding, sniffHTMLEncoding?: ICreateFnDecode<string>): ICreateFnDecode<string>
{
	if (!sniffHTMLEncoding)
	{
		sniffHTMLEncoding = createSniffHTMLEncoding(defaultEncodingBase);
	}

	return (buf: unknown | ArrayLike<number>, defaultEncoding = defaultEncodingBase) => {
		return _iconvDecode(buf, sniffHTMLEncoding(buf, defaultEncoding));
	}
}

export function createSniffHTMLEncoding(defaultEncodingBase: string | NonNullable<vEncoding>): ICreateFnDecode<string>
{
	return (buf: unknown | ArrayLike<number>, defaultEncoding = defaultEncodingBase) => {
		return _sniffHTMLEncoding(buf as Buffer, {
			defaultEncoding,
		})
	}
}

export default createIconvDecode
