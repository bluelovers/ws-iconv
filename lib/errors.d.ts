/// <reference types="node" />
import ErrnoException = NodeJS.ErrnoException;
export declare class NodeLikeError extends Error {
    code: string;
    constructor(code: string, msg?: any);
}
export declare function createError<T extends ErrnoException>(Err: new (msg?: any) => T, code: string, msg?: any): T;
export declare enum EnumFsStreamErrorCode {
    ERR_STREAM_WRITE_AFTER_END = "ERR_STREAM_WRITE_AFTER_END",
    ERR_STREAM_DESTROYED = "ERR_STREAM_DESTROYED"
}
