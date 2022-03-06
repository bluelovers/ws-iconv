/// <reference types="node" />
/// <reference types="node" />
/**
 * Created by user on 2020/5/29.
 */
import { PathLike } from 'fs';
export interface IOptions {
    readChunk?: number;
    newLineCharacter?: INewLineCharacter;
}
export declare const enum EnumNewLineCharacter {
    LF = 10,
    CR = 13
}
export declare type IPathLike = PathLike | number;
export declare type INewLineCharacter = string | number | EnumNewLineCharacter | (string | number | EnumNewLineCharacter)[] | Buffer;
