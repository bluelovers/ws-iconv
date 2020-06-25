import pathStripSep from '../index';

describe(`no change`, () =>
{
	[
		'/',
		'c:/',
		'/',
		'c:\\',
		'\\',
		'\\\\',
		'//',
	].forEach(input =>
	{

		test(input, () =>
		{

			let actual = pathStripSep(input);
			let expected = input;

			expect(actual).toStrictEqual(expected);

		});

	})

})

test(`__dirname`, () =>
{

	let actual = pathStripSep(__dirname + '/');
	let expected = __dirname;

	expect(actual).toStrictEqual(expected);

	actual = pathStripSep(__dirname + '\\');
	expected = __dirname;

	expect(actual).toStrictEqual(expected);

	actual = pathStripSep(__dirname + '\\\\');
	expected = __dirname;

	expect(actual).toStrictEqual(expected);

	actual = pathStripSep(__dirname + '\\\\\\');
	expected = __dirname;

	expect(actual).toStrictEqual(expected);

});

test(`/ x 3`, () =>
{

	let actual = pathStripSep('///');
	let expected = '/';

	expect(actual).toStrictEqual(expected);

});

test(`\\ x 3`, () =>
{

	let actual = pathStripSep('\\\\\\');
	let expected = '\\';

	expect(actual).toStrictEqual(expected);

});
