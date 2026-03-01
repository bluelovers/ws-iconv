import { inspect } from "util";
import upath from "upath";
import { win32 as path } from '../index';
import testCases, { ITestCaseRow } from './data/testcases';
import { IPath, win32 } from '../core';
import { _expectTestCases } from "./lib/util";

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

	_expectTestCases(fn, name, testCases);

	fn = path[name];

	_expectTestCases(fn, `(unbind) ${name}`, testCases);

})
