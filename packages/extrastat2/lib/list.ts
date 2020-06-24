import { readdir } from 'fs';
import { _mimetype } from './mime';
import path, { parse } from 'path';
import { IList } from './types';

export function list(resolvedpath: string)
{
	return new Promise<IList[]>((resolve, reject) =>
	{
		readdir(resolvedpath, {
			withFileTypes: true,
		}, (err, dirents) =>
		{
			if (err) return reject(err)

			resolve(dirents.map(dirent => Object.assign(dirent, {
				pathname: path.resolve(resolvedpath, dirent.name),
				mimetype: _mimetype(parse(dirent.name), dirent),
			})))
		})
	});
}
