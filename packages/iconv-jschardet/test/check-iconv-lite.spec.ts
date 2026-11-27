/// <reference types="node" />
import { test } from 'node:test';
import iconvLite from 'iconv-lite';

test(`iconvLite`, (t: test.TestContext) =>
{

	t.assert.snapshot(iconvLite);

});

test(`getCodec`, (t: test.TestContext) =>
{

	let actual;
	let expected;

	t.assert.ok('getCodec' in iconvLite);

	// @ts-ignore
	t.assert.deepStrictEqual(typeof iconvLite.getCodec, 'function');

});
