/// <reference types="node" />
import { PathLike } from "fs";
import fs from 'fs';
import { IFsReadStreamOptions, IFsStreamData, IFsStreamState, IFsWriteStreamOptions } from './lib/interface';
import { SYM_FS_STREAM_DATA } from './lib/internal';
export declare class ReadStream extends fs.ReadStream {
    protected autoClose: boolean;
    protected flags: string;
    fd: number;
    protected mode: number;
    protected pos: number;
    protected closed: boolean;
    protected destroyed: boolean;
    protected _writableState: IFsStreamState;
    protected _readableState: IFsStreamState;
    protected [SYM_FS_STREAM_DATA]: IFsStreamData;
    protected end: number;
    constructor(path: PathLike, options?: string | IFsWriteStreamOptions);
    static get create(): typeof createReadStream;
    open(): void;
}
export declare function createReadStream(path: PathLike, options?: string | IFsReadStreamOptions): ReadStream;
export default ReadStream;
