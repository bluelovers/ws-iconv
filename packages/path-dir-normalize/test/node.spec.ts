/// <reference types="node" />
import { test } from 'node:test';
import _pathDirNormalize from '../index';
import path from 'path';

test(`__dirname`, (t: test.TestContext) =>
{
	console.dir(__dirname)

	let actual = pathDirNormalize(__dirname);

	t.assert.match(actual, /[/\\]$/);

});

function pathDirNormalize(dir: string)
{
	return _pathDirNormalize(dir, path)
}
