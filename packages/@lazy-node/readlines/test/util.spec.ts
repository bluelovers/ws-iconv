import { newContent } from './util';
import { splitBufferByBuffer, bufferStripEndWithByBuffer } from '../lib/util';

test(`splitBufferByBuffer`, () =>
{
	let buf = Buffer.from(newContent(`\n`))

	let c = Buffer.from(`\n`);

	let actual = splitBufferByBuffer(buf, c);
	let expected;

	let lines = actual.map(v => v.toString());

	expect(lines.join(``)).toStrictEqual(buf.toString());

	expect(lines).toMatchSnapshot();
	expect(lines.join(``)).toMatchSnapshot();

	expect(actual).toMatchSnapshot();

	expect(actual.map(v => bufferStripEndWithByBuffer(v, c))).toMatchSnapshot();
	expect(actual.map(v => bufferStripEndWithByBuffer(v, c)).join(`\n`)).toStrictEqual(buf.toString());

});

