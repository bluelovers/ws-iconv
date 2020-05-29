/**
 * Created by user on 2020/5/29.
 */
/// <reference types="node" />
import { IPathLike, IOptions } from './lib/types';
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
    static LineByLine: typeof LineByLine;
    static default: typeof LineByLine;
}
export default LineByLine;
