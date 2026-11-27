import { describe, it, test } from 'node:test';
import { decode, skipDecodeWarning } from '../..';
import { fixtures } from '../fixtures/test-case';
import { _detectSnapshot, _encodeSnapshot, _encodeSnapshot2, _BufferFromSnapshot, codecSnapshot } from '../lib/helper';

describe(`encode`, () =>
{
	for (const f of fixtures)
	{
		it(`${f.id} encode to ${f.codec}`, function (t: test.TestContext)
		{
			_encodeSnapshot(t, f, f.str);
		});

		it(`${f.id} encode buf to ${f.codec}`, function (t: test.TestContext)
		{
			_encodeSnapshot(t, f, f.buf);
		});

		it(`${f.id} encode to utf8`, function (t: test.TestContext)
		{
			_encodeSnapshot2(t, f);
		});
	}
});
