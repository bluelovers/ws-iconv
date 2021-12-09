import {
	ensureLink,
	ensureLinkSync,
	ensureSymlink,
	ensureSymlinkSync,
	SymlinkType,
	unlink,
	unlinkSync,
} from 'fs-extra';
import { fsStat, fsStatSync, IOptions as IStatOptions, isSameStat } from 'fs-stat';
import { ITSResolvable } from 'ts-type';
import { fsSameRealpath } from 'path-is-same';

export interface IOptions
{
	overwrite?: boolean,
	/**
	 * only for symlink
	 */
	type?: SymlinkType,
}

export function _handleOverwrite(src: string, dest: string, options: IOptions, async: true): Promise<boolean>
export function _handleOverwrite(src: string, dest: string, options: IOptions, async: false): boolean
export function _handleOverwrite(src: string, dest: string, options: IOptions, async: boolean): ITSResolvable<boolean>
export function _handleOverwrite(src: string, dest: string, options: IOptions, async: boolean): ITSResolvable<boolean>
{
	const opts: IStatOptions = {
		followSymlinks: true,
		throwIfNoEntry: false,
	};

	if (async)
	{
		return Promise.resolve()
			.then(async () =>
			{

				if (!options?.overwrite)
				{
					return null as null
				}
				else if (fsSameRealpath(src, dest))
				{
					return false
				}

				let s1 = await fsStat(src, opts);
				let s2 = await fsStat(dest, opts) ?? await fsStat(dest, {
					...opts,
					followSymlinks: false,
				});

				if (s1 && s2 && !isSameStat(s1, s2))
				{
					await unlink(dest)
					return true
				}

				return false
			})
	}
	else
	{
		if (!options?.overwrite)
		{
			return null as null
		}
		else if (fsSameRealpath(src, dest))
		{
			return false
		}

		let s1 = fsStatSync(src, opts);
		let s2 = fsStatSync(dest, opts) ?? fsStatSync(dest, {
			...opts,
			followSymlinks: false,
		});

		if (s1 && s2 && !isSameStat(s1, s2))
		{
			unlinkSync(dest)
			return true
		}

		return false
	}
}

export async function fsSymlink(src: string, dest: string, options?: IOptions)
{
	await _handleOverwrite(src, dest, options, true);

	return ensureSymlink(src, dest, options?.type);
}

export function fsSymlinkSync(src: string, dest: string, options?: IOptions)
{
	_handleOverwrite(src, dest, options, false);

	return ensureSymlinkSync(src, dest, options?.type);
}

export async function fsHardlink(src: string, dest: string, options?: IOptions)
{
	await _handleOverwrite(src, dest, options, true);

	return ensureLink(src, dest)
}

export function fsHardlinkSync(src: string, dest: string, options?: IOptions)
{
	return ensureLinkSync(src, dest)
}

export default fsSymlinkSync
