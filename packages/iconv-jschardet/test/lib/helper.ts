
import { getIconvLiteCodec } from '../../lib/util';
import { BufferFrom, detect, disableCodecDataWarn, encode, skipDecodeWarning } from '../..';
import type { IFixture } from '../fixtures/test-case';
import { test } from 'node:test';
import iconvLite from 'iconv-lite';

skipDecodeWarning();
disableCodecDataWarn();

/** 將 getIconvLiteCodec 回傳值簡化為可快照的純資料 */
export function codecSnapshot(encoding: string)
{
	let r = getIconvLiteCodec(encoding as any);

	return {
		enc: r.enc,
		enc2: r.enc2,
		codec: {
			...r.codec,
			// @ts-ignore
			decodeTables: r.codec.decodeTables?.length ? `<table:${r.codec.decodeTables.length}>` : r.codec.decodeTables,
			// @ts-ignore
			encodeTable: r.codec.encodeTable?.length ? `<table:${r.codec.encodeTable.length}>` : r.codec.encodeTable,
		},
	};
}

export function _detectSnapshot(t: test.TestContext, data: string | Buffer)
{
	t.assert.snapshot({
		'detect': detect(data),
		'detect:plus': detect(data, true),
	});
}

export function _encodeSnapshot(t: test.TestContext, f: IFixture, input: string | Buffer)
{
	let data = encode(input, f.codec);

	t.assert.deepStrictEqual(data, f.buf);
	t.assert.snapshot(_bufForSnapshot(data));

	return data;
}

export function _encodeSnapshot2(t: test.TestContext, f: IFixture)
{
	let data = encode(f.str);

	t.assert.deepStrictEqual(data, f.utf8);
	t.assert.snapshot({
		'detect': detect(data),
		'buf': _bufForSnapshot(data),
	});
}

export function _BufferFromSnapshot(t: test.TestContext, f: IFixture, input: string | Buffer, codec: string)
{
	let data = BufferFrom(input, codec);

	/**
	 * 目標編碼為 utf8 時輸出 UTF-8 位元組，否則輸出原編碼位元組
	 */
	let expected = codec === 'utf8' || codec === 'utf-8' ? f.utf8 : f.buf;

	t.assert.deepStrictEqual(data, expected);
	t.assert.snapshot(_bufForSnapshot(data));
}

export function _bufForSnapshot(buf: Buffer)
{
	let ls = [];
	let ls2 = [];
	for (let b of buf.values()) {
		ls2.push(b);

		if (ls2.length === 16) {
			ls.push(ls2.join(' '));
			ls2 = [];
		}
	}
	return ls;
}
