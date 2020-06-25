import upath from '../core';
import path from 'path';

test(`normalize`, () =>
{
	[
		'c:/',

		path.normalize('c:/').replace(/\\/, '/'),
		upath.normalize('c:/'),
		upath.normalize('c:\\'),

	].reduce((a, b, index) =>
	{
		console.dir({
			index,
			b,
		})

		expect(a).toStrictEqual(b)

		return a
	})

});

test(`dirname`, () =>
{
	[
		'c:/',

		path.dirname('c:/').replace(/\\/, '/'),
		upath.dirname('c:/'),
		upath.dirname('c:\\'),

	].reduce((a, b, index) =>
	{
		console.dir({
			index,
			b,
		})

		expect(b).toStrictEqual(a)

		return a
	})

});
