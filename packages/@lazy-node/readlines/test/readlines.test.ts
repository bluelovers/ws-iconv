/// <reference types="node" />
import { test } from 'node:test';

'use strict';

import { LineByLine } from '../src';

import path from 'path';

test('should get all lines', (t: test.TestContext) =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/twoLineFile.txt'));

	t.assert.strictEqual(liner.next().toString('ascii'), 'hello');
	t.assert.strictEqual(liner.next().toString('ascii'), 'hello2');
	t.assert.strictEqual(liner.next(), undefined);
	t.assert.strictEqual(liner.next(), undefined);
	t.assert.strictEqual(liner.fd, null);
});

test('should get all lines even if the file doesnt end with new line', (t: test.TestContext) =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/badEndFile.txt'));

	t.assert.strictEqual(liner.next().toString('ascii'), 'google.com');
	t.assert.strictEqual(liner.next().toString('ascii'), 'yahoo.com');
	t.assert.strictEqual(liner.next(), undefined);
	t.assert.strictEqual(liner.fd, null);
});

test('should get all lines if there is no new lines', (t: test.TestContext) =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/noNewLinesFile.txt'));

	t.assert.strictEqual(liner.next().toString('ascii'), 'no new line');
	t.assert.strictEqual(liner.next(), undefined);
	t.assert.strictEqual(liner.fd, null);
});

test('should handle empty files', (t: test.TestContext) =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/emptyFile.txt'));

	t.assert.strictEqual(liner.next(), undefined);
	t.assert.strictEqual(liner.fd, null);
});

test('should read right between two chunks', (t: test.TestContext) =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/normalFile.txt'), {
		readChunk: 16,
	});

	t.assert.strictEqual(liner.next().toString('ascii'), 'google.com');
	t.assert.strictEqual(liner.next().toString('ascii'), 'yahoo.com');
	t.assert.strictEqual(liner.next().toString('ascii'), 'yandex.ru');
	t.assert.strictEqual(liner.next(), undefined);
	t.assert.strictEqual(liner.fd, null);
});

test('should read empty lines', (t: test.TestContext) =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/withEmptyLines.txt'));

	t.assert.strictEqual(liner.next().toString('ascii'), 'hello');
	t.assert.strictEqual(liner.next().toString('ascii'), 'hello4');
	t.assert.strictEqual(liner.next().toString('ascii'), '');
	t.assert.strictEqual(liner.next().toString('ascii'), 'hello2');
	t.assert.strictEqual(liner.next().toString('ascii'), 'hello3');
	t.assert.strictEqual(liner.next(), undefined);
	t.assert.strictEqual(liner.fd, null);
});

test('should reset and start from the beggining', (t: test.TestContext) =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/normalFile.txt'), {
		readChunk: 16,
	});

	t.assert.strictEqual(liner.next().toString('ascii'), 'google.com');
	t.assert.strictEqual(liner.next().toString('ascii'), 'yahoo.com');

	liner.reset()

	t.assert.strictEqual(liner.next().toString('ascii'), 'google.com');
	t.assert.strictEqual(liner.next().toString('ascii'), 'yahoo.com');
	t.assert.strictEqual(liner.next().toString('ascii'), 'yandex.ru');
	t.assert.strictEqual(liner.next(), undefined);
	t.assert.strictEqual(liner.fd, null);
});

test('should read big lines', (t: test.TestContext) =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/bigLines.json'));

	t.assert.ok(JSON.parse(liner.next() as any));
	t.assert.ok(JSON.parse(liner.next() as any));
	t.assert.ok(JSON.parse(liner.next() as any));

	t.assert.strictEqual(liner.next(), undefined);
	t.assert.strictEqual(liner.fd, null);
});

test('Non-Latin Char JSON', (t: test.TestContext) =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/eiffel.geojson'));

	t.assert.ok(JSON.parse(liner.next().toString()));

	t.assert.strictEqual(liner.fd, null);
});

test('Manually Close', (t: test.TestContext) =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/normalFile.txt'));

	t.assert.strictEqual(liner.next().toString(), 'google.com');

	liner.close();
	t.assert.strictEqual(liner.fd, null);

	t.assert.strictEqual(liner.next(), undefined);
});

test('should correctly processes NULL character in lines', (t: test.TestContext) =>
{
	const liner = new LineByLine(path.resolve(__dirname, 'fixtures/withNULL.txt'));

	t.assert.strictEqual(liner.next().toString(), 'line without null');
	t.assert.strictEqual(liner.next().toString(), 'line wi' + String.fromCharCode(0) + 'th null');
	t.assert.strictEqual(liner.next().toString(), 'another line without null');

	t.assert.strictEqual(liner.fd, null);
})
