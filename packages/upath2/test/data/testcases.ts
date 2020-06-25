/**
 * Created by user on 2020/6/10.
 */

import path from 'path';

export type ITestCaseRow = [string | any[], any?]

export const testCases = {
	normalize: [
		[
			'c:/windows/nodejs/path',
			"c:/windows/nodejs/path"
		],
		[
			'c:/windows/../nodejs/path',
			"c:/nodejs/path"
		],
		[
			'c:\\windows\\nodejs\\path',
			"c:/windows/nodejs/path"
		],
		[
			'c:\\windows\\..\\nodejs\\path',
			"c:/nodejs/path"
		],
		/*
		[
			'//windows\\unix/mixed',
			"//windows/unix/mixed"
		],
		[
			'\\windows//unix/mixed',
			"/windows/unix/mixed"
		],
		 */
		[
			'//\\windows\\..\\unix/mixed/',
			"/unix/mixed"
		],
		[
			'c:\\Windows\\Directory\\somefile.ext',
		],
		[
			'/root/of/unix/somefile.ext',
		],
		[
			'c:/',
		],
		[
			'c:',
		],
		[
			'c:\\',
		],
	],
	join: [
		[
			['some/nodejs/deep', '../path'],
		],
		[
			['some/nodejs\\windows', '../path'],
		],
		[
			['some\\windows\\only', '..\\path'],
		],
	],
	parse: [
		[
			'c:/windows/nodejs/path',
		],
		[
			'c:/windows/../nodejs/path',
		],
		[
			'c:\\windows\\nodejs\\path',
		],
		[
			'c:\\windows\\..\\nodejs\\path',
		],
		[
			'//windows\\unix/mixed',
		],
		[
			'\\windows//unix/mixed',
		],
		[
			'//\\windows\\..\\unix/mixed/',
		],
		[
			'c:\\Windows\\Directory\\somefile.ext',
		],
		[
			'/root/of/unix/somefile.ext',
		],
	],
} as Record<Extract<keyof typeof path, string>, ITestCaseRow[]>

export default testCases;
