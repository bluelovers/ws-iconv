/**
 * 檔案系統流介面定義
 * File System Stream Interface Definitions
 *
 * 定義了檔案讀寫流所需的類型與介面
 * Defines types and interfaces for file read/write streams
 */
export type { PathLike } from 'fs';
/**
 * 檔案路徑類型 - 支援字串或 Buffer
 * File path type - supports string or Buffer
 */
export type IFsPath = string | Buffer;
/**
 * 檔案流基礎選項介面
 * File stream base options interface
 */
export interface IFsStreamOptions {
    /**
     * 檔案開啟標誌 / File open flags
     * @example 'r' - 讀取, 'w' - 寫入, 'a' - 追加
     */
    flags?: string;
    /**
     * 編碼格式 / Encoding format
     * @default null
     */
    encoding?: string;
    /**
     * 檔案描述符 / File descriptor
     * @default null
     */
    fd?: number;
    /**
     * 檔案權限模式 / File permission mode
     * @default 0o666
     */
    mode?: number;
    /**
     * 是否自動關閉 / Auto close flag
     * @default true
     */
    autoClose?: boolean;
    /**
     * 開始位置（位元組）/ Start position in bytes
     */
    start?: number;
}
/**
 * 讀取流選項介面
 * Read stream options interface
 */
export interface IFsReadStreamOptions extends IFsStreamOptions {
    /**
     * 結束位置（位元組）/ End position in bytes
     * @default Infinity
     */
    end?: number;
    /**
     * 高水位線（內部緩衝區大小）/ High water mark (internal buffer size)
     * @default 64 * 1024
     */
    highWaterMark?: number;
}
/**
 * 寫入流選項類型
 * Write stream options type
 */
export type IFsWriteStreamOptions = IFsStreamOptions;
/**
 * 流狀態介面
 * Stream state interface
 */
export interface IFsStreamState {
    /**
     * 是否已銷毀 / Whether stream is destroyed
     */
    destroyed: boolean;
    /**
     * 是否為同步模式 / Whether in sync mode
     */
    sync: boolean;
}
/**
 * 檔案流介面
 * File stream interface
 */
export interface IFsStream {
    /**
     * 自動關閉標誌 / Auto close flag
     */
    autoClose: boolean;
    /**
     * 檔案開啟標誌 / File open flags
     */
    flags: string;
    /**
     * 檔案描述符 / File descriptor
     */
    fd: number;
    /**
     * 檔案權限模式 / File permission mode
     */
    mode: number;
    /**
     * 當前位置 / Current position
     */
    pos: number;
    /**
     * 是否已關閉 / Whether closed
     */
    closed: boolean;
    /**
     * 是否已銷毀 / Whether destroyed
     */
    destroyed: boolean;
    /**
     * 可寫狀態 / Writable state
     */
    _writableState: IFsStreamState;
    /**
     * 可讀狀態 / Readable state
     */
    _readableState: IFsStreamState;
}
/**
 * 流資料介面
 * Stream data interface
 */
export interface IFsStreamData {
    /**
     * 是否已開啟 / Whether opened
     */
    opened?: boolean;
}
