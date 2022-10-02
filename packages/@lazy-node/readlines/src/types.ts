/**
 * Created by user on 2020/5/29.
 */
import { PathLike } from 'fs';
import { EnumNewLineCharacter } from './index';

export interface IOptions
{
	readChunk?: number;
	newLineCharacter?: INewLineCharacter;
}

export type IPathLike = PathLike | number
export type INewLineCharacter = string | number | EnumNewLineCharacter | (string | number | EnumNewLineCharacter)[] | Buffer

