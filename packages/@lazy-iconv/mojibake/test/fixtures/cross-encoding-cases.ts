/// <reference types="node" />
import type { TestContext } from 'node:test'
import {
	decodeBytes,
	encodeToBytes,
	generateMojibake,
	repairMojibakeByEncodings,
	type IMojibakeCandidate,
} from '../../src/mojibake-cross-encoding'
import {
	EnumMojibakeRepairMethod,
	type IMojibakeRepairResult,
} from '../../src/mojibake-repair'

/** 與線上工具預設輸入相同的繁中樣本句 */
export const SAMPLE_TEXT = '你好，這是亂碼測試。'

/** 以模組自身的編碼鏈產生亂碼：UTF-8 bytes 被以 windows-1252 解讀 */
export function makeMojibake(text: string): string
{
	const bytes = encodeToBytes(text, 'utf-8')
	if (bytes === null) throw new Error('UTF-8 編碼失敗，樣本句必須可編碼')
	return decodeBytes(bytes, 'windows-1252')
}

/**
 * 正向產生結果（generateMojibake(SAMPLE_TEXT)）：
 * 六種編碼兩兩互轉後異於原文的亂碼候選
 */
export const generatedMojibake: readonly IMojibakeCandidate[] = generateMojibake(SAMPLE_TEXT)

/** 誤讀鏈樣本：UTF-8 bytes 被以 windows-1252 解讀後的亂碼文字 */
export const misreadSample = makeMojibake(SAMPLE_TEXT)

/**
 * 反向還原結果（repairMojibakeByEncodings(misreadSample)）：
 * 依漢字數降冪排序、上限 8 的還原候選
 */
export const repairCandidates: readonly IMojibakeCandidate[] = repairMojibakeByEncodings(misreadSample)

/**
 * repairMojibake 回傳值的結構契約，供多個測試檔共用。
 *
 * 方法必為三者之一、信心必落於 [0,1]；未變動時必為 none / 信心 0 / 文字
 * 不變，已變動時必套用了某種還原方法且信心大於 0。
 *
 * @param t - 測試上下文
 * @param input - 送入 repairMojibake 的原始輸入
 * @param r - repairMojibake 的回傳值
 */
export function assertRepairContract(t: TestContext, input: string, r: IMojibakeRepairResult): void
{
	t.assert.ok(
		r.method === EnumMojibakeRepairMethod.none
		|| r.method === EnumMojibakeRepairMethod.roundTrip
		|| r.method === EnumMojibakeRepairMethod.gapFill,
		`未知的還原方法: ${r.method}`,
	)
	t.assert.ok(r.confidence >= 0 && r.confidence <= 1, `信心應落於 [0,1]: ${r.confidence}`)

	if (!r.changed)
	{
		t.assert.strictEqual(r.method, EnumMojibakeRepairMethod.none, '未變動時方法必為 none')
		t.assert.strictEqual(r.confidence, 0, '未變動時信心必為 0')
		t.assert.strictEqual(r.text, input, '未變動時文字須與輸入相同')
	}
	else
	{
		t.assert.notStrictEqual(r.method, EnumMojibakeRepairMethod.none, '有變動時必套用還原方法')
		t.assert.ok(r.confidence > 0, '有變動時信心須大於 0')
	}
	t.assert.snapshot({
		input,
		result: r,
	})
}
