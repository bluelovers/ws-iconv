/// <reference types="node" />
import { test } from 'node:test';
import pathDirNormalize from '../index';

test(`__dirname`, (t: test.TestContext) =>
{
	console.dir(__dirname)

	let actual = pathDirNormalize(__dirname);

	t.assert.match(actual, /[/\\]$/);

});
