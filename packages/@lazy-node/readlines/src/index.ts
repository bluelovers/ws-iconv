/**
 * 逐行讀取檔案模組
 * Line by line file reading module
 *
 * 提供同步方式逐行讀取檔案，無需將整個檔案載入記憶體
 * Provides synchronous line-by-line file reading without loading the entire file into memory
 *
 * Created by user on 2020/5/29.
 */

export * from './types';
export * from './util';
import { IPathLike, IOptions } from './types';
import { readSync, closeSync, openSync } from 'fs';
import {
	handleOptionNewLineCharacter,
} from './util';
import {
	bufferEndWithByBuffer,
	bufferStripEndWithByBuffer,
	splitBufferByBuffer,
} from '@lazy-node/util-buffer';

/**
 * 換行字元列舉
 * New line character enumeration
 */
export const enum EnumNewLineCharacter
{
	/** 換行 (Line Feed) - \n */
	LF = 0x0a,
	/** 回車 (Carriage Return) - \r */
	CR = 0x0d,
}

/**
 * 逐行讀取器類別
 * Line by line reader class
 *
 * 使用同步方式逐行讀取檔案內容，適合處理大型檔案
 * Reads file content line by line synchronously, suitable for large files
 */
export class LineByLine
{
	/** 檔案路徑或檔案描述符 / File path or file descriptor */
	#file: IPathLike;
	/** 檔案描述符 / File descriptor */
	#fd: number;
	/** 讀取選項 / Read options */
	#options: IOptions;
	/** 換行字元 Buffer / New line character buffer */
	readonly #newLineCharacter: Buffer;
	/** 是否已到達檔案結尾 / Whether end of file is reached */
	#eofReached: boolean;
	/** 行快取陣列 / Line cache array */
	#linesCache: Buffer[];
	/** 當前檔案讀取位置 / Current file read position */
	#fdPosition: number;
	/** 每次讀取的區塊大小 / Chunk size for each read operation */
	#readChunk: number;
	/** 當前行號（從 0 開始）/ Current line number (0-based) */
	#lineNumber: number = -1;

