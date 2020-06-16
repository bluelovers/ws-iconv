/// <reference types="node" />
export type { PathLike } from 'fs';
export declare type IFsPath = string | Buffer;
export interface IFsStreamOptions {
    flags?: string;
    /**
     * @default null
     */
    encoding?: string;
    /**
     * @default null
     */
    fd?: number;
    /**
     * @default 0o666
     */
    mode?: number;
    /**
     * @default true
     */
    autoClose?: boolean;
    start?: number;
}
export interface IFsReadStreamOptions extends IFsStreamOptions {
    /**
     * @default Infinity
     */
    end?: number;
    /**
     * @default 64 * 1024
     */
    highWaterMark?: number;
}
export declare type IFsWriteStreamOptions = IFsStreamOptions;
export interface IFsStreamState {
    destroyed: boolean;
    sync: boolean;
}
export interface IFsStream {
    autoClose: boolean;
    flags: string;
    fd: number;
    mode: number;
    pos: number;
    closed: boolean;
    destroyed: boolean;
    _writableState: IFsStreamState;
    _readableState: IFsStreamState;
}
export interface IFsStreamData {
    opened?: boolean;
}
