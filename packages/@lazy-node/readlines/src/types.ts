/**
 * 類型定義檔案
 * Type definitions file
 *
 * Created by user on 2020/5/29.
 */
import { PathLike } from 'fs';
import { EnumNewLineCharacter } from './index';

/**
 * 讀取選項介面
 * Read options interface
 */
export interface IOptions
{
	/**
	 * 每次讀取的區塊大小（位元組）/ Read chunk size in bytes
	 * @default 1024
	 */
	readChunk?: number;
	/**
	 * 換行字元設定 / New line character configuration
	 * @default EnumNewLineCharacter.LF (0x0a)
	 */
	newLineCharacter?: INewLineCharacter;
}

/**
 * 檔案路徑類型（字串路徑或檔案描述符）
 * File path type (string path or file descriptor)
 */
export type IPathLike = PathLike | number

/**
 * 換行字元類型（支援多種格式）
 * New line character type (supports multiple formats)
 */
export type INewLineCharacter = string | number | EnumNewLineCharacter | (string | number | EnumNewLineCharacter)[] | Buffer

