import path from '..';

test('win32 network drive', function ()
{
	var dirs = path.win32.dirname(
		'\\\\storageserver01\\Active Projects\\ProjectA');
	expect(dirs).toStrictEqual('\\\\storageserver01\\Active Projects');
});

test('win32 network drive root', function ()
{
	var dirs = path.win32.dirname(
		'\\\\storageserver01\\Active Projects\\');
	expect(dirs).toStrictEqual('\\\\storageserver01');
});
