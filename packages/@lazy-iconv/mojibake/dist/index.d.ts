import { ITSTypeAndStringLiteral } from 'ts-type';

/**
 * mojibake 還原方法。
 *
 * none      — 未還原（非 mojibake、或證據不足以安全還原）
 * round-trip — 完整還原：所有 bytes 俱在，Latin-1 / Windows-1252 反向對映後以 UTF-8 嚴格解碼即得原文
 * gap-fill  — 最佳努力：部分續接位元組（0x80–0x9F，Latin-1 下為不可見 C1 控制字元）在傳輸中被丟棄，
 *             以候選枚舉 + 詞典評分重建缺口；結果為推測，信心分數較低
 */
export declare const enum EnumMojibakeRepairMethod {
	none = "none",
	roundTrip = "round-trip",
	gapFill = "gap-fill"
}
/**
 * mojibake 還原方法（相容於 js：接受原始字串）。
 */
export type IMojibakeRepairMethod = ITSTypeAndStringLiteral<EnumMojibakeRepairMethod>;
/**
 * 還原結果。
 */
export interface IMojibakeRepairResult {
	/** 還原後的文字；未還原時為原文字 */
	text: string;
	/** 套用的還原方法 */
	method: EnumMojibakeRepairMethod;
	/** 信心 0–1：round-trip 為確定性還原（≥0.8）；gap-fill 為推測（≤0.8） */
	confidence: number;
	/** 是否有變動 */
	changed: boolean;
}
/** 缺口描述：lead 位元組後所需的續接位元組不足，差額即被剝除的數量 */
export interface IGap {
	/** lead 位元組在 bytes 陣列中的位置 */
	index: number;
	/** UTF-8 lead byte（0xE0–0xEF 或 0xF0–0xF4） */
	lead: number;
	/** 該序列所需續接位元組總數 */
	needed: number;
	/** 原地存活的續接位元組（0xA0–0xBF，已按原順序） */
	present: readonly number[];
}
/** 缺口候選：一組可填入的續接位元組及其解出的字元 */
export interface IGapCandidate {
	conts: readonly number[];
	char: string;
	score: number;
}
export interface IBeamHyp {
	/** 至目前為止各缺口選定的續接位元組 */
	fills: (readonly number[])[];
	/** 套用 fills 後、截至目前缺口的前綴文本（供詞評分） */
	prefix: string;
	score: number;
}
/**
 * 字元 → 誤讀前的 byte。
 *
 * U+0000–U+00FF 與 codepoint 同值（Latin-1 讀法涵蓋全部 256 個 byte）；
 * 其餘先查 Windows-1252 對映；皆不中則回傳 null（真正的 Unicode 文字，
 * 不屬於 mojibake 鏈）。
 *
 * @param {string} ch - 單一字元
 * @returns {number | null}
 */
export declare function _charToByte(ch: string): number | null;
/**
 * 嚴格 UTF-8 解碼：任何無效序列（含被截斷的尾端、獨立出現的續接位元組）
 * 一律回傳 null，絕不產生替代字元。
 *
 * @param {readonly number[]} bytes - 待解碼位元組
 * @returns {string | null} 解碼文本；無效時為 null
 */
export declare function _strictDecodeUtf8(bytes: readonly number[]): string | null;
/**
 * 字串 → 誤讀前的 byte 陣列。
 *
 * @param {string} line - 單行文字
 * @returns {number[] | null} byte 陣列；含無法對映字元時為 null
 */
export declare function _lineToBytes(line: string): number[] | null;
/**
 * 是否存在「誤讀鏈證據」字元（C1 控制字元或 Windows-1252 專屬符號）。
 * round-trip 接受門檻用：純 Latin 字母文字（如合法法文）不具此類字元。
 *
 * @param {string} line - 單行文字
 * @returns {boolean}
 */
export declare function _hasMojibakeMarker(line: string): boolean;
/**
 * 字元是否為「lead-like」：Latin-1 高位字元中，落在 UTF-8 lead byte
 * 範圍（0xC2–0xF4）者。mojibake 骨架偵測與詞救援相容性判斷用。
 *
 * @param {number} cp - codepoint
 * @returns {boolean}
 */
