/// <reference types="node" />
import { describe, test } from 'node:test';
import pathStripSep from '../index';

describe(`no change`, () =>
{
	[
		'/',
		'c:/',
		'/',
		'c:\\',
		'\\',
		'\\\\',
		'//',
	].forEach(input =>
	{

		test(input, (t: test.TestContext) =>
		{

			let actual = pathStripSep(input);
			let expected = input;

			t.assert.deepStrictEqual(actual, expected);

		});

	})

})

test(`__dirname`, (t: test.TestContext) =>
{

	let actual = pathStripSep(__dirname + '/');
	let expected = __dirname;

	t.assert.deepStrictEqual(actual, expected);

	actual = pathStripSep(__dirname + '\\');
	expected = __dirname;

	t.assert.deepStrictEqual(actual, expected);

	actual = pathStripSep(__dirname + '\\\\');
	expected = __dirname;

	t.assert.deepStrictEqual(actual, expected);

	actual = pathStripSep(__dirname + '\\\\\\');
	expected = __dirname;

	t.assert.deepStrictEqual(actual, expected);

});

test(`/ x 3`, (t: test.TestContext) =>
{

	let actual = pathStripSep('///');
	let expected = '/';

	t.assert.deepStrictEqual(actual, expected);

});

test(`\\ x 3`, (t: test.TestContext) =>
{

	let actual = pathStripSep('\\\\\\');
	let expected = '\\';

	t.assert.deepStrictEqual(actual, expected);

});
