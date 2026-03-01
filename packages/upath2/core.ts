/**
 * upath2 - 跨平台路徑處理工具
 * 
 * 這個模組提供了一個 `path` 的代理，將所有結果中的反斜線 (`\`) 替換為正斜線 (`/`)，
 * 從而實現跨平台的路徑處理。
 * 
 * @module upath2
 * @author bluelovers
 * @since 2017/12/9
 */

import _path, { ParsedPath } from 'path';

import { IPathNode, IPath, IParse, IPathType, ORIGIN_KEY, IPathPlatform, PlatformPath } from './lib/type';

import { getStatic, _replace_sep, _strip_sep, defaults } from './lib/util';
import * as types from './lib/type';
import { pathIsNetworkDrive, matchNetworkDriveRoot, matchNetworkDrive02 } from 'path-is-network-drive';
import { _fix_special } from './lib/fix';

export type { IPathNode, IPath, IParse, IPathType }

/**
 * 路徑包裝類 - 實現跨平台路徑處理的核心邏輯
 * 
 * @class PathWrap
 * @implements IPath
 */
export class PathWrap implements IPath
{
	/** 正斜線分隔符，所有路徑都會使用這個分隔符 */
	public sep = '/' as const;

	/** 平台名稱（'posix'、'win32' 或 'upath'） */
	public name: string | IPathPlatform;

	/** 路徑分隔符（':' 或 ';'） */
	public delimiter: PlatformPath['delimiter'];

	/** Windows 平台路徑處理實例 */
	public win32: IPath;

	/** POSIX 平台路徑處理實例 */
	public posix: IPath;

	/** 原始 Node.js path 模組 */
	public node: PlatformPath = _path;

	/** upath 實例引用 */
	// @ts-ignore
	public upath: PathWrap;

	/** 預設實例引用 */
	// @ts-ignore
	public default: PathWrap;

	/** 函數別名 */
	public fn: IPath;

	/** 原始路徑庫的符號引用 */
	[ORIGIN_KEY]?: IPathType

	/**
	 * 構造函數
	 * 
	 * @param {IPath} path 要包裝的路徑庫
	 * @param {string} id 實例ID（'posix'、'win32' 或 'upath'）
	 */
	constructor(path, id: string)
	{
		let _static = getStatic(this);

		// 設置函數別名
		// @ts-ignore
		this.fn = defaults(this.__proto__, _static.fn, path);

		// 設置分隔符
		this.delimiter = path.delimiter ?? _static.fn.delimiter;

		// 綁定所有路徑操作方法
		[
			'join',
			'normalize',
			'relative',
			'resolve',
			'parse',
			'format',

			'basename',
			'dirname',
			'extname',
			'isAbsolute',

			'toNamespacedPath',
		]
			.forEach(prop =>
			{

				// 綁定方法到實例
				this[prop] = this[prop].bind(this);

			})
		;

		// 刪除ID屬性
		delete this[id];

		// 設置原始路徑庫的引用
		Object.defineProperty(this, ORIGIN_KEY, {
			enumerable: false,
			value: path,
		});

		// 設置函數別名
		this.fn[id] = this[id] = this;
		this.name = id;
	}

	/**
	 * 連接多個路徑片段
	 * 
	 * @template T 第一個路徑類型
	 * @template U 後續路徑類型
	 * @param {T} path 第一個路徑
	 * @param {...U[]} paths 後續路徑
	 * @returns {string} 連接後的路徑
	 */
	public join<T = string, U = string>(path: T, ...paths: U[]): string
	{
		// 處理特殊路徑
		// @ts-ignore
		path = _fix_special(this, path, true);

		// 連接路徑並替換分隔符
		return _replace_sep(this, _this_origin(this).join(path, ...paths));
	}

	/**
	 * 規範化路徑
	 * 
	 * @template T 路徑類型
	 * @param {T} path 要規範化的路徑
	 * @returns {string} 規範化後的路徑
	 */
	public normalize<T extends string = string>(path: T): string
	{
		// 處理特殊路徑
		let ret = _fix_special(this, path)

		if (ret?.length)
		{
			return ret;
		}

		// 規範化路徑並替換分隔符
		return _replace_sep(this, _this_origin(this).normalize(path));
	}

	/**
	 * 計算相對路徑
	 * 
	 * @template T 源路徑類型
	 * @template U 目標路徑類型
	 * @param {T} from 源路徑
	 * @param {U} to 目標路徑
	 * @returns {string} 相對路徑
	 */
	public relative<T extends string = string, U extends string = string>(from: T, to: U): string
	{
		// 處理特殊路徑
		from = _fix_special(this, from, true);
		to = _fix_special(this, to, true);

		// 計算相對路徑並替換分隔符
		return _replace_sep(this, _this_origin(this).relative(from.toString(), to.toString()));
	}

	/**
	 * 解析路徑
	 * 
	 * @template T 第一個路徑類型
	 * @template U 後續路徑類型
	 * @param {T} path 第一個路徑
	 * @param {...U[]} paths 後續路徑
	 * @returns {string} 解析後的路徑
	 */
	public resolve<T = string, U = string>(path: T, ...paths: U[]): string
	{
		// 處理特殊路徑
		// @ts-ignore
		path = _fix_special(this, path, true);

		// 解析路徑並替換分隔符
		return _replace_sep(this, _this_origin(this).resolve(path, ...paths))
	}

	/**
	 * 解析路徑物件
	 * 
	 * @template T 路徑類型
	 * @param {T} path 要解析的路徑
	 * @returns {ParsedPath} 解析後的路徑物件
	 */
	public parse<T extends string = string>(path: T): ParsedPath
	{
		// 規範化路徑
		path = this.normalize(path) as any

		// 解析路徑
		let ret = _this_origin(this).parse(path);

		// 替換分隔符
		ret.root = _replace_sep(this, ret.root);
		ret.dir = _replace_sep(this, ret.dir);

		return ret as ParsedPath;
	}

