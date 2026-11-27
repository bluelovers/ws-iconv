/// <reference types="node" />
import { describe, test } from 'node:test';
import { LineByLine } from '../src/index';
import { join } from 'path';
import { openSync, outputFileSync } from 'fs-extra';
import { newContent } from '../../../../test/util/util';

describe('v2', () =>
{

	let file = join(__dirname, './temp/', `tmp.txt`);

	let newLineCharacter = `\r\n`;
	let totalLines = 10;

	let content = newContent(newLineCharacter, totalLines);

	outputFileSync(file, content);

	test(`content`, (t: test.TestContext) =>
	{
		t.assert.snapshot(content);
	})

	test(`prop`, (t: test.TestContext) =>
	{
		const liner = new LineByLine(file, {
			newLineCharacter,
		});

		t.assert.ok('file' in liner)
		t.assert.ok('fd' in liner)
		t.assert.ok('options' in liner)
		t.assert.ok('fdPosition' in liner)
		t.assert.ok('newLineCharacter' in liner)
		t.assert.ok('eofReached' in liner)
		t.assert.ok('lineNumber' in liner)

		liner.close();
	})

	test(`fd`, (t: test.TestContext) =>
	{

		let fd = openSync(file, 'r');

		const liner = new LineByLine(fd, {
			newLineCharacter,
		});

		t.assert.strictEqual(liner.fd, fd);
		t.assert.strictEqual(liner.file, fd);

		liner.close();
	})

	test(`lineNumber`, (t: test.TestContext) =>
	{
		const liner = new LineByLine(file, {
			newLineCharacter,
		});

		// @ts-ignore
		let line: Buffer;
		let lineNumber = 0;

		t.assert.deepStrictEqual(liner.lineNumber, -1);
		t.assert.snapshot(liner.lineNumber);

		while (line = liner.next())
		{
			t.assert.deepStrictEqual(liner.lineNumber, lineNumber);
			t.assert.snapshot(liner.lineNumber);

			lineNumber++;
		}

		t.assert.deepStrictEqual(liner.lineNumber, totalLines - 1)
		t.assert.snapshot(liner.lineNumber);

	});

	test(`string`, (t: test.TestContext) =>
	{
		const liner = new LineByLine(file, {
			newLineCharacter,
		});

		let line: Buffer;

		while (line = liner.next())
		{
			let s = line.toString();
			t.assert.doesNotMatch(s, /\r|\n/);
			t.assert.snapshot(s);
		}

	});

	test(`generator`, (t: test.TestContext) =>
	{
		const liner = new LineByLine(file, {
			newLineCharacter,
		});

		let line: Buffer;

		for (line of liner.generator())
		{
			let s = line.toString();
			t.assert.doesNotMatch(s, /\r|\n/);
			t.assert.snapshot(s);
		}

		t.assert.deepStrictEqual(liner.lineNumber, totalLines - 1)

	});

	test(`generator static`, (t: test.TestContext) =>
	{
		let line: Buffer;
		let lineNumber = 0;

		const liner = LineByLine.generator(file, {
			newLineCharacter,
		})

		for (line of liner)
		{
			let s = line.toString();
			t.assert.doesNotMatch(s, /\r|\n/);
			t.assert.snapshot(s);

			lineNumber++;
		}

		t.assert.deepStrictEqual(lineNumber, totalLines)

	});

	test(`generator static v2`, (t: test.TestContext) =>
	{
		let line: Buffer;
		let lineNumber = 0;

		for (line of LineByLine.generator(file, {
			newLineCharacter,
		}))
		{
			let s = line.toString();
			t.assert.doesNotMatch(s, /\r|\n/);
			t.assert.snapshot(s);

			lineNumber++;
		}

		t.assert.deepStrictEqual(lineNumber, totalLines)

	});

})
