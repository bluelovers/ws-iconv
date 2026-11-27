/// <reference types="node" />
import { test } from 'node:test';
import pathParents from '../';

test('dirname', function (t: test.TestContext)
{
	let dirs = pathParents('/foo/bar/baz/quux');
	t.assert.deepStrictEqual(dirs, [
		'/foo/bar/baz',
		'/foo/bar',
		'/foo',
		'/',
	]);
});

test('root', function (t: test.TestContext)
{
	let dirs = pathParents('/');
	t.assert.deepStrictEqual(dirs, []);
});
