import { EnumMojibakeRepairMethod } from '../../src/index'

/**
 * 單一測試個案：輸入、預期還原結果與信心分數 (confidence) 區間
 */
export interface IMojibakeCase
{
	/** 個案名稱 */
	name: string
	/** 疑似 mojibake 的輸入文字 */
	input: string
	/** 預期文字 */
	expectedText: string
	/** 預期還原方法 */
	expectedMethod: EnumMojibakeRepairMethod
	/** 預期是否有變動 */
	expectedChanged: boolean
	/** 預期信心分數下限（含） */
	minConfidence: number
	/** 預期信心分數上限（含） */
	maxConfidence: number
}

/**
 * 測試群組：一組個案共用同一還原方法 (repair method)
 */
export interface IMojibakeTestGroup
{
	/** 群組名稱 */
	name: string
	/** 個案清單 */
	cases: IMojibakeCase[]
}

/** 預設匯出行為驗證用的樣本輸入 */
export const SAMPLE_INPUT = 'cafÃ©'

/**
 * 完整測試資料集
 *
 * 誤讀鏈：原文 → UTF-8 bytes → 以 Latin-1 / Windows-1252 解讀。
 * 以下輸入皆以 escape 寫入不可見的 C1 控制字元 (0x80–0x9F)，避免肉眼不可見導致維護困難。
 */
export const testGroups: IMojibakeTestGroup[] = [
	{
		name: 'round-trip：bytes 俱在的確定性還原',
		cases: [
			{
				name: 'Latin-1 讀法的法文 café',
				input: 'cafÃ©',
				expectedText: 'café',
				expectedMethod: EnumMojibakeRepairMethod.roundTrip,
				expectedChanged: true,
				minConfidence: 0.8,
				maxConfidence: 1,
			},
			{
				name: 'Windows-1252 讀法的 東京（C1 續接位元組仍在）',
				input: 'æ\u009D±äº¬',
				expectedText: '東京',
				expectedMethod: EnumMojibakeRepairMethod.roundTrip,
				expectedChanged: true,
				minConfidence: 0.9,
				maxConfidence: 1,
			},
			{
				name: '英文彎引號殘骸 â€™',
				input: 'â€™',
				expectedText: '’',
				expectedMethod: EnumMojibakeRepairMethod.roundTrip,
				expectedChanged: true,
				minConfidence: 0.9,
				maxConfidence: 1,
			},
			{
				name: '日文假名整串殘骸',
				input: 'ã\u0081\u0093ã\u0082\u0093ã\u0081«ã\u0081¡ã\u0081¯',
				expectedText: 'こんにちは',
				expectedMethod: EnumMojibakeRepairMethod.roundTrip,
				expectedChanged: true,
				minConfidence: 0.9,
				maxConfidence: 1,
			},
		],
	},
	{
		name: 'gap-fill：C1 續接位元組被剝除的缺口重建',
		cases: [
			{
				name: '存活錨點重建 東京',
				input: 'æ±äº¬',
				expectedText: '東京',
				expectedMethod: EnumMojibakeRepairMethod.gapFill,
				expectedChanged: true,
				minConfidence: 0.1,
				maxConfidence: 0.8,
			},
		],
	},
	{
		name: 'none：證據不足，保守不動',
		cases: [
			{
				name: '純 ASCII 文字',
				input: 'hello world',
				expectedText: 'hello world',
				expectedMethod: EnumMojibakeRepairMethod.none,
				expectedChanged: false,
				minConfidence: 0,
				maxConfidence: 0,
			},
			{
				name: '合法法文（無誤讀鏈證據）',
				input: 'café',
				expectedText: 'café',
				expectedMethod: EnumMojibakeRepairMethod.none,
				expectedChanged: false,
				minConfidence: 0,
				maxConfidence: 0,
			},
			{
				name: '真正的日文 Unicode 文字',
				input: '日本語のテキスト',
				expectedText: '日本語のテキスト',
				expectedMethod: EnumMojibakeRepairMethod.none,
				expectedChanged: false,
				minConfidence: 0,
				maxConfidence: 0,
			},
			{
				name: '北歐文 Ångström（混合高位字元仍不動）',
				input: 'Ångström',
				expectedText: 'Ångström',
				expectedMethod: EnumMojibakeRepairMethod.none,
				expectedChanged: false,
				minConfidence: 0,
				maxConfidence: 0,
			},
			{
				name: '真正的中文 Unicode 文字',
				input: '你好，世界',
				expectedText: '你好，世界',
				expectedMethod: EnumMojibakeRepairMethod.none,
				expectedChanged: false,
				minConfidence: 0,
				maxConfidence: 0,
			},
			{
				name: '空字串',
				input: '',
				expectedText: '',
				expectedMethod: EnumMojibakeRepairMethod.none,
				expectedChanged: false,
				minConfidence: 0,
				maxConfidence: 0,
			},
		],
	},
	{
		name: '混合路：cp1252 專屬符號分段與多行處理',
		cases: [
			{
				name: '正確 em-dash 與 mojibake 殘骸共存於同一行',
				input: '— cafÃ©',
				expectedText: '— café',
				expectedMethod: EnumMojibakeRepairMethod.roundTrip,
				expectedChanged: true,
				minConfidence: 0.8,
				maxConfidence: 1,
			},
			{
				name: '多行混合（最弱方法取 gap-fill、信心取最低）',
				input: 'cafÃ©\nhello\næ±äº¬',
				expectedText: 'café\nhello\n東京',
				expectedMethod: EnumMojibakeRepairMethod.gapFill,
				expectedChanged: true,
				minConfidence: 0.1,
				maxConfidence: 0.8,
			},
			{
				name: '多行逐行 round-trip 還原且保留換行結構',
				input: 'æ\u009D±äº¬\ncafÃ©',
				expectedText: '東京\ncafé',
				expectedMethod: EnumMojibakeRepairMethod.roundTrip,
				expectedChanged: true,
				minConfidence: 0.8,
				maxConfidence: 1,
			},
			{
				name: '多行皆不還原',
				input: 'hello\ncafé',
				expectedText: 'hello\ncafé',
				expectedMethod: EnumMojibakeRepairMethod.none,
				expectedChanged: false,
				minConfidence: 0,
				maxConfidence: 0,
			},
		],
	},
]
