/// <reference types="node" />
import { describe, test, type TestContext } from 'node:test'
import { EnumMojibakeRepairMethod, repairMojibake } from '../src/mojibake-repair'
import {
	assertRepairContract,
	generatedMojibake,
	misreadSample,
	SAMPLE_TEXT,
} from './fixtures/cross-encoding-cases'

describe('cross-encoding → repairMojibake 整合', () =>
{
	test('誤讀鏈樣本端到端還原為原文', (t: TestContext) =>
	{
		const r = repairMojibake(misreadSample)

		assertRepairContract(t, misreadSample, r)
		t.assert.strictEqual(r.text, SAMPLE_TEXT, '亂碼須還原為原樣本句')
		t.assert.strictEqual(r.method, EnumMojibakeRepairMethod.roundTrip)
		t.assert.strictEqual(r.changed, true)
		t.assert.ok(
			r.confidence >= 0.8 && r.confidence <= 1,
			`round-trip 信心 ${r.confidence} 應落在 [0.8, 1]`,
		)
		t.assert.snapshot({ input: misreadSample, result: r })
	})

	test('正向產生的每一列亂碼交給 repairMojibake：回傳契約成立', (t: TestContext) =>
	{
		/**
		 * 正向候選涵蓋 30 種編碼組合，其中多數並非 Latin-1 / Windows-1252
		 * 誤讀鏈，repairMojibake 有權保守不動；此處只鎖定回傳結構契約，
		 * 不鎖定個別還原結果
		 */
		t.assert.ok(generatedMojibake.length > 0, '繁中樣本必須產生候選')

		for (const c of generatedMojibake)
		{
			assertRepairContract(t, c.text, repairMojibake(c.text))
		}
	})
})
