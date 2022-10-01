import { newContent } from '@lazy-node/readlines/test/util';
import { bufferStripEndWithByBuffer, splitBufferByBuffer } from '../src/index';

test(`splitBufferByBuffer`, () =>
{
	let buf = Buffer.from(newContent(`\n`))

	let c = Buffer.from(`\n`);

	let actual = splitBufferByBuffer(buf, c);

	let lines = actual.map(v => v.toString());

	expect(lines.join(``)).toStrictEqual(buf.toString());

	expect(lines).toMatchSnapshot();
	expect(lines.join(``)).toMatchSnapshot();

	expect(actual).toMatchSnapshot();

	expect(actual.map(v => bufferStripEndWithByBuffer(v, c))).toMatchSnapshot();
	expect(actual.map(v => bufferStripEndWithByBuffer(v, c)).join(`\n`)).toStrictEqual(buf.toString());

});

