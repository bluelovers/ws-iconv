import upath2 from '..';
import * as upath from 'upath2';
import testCases, { ITestCaseRow } from './data/testcases';
import { inspect } from 'util';

describe(`check`, () =>
{

	_setup(`upath2`, upath2);

	([
		'upath',
		'win32',
		//'posix',
	] as Extract<keyof typeof upath2, string>[])
		.forEach(name => {

			const path = upath2[name] as any as typeof upath2;

			_setup(name, path);

		})
	;

})

function _setup(name: string, path: typeof upath2)
{
	describe(name, () =>
	{

		Object.entries(testCases)
			.forEach(([name, testCases]) => {

				let fn = path[name].bind(path);

				_test(fn, name, testCases);

				fn = path[name];

				_test(fn, `(unbind) ${name}`, testCases);

			})
		;

	})

	function _test(fn, name: string, testCases: ITestCaseRow[])
	{
		describe(name, () =>
		{
			testCases
				.forEach(testCase =>
				{
					testCase && test(inspect(testCase[0]), () => {
						let actual;
						let expected
						let expected2

						if (typeof testCase[0] === 'string')
						{
							actual = fn(testCase[0])
							expected2 = upath[name]?.(testCase[0])
							expected = testCase[1]

						}
						else
						{
							actual = fn(...testCase[0])
							expected2 = upath[name]?.(...testCase[0])
							expected = testCase[1]
						}

						if (typeof expected !== "undefined")
						{
							expect(actual).toStrictEqual(expected)
						}

						console.dir({
							upath2: actual,
							upath: expected2,
						})

						expect(actual).toMatchSnapshot();
					});
				})
			;

		});
	}
}

test(`\\`, () => {

	let c = `\\`

	expect(upath2.normalize(c)).toHaveLength(1)

	expect(upath2.dirname(c)).toHaveLength(1)

})

test(`/`, () => {

	let c = `/`

	expect(upath2.normalize(c)).toHaveLength(1)

	expect(upath2.dirname(c)).toHaveLength(1)

})
