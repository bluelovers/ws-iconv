/// <reference types="node" />
import fs from "fs";
import { PathLike } from 'fs';
import { IFsPath, IFsStreamData, IFsStreamState, IFsWriteStreamOptions } from './lib/interface';
import { SYM_FS_STREAM_DATA } from './lib/internal';
export declare class WriteStream extends fs.WriteStream {
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
    /**
     * The number of bytes written so far. Does not include data that is still queued for writing.
     */
    bytesWritten: number;
    /**
     * The path to the file the stream is writing to as specified in the first argument to fs.createWriteStream(). If path is passed as a string, then writeStream.path will be a string. If path is passed as a Buffer, then writeStream.path will be a Buffer.
     */
    readonly path: IFsPath;
    constructor(path: PathLike, options?: string | IFsWriteStreamOptions);
    static get create(): typeof createWriteStream;
    open(): void;
}
export declare function createWriteStream(path: PathLike, options?: string | IFsWriteStreamOptions): WriteStream;
export default WriteStream;
