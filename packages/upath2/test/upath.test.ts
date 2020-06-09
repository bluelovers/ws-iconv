/**
 * Created by user on 2017/12/9/009.
 */

import upath, { win32 as nodePath } from '..';

describe(`win32`, () =>
{
	const dir = './a/b';
	const file = 'c.txt';
	const full = dir + '/.\\' + file;

	it(`join`, () =>
	{
		let r = slash(nodePath.join(dir, file));

		console.log(r);

		expect(r).toBeFalsy();
	});

	it(`dirname`, () =>
	{
		let r = nodePath.dirname(full);

		let b = slash(r);

		console.log(r);

		expect(b).toBeFalsy();
	});

	it(`normalize`, () =>
	{
		let r = nodePath.normalize(full);

		let b = slash(r);

		console.log(r);

		expect(b).toBeFalsy();
	});

	it(`relative`, () =>
	{
		let r = nodePath.relative(full, './b');

		let b = slash(r);

		console.log(r);

		expect(b).toBeFalsy();
	});

	it(`resolve`, () =>
	{
		let r = nodePath.resolve(full, './b');

		let b = slash(r);

		console.log(r);

		expect(b).toBeFalsy();
	});
});

describe(`upath`, () =>
{
	const nodePath = upath;

	const dir = './a/b';
	const file = 'c.txt';
	const full = dir + '/.\\' + file;

	it(`join`, () =>
	{
		let r = slash(nodePath.join(dir, file));

		console.log(r);

		expect(r).toBeFalsy();
	});

	it(`dirname`, () =>
	{
		let r = nodePath.dirname(full);

		let b = slash(r);

		console.log(r);

		expect(b).toBeFalsy();
	});

	it(`normalize`, () =>
	{
		let r = nodePath.normalize(full);

		let b = slash(r);

		console.log(r);

		expect(b).toBeFalsy();
	});

	it(`relative`, () =>
	{
		let r = nodePath.relative(full, './b');

		let b = slash(r);

		console.log(r);

		expect(b).toBeFalsy();
	});

	it(`resolve`, () =>
	{
		let r = nodePath.resolve(full, './b');

		let b = slash(r);

		console.log(r);

		expect(b).toBeFalsy();
	});
});

function slash(ret)
{
	return /\\/.test(ret) ? ret : false;
}
