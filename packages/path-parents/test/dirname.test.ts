import pathParents from '../';

test('dirname', function ()
{
	let dirs = pathParents('/foo/bar/baz/quux');
	expect(dirs).toStrictEqual([
		'/foo/bar/baz',
		'/foo/bar',
		'/foo',
		'/',
	]);
});

test('root', function ()
{
	let dirs = pathParents('/');
	expect(dirs).toStrictEqual([]);
});
