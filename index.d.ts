/// <reference types="node" />
import iconv, { vEncoding } from './iconv';
import { WriteStream } from "fs";
export * from 'fs-extra';
import * as Promise from 'bluebird';
import * as stream from 'stream';
export { iconv };
export interface IOptions {
    encoding?: vEncoding;
}
export declare function saveFile(file: string, data: any, options?: IOptions): Promise<any>;
export declare function createStreamPassThrough(data: any): stream.Readable;
export declare function outputStream(file: string, readStream: stream.Readable): WriteStream;
import * as self from './index';
export default self;
