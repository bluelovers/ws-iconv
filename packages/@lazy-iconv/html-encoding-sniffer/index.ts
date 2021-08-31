import sniffHTMLEncoding from 'html-encoding-sniffer';
import whatwgEncoding from 'whatwg-encoding';

export interface INormalizeHTML
{
	html: string,
	encoding: string,
}

export function normalizeHTML(html: string, transportLayerEncodingLabel?: string): INormalizeHTML
export function normalizeHTML(html: Buffer, transportLayerEncodingLabel?: string): INormalizeHTML
export function normalizeHTML(html: ArrayBuffer, transportLayerEncodingLabel?: string): INormalizeHTML
export function normalizeHTML(html: any = '', transportLayerEncodingLabel?: string): INormalizeHTML
{
	let encoding = "UTF-8";

	if (ArrayBuffer.isView(html))
	{
		// @ts-ignore
		html = Buffer.from(html.buffer, html.byteOffset, html.byteLength);
	}
	else if (html instanceof ArrayBuffer)
	{
		html = Buffer.from(html);
	}

	if (Buffer.isBuffer(html))
	{
		encoding = sniffHTMLEncoding(html, { defaultEncoding: "windows-1252", transportLayerEncodingLabel });
		html = whatwgEncoding.decode(html, encoding);
	}
	else
	{
		html = String(html);
	}

	return { html, encoding };
}

export default normalizeHTML
