import { PathLike } from 'fs';

/**
 * 讀取選項介面
 * Read options interface
 */
export interface IOptions {
	/**
	 * 每次讀取的區塊大小（位元組）/ Read chunk size in bytes
	 * @default 1024
	 */
	readChunk?: number;
	/**
	 * 換行字元設定 / New line character configuration
	 * @default EnumNewLineCharacter.LF (0x0a)
	 */
	newLineCharacter?: INewLineCharacter;
}
/**
 * 檔案路徑類型（字串路徑或檔案描述符）
 * File path type (string path or file descriptor)
 */
export type IPathLike = PathLike | number;
/**
 * 換行字元類型（支援多種格式）
 * New line character type (supports multiple formats)
 */
export type INewLineCharacter = string | number | EnumNewLineCharacter | (string | number | EnumNewLineCharacter)[] | Buffer;
/**
 * 處理換行字元選項，將各種輸入格式轉換為位元組陣列
 * Process new line character option, converting various input formats to byte array
 *
 * @param {INewLineCharacter} [newLineCharacter] - 換行字元設定 / New line character configuration
 * @returns {number[]} 換行字元的位元組陣列 / Byte array of new line characters
 */
export declare function handleOptionNewLineCharacter(newLineCharacter?: INewLineCharacter): number[];
/**
 * 換行字元列舉
 * New line character enumeration
 */
export declare const enum EnumNewLineCharacter {
	/** 換行 (Line Feed) - \n */
	LF = 10,
	/** 回車 (Carriage Return) - \r */
	CR = 13
}
/**
 * 逐行讀取器類別
 * Line by line reader class
 *
 * 使用同步方式逐行讀取檔案內容，適合處理大型檔案
 * Reads file content line by line synchronously, suitable for large files
 */
export declare class LineByLine {
	#private;
	/**
	 * 建立逐行讀取器實例
	 * Create a line by line reader instance
	 *
	 * @param {IPathLike} file - 檔案路徑或檔案描述符 / File path or file descriptor
	 * @param {IOptions} [options] - 讀取選項 / Read options
	 */
	constructor(file: IPathLike, options?: IOptions);
	/**
	 * 開啟檔案並取得檔案描述符
	 * Open file and obtain file descriptor
	 * @protected
	 */
	protected _open(): void;
	/**
	 * 取得檔案路徑或描述符
	 * Get file path or descriptor
	 */
	get file(): IPathLike;
	/**
	 * 取得檔案描述符
	 * Get file descriptor
	 */
	get fd(): number;
	/**
	 * 取得讀取選項
	 * Get read options
	 */
	get options(): IOptions;
	/**
	 * 取得當前檔案讀取位置
	 * Get current file read position
	 */
	get fdPosition(): number;
	/**
	 * 取得換行字元 Buffer
	 * Get new line character buffer
	 */
	get newLineCharacter(): Buffer<ArrayBufferLike>;
	/**
	 * 檢查是否已到達檔案結尾
	 * Check if end of file is reached
	 */
	get eofReached(): boolean;
	/**
	 * 取得當前行號（從 0 開始）
	 * Get current line number (0-based)
	 */
	get lineNumber(): number;
	/**
	 * 重置讀取器狀態，從頭開始讀取
	 * Reset reader state to start from the beginning
	 */
	reset(): void;
	/**
	 * 關閉檔案描述符
	 * Close file descriptor
	 */
	close(): void;
	/**
	 * 從 Buffer 中提取行資料
	 * Extract line data from buffer
	 *
	 * @param {Buffer} buffer - 原始 Buffer 資料 / Raw buffer data
	 * @returns {Buffer[]} 分割後的行資料陣列 / Array of line data buffers
	 * @protected
	 */
	protected _extractLines(buffer: Buffer): Buffer<ArrayBufferLike>[];
	/**
	 * 讀取一個區塊的資料並解析出行資料
	 * Read a chunk of data and parse line data
	 *
	 * @param {Buffer} [lineLeftovers] - 上一區塊剩餘的未完整行資料 / Incomplete line data from previous chunk
	 * @returns {number} 實際讀取的位元組數 / Number of bytes actually read
	 * @protected
	 */
	protected _readChunk(lineLeftovers?: Buffer): number;
	/**
	 * 讀取下一行資料
	 * Read next line data
	 *
	 * @returns {Buffer | undefined} 行資料 Buffer，若已到結尾則回傳 undefined / Line data buffer, returns undefined if end is reached
	 */
	next(): Buffer<ArrayBufferLike>;
	/**
	 * 產生器函式，迭代讀取所有行
	 * Generator function to iterate through all lines
	 *
	 * @returns {Generator<Buffer>} 行資料產生器 / Line data generator
	 */
	generator(): Generator<Buffer<ArrayBufferLike>, void, unknown>;
	/**
	 * 靜態產生器函式，建立實例並迭代讀取所有行
	 * Static generator function to create instance and iterate through all lines
	 *
	 * @param {IPathLike} file - 檔案路徑或檔案描述符 / File path or file descriptor
	 * @param {IOptions} [options] - 讀取選項 / Read options
	 * @returns {Generator<Buffer>} 行資料產生器 / Line data generator
	 */
	static generator(file: IPathLike, options?: IOptions): Generator<Buffer<ArrayBufferLike>, void, unknown>;
}

export {
	LineByLine as default,
};

export {};
