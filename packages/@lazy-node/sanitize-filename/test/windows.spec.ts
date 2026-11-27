/// <reference types="node" />
import { describe, test } from 'node:test';
import { inspect } from 'util';
import sanitizeFilename from '../index';

describe(`describe`, () =>
{

	[
		"con",
		"COM1",
		"PRN.",
		"aux.txt",
		"LPT9.asdfasdf",
		"LPT10.txt",
	].forEach(input =>
	{
		test(inspect(input), (t: test.TestContext) =>
		{
			let actual = sanitizeFilename(input);

			t.assert.snapshot(actual);

			console.log(inspect(input) , '=>', inspect(actual))
		})
	});

})
