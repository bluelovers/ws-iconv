import { BufferEncodingOption, EncodingOption, PathLike, realpathSync } from 'fs';

export const fsRealpathNativeSync = realpathSync.native;

export async function fsRealpathNativeAsync(path: PathLike, options?: EncodingOption): Promise<string>;
export async function fsRealpathNativeAsync(path: PathLike, options: BufferEncodingOption): Promise<Buffer>;
export async function fsRealpathNativeAsync(path: PathLike, options?: EncodingOption): Promise<string | Buffer>;
export async function fsRealpathNativeAsync(path: PathLike,
	options?: BufferEncodingOption | EncodingOption
): Promise<string | Buffer>
{
	return fsRealpathNativeSync(path, options as any)
}

/**
 * @see https://github.com/facebook/jest/blob/main/packages/jest-util/src/tryRealpath.ts
 */
export function tryFsRealpathNativeSync(path: PathLike, options?: EncodingOption): string;
export function tryFsRealpathNativeSync(path: PathLike, options: BufferEncodingOption): Buffer;
export function tryFsRealpathNativeSync(path: PathLike, options?: EncodingOption): string | Buffer;
export function tryFsRealpathNativeSync(path: PathLike, options?: BufferEncodingOption | EncodingOption): string | Buffer
{
	try
	{
		path = realpathSync.native(path, options as any);
	}
	catch (error: any)
	{
		if (error.code !== 'ENOENT')
		{
			throw error;
		}
	}

	return path as any;
}

export async function tryFsRealpathNativeAsync(path: PathLike, options?: EncodingOption): Promise<string>;
export async function tryFsRealpathNativeAsync(path: PathLike, options: BufferEncodingOption): Promise<Buffer>;
export async function tryFsRealpathNativeAsync(path: PathLike, options?: EncodingOption): Promise<string | Buffer>;
export async function tryFsRealpathNativeAsync(path: PathLike, options?: BufferEncodingOption | EncodingOption): Promise<string | Buffer>
{
	return tryFsRealpathNativeSync(path, options as any)
}

export default tryFsRealpathNativeSync
