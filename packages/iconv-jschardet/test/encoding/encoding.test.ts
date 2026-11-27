/// <reference types="node" />
/**
 * encoding.ts 的 isNodeEncoding / codec_data / disableCodecDataWarn 行為與快照 (Snapshot)
 */
import { describe, it, test } from 'node:test';
import { codec_data, disableCodecDataWarn, isNodeEncoding } from '../..';
import { nonUtf8Fixtures } from '../fixtures/test-case';

disableCodecDataWarn(true);

/** Node.js Buffer 原生支援的編碼 */
const nodeEncodings = [
	'ascii', 'utf8', 'utf-8', 'utf16le', 'ucs2', 'base64', 'latin1', 'binary', 'hex',
];

// @ts-ignore
describe(`isNodeEncoding`, () =>
{
	// @ts-ignore
	it(`Node.js 原生編碼回傳標準化名稱`, function (t: test.TestContext)
	{
		let actual: Record<string, string> = {};

		for (const enc of nodeEncodings)
		{
			let r = isNodeEncoding(enc);

			t.assert.ok(r, enc);

			actual[enc] = r;
		}

		t.assert.snapshot(actual);
	});

	// @ts-ignore
	it(`非 Node.js 編碼回傳 null`, function (t: test.TestContext)
	{
		for (const f of nonUtf8Fixtures)
		{
			t.assert.strictEqual(isNodeEncoding(f.codec), null, f.codec);
		}
	});
});

// @ts-ignore
describe(`codec_data`, () =>
{
	// @ts-ignore
	it(`樣本編碼`, function (t: test.TestContext)
	{
		let actual: Record<string, unknown> = {};

		for (const f of nonUtf8Fixtures)
		{
			let cd = codec_data(f.codec);

			t.assert.ok(cd, f.codec);
			t.assert.strictEqual(cd.input, f.codec);

			actual[f.codec] = cd;
		}

		/** ascii 不在 codec_table，回傳 null */
		t.assert.ok(codec_data('utf8'));
		t.assert.strictEqual(codec_data('ascii'), null);

		actual.utf8 = codec_data('utf8');
		actual.ascii = codec_data('ascii');

		t.assert.snapshot(actual);
	});

	// @ts-ignore
	it(`未知編碼回傳 null`, function (t: test.TestContext)
	{
		t.assert.strictEqual(codec_data('definitely-not-an-encoding'), null);
	});

	// @ts-ignore
	it(`null 拋出錯誤`, function (t: test.TestContext)
	{
		t.assert.throws(() => codec_data(null as any), /is unknown or broken/);
	});
});

// @ts-ignore
describe(`disableCodecDataWarn`, () =>
{
	// @ts-ignore
	it(`回傳設定後狀態`, function (t: test.TestContext)
	{
		t.assert.strictEqual(disableCodecDataWarn(false), false);
		t.assert.strictEqual(disableCodecDataWarn(true), true);
		t.assert.strictEqual(disableCodecDataWarn(), true);

		disableCodecDataWarn(true);
	});
});
