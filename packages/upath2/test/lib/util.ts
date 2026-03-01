import { ITestCaseRow } from "../data/testcases";
import { inspect } from 'util';
import upath2 from '../..';
import * as upath from 'upath';
import * as pathNodeJs from 'path';

export function _expectTestCases(fn, name: string, testCases: ITestCaseRow[])
{
	describe(name, () =>
	{
		testCases
			.forEach(testCase =>
			{
				testCase && test(inspect(testCase[0]), () => {
					let actual;
					let expected;
					let expected2;
					let expected3;

					if (typeof testCase[0] === 'string')
					{
						actual = fn(testCase[0])
						expected2 = upath[name]?.(testCase[0])
						expected = testCase[1]

						expected3 = pathNodeJs[name]?.(testCase[0])
					}
					else
					{
						actual = fn(...testCase[0])
						expected2 = upath[name]?.(...testCase[0])
						expected = testCase[1]

						expected3 = pathNodeJs[name]?.(...testCase[0])
					}

					if (typeof expected !== "undefined")
					{
						expect(actual).toStrictEqual(expected)
					}

					expect({
						upath2: actual,
						upath: expected2,
						path: expected3,
					}).toMatchSnapshot();
				});
			})
		;

	});
}
