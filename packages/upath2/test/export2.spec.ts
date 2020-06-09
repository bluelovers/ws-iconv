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

});

test(`posix`, () =>
{

	let actual = _m0.posix;
	let expected = _m1.posix;

	expect(actual).toStrictEqual(expected);
	//expect(actual).toBeInstanceOf(Date);
	expect(actual).toMatchSnapshot();

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
