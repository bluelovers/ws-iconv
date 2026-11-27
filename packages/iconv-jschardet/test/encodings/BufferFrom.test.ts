/// <reference types="node" />
/**
 * 針對 fixtures/data.ts 的各編碼樣本，快照 (Snapshot) 各 API 的回傳值
 */
import { describe, it, test } from 'node:test';
import { decode, skipDecodeWarning } from '../..';
import { fixtures } from '../fixtures/test-case';
import { _detectSnapshot, _encodeSnapshot, _encodeSnapshot2, _BufferFromSnapshot, codecSnapshot } from '../lib/helper';

describe(`BufferFrom`, () =>
{
	for (const f of fixtures)
	{
		it(`${f.id} BufferFrom str utf8`, function (t: test.TestContext)
		{
			_BufferFromSnapshot(t, f, f.str, 'utf8');
		});

		it(`${f.id} BufferFrom buf utf8`, function (t: test.TestContext)
		{
			_BufferFromSnapshot(t, f, f.buf, 'utf8');
		});

		it(`${f.id} BufferFrom str ${f.codec}`, function (t: test.TestContext)
		{
			_BufferFromSnapshot(t, f, f.str, f.codec);
		});
	}
});

