/// <reference types="node" />
import { test } from 'node:test';
import upath from '../core';
import path from 'path';

test(`normalize`, (t: test.TestContext) =>
{
	[
		'c:/',

		path.normalize('c:/').replace(/\\/, '/'),
		upath.normalize('c:/'),
		upath.normalize('c:\\'),

	].reduce((a, b, index) =>
	{
		console.dir({
			index,
			b,
		})

		t.assert.deepStrictEqual(a, b)

		return a
	})

});

test(`dirname`, (t: test.TestContext) =>
{
	[
		'c:/',

		path.dirname('c:/').replace(/\\/, '/'),
		upath.dirname('c:/'),
		upath.dirname('c:\\'),

	].reduce((a, b, index) =>
	{
		console.dir({
			index,
			b,
		})

		t.assert.deepStrictEqual(b, a)

		return a
	})

});
