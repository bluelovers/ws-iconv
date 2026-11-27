/// <reference types="node" />
import { describe, it, test } from 'node:test';
/**
 * Created by user on 2017/12/9/009.
 */
import { win32 as nodePath } from 'path';

describe(`path`, () =>
{
	const dir = './a/b';
	const file = 'c.txt';
	const full = dir + '/.\\' + file;

	it(`join`, (t: test.TestContext) =>
	{
		//console.log(Object.assign({}, this.test));

		let r = slash(nodePath.join(dir, file));

		console.log(r);

		t.assert.ok(r);
	});

	it(`dirname`, (t: test.TestContext) =>
	{
		let r = nodePath.dirname(full);

		let b = slash(r);

		console.log(r);

		t.assert.ok(!b);
	});

	it(`normalize`, (t: test.TestContext) =>
	{
		let r = nodePath.normalize(full);

		let b = slash(r);

		console.log(r);

		t.assert.ok(b);
	});

	it(`relative`, (t: test.TestContext) =>
	{
		let r = nodePath.relative(full, './b');

		let b = slash(r);

		console.log(r);

		t.assert.ok(b);
	});

	it(`resolve`, (t: test.TestContext) =>
	{
		let r = nodePath.resolve(full, './b');

		let b = slash(r);

		console.log(r);

		t.assert.ok(b);
	});

});

function slash(ret)
{
	return /\\/.test(ret) ? ret : false;
}
