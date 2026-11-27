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
    label: string
    /** 顯示名稱 */
    name: string
}

/**
 * 一條候選結果：情境描述與對應文字。
 */
export interface IMojibakeCandidate {
    /** 情境描述，例如「以 Big5 存檔，用 UTF-8 開啟」 */
    label: string
    /** 該情境下的文字結果 */
    text: string
}

/** 參與互轉的編碼清單（順序決定候選的排列次序） */
export const MOJIBAKE_ENCODINGS: readonly IMojibakeEncoding[] = [
    { label: 'utf-8', name: 'UTF-8' },
    { label: 'big5', name: 'Big5（繁中 Windows）' },
    { label: 'gbk', name: 'GBK（簡中 Windows）' },
    { label: 'shift_jis', name: 'Shift_JIS（日文）' },
    { label: 'euc-kr', name: 'EUC-KR（韓文）' },
    { label: 'windows-1252', name: 'Latin-1／Windows-1252' },
]

/** 單一編碼的解碼對映表快取；value 為 null 代表該標籤無法建表（環境不支援） */
const decodeTableCache = new Map<string, Map<string, number[]> | null>()

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
export function getDecodeTable(label: string): ReadonlyMap<string, number[]> | null {
    const cached = decodeTableCache.get(label)
    if (cached !== undefined) return cached

    let table: Map<string, number[]> | null
    try {
        const dec = new TextDecoder(label)
        table = new Map<string, number[]>()
        for (let i = 0; i < 256; i++) {
            const s = dec.decode(new Uint8Array([i]))
            if (s.length === 1 && s !== '\ufffd' && !table.has(s)) table.set(s, [i])
        }
        if (label !== 'windows-1252') {
            for (let hi = 0x81; hi <= 0xFE; hi++) {
                for (let lo = 0x40; lo <= 0xFE; lo++) {
                    const s = dec.decode(new Uint8Array([hi, lo]))
                    if (s.length === 1 && s !== '\ufffd' && !table.has(s)) table.set(s, [hi, lo])
                }
            }
        }
    } catch {
        table = null
    }
    decodeTableCache.set(label, table)
    return table
}

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
export function encodeToBytes(text: string, label: string): number[] | null {
    if (label === 'utf-8') return Array.from(new TextEncoder().encode(text))

    const table = getDecodeTable(label)
    if (table === null) return null

    const bytes: number[] = []
    for (const ch of text) {
        const seq = table.get(ch)
        if (seq === undefined) return null
        bytes.push(...seq)
    }
    return bytes
}

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
export function decodeBytes(bytes: readonly number[], label: string): string {
    return new TextDecoder(label).decode(Uint8Array.from(bytes))
}

/**
 * 正向產生：列出「以 A 編碼存檔、被以 B 編碼開啟」會看到的亂碼。
 *
 * 編碼相同的組合不具誤讀意義，直接略過；轉換後與原文相同者亦不列出。
 *
 * @param text - 正常文字
 * @returns 候選清單（僅列出與原文不同者）
 */
export function generateMojibake(text: string): IMojibakeCandidate[] {
    const candidates: IMojibakeCandidate[] = []

    for (const a of MOJIBAKE_ENCODINGS) {
        for (const b of MOJIBAKE_ENCODINGS) {
            /** 同編碼互轉等於原樣輸出，不構成亂碼情境 */
            if (a.label === b.label) continue
            const bytes = encodeToBytes(text, a.label)
            if (bytes === null) continue
            const result = decodeBytes(bytes, b.label)
            if (result !== text) candidates.push({ label: `以 ${a.name} 存檔，用 ${b.name} 開啟`, text: result })
        }
    }
    return candidates
}

/**
 * 反向還原：枚舉所有編碼組合，回傳最可能讀得通的前若干列。
 *
 * 過濾含替代字元（解碼失敗）與與原文相同（無資訊）的組合，其餘依輸出
 * 中的漢字數量降冪排序——亂碼還原的正確結果通常是唯一含大量漢字的
 * 那一列。回傳候選而非單一答案，交由呼叫端挑選。
 *
 * @param text - 疑似亂碼的文字
 * @param limit - 最多回傳列數，預設 8
 * @returns 依可信度排序的候選清單
 */
export function repairMojibakeByEncodings(text: string, limit = 8): IMojibakeCandidate[] {
    const scored: { cjk: number; candidate: IMojibakeCandidate }[] = []

    for (const b of MOJIBAKE_ENCODINGS) {
        for (const a of MOJIBAKE_ENCODINGS) {
            if (a.label === b.label) continue
            const bytes = encodeToBytes(text, b.label)
            if (bytes === null) continue
            const result = decodeBytes(bytes, a.label)
            /** 含 U+FFFD 表示該組合解碼失敗；與原文相同則沒有還原資訊 */
            if (result.includes('\ufffd') || result === text) continue
            scored.push({
                cjk: (result.match(/[\u4e00-\u9fff]/g) || []).length,
                candidate: { label: `原本是 ${a.name}，被誤當 ${b.name} 讀取`, text: result },
            })
        }
    }

    /** 漢字最多的組合最可能是正確還原 */
    scored.sort((x, y) => y.cjk - x.cjk)
    return scored.slice(0, limit).map(item => item.candidate)
}
