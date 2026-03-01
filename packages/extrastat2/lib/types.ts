/**
 * 擴展檔案狀態類型定義
 * Extended file status type definitions
 *
 * 定義了擴展檔案狀態相關的介面和列舉
 * Defines interfaces and enums for extended file status
 */

import { ParsedPath } from "path";
import * as resolvers from './resolvers';
import { Stats, Dirent } from 'fs';
import { Mode } from 'stat-mode';
import { ITSPartialRecord } from 'ts-type';

/**
 * 擴展狀態介面
 * Extended status interface
 *
 * 包含基本檔案資訊：名稱、路徑、MIME 類型
 * Contains basic file info: name, path, MIME type
 */
export interface IStatsPlus
{
	/**
	 * 檔案名稱 / File name
	 */
	name: string,
	/**
	 * 完整路徑 / Full pathname
	 */
	pathname: string,
	/**
	 * MIME 類型 / MIME type
	 */
	mimetype: string,
}

/**
 * 目錄項目列表介面
 * Directory entry list interface
 *
 * 結合 Dirent 和 IStatsPlus 屬性
 * Combines Dirent and IStatsPlus properties
 */
export interface IList extends Dirent, IStatsPlus
{

}

/**
 * 選項介面
 * Options interface
 *
 * 用於啟用/停用特定的解析器
 * Used to enable/disable specific resolvers
 */
export interface IOptions extends ITSPartialRecord<(keyof typeof resolvers) | keyof IStatsPlus, boolean>
{

}

/**
 * 擴展檔案狀態介面
 * Extended file status interface
 *
 * 擴展 Node.js Stats 物件，提供額外的檔案資訊
 * Extends Node.js Stats object with additional file information
 */
export interface IStatsExtra extends Stats, Partial<IStatsPlus>
{
	/**
	 * 檔案名稱 / File name
	 */
	name?: string,
	/**
	 * 完整路徑 / Full pathname
	 */
	pathname?: string,
	/**
	 * 子項目列表 / Children list
	 */
	children?: IList[],
	/**
	 * 同層項目列表 / Siblings list
	 */
	siblings?: IList[],

	/**
	 * 權限模式物件 / Permission mode object
	 */
	rwx?: Mode

	/**
	 * 解析後的路徑物件 / Parsed path object
	 */
	parsed: ParsedPath,

	/**
	 * 父目錄列表 / Parent directories list
	 */
	parents?: string[],
}

/**
 * 解析器函式介面
 * Resolver function interface
 */
export interface IResolver
{
	/**
	 * 解析函數
	 * Resolver function
	 *
	 * @param {ParsedPath} parsedPath - 解析後的路徑 / Parsed path
	 * @param {IStatsExtra} stat - 擴展狀態物件 / Extended status object
	 * @returns {IStatsExtra} 更新後的狀態物件 / Updated status object
	 */
	(parsedPath: ParsedPath, stat: IStatsExtra): IStatsExtra
}

/**
 * MIME 類型擴展列舉
 * MIME type extended enum
 *
 * 特殊檔案類型的 MIME 類型定義
 * MIME type definitions for special file types
 */
export const enum EnumMimetypePlus
{
	/**
	 * 目錄 / Directory
	 */
	directory = 'application/directory',
	/**
	 * 先進先出管道 / FIFO pipe
	 */
	fifo = 'application/FIFO',
	/**
	 * Socket 檔案 / Socket file
	 */
	socket = 'application/socket',
	/**
	 * 未知類型 / Unknown type
	 */
	unknown = 'application/unknown',
}
