/**
 * find-up-paths - 向上搜尋檔案或目錄
 * Find files or directories by walking up parent directories
 *
 * 從當前目錄開始向上遍歷父目錄，尋找符合條件的檔案或目錄
 * Walks up from current directory through parent directories to find matching files or directories
 *
 * @module find-up-paths
 * @author bluelovers
 */
import { IOptions, IRuntime } from 'path-parents';
import { IOptionsIsDirectoryOrFileStat } from 'fs-stat';
import { Stats } from 'fs-extra';
/**
 * 向上搜尋選項介面
 * Find up paths options interface
 *
 * 擴展 path-parents 和 fs-stat 的選項
 * Extends options from path-parents and fs-stat
 */
export interface IOptionsFindUpPaths extends IOptions, IOptionsIsDirectoryOrFileStat {
    /**
     * 僅搜尋目錄 / Only search directories
     */
    onlyDirectories?: boolean;
    /**
     * 僅搜尋檔案 / Only search files
     */
    onlyFiles?: boolean;
    /**
     * 找不到項目時拋出錯誤 / Throw error when no entry found
     */
    throwIfNoEntry?: boolean;
}
/**
 * 執行環境介面
 * Runtime interface
 */
export interface IRuntimeFindUpPaths<OPTS extends IOptionsFindUpPaths = IOptionsFindUpPaths> extends IRuntime<OPTS> {
}
/**
 * 搜尋結果介面
 * Search result interface
 */
export interface IFindUpPathsResult {
    /**
     * 檔案狀態資訊 / File status information
     */
    stat: Stats;
    /**
     * 找到的完整路徑 / Found full path
     */
    result: string;
    /**
     * 所在目錄 / Parent directory
     */
    dir: string;
}
/**
 * 處理選項並建立執行環境
 * Handle options and create runtime
 *
 * 合併預設選項並建立搜尋執行環境
 * Merges default options and creates search runtime
 *
 * @param {string | T} [cwd] - 工作目錄或選項 / Working directory or options
 * @param {T} [opts] - 選項 / Options
 * @returns {IRuntimeFindUpPaths<T>} 執行環境 / Runtime
 */
export declare function handleOptions<T extends IOptionsFindUpPaths>(cwd?: string | T, opts?: T): IRuntimeFindUpPaths<T>;
/**
 * 處理搜尋模式
 * Handle search pattern
 *
 * 將模式標準化為字串陣列並驗證
 * Normalizes pattern to string array and validates
 *
 * @param {string | string[]} pattern - 搜尋模式 / Search pattern
 * @returns {string[]} 標準化的模式陣列 / Normalized pattern array
 */
export declare function _handlePattern(pattern: string | string[]): string[];
/**
 * 當找不到項目時拋出錯誤
 * Throw error when no entry found
 *
 * 根據 throwIfNoEntry 選項決定是否拋出錯誤
 * Throws error based on throwIfNoEntry option
 *
 * @param {IRuntime<IOptionsFindUpPaths>} runtime - 執行環境 / Runtime
 */
export declare function _throwIfNoEntry(runtime: IRuntime<IOptionsFindUpPaths>): void;
/**
 * 向上搜尋檔案或目錄（同步）
 * Find files or directories by walking up (synchronous)
 *
 * 從當前目錄開始向上遍歷，尋找第一個符合條件的項目
 * Walks up from current directory to find first matching entry
 *
 * @param {string | string[]} pattern - 搜尋模式 / Search pattern
 * @param {IOptionsFindUpPaths} [opts] - 選項 / Options
 * @returns {{ stat: Stats, result: string, dir: string }} 搜尋結果 / Search result
 */
export declare function findUpPaths(pattern: string | string[], opts?: IOptionsFindUpPaths): IFindUpPathsResult;
/**
 * 向上搜尋執行階段（同步）
 * Find up paths runtime (synchronous)
 *
 * 使用已建立的執行環境進行同步搜尋
 * Performs synchronous search using established runtime
 *
 * @param {string | string[]} pattern - 搜尋模式 / Search pattern
 * @param {IRuntimeFindUpPaths} runtime - 執行環境 / Runtime
 * @returns {{ stat: Stats, result: string, dir: string }} 搜尋結果 / Search result
 */
export declare function findUpPathsRuntime(pattern: string | string[], runtime: IRuntimeFindUpPaths): IFindUpPathsResult;
/**
 * 向上搜尋檔案或目錄（異步）
 * Find files or directories by walking up (asynchronous)
 *
 * 從當前目錄開始向上遍歷，非同步尋找第一個符合條件的項目
 * Walks up from current directory to asynchronously find first matching entry
 *
 * @param {string | string[]} pattern - 搜尋模式 / Search pattern
 * @param {IOptionsFindUpPaths} [opts] - 選項 / Options
 * @returns {Promise<{ stat: Stats, result: string, dir: string }>} 搜尋結果 / Search result
 */
export declare function findUpPathsAsync(pattern: string | string[], opts?: IOptionsFindUpPaths): Promise<IFindUpPathsResult>;
/**
 * 向上搜尋執行階段（異步）
 * Find up paths runtime (asynchronous)
 *
 * 使用已建立的執行環境進行異步搜尋
 * Performs asynchronous search using established runtime
 *
 * @param {string | string[]} pattern - 搜尋模式 / Search pattern
 * @param {IRuntimeFindUpPaths} runtime - 執行環境 / Runtime
 * @returns {Promise<{ stat: Stats, result: string, dir: string }>} 搜尋結果 / Search result
 */
export declare function findUpPathsRuntimeAsync(pattern: string | string[], runtime: IRuntimeFindUpPaths): Promise<IFindUpPathsResult>;
/**
 * 預設導出 - findUpPaths 函數
 * Default export - findUpPaths function
 */
export default findUpPaths;
