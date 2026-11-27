/// <reference types="node" />
/**
 * not-utf8.ts 的 detectEncoding / notUTF8Buffer / notUTF8 行為與快照 (Snapshot)
 */
import { describe, it, test } from 'node:test';
import { detectEncoding, notUTF8, notUTF8Buffer } from '../../not-utf8';
import { fixtures } from '../fixtures/test-case';
import { BIG5_UTF8_BUF } from '../fixtures/data';

/** ASCII 純文字 */
const ASCII_BUF = Buffer.from('hello world', 'ascii');
/** UTF-8 繁體中文字串 */
const UTF8_STR = '次常用國字標準字體表';

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

	// @ts-ignore
	it(`UTF-8`, function (t: test.TestContext)
	{
		t.assert.strictEqual(detectEncoding(BIG5_UTF8_BUF), 'utf8');
	});
});

// @ts-ignore
describe(`notUTF8Buffer`, () =>
{
	for (const f of fixtures)
	{
		// @ts-ignore
		it(`${f.id} notUTF8Buffer`, function (t: test.TestContext)
		{
			let actual = notUTF8Buffer(f.buf);

			t.assert.ok(actual, f.codec);
			t.assert.snapshot(actual);
		});
	}

	// @ts-ignore
	it(`UTF-8 回傳 null`, function (t: test.TestContext)
	{
		t.assert.strictEqual(notUTF8Buffer(BIG5_UTF8_BUF), null);
	});

	// @ts-ignore
	it(`ASCII 回傳 null`, function (t: test.TestContext)
	{
		t.assert.strictEqual(notUTF8Buffer(ASCII_BUF), null);
	});
});

// @ts-ignore
describe(`notUTF8`, () =>
{
	for (const f of fixtures)
	{
		// @ts-ignore
		it(`${f.id} notUTF8 buf`, function (t: test.TestContext)
		{
			t.assert.deepStrictEqual(notUTF8(f.buf), notUTF8Buffer(f.buf));
			t.assert.ok(notUTF8(f.buf), f.codec);
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
		t.assert.strictEqual(notUTF8('hello world'), null);
	});
});
