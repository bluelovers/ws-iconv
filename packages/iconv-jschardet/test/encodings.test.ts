/// <reference types="node" />
/**
 * 針對 fixtures/data.ts 的各編碼樣本，快照 (Snapshot) 各 API 的回傳值
 */
import { describe, it, test } from 'node:test';
import { getIconvLiteCodec } from '../lib/util';
import {
	BIG5_STR, BIG5_BUF, BIG5_UTF8_BUF,
	GBK_STR, GBK_BUF, GBK_UTF8_BUF,
	SJIS_STR, SJIS_BUF, SJIS_UTF8_BUF,
	EUCJP_STR, EUCJP_BUF, EUCJP_UTF8_BUF,
	EUCKR_STR, EUCKR_BUF, EUCKR_UTF8_BUF,
} from './fixtures/data';
import { BufferFrom, decode, detect, encode, skipDecodeWarning } from '..';
import { fixtures } from './fixtures/test-case';
import { _detectSnapshot, _encodeSnapshot, _encodeSnapshot2, _BufferFromSnapshot, codecSnapshot } from './lib/helper';

skipDecodeWarning();

describe(`detect`, () =>
{
	for (const f of fixtures)
	{
		it(`${f.id} detect str`, function (t: test.TestContext)
		{
			_detectSnapshot(t, f.str);
		});

		it(`${f.id} detect buf`, function (t: test.TestContext)
		{
			_detectSnapshot(t, f.buf);
		});
	}
});

describe(`decode`, () =>
{
	for (const f of fixtures)
	{
		it(`${f.id} decode buf`, function (t: test.TestContext)
		{
			t.assert.strictEqual(decode(f.buf), decode(f.buf, f.codec));
			t.assert.snapshot(decode(f.buf));
		});

		it(`${f.id} decode str`, function (t: test.TestContext)
		{
			t.assert.snapshot(decode(f.str));
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
			_encodeSnapshot(t, f, f.str);
		});

		// @ts-ignore
		it(`${f.id} encode buf to ${f.codec}`, function (t: test.TestContext)
		{
			_encodeSnapshot(t, f, f.buf);
		});

		// @ts-ignore
		it(`${f.id} encode to utf8`, function (t: test.TestContext)
		{
			_encodeSnapshot2(t, f);
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
			_BufferFromSnapshot(t, f, f.str, 'utf8');
		});

		// @ts-ignore
		it(`${f.id} BufferFrom buf utf8`, function (t: test.TestContext)
		{
			_BufferFromSnapshot(t, f, f.buf, 'utf8');
		});

		// @ts-ignore
		it(`${f.id} BufferFrom str ${f.codec}`, function (t: test.TestContext)
		{
			_BufferFromSnapshot(t, f, f.str, f.codec);
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
