import pathIsSame, { fsSameRealpath } from '../index';

const isWin = process.platform === "win32";

test(`sep`, () =>
{

	expect(pathIsSame(__dirname, __dirname + '/')).toBeTruthy()
	expect(pathIsSame(__dirname, __dirname + '\\')).toBeTruthy()

});

test(`argv`, () =>
{

	// @ts-ignore
	expect(() => pathIsSame(__dirname)).toThrowErrorMatchingSnapshot()
	// @ts-ignore
	expect(() => fsSameRealpath(__dirname)).toThrowErrorMatchingSnapshot()

	// @ts-ignore
	expect(() => pathIsSame(void 0, void 0)).not.toThrow()
	// @ts-ignore
	expect(() => fsSameRealpath(void 0, void 0)).not.toThrow()

	// @ts-ignore
	expect(() => pathIsSame(null, null)).not.toThrow()
	// @ts-ignore
	expect(() => fsSameRealpath(null, null)).not.toThrow()

});

describe(`drive`, () =>
{

	let list = [
		'c:/',
		'c:',
		'c:.',
		'c:/.',
		isWin && 'c:\\.',
		isWin && 'c:\\',
	];

	list.forEach(target =>
	{

		target && test(target, () =>
		{

			expect(pathIsSame(list[0], target)).toBeTruthy()

			expect(pathIsSame(list[0], target + 'kk')).toBeFalsy()

		})

	})

})
