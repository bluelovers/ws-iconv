import { relative } from '../';

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

			expect(relative(list[0], target)).toStrictEqual('');

			expect(relative(list[0], target + 'kk')).not.toStrictEqual('');

		})

	})

})

test(`__dirname`, () =>
{

	expect(relative(__dirname, __dirname)).toStrictEqual('');

	expect(relative(__dirname, __dirname + '/')).toStrictEqual('');

	expect(relative(__dirname, __dirname + '\\')).toStrictEqual('');

})
