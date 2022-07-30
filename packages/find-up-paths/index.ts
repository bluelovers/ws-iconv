import {
	handleOptions,
	IOptions,
	pathParentsGenerator,
	pathSplitGenerator,
} from 'path-parents';
import { fsStat, fsStatSync } from 'fs-stat';
import { Stats } from 'fs-extra';

export interface IOptionsFindUpPaths extends IOptions
{
	onlyDirectories?: boolean,
	onlyFiles?: boolean,
	throwIfNoEntry?: boolean,
}

function _checkStringArray(pattern: string[]): asserts pattern is string[]
{
	pattern.forEach(name =>
	{
		if (typeof name !== 'string' || !name?.length)
		{
			throw new TypeError(`'${name}' should be non-empty string`)
		}
	});
}

export function findUpPaths(pattern: string | string[], opts?: IOptionsFindUpPaths)
{
	const runtime = handleOptions(opts);

	runtime.opts.includeCurrentDirectory ??= true;

	const {
		onlyDirectories,
		onlyFiles,
	} = runtime.opts;

	pattern = [pattern].flat();

	_checkStringArray(pattern);

	for (const dir of pathParentsGenerator(runtime.cwd, runtime.opts))
	{
		let stat: Stats;
		let result: string;

		const name = pattern
			.find(name =>
			{

				result = runtime.path.resolve(dir, name);

				stat = fsStatSync(result, {
					followSymlinks: true,
					throwIfNoEntry: false,
				});

				if (!stat || onlyDirectories && !stat.isDirectory() || onlyFiles && !stat.isFile())
				{
					return false
				}

				return true;
			})
		;

		if (name?.length)
		{
			return {
				stat,
				result,
			}
		}
	}

	if (runtime.opts.throwIfNoEntry)
	{
		throw new RangeError(`can't found any entries of entries`)
	}
}

export async function findUpPathsAsync(pattern: string | string[], opts?: IOptionsFindUpPaths)
{
	const runtime = handleOptions(opts);

	const {
		onlyDirectories,
		onlyFiles,
	} = runtime.opts;

	pattern = [pattern].flat();

	_checkStringArray(pattern);

	for (const dir of pathParentsGenerator(runtime.cwd, runtime.opts))
	{
		let stat: Stats;
		let result: string;

		for (const name of pattern)
		{
			result = runtime.path.resolve(dir, name);

			stat = await fsStat(result, {
				followSymlinks: true,
				throwIfNoEntry: false,
			});

			if (!stat || onlyDirectories && !stat.isDirectory() || onlyFiles && !stat.isFile())
			{
				continue;
			}

			if (name.length)
			{
				return {
					stat,
					result,
				}
			}
		}
	}

	if (runtime.opts.throwIfNoEntry)
	{
		throw new RangeError(`can't found any entries of entries`)
	}
}

export default findUpPaths
