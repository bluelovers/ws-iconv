/**
 * fs-stream-sync - 檔案系統流處理工具
 * 
 * 這個模組提供了檔案系統的同步和異步流處理功能，包括讀取和寫入流。
 * 
 * @module fs-stream-sync
 * @author bluelovers
 */

import { PathLike } from "fs";
import fs from 'fs';
import { IFsReadStreamOptions, IFsStreamData, IFsStreamState, IFsWriteStreamOptions } from './lib/interface';
import { getFsStreamData, SYM_FS_STREAM_DATA } from './lib/internal';

/**
 * 讀取流類 - 擴展 Node.js 的 ReadStream
 * 
 * 這個類提供了檔案讀取流的功能，支援同步和異步操作。
 * 
 * @class ReadStream
 * @extends fs.ReadStream
 */
// @ts-ignore
export class ReadStream extends fs.ReadStream
{
	/** 是否自動關閉 */
	protected autoClose: boolean

	/** 檔案標誌 */
	protected flags: string

	/** 檔案描述符 */
	fd: number

	/** 檔案模式 */
	protected mode: number

	/** 當前位置 */
	protected pos: number

	/** 是否已關閉 */
	protected closed: boolean

	/** 是否已銷毀 */
	protected destroyed: boolean

	/** 可寫狀態 */
	protected _writableState: IFsStreamState

	/** 可讀狀態 */
	protected _readableState: IFsStreamState

	/** 流資料 */
	protected [SYM_FS_STREAM_DATA]: IFsStreamData

	/** 結束位置 */
	protected end: number

	/**
	 * 構造函數
	 * 
	 * @param {PathLike} path 檔案路徑
	 * @param {string | IFsWriteStreamOptions} [options] 選項
	 */
	constructor(path: PathLike, options?: string | IFsWriteStreamOptions)
	{
		// 調用父類構造函數
		// @ts-ignore
		super(path, options)

		// 初始化流資料
		getFsStreamData(this)
	}

	/** 創建函數別名 */
	static get create()
	{
		return createReadStream
	}

	/**
	 * 打開流
	 * 
	 * 這個函數會打開檔案流，並設置相關狀態。
	 */
	open()
	{
		if (typeof getFsStreamData(this) !== 'boolean')
		{
			this[SYM_FS_STREAM_DATA].opened = true
			// 調用父類的 open 方法
			// @ts-ignore
			fs.ReadStream.prototype.open.call(this)
		}
	}
}

/**
 * 創建讀取流
 * 
 * 這個函數會創建一個 ReadStream 實例。
 * 
 * @param {PathLike} path 檔案路徑
 * @param {string | IFsReadStreamOptions} [options] 選項
 * @returns {ReadStream} 讀取流實例
 */
export function createReadStream(path: PathLike, options?: string | IFsReadStreamOptions)
{
	return new ReadStream(path, options)
}

/** 預設導出 - ReadStream 類 */
export default ReadStream

