/**
 * path-parents - 父目錄路徑處理工具
 * 
 * 這個模組提供了獲取所有父目錄路徑的功能，支援多種選項和平台。
 * 
 * @module path-parents
 * @author James Halliday <mail@substack.net> (http://substack.net)
 */

import upath from 'upath2/core';
import { IPathNode, IPathPlatform } from 'upath2/lib/type';
import pathNode from 'path';
import { pathIsSame } from 'path-is-same';

/**
 * 選項介面
 * 
 * @interface IOptions
 */
export interface IOptions
{
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
export interface IRuntime<OPTS extends IOptions = IOptions>
{
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
export function handleOptions<T extends IOptions>(cwd?: string | T, opts?: T): IRuntime<T>
{
	// 處理參數順序
	if (typeof opts === 'undefined')
	{
		if (typeof cwd !== 'string')
		{
			// @ts-ignore
			([opts, cwd] = [cwd, opts]);
		}
	}

	// 設置預設選項
	// @ts-ignore
	opts = opts ?? {};
	cwd = cwd ?? opts.cwd ?? process.cwd();

	opts = {
		...opts,
	};

	// 設置預設路徑處理函數
	let path: IPathNode = upath;

	// 根據平台類型選擇路徑處理函數
	if (typeof opts.platform === 'string')
	{
		switch (opts.platform)
		{
			case 'win32':
			case 'posix':
				path = upath[opts.platform]
				break;
			case 'upath':
				path = upath
				break;
			case 'node':
				path = pathNode
				break;
			default:
				path = upath
		}
	}

	// 規範化當前工作目錄
	cwd = path.normalize(cwd as string);

	// 處理停止路徑
	const stopPath = [opts.stopPath ?? []]
		.flat()
		.map(p => path.normalize(p))
	;

	// 設置限制層數
	const limit = opts.limit > 0 ? opts.limit : Infinity;

	// 更新選項
	opts.cwd = cwd;
	opts.stopPath = stopPath;
	opts.limit = limit;

	return {
		cwd,
		opts,
		path,
		stopPath,
		limit,
	}
}

/**
 * 獲取父目錄核心函數
 * 
 * 這個函數會獲取指定路徑的父目錄。
 * 
 * @param {string} cwd 當前工作目錄
 * @param {IRuntime} runtime 執行時環境
 * @returns {string | undefined} 父目錄路徑或 undefined
 */
export function pathParentsCore(cwd: string, runtime: IRuntime)
{
	// 獲取父目錄
	let path = runtime.path.dirname(cwd)

	// 檢查是否為同一路徑
	if (!pathIsSame(cwd, path))
	{
		return path
	}
}

/**
 * 檢查執行時限制
 * 
 * 這個函數會檢查是否達到執行時限制，包括層數限制和停止路徑。
 * 
 * @param {string} current 當前路徑
 * @param {IRuntime} runtime 執行時環境
 * @returns {boolean} 是否應該停止
 */
export function _checkRuntimeLimit(current: string, runtime: IRuntime)
{
	return --runtime.limit <= 0 || runtime.stopPath.includes(current)
}

/**
 * 父目錄路徑生成器
 * 
 * 這個生成器會生成所有父目錄路徑。
 * 
 * @param {string | IOptions} [cwd] 當前工作目錄或選項
 * @param {IOptions} [opts] 選項
 * @returns {Generator<string>} 父目錄路徑生成器
 */
export function* pathParentsGenerator(cwd?: string | IOptions, opts?: IOptions)
{
	// 處理選項
	const runtime = handleOptions(cwd, opts);

	// 生成父目錄路徑
	yield* pathParentsGeneratorRuntime(runtime)
}

/**
 * 父目錄路徑生成器（執行時）
 * 
 * 這個生成器會根據執行時環境生成所有父目錄路徑。
 * 
 * @param {IRuntime} runtime 執行時環境
 * @returns {Generator<string>} 父目錄路徑生成器
 */
export function* pathParentsGeneratorRuntime(runtime: IRuntime)
{
	let _do = true;
	let current = runtime.cwd;
	let last: string

	// 是否包含當前目錄
	if (runtime.opts.includeCurrentDirectory)
	{
		yield current;

		if (_checkRuntimeLimit(current, runtime))
		{
			return;
		}
	}

	do
	{
		last = current;
		current = pathParentsCore(current, runtime);

		if (typeof current === 'undefined')
		{
			_do = false;
			break;
		}

		yield current;

		if (_checkRuntimeLimit(current, runtime))
		{
			break;
		}
	}
	while (_do)
}

/**
 * 獲取所有父目錄路徑
 * 
 * 這個函數會返回所有父目錄路徑的陣列。
 * 
 * @param {string | IOptions} [cwd] 當前工作目錄或選項
 * @param {IOptions} [opts] 選項
 * @returns {string[]} 所有父目錄路徑陣列
 */
export function pathParents(cwd?: string | IOptions, opts?: IOptions)
{
	return [...pathParentsGenerator(cwd, opts)]
}

/**
 * 路徑分割生成器
 * 
 * 這個生成器會生成路徑的每個部分。
 * 
 * @param {string | IOptions} [cwd] 當前工作目錄或選項
 * @param {IOptions} [opts] 選項
 * @returns {Generator<string>} 路徑部分生成器
 */
export function* pathSplitGenerator(cwd?: string | IOptions, opts?: IOptions)
{
	// 處理選項
	const runtime = handleOptions(cwd, opts);

	// 生成路徑部分
	for (const p of pathParentsGeneratorRuntime(runtime))
	{
		let r = runtime.path.basename(p);

		if (!r?.length)
		{
			r = p;
		}

		yield r
	}
}

/**
 * 分割路徑
 * 
 * 這個函數會返回路徑的每個部分的陣列。
 * 
 * @param {string | IOptions} [cwd] 當前工作目錄或選項
 * @param {IOptions} [opts] 選項
 * @returns {string[]} 路徑部分陣列
 */
export function pathSplit(cwd?: string | IOptions, opts?: IOptions)
{
	return [...pathSplitGenerator(cwd, opts)]
}

/** 預設導出 - pathParents 函數 */
export default pathParents

