import {
	promises as fsPromises,
	constants, PathLike,
	accessSync,
	statSync,
} from 'fs';

export function isWritableAsync(target: PathLike): Promise<boolean>
{
	return fsPromises.access(target, constants.W_OK | constants.R_OK)
		.then(r => r as any ?? true)
	;
}

export function isWritableSync(target: PathLike): boolean
{
	try
	{
		return accessSync(target, constants.W_OK | constants.R_OK) as any ?? true
	}
	catch (err) {}
}

export function isWritableFileAsync(target: PathLike)
{
	return fsPromises.stat(target)
		.then((stat) => {
			return stat.isFile() && isWritableAsync(target)
		})
}

export function isWritableFileSync(target: PathLike)
{
	const stat = statSync(target)

	return stat.isFile() && isWritableSync(target)
}

export function isWritableDirectoryAsync(target: PathLike)
{
	return fsPromises.stat(target)
		.then((stat) => {
			return stat.isDirectory() && isWritableAsync(target)
		})
}

export function isWritableDirectorySync(target: PathLike)
{
	const stat = statSync(target)

	return stat.isDirectory() && isWritableSync(target)
}

export default isWritableSync
