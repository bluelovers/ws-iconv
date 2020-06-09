/**
 * Created by user on 2017/12/9/009.
 */

import _path from 'path';

import { IPathNode, IPath, IParse, IPathType } from './lib/type';

import { PathWrap } from './lib/wrap';

export type { IPathNode, IPath, IParse, IPathType }

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

//upath.win32 = win32;
//upath.posix = posix;
//upath.upath = upath;

//PathWrap.fn = upath.fn;

upath.fn.win32 = win32;
upath.fn.posix = posix;
upath.fn.upath = upath;
// @ts-ignore
upath.fn.default = upath;

export const fn = PathWrap.fn = upath.fn;

// @ts-ignore
_path.upath = upath;

for (const key of [
	'win32',
	'posix',
	'upath',
] as const)
{
	win32.fn[key] = posix.fn[key] = upath.fn[key] = upath[key];
}

win32.default = posix.default = upath.default = upath;

// @ts-ignore
//export default upath as PathWrap & IPath & IPathNode;
export default upath;

