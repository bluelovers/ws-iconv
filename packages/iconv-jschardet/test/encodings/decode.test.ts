import { describe, it, test } from 'node:test';
import { decode, skipDecodeWarning } from '../..';
import { fixtures } from '../fixtures/test-case';
import { _detectSnapshot, _encodeSnapshot, _encodeSnapshot2, _BufferFromSnapshot, codecSnapshot } from '../lib/helper';

describe(`decode`, () =>
{
	for (const f of fixtures)
	{
		it(`${f.id} decode buf`, function (t: test.TestContext)
		{
			t.assert.strictEqual(decode(f.buf), decode(f.buf, f.codec));
			t.assert.snapshot(decode(f.buf));
		});

		it(`${f.id} decode str`, function (t: test.TestContext)
		{
			t.assert.snapshot(decode(f.str));
		});
	}
});
