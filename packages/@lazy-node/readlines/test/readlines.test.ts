'use strict';

import LineByLine from '..';

import path from 'path';

test('should get all lines', () =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/twoLineFile.txt'));

	expect(liner.next().toString('ascii')).toBe('hello');
	expect(liner.next().toString('ascii')).toBe('hello2');
	expect(liner.next()).toBeUndefined();
	expect(liner.next()).toBeUndefined();
	expect(liner.fd).toBe(null);
});

test('should get all lines even if the file doesnt end with new line', () =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/badEndFile.txt'));

	expect(liner.next().toString('ascii')).toBe('google.com');
	expect(liner.next().toString('ascii')).toBe('yahoo.com');
	expect(liner.next()).toBeUndefined();
	expect(liner.fd).toBe(null);
});

test('should get all lines if there is no new lines', () =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/noNewLinesFile.txt'));

	expect(liner.next().toString('ascii')).toBe('no new line');
	expect(liner.next()).toBeUndefined();
	expect(liner.fd).toBe(null);
});

test('should handle empty files', () =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/emptyFile.txt'));

	expect(liner.next()).toBeUndefined();
	expect(liner.fd).toBe(null);
});

test('should read right between two chunks', () =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/normalFile.txt'), {
		readChunk: 16,
	});

	expect(liner.next().toString('ascii')).toBe('google.com');
	expect(liner.next().toString('ascii')).toBe('yahoo.com');
	expect(liner.next().toString('ascii')).toBe('yandex.ru');
	expect(liner.next()).toBeUndefined();
	expect(liner.fd).toBe(null);
});

test('should read empty lines', () =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/withEmptyLines.txt'));

	expect(liner.next().toString('ascii')).toBe('hello');
	expect(liner.next().toString('ascii')).toBe('hello4');
	expect(liner.next().toString('ascii')).toBe('');
	expect(liner.next().toString('ascii')).toBe('hello2');
	expect(liner.next().toString('ascii')).toBe('hello3');
	expect(liner.next()).toBeUndefined();
	expect(liner.fd).toBe(null);
});

test('should reset and start from the beggining', () =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/normalFile.txt'), {
		readChunk: 16,
	});

	expect(liner.next().toString('ascii')).toBe('google.com');
	expect(liner.next().toString('ascii')).toBe('yahoo.com');

	liner.reset()

	expect(liner.next().toString('ascii')).toBe('google.com');
	expect(liner.next().toString('ascii')).toBe('yahoo.com');
	expect(liner.next().toString('ascii')).toBe('yandex.ru');
	expect(liner.next()).toBeUndefined();
	expect(liner.fd).toBe(null);
});

test('should read big lines', () =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/bigLines.json'));

	expect(JSON.parse(liner.next() as any)).toBeTruthy();
	expect(JSON.parse(liner.next() as any)).toBeTruthy();
	expect(JSON.parse(liner.next() as any)).toBeTruthy();

	expect(liner.next()).toBeUndefined();
	expect(liner.fd).toBe(null);
});

test('Non-Latin Char JSON', () =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/eiffel.geojson'));

	expect(JSON.parse(liner.next().toString())).toBeTruthy();

	expect(liner.fd).toBe(null);
});

test('Manually Close', () =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/normalFile.txt'));

	expect(liner.next().toString()).toBe('google.com');

	liner.close();
	expect(liner.fd).toBe(null);

	expect(liner.next()).toBeUndefined();
});

test('should correctly processes NULL character in lines', () =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/withNULL.txt'));

	expect(liner.next().toString()).toBe('line without null');
	expect(liner.next().toString()).toBe('line wi' + String.fromCharCode(0) + 'th null');
	expect(liner.next().toString()).toBe('another line without null');

	expect(liner.fd).toBe(null);
})
