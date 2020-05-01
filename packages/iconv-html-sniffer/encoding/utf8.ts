/**
 * Created by user on 2020/5/1.
 */

import { createSniffHTMLEncoding, createIconvDecode } from '../index';

export const defaultEncoding = 'UTF8';

export const sniffHTMLEncoding = createSniffHTMLEncoding(defaultEncoding);

export const iconvDecode = createIconvDecode(defaultEncoding, sniffHTMLEncoding);

export default {
	defaultEncoding,
	sniffHTMLEncoding,
	iconvDecode,
}