export declare function _isLeadLike(cp: number): boolean;
/**
 * 是否存在 lead + 存活續接位元組相鄰的骨架（mojibake 強證據；
 * 合法拉丁文字的高位字元之間不會相鄰成此形）。
 *
 * @param {readonly number[]} bytes - byte 陣列
 * @returns {boolean}
 */
export declare function _hasLeadContAdjacency(bytes: readonly number[]): boolean;
/**
 * 不同 lead-like byte 的數量（0xC2–0xF4）。
 *
 * gap-fill 第三道證據：單一 lead 重複（如合法芬蘭語 ää）不放行，
 * 至少兩種不同 lead 才視為 mojibake 骨架——合法文字同時出現兩種
 * 以上此類高位且都落在缺口結構上，機率極低。
 *
 * @param {readonly number[]} bytes - byte 陣列
 * @returns {number} 相異 lead-like byte 數
 */
export declare function _countDistinctLeadLike(bytes: readonly number[]): number;
/**
 * 偵測 byte 陣列中的缺口（被剝除的續接位元組）。
 *
 * 遇到下列情形回傳 null（非本機制可安全處理的結構）：
 *   - 續接位元組獨立出現（0x80–0xC1）：非剝除特徵
 *   - 二元組（C2–DF）lead 的續接位元組缺失：原文該處本就是 C1 控制字元，
 *     還原無意義且會誤傷合法 Latin 文字（如 café → caf間）
 *   - 存活續接位元組超過所需：結構異常
 *
 * @param {readonly number[]} bytes - byte 陣列
 * @returns {IGap[] | null} 缺口清單；無可處理結構時為 null
 */
export declare function _detectGaps(bytes: readonly number[]): IGap[] | null;
/**
 * 單一字元評分（缺口候選排序）。
 *
 * 平/片假名與 CJK 標點幾乎必為正當文字給高分；常用漢字 4 分、
 * 其餘 CJK 1 分；通用標點（U+2000–U+206F）中高頻者 3 分、其餘 1 分
 * ——英文彎引號 / 破折號類 mojibake 依此優先選中原字。
 * 非目標範圍（Latin 高位、私用區、其他符號）給 0，由呼叫端過濾——
 * 這道過濾同時擋掉以 0xEF 等 lead 開頭的私用區填充
 * （合法法文 héroïque 之類的誤傷防線）。
 *
 * @param {number} cp - 候選字元 codepoint
 * @returns {number} 分數；0 表示拒絕
 */
export declare function _charScore(cp: number): number;
/**
 * 由 lead + 續接位元組算 codepoint（3-byte / 4-byte 序列）。
 *
 * @param {number} lead - UTF-8 lead byte
 * @param {readonly number[]} conts - 全部續接位元組
 * @returns {number} codepoint
 */
export declare function _codePointFrom(lead: number, conts: readonly number[]): number;
/**
 * 由 codepoint 反推三元組續接位元組（詞救援候選用；詞彙皆為 BMP 常用字）。
 *
 * @param {number} cp - codepoint（0x800–0xFFFF）
 * @returns {readonly number[] | null} 續接位元組；非三元組範圍時為 null
 */
export declare function _contsFromCodePoint(cp: number): readonly number[] | null;
/**
 * 由 codepoint 反推 lead byte。
 *
 * @param {number} cp - codepoint
 * @returns {number} lead byte
 */
export declare function _leadFromCodePoint(cp: number): number;
/**
 * 詞候選續接位元組是否與缺口相容：lead 相符且存活錨點皆在其中（保序）。
 *
 * @param {IGap} gap - 缺口
 * @param {number} cp - 詞字元 codepoint
 * @returns {boolean}
 */
export declare function _wordCandidateFits(gap: IGap, cp: number): boolean;
/**
 * 枚舉單一缺口的基礎候選：存活續接位元組在槽位中的所有擺放方式 ×
 * 缺失槽位以 0x80–0x9F 全值填充，解出 codepoint 後以 charScore 過濾排序。
 *
 * @param {IGap} gap - 缺口
 * @returns {IGapCandidate[]} 截斷至 MAX_CANDIDATES_PER_GAP 的候選（依分數降冪）
 */
