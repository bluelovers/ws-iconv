/// <reference types="node" />
import { test } from 'node:test';
import pathParents, { IOptions } from '../index';

const isWin = process.platform === "win32";

let options: IOptions = {
	//platform: 'win32'
}

isWin && test('win32', function (t: test.TestContext)
{
	var dir = 'c:\\Program Files\\Maxis\\Sim City 2000\\cities';
	var dirs = pathParents(dir, options);
	t.assert.deepStrictEqual(dirs, [
		'c:/Program Files/Maxis/Sim City 2000',
		'c:/Program Files/Maxis',
		'c:/Program Files',
		'c:/',
	]);
});

test('win32 c:', function (t: test.TestContext)
{
	var dirs = pathParents('c:\\', options);
	t.assert.deepStrictEqual(dirs, []);
});

test('win32 network drive', function (t: test.TestContext)
{
	var dirs = pathParents(
		'\\\\storageserver01\\Active Projects\\ProjectA',
		options,
	);
	t.assert.deepStrictEqual(dirs, [
		'\\\\storageserver01\\Active Projects',
		//'\\\\storageserver01',
	]);
});
