import { describe, it, test } from 'node:test';
import { decode, skipDecodeWarning } from '../..';
import { fixtures } from '../fixtures/test-case';
import { _detectSnapshot, _encodeSnapshot, _encodeSnapshot2, _BufferFromSnapshot, codecSnapshot } from '../lib/helper';

describe(`detect`, () =>
{
	for (const f of fixtures)
	{
		it(`${f.id} detect str`, function (t: test.TestContext)
		{
			_detectSnapshot(t, f.str);
		});

		it(`${f.id} detect buf`, function (t: test.TestContext)
		{
			_detectSnapshot(t, f.buf);
		});
	}
});