	/**
	 * 格式化路徑物件
	 * 
	 * @template T 路徑物件類型
	 * @param {T} pathObject 要格式化的路徑物件
	 * @returns {string} 格式化後的路徑
	 */
	public format<T = IParse>(pathObject: T): string
	{
		// 格式化路徑並替換分隔符
		return _replace_sep(this, _this_origin(this).format(pathObject));
	}

	// ---------

	/**
	 * 獲取路徑的最後一個部分
	 * 
	 * @template T 路徑類型
	 * @template U 擴展名類型
	 * @param {T} path 路徑
	 * @param {U} [ext] 要移除的擴展名
	 * @returns {string} 最後一部分
	 */
	public basename<T extends string = string, U extends string = string>(path: T, ext?: U): string
	{
		return _this_origin(this).basename(path, ext);
	}

	/**
	 * 獲取路徑的目錄部分
	 * 
	 * @template T 路徑類型
	 * @param {T} path 路徑
	 * @returns {string} 目錄部分
	 */
	public dirname<T extends string = string>(path: T): string
	{
		let r: string;

		// 處理網路磁碟機路徑
		if (false && this.name !== 'posix' && pathIsNetworkDrive(path))
		{
			if (matchNetworkDriveRoot(path))
			{
				r = path
			}
			else
			{
				let m = matchNetworkDrive02(path);

				if (m?.length)
				{
					return `\\\\${m[1]}`
				}

				r = _this_origin(this).dirname(path)
			}
		}
		else
		{
			r = _this_origin(this).dirname(path)
		}

		// 處理根目錄
		if (r.length > 1 && !/^\w:[/\\]$/.test(r))
		{
			r = _strip_sep(r);
		}

		// 替換分隔符
		return _replace_sep(this, r)
	}

	/**
	 * 獲取路徑的擴展名
	 * 
	 * @template T 路徑類型
	 * @param {T} path 路徑
	 * @returns {string} 擴展名
	 */
	public extname<T extends string = string>(path: T): string
	{
		return _this_origin(this).extname(path);
	}

	/**
	 * 檢查路徑是否為絕對路徑
	 * 
	 * @template T 路徑類型
	 * @param {T} path 路徑
	 * @returns {boolean} 是否為絕對路徑
	 */
	public isAbsolute<T extends string = string>(path: T): boolean
	{
		return _this_origin(this).isAbsolute(path);
	}

	/**
	 * 轉換為命名空間路徑
	 * 
	 * @param {string} path 路徑
	 * @returns {string} 命名空間路徑
	 */
	public toNamespacedPath(path: string)
	{
		return _this_origin(this).toNamespacedPath(path as string);
	}

}

export namespace PathWrap
{
	let __proto__ = {};

	// 從類獲取原型
	for (let i in Object.getOwnPropertyDescriptors(PathWrap.prototype))
	{
		__proto__[i] = PathWrap.prototype[i];
	}

	/** 函數別名 */
	export let fn = __proto__ as IPath;

	// 刪除名稱屬性
	delete fn.name;

	// 設置函數別名
	fn['fn'] = fn;
	// @ts-ignore
	fn.sep = '/';

	// 設置原型函數別名
	PathWrap.prototype.fn = fn;

	export type IPath = types.IPath;
	export type IPathNode = types.IPathNode;
	export type IParse = types.IParse;
}

/** POSIX 平台實例 */
export const posix = new PathWrap(_path.posix, 'posix') as IPath;

/** Windows 平台實例 */
export const win32 = new PathWrap(_path.win32, 'win32') as IPath;

/** upath 實例 */
const _upath = new PathWrap(_path, 'upath');

export type IUPath = PathWrap & {
	default: IUPath,
	upath: IUPath,
	PathWrap: typeof PathWrap,
};

/** 預設實例 */
export const upath = _upath as IUPath;

// 設置類引用
upath.PathWrap = PathWrap;

// 設置函數別名
export const fn = PathWrap.fn = upath.fn;

// @ts-ignore
_path.upath = upath;

// 設置跨平台別名
for (const [key, lib] of [
	['win32', win32],
	['posix', posix],
	['upath', upath],
	['default', upath],
	['node', _path],
] as const)
{
	delete win32.fn[key];
	delete posix.fn[key];
	delete upath.fn[key];

	delete win32[key];
	delete posix[key];
	delete upath[key];

	// @ts-ignore
	win32[key] = posix[key] = upath[key] = lib;
	//win32.__proto__[key] = posix.__proto__[key] = lib;
}

// 標記為 ES 模組
Object.defineProperty(upath, "__esModule", { value: true });

// 設置預設導出
// @ts-ignore
//export default upath as PathWrap & IPath & IPathNode;
export default upath;

/**
 * 獲取原始路徑庫
 * 
 * @param {IPath} who 要檢查的實例
 * @returns {Pick<PathWrap, keyof IPathNode>} 原始路徑庫
 */
export function _this_origin(who: IPath): Pick<PathWrap, keyof IPathNode>
{
	if (who[ORIGIN_KEY])
	{
		// @ts-ignore
		return who[ORIGIN_KEY];
	}
	// @ts-ignore
	else if (who === upath)
	{
		// @ts-ignore
		return _path;
	}
	else if (who === win32)
	{
		// @ts-ignore
		return _path.win32;
	}
	else if (who === posix)
	{
		// @ts-ignore
		return _path.posix;
	}

	throw new TypeError(`this not PathWrap`);
}
