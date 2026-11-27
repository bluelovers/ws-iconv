/// <reference types="node" />
import { describe, test } from 'node:test';
import { basename } from "path";
import sanitizeFilename from '../index';
import { inspect } from 'util';

/**
 * @see https://github.com/sindresorhus/filenamify/blob/main/test.js
 */
describe('filnamify()', () =>
{
	[
		'foo/bar',
		'foo//bar',
		'//foo//bar//',
		'foo\\\\\\bar',
		'////foo////bar////',
		'foo\u0000bar',
		'.',
		'..',
		'./',
		'../',
		'foo.bar.',
		'foo.bar..',
		'foo.bar...',
		'con',
		'foo/bar/nul',
		'c/n',
		'',
	].forEach(input =>
	{
		test(inspect(input), (t: test.TestContext) =>
		{
			t.assert.snapshot(sanitizeFilename(input));

			t.assert.snapshot(sanitizeFilename(input, {replacement: '🐴🐴'}));

			t.assert.snapshot(sanitizeFilename(input, {replacement: 'con'}));

			t.assert.snapshot(sanitizeFilename(input, {replacement: ''}));

			t.assert.snapshot(sanitizeFilename(input, {replacement: ' '}));
		})
	})
});

test('length', (t: test.TestContext) =>
{
	// Basename length: 152
	const filename = 'this/is/a/very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_long_filename.txt';

	t.assert.deepStrictEqual(sanitizeFilename(basename(filename)),
		'very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_');

	t.assert.deepStrictEqual(sanitizeFilename(basename(filename), { maxLength: 180 }),
		'very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_long_filename.txt');
});