export declare function _enumerateGapCandidates(gap: IGap): IGapCandidate[];
/**
 * 計入指定缺口數的 byte 陣列（缺口 0..uptoGap-1 已以 fills 填補）。
 *
 * 評分用前綴必須在第 uptoGap 個缺口處截斷（includeTail=false）：其後
 * 尚未填補的截斷序列會使 UTF-8 嚴格解碼失敗；最終結果才帶上尾段
 * （includeTail=true，此時所有缺口已填滿）。
 *
 * @param {readonly number[]} bytes - 原 byte 陣列
 * @param {readonly IGap[]} gaps - 缺口清單
 * @param {readonly (readonly number[])[]} fills - 各缺口選定的續接位元組
 * @param {number} uptoGap - 填補至第幾個缺口（不含）
 * @param {boolean} includeTail - 是否接上 uptoGap 之後的原始尾段
 * @returns {number[]} byte 陣列
 */
export declare function _buildPrefixBytes(bytes: readonly number[], gaps: readonly IGap[], fills: readonly (readonly number[])[], uptoGap: number, includeTail: boolean): number[];
/**
 * 文本命中常用詞的次數（非重疊掃描）。
 *
 * @param {string} text - 待評分文本
 * @returns {number} 命中次數
 */
export declare function _wordBonus(text: string): number;
/**
 * 以 beam search 重建全部缺口。
 *
 * 逐缺口擴展假設並以「候選字元分數 + 前綴詞命中」評分，保留前
 * BEAM_WIDTH 名；詞典救援候選（可拼出已知詞的字元）自帶加分，
 * 使其優先於同分的普通常用字。最終文本須通過 repairGapFilledOutput
 * 的接受檢核才會被採用。
 *
 * @param {readonly number[]} bytes - byte 陣列
 * @param {readonly IGap[]} gaps - 缺口清單
 * @param {boolean} hadMarker - 輸出行是否帶 C1 / Windows-1252 專屬符號等鏈證據（B 層接受閘用）
 * @returns {string | null} 還原文本；任一缺口無候選或解碼失敗時為 null
 */
export declare function _beamFill(bytes: readonly number[], gaps: readonly IGap[], hadMarker: boolean): string | null;
/**
 * 詞典救援：run 內每個已知詞依各偏移嘗試嵌入，與缺口 lead/錨點相容的
 * 字元以加權候選注入該缺口，使「多個全缺缺口恰組成已知詞」（如聊天
 * 傳輸後僅剩 â 級殘骸的文字）得以被選中。
 *
 * @param {readonly IGap[]} gaps - 缺口清單
 * @param {IGapCandidate[][]} perGap - 各缺口候選（原地注入）
 * @param {number} runStart - run 起始缺口索引（含）
 * @param {number} runEnd - run 結束缺口索引（不含）
 * @returns {void}
 */
export declare function _applyWordRescue(gaps: readonly IGap[], perGap: IGapCandidate[][], runStart: number, runEnd: number): void;
/**
 * gap-fill 結果的接受檢核（兩層閘）。
 *
 *   A 層（日中重建）：輸出含 ≥2 個假名/CJK 且命中至少一個常用詞——
 *     詞典是「重建正確」的硬證據，缺一不可。
 *   B 層（純標點/英文重建）：輸出行本身帶 C1 鏈證據（原始 C1 控制
 *     字元仍在）才放行——英文彎引號類 mojibake 沒有詞典可依，但
 *     C1 的存在本身就是誤讀鏈的直接證明；無 C1 的合法外文
 *     （法文、芬蘭文）在此被擋下。
 *
 * 兩層共同要求：輸出嚴格解碼成功（呼叫端保證）且不含殘留 C1。
 *
 * @param {string} output - 還原候選文本
 * @param {boolean} hadMarker - 輸出行是否帶 C1 / Windows-1252 專屬符號等鏈證據
 * @returns {boolean} 是否採用
 */
