import pathParents, { IOptions } from '../index';

let options: IOptions = {
	platform: 'win32'
}

const isWin = process.platform === "win32";

test("dummy", () => {});

isWin && test('win32', function ()
{
	var dir = 'c:\\Program Files\\Maxis\\Sim City 2000\\cities';
	var dirs = pathParents(dir, options);
	expect(dirs).toStrictEqual([
		'c:/Program Files/Maxis/Sim City 2000',
		'c:/Program Files/Maxis',
		'c:/Program Files',
		'c:/',
	]);
});

isWin && test('win32 c:', function ()
{
	var dirs = pathParents('c:\\', options);
	expect(dirs).toStrictEqual([]);
});

isWin && test('win32 network drive', function ()
{
	var dirs = pathParents(
		'\\\\storageserver01\\Active Projects\\ProjectA',
		options,
	);
	expect(dirs).toStrictEqual([
		'\\\\storageserver01\\Active Projects',
		//'\\\\storageserver01',
	]);
});
