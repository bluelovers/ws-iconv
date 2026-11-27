/// <reference types="node" />
/**
 * not-utf8.ts 的 detectEncoding / notUTF8Buffer / notUTF8 行為與快照 (Snapshot)
 */
import { describe, it, test } from 'node:test';
import { detectEncoding, notUTF8, notUTF8Buffer } from '../../not-utf8';
import { fixtures, nonUtf8Fixtures, utf8Fixtures } from '../fixtures/test-case';
import { UTF8_STR } from '../fixtures/data';

/** ASCII 純英數字串 */
const ASCII_STR = 'HelloWorld0123456789';

// @ts-ignore
describe(`detectEncoding`, () =>
{
	for (const f of fixtures)
	{
		// @ts-ignore
		it(`${f.id} detectEncoding`, function (t: test.TestContext)
		{
			let actual = detectEncoding(f.buf);

			t.assert.match(actual, /^[0-9a-z]+$/);
			t.assert.snapshot(actual);
		});
	}
});

// @ts-ignore
describe(`notUTF8Buffer`, () =>
{
	for (const f of nonUtf8Fixtures)
	{
		// @ts-ignore
		it(`${f.id} notUTF8Buffer`, function (t: test.TestContext)
		{
			let actual = notUTF8Buffer(f.buf);

			t.assert.ok(actual, f.codec);
			t.assert.snapshot(actual);
		});
	}

	for (const f of utf8Fixtures)
	{
		// @ts-ignore
		it(`${f.id} notUTF8Buffer 回傳 null`, function (t: test.TestContext)
		{
			t.assert.strictEqual(notUTF8Buffer(f.buf), null);
		});
	}
});

// @ts-ignore
describe(`notUTF8`, () =>
{
	for (const f of nonUtf8Fixtures)
	{
		// @ts-ignore
		it(`${f.id} notUTF8 buf`, function (t: test.TestContext)
		{
			t.assert.deepStrictEqual(notUTF8(f.buf), notUTF8Buffer(f.buf));
			t.assert.ok(notUTF8(f.buf), f.codec);
		});
	}

	for (const f of utf8Fixtures)
	{
		// @ts-ignore
		it(`${f.id} notUTF8 buf 回傳 null`, function (t: test.TestContext)
		{
			t.assert.strictEqual(notUTF8(f.buf), null);
		});
	}

	// @ts-ignore
	it(`UTF-8 字串回傳 null`, function (t: test.TestContext)
	{
		t.assert.strictEqual(notUTF8(UTF8_STR), null);
	});

	// @ts-ignore
	it(`ASCII 字串回傳 null`, function (t: test.TestContext)
	{
		t.assert.strictEqual(notUTF8(ASCII_STR), null);
	});
});
