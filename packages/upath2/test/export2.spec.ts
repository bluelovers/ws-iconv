import _m0 = require('../');
import _m1 from '../';
import path from 'path';

test(`win32`, () =>
{

	let actual = _m0.win32;
	let expected = _m1.win32;

	expect(actual).toStrictEqual(expected);
	//expect(actual).toBeInstanceOf(Date);
	expect(actual).toMatchSnapshot();
	expect(Object.keys(actual)).toMatchSnapshot();

	expect(actual).toHaveProperty('delimiter', path.win32.delimiter);
	expect(actual).toHaveProperty('delimiter', ';');

});

test(`posix`, () =>
{

	let actual = _m0.posix;
	let expected = _m1.posix;

	expect(actual).toStrictEqual(expected);
	//expect(actual).toBeInstanceOf(Date);
	expect(actual).toMatchSnapshot();
	expect(Object.keys(actual)).toMatchSnapshot();

	expect(actual).toHaveProperty('delimiter', path.posix.delimiter);
	expect(actual).toHaveProperty('delimiter', ':');

});

describe(`path`, () => {

	Object.entries(path)
		.forEach(([name, prop]) => {

			const type = typeof prop;

			test(`${name} => ${type}`, () =>
			{
				let actual = _m0[name];
				let expected = _m1[name];

				expect(actual).toStrictEqual(expected);

				expect(typeof actual).toStrictEqual(type);
			})

		})
	;

})

describe(`hasOwnProperty`, () => {

	([
		'win32',
		'posix',
		'upath',
		'default',
	] as const).forEach(key => {
		test(key, () =>
		{

			let actual = _m0.hasOwnProperty(key);
			let expected = _m1.hasOwnProperty(key);

			expect(actual).toStrictEqual(expected);
			expect(_m0[key]).toStrictEqual(_m1[key]);

			expect(actual).toBeTruthy();
			expect(actual).toMatchSnapshot();

		});

		test(`${key}.name`, () =>
		{
			let name = key

			if (key === 'default')
			{
				name = 'upath'
			}

			expect(_m0[key]).toHaveProperty('name', name);
			expect(_m1[key]).toHaveProperty('name', name);
		})

	})

})
