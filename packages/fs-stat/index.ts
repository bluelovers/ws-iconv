/**
 * Created by user on 2020/6/22.
 */
import { stat, lstat, statSync, lstatSync, Stats } from 'fs-extra';
import { StatOptions, BigIntStats } from 'fs';

export type { Stats as IStats }
export type { Stats }
export type { BigIntStats }

export interface IOptions extends StatOptions
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

export function fsStat(path: string | Buffer, options?: IOptions)
{
	options = _handleOptions(options);

	let p = (options.followSymlinks ? stat : lstat)(path);

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

export function fsStatSync<S extends Stats | BigIntStats = Stats>(path: string | Buffer, options?: IOptions): S
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

export function isSameStat<S extends Stats | BigIntStats>(st1: S, st2: S, ...stats: S[]): boolean
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

export default fsStat
