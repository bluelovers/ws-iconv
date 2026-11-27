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
/**
 * 跨編碼 (cross-encoding) 的 mojibake 產生與還原：以 WHATWG 編碼標籤
 * 將同一段文字在 6 種編碼之間兩兩互轉，模擬「用 A 編碼存檔、被以 B 編碼
 * 開啟」造成的亂碼，並反向枚舉最可能的還原結果。
 *
 * 與 repairMojibake（專注 UTF-8 被 Latin-1 / Windows-1252 誤讀的還原）互補：
 * 本檔回傳的是候選清單而非單一答案，由呼叫端決定採用哪一列。
 * 依賴執行環境的 TextDecoder（Node 與瀏覽器皆內建），不接觸 DOM。
 */
/**
 * 參與互轉的編碼組合：WHATWG 編碼標籤與其顯示名稱。
 */
export interface IMojibakeEncoding {
	/** WHATWG 編碼標籤，TextDecoder 可直接接受 */
	label: string;
	/** 顯示名稱 */
	name: string;
}
/**
 * 一條候選結果：情境描述與對應文字。
 */
export interface IMojibakeCandidate {
	/** 情境描述，例如「以 Big5 存檔，用 UTF-8 開啟」 */
	label: string;
	/** 該情境下的文字結果 */
	text: string;
}
/** 參與互轉的編碼清單（順序決定候選的排列次序） */
export declare const MOJIBAKE_ENCODINGS: readonly IMojibakeEncoding[];
/**
 * 建立（並快取）「單一字元 → 誤讀前 byte」的解碼對映表。
 *
 * 表由 TextDecoder 反推而來：逐一餵入 1 byte 與 2 byte 序列，能解出單一
 * 可見字元者即為該編碼的合法組成。替代字元（U+FFFD）代表序列無效，
 * 不列入表中；windows-1252 為單 byte 編碼，不嘗試二元組。
 *
 * @param label - WHATWG 編碼標籤
 * @returns 解碼對映表；標籤不支援時為 null
 */
export declare function getDecodeTable(label: string): ReadonlyMap<string, number[]> | null;
/**
 * 文字 → 指定編碼的 byte 陣列。
 *
 * UTF-8 直接由 TextEncoder 產生；其餘編碼須逐一查表，任一字元無法對映
 * 即整筆放棄（例如 Big5 對不上日文假名）。
 *
 * @param text - 待編碼文字
 * @param label - WHATWG 編碼標籤
 * @returns byte 陣列；有字元無法編碼時為 null
 */
export declare function encodeToBytes(text: string, label: string): number[] | null;
/**
 * byte 陣列 → 以指定編碼解讀的文字。
 *
 * 與原 Tool 行為一致：無效序列以替代字元（U+FFFD）呈現，由呼叫端
 * 決定是否視為失敗。
 *
 * @param bytes - 待解碼 byte 陣列
 * @param label - WHATWG 編碼標籤
 * @returns 解讀結果
 */
export declare function decodeBytes(bytes: readonly number[], label: string): string;
/**
 * 正向產生：列出「以 A 編碼存檔、被以 B 編碼開啟」會看到的亂碼。
 *
 * 與原文相同者不列出。
 *
 * @param text - 正常文字
 * @returns 候選清單（僅列出與原文不同者）
 */
export declare function generateMojibake(text: string): IMojibakeCandidate[];
/**
 * 反向還原：枚舉所有編碼組合，回傳最可能讀得通的前若干列。
 *
 * 過濾含替代字元（解碼失敗）的組合，其餘依輸出中的漢字數量降冪排序——亂碼還原的正確結果通常是唯一含大量漢字的
 * 那一列。回傳候選而非單一答案，交由呼叫端挑選。
 *
 * @param text - 疑似亂碼的文字
 * @param limit - 最多回傳列數，預設 8
 * @returns 依可信度排序的候選清單
 */
export declare function repairMojibakeByEncodings(text: string, limit?: number): IMojibakeCandidate[];

export {
	repairMojibake as default,
};

export {};
