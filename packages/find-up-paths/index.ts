import {
	handleOptions as _handleOptions,
	IOptions,
	IRuntime,
	pathParentsGeneratorRuntime
} from 'path-parents';
import {
	fsStat,
	fsStatSync,
	IOptionsIsDirectoryOrFileStat,
	isDirectoryOrFileStat
} from 'fs-stat';
import { Stats } from 'fs-extra';

export interface IOptionsFindUpPaths extends IOptions, IOptionsIsDirectoryOrFileStat
{
	onlyDirectories?: boolean,
	onlyFiles?: boolean,
	throwIfNoEntry?: boolean,
}

export interface IRuntimeFindUpPaths<OPTS extends IOptionsFindUpPaths = IOptionsFindUpPaths> extends IRuntime<OPTS>
{

}

export function handleOptions<T extends IOptionsFindUpPaths>(cwd?: string | T, opts?: T): IRuntimeFindUpPaths<T>
{
	const runtime = _handleOptions(opts);

	runtime.opts.includeCurrentDirectory ??= true;

	return runtime;
}

function _checkStringArray(pattern: string[]): asserts pattern is string[]
{
	pattern.forEach(name =>
	{
		if (typeof name !== 'string' || !name?.length)
		{
			throw new TypeError(`'${name}' should be non-empty string`)
		}
		else if (name === '.' || name === '..' || name === '/' || name === '\\' || name === '../' || name === '..\\')
		{
			throw new TypeError(`'${name}' is invalid pattern`)
		}
	});
}

export function _handlePattern(pattern: string | string[]): string[]
{
	pattern = [pattern].flat();

	_checkStringArray(pattern);

	return pattern;
}

export function _throwIfNoEntry(runtime: IRuntime<IOptionsFindUpPaths>)
{
	if (runtime.opts.throwIfNoEntry)
	{
		throw new RangeError(`can't found any entries of given patterns`)
	}
}

export function findUpPaths(pattern: string | string[], opts?: IOptionsFindUpPaths)
{
	const runtime = handleOptions(opts);
	return findUpPathsRuntime(pattern, runtime);
}

export function findUpPathsRuntime(pattern: string | string[], runtime: IRuntimeFindUpPaths)
{
	const {
		onlyDirectories,
		onlyFiles,
	} = runtime.opts;

	pattern = _handlePattern(pattern);

	const _opts: Required<IOptionsIsDirectoryOrFileStat> = {
		onlyDirectories,
		onlyFiles,
	};

	for (const dir of pathParentsGeneratorRuntime(runtime))
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

				return isDirectoryOrFileStat(stat, _opts);
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

	_throwIfNoEntry(runtime);
}

export async function findUpPathsAsync(pattern: string | string[], opts?: IOptionsFindUpPaths)
{
	const runtime = handleOptions(opts);
	return findUpPathsRuntimeAsync(pattern, runtime);
}

export async function findUpPathsRuntimeAsync(pattern: string | string[], runtime: IRuntimeFindUpPaths)
{
	const {
		onlyDirectories,
		onlyFiles,
	} = runtime.opts;

	pattern = _handlePattern(pattern);

	const _opts: Required<IOptionsIsDirectoryOrFileStat> = {
		onlyDirectories,
		onlyFiles,
	};

	for (const dir of pathParentsGeneratorRuntime(runtime))
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

			if (isDirectoryOrFileStat(stat, _opts))
			{
				return {
					stat,
					result,
				}
			}
		}
	}

	_throwIfNoEntry(runtime);
}

export default findUpPaths
