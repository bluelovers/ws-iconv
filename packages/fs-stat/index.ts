/**
 * Created by user on 2020/6/22.
 */
import { lstat, lstatSync, stat, Stats, statSync } from 'fs-extra';
import { BigIntStats, StatOptions, StatSyncOptions } from 'fs';
import { ITSRequireAtLeastOne } from 'ts-type';

export type { Stats as IStats }
export type { Stats }
export type { BigIntStats }

export type IStatsInput = Stats | BigIntStats;

export interface IOptions extends StatSyncOptions, StatOptions
{
	followSymlinks?: boolean;
	/**
	 * @alias followSymlinks
	 * @deprecated use `followSymlinks`
	 */
	allowSymlinks?: boolean;
}

export function _handleOptions(options: IOptions): IOptions
{
	options = {
		...options,
	}

	options.followSymlinks ??= options.allowSymlinks;
	options.throwIfNoEntry ??= false;

	return options
}

export function fsStat<S extends IStatsInput = Stats>(path: string | Buffer, options?: IOptions)
{
	options = _handleOptions(options);

	let p = (options.followSymlinks ? stat : lstat)(path) as Promise<S>;

	if (!options.throwIfNoEntry)
	{
		p = p.catch(e =>
		{
			if (e.code === 'ENOENT')
			{
				return void 0
			}

			return Promise.reject(e);
		})
	}

	return p
}

export function fsStatSync<S extends IStatsInput = Stats>(path: string | Buffer, options?: IOptions): S
{
	options = _handleOptions(options);

	let stat: S;

	try
	{
		stat = (options.followSymlinks ? statSync : lstatSync)(path, options) as any
	}
	catch (e)
	{
		if (options.throwIfNoEntry)
		{
			throw e
		}
	}

	return stat
}

export function isSymbolicLink(dir0: string, options?: IOptions)
{
	return fsStat(dir0, options).then(stats => stats?.isSymbolicLink());
}

export function isSymbolicLinkSync(dir0: string, options?: IOptions)
{
	const stats = fsStatSync(dir0, options);
	return stats?.isSymbolicLink()
}

export function isSameStat<S extends IStatsInput>(st1: S, st2: S, ...stats: S[]): boolean
export function isSameStat<S extends Stats | BigIntStats>(st1: S, ...stats: S[]): boolean
{
	if (stats.length <= 0)
	{
		throw new TypeError(`st2 must be protected`)
	}

	if (!st1 || !stats[0])
	{
		return false
	}

	return stats.every(st2 => st2?.ino === st1.ino)
}

export interface IOptionsIsDirectoryOrFileStat
{
	onlyDirectories?: boolean,
	onlyFiles?: boolean,
}

export function isDirectoryOrFileStat(stat: IStatsInput, opts: ITSRequireAtLeastOne<IOptionsIsDirectoryOrFileStat>)
{
	return !(!stat || opts.onlyDirectories && !stat.isDirectory() || opts.onlyFiles && !stat.isFile())
}

export default fsStat
