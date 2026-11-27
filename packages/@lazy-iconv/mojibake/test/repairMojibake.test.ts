/// <reference types="node" />
import { describe, test, type TestContext } from 'node:test'
import repairMojibakeDefault, { EnumMojibakeRepairMethod, repairMojibake } from '../src/index'
import { SAMPLE_INPUT, testGroups } from './fixtures/mojibake-test-cases'

describe('repairMojibake：資料驅動案例', () =>
{
	for (const group of testGroups)
	{
		describe(group.name, () =>
		{
			for (const c of group.cases)
			{
				test(c.name, (t: TestContext) =>
				{
					const r = repairMojibake(c.input)

					t.assert.strictEqual(r.text, c.expectedText)
					t.assert.strictEqual(r.method, c.expectedMethod)
					t.assert.strictEqual(r.changed, c.expectedChanged)
					t.assert.ok(
						r.confidence >= c.minConfidence && r.confidence <= c.maxConfidence,
						`信心分數 ${r.confidence} 應落在 [${c.minConfidence}, ${c.maxConfidence}]`,
					)
				})
			}
		})
	}
})

describe('gap-fill 全缺缺口契約', () =>
{
	test('多解重建只鎖契約：輸出全為日中字元', (t: TestContext) =>
	{
		/**
		 * 全缺缺口（無存活錨點）的重建本質多解（如 先生 與 写真 皆可命中詞典、
		 * 同分時依枚舉序勝出），故契約鎖定「輸出全為日中字元且通過詞典驗證」，
		 * 不鎖定單一猜測結果
		 */
		const r = repairMojibake('åçç')

		t.assert.strictEqual(r.method, EnumMojibakeRepairMethod.gapFill)
		t.assert.strictEqual(r.changed, true)
		for (const ch of r.text)
		{
			const cp = ch.codePointAt(0) ?? 0
			const isTarget = (cp >= 0x3000 && cp <= 0x30FF) || (cp >= 0x4E00 && cp <= 0x9FFF)
			t.assert.ok(isTarget, `輸出應全為日中字元: ${JSON.stringify(r.text)}`)
		}
	})

	test('tier B 純標點重建：保留前綴且輸出無 C1 殘留', (t: TestContext) =>
	{
		/**
		 * 缺失 byte 與相鄰符號在位元組層面不可分（頻率先驗決定取捨），
		 * 故不鎖定單一字元，只鎖定契約：前綴保留、C1 清空
		 */
		const r = repairMojibake('queenâ€s')

		t.assert.strictEqual(r.method, EnumMojibakeRepairMethod.gapFill)
		t.assert.strictEqual(r.changed, true)
		t.assert.ok(r.text.startsWith('queen'), `前綴須保留: ${JSON.stringify(r.text)}`)
		t.assert.ok(
			!Array.from(r.text).some((ch) =>
			{
				const cp = ch.codePointAt(0) ?? 0
				return cp >= 0x80 && cp <= 0x9F
			}),
			'輸出不得殘留 C1 控制字元',
		)
	})
})

describe('預設匯出', () =>
{
	test('與具名匯出行為一致', (t: TestContext) =>
	{
		t.assert.strictEqual(repairMojibakeDefault, repairMojibake)
		t.assert.deepStrictEqual(repairMojibakeDefault(SAMPLE_INPUT), repairMojibake(SAMPLE_INPUT))
	})
})
