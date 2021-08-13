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

export function fsStat(path: string | Buffer, options?: IOptions)
{
	let followSymlinks = options?.followSymlinks ?? options?.allowSymlinks;

	return (followSymlinks ? stat : lstat)(path)
}

export function fsStatSync(path: string | Buffer, options?: IOptions)
{
	let followSymlinks = options?.followSymlinks ?? options?.allowSymlinks;

	return (followSymlinks ? statSync : lstatSync)(path, options)
}

export function isSymbolicLink(dir0: string, options?: IOptions)
{
	return fsStat(dir0, {
		throwIfNoEntry: false,
		...options,
	}).then(stats => stats.isSymbolicLink());
}

export function isSymbolicLinkSync(dir0: string, options?: IOptions)
{
	const stats = fsStatSync(dir0, {
		throwIfNoEntry: false,
		...options,
	});
	return stats.isSymbolicLink()
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
