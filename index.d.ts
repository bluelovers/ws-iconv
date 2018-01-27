/// <reference types="node" />
import iconv from './iconv';
import { WriteStream } from "fs";
export * from 'fs-extra';
import * as stream from 'stream';
export { iconv };
export declare type vEncoding = 'Big5' | 'UTF-8' | 'Gbk' | string | null;
export interface IOptions {
    encoding?: vEncoding;
}
export declare function saveFile(file: any, data: any, options?: IOptions): any;
export declare function createStreamPassThrough(data: any): stream.Readable;
export declare function outputStream(file: any, readStream: stream.Readable): WriteStream;
import * as self from './index';
export default self;
