/// <reference types="node" />
import { test } from 'node:test';
import { isWritableDirectoryAsync, isWritableFileAsync, isWritableDirectorySync, isWritableFileSync } from '../index';

test(`isWritableDirectoryAsync`, async (t: test.TestContext) =>
{
	t.assert.deepStrictEqual(await isWritableDirectoryAsync(__dirname), true);
});

test(`isWritableFileAsync`, async (t: test.TestContext) =>
{
	t.assert.deepStrictEqual(await isWritableFileAsync(__filename), true);
});

test(`isWritableDirectorySync`, (t: test.TestContext) =>
{
	t.assert.deepStrictEqual(isWritableDirectorySync(__dirname), true);
});

test(`isWritableFileSync`, (t: test.TestContext) =>
{
	t.assert.deepStrictEqual(isWritableFileSync(__filename), true);
});
