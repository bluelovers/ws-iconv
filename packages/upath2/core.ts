/**
 * Created by user on 2017/12/9/009.
 */

import _path, { ParsedPath } from 'path';

import { IPathNode, IPath, IParse, IPathType, ORIGIN_KEY, IPathPlatform } from './lib/type';

import { getStatic, _replace_sep } from './lib/util';
import * as types from './lib/type';

export type { IPathNode, IPath, IParse, IPathType }

export class PathWrap implements IPath
{
	public sep = '/';
	//protected _origin: IPath;
	public name: string | IPathPlatform;
	public delimiter: string;
	//protected __proto__: IPath;

	public win32: IPath;
	public posix: IPath;
	// @ts-ignore
	public upath: PathWrap;
	// @ts-ignore
	public default: PathWrap;

	public fn: IPath;

	[ORIGIN_KEY]?: IPathType

	constructor(path, id: string)
	{
		let _static = getStatic(this);

		//this._origin = path;
		this[ORIGIN_KEY] = path;

		this.name = id;

		delete this[id];
		this[id] = this;

		//Object.defineProperty(this, '_origin', { enumerable: false, });
		Object.defineProperty(this, ORIGIN_KEY, { enumerable: false });

		// @ts-ignore
		this.fn = Object.assign(this.__proto__, path, _static.fn);

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

				this.fn[prop] = this.fn[prop].bind(this);

			})
		;
	}

	public join<T = string, U = string>(path: T, ...paths: U[]): string
	{
		return _replace_sep(this, _this_origin(this).join(path, ...paths));
	}

	public normalize<T extends string = string>(path: T): string
	{
		return _replace_sep(this, _this_origin(this).normalize(path));
	}

	public relative<T extends string = string, U extends string = string>(from: T, to: U): string
	{
		return _replace_sep(this, _this_origin(this).relative(from.toString(), to.toString()));
	}

	public resolve<T = string, U = string>(path: T, ...paths: U[]): string
	{
		return _replace_sep(this, _this_origin(this).resolve(path, ...paths))
	}

	public parse<T extends string = string>(path: T): ParsedPath
	{
		path = this.normalize(path) as any

		let ret = _this_origin(this).parse(path);

		ret.root = _replace_sep(this, ret.root);
		ret.dir = _replace_sep(this, ret.dir);

		return ret as ParsedPath;
	}

	public format<T = IParse>(pathObject: T): string
	{
		return _replace_sep(this, _this_origin(this).format(pathObject));
	}

	// ---------

	public basename<T extends string = string, U extends string = string>(path: T, ext?: U): string
	{
		return _this_origin(this).basename(path, ext);
	}

	public dirname<T extends string = string>(path: T): string
	{
		return _this_origin(this).dirname(path);
	}

	public extname<T extends string = string>(path: T): string
	{
		return _this_origin(this).extname(path);
	}

	public isAbsolute<T extends string = string>(path: T): boolean
	{
		return _this_origin(this).isAbsolute(path);
	}

	public toNamespacedPath(path: string)
	{
		return _this_origin(this).toNamespacedPath(path as string);
	}

}

export namespace PathWrap
{
	let __proto__ = {};

	// get prototype from class
	for (let i in Object.getOwnPropertyDescriptors(PathWrap.prototype))
	{
		__proto__[i] = PathWrap.prototype[i];
	}

	export let fn = __proto__ as IPath;

	fn['fn'] = fn;
	// @ts-ignore
	fn.sep = '/';

	PathWrap.prototype.fn = fn;

	export type IPath = types.IPath;
	export type IPathNode = types.IPathNode;
	export type IParse = types.IParse;
}

export const posix = new PathWrap(_path.posix, 'posix') as IPath;
export const win32 = new PathWrap(_path.win32, 'win32') as IPath;

const _upath = new PathWrap(_path, 'upath');

export type IUPath = PathWrap & {
	default: IUPath,
	upath: IUPath,
	PathWrap: typeof PathWrap,
};

export const upath = _upath as IUPath;

upath.PathWrap = PathWrap;

export const fn = PathWrap.fn = upath.fn;

// @ts-ignore
_path.upath = upath;

for (const [key, lib] of [
	['win32', win32],
	['posix', posix],
	['upath', upath],
	['default', upath],
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

Object.defineProperty(upath, "__esModule", { value: true });

// @ts-ignore
//export default upath as PathWrap & IPath & IPathNode;
export default upath;

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
