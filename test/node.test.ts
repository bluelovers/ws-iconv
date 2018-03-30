/**
 * Created by user on 2017/12/9/009.
 */

import localDev, { relative, expect, path, assert } from './_local-dev';

describe(relative(__filename), () =>
{
	let nodePath;
	let currentTest;

	beforeEach(function ()
	{
		nodePath = path.win32;
		currentTest = this.currentTest;

		console.log(currentTest.title);
		console.log(currentTest.fullTitle());
	});

	let methods = [
		'dirname',
		'extname',
	];

	describe(`path`, () =>
	{
		const dir = './a/b';
		const file = 'c.txt';
		const full = dir + '/.\\' + file;

		it(`join`, function ()
		{
			//console.log(Object.assign({}, this.test));

			let r = slash(nodePath.join(dir, file));

			console.log(r);

			assert.isOk(r, r);
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

			assert.isOk(b, r);
		});

		it(`relative`, function ()
		{
			let r = nodePath.relative(full, './b');

			let b = slash(r);

			console.log(r);

			assert.isOk(b, r);
		});

		it(`resolve`, function ()
		{
			let r = nodePath.resolve(full, './b');

			let b = slash(r);

			console.log(r);

			assert.isOk(b, r);
		});

		setTimeout(function ()
		{
			console.log(777, currentTest);
		}, 1000)

	});
});

function slash(ret)
{
	return /\\/.test(ret) ? ret : false;
}
