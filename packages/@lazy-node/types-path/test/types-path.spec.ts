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
	test('default options', () =>
	{
		const re = makeRePathSepSlash();
		expect(re).toBeInstanceOf(RegExp);
		expect(re.source).toBe('[/\\\\]');
		expect(re.flags).toBe('');
	});

	test('with win32 sep', () =>
	{
		const re = makeRePathSepSlash({ sep: EnumPathSep.win32 });
		expect(re.source).toBe(/\\/.source);
		expect('\\').toMatch(re);
	});

	test('with posix sep', () =>
	{
		const re = makeRePathSepSlash({ sep: EnumPathSep.posix });
		expect(re.source).toBe(/\//.source);
		expect('/').toMatch(re);
	});

	test('with all option true', () =>
	{
		const re = makeRePathSepSlash({ all: true });
		expect(re.source).toBe('[/\\\\]');
	});

	test('with global flag', () =>
	{
		const re = makeRePathSepSlash({ global: true });
		expect(re.flags).toBe('g');
	});

	test('with match option', () =>
	{
		const re = makeRePathSepSlash({ match: true });
		expect(re.source).toBe('([/\\\\])');
	});

	test('with matchFull option', () =>
	{
		const re = makeRePathSepSlash({ matchFull: true });
		expect(re.source).toBe('^[/\\\\]$');
	});

	test('with repeat option positive', () =>
	{
		const re = makeRePathSepSlash({ repeat: 2 });
		expect(re.source).toBe('[/\\\\]{2}');
	});

	test('with repeat option negative', () =>
	{
		const re = makeRePathSepSlash({ repeat: -1 });
		expect(re.source).toBe('[/\\\\]+');
	});

	test('combining options', () =>
	{
		const re = makeRePathSepSlash({
			match: true,
			global: true,
			repeat: 1,
		});
		expect(re.source).toBe('([/\\\\]{1})');
		expect(re.flags).toBe('g');
	});

	test('regex matches forward slash', () =>
	{
		const re = makeRePathSepSlash({ global: true });
		expect('/path/to/file'.replace(re, '-')).toBe('-path-to-file');
	});

	test('regex matches backslash', () =>
	{
		const re = makeRePathSepSlash({ global: true });
		expect('\\path\\to\\file'.replace(re, '-')).toBe('-path-to-file');
	});

	test('regex matches mixed separators', () =>
	{
		const re = makeRePathSepSlash({ global: true });
		expect('/path\\to/file'.replace(re, '-')).toBe('-path-to-file');
	});
});

describe('rePathSepSlashAll', () =>
{
	test('is a RegExp', () =>
	{
		expect(rePathSepSlashAll).toBeInstanceOf(RegExp);
	});

	test('matches forward slash', () =>
	{
		expect(rePathSepSlashAll.test('/')).toBe(true);
	});

	test('matches backslash', () =>
	{
		expect(rePathSepSlashAll.test('\\')).toBe(true);
	});

	test('replaces first path separator only (no global flag)', () =>
	{
		const result = 'path/to\\file'.replace(rePathSepSlashAll, '-');
		// rePathSepSlashAll doesn't have global flag, so only first match is replaced
		expect(result).toBe('path-to\\file');
	});

	test('replaces all with global flag', () =>
	{
		const re = makeRePathSepSlash({ global: true });
		const result = 'path/to\\file'.replace(re, '-');
		expect(result).toBe('path-to-file');
	});
});

describe('EnumPathSep', () =>
{
	test('win32 separator', () =>
	{
		expect(EnumPathSep.win32).toBe('\\');
		expect(EnumPathSep.backslash).toBe('\\');
	});

	test('posix separator', () =>
	{
		expect(EnumPathSep.posix).toBe('/');
		expect(EnumPathSep.forwardslash).toBe('/');
		expect(EnumPathSep.slash).toBe('/');
	});
});

describe('EnumPathDelimiter', () =>
{
	test('win32 delimiter', () =>
	{
		expect(EnumPathDelimiter.win32).toBe(';');
	});

	test('posix delimiter', () =>
	{
		expect(EnumPathDelimiter.posix).toBe(':');
	});
});

describe('EnumPathPlatformOrigin', () =>
{
	test('win32 platform', () =>
	{
		expect(EnumPathPlatformOrigin.win32).toBe('win32');
	});

	test('posix platform', () =>
	{
		expect(EnumPathPlatformOrigin.posix).toBe('posix');
	});
});

describe('ORIGIN_KEY', () =>
{
	test('is a symbol', () =>
	{
		expect(typeof ORIGIN_KEY).toBe('symbol');
	});
});
