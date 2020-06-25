import path from '../core';

test(`default`, () =>
{

	let actual = path.normalize(__dirname + path.sep);
	let actual2 = path.dirname(__dirname + path.sep);

	expect(actual).toMatch(/[/\/]$/)
	expect(actual2).not.toMatch(/[/\/]$/)

});

test(`default v2`, () =>
{

	let actual = path.normalize(__dirname + '\\');
	let actual2 = path.dirname(__dirname + '\\');

	expect(actual).toMatch(/[/\/]$/)
	expect(actual2).not.toMatch(/[/\/]$/)

});

test(`win32`, () =>
{

	let actual = path.win32.normalize(__dirname + path.win32.sep);
	let actual2 = path.win32.dirname(__dirname + path.win32.sep);

	expect(actual).toMatch(/[/\/]$/)
	expect(actual2).not.toMatch(/[/\/]$/)

});

test(`posix`, () =>
{

	let actual = path.posix.normalize(__dirname + path.posix.sep);
	let actual2 = path.posix.dirname(__dirname + path.posix.sep);

	expect(actual).toMatch(/[/\/]$/)
	expect(actual2).not.toMatch(/[/\/]$/)

});
