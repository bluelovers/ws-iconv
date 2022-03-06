/// <reference types="node" />
/// <reference types="node" />
import { PathLike } from "fs";
import { IFsWriteStreamOptions } from './lib/interface';
import { WriteStream } from './write';
export declare class SyncWriteStream extends WriteStream {
    constructor(path: PathLike, options?: string | IFsWriteStreamOptions);
    static get create(): typeof createSyncWriteStream;
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
