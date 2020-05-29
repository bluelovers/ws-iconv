import LineByLine from '../class';
import { join } from 'path';
import { outputFileSync } from 'fs-extra';
import { openSync } from "fs";
import { newContent } from './util';

describe('v2', () =>
{

	let file = join(__dirname, './temp/', `tmp.txt`);

	let newLineCharacter = `\r\n`;
	let totalLines = 10;

	let content = newContent(newLineCharacter, totalLines);

	outputFileSync(file, content);

	test(`content`, () =>
	{
		expect(content).toMatchSnapshot();
	})

	test(`prop`, () =>
	{
		const liner = new LineByLine(file, {
			newLineCharacter,
		});

		expect(liner).toHaveProperty('file')
		expect(liner).toHaveProperty('fd')
		expect(liner).toHaveProperty('options')
		expect(liner).toHaveProperty('fdPosition')
		expect(liner).toHaveProperty('newLineCharacter')
		expect(liner).toHaveProperty('eofReached')
		expect(liner).toHaveProperty('lineNumber')

		liner.close();
	})

	test(`fd`, () =>
	{

		let fd = openSync(file, 'r');

		const liner = new LineByLine(fd, {
			newLineCharacter,
		});

		expect(liner).toHaveProperty('fd', fd);
		expect(liner).toHaveProperty('file', fd);

		liner.close();
	})

	test(`lineNumber`, () =>
	{
		const liner = new LineByLine(file, {
			newLineCharacter,
		});

		let line: Buffer;
		let lineNumber = 0;

		expect(liner.lineNumber).toStrictEqual(-1);
		expect(liner.lineNumber).toMatchSnapshot();

		while (line = liner.next())
		{
			expect(liner.lineNumber).toStrictEqual(lineNumber);
			expect(liner.lineNumber).toMatchSnapshot();

			lineNumber++;
		}

		expect(liner.lineNumber).toStrictEqual(totalLines - 1)
		expect(liner.lineNumber).toMatchSnapshot();

	});

	test(`string`, () =>
	{
		const liner = new LineByLine(file, {
			newLineCharacter,
		});

		let line: Buffer;

		while (line = liner.next())
		{
			let s = line.toString();
			expect(s).not.toMatch(/\r|\n/);
			expect(s).toMatchSnapshot();
		}

	});

	test(`generator`, () =>
	{
		const liner = new LineByLine(file, {
			newLineCharacter,
		});

		let line: Buffer;

		for (line of liner.generator())
		{
			let s = line.toString();
			expect(s).not.toMatch(/\r|\n/);
			expect(s).toMatchSnapshot();
		}

		expect(liner.lineNumber).toStrictEqual(totalLines - 1)

	});

	test(`generator static`, () =>
	{
		let line: Buffer;
		let lineNumber = 0;

		const liner = LineByLine.generator(file, {
			newLineCharacter,
		})

		for (line of liner)
		{
			let s = line.toString();
			expect(s).not.toMatch(/\r|\n/);
			expect(s).toMatchSnapshot();

			lineNumber++;
		}

		expect(lineNumber).toStrictEqual(totalLines)

	});

	test(`generator static v2`, () =>
	{
		let line: Buffer;
		let lineNumber = 0;

		for (line of LineByLine.generator(file, {
			newLineCharacter,
		}))
		{
			let s = line.toString();
			expect(s).not.toMatch(/\r|\n/);
			expect(s).toMatchSnapshot();

			lineNumber++;
		}

		expect(lineNumber).toStrictEqual(totalLines)

	});

})

