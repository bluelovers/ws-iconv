import pathIsSame from '../index';

test(`sep`, () =>
{

	expect(pathIsSame(__dirname, __dirname + '/')).toBeTruthy()
	expect(pathIsSame(__dirname, __dirname + '\\')).toBeTruthy()

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
