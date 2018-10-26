/// <reference types="node" />
import fs = require('fs');
import { PathLike } from "fs";
import { IFsStreamState, IFsReadStreamOptions } from './lib/interface';
export declare const kMinPoolSpace = 128;
export declare class SyncReadStream extends fs.ReadStream {
    protected autoClose: boolean;
    protected flags: string;
    fd: number;
    protected mode: number;
    protected pos: number;
    protected closed: boolean;
    protected destroyed: boolean;
    protected _writableState: IFsStreamState;
    protected _readableState: IFsStreamState;
    protected end: number;
    constructor(path: PathLike, options?: string | IFsReadStreamOptions);
    static readonly create: typeof createSyncReadStream;
    open(): void;
    _read(n: number): boolean | this;
    _destroy(error: Error | null, callback: (error: Error | null) => void): void;
}
export declare function createSyncReadStream(path: PathLike, options?: string | IFsReadStreamOptions): SyncReadStream;
export default SyncReadStream;
