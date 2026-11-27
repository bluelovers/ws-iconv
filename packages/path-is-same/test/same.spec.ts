/// <reference types="node" />
import { describe, test } from 'node:test';
import pathIsSame, { fsSameRealpath } from '../index';

const isWin = process.platform === "win32";

test(`sep`, (t: test.TestContext) =>
{

	t.assert.ok(pathIsSame(__dirname, __dirname + '/'))
	t.assert.ok(pathIsSame(__dirname, __dirname + '\\'))

});

test(`argv`, (t: test.TestContext) =>
{

	// @ts-ignore
	t.assert.throws(() => pathIsSame(__dirname), (err) => {
		t.assert.snapshot(`${err.name}: ${err.message}`);
		return true;
	});
	// @ts-ignore
	t.assert.throws(() => fsSameRealpath(__dirname), (err) => {
		t.assert.snapshot(`${err.name}: ${err.message}`);
		return true;
	});

	// @ts-ignore
	t.assert.doesNotThrow(() => pathIsSame(void 0, void 0))
	// @ts-ignore
	t.assert.doesNotThrow(() => fsSameRealpath(void 0, void 0))

	// @ts-ignore
	t.assert.doesNotThrow(() => pathIsSame(null, null))
	// @ts-ignore
	t.assert.doesNotThrow(() => fsSameRealpath(null, null))

});

describe(`drive`, () =>
{

	let list = [
		'c:/',
		'c:',
		'c:.',
		'c:/.',
		isWin && 'c:\\.',
		isWin && 'c:\\',
	];

	list.forEach(target =>
	{

		target && test(target, (t: test.TestContext) =>
		{

			t.assert.ok(pathIsSame(list[0], target))

			t.assert.ok(!pathIsSame(list[0], target + 'kk'))

		})

	})

})