export declare function _repairGapFilledOutput(output: string, hadMarker: boolean): boolean;
/**
 * round-trip 結果的接受檢核。
 *
 * 純 Latin 高位文字（合法法文等）誤傷防線：解碼結果須消除誤讀鏈證據
 * 字元（C1 / Windows-1252 專屬符號 / mojibake 形態的 Ã），或解出
 * CJK/假名——否則視為巧合的合法文字，不動。
 *
 * @param {string} input - 原文字
 * @param {string} output - 嚴格解碼結果
 * @returns {boolean} 是否採用
 */
export declare function _repairRoundTripOutput(input: string, output: string): boolean;
/** 行 / 段級還原結果（內部使用） */
export type IRepairLineResult = {
	text: string;
	method: EnumMojibakeRepairMethod;
	confidence: number;
};
/**
 * 單一「全可對映字串段」的還原嘗試：round-trip → gap-fill。
 *
 * @param {string} segment - 段內每字皆可對映為誤讀前 byte
 * @returns {IRepairLineResult | null} 還原結果；未還原時為 null
 */
export declare function _repairRunSegment(segment: string): IRepairLineResult | null;
/**
 * 以 cp1252 專屬符號（codepoint > 0xFF 且可對映者）為界細分後逐一還原。
 *
 * 整段反向對映會把「正確文字中的符號」（如正確的 em-dash —）轉成孤立
 * byte 破壞解碼，使整段失敗；細分後符號原樣保留，只剩 Latin/ASCII/C1
 * 子段參與還原，正確文字與 mojibake 殘骸得以共存於同一行。
 * 僅在整段嘗試失敗後才細分，故 â€™ 類由符號構成的 mojibake 仍在上一層
 * 被完整 round-trip，不會被誤拆。
 *
 * @param {string} segment - 已確認為全可對映但還原失敗的字串段
 * @returns {IRepairLineResult | null} 還原結果；細分後仍無一段可還原時為 null
 */
export declare function _repairRunWithSpecialBoundaries(segment: string): IRepairLineResult | null;
/**
 * 單行 mojibake 還原。
 *
 * 快路：整行單段一次還原（單純 mojibake 的常態）。
 * 混合路：整行失敗時，以不可對映字元（真 Unicode 文字）切段逐段還原，
 * 仍失敗的段再以 cp1252 專屬符號細分——正確文字（漢字、符號）原樣
 * 保留，只有 Latin/ASCII/C1 殘骸段被修復。
 *
 * @param {string} line - 單行文字
 * @returns {IRepairLineResult | null} 還原結果；未還原時為 null（由呼叫端決定保留原樣）
 */
export declare function _repairLine(line: string): IRepairLineResult | null;
/**
 * mojibake 還原：把「被以 Latin-1 / Windows-1252 誤讀的 UTF-8 文字」
 * 盡可能還原為原始文字。
 *
 * 誤讀鏈：原文 → UTF-8 bytes → 以 Latin-1 或 Windows-1252 解讀成字串。
 * 逐行處理（\n 為結構，不受影響）；行內整行還原失敗時，再以真 Unicode /
 * cp1252 專屬符號分段，正確文字原樣保留。兩級策略：
 *   1. round-trip（確定性）：bytes 俱在時反向對映再以 UTF-8 嚴格解碼，
 *      例如 cafÃ© → café、ä<0x9D>±äº¬ → 東京。
 *   2. gap-fill（推測性）：C1 續接位元組（0x80–0x9F）在傳輸中被丟棄時，
 *      以存活錨點 + 常用字/詞典重建缺口；日中重建須命中已知詞、
 *      純標點重建須輸出行帶 C1 鏈證據，否則不採用。
 *
 * 注意：
 *   - 透過剪貼簿進入應用程式的 mojibake 通常 bytes 完整，走級 1 即可精確還原；
 *     經聊天室顯示再複製的文字可能丟失更多可見度低的 bytes（不止 C1），
 *     此時僅剩的資訊不足以還原，工具會保守地不動。
 *   - 未確認的輸入不會被修改；呼叫端可依 confidence 決定是否採用或提示使用者。
 *
 * @param {string} text - 疑似 mojibake 的文字
 * @returns {IMojibakeRepairResult} 還原結果（未還原時 text 為原文字、method 為 none）
 */
export declare function repairMojibake(text: string): IMojibakeRepairResult;

export {
	repairMojibake as default,
};

export {};
