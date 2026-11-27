/// <reference types="node" />
import { describe, test, type TestContext } from 'node:test'
import {
	decodeBytes,
	encodeToBytes,
	generateMojibake,
	getDecodeTable,
	MOJIBAKE_ENCODINGS,
	repairMojibakeByEncodings,
} from '../src/mojibake-cross-encoding'
import {
	generatedMojibake,
	misreadSample,
	repairCandidates,
	SAMPLE_TEXT,
} from './fixtures/cross-encoding-cases'

/** 輸出中的漢字數（排序契約檢查用） */
const countCjk = (text: string): number => (text.match(/[\u4e00-\u9fff]/g) ?? []).length

describe('MOJIBAKE_ENCODINGS', () =>
{
	test('六種編碼且標籤唯一', (t: TestContext) =>
	{
		const labels = MOJIBAKE_ENCODINGS.map(e => e.label)

		t.assert.strictEqual(labels.length, 6)
		t.assert.strictEqual(new Set(labels).size, 6)
		t.assert.ok(MOJIBAKE_ENCODINGS.every(e => e.name.length > 0), '每個編碼都須有顯示名稱')
		t.assert.snapshot([...MOJIBAKE_ENCODINGS])
	})
})

describe('編碼原語：getDecodeTable / encodeToBytes / decodeBytes', () =>
{
	test('UTF-8 來回編解碼不變', (t: TestContext) =>
	{
		const bytes = encodeToBytes(SAMPLE_TEXT, 'utf-8')

		t.assert.ok(bytes !== null, 'UTF-8 必定可編碼')
		t.assert.strictEqual(decodeBytes(bytes!, 'utf-8'), SAMPLE_TEXT)
	})

	test('Big5 解碼表可編碼繁中常用字', (t: TestContext) =>
	{
		const bytes = encodeToBytes('繁中測試', 'big5')

		t.assert.ok(bytes !== null, 'Big5 應可編碼繁中字元')
		t.assert.strictEqual(decodeBytes(bytes!, 'big5'), '繁中測試')
	})

	test('windows-1252 編不了繁中字元 → null', (t: TestContext) =>
	{
		t.assert.strictEqual(encodeToBytes(SAMPLE_TEXT, 'windows-1252'), null)
	})

	test('不支援的編碼標籤回傳 null，且重複呼叫共用同一份表', (t: TestContext) =>
	{
		t.assert.strictEqual(getDecodeTable('no-such-encoding-xyz'), null)
		t.assert.strictEqual(encodeToBytes('abc', 'no-such-encoding-xyz'), null)

		const a = getDecodeTable('big5')
		const b = getDecodeTable('big5')

		t.assert.ok(a !== null, 'Big5 標籤應可建表')
		t.assert.strictEqual(a, b, '同一標籤須命中快取（同一物件）')
	})
})

describe('generateMojibake：正向產生亂碼', () =>
{
	test('純 ASCII 無誤讀情境 → 空清單', (t: TestContext) =>
	{
		/**
		 * 六種編碼對 ASCII 都以同值單 byte 表示，互轉結果與原文相同，
		 * 不構成「會看到不一樣文字」的亂碼情境
		 */
		t.assert.deepStrictEqual(generateMojibake('hello world'), [])
	})

	test('繁中樣本的候選皆異於原文，情境標籤指向兩種不同編碼', (t: TestContext) =>
	{
		const candidates = generatedMojibake

		t.assert.ok(candidates.length > 0, '繁中樣本必須產生候選')
		for (const c of candidates)
		{
			t.assert.ok(c.text !== SAMPLE_TEXT, `候選須異於原文: ${c.text}`)
			t.assert.ok(
				/^以 .+ 存檔，用 .+ 開啟$/.test(c.label),
				`情境標籤格式不符: ${c.label}`,
			)
		}
		t.assert.snapshot({ input: SAMPLE_TEXT, candidates })
	})
})

describe('repairMojibakeByEncodings：反向還原', () =>
{
	const mojibake = misreadSample

	test('還原候選契約：無 U+FFFD、異於輸入、漢字數遞減、上限 8', (t: TestContext) =>
	{
		const candidates = repairCandidates

		t.assert.ok(candidates.length > 0, '必須產生候選')
		t.assert.ok(candidates.length <= 8, '預設上限為 8')
		let previousCjk = Number.POSITIVE_INFINITY
		for (const c of candidates)
		{
			t.assert.ok(!c.text.includes('\ufffd'), `不得含替代字元: ${c.text}`)
			t.assert.ok(c.text !== mojibake, '候選須異於輸入')
			const cjk = countCjk(c.text)
			t.assert.ok(cjk <= previousCjk, `漢字數須遞減排序: ${c.text}`)
			previousCjk = cjk
		}
		t.assert.snapshot({ input: mojibake, candidates })
	})

	test('正確原文存在於候選之中', (t: TestContext) =>
	{
		/**
		 * 不鎖定第一名：錯誤組合也可能解出大量漢字，與正確結果同分時
		 * 由穩定排序決定；契約鎖定「正確答案必須在候選內」
		 */
		const candidates = repairMojibakeByEncodings(mojibake)
		const texts = candidates.map(c => c.text)

		t.assert.ok(texts.includes(SAMPLE_TEXT), `候選須包含原文: ${texts.join(' | ')}`)
	})

	test('limit 生效', (t: TestContext) =>
	{
		t.assert.ok(repairMojibakeByEncodings(mojibake, 3).length <= 3)
		t.assert.deepStrictEqual(repairMojibakeByEncodings(mojibake, 0), [])
	})
})
