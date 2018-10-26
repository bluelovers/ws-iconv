/// <reference types="node" />
import { PathLike } from "fs";
import { IFsStreamState, IFsWriteStreamOptions, IFsStreamData } from './lib/interface';
import { SYM_FS_STREAM_DATA } from './lib/internal';
import { WriteStream } from './write';
export declare class SyncWriteStream extends WriteStream {
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
    readonly path: string | Buffer;
    constructor(path: PathLike, options?: string | IFsWriteStreamOptions);
    static readonly create: typeof createSyncWriteStream;
    open(): void;
    write(chunk: any, cb?: (error: Error | null | undefined) => void): boolean;
    write(chunk: any, encoding?: string, cb?: (error: Error | null | undefined) => void): boolean;
    /**
     * @fixme a unknow bug make stream.write only run once
     */
    _write(chunk: Buffer, encoding: string, callback: Function): boolean | this;
    close(cb?: Function): void;
    _destroy(error: Error | null, callback: (error: Error | null) => void): void;
}
export declare function createSyncWriteStream(path: PathLike, options?: string | IFsWriteStreamOptions): SyncWriteStream;
export default SyncWriteStream;
