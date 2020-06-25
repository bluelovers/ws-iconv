import { win32 } from '..';
import { IPath } from '../lib/type';

test('win32 network drive', function ()
{
	var dirs = win32.dirname(
		'\\\\storageserver01\\Active Projects\\ProjectA');
	expect(dirs).toStrictEqual('\\\\storageserver01\\Active Projects');
});

describe(`win32 network drive root`, () => {

	const source = '\\\\storageserver01\\Active Projects';
	const expected = source;

	const list = [
		source,
		source + '/',
		source + '\\',
	];

	([
		'dirname',
		'normalize',
	] as const).forEach(fn => {

		describe(fn, function ()
		{
			let expected = source;

			if (fn === 'normalize')
			{
				expected = source + '\\';
			}

			list.forEach(source => {

				test(source, function ()
				{

					let dirs = win32[fn](
						source);

					expect(dirs).toStrictEqual(expected);

				});

			})
		});

	});



	([
		'join',
		'resolve',
	] as const).forEach(fn => {

		let expected = source + '\\';

		describe(fn, function ()
		{
			list.forEach(source => {

				test(source, function ()
				{

					let dirs = win32[fn](
						source, '..');

					expect(dirs).toStrictEqual(expected);

				});

			})
		});

	})

})


