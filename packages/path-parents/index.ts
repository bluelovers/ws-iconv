import upath from 'upath2/core';
import { IPathPlatform, IPathNode } from 'upath2/lib/type';
import pathNode from 'path';

export interface IOptions
{
	platform?: IPathPlatform
}

export interface IRuntime
{
	cwd: string;
	opts: IOptions;
	path: IPathNode;
}

export function handleOptions(cwd?: string | IOptions, opts?: IOptions): IRuntime
{
	if (typeof opts === 'undefined')
	{
		if (typeof cwd !== 'string')
		{
			([opts, cwd] = [cwd, opts]);
		}
	}

	cwd = cwd ?? process.cwd();
	opts = opts ?? {};

	let path: IPathNode = upath;

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

	cwd = path.normalize(cwd as string);

	return {
		// @ts-ignore
		cwd,
		opts,
		path,
	}
}

export function pathParentsCore(cwd: string, runtime: IRuntime)
{

	let path = runtime.path.dirname(cwd)

	if (path !== cwd)
	{
		return path
	}
}

export function* pathParentsGenerator(cwd?: string | IOptions, opts?: IOptions)
{
	let runtime = handleOptions(cwd, opts);

	let _do = true;
	let current = runtime.cwd;
	let last: string

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
	}
	while (_do)
}

export function pathParents(cwd?: string | IOptions, opts?: IOptions)
{
	return [...pathParentsGenerator(cwd, opts)]
}

export default pathParents
