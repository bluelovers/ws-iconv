/**
 * Created by user on 2020/5/29.
 */
import { PathLike } from 'fs';

export interface IOptions
{
	readChunk?: number;
	newLineCharacter?: INewLineCharacter;
}

export const enum EnumNewLineCharacter
{
	LF = 0x0a,
	CR = 0x0d,
}

export type IPathLike = PathLike | number
export type INewLineCharacter = string | number | EnumNewLineCharacter | (string | number | EnumNewLineCharacter)[] | Buffer

