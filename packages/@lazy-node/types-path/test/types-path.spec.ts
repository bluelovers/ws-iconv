/// <reference types="node" />
import { describe, test } from 'node:test';
import {
	makeRePathSepSlash,
	rePathSepSlashAll,
	EnumPathSep,
	EnumPathDelimiter,
	EnumPathPlatformOrigin,
	ORIGIN_KEY,
} from '../index';

describe('makeRePathSepSlash', () =>
{
	test('default options', (t: test.TestContext) =>
	{
		const re = makeRePathSepSlash();
		t.assert.ok(re instanceof RegExp);
		t.assert.strictEqual(re.source, '[/\\\\]');
		t.assert.strictEqual(re.flags, '');
	});

	test('with win32 sep', (t: test.TestContext) =>
	{
		const re = makeRePathSepSlash({ sep: EnumPathSep.win32 });
		t.assert.strictEqual(re.source, /\\/.source);
		t.assert.match('\\', re);
	});

	test('with posix sep', (t: test.TestContext) =>
	{
		const re = makeRePathSepSlash({ sep: EnumPathSep.posix });
		t.assert.strictEqual(re.source, /\//.source);
		t.assert.match('/', re);
	});

	test('with all option true', (t: test.TestContext) =>
	{
		const re = makeRePathSepSlash({ all: true });
		t.assert.strictEqual(re.source, '[/\\\\]');
	});

	test('with global flag', (t: test.TestContext) =>
	{
		const re = makeRePathSepSlash({ global: true });
		t.assert.strictEqual(re.flags, 'g');
	});

	test('with match option', (t: test.TestContext) =>
	{
		const re = makeRePathSepSlash({ match: true });
		t.assert.strictEqual(re.source, '([/\\\\])');
	});

	test('with matchFull option', (t: test.TestContext) =>
	{
		const re = makeRePathSepSlash({ matchFull: true });
		t.assert.strictEqual(re.source, '^[/\\\\]$');
	});

	test('with repeat option positive', (t: test.TestContext) =>
	{
		const re = makeRePathSepSlash({ repeat: 2 });
		t.assert.strictEqual(re.source, '[/\\\\]{2}');
	});

	test('with repeat option negative', (t: test.TestContext) =>
	{
		const re = makeRePathSepSlash({ repeat: -1 });
		t.assert.strictEqual(re.source, '[/\\\\]+');
	});

	test('combining options', (t: test.TestContext) =>
	{
		const re = makeRePathSepSlash({
			match: true,
			global: true,
			repeat: 1,
		});
		t.assert.strictEqual(re.source, '([/\\\\]{1})');
		t.assert.strictEqual(re.flags, 'g');
	});

	test('regex matches forward slash', (t: test.TestContext) =>
	{
		const re = makeRePathSepSlash({ global: true });
		t.assert.strictEqual('/path/to/file'.replace(re, '-'), '-path-to-file');
	});

	test('regex matches backslash', (t: test.TestContext) =>
	{
		const re = makeRePathSepSlash({ global: true });
		t.assert.strictEqual('\\path\\to\\file'.replace(re, '-'), '-path-to-file');
	});

	test('regex matches mixed separators', (t: test.TestContext) =>
	{
		const re = makeRePathSepSlash({ global: true });
		t.assert.strictEqual('/path\\to/file'.replace(re, '-'), '-path-to-file');
	});
});

describe('rePathSepSlashAll', () =>
{
	test('is a RegExp', (t: test.TestContext) =>
	{
		t.assert.ok(rePathSepSlashAll instanceof RegExp);
	});

	test('matches forward slash', (t: test.TestContext) =>
	{
		t.assert.strictEqual(rePathSepSlashAll.test('/'), true);
	});

	test('matches backslash', (t: test.TestContext) =>
	{
		t.assert.strictEqual(rePathSepSlashAll.test('\\'), true);
	});

	test('replaces first path separator only (no global flag)', (t: test.TestContext) =>
	{
		const result = 'path/to\\file'.replace(rePathSepSlashAll, '-');
		// rePathSepSlashAll doesn't have global flag, so only first match is replaced
		t.assert.strictEqual(result, 'path-to\\file');
	});

	test('replaces all with global flag', (t: test.TestContext) =>
	{
		const re = makeRePathSepSlash({ global: true });
		const result = 'path/to\\file'.replace(re, '-');
		t.assert.strictEqual(result, 'path-to-file');
	});
});

describe('EnumPathSep', () =>
{
	test('win32 separator', (t: test.TestContext) =>
	{
		t.assert.strictEqual(EnumPathSep.win32, '\\');
		t.assert.strictEqual(EnumPathSep.backslash, '\\');
	});

	test('posix separator', (t: test.TestContext) =>
	{
		t.assert.strictEqual(EnumPathSep.posix, '/');
		t.assert.strictEqual(EnumPathSep.forwardslash, '/');
		t.assert.strictEqual(EnumPathSep.slash, '/');
	});
});

describe('EnumPathDelimiter', () =>
{
	test('win32 delimiter', (t: test.TestContext) =>
	{
		t.assert.strictEqual(EnumPathDelimiter.win32, ';');
	});

	test('posix delimiter', (t: test.TestContext) =>
	{
		t.assert.strictEqual(EnumPathDelimiter.posix, ':');
	});
});

describe('EnumPathPlatformOrigin', () =>
{
	test('win32 platform', (t: test.TestContext) =>
	{
		t.assert.strictEqual(EnumPathPlatformOrigin.win32, 'win32');
	});

	test('posix platform', (t: test.TestContext) =>
	{
		t.assert.strictEqual(EnumPathPlatformOrigin.posix, 'posix');
	});
});

describe('ORIGIN_KEY', () =>
{
	test('is a symbol', (t: test.TestContext) =>
	{
		t.assert.strictEqual(typeof ORIGIN_KEY, 'symbol');
	});
});
