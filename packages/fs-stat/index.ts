/**
 * Created by user on 2020/6/22.
 */
import { stat, lstat, statSync, lstatSync, Stats } from 'fs-extra';
import { StatOptions } from 'fs';

export { Stats as IStats }

export interface IOptions extends StatOptions
{
	allowSymlinks?: boolean;
}

export function fsStat(path: string | Buffer, options?: IOptions)
{
	return (options?.allowSymlinks ? stat : lstat)(path)
}

export function fsStatSync(path: string | Buffer, options?: IOptions)
{
	return (options?.allowSymlinks ? statSync : lstatSync)(path)
}

export function isSymbolicLinkSync(dir0: string, options?: IOptions)
{
	const stats = fsStatSync(dir0, {
		throwIfNoEntry: false,
		...options,
	});
	return stats.isSymbolicLink()
}

export default fsStat
