


/**
 * path-sep-replace - 路徑分隔符替換工具
 *
 * 這個模組提供了路徑分隔符的替換功能，可以將路徑中的正斜線和反斜線替換為指定的分隔符。
 *
 * @module path-sep-replace
 * @author bluelovers
 */

import { pathIsNetworkDrive } from 'path-is-network-drive';
import { IPathSep, IPathPlatformOrigin, EnumPathSep, EnumPathPlatformOrigin, rePathSepSlashAll } from '@lazy-node/types-path';

/**
 * 替換路徑分隔符
 *
 * 這個函數會將路徑中的正斜線和反斜線替換為指定的分隔符，並處理網路磁碟機路徑的特殊情況。
 */
export function replacePathSep(input: string, who: {
	sep?: IPathSep,
	name?: IPathPlatformOrigin,
} = {}): string
{
	// 獲取分隔符
	let sep = who.sep ?? EnumPathSep.posix;

	// 處理網路磁碟機路徑的特殊情況
	if (who.name !== EnumPathPlatformOrigin.posix && pathIsNetworkDrive(input))
	{
		// 網路磁碟機路徑使用反斜線
		sep = EnumPathSep.win32;

		// 處理網路磁碟機路徑格式
		input = sep + sep + input
			.slice(2)
			//.replace(/[/\\]/g, sep)
		;
	}

	// 替換所有正斜線和反斜線為指定的分隔符
	input = input
		.replace(rePathSepSlashAll, sep)
	;

	return input;
}

export default replacePathSep
