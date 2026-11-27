
import {
	BIG5_STR, BIG5_BUF, BIG5_UTF8_BUF,
	GBK_STR, GBK_BUF, GBK_UTF8_BUF,
	SJIS_STR, SJIS_BUF, SJIS_UTF8_BUF,
	EUCJP_STR, EUCJP_BUF, EUCJP_UTF8_BUF,
	EUCKR_STR, EUCKR_BUF, EUCKR_UTF8_BUF,
} from '../fixtures/data';

/** 測試樣本 */
export interface IFixture
{
	/** 樣本代號 */
	id: string;
	/** 以 latin1 表示的原編碼字串 */
	str: string;
	/** 原編碼位元組 */
	buf: Buffer;
	/** UTF-8 位元組 */
	utf8: Buffer;
	/** iconv-lite 編碼名稱 */
	codec: string;
}

export const fixtures: IFixture[] = [
	{ id: 'BIG5', str: BIG5_STR, buf: BIG5_BUF, utf8: BIG5_UTF8_BUF, codec: 'big5' },
	{ id: 'GBK', str: GBK_STR, buf: GBK_BUF, utf8: GBK_UTF8_BUF, codec: 'gbk' },
	{ id: 'SJIS', str: SJIS_STR, buf: SJIS_BUF, utf8: SJIS_UTF8_BUF, codec: 'shift_jis' },
	{ id: 'EUCJP', str: EUCJP_STR, buf: EUCJP_BUF, utf8: EUCJP_UTF8_BUF, codec: 'euc-jp' },
	{ id: 'EUCKR', str: EUCKR_STR, buf: EUCKR_BUF, utf8: EUCKR_UTF8_BUF, codec: 'euc-kr' },
];
