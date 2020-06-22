/**
 * Created by user on 2020/6/22.
 */
import { stat, lstat, statSync, lstatSync, Stats } from 'fs-extra';

export { Stats as IStats }

export function fsStat(path: string | Buffer, options?: {
	allowSymlinks?: boolean,
})
{
	return (options?.allowSymlinks ? stat : lstat)(path)
}

export function fsStatSync(path: string | Buffer, options?: {
	allowSymlinks?: boolean,
})
{
	return (options?.allowSymlinks ? statSync : lstatSync)(path)
}

export default fsStat
