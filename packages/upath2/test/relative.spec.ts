/// <reference types="node" />
import { describe, test } from 'node:test';
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

		test(target, (t: test.TestContext) =>
		{

			t.assert.deepStrictEqual(relative(list[0], target), '');

			t.assert.notDeepStrictEqual(relative(list[0], target + 'kk'), '');

		})

	})

})

test(`__dirname`, (t: test.TestContext) =>
{

	t.assert.deepStrictEqual(relative(__dirname, __dirname), '');

	t.assert.deepStrictEqual(relative(__dirname, __dirname + '/'), '');

	t.assert.deepStrictEqual(relative(__dirname, __dirname + '\\'), '');

})
