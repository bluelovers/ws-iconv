/// <reference types="node" />
import { test } from 'node:test';
import path from '../core';

test(`default`, (t: test.TestContext) =>
{

	let actual = path.normalize(__dirname + path.sep);
	let actual2 = path.dirname(__dirname + path.sep);

	t.assert.match(actual, /[/\/]$/)
	t.assert.doesNotMatch(actual2, /[/\/]$/)

});

test(`default v2`, (t: test.TestContext) =>
{

	let actual = path.normalize(__dirname + '\\');
	let actual2 = path.dirname(__dirname + '\\');

	t.assert.match(actual, /[/\/]$/)
	t.assert.doesNotMatch(actual2, /[/\/]$/)

});

test(`win32`, (t: test.TestContext) =>
{

	let actual = path.win32.normalize(__dirname + path.win32.sep);
	let actual2 = path.win32.dirname(__dirname + path.win32.sep);

	t.assert.match(actual, /[/\/]$/)
	t.assert.doesNotMatch(actual2, /[/\/]$/)

});

test(`posix`, (t: test.TestContext) =>
{

	let actual = path.posix.normalize(__dirname + path.posix.sep);
	let actual2 = path.posix.dirname(__dirname + path.posix.sep);

	t.assert.match(actual, /[/\/]$/)
	t.assert.doesNotMatch(actual2, /[/\/]$/)

});
