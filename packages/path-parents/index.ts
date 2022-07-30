import upath from 'upath2/core';
import { IPathNode, IPathPlatform } from 'upath2/lib/type';
import pathNode from 'path';
import { pathIsSame } from 'path-is-same';

export interface IOptions
{
	cwd?: string;
	platform?: IPathPlatform;
	stopPath?: string | string[];
	limit?: number;
	includeCurrentDirectory?: boolean;
}

export interface IRuntime<OPTS extends IOptions = IOptions>
{
	cwd: string;
	opts: OPTS;
	path: Pick<IPathNode, 'normalize' | 'dirname' | 'basename' | 'resolve' | 'join'>;
	stopPath: string[];
	limit: number;
}

export function handleOptions<T extends IOptions>(cwd?: string | T, opts?: T): IRuntime<T>
{
	if (typeof opts === 'undefined')
	{
		if (typeof cwd !== 'string')
		{
			// @ts-ignore
			([opts, cwd] = [cwd, opts]);
		}
	}

	// @ts-ignore
	opts = opts ?? {};
	cwd = cwd ?? opts.cwd ?? process.cwd();

	opts = {
		...opts,
	};

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

	const stopPath = [opts.stopPath ?? []]
		.flat()
		.map(p => path.normalize(p))
	;

	const limit = opts.limit > 0 ? opts.limit : Infinity;

	opts.cwd = cwd;
	opts.stopPath = stopPath;
	opts.limit = limit;

	return {
		cwd,
		opts,
		path,
		stopPath,
		limit,
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

/**
 * if return true, then stop
 */
export function _checkRuntimeLimit(current: string, runtime: IRuntime)
{
	return --runtime.limit <= 0 || runtime.stopPath.includes(current)
}

export function* pathParentsGenerator(cwd?: string | IOptions, opts?: IOptions)
{
	let runtime = handleOptions(cwd, opts);

	let _do = true;
	let current = runtime.cwd;
	let last: string

	if (runtime.opts.includeCurrentDirectory)
	{
		yield current;

		if (_checkRuntimeLimit(current, runtime))
		{
			return;
		}
	}

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

		if (_checkRuntimeLimit(current, runtime))
		{
			break;
		}
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
