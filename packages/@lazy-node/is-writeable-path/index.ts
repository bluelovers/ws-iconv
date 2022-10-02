import {
	promises as fsPromises,
	constants,
	PathLike,
	accessSync,
} from 'fs';
import { fsStatExists, fsStatExistsSync } from 'fs-stat';

const RW_OK = constants.W_OK | constants.R_OK;

export function isWritableAsync(target: PathLike): Promise<boolean>
{
	return fsPromises.access(target, RW_OK)
		.then(r => r as any ?? true)
	;
}

export function isWritableSync(target: PathLike): boolean
{
	try
	{
		return accessSync(target, RW_OK) as any ?? true
	}
	catch (err) {}
}

export function isWritableFileAsync(target: PathLike)
{
	return fsStatExists(target as any, {
		onlyFiles: true,
	}).then(() => isWritableAsync(target))
}

export function isWritableFileSync(target: PathLike)
{
	return fsStatExistsSync(target as any, {
		onlyFiles: true,
	}) && isWritableSync(target)
}

export function isWritableDirectoryAsync(target: PathLike)
{
	return fsStatExists(target as any, {
		onlyDirectories: true,
	}).then(() => isWritableAsync(target))
}

export function isWritableDirectorySync(target: PathLike)
{
	return fsStatExistsSync(target as any, {
		onlyDirectories: true,
	}) && isWritableSync(target)
}

export default isWritableSync
