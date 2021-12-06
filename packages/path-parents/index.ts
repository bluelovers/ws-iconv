import upath from 'upath2/core';
import { IPathNode, IPathPlatform } from 'upath2/lib/type';
import pathNode from 'path';
import pathIsSame from 'path-is-same';

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

	if (!pathIsSame(cwd, path))
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

export function* pathSplitGenerator(cwd?: string | IOptions, opts?: IOptions)
{
	const runtime = handleOptions(cwd, opts);

	for (const p of pathParentsGenerator(cwd, runtime.opts))
	{
		let r = runtime.path.basename(p);

		if (!r?.length)
		{
			r = p;
		}

		yield r
	}
}

export function pathSplit(cwd?: string | IOptions, opts?: IOptions)
{
	return [...pathSplitGenerator(cwd, opts)]
}

export default pathParents
