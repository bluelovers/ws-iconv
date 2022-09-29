import { remove, removeSync } from 'fs-extra';
import { fsStatExists, fsStatExistsSync, IOptionsWithOnlyDirectoryOrFile } from 'fs-stat';

/**
 * Removes a file or directory. The directory can have contents. If the path does not exist, silently does nothing.
 */
export async function fsRemove(dirOrFile: string, options?: IOptionsWithOnlyDirectoryOrFile)
{
	if (options)
	{
		if (!await fsStatExists(dirOrFile, options))
		{
			return false
		}
	}

	return remove(dirOrFile)
}

/**
 * Removes a file or directory. The directory can have contents. If the path does not exist, silently does nothing.
 */
export function fsRemoveSync(dirOrFile: string, options?: IOptionsWithOnlyDirectoryOrFile)
{
	if (options)
	{
		if (!fsStatExistsSync(dirOrFile, options))
		{
			return false
		}
	}

	return removeSync(dirOrFile)
}

export function fsRemoveFile(dirOrFile: string)
{
	return fsRemove(dirOrFile, {
		onlyFiles: true,
	})
}

export function fsRemoveFileSync(dirOrFile: string)
{
	return fsRemoveSync(dirOrFile, {
		onlyFiles: true,
	})
}

export function fsRemoveDirectories(dirOrFile: string)
{
	return fsRemove(dirOrFile, {
		onlyDirectories: true,
	})
}

export function fsRemoveDirectoriesSync(dirOrFile: string)
{
	return fsRemoveSync(dirOrFile, {
		onlyDirectories: true,
	})
}

export default fsRemove
