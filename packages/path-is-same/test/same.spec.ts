import pathIsSame, { fsSameRealpath } from '../index';

test(`sep`, () =>
{

	expect(pathIsSame(__dirname, __dirname + '/')).toBeTruthy()
	expect(pathIsSame(__dirname, __dirname + '\\')).toBeTruthy()

});

test(`argv`, () =>
{

	// @ts-ignore
	expect(() => pathIsSame(__dirname)).toThrowError(`p2 must be provide`)
	// @ts-ignore
	expect(() => fsSameRealpath(__dirname)).toThrowError(`p2 must be provide`)

	// @ts-ignore
	expect(() => pathIsSame(void 0, void 0)).not.toThrowError()
	// @ts-ignore
	expect(() => fsSameRealpath(void 0, void 0)).not.toThrowError()

	// @ts-ignore
	expect(() => pathIsSame(null, null)).not.toThrowError()
	// @ts-ignore
	expect(() => fsSameRealpath(null, null)).not.toThrowError()

});

describe(`drive`, () =>
{

	let list = [
		'c:/',
		'c:',
		'c:.',
		'c:/.',
		'c:\\.',
		'c:\\',
	];

	list.forEach(target =>
	{

		test(target, () =>
		{

			expect(pathIsSame(list[0], target)).toBeTruthy()

			expect(pathIsSame(list[0], target + 'kk')).toBeFalsy()

		})

	})

})
