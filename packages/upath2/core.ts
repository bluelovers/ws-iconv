/**
 * Created by user on 2017/12/9/009.
 */

import _path from 'path';

import { IPathNode, IPath, IParse, IPathType, ORIGIN_KEY } from './lib/type';

import { getStatic, _replace_sep } from './lib/util';
import * as types from './lib/type';

export type { IPathNode, IPath, IParse, IPathType }

export class PathWrap implements IPath
{
	public sep = '/';
	//protected _origin: IPath;
	public name: string;
	public delimiter: string;
	//protected __proto__: IPath;

	public win32: IPath;
	public posix: IPath;
	public upath: PathWrap;
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
		]
			.forEach(prop => {

				this.fn[prop] = this.fn[prop].bind(this);

			})
		;
	}

	public join<T = string, U = string>(path: T, ...paths: U[]): string
	{
		//console.log(this.name, this.sep);

		return _this_origin(this).join(path, ...paths).replace(/\\/g, this.sep);
	}

	public normalize<T = string>(path: T): string
	{
		return _this_origin(this).normalize(path).replace(/\\/g, this.sep);
	}

	public relative<T = string, U = string>(from: T, to: U): string
	{
		return _this_origin(this).relative(from.toString(), to.toString()).replace(/\\/g, this.sep);
	}

	public resolve<T = string, U = string>(path: T, ...paths: U[]): string
	{
		return _this_origin(this).resolve(path, ...paths).replace(/\\/g, this.sep);
	}

	public parse<T = string>(path: T): IParse
	{
		let ret = _this_origin(this).parse(path);

		ret.root = ret.root.replace(/\\/g, this.sep);
		ret.dir = ret.dir.replace(/\\/g, this.sep);

		return ret;
	}

	public format<T = IParse>(pathObject: T): string
	{
		return _replace_sep(this, _this_origin(this).format(pathObject));
	}

	// ---------

	public basename<T = string, U = string>(path: T, ext?: U): string
	{
		return _this_origin(this).basename(path, ext);
	}

	public dirname<T = string>(path: T): string
	{
		return _this_origin(this).dirname(path);
	}

	public extname<T = string>(path: T): string
	{
		return _this_origin(this).extname(path);
	}

	public isAbsolute<T = string>(path: T): boolean
	{
		return _this_origin(this).isAbsolute(path);
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

export function _this_origin(who: IPath): IPathNode
{
	if (who[ORIGIN_KEY])
	{
		// @ts-ignore
		return who[ORIGIN_KEY];
	}
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
