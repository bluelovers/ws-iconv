/// <reference types="node" />
import { PathLike } from "fs";
import { IFsReadStreamOptions } from './lib/interface';
import { ReadStream } from './read';
export declare const kMinPoolSpace = 128;
export declare class SyncReadStream extends ReadStream {
    constructor(path: PathLike, options?: string | IFsReadStreamOptions);
    static get create(): typeof createSyncReadStream;
    open(): void;
    _read(n: number): boolean | this;
    _destroy(error: Error | null, callback: (error: Error | null) => void): void;
}
export declare function createSyncReadStream(path: PathLike, options?: string | IFsReadStreamOptions): SyncReadStream;
export default SyncReadStream;
