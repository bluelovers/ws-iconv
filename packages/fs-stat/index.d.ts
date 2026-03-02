/**
 * fs-stat - 檔案系統狀態檢查工具
 *
 * 這個模組提供了檔案系統狀態檢查的功能，包括檔案/目錄屬性檢查、符號連結檢查等。
 *
 * @module fs-stat
 * @author bluelovers
 */
import { Stats } from 'fs-extra';
import { BigIntStats, StatOptions, StatSyncOptions } from 'fs';
import { ITSRequireAtLeastOne } from 'ts-type/lib/type/record';
export type { Stats as IStats };
export type { Stats };
export type { BigIntStats };
/**
 * 檔案系統狀態類型
 *
 * @type {Stats | BigIntStats}
 */
export type IStatsInput = Stats | BigIntStats;
/**
 * 檔案系統狀態檢查選項
 *
 * @interface IOptions
 * @extends StatSyncOptions
 * @extends StatOptions
 */
export interface IOptions extends StatSyncOptions, StatOptions {
    /** 是否跟隨符號連結 */
    followSymlinks?: boolean;
    /**
     * @alias followSymlinks
     * @deprecated 使用 `followSymlinks`
     */
    allowSymlinks?: boolean;
}
/**
 * 檔案/目錄類型檢查選項
 *
 * @interface IOptionsIsDirectoryOrFileStat
 */
export interface IOptionsIsDirectoryOrFileStat {
    /** 只檢查目錄 */
    onlyDirectories?: boolean;
    /** 只檢查檔案 */
    onlyFiles?: boolean;
}
/**
 * 包含檔案/目錄類型檢查的選項
 *
 * @interface IOptionsWithOnlyDirectoryOrFile
 * @extends IOptions
 * @extends IOptionsIsDirectoryOrFileStat
 */
export interface IOptionsWithOnlyDirectoryOrFile extends IOptions, IOptionsIsDirectoryOrFileStat {
}
/**
 * 處理選項參數
 *
 * 這個內部函數會處理選項參數，設置預設值並檢查參數有效性。
 *
 * @template T 選項類型
 * @param {T} options 選項參數
 * @returns {T} 處理後的選項
 */
export declare function _handleOptions<T extends IOptions>(options: T): T;
/**
 * 檢查檔案系統狀態（異步）
 *
 * 這個函數會檢查指定路徑的檔案系統狀態，支援不同的選項和編碼。
 *
 * @template S 狀態類型
 * @param {string | Buffer} path 要檢查的路徑
 * @param {IOptions} [options] 選項
 * @returns {Promise<S>} Promise，解析為狀態物件
 */
export declare function fsStat<S extends IStatsInput = Stats>(path: string | Buffer, options?: IOptions): Promise<S>;
/**
 * 檢查檔案系統狀態（同步）
 *
 * 這個函數會同步檢查指定路徑的檔案系統狀態，支援不同的選項和編碼。
 *
 * @template S 狀態類型
 * @param {string | Buffer} path 要檢查的路徑
 * @param {IOptions} [options] 選項
 * @returns {S} 狀態物件
 */
export declare function fsStatSync<S extends IStatsInput = Stats>(path: string | Buffer, options?: IOptions): S;
/**
 * 檢查是否為符號連結（異步）
 *
 * 這個函數會檢查指定路徑是否為符號連結。
 *
 * @param {string} dir0 要檢查的路徑
 * @param {IOptions} [options] 選項
 * @returns {Promise<boolean>} Promise，解析為是否為符號連結
 */
export declare function isSymbolicLink(dir0: string, options?: IOptions): Promise<boolean>;
/**
 * 檢查是否為符號連結（同步）
 *
 * 這個函數會同步檢查指定路徑是否為符號連結。
 *
 * @param {string} dir0 要檢查的路徑
 * @param {IOptions} [options] 選項
 * @returns {boolean} 是否為符號連結
 */
export declare function isSymbolicLinkSync(dir0: string, options?: IOptions): boolean;
/**
 * 檢查多個狀態物件是否相同
 *
 * 這個函數會檢查多個狀態物件是否指向相同的檔案系統實體。
 *
 * @template S 狀態類型
 * @param {S} st1 第一個狀態物件
 * @param {S} st2 第二個狀態物件
 * @param {...S[]} stats 其他狀態物件
 * @returns {boolean} 是否所有狀態物件相同
 */
export declare function isSameStat<S extends IStatsInput>(st1: S, st2: S, ...stats: S[]): boolean;
/**
 * 檢查狀態物件是否為目錄或檔案
 *
 * 這個函數會檢查狀態物件是否為目錄或檔案，根據提供的選項。
 *
 * @param {IStatsInput} stat 狀態物件
 * @param {ITSRequireAtLeastOne<IOptionsIsDirectoryOrFileStat>} opts 選項
 * @returns {boolean} 是否符合條件
 */
export declare function isDirectoryOrFileStat(stat: IStatsInput, opts: ITSRequireAtLeastOne<IOptionsIsDirectoryOrFileStat>): boolean;
/**
 * 檢查狀態物件是否存在
 *
 * 這個函數會檢查狀態物件是否存在，並根據選項過濾結果。
 *
 * @param {IStatsInput} stat 狀態物件
 * @param {IOptionsIsDirectoryOrFileStat} [options] 選項
 * @returns {boolean} 是否符合條件
 */
export declare function isExistsStat(stat: IStatsInput, options?: IOptionsIsDirectoryOrFileStat): boolean;
/**
 * 檢查檔案系統狀態是否存在（異步）
 *
 * 這個函數會檢查指定路徑的檔案系統狀態是否存在，並根據選項過濾結果。
 *
 * @param {string | Buffer} path 要檢查的路徑
 * @param {IOptionsWithOnlyDirectoryOrFile} [options] 選項
 * @returns {Promise<boolean>} Promise，解析為是否符合條件
 */
export declare function fsStatExists(path: string | Buffer, options?: IOptionsWithOnlyDirectoryOrFile): Promise<boolean>;
/**
 * 檢查檔案系統狀態是否存在（同步）
 *
 * 這個函數會同步檢查指定路徑的檔案系統狀態是否存在，並根據選項過濾結果。
 *
 * @param {string | Buffer} path 要檢查的路徑
 * @param {IOptionsWithOnlyDirectoryOrFile} [options] 選項
 * @returns {boolean} 是否符合條件
 */
export declare function fsStatExistsSync(path: string | Buffer, options?: IOptionsWithOnlyDirectoryOrFile): boolean;
/** 預設導出 - 檢查檔案系統狀態（異步）函數 */
export default fsStat;
