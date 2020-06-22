/**
 * Created by user on 2020/6/22.
 */
import { stat, lstat, statSync, lstatSync, Stats } from 'fs-extra';

export { Stats as IStats }

export interface IOptions
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

export default fsStat
