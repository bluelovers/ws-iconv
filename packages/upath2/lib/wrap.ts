/**
 * Created by user on 2020/6/9.
 */

import * as types from './type';
import { IPath, ORIGIN_KEY, IPathType, IParse } from './type';
import { getStatic, _replace_sep } from './util';
import { _this_origin } from './core';

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

export default PathWrap
