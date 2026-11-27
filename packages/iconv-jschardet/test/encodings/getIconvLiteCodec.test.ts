import { describe, it, test } from 'node:test';
import { decode, skipDecodeWarning } from '../..';
import { fixtures } from '../fixtures/test-case';
import { _detectSnapshot, _encodeSnapshot, _encodeSnapshot2, _BufferFromSnapshot, codecSnapshot } from '../lib/helper';

describe(`getIconvLiteCodec`, () =>
{
	for (const f of fixtures)
	{
		it(`${f.id} getIconvLiteCodec ${f.codec}`, function (t: test.TestContext)
		{
			t.assert.snapshot(codecSnapshot(f.codec));
		});
	}
});

