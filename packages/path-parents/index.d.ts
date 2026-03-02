/**
 * path-parents - 父目錄路徑處理工具
 *
 * 這個模組提供了獲取所有父目錄路徑的功能，支援多種選項和平台。
 *
 * @module path-parents
 * @author James Halliday <mail@substack.net> (http://substack.net)
 */
import { IPathNode, IPathPlatform } from 'upath2/lib/type';
/**
 * 選項介面
 *
 * @interface IOptions
 */
export interface IOptions {
    /** 當前工作目錄 */
    cwd?: string;
    /** 平台類型 */
    platform?: IPathPlatform;
    /** 停止路徑 */
    stopPath?: string | string[];
    /** 限制層數 */
    limit?: number;
    /** 是否包含當前目錄 */
    includeCurrentDirectory?: boolean;
}
/**
 * 執行時環境介面
 *
 * @interface IRuntime
 * @template OPTS 選項類型
 */
export interface IRuntime<OPTS extends IOptions = IOptions> {
    /** 當前工作目錄 */
    cwd: string;
    /** 選項 */
    opts: OPTS;
    /** 路徑處理函數 */
    path: Pick<IPathNode, 'normalize' | 'dirname' | 'basename' | 'resolve' | 'join'>;
    /** 停止路徑 */
    stopPath: string[];
    /** 限制層數 */
    limit: number;
}
/**
 * 處理選項參數
 *
 * 這個函數會處理選項參數，設置預設值並檢查參數有效性。
 *
 * @template T 選項類型
 * @param {string | T} [cwd] 當前工作目錄或選項
 * @param {T} [opts] 選項
 * @returns {IRuntime<T>} 執行時環境
 */
export declare function handleOptions<T extends IOptions>(cwd?: string | T, opts?: T): IRuntime<T>;
/**
 * 獲取父目錄核心函數
 *
 * 這個函數會獲取指定路徑的父目錄。
 *
 * @param {string} cwd 當前工作目錄
 * @param {IRuntime} runtime 執行時環境
 * @returns {string | undefined} 父目錄路徑或 undefined
 */
export declare function pathParentsCore(cwd: string, runtime: IRuntime): string;
/**
 * 檢查執行時限制
 *
 * 這個函數會檢查是否達到執行時限制，包括層數限制和停止路徑。
 *
 * @param {string} current 當前路徑
 * @param {IRuntime} runtime 執行時環境
 * @returns {boolean} 是否應該停止
 */
export declare function _checkRuntimeLimit(current: string, runtime: IRuntime): boolean;
/**
 * 父目錄路徑生成器
 *
 * 這個生成器會生成所有父目錄路徑。
 *
 * @param {string | IOptions} [cwd] 當前工作目錄或選項
 * @param {IOptions} [opts] 選項
 * @returns {Generator<string>} 父目錄路徑生成器
 */
export declare function pathParentsGenerator(cwd?: string | IOptions, opts?: IOptions): Generator<string, void, unknown>;
/**
 * 父目錄路徑生成器（執行時）
 *
 * 這個生成器會根據執行時環境生成所有父目錄路徑。
 *
 * @param {IRuntime} runtime 執行時環境
 * @returns {Generator<string>} 父目錄路徑生成器
 */
export declare function pathParentsGeneratorRuntime(runtime: IRuntime): Generator<string, void, unknown>;
/**
 * 獲取所有父目錄路徑
 *
 * 這個函數會返回所有父目錄路徑的陣列。
 *
 * @param {string | IOptions} [cwd] 當前工作目錄或選項
 * @param {IOptions} [opts] 選項
 * @returns {string[]} 所有父目錄路徑陣列
 */
export declare function pathParents(cwd?: string | IOptions, opts?: IOptions): string[];
/**
 * 路徑分割生成器
 *
 * 這個生成器會生成路徑的每個部分。
 *
 * @param {string | IOptions} [cwd] 當前工作目錄或選項
 * @param {IOptions} [opts] 選項
 * @returns {Generator<string>} 路徑部分生成器
 */
export declare function pathSplitGenerator(cwd?: string | IOptions, opts?: IOptions): Generator<string, void, unknown>;
/**
 * 分割路徑
 *
 * 這個函數會返回路徑的每個部分的陣列。
 *
 * @param {string | IOptions} [cwd] 當前工作目錄或選項
 * @param {IOptions} [opts] 選項
 * @returns {string[]} 路徑部分陣列
 */
export declare function pathSplit(cwd?: string | IOptions, opts?: IOptions): string[];
/** 預設導出 - pathParents 函數 */
export default pathParents;
