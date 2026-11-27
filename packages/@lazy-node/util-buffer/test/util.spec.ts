/// <reference types="node" />
import { test } from 'node:test';
import { newContent } from '../../../../test/util/util';
import { bufferStripEndWithByBuffer, splitBufferByBuffer } from '../src/index';

test(`splitBufferByBuffer`, (t: test.TestContext) =>
{
	let buf = Buffer.from(newContent(`\n`))

	let c = Buffer.from(`\n`);

	let actual = splitBufferByBuffer(buf, c);

	let lines = actual.map(v => v.toString());

	t.assert.deepStrictEqual(lines.join(``), buf.toString());

	t.assert.snapshot(lines);
	t.assert.snapshot(lines.join(``));

	t.assert.snapshot(actual);

	t.assert.snapshot(actual.map(v => bufferStripEndWithByBuffer(v, c)));
	t.assert.deepStrictEqual(actual.map(v => bufferStripEndWithByBuffer(v, c)).join(`\n`), buf.toString());

});
