/// <reference types="node" />
import iconv, { vEncoding } from 'iconv-jschardet';
import { WriteStream } from "fs";
export * from 'fs-extra';
import * as Promise from 'bluebird';
import * as stream from 'stream';
export { iconv };
export interface IOptions {
    encoding?: vEncoding;
}
export interface IOptionsLoadFile {
    encoding?: string;
    flag?: string;
    autoDecode?: boolean | string[];
}
export interface IOptionsLoadFile2 extends IOptionsLoadFile {
    encoding: string;
}
export declare function loadFile(file: string, options?: IOptionsLoadFile): Promise<Buffer>;
export declare function loadFile(file: string, options: IOptionsLoadFile2): Promise<string>;
export declare function saveFile(file: string, data: any, options?: IOptions): Promise<any>;
export declare function _createStreamPassThrough(data: any): stream.Readable;
export declare function _outputStream(file: string, readStream: stream.Readable): WriteStream;
export declare function trimFilename(name: any): string;
import * as self from './index';
export default self;
