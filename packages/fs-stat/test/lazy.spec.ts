/// <reference types="node" />
import { test } from 'node:test';
import { basename, extname } from 'path';
import { fsStat, fsStatSync } from '../index';

test(`fsStatSync:no-exists`, (t: test.TestContext) =>
{

	t.assert.strictEqual(fsStatSync('./no-exists.js'), undefined);

	t.assert.throws(() => fsStatSync('./no-exists.js', {
		throwIfNoEntry: true,
	}), (err) => {
		t.assert.snapshot(`${err.name}: ${err.message}`);
		return true;
	});

});

test(`fsStat:no-exists`, async (t: test.TestContext) =>
{

	t.assert.strictEqual(await fsStat('./no-exists.js'), undefined)

	await t.assert.rejects(fsStat('./no-exists.js', {
		throwIfNoEntry: true,
	}), (err) => {
		t.assert.snapshot(`${err.name}: ${err.message}`);
		return true;
	});

});
