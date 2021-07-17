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
		test(inspect(input), () =>
		{
			expect(sanitizeFilename(input)).toMatchSnapshot();

			expect(sanitizeFilename(input, {replacement: '🐴🐴'})).toMatchSnapshot();

			expect(sanitizeFilename(input, {replacement: 'con'})).toMatchSnapshot();

			expect(sanitizeFilename(input, {replacement: ''})).toMatchSnapshot();

			expect(sanitizeFilename(input, {replacement: ' '})).toMatchSnapshot();
		})
	})
});

test('length', () =>
{
	// Basename length: 152
	const filename = 'this/is/a/very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_long_filename.txt';

	expect(sanitizeFilename(basename(filename)))
		.toStrictEqual('very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_');

	expect(sanitizeFilename(basename(filename), { maxLength: 180 }))
		.toStrictEqual('very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_long_filename.txt');
});
