/**
 * Created by user on 2017/12/9/009.
 */

import { relative, expect, path, assert } from './_local-dev';

import * as upath from '..';

describe(relative(__filename), () =>
{
	let nodePath;

	beforeEach(() =>
	{
		nodePath = upath.win32;
	});

	let methods = [
		'dirname',
		'extname',
	];

	describe(`upath`, () =>
	{
		const dir = './a/b';
		const file = 'c.txt';
		const full = dir + '/.\\' + file;

		it(`join`, function ()
		{
			let r = slash(nodePath.join(dir, file));

			console.log(r);

			assert.isNotOk(r, r);
		});

		it(`dirname`, function ()
		{
			let r = nodePath.dirname(full);

			let b = slash(r);

			console.log(r);

			assert.isNotOk(b, r);
		});

		it(`normalize`, function ()
		{
			let r = nodePath.normalize(full);

			let b = slash(r);

			console.log(r);

			assert.isNotOk(b, r);
		});

		it(`relative`, function ()
		{
			let r = nodePath.relative(full, './b');

			let b = slash(r);

			console.log(r);

			assert.isNotOk(b, r);
		});

		it(`resolve`, function ()
		{
			let r = nodePath.resolve(full, './b');

			let b = slash(r);

			console.log(r);

			assert.isNotOk(b, r);
		});
	});
});

function slash(ret)
{
	return /\\/.test(ret) ? ret : false;
}
