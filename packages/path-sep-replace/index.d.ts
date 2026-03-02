/**
 * path-sep-replace - 路徑分隔符替換工具
 *
 * 這個模組提供了路徑分隔符的替換功能，可以將路徑中的正斜線和反斜線替換為指定的分隔符。
 *
 * @module path-sep-replace
 * @author bluelovers
 */
import { IPathSep, IPathPlatformOrigin } from '@lazy-node/types-path';
/**
 * 替換路徑分隔符
 *
 * 這個函數會將路徑中的正斜線和反斜線替換為指定的分隔符，並處理網路磁碟機路徑的特殊情況。
 */
export declare function replacePathSep(input: string, who?: {
    sep?: IPathSep;
    name?: IPathPlatformOrigin;
}): string;
export default replacePathSep;
