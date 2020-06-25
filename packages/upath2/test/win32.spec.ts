import { inspect } from "util";
import upath from "upath2";
import { win32 as path } from '../index';
import testCases, { ITestCaseRow } from './data/testcases';
import { IPath, win32 } from '../core';

describe(`normalize`, () =>
{
	const name = `normalize`;

	const testCases: ITestCaseRow[] = ([
		[
			'//windows\\unix/mixed',
			"\\\\windows\\unix\\mixed",
		],
		[
			'\\windows//unix/mixed',
			"/windows/unix/mixed"
		],
		[
			'\\\\storageserver01\\Active Projects\\ProjectA',
			'\\\\storageserver01\\Active Projects\\ProjectA',
		]
	]);

	let fn = path[name].bind(path);

	_test(fn, name, testCases);

	fn = path[name];

	_test(fn, `(unbind) ${name}`, testCases);

})

function _test(fn, name: string, testCases: ITestCaseRow[])
{
	describe(name, () =>
	{
		testCases
			.forEach(testCase =>
			{
				test(inspect(testCase[0]), () =>
				{
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
