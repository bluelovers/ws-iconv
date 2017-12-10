/**
 * Created by user on 2017/12/9/009.
 */

// @ts-ignore
import * as _path from 'path';
import bind from 'bind-decorator';

//export const upath = Object.assign({}, path.win32, {
//	sep: '/',
//});

export interface IParse
{
	root?: string,
	dir?: string,
	base?: string,
	ext?: string,
	name?: string
}

export interface IPathNode
{
	sep: string;
	win32?: IPathNode;
	posix?: IPathNode;

	delimiter?: string;

	join<T = string, U = string>(path: T, ...paths: U[]): string;
	normalize<T = string>(path: T): string;
	relative<T = string, U = string>(from: T, to: U): string;
	resolve<T = string, U = string>(path: T, ...paths: U[]): string;
	parse<T = string>(path: T): IParse;
	format<T = IParse>(pathObject: T): string;
	basename<T = string, U = string>(path: T, ext?: U): string;
	dirname<T = string>(path: T): string;
	extname<T = string>(path: T): string;
	isAbsolute<T = string>(path: T): boolean;

	toNamespacedPath?: Function;
}

export interface IPath extends IPathNode
{
	name?: string;

	win32?: IPath;
	posix?: IPath;
	upath?: IPath;

	sep: string;
	delimiter?: string;

	join<T = string, U = string>(path: T, ...paths: U[]): string;
	normalize<T = string>(path: T): string;
	relative<T = string, U = string>(from: T, to: U): string;
	resolve<T = string, U = string>(path: T, ...paths: U[]): string;
	parse<T = string>(path: T): IParse;
	format<T = IParse>(pathObject: T): string;
	basename<T = string, U = string>(path: T, ext?: U): string;
	dirname<T = string>(path: T): string;
	extname<T = string>(path: T): string;
	isAbsolute<T = string>(path: T): boolean;

	fn?: IPath;

	default?: IPath;

	[index: string]: any;
}

export class PathWrap implements IPath
{
	public sep = '/';
	protected _origin: IPath;
	public name: string;
	public delimiter: string;
	protected __proto__: IPath;

	public win32: IPath;
	public posix: IPath;
	public upath: IPath;
	public default: IPath;

	public fn: IPath;

	constructor(path, id)
	{
		let _static = getStatic(this);

		this._origin = path;

		this.name = id;

		delete this[id];
		this[id] = this;

		Object.defineProperty(this, '_origin', { enumerable: false, });

		let __proto__ = {};

		// get prototype from class
		for (let i in Object.getOwnPropertyDescriptors(_static.prototype))
		{
			//__proto__[i] = _static.prototype[i];
		}

		this.fn = Object.assign(this.__proto__, path, _static.fn);
	}

	public join<T = string, U = string>(path: T, ...paths: U[]): string
	{
		//console.log(this.name, this.sep);

		return this._origin.join(path.toString(), ...paths).replace(/\\/g, this.sep);
	}

	public normalize<T = string>(path: T): string
	{
		return this._origin.normalize(path.toString()).replace(/\\/g, this.sep);
	}

	public relative<T = string, U = string>(from: T, to: U): string
	{
		return this._origin.relative(from.toString(), to.toString()).replace(/\\/g, this.sep);
	}

	public resolve<T = string, U = string>(path: T, ...paths: U[]): string
	{
		return this._origin.resolve(path.toString(), ...paths).replace(/\\/g, this.sep);
	}

	// ---------

	public parse<T = string>(path: T): IParse
	{
		return this._origin.parse(path.toString());
	}

	public format<T = IParse>(pathObject: T): string
	{
		return this._origin.format(pathObject);
	}

	public basename<T = string, U = string>(path: T, ext?: U): string
	{
		return this._origin.basename(path.toString(), ext);
	}

	public dirname<T = string>(path: T): string
	{
		return this._origin.dirname(path.toString());
	}

	public extname<T = string>(path: T): string
	{
		return this._origin.extname(path.toString());
	}

	public isAbsolute<T = string>(path: T): boolean
	{
		return this._origin.isAbsolute(path.toString());
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
}

function getStatic(who)
{
	return who.__proto__.constructor;
}

export const posix = new PathWrap(_path.posix, 'posix') as IPath;
export const win32 = new PathWrap(_path.win32, 'win32') as IPath;
export const upath = new PathWrap(_path, 'upath') as IPath;

//upath.win32 = win32;
//upath.posix = posix;
//upath.upath = upath;

//PathWrap.fn = upath.fn;

upath.fn.win32 = win32;
upath.fn.posix = posix;
upath.fn.upath = upath;
upath.fn.default = upath;

export const fn = PathWrap.fn = upath.fn;

_path.upath = upath;

for (let key of [
	'win32',
	'posix',
	'upath',
])
{
	win32.fn[key] = posix.fn[key] = upath.fn[key] = upath[key];
}

//console.log(upath, upath.sep);
//console.log(upath.join('/foo', 'bar', 'baz/asdf', 'quux', '..'));
//console.log(upath.parse('/home/user/dir/file.txt'));

// @ts-ignore
export default upath as PathWrap;
