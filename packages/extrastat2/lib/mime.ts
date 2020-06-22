import { lookup } from 'mime-types';
import { ParsedPath } from "path";
import { Stats, Dirent } from "fs";
import { EnumMimetypePlus } from './types';

export function _mimetype(parsedPath: ParsedPath, dirent: Dirent | Stats): string
{
	return (dirent.isFile() ? lookup(parsedPath.ext) :
				dirent.isDirectory() ? EnumMimetypePlus.directory :
					dirent.isFIFO() ? EnumMimetypePlus.fifo :
						dirent.isSocket() ? EnumMimetypePlus.socket :
							EnumMimetypePlus.unknown) || void 0
}
