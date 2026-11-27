/// <reference types="node" />
/**
 * 針對 fixtures/data.ts 的各編碼樣本，快照 (Snapshot) 各 API 的回傳值
 */
import { describe, it, test } from 'node:test';

import * as self from '../';
import { getIconvLiteCodec } from '../lib/util';
import {
	BIG5_STR, BIG5_BUF, BIG5_UTF8_BUF,
	GBK_STR, GBK_BUF, GBK_UTF8_BUF,
	SJIS_STR, SJIS_BUF, SJIS_UTF8_BUF,
	EUCJP_STR, EUCJP_BUF, EUCJP_UTF8_BUF,
	EUCKR_STR, EUCKR_BUF, EUCKR_UTF8_BUF,
} from './fixtures/data';

self.skipDecodeWarning();

/** 測試樣本 */
interface IFixture
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

const fixtures: IFixture[] = [
	{ id: 'BIG5', str: BIG5_STR, buf: BIG5_BUF, utf8: BIG5_UTF8_BUF, codec: 'big5' },
	{ id: 'GBK', str: GBK_STR, buf: GBK_BUF, utf8: GBK_UTF8_BUF, codec: 'gbk' },
	{ id: 'SJIS', str: SJIS_STR, buf: SJIS_BUF, utf8: SJIS_UTF8_BUF, codec: 'shift_jis' },
	{ id: 'EUCJP', str: EUCJP_STR, buf: EUCJP_BUF, utf8: EUCJP_UTF8_BUF, codec: 'euc-jp' },
	{ id: 'EUCKR', str: EUCKR_STR, buf: EUCKR_BUF, utf8: EUCKR_UTF8_BUF, codec: 'euc-kr' },
];

/** 將 getIconvLiteCodec 回傳值簡化為可快照的純資料 */
function codecSnapshot(encoding: string)
{
	let r = getIconvLiteCodec(encoding as any);

	return {
		enc: r.enc,
		enc2: r.enc2,
		encodingName: r.codec?.encodingName,
	};
}

// @ts-ignore
describe(`detect`, () =>
{
	for (const f of fixtures)
	{
		// @ts-ignore
		it(`${f.id} detect str`, function (t: test.TestContext)
		{
			t.assert.snapshot(self.detect(f.str));
			t.assert.snapshot(self.detect(f.str, true));
		});

		// @ts-ignore
		it(`${f.id} detect buf`, function (t: test.TestContext)
		{
			t.assert.snapshot(self.detect(f.buf));
			t.assert.snapshot(self.detect(f.buf, true));
		});
	}
});

// @ts-ignore
describe(`decode`, () =>
{
	for (const f of fixtures)
	{
		// @ts-ignore
		it(`${f.id} decode buf`, function (t: test.TestContext)
		{
			t.assert.strictEqual(self.decode(f.buf), self.decode(f.buf, f.codec));
			t.assert.snapshot(self.decode(f.buf));
		});

		// @ts-ignore
		it(`${f.id} decode str`, function (t: test.TestContext)
		{
			t.assert.snapshot(self.decode(f.str));
		});
	}
});

// @ts-ignore
describe(`encode`, () =>
{
	for (const f of fixtures)
	{
		// @ts-ignore
		it(`${f.id} encode to ${f.codec}`, function (t: test.TestContext)
		{
			let data = self.encode(f.str, f.codec);

			t.assert.deepStrictEqual(data, f.buf);
			t.assert.snapshot(data);
		});

		// @ts-ignore
		it(`${f.id} encode buf to ${f.codec}`, function (t: test.TestContext)
		{
			let data = self.encode(f.buf, f.codec);

			t.assert.deepStrictEqual(data, f.buf);
			t.assert.snapshot(data);
		});

		// @ts-ignore
		it(`${f.id} encode to utf8`, function (t: test.TestContext)
		{
			let data = self.encode(f.str);

			t.assert.deepStrictEqual(data, f.utf8);
			t.assert.snapshot(self.detect(data));
			t.assert.snapshot(data);
		});
	}
});

// @ts-ignore
describe(`BufferFrom`, () =>
{
	for (const f of fixtures)
	{
		// @ts-ignore
		it(`${f.id} BufferFrom str utf8`, function (t: test.TestContext)
		{
			let data = self.BufferFrom(f.str, 'utf8');

			t.assert.deepStrictEqual(data, f.utf8);
			t.assert.snapshot(data);
		});

		// @ts-ignore
		it(`${f.id} BufferFrom buf utf8`, function (t: test.TestContext)
		{
			let data = self.BufferFrom(f.buf, 'utf8');

			t.assert.deepStrictEqual(data, f.utf8);
			t.assert.snapshot(data);
		});

		// @ts-ignore
		it(`${f.id} BufferFrom str ${f.codec}`, function (t: test.TestContext)
		{
			let data = self.BufferFrom(f.str, f.codec);

			t.assert.deepStrictEqual(data, f.buf);
			t.assert.snapshot(data);
		});
	}
});

// @ts-ignore
describe(`getIconvLiteCodec`, () =>
{
	for (const f of fixtures)
	{
		// @ts-ignore
		it(`${f.id} getIconvLiteCodec ${f.codec}`, function (t: test.TestContext)
		{
			t.assert.snapshot(codecSnapshot(f.codec));
		});
	}
});
