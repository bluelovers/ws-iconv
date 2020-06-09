/**
 * Created by user on 2018/3/30/030.
 */
import _path from 'path';

export const ORIGIN_KEY = Symbol.for('_origin');

export interface IParse
{
	root?: string,
	dir?: string,
	base?: string,
	ext?: string,
	name?: string
}

export type IPathType = typeof _path | typeof _path.posix | typeof _path.win32 | IPath | IPathNode

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

export type IPath = IPathNode & {
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

	[ORIGIN_KEY]?: IPathType;

	[index: string]: any;
}

export default exports as typeof import('./type');
