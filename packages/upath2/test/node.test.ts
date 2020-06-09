/**
 * Created by user on 2017/12/9/009.
 */
import { win32 as nodePath } from 'path';

describe(`path`, () =>
{
	const dir = './a/b';
	const file = 'c.txt';
	const full = dir + '/.\\' + file;

	it(`join`, () =>
	{
		//console.log(Object.assign({}, this.test));

		let r = slash(nodePath.join(dir, file));

		console.log(r);

		expect(r).toBeTruthy();
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

		expect(b).toBeTruthy();
	});

	it(`relative`, () =>
	{
		let r = nodePath.relative(full, './b');

		let b = slash(r);

		console.log(r);

		expect(b).toBeTruthy();
	});

	it(`resolve`, () =>
	{
		let r = nodePath.resolve(full, './b');

		let b = slash(r);

		console.log(r);

		expect(b).toBeTruthy();
	});

});

function slash(ret)
{
	return /\\/.test(ret) ? ret : false;
}
