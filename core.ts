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
	win32?: IPath;
	posix?: IPath;
	upath?: IPath;

	default?: IPath;
}

export class PathWrap implements IPath
{
	public sep = '/';
	protected _origin;
	public name;
	public delimiter;
	public __proto__;

	public win32;
	public posix;
	public upath;
	public default;

	constructor(path, id)
	{
		this._origin = path;

		this.name = id;

		delete this[id];
		this[id] = this;

		Object.defineProperty(this, '_origin', { enumerable: false, });

		let __proto__ = {};

		// get prototype from class
		for (let i in Object.getOwnPropertyDescriptors(this.__proto__.constructor.prototype))
		{
			__proto__[i] = this.__proto__.constructor.prototype[i];
		}

		Object.assign(this.__proto__, path, __proto__, this.__proto__);
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

export const posix = new PathWrap(_path.posix, 'posix');
export const win32 = new PathWrap(_path.win32, 'win32');
export const upath = new PathWrap(_path, 'upath');

upath.win32 = win32;
upath.posix = posix;
upath.upath = upath;

upath.default = upath;

for (let key of [
	'win32',
	'posix',
	'upath',
])
{
	win32[key] = posix[key] = upath[key]
}

//console.log(upath, upath.sep);
//console.log(upath.join('/foo', 'bar', 'baz/asdf', 'quux', '..'));
//console.log(upath.parse('/home/user/dir/file.txt'));

// @ts-ignore
export default upath as PathWrap;
