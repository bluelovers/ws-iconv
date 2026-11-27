/// <reference types="node" />
import { describe, test } from 'node:test';
import upath2 from '..';
import * as upath from 'upath';
import * as pathNodeJs from 'path';
import testCases, { ITestCaseRow } from './data/testcases';
import { inspect } from 'util';
import { _expectTestCases } from './lib/util';

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

				_expectTestCases(fn, name, testCases);

				fn = path[name];

				_expectTestCases(fn, `(unbind) ${name}`, testCases);

			})
		;

	})
}

test(`\\`, (t: test.TestContext) => {

	let c = `\\`

	t.assert.strictEqual(upath2.normalize(c).length, 1)

	t.assert.strictEqual(upath2.dirname(c).length, 1)

})

test(`/`, (t: test.TestContext) => {

	let c = `/`

	t.assert.strictEqual(upath2.normalize(c).length, 1)

	t.assert.strictEqual(upath2.dirname(c).length, 1)

})
