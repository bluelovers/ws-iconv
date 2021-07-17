import { inspect } from 'util';
import sanitizeFilename from '../index';
import getRandomString from 'get-random-string';
import { newRegExpWindowsUnsafeName } from '../../windows-unsafe-filename/index';
import { reZeroWidthTrim } from 'zero-width/lib/re';

describe(`describe`, () =>
{

	[
		"valid name.mp3",
		"résumé",
		"hello\u0000world",
		"hello\nworld",
		"h?w", "h/w", "h*w",
		"mr.", "mr..", "mr ", "mr  ",
		".", "..", "./", "../", "/..", "/../", "*.|.",
		"..",
		'a'.repeat(252) + '\uD800\uDC00',
		'\uD800\uDC00' + 'a'.repeat(252),
		'a'.repeat(253) + '\uD800\uDC00',
		'\uD800\uDC00' + 'a'.repeat(253),
	].forEach(input =>
	{
		test(inspect(input), () =>
		{
			let actual = sanitizeFilename(input);

			expect(actual).toMatchSnapshot();

			console.log(inspect(input) , '=>', inspect(actual))
		})
	});

})

describe(`random`, () =>
{
	const windowsReservedRe = newRegExpWindowsUnsafeName();

	Array(10)
		.fill(0)
		.map(() => {
			let s = getRandomString();
			let s2 = getRandomString({ regex: windowsReservedRe.source + '[<>:"/\\\\|?*\u0000-\u001F]' });

			return [
				s,
				s2,
			]
		}).flatMap(s => {
		return [
			s,
			`\uD800\uDC00${s}`,
			`${s}\uD800\uDC00`,
			`COM1.${s}`,
		]
	}).flat().forEach(input =>
	{
		test(inspect(input), () =>
		{
			let actual = sanitizeFilename(input);

			console.log(inspect(input) , '=>', inspect(actual))

			expect(actual.length > 0).toBeTruthy()
		})
	});

})
