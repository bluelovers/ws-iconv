import { PathLike } from 'fs';

export interface IOptions {
	readChunk?: number;
	newLineCharacter?: INewLineCharacter;
}
export type IPathLike = PathLike | number;
export type INewLineCharacter = string | number | EnumNewLineCharacter | (string | number | EnumNewLineCharacter)[] | Buffer;
export declare function handleOptionNewLineCharacter(newLineCharacter?: INewLineCharacter): number[];
export declare const enum EnumNewLineCharacter {
	LF = 10,
	CR = 13
}
export declare class LineByLine {
	#private;
	constructor(file: IPathLike, options?: IOptions);
	protected _open(): void;
	get file(): IPathLike;
	get fd(): number;
	get options(): IOptions;
	get fdPosition(): number;
	get newLineCharacter(): Buffer;
	get eofReached(): boolean;
	/**
	 * get current lineNumber
	 */
	get lineNumber(): number;
	reset(): void;
	close(): void;
	protected _extractLines(buffer: Buffer): Buffer[];
	protected _readChunk(lineLeftovers?: Buffer): number;
	next(): Buffer;
	generator(): Generator<Buffer, void, unknown>;
	static generator(file: IPathLike, options?: IOptions): Generator<Buffer, void, unknown>;
}

export {
	LineByLine as default,
};

export {};