	/**
	 * 建立逐行讀取器實例
	 * Create a line by line reader instance
	 *
	 * @param {IPathLike} file - 檔案路徑或檔案描述符 / File path or file descriptor
	 * @param {IOptions} [options] - 讀取選項 / Read options
	 */
	constructor(file: IPathLike, options?: IOptions)
	{
		let { readChunk, newLineCharacter } = (options = options || {});

		// 預設區塊大小為 1024 位元組 / Default chunk size is 1024 bytes
		if (!readChunk) readChunk = 1024;

		this.#file = file;
		this.#options = options;

		// 處理換行字元選項 / Process new line character option
		this.#newLineCharacter = Buffer.from(handleOptionNewLineCharacter(newLineCharacter));
		this.#readChunk = readChunk;

		// 驗證換行字元長度 / Validate new line character length
		if (this.#newLineCharacter.length <= 0)
		{
			throw new TypeError(`newLineCharacter should have length > 0`)
		}

		this._open();
		this.reset();
	}

	/**
	 * 開啟檔案並取得檔案描述符
	 * Open file and obtain file descriptor
	 * @protected
	 */
	protected _open()
	{
		// 若傳入的是數字，視為已開啟的檔案描述符 / If number is passed, treat as already opened file descriptor
		if (typeof this.#file === 'number')
		{
			this.#fd = this.#file;
		}
		else
		{
			// 以唯讀模式開啟檔案 / Open file in read-only mode
			this.#fd = openSync(this.#file, 'r');
		}
	}

	/**
	 * 取得檔案路徑或描述符
	 * Get file path or descriptor
	 */
	get file()
	{
		return this.#file
	}

	/**
	 * 取得檔案描述符
	 * Get file descriptor
	 */
	get fd()
	{
		return this.#fd
	}

	/**
	 * 取得讀取選項
	 * Get read options
	 */
	get options()
	{
		return this.#options
	}

	/**
	 * 取得當前檔案讀取位置
	 * Get current file read position
	 */
	get fdPosition()
	{
		return this.#fdPosition
	}

	/**
	 * 取得換行字元 Buffer
	 * Get new line character buffer
	 */
	get newLineCharacter()
	{
		return this.#newLineCharacter
	}

	/**
	 * 檢查是否已到達檔案結尾
	 * Check if end of file is reached
	 */
	get eofReached()
	{
		return this.#eofReached
	}

	/**
	 * 取得當前行號（從 0 開始）
	 * Get current line number (0-based)
	 */
	get lineNumber()
	{
		return this.#lineNumber
	}

	/**
	 * 重置讀取器狀態，從頭開始讀取
	 * Reset reader state to start from the beginning
	 */
	reset()
	{
		this.#eofReached = false;
		this.#linesCache = [];
		this.#fdPosition = 0;
		this.#lineNumber = -1;
	}

	/**
	 * 關閉檔案描述符
	 * Close file descriptor
	 */
	close()
	{
		this.#fd && closeSync(this.#fd);
		this.#fd = null;
	}

	/**
	 * 從 Buffer 中提取行資料
	 * Extract line data from buffer
	 *
	 * @param {Buffer} buffer - 原始 Buffer 資料 / Raw buffer data
	 * @returns {Buffer[]} 分割後的行資料陣列 / Array of line data buffers
	 * @protected
	 */
	protected _extractLines(buffer: Buffer)
	{
		return splitBufferByBuffer(buffer, this.#newLineCharacter as any)
	};

	/**
	 * 讀取一個區塊的資料並解析出行資料
	 * Read a chunk of data and parse line data
	 *
	 * @param {Buffer} [lineLeftovers] - 上一區塊剩餘的未完整行資料 / Incomplete line data from previous chunk
	 * @returns {number} 實際讀取的位元組數 / Number of bytes actually read
	 * @protected
	 */
	protected _readChunk(lineLeftovers?: Buffer)
	{
		let totalBytesRead = 0;

		let bytesRead: number;
		const buffers: Buffer[] = [];

		// 持續讀取直到找到換行字元或到達檔案結尾
		// Keep reading until new line character is found or end of file is reached
		do
		{
			const readBuffer = Buffer.alloc(this.#readChunk);

			bytesRead = readSync(this.#fd, readBuffer as any, 0, this.#readChunk, this.#fdPosition);
			totalBytesRead = totalBytesRead + bytesRead;

			this.#fdPosition = this.#fdPosition + bytesRead;

			buffers.push(readBuffer);
		}
		while (bytesRead && buffers[buffers.length - 1].indexOf(this.#newLineCharacter as any) === -1);

		// 合併所有讀取的區塊 / Concatenate all read chunks
		let bufferData = Buffer.concat(buffers as any);

		// 若讀取的位元組數小於區塊大小，表示已到達檔案結尾
		// If bytes read is less than chunk size, it means end of file is reached
		if (bytesRead < this.#readChunk)
		{
			this.#eofReached = true;
			bufferData = bufferData.slice(0, totalBytesRead);
		}

		// 將資料分割成行並加入快取 / Split data into lines and add to cache
		if (totalBytesRead)
		{
			this.#linesCache = this._extractLines(bufferData);

			// 若有上一區塊的剩餘資料，與第一行合併
			// If there is leftover data from previous chunk, concatenate with first line
			if (lineLeftovers)
			{
				this.#linesCache[0] = Buffer.concat([lineLeftovers as any, this.#linesCache[0] as any]);
			}
		}

		return totalBytesRead;
	}

	/**
	 * 讀取下一行資料
	 * Read next line data
	 *
	 * @returns {Buffer | undefined} 行資料 Buffer，若已到結尾則回傳 undefined / Line data buffer, returns undefined if end is reached
	 */
	next()
	{
		// 檢查檔案是否已關閉或已到結尾 / Check if file is closed or end is reached
		if (!this.#fd || this.#eofReached && this.#linesCache.length === 0)
		{
			return;
		}

		let line: Buffer;
		let bytesRead: number;

		// 若快取為空，先讀取一個區塊 / If cache is empty, read a chunk first
		if (!this.#linesCache.length)
		{
			bytesRead = this._readChunk();
		}

		// 從快取中取出下一行 / Get next line from cache
		if (this.#linesCache.length)
		{
			line = this.#linesCache.shift();

			// 若行結尾沒有換行字元，表示這行跨區塊，需要繼續讀取
			// If line doesn't end with new line character, it spans across chunks, need to continue reading
			if (!bufferEndWithByBuffer(line, this.#newLineCharacter))
			{
				bytesRead = this._readChunk(line);

				if (bytesRead)
				{
					line = this.#linesCache.shift();
				}
			}
		}

		// 若已到結尾且快取已空，關閉檔案 / If end is reached and cache is empty, close file
		if (this.#eofReached && this.#linesCache.length === 0)
		{
			this.close();
		}

		// 移除行結尾的換行字元 / Remove trailing new line character from line
		if (line)
		{
			line = bufferStripEndWithByBuffer(line, this.#newLineCharacter, 0 - this.#newLineCharacter.length)
		}

		this.#lineNumber++;

		return line;
	}

	/**
	 * 產生器函式，迭代讀取所有行
	 * Generator function to iterate through all lines
	 *
	 * @returns {Generator<Buffer>} 行資料產生器 / Line data generator
	 */
	* generator()
	{
		let line: Buffer;
		while (line = this.next())
		{
			yield line
		}
	}

	/**
	 * 靜態產生器函式，建立實例並迭代讀取所有行
	 * Static generator function to create instance and iterate through all lines
	 *
	 * @param {IPathLike} file - 檔案路徑或檔案描述符 / File path or file descriptor
	 * @param {IOptions} [options] - 讀取選項 / Read options
	 * @returns {Generator<Buffer>} 行資料產生器 / Line data generator
	 */
	static* generator(file: IPathLike, options?: IOptions)
	{
		const liner = new this(file, options)
		yield* liner.generator()
	}
}

// @ts-ignore
// 為 CommonJS 相容性添加屬性 / Add properties for CommonJS compatibility
if (process.env.TSDX_FORMAT !== 'esm')
{
	Object.defineProperty(LineByLine, "__esModule", { value: true });

	Object.defineProperty(LineByLine, 'LineByLine', { value: LineByLine });
	Object.defineProperty(LineByLine, 'default', { value: LineByLine });

	Object.defineProperty(LineByLine, "handleOptionNewLineCharacter", { value: handleOptionNewLineCharacter });

	// @ts-ignore
	Object.defineProperty(LineByLine, "EnumNewLineCharacter", { value: EnumNewLineCharacter });
}

export default LineByLine
